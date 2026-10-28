import Link from "next/link";
import SettingsDemo from "@/components/dashboard/SettingsDemo";
import { Panel } from "@/components/dashboard/ui";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";

export default async function SettingsPage({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { user, demo } = await getDashboardContext(searchParams);
  if (demo) return <SettingsDemo />;

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <Panel title="Profile">
        <dl className="space-y-4 p-5 text-sm">
          <div>
            <dt className="text-xs text-muted">Name</dt>
            <dd className="mt-1 text-ink">{user.name || "Not set"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Email</dt>
            <dd className="mt-1 text-ink">{user.email}</dd>
            <dd className="mt-1.5 text-xs text-muted">Feedback and messages are sent to this address.</dd>
          </div>
        </dl>
      </Panel>

      <Panel title="Password">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-md text-sm text-body">To change your password, we email you a link that is valid for one hour.</p>
          <Link href="/forgot-password" className="btn btn-secondary !min-h-10 !text-sm">
            Email me a reset link
          </Link>
        </div>
      </Panel>

      <Panel title="Notifications and referral">
        <div className="p-5 text-sm leading-relaxed text-body">
          <p>
            You get an email when a coach publishes a review or replies to you. Browser notifications are switched on
            or off with the bell in the site header. Your personal referral link is on your account page.
          </p>
          <Link href="/account" className="mt-4 inline-block font-medium text-brand-600 underline underline-offset-4">
            Open my account
          </Link>
        </div>
      </Panel>
    </div>
  );
}
