import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    mainFields: [],
    alias: [
      {
        find: "axios",
        replacement: path.resolve(
          __dirname,
          "node_modules",
          "axios/dist/esm/axios.js"
        ),
      },
    ],
  },
});
