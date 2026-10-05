import AcademyInviteContent from "@/components/AcademyInviteContent";

export const dynamic = "force-dynamic";

export default async function AcademyInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <AcademyInviteContent token={token} lang="en" />;
}
