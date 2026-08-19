import path from 'node:path';
import { NodePackageImporter } from 'sass';

export const scssPreprocessorOptions = {
  scss: {
    charset: false,
    importers: [new NodePackageImporter(path.resolve(import.meta.dirname, '..'))],
  },
};
