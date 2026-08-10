import { describe, expect, it } from 'vitest';
import { isReactTsx, reactDocsTsxPlugin } from './reactDocsTsxPlugin';

describe('React documentation TSX compiler', () => {
  it('selects React package and React demo TSX only', () => {
    expect(isReactTsx('/repo/packages/horizon-web-react/src/components/Button.tsx')).toBe(true);
    expect(isReactTsx('/repo/packages/docs/demos/react/components/Button/basic.tsx')).toBe(true);
    expect(
      isReactTsx('/repo/packages/docs/demos/vue/components/VirtualScroller/ChatDemo.tsx'),
    ).toBe(false);
  });

  it('uses the React automatic JSX runtime', async () => {
    const plugin = reactDocsTsxPlugin();
    const transform = plugin.transform as (
      source: string,
      id: string,
    ) => Promise<{ code: string } | undefined>;
    const result = await transform(
      'export default function Demo() { return <button>Save</button> }',
      '/repo/packages/docs/demos/react/components/Button/basic.tsx',
    );

    expect(result?.code).toContain('react/jsx-runtime');
    expect(result?.code).not.toContain('createVNode');
  });
});
