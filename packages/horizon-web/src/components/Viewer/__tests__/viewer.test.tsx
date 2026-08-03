import { mount, shallowMount } from '@vue/test-utils';
import HViewer from '../src/Viewer';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { HViewerSource } from '..';

describe('Viewer.tsx', () => {
  afterEach(() => vi.restoreAllMocks());

  test('basic', async () => {
    const generateImages = (count: number) => {
      const list: HViewerSource[] = [];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: 'image',
          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,
          cover: `https://picsum.photos/id/${base + i}/1366/768`,
          title: `Image: ${base + i}`,
        });
      }
      return list;
    };

    const imagesRef = ref<HViewerSource[]>(generateImages(5));

    const wrapper = shallowMount(() => <HViewer sources={imagesRef.value} />);
    const element = wrapper.findComponent(HViewer);

    expect(element.exists()).toBe(true);
  });

  test('uses wheel to browse a long image and ctrl + wheel to zoom it', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1000);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(600);
    const wrapper = mount(HViewer, {
      props: {
        modelValue: false,
        sources: [
          {
            type: 'image',
            cover: 'long-image.png',
          },
        ],
      },
      attachTo: document.body,
    });

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    const viewer = document.querySelector<HTMLElement>('.h-viewer')!;
    const image = viewer.querySelector<HTMLImageElement>('.h-viewer__wrap img')!;
    Object.defineProperties(image, {
      naturalWidth: { configurable: true, value: 500 },
      naturalHeight: { configurable: true, value: 2000 },
    });
    image.dispatchEvent(new Event('load'));
    await nextTick();

    const imageWrap = viewer.querySelector<HTMLElement>('.h-viewer__wrap')!;
    expect(imageWrap.style.top).toBe('0px');
    expect(imageWrap.style.height).toBe('2000px');

    viewer.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120 }));
    await nextTick();
    expect(imageWrap.style.top).toBe('-120px');
    expect(imageWrap.style.height).toBe('2000px');

    const pinchEvent = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      clientX: 500,
      clientY: 200,
      deltaY: -10,
    });
    Object.defineProperty(pinchEvent, 'ctrlKey', { value: true });
    viewer.dispatchEvent(pinchEvent);
    await nextTick();
    expect(Number.parseFloat(imageWrap.style.height)).toBeGreaterThan(2000);
  });
});
