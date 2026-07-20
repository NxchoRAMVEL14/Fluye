import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// base: "./" permite que la app funcione en GitHub Pages
// sin importar el nombre del repositorio.
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-180.png"],
      manifest: {
        name: "Fluye — aprende inglés",
        short_name: "Fluye",
        description:
          "Aprende inglés desde cero: lecciones en español, vocabulario con audio y un tutor IA que te corrige.",
        lang: "es",
        start_url: ".",
        scope: ".",
        display: "standalone",
        orientation: "portrait",
        background_color: "#F6F2E9",
        theme_color: "#22303A",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,webmanifest}"],
        navigateFallback: "index.html",
      },
    }),
  ],
});
