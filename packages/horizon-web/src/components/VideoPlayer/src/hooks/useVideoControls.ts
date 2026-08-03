import { computed, nextTick, onMounted, ref, watch, type Ref, type SetupContext } from 'vue';
import type { VideoPlayerEmits } from '../composables/useEmits';
import type { VideoPlayerProps } from '../composables/useProps';

type Emit = SetupContext<VideoPlayerEmits>['emit'];

export function useVideoControls(
  props: VideoPlayerProps,
  videoRef: Ref<HTMLVideoElement | null>,
  emit: Emit,
  onMetadataLoaded: () => void,
) {
  const defaultSourceIndex = props.sources.findIndex(source => source.default);
  const currentSourceIndex = ref(defaultSourceIndex >= 0 ? defaultSourceIndex : 0);
  const playing = ref(false);
  const loading = ref(false);
  const showError = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const buffered = ref(0);
  const volume = ref(props.volume);
  const muted = ref(props.muted);
  const playbackRate = ref(1);
  let resumeAfterSourceChange = false;
  let timeAfterSourceChange = 0;

  const currentSource = computed(() => props.sources[currentSourceIndex.value] ?? null);
  const bufferedProgress = computed(() =>
    duration.value > 0 ? Math.min(100, (buffered.value / duration.value) * 100) : 0,
  );

  async function play() {
    if (!videoRef.value || showError.value) return;
    await videoRef.value.play();
  }

  function pause() {
    videoRef.value?.pause();
  }

  function togglePlay() {
    if (playing.value) pause();
    else void play().catch(() => undefined);
  }

  function seek(time: number) {
    const video = videoRef.value;
    if (!video || duration.value <= 0) return;
    const nextTime = Math.max(0, Math.min(duration.value, time));
    video.currentTime = nextTime;
    currentTime.value = nextTime;
    emit('seek', nextTime);
  }

  function changeProgress(value: number | number[]) {
    if (!Array.isArray(value)) seek(value);
  }

  function toggleMute() {
    const video = videoRef.value;
    if (!video) return;
    video.muted = !video.muted;
    muted.value = video.muted;
    emit('volumeChange', video.volume, video.muted);
  }

  function changeVolume(value: number | number[]) {
    const video = videoRef.value;
    if (!video || Array.isArray(value)) return;
    const nextVolume = value / 100;
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    volume.value = nextVolume;
    muted.value = video.muted;
    emit('volumeChange', nextVolume, video.muted);
  }

  function changeRate(value: unknown) {
    const video = videoRef.value;
    const rate = Number(value);
    if (!video || !Number.isFinite(rate) || rate <= 0) return;
    video.playbackRate = rate;
    playbackRate.value = rate;
    emit('rateChange', rate);
  }

  function changeSource(index: number) {
    const video = videoRef.value;
    if (!video || index === currentSourceIndex.value || !props.sources[index]) return;
    resumeAfterSourceChange = !video.paused;
    timeAfterSourceChange = video.currentTime;
    currentSourceIndex.value = index;
    showError.value = false;
    loading.value = true;
    void nextTick(() => videoRef.value?.load());
    emit('sourceChange', props.sources[index], index);
  }

  function updateBuffered() {
    const video = videoRef.value;
    if (!video || !video.buffered.length) {
      buffered.value = 0;
      return;
    }
    buffered.value = video.buffered.end(video.buffered.length - 1);
  }

  function handleLoadedMetadata(event: Event) {
    const video = event.currentTarget as HTMLVideoElement;
    duration.value = Number.isFinite(video.duration) ? video.duration : 0;
    volume.value = video.volume;
    muted.value = video.muted;
    loading.value = false;
    showError.value = false;
    onMetadataLoaded();
    if (timeAfterSourceChange) {
      seek(Math.min(timeAfterSourceChange, duration.value));
      timeAfterSourceChange = 0;
    }
    if (resumeAfterSourceChange) {
      resumeAfterSourceChange = false;
      void play().catch(() => undefined);
    }
    emit('ready', video);
  }

  function handleTimeUpdate(event: Event) {
    const video = event.currentTarget as HTMLVideoElement;
    currentTime.value = video.currentTime;
    duration.value = Number.isFinite(video.duration) ? video.duration : duration.value;
    emit('timeupdate', currentTime.value, duration.value);
  }

  function handlePlay(event: Event) {
    playing.value = true;
    loading.value = false;
    emit('play', event);
  }

  function handlePause(event: Event) {
    playing.value = false;
    emit('pause', event);
  }

  function handleEnded(event: Event) {
    playing.value = false;
    emit('ended', event);
  }

  function handleError(event: Event) {
    const shouldEmit = !showError.value;
    loading.value = false;
    playing.value = false;
    showError.value = true;
    if (shouldEmit) emit('error', event);
  }

  function reload() {
    showError.value = false;
    loading.value = true;
    videoRef.value?.load();
  }

  watch(
    () => props.sources,
    sources => {
      const preferred = sources.findIndex(source => source.default);
      currentSourceIndex.value = preferred >= 0 ? preferred : 0;
      currentTime.value = 0;
      duration.value = 0;
      buffered.value = 0;
      showError.value = false;
      void nextTick(() => videoRef.value?.load());
    },
    { deep: true },
  );
  watch(
    () => props.volume,
    value => {
      volume.value = value;
      if (videoRef.value) videoRef.value.volume = value;
    },
  );
  watch(
    () => props.muted,
    value => {
      muted.value = value;
      if (videoRef.value) videoRef.value.muted = value;
    },
  );

  onMounted(() => {
    if (!videoRef.value) return;
    videoRef.value.volume = props.volume;
    videoRef.value.muted = props.muted;
  });

  return {
    currentSource,
    currentSourceIndex,
    playing,
    loading,
    showError,
    currentTime,
    duration,
    bufferedProgress,
    volume,
    muted,
    playbackRate,
    play,
    pause,
    togglePlay,
    seek,
    changeProgress,
    toggleMute,
    changeVolume,
    changeRate,
    changeSource,
    updateBuffered,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleEnded,
    handleError,
    reload,
  };
}
