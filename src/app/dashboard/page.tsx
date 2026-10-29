import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DIcons } from "@/components/dashboard/icons";
import { Panel, StatusChip } from "@/components/dashboard/ui";
import EmptyAnalyses from "@/components/dashboard/EmptyAnalyses";
import OverviewDemo from "@/components/dashboard/OverviewDemo";
import { listAnalyses } from "@/lib/analyses";
import { getAcademyCreditsForUser, getBalance } from "@/lib/credits";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";
import { formatCredits } from "@/lib/creditFormat";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";

const noun = pricingDictionaries.en.credits.noun;

export default async function DashboardOverview({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { user, demo } = await getDashboardContext(searchParams);
  if (demo) return <OverviewDemo />;

  const [analyses, balance, memberships, allAcademyCredits, lastMessage] = await Promise.all([
    listAnalyses(user),
    getBalance({ userId: user.id }),
    prisma.academyMember.findMany({ where: { userId: user.id }, select: { academyId: true } }),
    getAcademyCreditsForUser(user.id),
    prisma.message.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);
  // Only coaches and owners see the academy's credits; a player of the academy sees their own.
  const memberOf = new Set(memberships.map((m) => m.academyId));
  const academies = allAcademyCredits.filter((a) => memberOf.has(a.id));

  const awaiting = analyses.filter((a) => a.status === "awaiting" || a.status === "in_review");
  const reviewed = analyses.filter((a) => a.status === "reviewed");
  const latest = reviewed.find((a) => a.feedback && a.feedback.priorities.length > 0);
  const firstName = (user.name.split(/[\s@]+/)[0] || "").trim();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">{firstName ? `Welcome back, ${firstName}` : "Welcome back"}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {analyses.length === 0
            ? "Let's get your first analysis"
            : awaiting.length > 0
              ? `${awaiting.length} ${awaiting.length === 1 ? "analysis is" : "analyses are"} with your coach`
              : "You are all caught up"}
        </h2>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {[
          { label: "Awaiting review", value: String(awaiting.length) },
          { label: "Reviewed", value: String(reviewed.length) },
          { label: "Credits", value: String(balance) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-surface p-4 md:p-5">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="t-mono mt-1.5 text-2xl font-semibold text-ink md:text-3xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          {analyses.length === 0 && <EmptyAnalyses freeCredit={balance > 0} />}

          {latest?.feedback && (
            <Panel
              title="Recent feedback"
              action={
                <Link href={`/dashboard/analyses/${latest.id}`} className="link-arrow text-sm !text-brand-600">
                  Open analysis
                  <DIcons.arrow className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <p className="font-semibold text-ink">{latest.title}</p>
                  <span className="text-muted">
                    {latest.service}
                    {latest.coach ? ` · reviewed by ${latest.coach}` : ""}
                    {latest.reviewedAt ? ` · ${latest.reviewedAt}` : ""}
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your priorities</p>
                <ol className="mt-3 space-y-3">
                  {latest.feedback.priorities.map((p, i) => (
                    <li key={`${i}-${p}`} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                      <span className="t-mono mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-on-brand">
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
            </Panel>
          )}

          {analyses.length > 0 && (
            <Panel
              title="Your analyses"
              action={
                <Link href="/dashboard/analyses" className="link-arrow text-sm !text-brand-600">
                  View all
                  <DIcons.arrow className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <ul className="divide-y divide-line">
                {analyses.slice(0, 5).map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/dashboard/analyses/${a.id}`}
                      className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-brand-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{a.title}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {a.service} · sent {a.submittedAt}
                          {a.ownerName ? ` · player ${a.ownerName}` : ""}
                        </p>
                      </div>
                      <StatusChip status={a.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel
            title="Credits"
            action={
              <Link href="/pricing" className="link-arrow text-sm !text-brand-600">
                Get more
                <DIcons.arrow className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="space-y-4 p-5">
              <div>
                <p className="t-mono text-3xl font-semibold text-ink">{formatCredits("en", balance, noun)}</p>
                <p className="mt-1 text-sm text-muted">
                  A stroke analysis uses 1 credit. Match and training footage use 1 credit per started hour.
                </p>
              </div>
              {academies.map((a) => (
                <div key={a.id} className="border-t border-line pt-4">
                  <p className="text-xs text-muted">Academy credits</p>
                  <p className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                    <Link href={`/academy/${a.id}`} className="font-medium text-ink underline underline-offset-4">
                      {a.name}
                    </Link>
                    <span className="t-mono text-ink">{formatCredits("en", a.balance, noun)}</span>
                  </p>
                  {a.renewsAt && (
                    <p className="mt-1 text-xs text-muted">
                      Renews {a.renewsAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Latest message"
            action={
              <Link href="/dashboard/messages" className="link-arrow text-sm !text-brand-600">
                Open messages
                <DIcons.arrow className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="p-5">
              {lastMessage ? (
                <>
                  <p className="text-xs text-muted">
                    {lastMessage.sender === "admin" ? "Your coach" : "You"} ·{" "}
                    {lastMessage.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-body">{lastMessage.body}</p>
                </>
              ) : (
                <p className="text-sm text-muted">No messages yet. Ask your coach anything about your feedback.</p>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
