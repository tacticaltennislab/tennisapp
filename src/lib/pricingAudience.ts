export type Audience = "players" | "clubs";

/** Reads the `?audience=` query value; anything but "clubs" means players. */
export function parseAudience(value: string | string[] | undefined): Audience {
  return value === "clubs" ? "clubs" : "players";
}
