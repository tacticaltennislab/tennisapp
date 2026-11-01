// One command to install (first time) and start the tool: `npm run analyzer` from the repository root.
// It runs npm with a clean environment: when npm starts a script it passes its own settings down, and a
// user level setting such as allow-scripts in ~/.npmrc then makes a nested `npm install` fail (EALLOWSCRIPTS).
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.toLowerCase().startsWith("npm_")));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

if (!existsSync(new URL("../node_modules/vite", import.meta.url))) {
  console.log("Installing the tool's dependencies (first run only)...");
  const r = spawnSync(npm, ["install", "--no-audit", "--no-fund"], { cwd: root, env, stdio: "inherit" });
  if (r.status !== 0) {
    console.error("\nnpm install failed. Run it by hand to see the full error:\n\n  cd tools/analyzer && npm install\n");
    process.exit(r.status ?? 1);
  }
}
const dev = spawn(npm, ["run", "dev"], { cwd: root, env, stdio: "inherit" });
dev.on("exit", (code) => process.exit(code ?? 0));
