import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Explicitly set public directory
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    modulePreload: {
      polyfill: false
    }
  }
});
