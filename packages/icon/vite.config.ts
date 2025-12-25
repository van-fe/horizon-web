import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AuroraIcons',
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          globals: {
            vue: 'Vue'
          },
          // 入口文件保持在根目录
          entryFileNames: 'index.esm.js',
          // 将 chunk 文件放到 chunks 目录中
          chunkFileNames: 'chunks/[name]-[hash].js'
        },
        {
          format: 'cjs',
          globals: {
            vue: 'Vue'
          },
          // 入口文件保持在根目录
          entryFileNames: 'index.js',
          // 将 chunk 文件放到 chunks 目录中
          chunkFileNames: 'chunks/[name]-[hash].js'
        }
      ]
    }
  }
})

