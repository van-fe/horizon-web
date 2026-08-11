import { mount, shallowMount } from '@vue/test-utils';
import HViewer from '../src/Viewer';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { HViewerSource } from '..';
import HVideoPlayer from '../../VideoPlayer/src/VideoPlayer';

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

  test('starts at initIndex and applies the public zIndex to the teleported viewer', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        initIndex: 1,
        zIndex: 4321,
        autoHideTools: false,
        tools: ['current'],
        sources: [
          { type: 'image', cover: 'first.png' },
          { type: 'image', cover: 'second.png' },
        ],
      },
      attachTo: document.body,
    });
    await nextTick();
    const viewer = document.querySelector<HTMLElement>('.h-viewer')!;
    expect(Number(viewer.style.zIndex)).toBeGreaterThanOrEqual(4321);
    expect(viewer.querySelector('.h-viewer__toolbar')?.textContent?.trim()).toBe('2/2');
    expect(viewer.querySelector<HTMLImageElement>('.h-viewer__wrap img')?.src).toContain(
      'second.png',
    );
    wrapper.unmount();
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
    await nextTick();
    await nextTick();
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

  test('uses the complete image toolbar for thumbnails, navigation, zoom and fit modes', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(600);
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        sources: [
          { type: 'image', cover: 'first.png', thumbnail: 'first-thumb.png' },
          { type: 'image', cover: 'second.png', thumbnail: 'second-thumb.png' },
        ],
      },
      attachTo: document.body,
    });
    const loadCurrentImage = async (width = 400, height = 300) => {
      const image = document.querySelector<HTMLImageElement>('.h-viewer__wrap img')!;
      Object.defineProperties(image, {
        naturalWidth: { configurable: true, value: width },
        naturalHeight: { configurable: true, value: height },
      });
      image.dispatchEvent(new Event('load'));
      await nextTick();
    };
    await loadCurrentImage();

    let buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.h-viewer__toolbar-button'),
    );
    const navbar = document.querySelector<HTMLElement>('.h-viewer__navbar')!;
    expect(navbar.style.display).not.toBe('none');
    buttons[0].click();
    await nextTick();
    expect(navbar.style.display).toBe('none');
    buttons[0].click();
    await nextTick();

    const wrap = document.querySelector<HTMLElement>('.h-viewer__wrap')!;
    const initialWidth = Number.parseFloat(wrap.style.width);
    buttons[4].click();
    await nextTick();
    const zoomedWidth = Number.parseFloat(wrap.style.width);
    expect(zoomedWidth).toBeGreaterThan(initialWidth);
    buttons[3].click();
    await nextTick();
    expect(Number.parseFloat(wrap.style.width)).toBeLessThan(zoomedWidth);

    buttons[5].click();
    await nextTick();
    expect(wrap.style.width).toBe('400px');
    wrap.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    await nextTick();

    buttons[2].click();
    await nextTick();
    await loadCurrentImage();
    expect(document.querySelector<HTMLImageElement>('.h-viewer__wrap img')?.src).toContain(
      'second.png',
    );
    document.querySelectorAll<HTMLLIElement>('.h-viewer__navbar li')[0].click();
    await nextTick();
    expect(document.querySelector<HTMLImageElement>('.h-viewer__wrap img')?.src).toContain(
      'first.png',
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    await nextTick();
    buttons = Array.from(document.querySelectorAll('.h-viewer__toolbar-button'));
    expect(buttons).toHaveLength(8);
    wrapper.unmount();
  });

  test('renders video defaults, reports ready and rotates through all four degrees', async () => {
    const download = vi.fn();
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        downloadFn: download,
        sources: [
          {
            type: 'video',
            cover: 'poster.png',
            videoSources: [{ src: 'movie.mp4', type: 'video/mp4' }],
          },
        ],
      },
      attachTo: document.body,
    });
    const player = wrapper.getComponent(HVideoPlayer);
    player.vm.$emit('ready', player.get('video').element);
    await nextTick();
    expect(document.querySelector<HTMLElement>('.h-viewer__loading')?.style.display).toBe('none');

    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.h-viewer__toolbar-button'),
    );
    expect(buttons).toHaveLength(2);
    for (const degree of [90, 180, 270, 0]) {
      buttons[0].click();
      await nextTick();
      expect(wrapper.getComponent(HVideoPlayer).props('rotate')).toBe(degree);
    }
    buttons[1].click();
    await nextTick();
    expect(download).toHaveBeenCalledWith('movie.mp4');
    wrapper.unmount();
  });

  test('warns for a video without a downloadable source', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: ['download'],
        sources: [{ type: 'video', cover: 'poster.png', videoSources: [] }],
      },
      attachTo: document.body,
    });
    document.querySelector<HTMLButtonElement>('.h-viewer__toolbar-button')!.click();
    await nextTick();
    expect(warn).toHaveBeenCalledWith(
      '[HORIZOHWEB] Viewer Error: videoSources[0].src is required!',
    );
    wrapper.unmount();
  });

  test('downloads blobs and falls back to the source URL when fetch rejects', async () => {
    const blob = new Blob(['image'], { type: 'image/png' });
    const fetchMock = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce(new Response(blob))
      .mockRejectedValueOnce(new Error('offline'));
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:viewer-test');
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: ['download'],
        sources: [{ type: 'image', cover: 'download.png', title: 'report.png' }],
      },
      attachTo: document.body,
    });
    const downloadButton = document.querySelector<HTMLButtonElement>('.h-viewer__toolbar-button')!;
    downloadButton.click();
    await vi.waitFor(() => expect(click).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith('download.png');
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    downloadButton.click();
    await vi.waitFor(() => expect(click).toHaveBeenCalledTimes(2));
    expect(error).toHaveBeenCalledWith(expect.any(Error));
    expect(warn).toHaveBeenCalledWith(
      'download fetch error, fallback to download directly, url:',
      'download.png',
    );
    wrapper.unmount();
  });

  test('reacts to viewport ResizeObserver updates and source list replacements', async () => {
    let resizeCallback!: ResizeObserverCallback;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
    const wrapper = mount(HViewer, {
      props: {
        modelValue: false,
        autoHideTools: false,
        sources: [{ type: 'image', cover: 'one.png' }],
      },
      attachTo: document.body,
    });
    await wrapper.setProps({ modelValue: true });
    await nextTick();
    await nextTick();
    resizeCallback(
      [{ contentRect: { width: 900, height: 507 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    );
    await nextTick();

    await wrapper.setProps({
      sources: [
        { type: 'video', cover: 'video.png', videoSources: [{ src: 'video.mp4' }] },
        { type: 'image', cover: 'two.png' },
      ],
    });
    await nextTick();
    expect(document.querySelector<HTMLElement>('.h-viewer__preview')?.style.bottom).toBe('208px');
    wrapper.unmount();
    vi.unstubAllGlobals();
  });

  test('drags loaded images and normalizes line, page and shifted wheel deltas', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(500);
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: [],
        sources: [{ type: 'image', cover: 'large.png' }],
      },
      attachTo: document.body,
    });
    await nextTick();
    await nextTick();
    const viewer = document.querySelector<HTMLElement>('.h-viewer')!;
    const image = viewer.querySelector<HTMLImageElement>('.h-viewer__wrap > img')!;
    Object.defineProperties(image, {
      naturalWidth: { configurable: true, value: 500 },
      naturalHeight: { configurable: true, value: 2000 },
    });
    image.dispatchEvent(new Event('load'));
    await nextTick();
    const wrap = viewer.querySelector<HTMLElement>('.h-viewer__wrap')!;

    wrap.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 100 }));
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 140, clientY: 130 }),
    );
    await nextTick();
    expect(wrap.style.transition).toBe('none');
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    await nextTick();
    expect(wrap.style.transition).toContain('0.3s');

    const beforeLine = Number.parseFloat(wrap.style.top);
    viewer.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 2,
        deltaMode: WheelEvent.DOM_DELTA_LINE,
      }),
    );
    await nextTick();
    expect(Number.parseFloat(wrap.style.top)).toBeLessThan(beforeLine);

    const beforePage = Number.parseFloat(wrap.style.top);
    viewer.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 1,
        deltaMode: WheelEvent.DOM_DELTA_PAGE,
      }),
    );
    await nextTick();
    expect(Number.parseFloat(wrap.style.top)).toBeLessThan(beforePage);

    const beforeShift = Number.parseFloat(wrap.style.left);
    const shiftedWheel = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 24,
      shiftKey: true,
    });
    viewer.dispatchEvent(shiftedWheel);
    await nextTick();
    expect(Number.isFinite(Number.parseFloat(wrap.style.left))).toBe(true);
    expect(shiftedWheel.defaultPrevented).toBe(true);
    expect(Number.parseFloat(wrap.style.left)).toBeLessThanOrEqual(beforeShift);
    await new Promise(resolve => setTimeout(resolve, 140));
    expect(wrap.style.transition).toContain('0.3s');
    wrapper.unmount();
  });

  test('ignores stale image loads and wheel browsing for video sources', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        tools: ['next'],
        sources: [
          { type: 'image', cover: 'stale.png' },
          { type: 'video', cover: 'poster.png', videoSources: [{ src: 'movie.mp4' }] },
        ],
      },
      attachTo: document.body,
    });
    const staleImage = document.querySelector<HTMLImageElement>('.h-viewer__wrap img')!;
    document.querySelector<HTMLButtonElement>('.h-viewer__toolbar-button')!.click();
    await nextTick();
    Object.defineProperties(staleImage, {
      naturalWidth: { configurable: true, value: 100 },
      naturalHeight: { configurable: true, value: 100 },
    });
    staleImage.dispatchEvent(new Event('load'));
    const viewer = document.querySelector<HTMLElement>('.h-viewer')!;
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 20 });
    viewer.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(false);
    expect(wrapper.findComponent(HVideoPlayer).exists()).toBe(true);
    wrapper.unmount();
  });

  test('handles inert legends, unknown tools, header bubbling and title-less downloads', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(123456);
    vi.spyOn(window, 'fetch').mockResolvedValue(new Response(new Blob(['image'])));
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:title-less');
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      expect(this.download).toBe('123456');
    });
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        hideOnClickModal: true,
        tools: ['legend', 'unsupported' as never, 'download'],
        sources: [
          {
            type: 'image',
            cover: 'plain.png',
            legends: [{ x: 0, y: 0, label: 'Informational' }],
          },
        ],
      },
      attachTo: document.body,
    });
    const image = document.querySelector<HTMLImageElement>('.h-viewer__wrap img')!;
    Object.defineProperties(image, {
      naturalWidth: { configurable: true, value: 0 },
      naturalHeight: { configurable: true, value: 0 },
    });
    image.dispatchEvent(new Event('load'));
    await nextTick();
    document.querySelector<HTMLElement>('.h-viewer__legend-body')!.click();
    document.querySelector<HTMLElement>('.h-viewer__header')!.click();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    const buttons = document.querySelectorAll<HTMLButtonElement>('.h-viewer__toolbar-button');
    expect(buttons).toHaveLength(2);
    buttons[1].click();
    await vi.waitFor(() => expect(anchorClick).toHaveBeenCalledOnce());
    expect(now).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('keeps global viewer shortcuts inert while closed', async () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: false,
        autoHideTools: false,
        sources: [
          { type: 'image', cover: 'one.png' },
          { type: 'image', cover: 'two.png' },
        ],
      },
      attachTo: document.body,
    });

    for (const key of ['Escape', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      document.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    }
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    wrapper.unmount();
  });

  test('cleans up an immediate open before the deferred viewport observer attaches', () => {
    const wrapper = mount(HViewer, {
      props: {
        modelValue: true,
        autoHideTools: false,
        sources: [{ type: 'image', cover: 'deferred.png' }],
      },
      attachTo: document.body,
    });
    wrapper.unmount();
  });
});
