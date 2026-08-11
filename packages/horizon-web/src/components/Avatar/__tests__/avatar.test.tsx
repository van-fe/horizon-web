import { mount } from '@vue/test-utils';
import HAvatar from '..';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { useDrawImages, useWorkText } from '../src/composables/useAvatar';

const errorImageUrl =
  'https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg';

describe('Avatar.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('basic', async () => {
    const wrapper = mount(() => <HAvatar />);
    const element = wrapper.findComponent(HAvatar);

    expect(element.exists()).toBe(true);
  });

  test('error', async () => {
    const onError = vi.fn();
    const wrapper = mount(() => <HAvatar src={errorImageUrl} onError={onError} />);

    await wrapper.find('img').trigger('error');

    await nextTick();

    expect(wrapper.find('img').attributes('src')).toEqual(
      'https://cdn-app.example.com/horizon-web/defaultAvatar.jpg',
    );
    expect(onError).toHaveBeenCalledOnce();
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  test('applies size, fit and type props to observable output', () => {
    const wrapper = mount(() => <HAvatar src="avatar.png" size={48} fit="contain" type="normal" />);

    expect(wrapper.get('.h-avatar').attributes('style')).toContain('width: 48px');
    expect(wrapper.get('.h-avatar').attributes('style')).toContain('height: 48px');
    expect(wrapper.get('.h-avatar').classes()).toContain('h-avatar--normal');
    expect(wrapper.get('img').attributes('style')).toContain('object-fit: contain');
  });

  test('renders icon and work initials instead of an image', () => {
    const icon = mount(() => <HAvatar icon="user" />);
    expect(icon.find('.h-avatar__icon').exists()).toBe(true);
    expect(icon.find('img').exists()).toBe(false);

    const work = mount(() => <HAvatar type="work" src="Horizon Web" size="large" />);
    expect(work.findAll('.h-avatar__txt').length).toBeGreaterThan(0);
    expect(work.find('img').exists()).toBe(false);
  });

  test('slots replace normal and failed image content', async () => {
    const custom = mount(HAvatar, { slots: { default: () => <b class="avatar-slot">HW</b> } });
    expect(custom.get('.avatar-slot').text()).toBe('HW');
    expect(custom.find('img').exists()).toBe(false);

    const failed = mount(HAvatar, {
      props: { src: 'broken.png', default: 'fallback.png' },
      slots: { error: () => <b class="error-slot">Unavailable</b> },
    });
    await failed.get('img').trigger('error');
    expect(failed.get('.error-slot').text()).toBe('Unavailable');
  });

  test('selects from randomSrc when no src is provided', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const wrapper = mount(() => <HAvatar randomSrc={['one.png', 'two.png']} />);

    expect(wrapper.get('img').attributes('src')).toBe('two.png');
    random.mockRestore();
  });

  test('uses cover by default to avoid stretching images', () => {
    const wrapper = mount(() => <HAvatar src="avatar.png" />);

    expect(wrapper.find('img').attributes('style')).toContain('object-fit: cover');
  });

  test('formats work initials for empty, latin and non-latin names at every size', () => {
    expect(useWorkText('   ', 'mini')).toEqual([]);
    expect(useWorkText('Horizon', 'mini')).toEqual(['Ho']);
    expect(useWorkText('Horizon', 'small')).toEqual(['Hori']);
    expect(useWorkText('Horizon', 'large')).toEqual(['Hori', 'zon']);
    expect(useWorkText('测试头像', 'large')).toEqual(['测试', '头像']);
  });

  test('crops group images without changing their aspect ratio', async () => {
    const drawImage = vi.fn();
    const context = {
      arc: vi.fn(),
      clip: vi.fn(),
      drawImage,
      fillRect: vi.fn(),
      fillStyle: '',
    };
    const canvas = {
      getContext: vi.fn(() => context),
      height: 0,
      toDataURL: vi.fn(() => 'data:image/png;base64,avatar'),
      width: 0,
    };
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(tagName =>
      tagName === 'canvas' ? (canvas as unknown as HTMLCanvasElement) : createElement(tagName),
    );

    class MockImage {
      naturalHeight = 200;
      naturalWidth = 400;
      onerror: null | (() => void) = null;
      onload: null | (() => void) = null;

      set src(value: string) {
        if (value.includes('broken')) {
          queueMicrotask(() => this.onerror?.());
          return;
        }
        if (value.includes('tall')) {
          this.naturalHeight = 200;
          this.naturalWidth = 100;
        }
        queueMicrotask(() => this.onload?.());
      }

      setAttribute() {}
    }
    vi.stubGlobal('Image', MockImage);

    await expect(useDrawImages(['wide-avatar.png'])).resolves.toBe('data:image/png;base64,avatar');
    expect(drawImage).toHaveBeenCalledWith(
      expect.any(MockImage),
      100,
      0,
      200,
      200,
      50,
      50,
      140,
      140,
    );

    drawImage.mockClear();
    await useDrawImages(['1.png', '2.png', '3.png']);
    expect(drawImage.mock.calls.map(call => call.slice(5))).toEqual([
      [64.5, 6, 111, 111],
      [6, 123, 111, 111],
      [123, 123, 111, 111],
    ]);

    drawImage.mockClear();
    await useDrawImages(Array.from({ length: 9 }, (_, index) => `${index}.png`));
    expect(drawImage.mock.calls.map(call => call.slice(5))).toEqual([
      [6, 6, 72, 72],
      [84, 6, 72, 72],
      [162, 6, 72, 72],
      [6, 84, 72, 72],
      [84, 84, 72, 72],
      [162, 84, 72, 72],
      [6, 162, 72, 72],
      [84, 162, 72, 72],
      [162, 162, 72, 72],
    ]);

    drawImage.mockClear();
    await useDrawImages(['broken.png', 'tall.png']);
    expect(drawImage).toHaveBeenCalledOnce();
    expect(drawImage).toHaveBeenCalledWith(
      expect.any(MockImage),
      0,
      50,
      100,
      100,
      123,
      64.5,
      111,
      111,
    );
  });

  test('composes array sources and ignores a stale drawing result after the source changes', async () => {
    const singlePixel =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    const stalePixel =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    const pendingImages: MockImage[] = [];
    const context = {
      arc: vi.fn(),
      clip: vi.fn(),
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillStyle: '',
    };
    const canvas = {
      getContext: vi.fn(() => context),
      height: 0,
      toDataURL: vi
        .fn()
        .mockReturnValueOnce(stalePixel)
        .mockReturnValue(singlePixel),
      width: 0,
    };
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(tagName =>
      tagName === 'canvas' ? (canvas as unknown as HTMLCanvasElement) : createElement(tagName),
    );

    class MockImage {
      naturalHeight = 100;
      naturalWidth = 100;
      onerror: null | (() => void) = null;
      onload: null | (() => void) = null;

      set src(_value: string) {
        pendingImages.push(this);
      }

      setAttribute() {}
    }
    vi.stubGlobal('Image', MockImage);

    const wrapper = mount(HAvatar, { props: { src: ['old-a.png', 'old-b.png'] } });
    expect(pendingImages).toHaveLength(2);

    await wrapper.setProps({ src: singlePixel });
    pendingImages.splice(0).forEach(image => image.onload?.());
    await vi.waitFor(() => expect(canvas.toDataURL).toHaveBeenCalledTimes(1));
    expect(wrapper.get('img').attributes('src')).toBe(singlePixel);

    await wrapper.setProps({ src: ['new-a.png', 'new-b.png', 'new-c.png'] });
    expect(pendingImages).toHaveLength(3);
    pendingImages.splice(0).forEach(image => image.onload?.());
    await vi.waitFor(() =>
      expect(wrapper.get('img').attributes('src')).toBe(singlePixel),
    );
    expect(context.drawImage).toHaveBeenCalledTimes(5);
    expect(canvas.toDataURL).toHaveBeenCalledTimes(2);
  });
});
