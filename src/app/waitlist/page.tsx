import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Coming soon"
        title="Join the waitlist"
        subtitle="We're putting the finishing touches on Tactical Tennis Lab. Leave your email and we'll let you know the moment we open things up."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-md mx-auto">
          <Reveal variant="zoom">
            <WaitlistForm />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
