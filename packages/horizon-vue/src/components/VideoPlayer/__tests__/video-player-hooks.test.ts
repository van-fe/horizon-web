import { defineComponent, nextTick, reactive, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useControlsVisibility } from '../src/hooks/useControlsVisibility';
import { useVideoKeyboard } from '../src/hooks/useVideoKeyboard';
import { useVideoControls } from '../src/hooks/useVideoControls';
import { useVideoViewport } from '../src/hooks/useVideoViewport';
import { useVideoRotation } from '../src/hooks/useVideoRotation';
import type { VideoPlayerProps } from '../src/composables/useProps';
import { formatVideoTime, getVideoSourceLabel } from '../src/utils';

describe('VideoPlayer hooks', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('formats finite media durations and resolves every source-label fallback', () => {
    expect(formatVideoTime(Number.NaN)).toBe('00:00');
    expect(formatVideoTime(-1)).toBe('00:00');
    expect(formatVideoTime(65.9)).toBe('01:05');
    expect(formatVideoTime(3661)).toBe('1:01:01');
    expect(getVideoSourceLabel({ src: 'label.mp4', label: 'Original' }, 0, 'Source')).toBe(
      'Original',
    );
    expect(getVideoSourceLabel({ src: 'quality.mp4', quality: '1080p' }, 1, 'Source')).toBe(
      '1080p',
    );
    expect(getVideoSourceLabel({ src: 'fallback.mp4' }, 2, 'Source')).toBe('Source 3');
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

  test('maps every keyboard shortcut and leaves unrelated keys untouched', () => {
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
    for (const key of [' ', 'k', 'ArrowLeft', 'ArrowRight', 'm', 'f', 'x']) {
      handleKeydown(new KeyboardEvent('keydown', { key, cancelable: true }));
    }
    expect(togglePlay).toHaveBeenCalledTimes(2);
    expect(seek).toHaveBeenNthCalledWith(1, 15);
    expect(seek).toHaveBeenNthCalledWith(2, 25);
    expect(toggleMute).toHaveBeenCalledOnce();
    expect(toggleFullscreen).toHaveBeenCalledOnce();
    expect(showControls).toHaveBeenCalledTimes(6);
  });

  test('covers media control guards, clamping, buffering and source resume behavior', async () => {
    const props = reactive({
      sources: [
        { src: 'one.mp4', type: 'video/mp4' },
        { src: 'two.mp4', type: 'video/mp4', default: true },
      ],
      volume: 0.5,
      muted: false,
    }) as unknown as VideoPlayerProps;
    const video = document.createElement('video');
    Object.defineProperties(video, {
      duration: { configurable: true, writable: true, value: 100 },
      currentTime: { configurable: true, writable: true, value: 20 },
      paused: { configurable: true, value: false },
      buffered: {
        configurable: true,
        value: { length: 1, start: () => 0, end: () => 40 },
      },
    });
    const play = vi.spyOn(video, 'play').mockResolvedValue(undefined);
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    const load = vi.spyOn(video, 'load').mockImplementation(() => undefined);
    const videoRef = ref<HTMLVideoElement | null>(video);
    const emit = vi.fn();
    const metadataLoaded = vi.fn();
    let controls!: ReturnType<typeof useVideoControls>;
    const wrapper = mount(
      defineComponent({
        setup() {
          controls = useVideoControls(props, videoRef, emit as never, metadataLoaded);
          return () => null;
        },
      }),
    );

    expect(controls.currentSourceIndex.value).toBe(1);
    await controls.play();
    expect(play).toHaveBeenCalledOnce();
    controls.pause();
    expect(pause).toHaveBeenCalledOnce();
    controls.playing.value = true;
    controls.togglePlay();
    controls.playing.value = false;
    controls.togglePlay();

    const initialMetadataEvent = new Event('loadedmetadata');
    Object.defineProperty(initialMetadataEvent, 'currentTarget', { value: video });
    controls.handleLoadedMetadata(initialMetadataEvent);
    controls.seek(-5);
    expect(video.currentTime).toBe(0);
    controls.seek(200);
    expect(video.currentTime).toBe(100);
    controls.changeProgress([40]);
    controls.changeProgress(35);
    expect(video.currentTime).toBe(35);

    controls.toggleMute();
    expect(video.muted).toBe(true);
    controls.changeVolume([20]);
    controls.changeVolume(0);
    expect(video.volume).toBe(0);
    expect(video.muted).toBe(true);
    controls.changeRate('bad');
    controls.changeRate(1.75);
    expect(video.playbackRate).toBe(1.75);

    controls.updateBuffered();
    expect(controls.bufferedProgress.value).toBe(40);
    Object.defineProperty(video, 'buffered', { configurable: true, value: { length: 0 } });
    controls.updateBuffered();
    expect(controls.bufferedProgress.value).toBe(0);

    controls.changeSource(1);
    controls.changeSource(99);
    controls.changeSource(0);
    await nextTick();
    expect(load).toHaveBeenCalled();
    const metadataEvent = new Event('loadedmetadata');
    Object.defineProperty(metadataEvent, 'currentTarget', { value: video });
    controls.handleLoadedMetadata(metadataEvent);
    const timeUpdateEvent = new Event('timeupdate');
    Object.defineProperty(timeUpdateEvent, 'currentTarget', { value: video });
    controls.handleTimeUpdate(timeUpdateEvent);

    controls.handlePlay(new Event('play'));
    controls.handlePause(new Event('pause'));
    controls.handleEnded(new Event('ended'));
    controls.handleError(new Event('error'));
    controls.handleError(new Event('error'));
    controls.reload();
    expect(metadataLoaded).toHaveBeenCalled();

    props.volume = 0.8;
    props.muted = true;
    props.sources = [{ src: 'replacement.mp4', default: true }];
    await nextTick();
    expect(video.volume).toBe(0.8);
    expect(video.muted).toBe(true);
    wrapper.unmount();

    videoRef.value = null;
    await controls.play();
    controls.pause();
    controls.seek(10);
    controls.toggleMute();
    controls.changeVolume(10);
    controls.changeRate(1);
    controls.changeSource(0);
    controls.updateBuffered();
  });

  test('toggles fullscreen and picture-in-picture and synchronizes browser events', async () => {
    const wrapperElement = document.createElement('div');
    const video = document.createElement('video');
    const wrapperRef = ref<HTMLElement | null>(wrapperElement);
    const videoRef = ref<HTMLVideoElement | null>(video);
    const emit = vi.fn();
    const requestFullscreen = vi
      .spyOn(wrapperElement, 'requestFullscreen')
      .mockResolvedValue(undefined);
    const requestPictureInPicture = vi
      .spyOn(video, 'requestPictureInPicture')
      .mockResolvedValue({} as PictureInPictureWindow);
    const exitFullscreen = vi.spyOn(document, 'exitFullscreen').mockResolvedValue(undefined);
    const exitPictureInPicture = vi
      .spyOn(document, 'exitPictureInPicture')
      .mockResolvedValue(undefined);
    let viewport!: ReturnType<typeof useVideoViewport>;
    const wrapper = mount(
      defineComponent({
        setup() {
          viewport = useVideoViewport(wrapperRef, videoRef, emit as never);
          return () => null;
        },
      }),
    );

    await viewport.toggleFullscreen();
    expect(requestFullscreen).toHaveBeenCalledOnce();
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      value: wrapperElement,
    });
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(viewport.isFullscreen.value).toBe(true);
    expect(emit).toHaveBeenCalledWith('fullscreenChange', true);
    await viewport.toggleFullscreen();
    expect(exitFullscreen).toHaveBeenCalledOnce();

    await viewport.togglePictureInPicture();
    expect(requestPictureInPicture).toHaveBeenCalledOnce();
    video.dispatchEvent(new Event('enterpictureinpicture'));
    expect(viewport.isPictureInPicture.value).toBe(true);
    video.dispatchEvent(new Event('leavepictureinpicture'));
    expect(viewport.isPictureInPicture.value).toBe(false);
    Object.defineProperty(document, 'pictureInPictureElement', {
      configurable: true,
      value: video,
    });
    await viewport.togglePictureInPicture();
    expect(exitPictureInPicture).toHaveBeenCalledOnce();

    videoRef.value = document.createElement('video');
    await nextTick();
    wrapper.unmount();
  });

  test('covers non-finite media metadata, no-default sources and detached reactive targets', async () => {
    const props = reactive({
      sources: [{ src: 'plain.mp4', type: 'video/mp4' }],
      volume: 0.4,
      muted: false,
    }) as unknown as VideoPlayerProps;
    const video = document.createElement('video');
    Object.defineProperties(video, {
      duration: { configurable: true, writable: true, value: Number.NaN },
      currentTime: { configurable: true, writable: true, value: 12 },
    });
    const videoRef = ref<HTMLVideoElement | null>(video);
    let controls!: ReturnType<typeof useVideoControls>;
    const wrapper = mount(
      defineComponent({
        setup() {
          controls = useVideoControls(props, videoRef, vi.fn() as never, vi.fn());
          return () => null;
        },
      }),
    );
    expect(controls.currentSourceIndex.value).toBe(0);

    const metadata = new Event('loadedmetadata');
    Object.defineProperty(metadata, 'currentTarget', { value: video });
    controls.handleLoadedMetadata(metadata);
    expect(controls.duration.value).toBe(0);
    const timeUpdate = new Event('timeupdate');
    Object.defineProperty(timeUpdate, 'currentTarget', { value: video });
    controls.handleTimeUpdate(timeUpdate);
    expect(controls.duration.value).toBe(0);

    videoRef.value = null;
    props.volume = 0.7;
    props.muted = true;
    props.sources = [{ src: 'replacement-without-default.mp4' }];
    await nextTick();
    expect(controls.volume.value).toBe(0.7);
    expect(controls.muted.value).toBe(true);
    expect(controls.currentSourceIndex.value).toBe(0);
    wrapper.unmount();

    const wrapperRef = ref<HTMLElement | null>(null);
    const detachedVideo = ref<HTMLVideoElement | null>(null);
    let viewport!: ReturnType<typeof useVideoViewport>;
    const viewportWrapper = mount(
      defineComponent({
        setup() {
          viewport = useVideoViewport(wrapperRef, detachedVideo, vi.fn() as never);
          return () => null;
        },
      }),
    );
    await expect(viewport.toggleFullscreen()).resolves.toBeUndefined();
    await expect(viewport.togglePictureInPicture()).resolves.toBeUndefined();
    viewportWrapper.unmount();
  });

  test('applies landscape and sideways rotation dimensions from real geometry', async () => {
    const props = reactive({ rotate: 0 }) as VideoPlayerProps;
    const wrapperElement = document.createElement('div');
    const video = document.createElement('video');
    Object.defineProperties(wrapperElement, {
      clientWidth: { configurable: true, value: 640 },
      clientHeight: { configurable: true, value: 360 },
    });
    const wrapperRef = ref<HTMLElement | null>(wrapperElement);
    const videoRef = ref<HTMLVideoElement | null>(video);
    let rotation!: ReturnType<typeof useVideoRotation>;
    mount(
      defineComponent({
        setup() {
          rotation = useVideoRotation(props, wrapperRef, videoRef);
          return () => null;
        },
      }),
    );
    rotation.updateVideoStyle();
    expect(video.style.width).toBe('100%');
    props.rotate = 90;
    await nextTick();
    await nextTick();
    expect(video.style.width).toBe('360px');
    expect(video.style.height).toBe('640px');
    expect(video.style.transform).toContain('rotate(90deg)');
    videoRef.value = null;
    rotation.updateVideoStyle();
  });
});
