import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { checkDuration } from "@/lib/creditCost";
import {
  InsufficientCreditsError,
  consumeCredits,
  getBalance,
  grantCredits,
  refundSubmissionCredits,
} from "@/lib/credits";
import { NoChargeToCorrectError, applyChargeCorrection, creditsChargedFor } from "@/lib/durationCorrection";
import { canViewAnalysis, getAnalysis, listAnalyses } from "@/lib/analyses";

// Real database, throwaway rows tagged with RUN and removed in afterAll (like tests/credits.test.ts).
const RUN = `e2e-analyses-${Date.now()}`;
const userIds: string[] = [];
const academyIds: string[] = [];

async function newUser(n: string, role = "customer") {
  const user = await prisma.user.create({ data: { email: `${RUN}-${n}@e2e-test.invalid`, name: `Test ${n}`, role } });
  userIds.push(user.id);
  return user;
}
async function newAcademy(n: string) {
  const academy = await prisma.academy.create({ data: { name: `${RUN} ${n}` } });
  academyIds.push(academy.id);
  return academy;
}
async function newSubmission(
  userId: string,
  data: { analysisType?: string; declaredMinutes?: number; status?: string; title?: string } = {}
) {
  return prisma.videoSubmission.create({
    data: { userId, storagePath: `videos/${RUN}.mp4`, fileName: "t.mp4", fileType: "video/mp4", fileSize: 1, ...data },
  });
}
/** A match submission that was charged `charged` credits from the user's own balance. */
async function chargedMatch(userId: string, declaredMinutes: number, charged: number, balance = 10) {
  await grantCredits({ account: { userId }, amount: balance, reason: "purchase" });
  const sub = await newSubmission(userId, { analysisType: "match", declaredMinutes });
  await consumeCredits({ account: { userId }, amount: charged, videoSubmissionId: sub.id });
  return sub;
}

