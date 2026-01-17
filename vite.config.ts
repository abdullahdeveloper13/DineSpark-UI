import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rootDir = path.resolve(import.meta.dirname, "client");

export default defineConfig({
  root: rootDir,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
