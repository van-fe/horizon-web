import shared from './shared';
import zh from './zh';
import { defineConfig } from 'vitepress';
import containers from '../markdown/containers';

export default defineConfig({
  ...shared,
  locales: {
    root: {label: '简体中文', ...zh }
  },
  markdown: {
    lineNumbers: true,
    sfc: {
      customBlocks: ['demo-block']
    },
    config: (md) => {
      md.use(containers);
    }
  }
})