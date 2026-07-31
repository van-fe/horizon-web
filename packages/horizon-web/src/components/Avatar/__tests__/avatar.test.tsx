import { mount } from '@vue/test-utils';
import HAvatar from '..';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { useDrawImages } from '../src/composables/useAvatar';

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
    const wrapper = mount(() => <HAvatar src={errorImageUrl} />);

    wrapper.find('img').trigger('error');

    await nextTick();

    expect(wrapper.find('img').attributes('src')).toEqual(
      'https://cdn-app.example.com/horizon-web/defaultAvatar.jpg',
    );
  });

  test('uses cover by default to avoid stretching images', () => {
    const wrapper = mount(() => <HAvatar src="avatar.png" />);

    expect(wrapper.find('img').attributes('style')).toContain('object-fit: cover');
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
      onload: null | (() => void) = null;

      set src(_value: string) {
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
  });
});
