import Link from "next/link";
import { ORDERS } from "@/lib/dashboardSample";
import { Panel } from "@/components/dashboard/ui";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-muted">Everything you have purchased, newest first. Prices are in USD.</p>

      <Panel>
        {/* Wide screens: a table. Phones: stacked rows. */}
        <table className="hidden w-full text-left text-sm md:table">
          <caption className="sr-only">Order history</caption>
          <thead>
            <tr className="border-b border-line text-xs text-muted">
              <th scope="col" className="px-5 py-3.5 font-medium">Order</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Date</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Item</th>
              <th scope="col" className="px-5 py-3.5 text-right font-medium">Amount</th>
              <th scope="col" className="px-5 py-3.5 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ORDERS.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-brand-50">
                <td className="t-mono px-5 py-4 text-muted">#{o.id}</td>
                <td className="px-5 py-4 text-body">{o.date}</td>
                <td className="px-5 py-4">
                  <span className="font-medium text-ink">{o.item}</span>
                  <span className="ml-2 text-xs text-muted">{o.note}</span>
                </td>
                <td className="t-mono px-5 py-4 text-right text-ink">{o.amount}</td>
                <td className="px-5 py-4 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/15 px-2.5 py-1 text-xs font-semibold text-brand-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-line md:hidden">
          {ORDERS.map((o) => (
            <li key={o.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{o.item}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {o.note} · {o.date}
                  </p>
                </div>
                <p className="t-mono text-sm text-ink">{o.amount}</p>
              </div>
              <p className="t-mono mt-2 text-xs text-muted">
                Order #{o.id} · <span className="text-brand-600">{o.status}</span>
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <p className="text-sm text-muted">
        Question about an order?{" "}
        <Link href="/contact" className="font-medium text-brand-600 underline underline-offset-4">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
