import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Topospace',
      formats: ['es', 'cjs'],
      fileName: (format) => `topospace.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', 'pinia', 'three'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          three: 'THREE',
        },
      },
    },
    sourcemap: 'hidden',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
