import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'auth.html'),
        forum: resolve(__dirname, 'forum.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    tailwindcss(),
    {
      name: 'copy-authentication-txt',
      closeBundle() {
        const src = resolve(__dirname, 'authentication.txt');
        const dest = resolve(__dirname, 'dist', 'authentication.txt');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log('✓ Copied authentication.txt to dist/');
        }
      }
    }
  ]
});
