import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "./" permite que la app funcione en GitHub Pages
// sin importar el nombre del repositorio.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
});
