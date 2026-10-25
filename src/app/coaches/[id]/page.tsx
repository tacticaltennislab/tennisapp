import CoachDetailContent from "@/components/CoachDetailContent";

export default async function CoachProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CoachDetailContent id={id} lang="en" />;
}
