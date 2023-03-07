import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
})