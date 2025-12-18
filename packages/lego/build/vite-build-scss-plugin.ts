import { green } from '@nio-fe/shared/plugins';
import { rollupTheme } from './rollup-theme';

export const viteBuildScssPlugin = () => {
  return {
    name: 'vite-build-scss',
    async closeBundle() {
      green('Start to build styles');

      await rollupTheme();

      green('Build styles success');
    },
  };
};
