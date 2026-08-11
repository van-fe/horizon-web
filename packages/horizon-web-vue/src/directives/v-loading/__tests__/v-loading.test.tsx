import { describe, expect, test } from 'vitest';
import { sleep } from '~/utils/tools';
import { nextTick, ref } from 'vue';
import { createInstance } from './loadingHelper';
import { $message } from '~/methods';

describe('v-loading.tsx', () => {
  test('keeps the loading layer z-index stable when child content changes', async () => {
    const defaultValue = ref('1');

    const { getLoadingDom } = await createInstance(
      {
        isShow: true,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      },
      defaultValue,
    );

    await sleep(200);

    const loadingContainer = getLoadingDom();
    const initialZIndex = loadingContainer.element.style.zIndex;

    expect(Number(initialZIndex)).toBeGreaterThan(0);

    defaultValue.value = '2';

    await sleep(200);

    expect(getLoadingDom().element.style.zIndex).toBe(initialZIndex);
  });

  test('eventLoop check', async () => {
    const isShow = ref(false);

    const { getLoadingDom } = await createInstance({ isShow }, <span>1</span>);

    isShow.value = true;

    $message('message');

    await nextTick();

    const loadingDom = getLoadingDom();

    const messageDom = document.body.querySelector('.h-message') as HTMLElement;

    expect(Number(loadingDom.element.style.zIndex)).toBeLessThan(Number(messageDom.style.zIndex));
  });

  test('eventLoop check 2', async () => {
    const isShow = ref(false);

    const { getLoadingDom } = await createInstance({ isShow, delay: 0 }, <span>1</span>);

    isShow.value = true;
    await new Promise(resolve => setTimeout(resolve, 0));

    $message('message');

    await nextTick();

    const loadingDom = getLoadingDom();

    const messageDom = document.body.querySelector('.h-message') as HTMLElement;

    expect(Number(loadingDom.element.style.zIndex)).toBeGreaterThan(
      Number(messageDom.style.zIndex),
    );
  });

  test('renders the shared circle loading icon', async () => {
    const { getLoadingDom } = await createInstance({ isShow: true }, <span>Content</span>);

    expect(getLoadingDom().find('svg.h-loading-icon').exists()).toBe(true);
    expect(getLoadingDom().find('circle.h-loading-icon__path').exists()).toBe(true);
  });
});
