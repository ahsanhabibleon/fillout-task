import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 3001,
  },
  server: {
    open: true,
    port: 3001,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/global.scss";`,
      },
    },
  },
  resolve: {
    mainFields: [],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'store', replacement: path.resolve(__dirname, 'src/store') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'Components', replacement: path.resolve(__dirname, 'src/Components') },
    ],
  },
});
