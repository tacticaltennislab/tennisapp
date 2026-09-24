import CheckoutSuccessContent from "@/components/CheckoutSuccessContent";

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; free?: string }>;
}) {
  return <CheckoutSuccessContent lang="en" searchParams={searchParams} />;
}
