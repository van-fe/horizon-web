import type { AliasReplacerArguments } from 'tsc-alias';

const mapping = [
  '@aurora/utils',
  'vue-router',
  'dayjs',
  'async-validator',
  '@aurora/upload-helper',
  '@aurora/locale',
];

export default function replaceShared(params: AliasReplacerArguments) {
  if (params.orig.includes('node_modules')) {
    const pkgName = mapping.find(pkg => params.orig.includes(pkg));

    if (pkgName) {
      return `import('${pkgName}')`;
    } else {
      throw new Error(
        `Uncought package import path: ${params.orig}. You should add this pkgName to 'packages/horizon-web/build/tsc-alias/shared.ts' file's mapping variable.`,
      );
    }
  }

  return params.orig;
}
