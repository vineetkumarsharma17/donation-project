import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only use /donation-project/ base for GitHub Pages
  // For Vercel/Netlify/local dev, use /
  base: process.env.GITHUB_PAGES === 'true' ? '/donation-project/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
