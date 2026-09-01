import { redirect } from "next/navigation";
import { auth } from "@/auth";
import VideoUploadForm from "@/components/VideoUploadForm";

export default async function SubmitVideoPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/submit-video");
  }

  return (
    <main className="flex-1 px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-2">Send your video</h1>
        <p className="text-body mb-8">
          Upload a practice or match video and our coaches will review it
          frame by frame and send back a personalized plan.
        </p>
        <VideoUploadForm />
      </div>
    </main>
  );
}
