import { redirect } from "next/navigation";
import { auth } from "@/auth";
import VideoUploadForm from "@/components/VideoUploadForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IconVideo, IconTarget, IconUpload, IconSpark } from "@/components/icons";

const TIPS = [
  {
    icon: IconVideo,
    text: "Film from the side so your coach can see your full swing, footwork, and body position.",
  },
  {
    icon: IconUpload,
    text: "Capture a few points or a short rally — a single shot doesn't show enough to work with.",
  },
  {
    icon: IconTarget,
    text: "Steady the camera. Prop your phone against something solid, or use a tripod if you have one.",
  },
  {
    icon: IconSpark,
    text: "Use the notes field to tell your coach exactly what you want feedback on.",
  },
];

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
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr_1.3fr] items-start">
          <Reveal>
            <div className="rounded-2xl border border-line bg-brand-50/50 p-6 sm:p-8">
              <h2 className="font-semibold text-lg">Tips for a great video</h2>
              <ul className="mt-5 space-y-4">
                {TIPS.map((tip) => (
                  <li key={tip.text} className="flex items-start gap-3">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-white border border-line flex items-center justify-center text-brand-600">
                      <tip.icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-body">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="zoom" delay={100}>
            <VideoUploadForm />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
