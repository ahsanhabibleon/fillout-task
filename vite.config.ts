import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
        additionalData: `@use "/src/styles/global.scss";`
      }
    }
  },
  resolve: {
        mainFields: [],
        alias: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
            {find: 'store', replacement: path.resolve(__dirname, 'src/store')},
            {find: 'pages', replacement: path.resolve(__dirname, 'src/pages')},
            {find: 'Components', replacement: path.resolve(__dirname, 'src/Components')},
            {find: 'assets', replacement: path.resolve(__dirname, 'src/assets')},
            {find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks')},
            {find: 'styles', replacement: path.resolve(__dirname, 'src/styles')},
            {find: 'datasource', replacement: path.resolve(__dirname, 'src/datasource')},
        ],
    },
})
