import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import HAudioPlayer from '../src/AudioPlayer';
import { localeInjectKey } from '~/provides/localable';
import { dictionaries } from '~/locales';
import HSelect from '~/components/Select/src/Select';
import HSlider from '~/components/Slider/src/Slider';

describe('AudioPlayer.tsx', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);
  });

  test('renders a provided waveform and announces its source', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveform: [0.2, 1, 0.5], barCount: 8 },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.h-audio-player__bar')).toHaveLength(8);
    expect(wrapper.emitted('waveformReady')?.[0]?.[1]).toBe('provided');
  });

  test('reuses Horizon Web controls', () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });

    expect(wrapper.findAll('.h-button')).toHaveLength(2);
    expect(wrapper.find('.h-slider').exists()).toBe(true);
    expect(wrapper.find('.h-select').exists()).toBe(true);
  });

  test('keeps the rate popup wider than the compact select and exposes every option', () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const select = wrapper.findComponent(HSelect);

    expect(select.props('options')).toEqual([
      { value: 0.5, label: '0.5×' },
      { value: 1, label: '1×' },
      { value: 1.5, label: '1.5×' },
      { value: 2, label: '2×' },
    ]);
    expect(select.props('fitInputWidth')).toBe(false);
    expect(select.props('useVirtualScroll')).toBe(false);
  });

  test('creates the same mock waveform for the same src', async () => {
    const props = { src: '/same.mp3', waveformSource: 'mock' as const, barCount: 12 };
    const first = mount(HAudioPlayer, { props });
    const second = mount(HAudioPlayer, { props });
    await first.vm.$nextTick();

    expect(first.emitted('waveformReady')?.[0]?.[0]).toEqual(
      second.emitted('waveformReady')?.[0]?.[0],
    );
  });

  test('mockSeed makes mock waveforms stable across different source URLs', async () => {
    const first = mount(HAudioPlayer, {
      props: { src: '/first.mp3', waveformSource: 'mock', mockSeed: 'shared-seed', barCount: 12 },
    });
    const second = mount(HAudioPlayer, {
      props: { src: '/second.mp3', waveformSource: 'mock', mockSeed: 'shared-seed', barCount: 12 },
    });
    const third = mount(HAudioPlayer, {
      props: { src: '/third.mp3', waveformSource: 'mock', mockSeed: 'other-seed', barCount: 12 },
    });
    await first.vm.$nextTick();

    const firstWaveform = first.emitted('waveformReady')?.[0]?.[0];
    expect(second.emitted('waveformReady')?.[0]?.[0]).toEqual(firstWaveform);
    expect(third.emitted('waveformReady')?.[0]?.[0]).not.toEqual(firstWaveform);
  });

  test('plays, pauses and exposes player controls', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const button = wrapper.find('.h-audio-player__play-button');

    await button.trigger('click');
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

    wrapper.find('audio').element.dispatchEvent(new Event('play'));
    await wrapper.vm.$nextTick();
    await button.trigger('click');
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(typeof (wrapper.vm as unknown as { seek: unknown }).seek).toBe('function');
  });

  test('updates time and supports keyboard seeking', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.find('audio').element;
    Object.defineProperty(audio, 'duration', { configurable: true, value: 120 });
    audio.dispatchEvent(new Event('loadedmetadata'));
    await wrapper.vm.$nextTick();

    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });
    expect(audio.currentTime).toBe(5);
    expect(wrapper.emitted('seek')?.[0]).toEqual([5]);
  });

  test('disables all interactive controls', () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock', disabled: true },
    });
    expect(wrapper.find('.h-audio-player').classes()).toContain('is-disabled');
    expect(wrapper.find('.h-audio-player__play-button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('[role="slider"]').attributes('tabindex')).toBe('-1');
  });

  test('uses labels from the active locale', () => {
    const audioPlayer = {
      label: 'Test player',
      play: 'Start',
      pause: 'Stop',
      mute: 'Quiet',
      unmute: 'Sound',
      progress: 'Timeline',
      volume: 'Level',
      rate: 'Speed',
      error: 'Broken',
    };
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
      global: {
        provide: {
          [localeInjectKey as symbol]: ref({
            langService: { td: () => ({ horizonWeb: { audioPlayer } }) },
          }),
        },
      },
    });

    expect(wrapper.find('.h-audio-player').attributes('aria-label')).toBe('Test player');
    expect(wrapper.find('.h-audio-player__play-button').attributes('aria-label')).toBe('Start');
    expect(wrapper.find('[role="slider"]').attributes('aria-label')).toBe('Timeline');
  });

  test('falls back to built-in English labels when locale audio labels are unavailable', () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
      global: {
        provide: {
          [localeInjectKey as symbol]: ref(undefined),
        },
      },
    });

    expect(wrapper.get('.h-audio-player').attributes('aria-label')).toBe('Audio player');
    expect(wrapper.get('.h-audio-player__play-button').attributes('aria-label')).toBe('Play');
  });

  test('ships audio player labels in every supported locale', () => {
    expect(
      Object.values(dictionaries).every(dictionary =>
        Boolean(
          dictionary.horizonWeb.audioPlayer?.play && dictionary.horizonWeb.audioPlayer?.error,
        ),
      ),
    ).toBe(true);
  });

  test('forwards native media attributes, source type and accessibility label', () => {
    const wrapper = mount(HAudioPlayer, {
      props: {
        src: '/voice.ogg',
        type: 'audio/ogg',
        waveformSource: 'mock',
        autoplay: true,
        loop: true,
        preload: 'metadata',
        volume: 0.35,
        playbackRates: [0.75, 1.25],
        ariaLabel: 'Voice note',
      },
    });
    const audio = wrapper.get('audio');

    expect(wrapper.get('.h-audio-player').attributes('aria-label')).toBe('Voice note');
    expect(audio.attributes('autoplay')).toBeDefined();
    expect(audio.attributes('loop')).toBeDefined();
    expect(audio.attributes('preload')).toBe('metadata');
    expect(audio.attributes('src')).toBeUndefined();
    expect(audio.get('source').attributes()).toMatchObject({ src: '/voice.ogg', type: 'audio/ogg' });
    expect((audio.element as HTMLAudioElement).volume).toBe(0.35);
    expect(wrapper.findComponent(HSelect).props('options')).toEqual([
      { value: 0.75, label: '0.75×' },
      { value: 1.25, label: '1.25×' },
    ]);
  });

  test('renders prefix and suffix slots around player controls', () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
      slots: {
        prefix: () => <span class="prefix-slot">Prefix</span>,
        suffix: () => <span class="suffix-slot">Suffix</span>,
      },
    });

    expect(wrapper.get('.prefix-slot').text()).toBe('Prefix');
    expect(wrapper.get('.suffix-slot').text()).toBe('Suffix');
    expect(
      wrapper.get('.prefix-slot').element.compareDocumentPosition(
        wrapper.get('.h-audio-player__play-button').element,
      ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('emits every native media lifecycle event with its real payload', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    Object.defineProperties(audio, {
      duration: { configurable: true, value: 90 },
      currentTime: { configurable: true, writable: true, value: 12 },
    });

    for (const type of ['loadedmetadata', 'play', 'timeupdate', 'pause', 'ended', 'error']) {
      audio.dispatchEvent(new Event(type));
      await wrapper.vm.$nextTick();
    }

    expect(wrapper.emitted('ready')?.[0]).toEqual([audio]);
    expect(wrapper.emitted('play')?.[0]?.[0]).toBeInstanceOf(Event);
    expect(wrapper.emitted('timeupdate')?.[0]).toEqual([12, 90]);
    expect(wrapper.emitted('pause')?.[0]?.[0]).toBeInstanceOf(Event);
    expect(wrapper.emitted('ended')?.[0]?.[0]).toBeInstanceOf(Event);
    expect(wrapper.emitted('error')?.[0]?.[0]).toBeInstanceOf(Event);
    expect(wrapper.get('.h-audio-player').classes()).toContain('is-error');
    expect(wrapper.get('[role="status"]').text()).not.toBe('');
  });

  test('emits volume and rate changes from Horizon controls', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;

    wrapper.findComponent(HSlider).vm.$emit('update:modelValue', 25);
    wrapper.findComponent(HSelect).vm.$emit('update:modelValue', 1.5);
    await wrapper.vm.$nextTick();

    expect(audio.volume).toBe(0.25);
    expect(audio.playbackRate).toBe(1.5);
    expect(wrapper.emitted('volumeChange')?.at(-1)).toEqual([0.25, false]);
    expect(wrapper.emitted('rateChange')?.at(-1)).toEqual([1.5]);

    await wrapper.findAll('.h-audio-player__icon-button')[0].trigger('click');
    expect(wrapper.emitted('volumeChange')?.at(-1)).toEqual([expect.any(Number), true]);
    await wrapper.findAll('.h-audio-player__icon-button')[0].trigger('click');
    expect(wrapper.emitted('volumeChange')?.at(-1)).toEqual([expect.any(Number), false]);
  });

  test('auto mode without a source clears the waveform without starting a request', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const wrapper = mount(HAudioPlayer, {
      props: { src: '', waveformSource: 'auto', barCount: 8 },
    });
    await wrapper.vm.$nextTick();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(wrapper.emitted('waveformReady')).toBeUndefined();
    expect(wrapper.findAll('.h-audio-player__bar')).toHaveLength(8);
  });

  test('decodes automatic waveforms and falls back when fetch or decoding fails', async () => {
    const close = vi.fn().mockResolvedValue(undefined);
    const decodeAudioData = vi.fn().mockResolvedValue({
      getChannelData: () => new Float32Array([0, 0.25, -0.5, 1]),
    });
    const OriginalAudioContext = globalThis.AudioContext;
    globalThis.AudioContext = class {
      decodeAudioData = decodeAudioData;
      close = close;
    } as unknown as typeof AudioContext;
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      arrayBuffer: async () => new ArrayBuffer(8),
    } as Response);
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/decoded.mp3', waveformSource: 'auto', barCount: 8 },
    });
    await vi.waitFor(() => expect(wrapper.emitted('waveformReady')).toBeTruthy());
    expect(wrapper.emitted('waveformReady')?.at(-1)?.[1]).toBe('decoded');
    expect(close).toHaveBeenCalled();

    fetchSpy.mockResolvedValueOnce({ ok: false, status: 500 } as Response);
    await wrapper.setProps({ src: '/failed.mp3' });
    await vi.waitFor(() =>
      expect(wrapper.emitted('waveformReady')?.at(-1)?.[1]).toBe('mock'),
    );

    fetchSpy.mockRejectedValueOnce(new DOMException('aborted', 'AbortError'));
    const count = wrapper.emitted('waveformReady')?.length ?? 0;
    await wrapper.setProps({ src: '/aborted.mp3' });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('waveformReady')).toHaveLength(count);
    globalThis.AudioContext = OriginalAudioContext;
  });

  test('ignores stale automatic waveform responses and aborts the replaced request', async () => {
    let resolveFirst!: (response: Response) => void;
    const firstResponse = new Promise<Response>(resolve => {
      resolveFirst = resolve;
    });
    const abort = vi.spyOn(AbortController.prototype, 'abort');
    const originalAudioContext = globalThis.AudioContext;
    globalThis.AudioContext = class {
      decodeAudioData = vi.fn().mockResolvedValue({
        getChannelData: () => new Float32Array([0.1, 0.6, 1]),
      });
      close = vi.fn().mockResolvedValue(undefined);
    } as unknown as typeof AudioContext;
    vi.spyOn(globalThis, 'fetch')
      .mockImplementationOnce(() => firstResponse)
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: async () => new ArrayBuffer(8),
      } as Response);
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/slow.mp3', waveformSource: 'auto', barCount: 8 },
    });
    expect(wrapper.get('[role="slider"]').classes()).toContain('is-loading');

    await wrapper.setProps({ src: '/new.mp3' });
    await vi.waitFor(() => expect(wrapper.emitted('waveformReady')).toHaveLength(1));
    resolveFirst({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) } as Response);
    await vi.waitFor(() => expect(abort).toHaveBeenCalled());
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('waveformReady')).toHaveLength(1);
    expect(wrapper.emitted('waveformReady')?.[0]?.[1]).toBe('decoded');
    expect(wrapper.get('[role="slider"]').classes()).not.toContain('is-loading');
    wrapper.unmount();
    globalThis.AudioContext = originalAudioContext;
  });

  test('covers pointer and every keyboard seek boundary', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    Object.defineProperties(audio, {
      duration: { configurable: true, value: 20 },
      currentTime: { configurable: true, writable: true, value: 10 },
    });
    audio.dispatchEvent(new Event('loadedmetadata'));
    await wrapper.vm.$nextTick();
    const waveform = wrapper.get('[role="slider"]');
    waveform.element.getBoundingClientRect = () =>
      ({ left: 10, width: 100, top: 0, right: 110, bottom: 10, height: 10 }) as DOMRect;
    await waveform.trigger('click', { clientX: 60 });
    expect(audio.currentTime).toBe(10);
    for (const [key, expected, shiftKey = false] of [
      ['ArrowRight', 15],
      ['ArrowUp', 20, true],
      ['ArrowLeft', 15],
      ['ArrowDown', 5, true],
      ['Home', 0],
      ['End', 20],
      ['Other', 20],
    ] as const) {
      await waveform.trigger('keydown', { key, shiftKey });
      expect(audio.currentTime).toBe(expected);
    }
    const api = wrapper.vm as unknown as { seek: (time: number) => void };
    api.seek(-100);
    expect(audio.currentTime).toBe(0);
    api.seek(100);
    expect(audio.currentTime).toBe(20);
  });

  test('guards invalid control values and reacts to src/volume changes', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock', volume: 0.5 },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    wrapper.findComponent(HSlider).vm.$emit('update:modelValue', [10]);
    wrapper.findComponent(HSlider).vm.$emit('update:modelValue', 0);
    wrapper.findComponent(HSelect).vm.$emit('update:modelValue', Number.NaN);
    wrapper.findComponent(HSelect).vm.$emit('update:modelValue', 0);
    await wrapper.vm.$nextTick();
    expect(audio.muted).toBe(true);
    expect(wrapper.emitted('rateChange')).toBeUndefined();

    await wrapper.setProps({ volume: 0.8, src: '/next.mp3', waveformSource: 'none' });
    expect(audio.volume).toBe(0.8);
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
    expect(wrapper.findAll('.h-audio-player__bar').length).toBeGreaterThan(0);
  });

  test('handles invalid media duration and rejected play promises without leaking', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('blocked'));
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    Object.defineProperties(audio, {
      duration: { configurable: true, value: Number.NaN },
      currentTime: { configurable: true, writable: true, value: 3 },
    });
    audio.dispatchEvent(new Event('loadedmetadata'));
    audio.dispatchEvent(new Event('timeupdate'));
    await wrapper.get('.h-audio-player__play-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('ready')).toBeTruthy();
    expect(wrapper.emitted('timeupdate')?.at(-1)).toEqual([3, 0]);
  });

  test('preserves the last finite duration and formats invalid current times defensively', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    Object.defineProperties(audio, {
      duration: { configurable: true, value: 60 },
      currentTime: { configurable: true, writable: true, value: 10 },
    });
    audio.dispatchEvent(new Event('loadedmetadata'));
    Object.defineProperty(audio, 'duration', { configurable: true, value: Number.POSITIVE_INFINITY });
    audio.currentTime = -5;
    audio.dispatchEvent(new Event('timeupdate'));
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('timeupdate')?.at(-1)).toEqual([-5, 60]);
    expect(wrapper.findAll('.h-audio-player__time')[0].text()).toBe('00:00');
    expect(wrapper.findAll('.h-audio-player__time')[1].text()).toBe('01:00');
  });

  test('exposed controls become safe no-ops after the audio element unmounts', async () => {
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock' },
    });
    const api = wrapper.vm as unknown as {
      play: () => Promise<void>;
      pause: () => void;
      seek: (time: number) => void;
    };
    wrapper.unmount();

    await expect(api.play()).resolves.toBeUndefined();
    expect(() => api.pause()).not.toThrow();
    expect(() => api.seek(5)).not.toThrow();
  });

  test('ignores zero-width pointer seeks and disabled exposed controls', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockClear();
    const wrapper = mount(HAudioPlayer, {
      props: { src: '/voice.mp3', waveformSource: 'mock', disabled: true },
    });
    const audio = wrapper.get('audio').element as HTMLAudioElement;
    Object.defineProperties(audio, {
      duration: { configurable: true, value: 20 },
      currentTime: { configurable: true, writable: true, value: 4 },
    });
    audio.dispatchEvent(new Event('loadedmetadata'));
    const waveform = wrapper.get('[role="slider"]');
    waveform.element.getBoundingClientRect = () => ({ left: 0, width: 0 }) as DOMRect;
    await waveform.trigger('click', { clientX: 10 });
    await waveform.trigger('keydown', { key: 'ArrowRight' });
    await wrapper.get('.h-audio-player__play-button').trigger('click');
    await wrapper.get('.h-audio-player__icon-button').trigger('click');
    (wrapper.vm as unknown as { seek: (time: number) => void }).seek(10);

    expect(audio.currentTime).toBe(4);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(wrapper.emitted('seek')).toBeUndefined();
    expect(wrapper.emitted('volumeChange')).toBeUndefined();
  });
});
