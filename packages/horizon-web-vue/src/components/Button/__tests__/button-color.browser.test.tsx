import { createApp, h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import HButton from '../src/Button';
import '../../../styles/base.scss';
import '../../../styles/global-variables.scss';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Button custom color', () => {
  it('applies a custom palette through the variables consumed by Button styles', () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render: () => h(HButton, { color: '#476582' }, () => 'Custom action'),
    });
    mountedApps.push(app);
    app.mount(root);

    const button = root.querySelector<HTMLButtonElement>('.h-button');
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(getComputedStyle(button!).backgroundColor).toBe('rgb(71, 101, 130)');
  });
});
