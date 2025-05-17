import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@reduxjs/toolkit",
            "react-redux",
          ],
          ui: [
            "@mui/material",
            "@radix-ui/react-avatar",
            "@radix-ui/react-dialog",
            "lucide-react",
          ],
        },
      },
    },
  },
  // Ensure base path is set correctly for production
  base: "/",
});
