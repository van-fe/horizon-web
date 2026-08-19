import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { HImage, HImageList } from '..';
import { useImageEmits } from '../src/composables/useEmits';
import { useImageExposes } from '../src/composables/useExposes';

describe('Image.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('validates both public emit payloads defensively', () => {
    expect(useImageExposes).toEqual({});
    for (const validator of [useImageEmits.load, useImageEmits.error]) {
      expect(validator('image.png')).toBe(true);
      expect(validator(undefined)).toBe(true);
      expect(validator(1 as never)).toBe(false);
    }
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
      [{ isIntersecting: false } as IntersectionObserverEntry],
      { unobserve } as unknown as IntersectionObserver,
    );
    await nextTick();
    expect(wrapper.find('img').exists()).toBe(false);

    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      { unobserve } as unknown as IntersectionObserver,
    );
    await nextTick();

    expect(wrapper.get('img').attributes('src')).toBe('lazy.png');
    expect(unobserve).toHaveBeenCalledWith(wrapper.element);
  });

  test('applies every sizing prop and renders content, placeholder and hover slots', async () => {
    const wrapper = mount(HImage, {
      props: {
        src: 'sized.png',
        width: 120,
        maxWidth: 240,
        height: 80,
        maxHeight: 160,
        aspectRatio: '3 / 2',
        rounded: '12px',
        animated: false,
        showTooltip: true,
        title: 'Detailed preview',
      },
      slots: {
        default: () => <span data-test="image-content">Overlay</span>,
        placeholder: () => <span data-test="image-placeholder">Loading</span>,
        hover: () => <span data-test="image-hover">Actions</span>,
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('width: 120px');
    expect(style).toContain('max-width: 240px');
    expect(style).toContain('height: 80px');
    expect(style).toContain('max-height: 160px');
    expect(style).toContain('aspect-ratio: 3 / 2');
    expect(style).toContain('border-radius: 12px');
    expect(wrapper.get('[data-test="image-placeholder"]').text()).toBe('Loading');
    expect(wrapper.get('[data-test="image-content"]').text()).toBe('Overlay');
    expect(wrapper.get('[data-test="image-hover"]').text()).toBe('Actions');
    expect(wrapper.get('img').attributes('title')).toBeUndefined();

    await wrapper.get('img').trigger('load');
    expect(wrapper.find('[data-test="image-placeholder"]').exists()).toBe(false);
  });

  test('runs configured image actions with the current source', async () => {
    const handler = vi.fn();
    const wrapper = mount(HImage, {
      props: {
        src: 'action.png',
        showActions: true,
        actionsType: 'icon',
        actionsPosition: 'bottom-right',
        actionsList: [{ icon: 'download', title: 'Download', handler }],
      },
    });
    await nextTick();

    await vi.waitFor(() => {
      expect(wrapper.get('.h-image__actions-container').classes()).toContain('bottom-right');
    });
    await wrapper.get('.h-image__actions-icon .a-icon').trigger('click');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('action.png');
  });

  test('auto-sizes fallback icons and action layouts from real wrapper geometry', async () => {
    const action = { icon: 'download', title: 'Download', handler: vi.fn() };
    const large = mount(HImage, {
      props: { src: 'large.png', showActions: false, actionsList: [action] },
    });
    Object.defineProperties(large.element, {
      clientWidth: { configurable: true, value: 140 },
      clientHeight: { configurable: true, value: 140 },
    });
    await large.setProps({ showActions: true });
    await nextTick();
    expect(large.findComponent({ name: 'IconLogo' }).props('size')).toBe(40);
    expect(large.get('.h-image__actions-container').classes()).toContain('bottom-right');
    expect(large.find('.h-image__actions-icon').exists()).toBe(true);
    await large.setProps({ actionsList: [action, { ...action, title: 'Save' }] });
    expect(large.findAll('.h-image__actions-icon .a-icon')).toHaveLength(2);
    await large.setProps({ showActions: false });
    expect(large.find('.h-image__actions-container').exists()).toBe(false);

    const medium = mount(HImage, { props: { src: 'medium.png' } });
    Object.defineProperties(medium.element, {
      clientWidth: { configurable: true, value: 80 },
      clientHeight: { configurable: true, value: 80 },
    });
    await nextTick();
    await nextTick();
    expect(medium.findComponent({ name: 'IconLogo' }).props('size')).toBe(32);

    const small = mount(HImage, {
      props: { src: 'small.png', showActions: true, actionsList: [action] },
    });
    Object.defineProperties(small.element, {
      clientWidth: { configurable: true, value: 30 },
      clientHeight: { configurable: true, value: 30 },
    });
    await nextTick();
    await nextTick();
    expect(small.findComponent({ name: 'IconLogo' }).props('size')).toBe(20);
    expect(small.get('.h-image__actions-container').classes()).toContain('center');
    expect(small.find('.h-image__actions-dropdown').exists()).toBe(true);

    const dropdown = small.findComponent({ name: 'HDropdown' });
    await dropdown.get('.h-popover__reference').trigger('mouseenter');
    await vi.waitFor(() => {
      expect(document.querySelector('.h-image__actions-dropdown-item')).not.toBeNull();
    });
    (document.querySelector('.h-image__actions-dropdown-item') as HTMLElement).click();
    expect(action.handler).toHaveBeenCalledWith('small.png');
  });

  test('viewerSrc supplies the full-resolution preview instead of the thumbnail', async () => {
    const wrapper = mount(HImage, {
      props: {
        src: 'thumbnail.png',
        viewerSrc: 'full-resolution.png',
        showViewer: true,
        title: 'Full preview',
      },
    });

    await wrapper.trigger('click');
    const viewer = wrapper.findComponent({ name: 'HViewer' });
    expect(viewer.props('modelValue')).toBe(true);
    expect(viewer.props('sources')).toEqual([
      {
        type: 'image',
        cover: 'full-resolution.png',
        thumbnail: 'thumbnail.png',
        title: 'Full preview',
      },
    ]);
  });

  test('uses default error artwork and source/alt viewer fallbacks', async () => {
    const wrapper = mount(HImage, {
      props: { src: 'fallback.png', alt: 'Fallback title', showViewer: true },
    });
    await wrapper.get('img').trigger('error');
    expect(wrapper.findComponent({ name: 'IconPictureError' }).exists()).toBe(true);

    await wrapper.trigger('click');
    const viewer = wrapper.findComponent({ name: 'HViewer' });
    expect(viewer.props('sources')).toEqual([
      {
        type: 'image',
        cover: 'fallback.png',
        thumbnail: 'fallback.png',
        title: 'Fallback title',
      },
    ]);
    viewer.vm.$emit('update:modelValue', false);
    await nextTick();
    expect(viewer.props('modelValue')).toBe(false);
  });

  test('limits image lists, styles their spacing and renders the scoped overflow surface', async () => {
    const wrapper = mount(HImageList, {
      props: { margin: 6, limit: 2, limitTextSize: 18 },
      slots: {
        default: () => [
          <HImage src="one.png" showViewer />,
          <HImage src="two.png" showViewer />,
          <HImage src="three.png" showViewer />,
        ],
        limit: () => <span data-test="image-limit">More images</span>,
      },
    });

    expect(wrapper.findAll('.h-image-list__item')).toHaveLength(2);
    expect(wrapper.get('.h-image-list__item').attributes('style')).toContain('6px');
    expect(wrapper.get('.h-image-list__overflow').attributes('style')).toContain('18px');
    expect(wrapper.get('[data-test="image-limit"]').text()).toBe('More images');

    await wrapper.findAll('.h-image-list__item')[1].trigger('click');
    const viewer = wrapper.findComponent({ name: 'HViewer' });
    expect(viewer.props('modelValue')).toBe(true);
    expect(viewer.props('initIndex')).toBe(1);
    viewer.vm.$emit('update:modelValue', false);
    await nextTick();
    expect(viewer.props('modelValue')).toBe(false);
  });

  test('ignores non-images, renders default overflow copy and guards non-viewable items', async () => {
    const empty = mount(HImageList, {
      slots: { default: () => <span>Not an image</span> },
    });
    expect(empty.find('.h-image-list').exists()).toBe(false);

    const wrapper = mount(HImageList, {
      props: { limit: 1 },
      slots: {
        default: () => [
          <span>Ignored</span>,
          <HImage src="one.png" showViewer={false} />,
          <HImage src="two.png" showViewer />,
        ],
      },
    });
    expect(wrapper.findAll('.h-image-list__item')).toHaveLength(1);
    expect(wrapper.get('.h-image-list__overflow').text()).toBe('+1');
    await wrapper.get('.h-image-list__item').trigger('click');
    expect(wrapper.findComponent({ name: 'HViewer' }).props('modelValue')).toBe(false);
  });
});
