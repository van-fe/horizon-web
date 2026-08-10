import { transformWithOxc, type Plugin } from 'vite';

export function isReactTsx(id: string): boolean {
  const normalizedId = id.split('?', 1)[0].replace(/\\/g, '/');
  return (
    normalizedId.endsWith('.tsx') &&
    (normalizedId.includes('/packages/horizon-web-react/src/') ||
      normalizedId.includes('/packages/docs/demos/react/'))
  );
}

/** Compile React TSX before the Vue JSX plugin sees the surrounding docs build. */
export function reactDocsTsxPlugin(): Plugin {
  return {
    name: 'horizon-react-docs-tsx',
    enforce: 'pre',
    async transform(source, id) {
      if (!isReactTsx(id)) return;
      return transformWithOxc(source, id, {
        lang: 'tsx',
        jsx: {
          importSource: 'react',
          runtime: 'automatic',
        },
        sourcemap: true,
      });
    },
  };
}
