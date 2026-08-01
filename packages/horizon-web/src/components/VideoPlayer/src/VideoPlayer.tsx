import { computed, defineComponent, inject, ref } from 'vue';
import {
  IconExitFullscreen,
  IconFullScreen,
  IconLoadingLine,
  IconPause,
  IconPlay,
  IconPlayFilled,
  IconVideoError,
  IconVolume,
  IconVolumeOff,
  IconWindowMini,
} from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useVideoPlayerProps } from './composables/useProps';
import HButton from '~/components/Button/src/Button';
import HSelect from '~/components/Select/src/Select';
import HSlider from '~/components/Slider/src/Slider';
import type { VideoPlayerEmits } from './composables/useEmits';
import { useVideoPlayerEmits } from './composables/useEmits';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { VideoPlayerSlots } from './composables/useSlots';
import { useVideoPlayerSlots } from './composables/useSlots';
import type { VideoPlayerExposes } from './composables/useExposes';
import { useVideoPlayerExposes } from './composables/useExposes';
import { useControlsVisibility } from './hooks/useControlsVisibility';
import { useVideoControls } from './hooks/useVideoControls';
import { useVideoRotation } from './hooks/useVideoRotation';
import { useVideoViewport } from './hooks/useVideoViewport';
import { useVideoKeyboard } from './hooks/useVideoKeyboard';
import { formatVideoTime, getVideoSourceLabel } from './utils';
import { ZhCN } from '~/locales/zh-CN';

