import Link from "next/link";
import { auth } from "@/auth";
import VideoUploadForm from "@/components/VideoUploadForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IconVideo, IconTarget, IconUpload, IconSpark, IconArrowRight } from "@/components/icons";

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

const PROCESS = [
  {
    title: "Send your video",
    detail: "Upload a practice or match clip, tell us your level, and what you want feedback on.",
  },
  {
    title: "Your coach reviews it personally",
    detail: "Frame by frame, by a former ATP-ranked player or ITF Level 2 coach — not a template, not an algorithm.",
  },
  {
    title: "Get your analysis back",
    detail: "Clear priorities to work on, drills to practice, and the reasoning behind each note — through your account and by email.",
  },
];

export default async function SubmitVideoPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex-1 flex flex-col">
        <PageHeader
          eyebrow="Before you send"
          title="What happens when you send your video"
          subtitle="Here's exactly what to expect — no account needed to read this part."
        />
        <main className="flex-1 px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal>
              <h2 className="text-lg font-semibold mb-5">The process</h2>
              <ol className="space-y-4">
                {PROCESS.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-4 rounded-2xl border border-line p-5 shadow-sm"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-body">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-line bg-brand-50/50 p-6 sm:p-8">
                <h2 className="font-semibold text-lg">Tips for a great video</h2>
                <ul className="mt-5 space-y-4">
                  {TIPS.map((tip) => (
                    <li key={tip.text} className="flex items-start gap-3">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600">
                        <tip.icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-body">{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="text-center">
              <p className="text-body">
                Ready to send yours? Pick a plan, or create a free account to
                get started.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/sign-up?callbackUrl=/submit-video"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  Create account &amp; send video
                  <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-brand-600 transition-colors"
                >
                  See pricing &amp; what&apos;s included
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">
                Already have an account?{" "}
                <Link
                  href="/sign-in?callbackUrl=/submit-video"
                  className="text-brand-600 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </Reveal>
          </div>
        </main>
      </div>
    );
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
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600">
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
