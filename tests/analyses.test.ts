import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
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
afterAll(async () => {
  await prisma.academy.deleteMany({ where: { id: { in: academyIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  expect(await prisma.user.count({ where: { email: { startsWith: RUN } } })).toBe(0);
  await prisma.$disconnect();
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
