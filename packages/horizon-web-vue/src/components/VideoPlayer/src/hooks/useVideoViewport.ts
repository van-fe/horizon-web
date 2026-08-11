import { onBeforeUnmount, onMounted, ref, watch, type Ref, type SetupContext } from 'vue';
import type { VideoPlayerEmits } from '../composables/useEmits';

type Emit = SetupContext<VideoPlayerEmits>['emit'];

export function useVideoViewport(
  wrapperRef: Ref<HTMLElement | null>,
  videoRef: Ref<HTMLVideoElement | null>,
  emit: Emit,
) {
  const isFullscreen = ref(false);
  const isPictureInPicture = ref(false);
  const supportsPictureInPicture = ref(false);

  async function toggleFullscreen() {
    const wrapper = wrapperRef.value;
    if (!wrapper || typeof document === 'undefined') return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await wrapper.requestFullscreen();
    } catch {
      // Browsers can reject fullscreen when they do not consider the action user initiated.
    }
  }

  async function togglePictureInPicture() {
    const video = videoRef.value;
    if (!video || typeof document === 'undefined') return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await video.requestPictureInPicture();
    } catch {
      // Availability also depends on the source and browser policy.
    }
  }

  function handleFullscreenChange() {
    isFullscreen.value = document.fullscreenElement === wrapperRef.value;
    emit('fullscreenChange', isFullscreen.value);
  }

  function handleEnterPictureInPicture() {
    isPictureInPicture.value = true;
  }

  function handleLeavePictureInPicture() {
    isPictureInPicture.value = false;
  }

  function bindPictureInPictureEvents(video: HTMLVideoElement | null) {
    video?.addEventListener('enterpictureinpicture', handleEnterPictureInPicture);
    video?.addEventListener('leavepictureinpicture', handleLeavePictureInPicture);
  }

  function unbindPictureInPictureEvents(video: HTMLVideoElement | null) {
    video?.removeEventListener('enterpictureinpicture', handleEnterPictureInPicture);
    video?.removeEventListener('leavepictureinpicture', handleLeavePictureInPicture);
  }

  watch(videoRef, (video, previousVideo) => {
    unbindPictureInPictureEvents(previousVideo);
    bindPictureInPictureEvents(video);
  });

  onMounted(() => {
    supportsPictureInPicture.value =
      'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    bindPictureInPictureEvents(videoRef.value);
  });
  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    unbindPictureInPictureEvents(videoRef.value);
  });

  return {
    isFullscreen,
    isPictureInPicture,
    supportsPictureInPicture,
    toggleFullscreen,
    togglePictureInPicture,
  };
}
