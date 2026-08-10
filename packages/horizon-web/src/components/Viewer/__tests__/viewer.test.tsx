import { mount, shallowMount } from '@vue/test-utils';
import HViewer from '../src/Viewer';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { HViewerSource } from '..';

describe('Viewer.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.querySelectorAll('.h-viewer').forEach(element => element.remove());
  });

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
        autoHideTools: false,
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
    wrapper.unmount();
  });

  test('closes with Escape only while visible', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: false,
        autoHideTools: false,
        sources: [{ type: 'image', cover: 'first.png' }],
      },
      attachTo: document.body,
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.setProps({ modelValue: true });
    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    window.dispatchEvent(event);
    await nextTick();

    expect(event.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    wrapper.unmount();
  });

  test('navigates with arrow keys and wraps only when loop is enabled', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: ['current'],
        sources: [
          { type: 'image', cover: 'first.png' },
          { type: 'image', cover: 'second.png' },
        ],
      },
      attachTo: document.body,
    });
    const current = () => document.querySelector('.h-viewer__toolbar')?.textContent?.trim();

    expect(current()).toBe('1/2');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();
    expect(current()).toBe('2/2');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();
    expect(current()).toBe('2/2');

    await wrapper.setProps({ loop: true });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();
    expect(current()).toBe('1/2');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await nextTick();
    expect(current()).toBe('2/2');
    wrapper.unmount();
  });

  test('closes on the backdrop only when hideOnClickModal is enabled', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        hideOnClickModal: false,
        sources: [{ type: 'image', cover: 'first.png' }],
      },
      attachTo: document.body,
    });
    const viewer = document.querySelector<HTMLElement>('.h-viewer')!;

    viewer.click();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.setProps({ hideOnClickModal: true });
    document.querySelector<HTMLElement>('.h-viewer__toolbar')!.click();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    viewer.click();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    wrapper.unmount();
  });

  test('runs custom tools and downloads through the provided callback', async () => {
    const customTool = vi.fn();
    const download = vi.fn();
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        downloadFn: download,
        sources: [{ type: 'image', cover: 'full.png', title: 'Full image' }],
        tools: [
          {
            iconName: 'inspect',
            iconSize: '20',
            iconColor: '#000',
            title: 'Inspect',
            handler: customTool,
          },
          'download',
        ],
      },
      attachTo: document.body,
    });
    const buttons = document.querySelectorAll<HTMLButtonElement>('.h-viewer__toolbar-button');

    expect(buttons).toHaveLength(2);
    buttons[0].click();
    buttons[1].click();
    await nextTick();

    expect(customTool).toHaveBeenCalledWith('full.png');
    expect(download).toHaveBeenCalledWith('full.png');
    wrapper.unmount();
  });

  test('rotates an image and invokes interactive legend handlers', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(600);
    const legend = vi.fn();
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: ['rotate', 'legend'],
        sources: [
          {
            type: 'image',
            cover: 'annotated.png',
            legends: [{ x: 10, y: 20, label: 'Finding', handler: legend }],
          },
        ],
      },
      attachTo: document.body,
    });
    const image = document.querySelector<HTMLImageElement>('.h-viewer__wrap img')!;
    Object.defineProperties(image, {
      naturalWidth: { configurable: true, value: 400 },
      naturalHeight: { configurable: true, value: 300 },
    });
    image.dispatchEvent(new Event('load'));
    await nextTick();

    const buttons = document.querySelectorAll<HTMLButtonElement>('.h-viewer__toolbar-button');
    buttons[0].click();
    await nextTick();
    expect(document.querySelector<HTMLElement>('.h-viewer__wrap')!.style.transform).toBe(
      'rotate(-90deg)',
    );

    document.querySelector<HTMLElement>('.h-viewer__legend-body')!.click();
    expect(legend).toHaveBeenCalledWith('annotated.png');

    buttons[1].click();
    await nextTick();
    expect(document.querySelector<HTMLElement>('.h-viewer__legend')!.style.display).toBe('none');
    wrapper.unmount();
  });
});
