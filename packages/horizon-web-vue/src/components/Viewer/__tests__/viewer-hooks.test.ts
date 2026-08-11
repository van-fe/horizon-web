import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useHideTools from '../src/composables/useHideTools';
import useNavigation from '../src/composables/useNavigation';
import useZoom from '../src/composables/useZoom';
import { useViewerEmits } from '../src/composables/useEmits';
import { useViewerProps } from '../src/composables/useProps';

describe('Viewer composables', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('auto-hides tools, restores them on interaction and removes listeners when closed', async () => {
    vi.useFakeTimers();
    const visible = ref(false);
    const autoHide = ref(true);
    let tools!: ReturnType<typeof useHideTools>;
    mount(
      defineComponent({
        setup() {
          tools = useHideTools(visible, autoHide);
          return () => null;
        },
      }),
    );

    visible.value = true;
    await nextTick();
    vi.advanceTimersByTime(3000);
    expect(tools.showToolsRef.value).toBe(false);
    window.dispatchEvent(new MouseEvent('mousemove'));
    expect(tools.showToolsRef.value).toBe(true);
    vi.advanceTimersByTime(3000);
    expect(tools.showToolsRef.value).toBe(false);

    visible.value = false;
    await nextTick();
    window.dispatchEvent(new MouseEvent('mousemove'));
    expect(tools.showToolsRef.value).toBe(false);
  });

  test('keeps tools visible when automatic hiding is disabled', async () => {
    vi.useFakeTimers();
    const visible = ref(false);
    const autoHide = ref(false);
    let tools!: ReturnType<typeof useHideTools>;
    mount(
      defineComponent({
        setup() {
          tools = useHideTools(visible, autoHide);
          return () => null;
        },
      }),
    );
    visible.value = true;
    await nextTick();
    vi.advanceTimersByTime(4000);
    expect(tools.showToolsRef.value).toBe(true);
  });

  test('navigates boundaries, same covers, loading changes and looped lists', () => {
    const sources = ref([
      { type: 'image' as const, cover: 'same.png' },
      { type: 'image' as const, cover: 'same.png' },
      { type: 'image' as const, cover: 'different.png' },
    ]);
    const loop = ref(false);
    const navigation = useNavigation(sources, loop);
    navigation.loadingPreviewRef.value = false;
    navigation.goToImg(0);
    expect(navigation.currentIndexRef.value).toBe(0);
    navigation.goToPrevious();
    expect(navigation.previewDisabledRef.value).toBe(true);

    navigation.goToImg(1);
    expect(navigation.loadingPreviewRef.value).toBe(false);
    navigation.goToNext();
    expect(navigation.loadingPreviewRef.value).toBe(true);
    expect(navigation.nextDisabledRef.value).toBe(true);
    navigation.goToNext();
    expect(navigation.currentIndexRef.value).toBe(2);

    loop.value = true;
    expect(navigation.previewDisabledRef.value).toBe(false);
    expect(navigation.nextDisabledRef.value).toBe(false);
    navigation.goToNext();
    expect(navigation.currentIndexRef.value).toBe(0);
    navigation.goToPrevious();
    expect(navigation.currentIndexRef.value).toBe(2);
    navigation.goToPrevious();
    expect(navigation.currentIndexRef.value).toBe(1);
  });

  test('ignores ratio changes until an image has intrinsic dimensions', () => {
    const image = {
      naturalWidth: 0,
      naturalHeight: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      ratio: 1,
    };
    const zoom = useZoom({ width: 800, height: 500 }, image);
    zoom.zoomToRatio(2, { x: 10, y: 20 });
    expect(image.ratio).toBe(1);
  });

  test('validates the public emit and creates a fresh default sources list', () => {
    expect(useViewerEmits['update:modelValue'](false)).toBe(true);
    expect(useViewerEmits['update:modelValue']('false' as never)).toBe(false);
    const factory = useViewerProps.sources.default as () => unknown[];
    expect(factory()).toEqual([]);
    expect(factory()).not.toBe(factory());
  });
});
