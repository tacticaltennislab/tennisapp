import { redirect } from "next/navigation";
import { auth } from "@/auth";
import VideoUploadForm from "@/components/VideoUploadForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default async function SubmitVideoPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/submit-video");
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Get feedback"
        title="Send your video"
        subtitle="Upload a practice or match video and our coaches will review it frame by frame and send back a personalized plan."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <Reveal>
            <VideoUploadForm />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
