import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import HImage from '../src/Image';

describe('Image.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('renders dimensions, alternative text and object fit', () => {
    const wrapper = mount(HImage, {
      props: {
        src: 'image.png',
        alt: 'Vehicle preview',
        width: 120,
        maxWidth: 240,
        height: '80px',
        rounded: 8,
        objectFit: 'contain',
      },
    });

    expect(wrapper.attributes('style')).toContain('width: 120px');
    expect(wrapper.attributes('style')).toContain('max-width: 240px');
    expect(wrapper.attributes('style')).toContain('height: 80px');
    expect(wrapper.attributes('style')).toContain('border-radius: 8px');
    expect(wrapper.get('img').attributes('alt')).toBe('Vehicle preview');
    expect(wrapper.get('img').attributes('style')).toContain('object-fit: contain');
  });

  test('shows the placeholder until loading succeeds and emits the loaded source', async () => {
    const wrapper = mount(HImage, { props: { src: 'first.png' } });

    expect(wrapper.find('.h-image__placeholder').exists()).toBe(true);
    expect(wrapper.get('img').attributes('style')).toContain('display: none');

    await wrapper.get('img').trigger('load');

    expect(wrapper.find('.h-image__placeholder').exists()).toBe(false);
    expect(wrapper.get('img').attributes('style')).not.toContain('display: none');
    expect(wrapper.emitted('load')).toEqual([['first.png']]);
  });

  test('renders a custom error state and recovers when src changes', async () => {
    const wrapper = mount(HImage, {
      props: { src: 'broken.png' },
      slots: { error: () => <span data-test="image-error">Unable to load</span> },
    });

    await wrapper.get('img').trigger('error');
    expect(wrapper.get('[data-test="image-error"]').text()).toBe('Unable to load');
    expect(wrapper.emitted('error')).toEqual([['broken.png']]);

    await wrapper.setProps({ src: 'working.png' });
    await nextTick();
    expect(wrapper.find('[data-test="image-error"]').exists()).toBe(false);
    expect(wrapper.find('.h-image__placeholder').exists()).toBe(true);
    expect(wrapper.get('img').attributes('src')).toBe('working.png');

    await wrapper.get('img').trigger('load');
    expect(wrapper.emitted('load')?.at(-1)).toEqual(['working.png']);
  });

  test('does not render placeholder and error fallbacks when disabled', async () => {
    const wrapper = mount(HImage, {
      props: { src: 'broken.png', showPlaceholder: false, showError: false },
    });

    expect(wrapper.find('.h-image__placeholder').exists()).toBe(false);
    await wrapper.get('img').trigger('error');
    expect(wrapper.find('.h-image__placeholder').exists()).toBe(false);
    expect(wrapper.emitted('error')).toHaveLength(1);
  });

  test('defers a lazy image until it intersects and stops observing it', async () => {
    let callback!: IntersectionObserverCallback;
    const observe = vi.fn();
    const unobserve = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(handler: IntersectionObserverCallback) {
          callback = handler;
        }
        observe = observe;
        unobserve = unobserve;
        disconnect = vi.fn();
        takeRecords = vi.fn(() => []);
        root = null;
        rootMargin = '';
        thresholds = [];
      },
    );

    const wrapper = mount(HImage, { props: { src: 'lazy.png', lazyload: true } });
    await nextTick();

    expect(wrapper.find('img').exists()).toBe(false);
    expect(observe).toHaveBeenCalledWith(wrapper.element);

    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      { unobserve } as unknown as IntersectionObserver,
    );
    await nextTick();

    expect(wrapper.get('img').attributes('src')).toBe('lazy.png');
    expect(unobserve).toHaveBeenCalledWith(wrapper.element);
  });
});
