/** Headline whose words slide up through a mask, one after another. Pure CSS:
 * no JavaScript runs, the text is in the HTML from the first byte, and the
 * animation is removed under prefers-reduced-motion. */
export default function RevealWords({
  text,
  className = "",
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const words = text.split(" ");
  return (
    <Tag className={`reveal-words ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="w" style={{ ["--i" as string]: i }}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
