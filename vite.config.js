import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteCompression from "vite-plugin-compression"

export default defineConfig({
  plugins: [react(),
     viteCompression({ algorithm: "brotliCompress" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"
          }
          if (id.includes("react")) {
            return "react"
          }
        },
      },
    },
  },
})
