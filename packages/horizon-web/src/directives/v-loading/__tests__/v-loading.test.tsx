import { describe, expect, test } from 'vitest';
import { sleep } from '~/utils/tools';
import { nextTick, ref } from 'vue';
import { createInstance } from './loadingHelper';
import { $message } from '~/methods';

describe('v-loading.tsx', () => {
  test('child node change wont recreate instance', async () => {
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

    expect(loadingContainer.element.style.zIndex).toBe('2001');

    defaultValue.value = '2';

    await sleep(200);

    expect(loadingContainer.element.style.zIndex).toBe('2001');
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

    setTimeout(async () => {
      $message('message');

      await nextTick();

      const loadingDom = getLoadingDom();

      const messageDom = document.body.querySelector('.h-message') as HTMLElement;

      expect(Number(loadingDom.element.style.zIndex)).toBeGreaterThan(
        Number(messageDom.style.zIndex),
      );
    });
  });
});
