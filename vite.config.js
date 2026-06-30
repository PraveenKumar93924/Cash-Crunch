import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Cash-Crunch/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
