import { nextTick, watch, type Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { VideoPlayerProps } from '../composables/useProps';

export function useVideoRotation(
  props: VideoPlayerProps,
  wrapperRef: Ref<HTMLElement | null>,
  videoRef: Ref<HTMLVideoElement | null>,
) {
  function updateVideoStyle() {
    const video = videoRef.value;
    const wrapper = wrapperRef.value;
    if (!video || !wrapper) return;

    const sideways = props.rotate === 90 || props.rotate === 270;
    video.style.width = sideways && wrapper.clientHeight ? `${wrapper.clientHeight}px` : '100%';
    video.style.height = sideways && wrapper.clientWidth ? `${wrapper.clientWidth}px` : '100%';
    video.style.transform = `translate(-50%, -50%) rotate(${props.rotate}deg)`;
  }

  watch(
    () => props.rotate,
    () => void nextTick(updateVideoStyle),
  );
  useResizeObserver(wrapperRef, updateVideoStyle);

  return { updateVideoStyle };
}
