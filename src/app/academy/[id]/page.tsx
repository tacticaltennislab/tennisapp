import AcademyDetailContent from "@/components/AcademyDetailContent";

export const dynamic = "force-dynamic";

export default async function AcademyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AcademyDetailContent id={id} lang="en" />;
}