export default defineComponent({
  name: `${useNamespace()}VideoPlayer`,
  desc: '基于 HTML5 Video 的视频播放器组件',
  descLocales: { en: 'Video player based on the native HTML5 Video element.' },
  props: useVideoPlayerProps,
  emits: useVideoPlayerEmits,
  slots: useVideoPlayerSlots,
  exposes: useVideoPlayerExposes,
  setup(
    props,
    {
      emit,
      expose,
    }: HorizonWebSetupContext<VideoPlayerEmits, VideoPlayerSlots, VideoPlayerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('video-player');
    const locale = inject(localeInjectKey, defaultLocale);
    const wrapperRef = ref<HTMLElement | null>(null);
    const videoRef = ref<HTMLVideoElement | null>(null);
    const { updateVideoStyle } = useVideoRotation(props, wrapperRef, videoRef);
    const media = useVideoControls(props, videoRef, emit, updateVideoStyle);
    const controls = useControlsVisibility(media.playing);
    const viewport = useVideoViewport(wrapperRef, videoRef, emit);
    const localeDictionary = computed(
      () => locale.value?.langService.td().horizonWeb ?? ZhCN.horizonWeb,
    );
    const labels = computed(() => localeDictionary.value.videoPlayer);
    const playbackRateOptions = computed(() =>
      props.playbackRates.map(rate => ({ value: rate, label: `${rate}×` })),
    );
    const sourceOptions = computed(() =>
      props.sources.map((source, index) => ({
        value: index,
        label: getVideoSourceLabel(source, index, labels.value.source),
      })),
    );
    const { handleKeydown } = useVideoKeyboard({
      currentTime: media.currentTime,
      togglePlay: media.togglePlay,
      seek: media.seek,
      toggleMute: media.toggleMute,
      toggleFullscreen: viewport.toggleFullscreen,
      showControls: controls.showControls,
    });

    expose({
      video: videoRef,
      play: media.play,
      pause: media.pause,
      seek: media.seek,
      requestFullscreen: viewport.toggleFullscreen,
    });

    const renderIconButton = (
      label: string,
      IconComponent: typeof IconPlay,
      handler: () => void,
      extraClass?: string,
    ) => (
      <HButton
        class={cls(classHelper.e('icon-button'), extraClass)}
        text
        size="small"
        icon={IconComponent}
        iconSize={20}
        aria-label={label}
        onClick={handler}
      />
    );

    return () => (
      <div
        ref={wrapperRef}
        class={cls(
          classHelper.block,
          classHelper.is('playing', media.playing.value),
          classHelper.is('controls-hidden', !controls.controlsVisible.value),
          classHelper.is('fullscreen', viewport.isFullscreen.value),
          classHelper.is('error', media.showError.value),
        )}
        role="region"
        aria-label={labels.value.label}
        tabindex={0}
        onKeydown={handleKeydown}
        onMousemove={() => controls.showControls()}
        onMouseleave={() => controls.showControls(true)}
        onFocusin={() => controls.showControls(false)}
      >
        {media.currentSource.value && (
          <video
            ref={videoRef}
            class={classHelper.e('video')}
            poster={props.poster || undefined}
            autoplay={props.autoplay}
            loop={props.loop}
            muted={props.muted}
            playsinline
            preload={props.preload}
            onClick={media.togglePlay}
            onDblclick={() => void viewport.toggleFullscreen()}
            onLoadedmetadata={media.handleLoadedMetadata}
            onTimeupdate={media.handleTimeUpdate}
            onProgress={media.updateBuffered}
            onPlay={media.handlePlay}
            onPause={media.handlePause}
            onEnded={media.handleEnded}
            onWaiting={() => (media.loading.value = true)}
            onCanplay={() => (media.loading.value = false)}
            onError={media.handleError}
          >
            <source
              src={media.currentSource.value.src}
              type={media.currentSource.value.type}
              onError={media.handleError}
            />
          </video>
        )}

        {!media.playing.value &&
          !media.loading.value &&
          !media.showError.value &&
          media.currentSource.value && (
            <HButton
              class={classHelper.e('center-play')}
              round
              icon={IconPlayFilled}
              iconSize={34}
              aria-label={labels.value.play}
              onClick={media.togglePlay}
            />
          )}

        {media.loading.value && !media.showError.value && (
          <div class={classHelper.e('loading')} role="status" aria-label={labels.value.loading}>
            <IconLoadingLine size={32} spin="cw" />
          </div>
        )}

        {!media.showError.value && media.currentSource.value && (
          <div
            class={classHelper.e('controls')}
            onClick={(event: Event) => event.stopPropagation()}
          >
            <div class={classHelper.e('progress-wrap')}>
              <div class={classHelper.e('progress-track')}>
                <span
                  class={classHelper.e('buffered')}
                  style={{ width: `${media.bufferedProgress.value}%` }}
                />
              </div>
              <HSlider
                class={classHelper.e('progress')}
                modelValue={media.currentTime.value}
                min={0}
                max={Math.max(media.duration.value, 1)}
                step={0.1}
                size="small"
                disabled={media.duration.value <= 0}
                tooltipFormatter={formatVideoTime}
                aria-label={labels.value.progress}
                aria-valuetext={`${formatVideoTime(media.currentTime.value)} / ${formatVideoTime(media.duration.value)}`}
                onUpdate:modelValue={media.changeProgress}
              />
            </div>
            <div class={classHelper.e('control-row')}>
              {renderIconButton(
                media.playing.value ? labels.value.pause : labels.value.play,
                media.playing.value ? IconPause : IconPlay,
                media.togglePlay,
              )}
              <div class={classHelper.e('volume')}>
                {renderIconButton(
                  media.muted.value || media.volume.value === 0
                    ? labels.value.unmute
                    : labels.value.mute,
                  media.muted.value || media.volume.value === 0 ? IconVolumeOff : IconVolume,
                  media.toggleMute,
                )}
                <HSlider
                  class={classHelper.e('volume-slider')}
                  modelValue={media.muted.value ? 0 : media.volume.value * 100}
                  min={0}
                  max={100}
                  step={5}
                  size="small"
                  tooltipEnable={false}
                  aria-label={labels.value.volume}
                  onUpdate:modelValue={media.changeVolume}
                />
              </div>
              <span class={classHelper.e('time')}>
                {formatVideoTime(media.currentTime.value)} <span>/</span>{' '}
                {formatVideoTime(media.duration.value)}
              </span>
              <span class={classHelper.e('spacer')} />

              <HSelect
                class={classHelper.e('rate-select')}
                modelValue={media.playbackRate.value}
                inputStyle="no-border"
                size="small"
                placement="top-end"
                toBody={true}
                fitInputWidth={false}
                useVirtualScroll={false}
                options={playbackRateOptions.value}
                externalSelectStyle={{ width: '68px' }}
                aria-label={labels.value.rate}
                onUpdate:modelValue={media.changeRate}
              />

              {props.sources.length > 1 && (
                <HSelect
                  class={classHelper.e('quality-select')}
                  modelValue={media.currentSourceIndex.value}
                  inputStyle="no-border"
                  size="small"
                  placement="top-end"
                  toBody={true}
                  fitInputWidth={false}
                  useVirtualScroll={false}
                  options={sourceOptions.value}
                  externalSelectStyle={{ width: '88px' }}
                  aria-label={labels.value.quality}
                  onUpdate:modelValue={value => media.changeSource(Number(value))}
                />
              )}

              {viewport.supportsPictureInPicture.value &&
                renderIconButton(
                  viewport.isPictureInPicture.value
                    ? labels.value.exitPictureInPicture
                    : labels.value.pictureInPicture,
                  IconWindowMini,
                  () => void viewport.togglePictureInPicture(),
                )}
              {renderIconButton(
                viewport.isFullscreen.value ? labels.value.exitFullscreen : labels.value.fullscreen,
                viewport.isFullscreen.value ? IconExitFullscreen : IconFullScreen,
                () => void viewport.toggleFullscreen(),
              )}
            </div>
          </div>
        )}

        {(media.showError.value || !media.currentSource.value) && (
          <div class={classHelper.e('error')} role="alert">
            <div class={classHelper.e('error-content')}>
              <IconVideoError size={40} />
              <p>{media.currentSource.value ? labels.value.error : labels.value.noSource}</p>
              {media.currentSource.value && (
                <HButton onClick={media.reload}>{localeDictionary.value.global.refresh}</HButton>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
