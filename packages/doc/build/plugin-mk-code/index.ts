import type { Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';
import type { Options } from './types';
import markdownAnalyse from '../markdown-analyse';

function VitePluginMarkdown(userOptions: Options = {}): Plugin {
  const filter = createFilter(userOptions.include || /\.md$/, userOptions.exclude);

  return {
    name: 'vite-plugin-md',
    enforce: 'pre',
    transform(raw, id) {
      if (!filter(id)) return;
      try {
        return markdownAnalyse(raw, id, process.cwd());
      } catch (e: any) {
        this.error(e);
      }
    },
    async handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return;

      const defaultRead = ctx.read;
      ctx.read = async function () {
        return markdownAnalyse(await defaultRead(), ctx.file, process.cwd());
      };

      return ctx.modules;
    },
  };
}

export default VitePluginMarkdown;
