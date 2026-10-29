import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ruta base para GitHub Pages: https://alanserr12.github.io/timer-project/
  base: '/timer-project/',
})
