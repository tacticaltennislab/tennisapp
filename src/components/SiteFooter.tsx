import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tacticaltennislab" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=6159084826074" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-muted">
          Tactical Tennis Lab &mdash; training plans for every level.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="mailto:hello@tacticaltennislab.com"
            className="text-body hover:text-brand-600"
          >
            hello@tacticaltennislab.com
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-body hover:text-brand-600"
            >
              {s.label}
            </a>
          ))}
          <Link href="/contact" className="text-body hover:text-brand-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
