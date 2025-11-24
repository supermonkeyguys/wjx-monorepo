// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "dist/stats.html",
      template: "treemap",
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_module/antd") ||
            id.includes("node_module/rc-")
          ) {
            return "antd-vendor";
          }
          if (id.includes("node_module/react-dom")) {
            return "react-vendor";
          }

          if (
            id.includes("node_module/loadash") ||
            id.includes("node_module/axios")
          ) {
            return "utils-vendor";
          }

          if (id.includes("node_module")) {
            return "default-vendor";
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true, // 改变源，支持跨域
        // rewrite: (path) => path.replace(/^\/api/, '') // 可选：重写路径，去掉 /api 前缀
      },
    },
  },
});
