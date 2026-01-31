import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/donation-project/', // Change this to your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
