import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/ui": path.resolve(__dirname, "./src/components/ui"),
      "@/shared": path.resolve(__dirname, "./src/components/shared"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/providers": path.resolve(__dirname, "./src/providers"),
      "@/router": path.resolve(__dirname, "./src/router"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/modules": path.resolve(__dirname, "./src/modules"),
    },
  },
});
