import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { dictionaries } from '~/locales';
import HButton from '../../Button/src/Button';
import HCarousel from '../src/Carousel';
import HCarouselItem from '../src/CarouselItem';

const slides = () => [
  h(HCarouselItem, { name: 'first', label: 'First slide' }, () => 'One'),
  h(HCarouselItem, { name: 'second' }, () => 'Two'),
  h(HCarouselItem, { name: 'third' }, () => 'Three'),
];

type CarouselVm = {
  activeIndex: number;
  setActiveItem: (target: number | string) => void;
  prev: () => void;
  next: () => void;
  play: () => void;
};

describe('Carousel', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders only the active slide to assistive technology', () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, ariaLabel: 'Featured stories' },
      slots: { default: slides },
    });
    const items = wrapper.findAll('.h-carousel-item');

    expect(wrapper.attributes('role')).toBe('region');
    expect(wrapper.attributes('aria-label')).toBe('Featured stories');
    expect(items).toHaveLength(3);
    expect(items[0].attributes('aria-hidden')).toBe('false');
    expect(items[0].attributes('aria-label')).toBe('First slide');
    expect(items[1].attributes('aria-hidden')).toBe('true');
    expect(items[1].attributes('inert')).toBeDefined();
  });

  test('switches with arrows, emits controlled updates and loops', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false },
      slots: { default: slides },
    });
    const buttons = wrapper.findAllComponents(HButton);

    expect(buttons.length).toBeGreaterThanOrEqual(5);
    await wrapper.find('.h-carousel__arrow--next').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.[0]).toEqual([1, 0]);

    const carousel = wrapper.vm as unknown as CarouselVm;
    carousel.setActiveItem('first');
    carousel.prev();
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(2);
  });

  test('clamps navigation when looping is disabled', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, loop: false },
      slots: { default: slides },
    });

    expect(wrapper.find('.h-carousel__arrow--previous').attributes('disabled')).toBeDefined();
    const carousel = wrapper.vm as unknown as CarouselVm;
    carousel.setActiveItem(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.h-carousel__arrow--next').attributes('disabled')).toBeDefined();
    carousel.next();
    expect(carousel.activeIndex).toBe(2);
  });

  test('supports controlled index changes and keyboard navigation', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, modelValue: 1 },
      slots: { default: slides },
    });

    const carousel = wrapper.vm as unknown as CarouselVm;
    expect(carousel.activeIndex).toBe(1);
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2]);

    await wrapper.setProps({ modelValue: 0 });
    expect(carousel.activeIndex).toBe(0);
    await wrapper.trigger('keydown', { key: 'End' });
    expect(carousel.activeIndex).toBe(2);
  });

  test('autoplays, pauses on hover and requires explicit restart after focus', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { interval: 1000 },
      slots: { default: slides },
    });

    await vi.advanceTimersByTimeAsync(1000);
    const carousel = wrapper.vm as unknown as CarouselVm;
    expect(carousel.activeIndex).toBe(1);

    await wrapper.trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(1);

    await wrapper.trigger('mouseleave');
    await wrapper.trigger('focusin');
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(1);

    carousel.play();
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(2);
  });

  test('uses vertical keys and hover-triggered indicators', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, direction: 'vertical', trigger: 'hover' },
      slots: { default: slides },
    });

    await wrapper.trigger('keydown', { key: 'ArrowDown' });
    const carousel = wrapper.vm as unknown as CarouselVm;
    expect(carousel.activeIndex).toBe(1);
    await wrapper.findAll('.h-carousel__indicator-trigger')[2].trigger('mouseenter');
    expect(carousel.activeIndex).toBe(2);
  });

  test('supports touch swipes in the configured direction', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, swipeThreshold: 30 },
      slots: { default: slides },
    });
    const start = new Event('touchstart', { bubbles: true });
    const end = new Event('touchend', { bubbles: true });
    Object.defineProperty(start, 'touches', { value: [{ clientX: 100, clientY: 20 }] });
    Object.defineProperty(end, 'changedTouches', { value: [{ clientX: 40, clientY: 20 }] });

    wrapper.element.dispatchEvent(start);
    wrapper.element.dispatchEvent(end);
    await wrapper.vm.$nextTick();

    expect((wrapper.vm as unknown as CarouselVm).activeIndex).toBe(1);
  });

  test('hides navigation for a single slide', () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, effect: 'fade' },
      slots: { default: () => h(HCarouselItem, null, () => 'Only slide') },
    });

    expect(wrapper.classes()).toContain('h-carousel--fade');
    expect(wrapper.find('.h-carousel__arrow').exists()).toBe(false);
    expect(wrapper.find('.h-carousel__indicators').exists()).toBe(false);
  });

  test('provides carousel labels in every supported locale', () => {
    expect(
      Object.values(dictionaries).every(dictionary => {
        const carousel = dictionary.horizonWeb.carousel;
        return (
          carousel?.label &&
          carousel.previous &&
          carousel.next &&
          carousel.play &&
          carousel.pause &&
          carousel.slide &&
          carousel.indicator &&
          carousel.item
        );
      }),
    ).toBe(true);
  });
});
