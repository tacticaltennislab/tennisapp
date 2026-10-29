import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// A local tool: it runs on the coach's computer and nothing here is deployed.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: false },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
