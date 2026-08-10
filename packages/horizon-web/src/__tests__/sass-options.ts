import path from 'node:path';
import { NodePackageImporter } from 'sass';

export const testScssOptions = {
  importers: [new NodePackageImporter(path.resolve(import.meta.dirname, '../..'))],
};
