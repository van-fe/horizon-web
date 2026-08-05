import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const resolveSource = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    target: 'es2018',
    outDir: './dist',
    sourcemap: true,
    lib: {
      entry: {
        index: resolveSource('./src/index.ts'),
        core: resolveSource('./src/core/index.ts'),
        qiniu: resolveSource('./src/qiniu.ts'),
        'aliyun-oss': resolveSource('./src/aliyun-oss.ts'),
        'tencent-cos': resolveSource('./src/tencent-cos.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
