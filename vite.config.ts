import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    optimizeDeps: {
      include: ["konva", "react-konva"],
    },
    build: {
      commonjsOptions: {
        include: [/konva/, /react-konva/, /node_modules/],
      },
    },
  };
});
