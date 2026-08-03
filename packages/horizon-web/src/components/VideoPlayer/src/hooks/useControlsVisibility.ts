import { onBeforeUnmount, ref, watch, type Ref } from 'vue';

export function useControlsVisibility(playing: Ref<boolean>) {
  const controlsVisible = ref(true);
  let controlsTimer: ReturnType<typeof setTimeout> | undefined;

  function clearControlsTimer() {
    if (controlsTimer) clearTimeout(controlsTimer);
    controlsTimer = undefined;
  }

  function showControls(autoHide = true) {
    controlsVisible.value = true;
    clearControlsTimer();
    if (autoHide && playing.value) {
      controlsTimer = setTimeout(() => {
        controlsVisible.value = false;
      }, 2500);
    }
  }

  watch(playing, value => {
    if (value) showControls();
    else {
      controlsVisible.value = true;
      clearControlsTimer();
    }
  });
  onBeforeUnmount(clearControlsTimer);

  return { controlsVisible, showControls };
}
