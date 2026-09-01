import CourtBackdrop from "@/components/CourtBackdrop";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden items-end">
        <CourtBackdrop />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(200deg, rgba(10,20,14,0.55) 0%, rgba(10,20,14,0.85) 70%, rgba(10,20,14,0.95) 100%)",
          }}
        />
        <div className="relative p-10 text-white max-w-md">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-wide">
            Tactical Tennis Lab
          </p>
          <h2 className="text-3xl font-bold mt-2 leading-tight">
            Coached by people who&apos;ve played at the top.
          </h2>
          <p className="mt-3 text-white/70">
            Former ATP players and ITF Level&nbsp;2 certified coaches review
            your game and build a plan around what you need to fix.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 bg-white">
        <div className="w-full max-w-sm animate-fade-up">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-body">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
