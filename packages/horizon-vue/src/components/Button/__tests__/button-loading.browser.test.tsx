import { createApp, h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import HButton from '../src/Button';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Button loading animation', () => {
  it('uses the animated circle indicator shared with Spin', () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render: () => h(HButton, { loading: true }, () => 'Submit'),
    });
    mountedApps.push(app);
    app.mount(root);

    const icon = root.querySelector<SVGElement>('.h-button__loading-icon.h-loading-icon');
    const path = root.querySelector<SVGCircleElement>('.h-loading-icon__path');
    expect(icon).toBeInstanceOf(SVGElement);
    expect(path).toBeInstanceOf(SVGCircleElement);
    expect(getComputedStyle(icon!).width).toBe('16px');
    expect(getComputedStyle(icon!).height).toBe('16px');

    const iconAnimation = icon!.getAnimations()[0];
    const pathAnimation = path!.getAnimations()[0];
    expect(iconAnimation).toBeDefined();
    expect(iconAnimation.playState).toBe('running');
    expect(pathAnimation).toBeDefined();
    expect(pathAnimation.playState).toBe('running');
  });
});
