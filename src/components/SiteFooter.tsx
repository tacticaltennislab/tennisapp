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
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href="mailto:tacticaltennislab@gmail.com"
            className="text-body hover:text-brand-600"
          >
            tacticaltennislab@gmail.com
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
          <Link href="/about" className="text-body hover:text-brand-600">
            About
          </Link>
          <Link href="/contact" className="text-body hover:text-brand-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
