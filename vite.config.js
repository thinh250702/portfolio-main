import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  publicDir: false,
  build: {
    outDir: "public/build",
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      input: {
        app: "./src/js/main.js",
      }
    }
  },
});