import { mount, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import HVideoPlayer from '../src/VideoPlayer';
import HSelect from '../../Select/src/Select';
import HSlider from '../../Slider/src/Slider';
import HButton from '../../Button/src/Button';
import { dictionaries } from '~/locales';

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
