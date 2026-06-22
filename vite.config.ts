import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Связывает пути в Node.js
import svgr from 'vite-plugin-svgr'
export default defineConfig({
  plugins: [react(), svgr()], 
  resolve: {
    alias: {
      // Говорим Vite: встретишь "@", ищи в папке "src" текущего проекта
      '@': path.resolve(__dirname, './src'),
    },
  },
})
