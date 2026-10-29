// Runs before `npm run dev` and `npm run build`: explains the two common start-up problems in plain words.
import { existsSync } from "node:fs";

const [major] = process.versions.node.split(".").map(Number);
if (major < 18) {
  console.error(`\nTTL Analyzer needs Node.js 18 or newer. You have ${process.versions.node}.\nInstall a current version from https://nodejs.org and run this again.\n`);
  process.exit(1);
}
if (!existsSync(new URL("../node_modules/vite", import.meta.url))) {
  console.error("\nThe dependencies are not installed yet. Run this once inside tools/analyzer:\n\n  npm install\n");
  process.exit(1);
}
