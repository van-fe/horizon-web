import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, reactive } from 'vue';
import { HImageCropper } from '..';
import { useImageCropper } from '../src/hooks/useImageCropper';
import { useImageCropperEmits } from '../src/composables/useEmits';
import type { ImageCropperProps } from '../src/composables/useProps';
import type { ImageCropperExposes } from '../src/composables/useExposes';

interface MockImage {
  crossOrigin: string | null;
  src: string;
  naturalWidth: number;
  naturalHeight: number;
  onload: (() => void) | null;
  onerror: ((event: Event) => void) | null;
}

const images: MockImage[] = [];

function installImageMock() {
  vi.stubGlobal(
    'Image',
    class {
      crossOrigin: string | null = null;
      src = '';
      naturalWidth = 200;
      naturalHeight = 100;
      onload: (() => void) | null = null;
      onerror: ((event: Event) => void) | null = null;

      constructor() {
        images.push(this);
      }
    },
  );
}

function mountHook(overrides: Record<string, unknown> = {}) {
  const emit = vi.fn();
  let state!: ReturnType<typeof useImageCropper>;
  const props = reactive({
    src: 'source.png',
    width: 100,
    height: 100,
    minZoom: 1,
    maxZoom: 2,
    zoomStep: 0.1,
    crossOrigin: 'anonymous',
    movable: true,
    wheelZoom: true,
    outputType: 'image/png',
    quality: 0.92,
    ...overrides,
  });
  const host = mount(
    defineComponent({
      setup() {
        state = useImageCropper(props as ImageCropperProps, emit);
        return () => null;
      },
    }),
  );
  return { emit, host, props, state };
}

