import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { IconPause, IconPlay, IconVolume, IconVolumeOff } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useAudioPlayerProps } from './composables/useProps';
import { useAudioPlayerEmits } from './composables/useEmits';
import type { AudioPlayerEmits } from './composables/useEmits';
import { useAudioPlayerSlots } from './composables/useSlots';
import type { AudioPlayerSlots } from './composables/useSlots';
import { useAudioPlayerExposes } from './composables/useExposes';
import type { AudioPlayerExposes } from './composables/useExposes';
import { createMockWaveform, extractWaveform, normalizeWaveform } from './utils/waveform';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import HButton from '~/components/Button/src/Button';
import HSlider from '~/components/Slider/src/Slider';
import HSelect from '~/components/Select/src/Select';

type WaveformKind = 'provided' | 'decoded' | 'mock';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

export default defineComponent({
  name: `${useNamespace()}AudioPlayer`,
  desc: '支持真实或模拟波形的音频播放器',
  descLocales: { en: 'Audio player with decoded, provided, or deterministic mock waveforms.' },
  props: useAudioPlayerProps,
  emits: useAudioPlayerEmits,
  slots: useAudioPlayerSlots,
  exposes: useAudioPlayerExposes,
  setup(
    props,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<AudioPlayerEmits, AudioPlayerSlots, AudioPlayerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('audio-player');
    const locale = inject(localeInjectKey, defaultLocale);
    const audioRef = ref<HTMLAudioElement | null>(null);
    const waveform = ref<number[]>([]);
    const waveformLoading = ref(false);
    const playing = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const muted = ref(false);
    const currentVolume = ref(props.volume);
    const hasError = ref(false);
    const playbackRate = ref(1);
    let waveformRequest = 0;
    let waveformAbortController: AbortController | undefined;

    const progress = computed(() =>
      duration.value > 0 ? Math.min(1, currentTime.value / duration.value) : 0,
    );
    const canSeek = computed(() => !props.disabled && duration.value > 0);
    const playbackRateOptions = computed(() =>
      props.playbackRates.map(rate => ({ value: rate, label: `${rate}×` })),
    );
    const labels = computed(
      () =>
        locale.value?.langService.td().horizonWeb.audioPlayer ?? {
          label: 'Audio player',
          play: 'Play',
          pause: 'Pause',
          mute: 'Mute',
          unmute: 'Unmute',
          progress: 'Playback progress',
          volume: 'Volume',
          rate: 'Playback speed',
          error: 'The audio could not be played',
        },
    );

    function emitWaveform(values: number[], source: WaveformKind) {
      waveform.value = values;
      emit('waveformReady', [...values], source);
    }

    async function decodeWaveform(src: string, request: number) {
      waveformAbortController?.abort();
      waveformAbortController = new AbortController();
      waveformLoading.value = true;
      let context: AudioContext | undefined;
      try {
        const response = await fetch(src, { signal: waveformAbortController.signal });
        if (!response.ok) throw new Error(`Unable to fetch audio: ${response.status}`);
        const data = await response.arrayBuffer();
        context = new AudioContext();
        const buffer = await context.decodeAudioData(data.slice(0));
        if (request !== waveformRequest) return;
        emitWaveform(extractWaveform(buffer.getChannelData(0), props.barCount), 'decoded');
      } catch (error) {
        if (
          request !== waveformRequest ||
          (error instanceof DOMException && error.name === 'AbortError')
        ) {
          return;
        }
        // CORS and unsupported codecs must not stop normal media playback.
        emitWaveform(createMockWaveform(props.mockSeed || src, props.barCount), 'mock');
      } finally {
        void context?.close();
        if (request === waveformRequest) waveformLoading.value = false;
      }
    }

    function updateWaveform() {
      const request = ++waveformRequest;
      waveformAbortController?.abort();
      waveformLoading.value = false;

      if (props.waveform?.length) {
        emitWaveform(normalizeWaveform(props.waveform, props.barCount), 'provided');
      } else if (props.waveformSource === 'mock') {
        emitWaveform(createMockWaveform(props.mockSeed || props.src, props.barCount), 'mock');
      } else if (props.waveformSource === 'auto' && props.src) {
        waveform.value = [];
        void decodeWaveform(props.src, request);
      } else {
        waveform.value = [];
      }
    }

    async function play() {
      if (!props.disabled && audioRef.value) await audioRef.value.play();
    }

    function pause() {
      audioRef.value?.pause();
    }

    function togglePlay() {
      if (playing.value) pause();
      else void play().catch(() => undefined);
    }

    function seek(time: number) {
      if (!audioRef.value || !canSeek.value) return;
      const next = Math.max(0, Math.min(duration.value, time));
      audioRef.value.currentTime = next;
      currentTime.value = next;
      emit('seek', next);
    }

    function seekFromPointer(event: MouseEvent) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      if (rect.width > 0) seek(((event.clientX - rect.left) / rect.width) * duration.value);
    }

    function handleWaveformKeydown(event: KeyboardEvent) {
      const step = event.shiftKey ? 10 : 5;
      let next: number | undefined;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = currentTime.value + step;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = currentTime.value - step;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = duration.value;
      if (next !== undefined) {
        event.preventDefault();
        seek(next);
      }
    }

    function toggleMute() {
      if (!audioRef.value || props.disabled) return;
      audioRef.value.muted = !audioRef.value.muted;
      muted.value = audioRef.value.muted;
      emit('volumeChange', audioRef.value.volume, muted.value);
    }

    function changeVolume(value: number | number[]) {
      if (!audioRef.value) return;
      if (Array.isArray(value)) return;
      const volume = value / 100;
      audioRef.value.volume = volume;
      audioRef.value.muted = volume === 0;
      currentVolume.value = volume;
      muted.value = audioRef.value.muted;
      emit('volumeChange', volume, muted.value);
    }

    function changeRate(value: unknown) {
      const rate = Number(value);
      if (!audioRef.value || !Number.isFinite(rate) || rate <= 0) return;
      audioRef.value.playbackRate = rate;
      playbackRate.value = rate;
      emit('rateChange', rate);
    }

    function handleLoadedMetadata(event: Event) {
      const audio = event.currentTarget as HTMLAudioElement;
      duration.value = Number.isFinite(audio.duration) ? audio.duration : 0;
      hasError.value = false;
      emit('ready', audio);
    }

    function handleTimeUpdate(event: Event) {
      const audio = event.currentTarget as HTMLAudioElement;
      currentTime.value = audio.currentTime;
      duration.value = Number.isFinite(audio.duration) ? audio.duration : duration.value;
      emit('timeupdate', currentTime.value, duration.value);
    }

    watch(
      () =>
        [props.src, props.waveform, props.waveformSource, props.mockSeed, props.barCount] as const,
      updateWaveform,
      { immediate: true, deep: true },
    );
    watch(
      () => props.src,
      () => {
        playing.value = false;
        currentTime.value = 0;
        duration.value = 0;
        hasError.value = false;
        audioRef.value?.load();
      },
      { flush: 'post' },
    );
    watch(
      () => props.volume,
      value => {
        currentVolume.value = value;
        if (audioRef.value) audioRef.value.volume = value;
      },
    );

    onMounted(() => {
      if (audioRef.value) audioRef.value.volume = props.volume;
    });
    onBeforeUnmount(() => {
      waveformRequest += 1;
      waveformAbortController?.abort();
    });

    expose({ audio: audioRef, play, pause, seek });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.is('disabled', props.disabled),
          classHelper.is('error', hasError.value),
        )}
        role="group"
        aria-label={props.ariaLabel || labels.value.label}
      >
        <audio
          ref={audioRef}
          src={props.type ? undefined : props.src}
          autoplay={props.autoplay}
          loop={props.loop}
          preload={props.preload}
          onLoadedmetadata={handleLoadedMetadata}
          onTimeupdate={handleTimeUpdate}
          onPlay={event => {
            playing.value = true;
            emit('play', event);
          }}
          onPause={event => {
            playing.value = false;
            emit('pause', event);
          }}
          onEnded={event => {
            playing.value = false;
            emit('ended', event);
          }}
          onError={event => {
            hasError.value = true;
            emit('error', event);
          }}
        >
          {props.type && <source src={props.src} type={props.type} />}
        </audio>
        {slots.prefix?.()}
        <HButton
          class={classHelper.e('play-button')}
          text
          size="small"
          icon={playing.value ? IconPause : IconPlay}
          iconSize={20}
          disabled={props.disabled || hasError.value}
          aria-label={playing.value ? labels.value.pause : labels.value.play}
          onClick={togglePlay}
        />
        <span class={classHelper.e('time')}>{formatTime(currentTime.value)}</span>
        <div
          class={cls(classHelper.e('waveform'), classHelper.is('loading', waveformLoading.value))}
          role="slider"
          tabindex={canSeek.value ? 0 : -1}
          aria-label={labels.value.progress}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration.value)}
          aria-valuenow={Math.round(currentTime.value)}
          aria-disabled={!canSeek.value}
          onClick={seekFromPointer}
          onKeydown={handleWaveformKeydown}
        >
          {(waveform.value.length
            ? waveform.value
            : Array.from({ length: props.barCount }, () => 0.18)
          ).map((height, index) => (
            <span
              class={cls(
                classHelper.e('bar'),
                classHelper.is('played', index / props.barCount <= progress.value),
              )}
              style={{ height: `${Math.round(height * 100)}%` }}
            />
          ))}
        </div>
        {hasError.value && (
          <span class={classHelper.e('error-text')} role="status">
            {labels.value.error}
          </span>
        )}
        <span class={classHelper.e('time')}>{formatTime(duration.value)}</span>
        <div class={classHelper.e('volume')}>
          <HButton
            class={classHelper.e('icon-button')}
            text
            size="small"
            icon={muted.value ? IconVolumeOff : IconVolume}
            iconSize={18}
            disabled={props.disabled}
            aria-label={muted.value ? labels.value.unmute : labels.value.mute}
            onClick={toggleMute}
          />
          <HSlider
            class={classHelper.e('volume-slider')}
            modelValue={muted.value ? 0 : currentVolume.value * 100}
            min={0}
            max={100}
            step={5}
            size="small"
            tooltipEnable={false}
            disabled={props.disabled}
            aria-label={labels.value.volume}
            onUpdate:modelValue={changeVolume}
          />
        </div>
        <HSelect
          class={classHelper.e('rate')}
          modelValue={playbackRate.value}
          inputStyle="no-border"
          size="small"
          options={playbackRateOptions.value}
          useVirtualScroll={false}
          fitInputWidth={false}
          externalSelectStyle={{ width: '64px' }}
          disabled={props.disabled}
          aria-label={labels.value.rate}
          onUpdate:modelValue={changeRate}
        />
        {slots.suffix?.()}
      </div>
    );
  },
});
