import { defineConfig } from "vite"


export default defineConfig({
  build: {
    rollupOptions: { 
      output: {
        manualChunks: false,
        inlineDynamicImports: true,
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})