describe('ImageCropper', () => {
  const context = {
    clearRect: vi.fn(),
    save: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    drawImage: vi.fn(),
    restore: vi.fn(),
  };

  beforeEach(() => {
    images.length = 0;
    Object.values(context).forEach(mock => mock.mockClear());
    installImageMock();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('validates every public emit payload defensively', () => {
    expect(useImageCropperEmits.change({ zoom: 1, rotation: 0, x: 0, y: 0 })).toBe(true);
    expect(useImageCropperEmits.change(undefined as never)).toBe(false);
    expect(useImageCropperEmits.load()).toBe(true);
    expect(useImageCropperEmits.error(new Event('error'))).toBe(true);
    expect(useImageCropperEmits.error({} as never)).toBe(false);
    const blob = new Blob(['crop'], { type: 'image/png' });
    expect(useImageCropperEmits.crop(blob, 'data:image/png;base64,out')).toBe(true);
    expect(useImageCropperEmits.crop({} as never, 'data:image/png;base64,out')).toBe(false);
    expect(useImageCropperEmits.crop(blob, 1 as never)).toBe(false);
  });

  test('loads with the configured CORS mode, resets transforms and draws the image', async () => {
    const wrapper = mount(HImageCropper, {
      props: { src: 'photo.png', width: 100, height: 80, crossOrigin: 'use-credentials' },
    });
    const image = images[0];

    expect(image.src).toBe('photo.png');
    expect(image.crossOrigin).toBe('use-credentials');
    image.onload?.();
    await flushPromises();

    expect(wrapper.emitted('load')).toHaveLength(1);
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toEqual({
      zoom: 1,
      rotation: 0,
      x: 0,
      y: 0,
    });
    expect(context.drawImage).toHaveBeenCalledWith(image, -100, -50);
  });

  test('emits image failures and removes image callbacks on unmount', () => {
    const wrapper = mount(HImageCropper, { props: { src: 'broken.png' } });
    const image = images[0];
    const error = new Event('error');

    image.onerror?.(error);
    expect(wrapper.emitted('error')).toEqual([[error]]);

    wrapper.unmount();
    expect(image.onload).toBeNull();
    expect(image.onerror).toBeNull();
  });

  test('clamps zoom and rotates through the public hook actions', () => {
    const { emit, host, state } = mountHook();

    state.setZoom(4);
    state.rotate(450);

    expect(state.zoom.value).toBe(2);
    expect(state.rotation.value).toBe(90);
    expect(emit).toHaveBeenLastCalledWith('change', {
      zoom: 2,
      rotation: 90,
      x: 0,
      y: 0,
    });
    host.unmount();
  });

  test('pans only while movable and uses wheel direction to update zoom', () => {
    const { emit, host, state } = mountHook();
    const canvas = document.createElement('canvas');
    canvas.setPointerCapture = vi.fn();
    canvas.releasePointerCapture = vi.fn();
    state.canvas.value = canvas;

    state.onPointerdown({ clientX: 10, clientY: 15, pointerId: 7 } as PointerEvent);
    state.onPointermove({ clientX: 30, clientY: 45 } as PointerEvent);
    state.onPointerup({ pointerId: 7 } as PointerEvent);

    expect(canvas.setPointerCapture).toHaveBeenCalledWith(7);
    expect(canvas.releasePointerCapture).toHaveBeenCalledWith(7);
    expect(emit).toHaveBeenLastCalledWith('change', {
      zoom: 1,
      rotation: 0,
      x: 20,
      y: 30,
    });

    const preventDefault = vi.fn();
    state.onWheel({ deltaY: -1, preventDefault } as unknown as WheelEvent);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(state.zoom.value).toBe(1.1);
    state.onWheel({ deltaY: 1, preventDefault } as unknown as WheelEvent);
    expect(state.zoom.value).toBe(1);
    host.unmount();
  });

  test('handles pointer release and crop before a canvas is available', async () => {
    const { host, state } = mountHook();
    state.onPointerdown({ clientX: 0, clientY: 0, pointerId: 1 } as PointerEvent);
    state.onPointerup({ pointerId: 1 } as PointerEvent);
    await expect(state.crop()).rejects.toThrow('Crop canvas is not ready.');
    host.unmount();
  });

  test('ignores dragging and wheel input when those interactions are disabled', () => {
    const { emit, host, state } = mountHook({ movable: false, wheelZoom: false });
    const preventDefault = vi.fn();

    state.onPointerdown({ clientX: 0, clientY: 0, pointerId: 1 } as PointerEvent);
    state.onPointermove({ clientX: 20, clientY: 30 } as PointerEvent);
    state.onWheel({ deltaY: -1, preventDefault } as unknown as WheelEvent);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(emit).not.toHaveBeenCalled();
    host.unmount();
  });

  test('exports a blob and data URL and emits the crop result', async () => {
    const blob = new Blob(['cropped'], { type: 'image/webp' });
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/webp;base64,out');
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(callback => callback(blob));
    const wrapper = mount(HImageCropper, {
      props: { src: 'photo.png', outputType: 'image/webp', quality: 0.8 },
    });

    const result = await (wrapper.vm as unknown as ImageCropperExposes).crop();

    expect(result).toEqual({ blob, dataUrl: 'data:image/webp;base64,out' });
    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith('image/webp', 0.8);
    expect(wrapper.emitted('crop')).toEqual([[blob, 'data:image/webp;base64,out']]);
  });

  test('rejects when the browser cannot create a cropped blob', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,out');
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(callback => callback(null));
    const wrapper = mount(HImageCropper, { props: { src: 'photo.png' } });

    await expect((wrapper.vm as unknown as ImageCropperExposes).crop()).rejects.toThrow(
      'Unable to export cropped image.',
    );
    expect(wrapper.emitted('crop')).toBeUndefined();
  });

  test('exposes action slot callbacks and renders zoom bounds and viewport dimensions', async () => {
    const blob = new Blob(['slot-crop'], { type: 'image/png' });
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,slot');
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(callback => callback(blob));
    let actions!: {
      reset: () => void;
      rotate: (degrees?: number) => void;
      crop: () => Promise<void>;
    };
    const wrapper = mount(HImageCropper, {
      props: {
        src: 'photo.png',
        width: 320,
        height: 180,
        minZoom: 0.5,
        maxZoom: 4,
        zoomStep: 0.25,
      },
      slots: {
        actions: (slotActions?: typeof actions) => {
          if (!slotActions) return null;
          actions = slotActions;
          return <button data-test="custom-actions">Custom actions</button>;
        },
      },
    });

    expect(wrapper.get('.h-image-cropper__viewport').attributes('style')).toContain('width: 320px');
    expect(wrapper.get('.h-image-cropper__viewport').attributes('style')).toContain('height: 180px');
    expect(wrapper.get('canvas').attributes()).toMatchObject({ width: '320', height: '180' });
    expect(wrapper.get('input[type="range"]').attributes()).toMatchObject({
      min: '0.5',
      max: '4',
      step: '0.25',
    });
    expect(wrapper.get('[data-test="custom-actions"]').text()).toBe('Custom actions');

    actions.rotate(45);
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ rotation: 45 });
    actions.reset();
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ rotation: 0, zoom: 0.5 });
    await actions.crop();
    expect(wrapper.emitted('crop')).toEqual([[blob, 'data:image/png;base64,slot']]);

    await wrapper.setProps({ width: 321, height: 181 });
    await nextTick();
    expect(wrapper.get('.h-image-cropper__viewport').attributes('style')).toContain('width: 321px');
  });

  test('runs default toolbar actions and the native range input', async () => {
    const blob = new Blob(['crop'], { type: 'image/png' });
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,out');
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(callback => callback(blob));
    const wrapper = mount(HImageCropper, { props: { src: 'photo.png' } });
    images[0].onload?.();
    await flushPromises();

    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ rotation: 90 });
    await buttons[1].trigger('click');
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ rotation: 0 });
    await wrapper.get('input[type="range"]').setValue('1.5');
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ zoom: 1.5 });
    await buttons[2].trigger('click');
    await nextTick();
    expect(wrapper.emitted('crop')).toEqual([[blob, 'data:image/png;base64,out']]);
  });
});
