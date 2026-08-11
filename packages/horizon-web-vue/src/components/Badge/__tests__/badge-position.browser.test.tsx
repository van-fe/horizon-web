import { createApp } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import HAvatar from '../../Avatar/src/Avatar';
import HBadge from '../src/Badge';
import '../../../styles/base.scss';
import '../../../styles/global-variables.scss';
import '../../Avatar/src/style/index.scss';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Badge positioning', () => {
  it('keeps an inner icon badge on the avatar corner in a stretched layout', async () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render: () => (
        <div style="display: grid; height: 80px; align-items: stretch;">
          <HBadge type="icon" content="owner_os" iconSize={12} align="inner" bottom>
            <HAvatar type="work" src="UX" size="small" />
          </HBadge>
        </div>
      ),
    });
    mountedApps.push(app);
    app.mount(root);
    await new Promise(resolve => requestAnimationFrame(resolve));

    const target = root.querySelector<HTMLElement>('.h-avatar');
    const badge = root.querySelector<HTMLElement>('.h-badge');
    const content = root.querySelector<HTMLElement>('.h-badge__content');
    expect(target).toBeInstanceOf(HTMLElement);
    expect(badge).toBeInstanceOf(HTMLElement);
    expect(content).toBeInstanceOf(HTMLElement);

    const targetRect = target!.getBoundingClientRect();
    const badgeRect = badge!.getBoundingClientRect();
    const contentRect = content!.getBoundingClientRect();
    expect(badgeRect.height).toBe(targetRect.height);
    expect(contentRect.right).toBeCloseTo(targetRect.right, 1);
    expect(contentRect.bottom).toBeCloseTo(targetRect.bottom, 1);
  });
});
