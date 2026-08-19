import { mount } from '@vue/test-utils';
import { KeepAlive, defineComponent, nextTick, ref } from 'vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import HWatermark from '..';
import { getDpr, rotateCanvas, setWaterMarkStyle } from '../src/utils/base';

const context = {
  drawImage: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({
    width: 40,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: 40,
  })),
  restore: vi.fn(),
  rotate: vi.fn(),
  translate: vi.fn(),
};

describe('Watermark', () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(320);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(180);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,test');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    context.fillText.mockClear();
    context.drawImage.mockClear();
  });

  test('renders slot content and a non-interactive watermark layer', async () => {
    const content = ref<string | string[]>(['Aurora', 'Internal']);
    const wrapper = mount(() => (
      <HWatermark content={content.value} offset={[12, 24]} opacity={0.25} zIndex={7}>
        <p>Protected content</p>
      </HWatermark>
    ));

    await nextTick();

    expect(wrapper.text()).toContain('Protected content');
    expect(context.fillText).toHaveBeenCalledWith('Aurora', expect.any(Number), expect.any(Number), 40);
    expect(context.fillText).toHaveBeenCalledWith(
      'Internal',
      expect.any(Number),
      expect.any(Number),
      40,
    );

    const layer = wrapper.element.lastElementChild as HTMLElement;
    expect(layer).not.toBeNull();
    expect(layer.style.pointerEvents).toBe('none');
    expect(layer.style.position).toBe('absolute');
    expect(layer.style.backgroundPosition).toBe('12px 24px');
    expect(layer.style.opacity).toBe('0.25');
    expect(layer.style.zIndex).toBe('7');

    content.value = [];
    await nextTick();
    expect(context.fillText).toHaveBeenLastCalledWith(
      '',
      expect.any(Number),
      expect.any(Number),
      40,
    );
  });

  test('global mode mounts to body and cleans up on unmount', async () => {
    const wrapper = mount(() => <HWatermark global={true}>content</HWatermark>);
    await nextTick();

    const layer = Array.from(document.body.children).find(
      element => element !== wrapper.element.parentElement && (element as HTMLElement).style.zIndex === '99999',
    ) as HTMLElement | undefined;

    expect(layer?.style.position).toBe('fixed');
    wrapper.unmount();
    expect(layer?.isConnected).toBe(false);
  });

  test('mounts into a custom container and removes the layer on unmount', async () => {
    const container = document.createElement('section');
    document.body.appendChild(container);
    const wrapper = mount(HWatermark, {
      props: { container, content: 'Private' },
      slots: { default: 'content' },
    });
    await nextTick();

    const layer = container.lastElementChild as HTMLElement;
    expect(layer).not.toBeNull();
    expect(layer.style.backgroundImage).toContain('data:image/png');

    wrapper.unmount();
    expect(layer.isConnected).toBe(false);
    container.remove();
  });

  test('reports and restores a watermark layer removed from the DOM', async () => {
    const wrapper = mount(HWatermark, { props: { content: 'Protected' } });
    await nextTick();
    await new Promise(resolve => setTimeout(resolve));

    const component = wrapper.findComponent(HWatermark);
    const firstLayer = wrapper.element.lastElementChild as HTMLElement;
    firstLayer.remove();
    await vi.waitFor(() => {
      expect(component.emitted('tampered')).toHaveLength(1);
      expect(wrapper.element.lastElementChild).not.toBe(firstLayer);
    });
    expect((wrapper.element.lastElementChild as HTMLElement).style.pointerEvents).toBe('none');
  });

  test('reports an edited layer and redraws after a real mutation', async () => {
    const wrapper = mount(HWatermark, { props: { content: 'Protected' } });
    await nextTick();
    await new Promise(resolve => setTimeout(resolve));

    const component = wrapper.findComponent(HWatermark);
    const firstLayer = wrapper.element.lastElementChild as HTMLElement;
    firstLayer.style.opacity = '0.9';

    await vi.waitFor(() => expect(component.emitted('tampered')).toHaveLength(1));
    expect(wrapper.element.lastElementChild).not.toBe(firstLayer);
  });

  test('draws image watermarks and falls back to text when loading fails', async () => {
    const images: Array<{
      crossOrigin: string;
      src: string;
      onload: null | (() => void);
      onerror: null | (() => void);
    }> = [];
    class TestImage {
      crossOrigin = '';
      src = '';
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;
      constructor() {
        images.push(this);
      }
    }
    vi.stubGlobal('Image', TestImage);
    const wrapper = mount(HWatermark, {
      props: { image: '/mark-one.png', content: 'Fallback', width: 80, height: 40 },
    });
    await nextTick();

    expect(images[0]).toMatchObject({ crossOrigin: 'anonymous', src: '/mark-one.png' });
    images[0].onload?.();
    expect(context.drawImage).toHaveBeenCalledWith(
      images[0],
      expect.any(Number),
      expect.any(Number),
      160,
      80,
    );

    await wrapper.setProps({ image: '/mark-two.png' });
    await nextTick();
    images.at(-1)?.onerror?.();
    expect(context.fillText).toHaveBeenCalledWith(
      'Fallback',
      expect.any(Number),
      expect.any(Number),
      40,
    );
  });

  test('deactivates, clears and restores the watermark through KeepAlive', async () => {
    const show = ref(true);
    const Host = defineComponent({
      setup() {
        return () => (
          <KeepAlive>{show.value ? <HWatermark content="Cached">content</HWatermark> : null}</KeepAlive>
        );
      },
    });
    const wrapper = mount(Host);
    await nextTick();
    expect(wrapper.find('.h-watermark').element.children).toHaveLength(1);

    show.value = false;
    await nextTick();
    show.value = true;
    await nextTick();
    expect(wrapper.find('.h-watermark').element.children).toHaveLength(1);
  });

  test('gracefully skips rendering when Canvas 2D is unavailable', async () => {
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValueOnce(null);
    const wrapper = mount(HWatermark, { props: { content: 'No canvas' } });
    await nextTick();
    expect(wrapper.find('.h-watermark').element.children).toHaveLength(0);
  });

  test('ignores a stale asynchronous image load after unmount', async () => {
    let pendingImage!: {
      crossOrigin: string;
      src: string;
      onload: null | (() => void);
      onerror: null | (() => void);
    };
    vi.stubGlobal(
      'Image',
      class {
        crossOrigin = '';
        src = '';
        onload: null | (() => void) = null;
        onerror: null | (() => void) = null;
        constructor() {
          pendingImage = this;
        }
      },
    );
    const wrapper = mount(HWatermark, { props: { image: '/slow.png' } });
    await nextTick();
    wrapper.unmount();
    pendingImage.onload?.();
    expect(document.body.querySelector('.h-watermark')).toBeNull();
  });
});

describe('watermark canvas helpers', () => {
  test('serializes the watermark style', () => {
    const element = document.createElement('div');

    setWaterMarkStyle(element, 'data:test', 12, 0.4, [3, 5], true);

    expect(element.style.backgroundImage).toBe('url("data:test")');
    expect(element.style.backgroundPosition).toBe('3px 5px');
    expect(element.style.position).toBe('fixed');
    expect(element.style.zIndex).toBe('12');
  });

  test('rotates around the requested origin and keeps dpr at least two', () => {
    const canvasContext = {
      rotate: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    rotateCanvas(canvasContext, 10, 20, 90);

    expect(canvasContext.translate).toHaveBeenNthCalledWith(1, 10, 20);
    expect(canvasContext.rotate).toHaveBeenCalledWith(Math.PI / 2);
    expect(canvasContext.translate).toHaveBeenNthCalledWith(2, -10, -20);
    expect(getDpr()).toBeGreaterThanOrEqual(2);
  });

  test('uses a device pixel ratio above the minimum', () => {
    vi.spyOn(window, 'devicePixelRatio', 'get').mockReturnValue(3);
    expect(getDpr()).toBe(3);
  });
});
