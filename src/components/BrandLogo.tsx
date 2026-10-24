import Image from "next/image";

/** The logo in the right colourway for the active theme: dark wordmark on
 * light backgrounds, cream wordmark on dark ones. */
export default function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/brand/logo-light.png"
        alt="Tactical Tennis Lab"
        width={1203}
        height={369}
        priority={priority}
        className={`w-auto dark:hidden ${className}`}
      />
      <Image
        src="/brand/logo-dark.png"
        alt=""
        aria-hidden="true"
        width={1203}
        height={369}
        priority={priority}
        className={`hidden w-auto dark:block ${className}`}
      />
    </>
  );
}
