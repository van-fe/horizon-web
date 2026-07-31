import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import HAudioPlayer from '../src/AudioPlayer';
import { localeInjectKey } from '~/provides/localable';
import { dictionaries } from '~/locales';
import HSelect from '~/components/Select/src/Select';

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

  test('ships audio player labels in every supported locale', () => {
    expect(
      Object.values(dictionaries).every(dictionary =>
        Boolean(
          dictionary.horizonWeb.audioPlayer?.play && dictionary.horizonWeb.audioPlayer?.error,
        ),
      ),
    ).toBe(true);
  });
});
