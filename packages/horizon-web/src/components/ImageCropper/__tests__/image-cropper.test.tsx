import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { defineComponent, reactive } from 'vue';
import HImageCropper from '../src/ImageCropper';
import { useImageCropper } from '../src/hooks/useImageCropper';
describe('ImageCropper', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: vi.fn(),
      save: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      drawImage: vi.fn(),
      restore: vi.fn(),
    } as any);
  });
  test('clamps zoom and rotates through the hook', () => {
    const emit = vi.fn();
    let state!: ReturnType<typeof useImageCropper>;
    const host = mount(
      defineComponent({
        setup() {
          state = useImageCropper(
            reactive({ src: '', width: 100, height: 100, minZoom: 1, maxZoom: 2, zoomStep: 0.1, crossOrigin: 'anonymous' }) as any,
            emit,
          );
          return () => null;
        },
      }),
    );
    state.setZoom(4);
    state.rotate(90);
    expect(state.zoom.value).toBe(2);
    expect(state.rotation.value).toBe(90);
    host.unmount();
  });
  test('updates zoom and exposes transform actions', async () => {
    const wrapper = mount(HImageCropper, { props: { src: 'data:image/png;base64,test' } });
    const range = wrapper.get('input[type="range"]');
    await range.setValue('1.5');
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toMatchObject({ zoom: 1.5 });
    expect(typeof (wrapper.vm as any).reset).toBe('function');
    expect(typeof (wrapper.vm as any).crop).toBe('function');
  });
});
