export type Audience = "players" | "clubs";

/** Reads the `?audience=` query value. Academies & clubs are the default
 * view; only an explicit "players" selects the individual-player plans. */
export function parseAudience(value: string | string[] | undefined): Audience {
  return value === "players" ? "players" : "clubs";
}
