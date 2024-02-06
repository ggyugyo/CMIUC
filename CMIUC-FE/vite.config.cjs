import { defineConfig } from "vite";
const react = require("@vitejs/plugin-react");
const path = require("path");

// https://vitejs.dev/config/
module.exports = defineConfig({
  base: "./",
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.ttf"],
  build: {
    sourcemap: true, // 소스맵을 설정하는 부분
  },
});
