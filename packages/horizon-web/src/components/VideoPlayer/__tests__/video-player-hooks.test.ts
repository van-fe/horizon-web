import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useControlsVisibility } from '../src/hooks/useControlsVisibility';
import { useVideoKeyboard } from '../src/hooks/useVideoKeyboard';

describe('VideoPlayer hooks', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('auto-hides controls only while playing', async () => {
    vi.useFakeTimers();
    const playing = ref(false);
    let controls!: ReturnType<typeof useControlsVisibility>;
    const wrapper = mount(
      defineComponent({
        setup: () => {
          controls = useControlsVisibility(playing);
          return () => null;
        },
      }),
    );

    playing.value = true;
    await wrapper.vm.$nextTick();
    expect(controls.controlsVisible.value).toBe(true);
    vi.advanceTimersByTime(2500);
    expect(controls.controlsVisible.value).toBe(false);

    playing.value = false;
    await wrapper.vm.$nextTick();
    expect(controls.controlsVisible.value).toBe(true);
  });

  test('maps keyboard shortcuts and ignores focused controls', () => {
    const currentTime = ref(20);
    const togglePlay = vi.fn();
    const seek = vi.fn();
    const toggleMute = vi.fn();
    const toggleFullscreen = vi.fn().mockResolvedValue(undefined);
    const showControls = vi.fn();
    const { handleKeydown } = useVideoKeyboard({
      currentTime,
      togglePlay,
      seek,
      toggleMute,
      toggleFullscreen,
      showControls,
    });

    handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    expect(seek).toHaveBeenCalledWith(25);
    expect(showControls).toHaveBeenCalled();

    const button = document.createElement('button');
    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: button });
    handleKeydown(event);
    expect(togglePlay).not.toHaveBeenCalled();
  });
});
