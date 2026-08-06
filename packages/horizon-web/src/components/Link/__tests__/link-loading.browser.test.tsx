import type { VueLocaleService } from '@aurora/locale-vue';
import { computed, createApp, defineComponent, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import { localeInjectKey } from '~/provides';
import HLink from '../src/Link';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Link loading layout', () => {
  it('keeps its inline position when loading changes', async () => {
    const loading = ref(false);
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp(
      defineComponent({
        setup: () => () => (
          <div style={{ fontSize: '14px', lineHeight: '24px' }}>
            <span data-reference>Reference</span> <HLink loading={loading.value}>Default</HLink>
          </div>
        ),
      }),
    );
    app.provide(
      localeInjectKey,
      computed(
        () =>
          ({
            langService: {
              td: () => ({ horizonWeb: { link: { loading: 'Loading' } } }),
            },
          }) as unknown as VueLocaleService,
      ),
    );
    mountedApps.push(app);
    app.mount(root);

    const reference = root.querySelector<HTMLElement>('[data-reference]')!;
    const link = root.querySelector<HTMLElement>('.h-link')!;
    const normalOffset = link.getBoundingClientRect().top - reference.getBoundingClientRect().top;
    const normalTextOffset =
      link.querySelector<HTMLElement>('.h-link__inner')!.getBoundingClientRect().top -
      link.getBoundingClientRect().top;

    loading.value = true;
    await nextTick();

    const loadingOffset = link.getBoundingClientRect().top - reference.getBoundingClientRect().top;
    const loadingText = link.querySelector<HTMLElement>('.h-link__inner')!;
    const loadingTextOffset =
      loadingText.getBoundingClientRect().top - link.getBoundingClientRect().top;
    const icon = link.querySelector<SVGElement>('.h-link__loading-icon.h-loading-icon')!;
    const path = icon.querySelector<SVGCircleElement>('.h-loading-icon__path')!;

    expect(loadingOffset).toBe(normalOffset);
    expect(loadingTextOffset).toBe(normalTextOffset);
    expect(getComputedStyle(icon).width).toBe('16px');
    expect(getComputedStyle(icon).height).toBe('16px');
    expect(icon.getAnimations()[0]?.playState).toBe('running');
    expect(path.getAnimations()[0]?.playState).toBe('running');
  });
});
