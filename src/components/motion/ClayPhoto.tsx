import { getImageProps } from "next/image";

interface Src {
  src: string;
  width: number;
  height: number;
}

/** One photograph with a wide crop for tablets and up and a tall crop for phones,
 * both served through the Next.js image optimiser. Decorative: empty alt. */
export default function ClayPhoto({
  landscape,
  portrait,
  priority = false,
  className = "h-full w-full object-cover",
}: {
  landscape: Src;
  portrait: Src;
  priority?: boolean;
  className?: string;
}) {
  const common = { alt: "", priority, quality: 60, className, sizes: "100vw" } as const;
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, ...landscape });
  const { props: tall } = getImageProps({ ...common, ...portrait });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
      <img {...tall} alt="" />
    </picture>
  );
}

export const CLAY = {
  hero: {
    landscape: { src: "/media/hero-clay.jpg", width: 1920, height: 1080 },
    portrait: { src: "/media/hero-clay-portrait.jpg", width: 828, height: 1472 },
  },
  texture: {
    landscape: { src: "/media/clay-texture.jpg", width: 1600, height: 900 },
    portrait: { src: "/media/clay-texture-portrait.jpg", width: 800, height: 1200 },
  },
} as const;
