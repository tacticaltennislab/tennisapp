import SubmitVideoContent from "@/components/SubmitVideoContent";

export const dynamic = "force-dynamic";

export default async function SubmitVideoPage({
  searchParams,
}: {
  searchParams: Promise<{ free?: string | string[] }>;
}) {
  const { free } = await searchParams;
  return <SubmitVideoContent lang="en" free={free === "1"} />;
}
