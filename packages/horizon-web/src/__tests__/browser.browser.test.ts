import { createApp, h, ref } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Vitest Browser', () => {
  it('renders and interacts with a Vue component in Chromium', async () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      setup() {
        const count = ref(0);
        return () =>
          h('button', { type: 'button', onClick: () => count.value++ }, `Count: ${count.value}`);
      },
    });
    mountedApps.push(app);
    app.mount(root);

    const button = page.getByRole('button', { name: 'Count: 0' });
    await userEvent.click(button);

    await expect.element(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
  });
});
