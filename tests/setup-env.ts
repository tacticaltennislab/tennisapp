import fs from "node:fs";
import path from "node:path";

// Load DATABASE_URL (and friends) from .env / .env.local the way `next dev` does, without overriding
// anything already set in the shell.
for (const file of [".env.local", ".env"]) {
  const full = path.resolve(__dirname, "..", file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

// Never send a real email from a test.
process.env.RESEND_API_KEY = "";
