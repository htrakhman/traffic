import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const roadsProxy = {
  // Avoid browser CORS when calling Roads API from the dev server (same-origin → Vite → Google).
  '/roads-api': {
    target: 'https://roads.googleapis.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/roads-api/, ''),
  },
} as const

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: { ...roadsProxy },
  },
  preview: {
    port: 3000,
    proxy: { ...roadsProxy },
  },
})
