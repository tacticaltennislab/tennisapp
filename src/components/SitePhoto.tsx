import Image from "next/image";
import type { SitePhotoData } from "@/lib/sitePhotos";

/** Renders a configured photo, or nothing when the slot is empty. */
export default function SitePhoto({
  photo,
  className = "",
  priority = false,
  sizes = "(min-width: 1200px) 1200px, 100vw",
}: {
  photo: SitePhotoData | null | undefined;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      priority={priority}
      sizes={sizes}
      className={`w-full h-auto rounded-3xl object-cover ${className}`}
    />
  );
}
