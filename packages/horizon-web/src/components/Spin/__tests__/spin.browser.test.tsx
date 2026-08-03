import { createApp, h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import HSpin from '../src/Spin';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Spin animation', () => {
  it('rotates during the first animation cycle after a dynamic mount', async () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render: () => h(HSpin),
    });
    mountedApps.push(app);
    app.mount(root);

    const icon = root.querySelector<SVGElement>('.h-spin__icon');
    expect(icon).toBeInstanceOf(SVGElement);

    const animation = icon!.getAnimations()[0];
    expect(animation).toBeDefined();
    expect(animation.playState).toBe('running');

    const firstTransform = getComputedStyle(icon!).transform;
    await new Promise(resolve => setTimeout(resolve, 100));
    const nextTransform = getComputedStyle(icon!).transform;

    expect(firstTransform).not.toBe('none');
    expect(nextTransform).not.toBe(firstTransform);
  });
});