afterAll(async () => {
  await prisma.academy.deleteMany({ where: { id: { in: academyIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  expect(await prisma.user.count({ where: { email: { startsWith: RUN } } })).toBe(0);
  await prisma.$disconnect();
});

describe("checkDuration", () => {
  const base = { analysisType: "match", declaredMinutes: 45, creditsCharged: 1 };

  it("is 0 when the real length costs what was charged", () => {
    const c = checkDuration({ ...base, actualDurationSec: 55 * 60 });
    expect(c).toMatchObject({ creditsActual: 1, creditsDeclared: 1, creditsCharged: 1, difference: 0 });
  });

  it("is positive when the video is longer than declared (the player owes credits)", () => {
    const c = checkDuration({ ...base, actualDurationSec: 95 * 60 });
    expect(c).toMatchObject({ creditsActual: 2, difference: 1 });
  });

  it("is negative when the video is shorter than declared (credits go back)", () => {
    const c = checkDuration({ analysisType: "training", declaredMinutes: 150, creditsCharged: 3, actualDurationSec: 50 * 60 });
    expect(c).toMatchObject({ creditsActual: 1, difference: -2 });
  });

  it("counts every started 60 minutes: exactly 60 is 1, 60 minutes and 1 second is 2", () => {
    expect(checkDuration({ ...base, actualDurationSec: 3600 }).creditsActual).toBe(1);
    expect(checkDuration({ ...base, actualDurationSec: 3601 }).creditsActual).toBe(2);
  });

  it("never differs for a stroke analysis, whatever the length", () => {
    const c = checkDuration({ analysisType: "stroke", declaredMinutes: null, creditsCharged: 1, actualDurationSec: 9000 });
    expect(c).toMatchObject({ creditsActual: 1, difference: 0 });
  });

  it("measures against what was really charged, so a repeated correction is 0", () => {
    // Declared 45 (1 credit), real 95 min (2 credits); after charging the 1 missing credit, 2 are charged.
    expect(checkDuration({ ...base, actualDurationSec: 95 * 60, creditsCharged: 2 }).difference).toBe(0);
  });
});

describe("applyChargeCorrection", () => {
  it("charges the missing credits when the video is longer than declared, with a clear note", async () => {
    const u = await newUser("longer");
    const sub = await chargedMatch(u.id, 45, 1);
    expect(await getBalance({ userId: u.id })).toBe(9);

    const result = await applyChargeCorrection(sub.id, 95 * 60);
    expect(result).toMatchObject({ applied: 1, creditsActual: 2 });
    expect(await getBalance({ userId: u.id })).toBe(8);
    expect(await creditsChargedFor(sub.id)).toBe(2);

    const row = await prisma.creditLedger.findFirstOrThrow({ where: { videoSubmissionId: sub.id, delta: -1, note: { not: null } } });
    expect(row.reason).toBe("submission");
    expect(row.note).toMatch(/^Duration correction: the video is 95 min, declared 45 min/);
    expect((await prisma.videoSubmission.findUniqueOrThrow({ where: { id: sub.id } })).actualDurationSec).toBe(95 * 60);
  });

  it("refunds the extra credits when the video is shorter than declared", async () => {
    const u = await newUser("shorter");
    const sub = await chargedMatch(u.id, 120, 2);
    expect(await getBalance({ userId: u.id })).toBe(8);

    const result = await applyChargeCorrection(sub.id, 40 * 60);
    expect(result).toMatchObject({ applied: -1, creditsActual: 1 });
    expect(await getBalance({ userId: u.id })).toBe(9);
    const refund = await prisma.creditLedger.findFirstOrThrow({ where: { videoSubmissionId: sub.id, reason: "refund" } });
    expect(refund).toMatchObject({ delta: 1, userId: u.id });
    expect(refund.note).toContain("Duration correction");
  });

  it("is idempotent: applying it twice changes nothing the second time", async () => {
    const u = await newUser("twice");
    const sub = await chargedMatch(u.id, 45, 1);
    await applyChargeCorrection(sub.id, 95 * 60);
    const again = await applyChargeCorrection(sub.id, 95 * 60);
    expect(again.applied).toBe(0);
    expect(await getBalance({ userId: u.id })).toBe(8);
    expect(await prisma.creditLedger.count({ where: { videoSubmissionId: sub.id } })).toBe(2);
  });

  it("fails with InsufficientCreditsError and writes nothing when the account cannot cover it", async () => {
    const u = await newUser("broke");
    const sub = await chargedMatch(u.id, 45, 1, 1); // balance is now 0
    await expect(applyChargeCorrection(sub.id, 150 * 60)).rejects.toBeInstanceOf(InsufficientCreditsError);
    expect(await getBalance({ userId: u.id })).toBe(0);
    expect(await prisma.creditLedger.count({ where: { videoSubmissionId: sub.id } })).toBe(1);
    // The stored length is rolled back with it.
    expect((await prisma.videoSubmission.findUniqueOrThrow({ where: { id: sub.id } })).actualDurationSec).toBeNull();
  });

  it("charges the academy when the academy paid", async () => {
    const u = await newUser("acad-player");
    const a = await newAcademy("pays");
    await grantCredits({ account: { academyId: a.id }, amount: 5, reason: "subscription_renewal" });
    const sub = await newSubmission(u.id, { analysisType: "match", declaredMinutes: 45 });
    await consumeCredits({ account: { academyId: a.id }, amount: 1, videoSubmissionId: sub.id });

    await applyChargeCorrection(sub.id, 100 * 60);
    expect(await getBalance({ academyId: a.id })).toBe(3);
    expect(await getBalance({ userId: u.id })).toBe(0);
  });

  it("changes nothing for a stroke analysis", async () => {
    const u = await newUser("stroke");
    await grantCredits({ account: { userId: u.id }, amount: 1, reason: "purchase" });
    const sub = await newSubmission(u.id, { analysisType: "stroke" });
    await consumeCredits({ account: { userId: u.id }, amount: 1, videoSubmissionId: sub.id });
    const result = await applyChargeCorrection(sub.id, 600);
    expect(result.applied).toBe(0);
    expect(await getBalance({ userId: u.id })).toBe(0);
  });

  it("refuses a submission that was never charged", async () => {
    const u = await newUser("nocharge");
    const sub = await newSubmission(u.id, { analysisType: "match", declaredMinutes: 30 });
    await expect(applyChargeCorrection(sub.id, 3000)).rejects.toBeInstanceOf(NoChargeToCorrectError);
  });

  it("rejects a length that is not a positive number", async () => {
    const u = await newUser("badlen");
    const sub = await chargedMatch(u.id, 45, 1);
    for (const seconds of [0, -5, NaN]) {
      await expect(applyChargeCorrection(sub.id, seconds)).rejects.toThrow();
    }
  });

  it("a later rejection refunds exactly what the submission cost after the correction", async () => {
    const u = await newUser("reject-after");
    const sub = await chargedMatch(u.id, 45, 1);
    await applyChargeCorrection(sub.id, 95 * 60); // now 2 credits charged
    expect(await getBalance({ userId: u.id })).toBe(8);
    expect(await refundSubmissionCredits(sub.id, "rejected")).toBe(2);
    expect(await getBalance({ userId: u.id })).toBe(10);
    expect(await refundSubmissionCredits(sub.id, "rejected")).toBe(0);
  });
});

describe("who can open an analysis", () => {
  it("the owner can; another player cannot, even in the same academy", async () => {
    const alice = await newUser("alice");
    const bob = await newUser("bob");
    const academy = await newAcademy("shared");
    await prisma.academyPlayer.createMany({ data: [{ academyId: academy.id, userId: alice.id }, { academyId: academy.id, userId: bob.id }] });
    const sub = await newSubmission(alice.id, { title: "Alice serve", status: "reviewed" });

    expect(await getAnalysis(alice, sub.id)).toMatchObject({ id: sub.id, title: "Alice serve", ownerId: alice.id });
    expect(await getAnalysis(bob, sub.id)).toBeNull();
    expect(await canViewAnalysis(bob, alice.id)).toBe(false);
    expect(await canViewAnalysis(alice, alice.id)).toBe(true);
  });

  it("a player with no academy cannot open someone else's analysis, and an unknown id is the same as no access", async () => {
    const alice = await newUser("owner2");
    const stranger = await newUser("stranger");
    const sub = await newSubmission(alice.id);
    expect(await getAnalysis(stranger, sub.id)).toBeNull();
    expect(await getAnalysis(stranger, "does-not-exist")).toBeNull();
  });

  it("a coach of the player's academy can open it; a coach of another academy cannot; an admin can", async () => {
    const player = await newUser("player3");
    const coach = await newUser("coach3");
    const otherCoach = await newUser("coach3b");
    const admin = await newUser("admin3", "admin");
    const academy = await newAcademy("mine");
    const other = await newAcademy("other");
    await prisma.academyPlayer.create({ data: { academyId: academy.id, userId: player.id } });
    await prisma.academyMember.create({ data: { academyId: academy.id, userId: coach.id, role: "coach" } });
    await prisma.academyMember.create({ data: { academyId: other.id, userId: otherCoach.id, role: "coach" } });
    const sub = await newSubmission(player.id);

    expect(await getAnalysis(coach, sub.id)).toMatchObject({ ownerId: player.id, ownerName: "Test player3" });
    expect(await getAnalysis(otherCoach, sub.id)).toBeNull();
    expect(await getAnalysis({ id: admin.id, role: "admin" }, sub.id)).not.toBeNull();
  });

  it("a player who is a member of nothing sees only their own analyses in the list", async () => {
    const a = await newUser("list-a");
    const b = await newUser("list-b");
    const academy = await newAcademy("list");
    await prisma.academyPlayer.createMany({ data: [{ academyId: academy.id, userId: a.id }, { academyId: academy.id, userId: b.id }] });
    const mine = await newSubmission(a.id);
    await newSubmission(b.id);
    const list = await listAnalyses(a);
    expect(list.map((x) => x.id)).toEqual([mine.id]);
  });

  it("a coach's list holds their own and their academy's players' analyses, with the player's name", async () => {
    const coach = await newUser("list-coach");
    const p1 = await newUser("list-p1");
    const outsider = await newUser("list-out");
    const academy = await newAcademy("list2");
    await prisma.academyMember.create({ data: { academyId: academy.id, userId: coach.id, role: "owner" } });
    await prisma.academyPlayer.create({ data: { academyId: academy.id, userId: p1.id } });
    const s1 = await newSubmission(p1.id);
    const own = await newSubmission(coach.id);
    await newSubmission(outsider.id);
    const list = await listAnalyses(coach);
    expect(new Set(list.map((x) => x.id))).toEqual(new Set([s1.id, own.id]));
    expect(list.find((x) => x.id === s1.id)?.ownerName).toBe("Test list-p1");
    expect(list.find((x) => x.id === own.id)?.ownerName).toBeUndefined();
  });
});

describe("what the client sees before and after publishing", () => {
  it("hides a draft (observations and summary) until the analysis is published", async () => {
    const u = await newUser("draft");
    const sub = await newSubmission(u.id, { status: "in_review" });
    await prisma.submissionObservation.create({
      data: { submissionId: sub.id, timeSec: 12.5, kind: "issue", title: "Late contact", text: "Hit it earlier", pinX: 40, pinY: 60 },
    });
    await prisma.submissionReport.create({
      data: { submissionId: sub.id, priorities: ["Hit earlier"], strengths: ["Good split step"], issues: [{ title: "Late contact", detail: "d" }] },
    });

    const draft = await getAnalysis(u, sub.id);
    expect(draft).toMatchObject({ status: "in_review", observations: [], feedback: undefined });

    await prisma.videoSubmission.update({ where: { id: sub.id }, data: { status: "reviewed", reviewedAt: new Date() } });
    const published = await getAnalysis(u, sub.id);
    expect(published?.status).toBe("reviewed");
    expect(published?.observations).toEqual([
      expect.objectContaining({ t: 12.5, kind: "issue", title: "Late contact", pin: { x: 40, y: 60 } }),
    ]);
    expect(published?.feedback).toMatchObject({ priorities: ["Hit earlier"], strengths: ["Good split step"] });
  });

  it("still shows the plain tactical and technical notes of an older submission", async () => {
    const u = await newUser("legacy");
    const sub = await newSubmission(u.id, { status: "reviewed" });
    await prisma.videoSubmission.update({
      where: { id: sub.id },
      data: { tacticalNotes: "Serve wide more often.", technicalNotes: "Open the shoulders earlier." },
    });
    const legacy = await getAnalysis(u, sub.id);
    expect(legacy?.feedback?.tactical).toEqual(["Serve wide more often."]);
    expect(legacy?.feedback?.issues).toEqual([{ title: "Technical analysis", detail: "Open the shoulders earlier." }]);
  });
});
