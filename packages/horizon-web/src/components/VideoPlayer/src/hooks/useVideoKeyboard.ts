import type { Ref } from 'vue';

export interface VideoKeyboardOptions {
  currentTime: Ref<number>;
  togglePlay: () => void;
  seek: (time: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => Promise<void>;
  showControls: () => void;
}

export function useVideoKeyboard(options: VideoKeyboardOptions) {
  function handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (target && ['INPUT', 'BUTTON'].includes(target.tagName)) return;

    const key = event.key.toLowerCase();
    if (key === ' ' || key === 'k') options.togglePlay();
    else if (key === 'arrowleft') options.seek(options.currentTime.value - 5);
    else if (key === 'arrowright') options.seek(options.currentTime.value + 5);
    else if (key === 'm') options.toggleMute();
    else if (key === 'f') void options.toggleFullscreen();
    else return;

    event.preventDefault();
    options.showControls();
  }

  return { handleKeydown };
}
