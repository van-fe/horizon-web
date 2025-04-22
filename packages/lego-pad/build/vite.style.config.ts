import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  css: {
    preprocessorOptions: { scss: { charset: false } },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: path.join(__dirname, '../src/styles/index.scss'),
      output: {
        dir: 'dist',
        assetFileNames: 'index.css',
      },
    },
  },
  define: {
    'process.env': {},
  },
  plugins: [vue(), vueJsx()],
});
