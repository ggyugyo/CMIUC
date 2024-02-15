import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  assetsInclude: [
    "**/*.jpg",
    "**/*.png",
    "**/*.svg",
    "**/*.ttf",
    "**/*.gif",
    "**/*.mp3",
  ],
  build: {
    sourcemap: true, // 소스맵을 설정하는 부분
    rollupOptions: {
      external: ["react-animated-cursor"],
    },
  },
});
