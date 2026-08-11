import { mount, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import HVideoPlayer from '../src/VideoPlayer';
import HSelect from '../../Select/src/Select';
import HSlider from '../../Slider/src/Slider';
import HButton from '../../Button/src/Button';
import { dictionaries } from '~/locales';
import { nextTick } from 'vue';

const sources = [
  { src: '/video-hd.mp4', type: 'video/mp4', label: 'HD', default: true },
  { src: '/video-sd.mp4', type: 'video/mp4', label: 'SD' },
];

describe('VideoPlayer.tsx', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  test('renders a native video with custom controls', () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });
    const video = wrapper.find('video');

    expect(video.exists()).toBe(true);
    expect(video.attributes('controls')).toBeUndefined();
    expect(wrapper.findAllComponents(HSlider)).toHaveLength(2);
    expect(wrapper.findAllComponents(HButton).length).toBeGreaterThanOrEqual(4);
    const selects = wrapper.findAllComponents(HSelect);
    expect(selects).toHaveLength(2);
    expect(selects.every(select => select.props('toBody') === true)).toBe(true);
    expect(selects.every(select => select.props('placement') === 'top-end')).toBe(true);
    expect(selects[0].props('options')).toEqual([
      { value: 0.5, label: '0.5×' },
      { value: 0.75, label: '0.75×' },
      { value: 1, label: '1×' },
      { value: 1.25, label: '1.25×' },
      { value: 1.5, label: '1.5×' },
      { value: 2, label: '2×' },
    ]);
    expect(selects[1].props('options')).toEqual([
      { value: 0, label: 'HD' },
      { value: 1, label: 'SD' },
    ]);
  });

  test('forwards native presentation props and emits ended/volume/fullscreen events', async () => {
    const wrapper = shallowMount(HVideoPlayer, {
      props: {
        sources,
        poster: '/poster.png',
        rotate: 0,
        autoplay: true,
        loop: true,
        muted: true,
        preload: 'auto',
        playbackRates: [1, 1.75],
      },
    });
    const video = wrapper.get<HTMLVideoElement>('video');
    expect(video.attributes('poster')).toBe('/poster.png');
    expect(video.attributes('autoplay')).toBeDefined();
    expect(video.attributes('loop')).toBeDefined();
    expect(video.element.muted).toBe(true);
    expect(video.attributes('preload')).toBe('auto');
    await wrapper.setProps({ rotate: 90 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(video.element.style.transform).toContain('rotate(90deg)');
    expect(wrapper.findAllComponents(HSelect)[0].props('options')).toEqual([
      { value: 1, label: '1×' },
      { value: 1.75, label: '1.75×' },
    ]);

    await video.trigger('ended');
    expect(wrapper.emitted('ended')?.[0]?.[0]).toBeInstanceOf(Event);
    wrapper.findAllComponents(HSlider)[1].vm.$emit('update:modelValue', 25);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('volumeChange')?.at(-1)).toEqual([0.25, false]);

    document.dispatchEvent(new Event('fullscreenchange'));
    expect(wrapper.emitted('fullscreenChange')?.at(-1)).toEqual([false]);
  });

  test('renders Horizon controls in a full mount', () => {
    const wrapper = mount(HVideoPlayer, { props: { sources } });

    expect(wrapper.findAll('.h-button').length).toBeGreaterThanOrEqual(4);
    expect(wrapper.findAll('.h-slider')).toHaveLength(2);
    expect(wrapper.findAll('.h-select')).toHaveLength(2);
  });

  test('emits ready with the native video and updates progress', async () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });
    const video = wrapper.find('video');
    Object.defineProperty(video.element, 'duration', { configurable: true, value: 120 });
    Object.defineProperty(video.element, 'currentTime', {
      configurable: true,
      writable: true,
      value: 30,
    });

    await video.trigger('loadedmetadata');
    await video.trigger('timeupdate');

    expect(wrapper.emitted('ready')?.[0]?.[0]).toBe(video.element);
    expect(wrapper.text()).toContain('00:30');
    expect(wrapper.text()).toContain('02:00');

    wrapper.findAllComponents(HSlider)[0].vm.$emit('update:modelValue', 45);
    await wrapper.vm.$nextTick();
    expect(video.element.currentTime).toBe(45);
    expect(wrapper.emitted('seek')?.[0]).toEqual([45]);
  });

  test('switches labelled sources and emits sourceChange', async () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });
    const video = wrapper.find('video');
    Object.defineProperty(video.element, 'duration', { configurable: true, value: 120 });
    Object.defineProperty(video.element, 'currentTime', {
      configurable: true,
      writable: true,
      value: 30,
    });
    Object.defineProperty(video.element, 'paused', { configurable: true, value: false });

    wrapper.findAllComponents(HSelect)[1].vm.$emit('update:modelValue', 1);
    await wrapper.vm.$nextTick();
    await video.trigger('loadedmetadata');

    expect(wrapper.find('source').attributes('src')).toBe('/video-sd.mp4');
    expect(wrapper.emitted('sourceChange')?.[0]).toEqual([sources[1], 1]);
    expect(video.element.currentTime).toBe(30);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('changes playback rate through Select', async () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });

    wrapper.findAllComponents(HSelect)[0].vm.$emit('update:modelValue', 1.5);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('video').element.playbackRate).toBe(1.5);
    expect(wrapper.emitted('rateChange')?.[0]).toEqual([1.5]);
  });

  test('shows a clear error when the source cannot be played', async () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });

    await wrapper.find('source').trigger('error');
    await wrapper.find('video').trigger('error');

    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('视频无法播放');
    expect(wrapper.emitted('error')).toHaveLength(1);

    await wrapper.findComponent(HButton).trigger('click');
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
  });

  test('shows an empty state when no source is provided', () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources: [] } });

    expect(wrapper.find('video').exists()).toBe(false);
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('未提供视频源');
  });

  test('supports keyboard playback shortcuts', async () => {
    const wrapper = shallowMount(HVideoPlayer, { props: { sources } });

    await wrapper.trigger('keydown', { key: 'k' });

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('drives loading, playing, controls, fullscreen and picture-in-picture through native events', async () => {
    Object.defineProperty(document, 'pictureInPictureEnabled', {
      configurable: true,
      value: true,
    });
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const requestPictureInPicture = vi.fn().mockResolvedValue({});
    const wrapper = mount(HVideoPlayer, {
      props: { sources, volume: 0.6 },
      attachTo: document.body,
    });
    const root = wrapper.get<HTMLElement>('.h-video-player');
    const video = wrapper.get<HTMLVideoElement>('video');
    Object.defineProperties(root.element, {
      requestFullscreen: { configurable: true, value: requestFullscreen },
    });
    Object.defineProperties(video.element, {
      requestPictureInPicture: { configurable: true, value: requestPictureInPicture },
      duration: { configurable: true, value: 90 },
      currentTime: { configurable: true, writable: true, value: 10 },
    });

    await root.trigger('mousemove');
    await root.trigger('mouseleave');
    await root.trigger('focusin');
    await video.trigger('waiting');
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBeTruthy();
    await video.trigger('canplay');
    expect(wrapper.find('[role="status"]').exists()).toBe(false);

    await video.trigger('play');
    expect(root.classes()).toContain('is-playing');
    await wrapper.get('.h-video-player__controls').trigger('click');
    video.element.dispatchEvent(new Event('pause'));
    await nextTick();
    expect(root.classes()).not.toContain('is-playing');

    await video.trigger('dblclick');
    expect(requestFullscreen).toHaveBeenCalledOnce();
    const iconButtons = wrapper.findAll('button.h-video-player__icon-button');
    await iconButtons.at(-2)!.trigger('click');
    expect(requestPictureInPicture).toHaveBeenCalledOnce();
    video.element.dispatchEvent(new Event('enterpictureinpicture'));
    await nextTick();
    video.element.dispatchEvent(new Event('leavepictureinpicture'));

    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      value: root.element,
    });
    document.dispatchEvent(new Event('fullscreenchange'));
    await nextTick();
    expect(root.classes()).toContain('is-fullscreen');
    await iconButtons.at(-1)!.trigger('click');

    await video.trigger('error');
    await wrapper.get('.h-video-player__error button').trigger('click');
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('provides every control label in all supported locales', () => {
    const requiredLabels = [
      'label',
      'play',
      'pause',
      'mute',
      'unmute',
      'progress',
      'volume',
      'error',
      'noSource',
      'loading',
      'rate',
      'quality',
      'source',
      'pictureInPicture',
      'exitPictureInPicture',
      'fullscreen',
      'exitFullscreen',
    ] as const;
    expect(
      Object.values(dictionaries).every(dictionary =>
        requiredLabels.every(key => Boolean(dictionary.horizonWeb.videoPlayer?.[key])),
      ),
    ).toBe(true);
  });
});
