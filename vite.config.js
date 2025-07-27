import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // <-- add this so all assets are prefixed with /portfolio/
  base: '/portfolio/',

  plugins: [
    react(),
    tailwindcss(),
  ],
})
