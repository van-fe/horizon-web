import { resolve } from 'node:path';
import { setNamespace, useNamespace } from '@aurora/utils';
import { mount } from '@vue/test-utils';
import { compile } from 'sass';
import { h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { dictionaries } from '~/locales';
import HButton from '../../Button/src/Button';
import HCarousel from '../src/Carousel';
import HCarouselItem from '../src/CarouselItem';
import type { HCarouselTarget } from '../src/composables/useProps';

const slides = () => [
  h(HCarouselItem, { name: 'first', label: 'First slide' }, () => 'One'),
  h(HCarouselItem, { name: 'second' }, () => 'Two'),
  h(HCarouselItem, { name: 'third' }, () => 'Three'),
];

const cardSlides = () => [
  ...slides(),
  h(HCarouselItem, { name: 'fourth', label: 'Fourth slide' }, () => 'Four'),
];

const twoCardSlides = () => [
  h(HCarouselItem, { name: 'first', label: 'First slide' }, () => 'One'),
  h(HCarouselItem, { name: 'second', label: 'Second slide' }, () => 'Two'),
];

type TestRect = Pick<DOMRect, 'bottom' | 'left' | 'right' | 'top'>;

const createRect = ({ bottom, left, right, top }: TestRect): DOMRect => ({
  bottom,
  height: bottom - top,
  left,
  right,
  top,
  width: right - left,
  x: left,
  y: top,
  toJSON: () => ({}),
});

const compileCarouselStyleRules = () => {
  const css = compile(resolve(__dirname, '../src/style/index.scss')).css;
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => {
    const declarations = new Map<string, string>();
    body
      .split(';')
      .map(declaration => declaration.trim())
      .filter(Boolean)
      .forEach(declaration => {
        const separator = declaration.indexOf(':');
        if (separator < 0) return;
        declarations.set(
          declaration.slice(0, separator).trim(),
          declaration.slice(separator + 1).trim(),
        );
      });
    return { declarations, selector: selector.trim() };
  });
};

const stackingTransitionCases = (['slide', 'card'] as const).flatMap(effect =>
  [
    {
      from: 0,
      motion: 'next',
      outgoingClass: 'is-previous',
      placementClass: 'is-placement-previous',
      scenario: 'first to second',
      to: 1,
    },
    {
      from: 1,
      motion: 'previous',
      outgoingClass: 'is-next',
      placementClass: 'is-placement-next',
      scenario: 'second to first',
      to: 0,
    },
    {
      from: 3,
      motion: 'next',
      outgoingClass: 'is-previous',
      placementClass: 'is-placement-previous',
      scenario: 'last to first',
      to: 0,
    },
  ].map(scenario => ({ effect, ...scenario })),
);

type CarouselVm = {
  activeIndex: number;
  pause: () => void;
  play: () => void;
  prev: () => void;
  next: () => void;
  setActiveItem: (target: HCarouselTarget) => void;
};

describe('Carousel', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('renders visible icon controls and accessible dot indicators', () => {
    const wrapper = mount(HCarousel, {
      props: { ariaLabel: 'Featured stories', autoplay: true },
      slots: { default: slides },
    });
    const items = wrapper.findAll('.h-carousel-item');
    const previous = wrapper.find('.h-carousel__arrow--previous');
    const next = wrapper.find('.h-carousel__arrow--next');
    const autoplay = wrapper.find('.h-carousel__autoplay');

    expect(wrapper.attributes('role')).toBe('region');
    expect(wrapper.attributes('aria-label')).toBe('Featured stories');
    expect(wrapper.classes()).toContain('h-carousel--arrow-always');
    expect(items).toHaveLength(3);
    expect(items[0].attributes('aria-hidden')).toBe('false');
    expect(items[0].attributes('aria-label')).toBe('First slide');
    expect(items[1].attributes('aria-hidden')).toBe('true');
    expect(items[1].attributes('inert')).toBeDefined();
    expect(previous.text()).toBe('');
    expect(previous.attributes('aria-label')).toBe('Previous slide');
    expect(next.text()).toBe('');
    expect(next.attributes('aria-label')).toBe('Next slide');
    expect(autoplay.text()).toBe('');
    expect(autoplay.attributes('aria-label')).toBe('Stop automatic slide show');
    expect(previous.classes()).toContain('h-button--equally');
    expect(next.classes()).toContain('h-button--equally');
    expect(autoplay.classes()).toContain('h-button--equally');
    expect(previous.find('.h-button__content').exists()).toBe(false);
    expect(next.find('.h-button__content').exists()).toBe(false);
    expect(autoplay.find('.h-button__content').exists()).toBe(false);
    const indicators = wrapper.findAll('.h-carousel__indicator');
    expect(indicators.map(indicator => indicator.text())).toEqual(['', '', '']);
    expect(wrapper.findAll('.h-carousel__indicator-mark')).toHaveLength(3);
    expect(indicators.map(indicator => indicator.attributes('aria-label'))).toEqual([
      'First slide',
      'Go to slide 2',
      'Go to slide 3',
    ]);
    expect(indicators[0].attributes('aria-current')).toBe('true');
    expect(indicators[1].attributes('aria-current')).toBeUndefined();
    expect(previous.find('svg').exists()).toBe(true);
    expect(next.find('svg').exists()).toBe(true);
    expect(autoplay.find('svg').exists()).toBe(true);
    expect(wrapper.findAllComponents(HButton).length).toBeGreaterThanOrEqual(6);
  });

  test('uses one global active layer without card-specific stacking tiers', () => {
    const rules = compileCarouselStyleRules();
    const globalActiveRule = rules.find(rule => rule.selector === '.h-carousel-item.is-active');
    const cardViewportRule = rules.find(
      rule => rule.selector === '.h-carousel--card .h-carousel__viewport',
    );
    const baseCardItemRule = rules.find(
      rule => rule.selector === '.h-carousel--card .h-carousel-item',
    );
    const cardItemRules = rules.filter(
      rule =>
        rule.selector.includes('.h-carousel--card') && rule.selector.includes('.h-carousel-item'),
    );
    const itemZIndexRules = rules.filter(
      rule => rule.selector.includes('.h-carousel-item') && rule.declarations.has('z-index'),
    );

    expect(globalActiveRule?.declarations.get('z-index')).toBe('1');
    expect(itemZIndexRules.map(rule => rule.selector)).toEqual(['.h-carousel-item.is-active']);
    expect(cardViewportRule).toBeDefined();
    expect([...cardViewportRule!.declarations.keys()]).toEqual(['perspective']);
    expect(baseCardItemRule?.declarations.get('will-change')).toBe('auto');
    expect(cardItemRules.length).toBeGreaterThan(0);
    for (const rule of cardItemRules) {
      for (const property of [
        'animation-fill-mode',
        'backface-visibility',
        'isolation',
        'transform-style',
        'z-index',
      ])
        expect(rule.declarations.has(property)).toBe(false);
    }
  });

  test('keeps slide bystanders hidden and only assigns animations to transition roles', () => {
    const rules = compileCarouselStyleRules();
    const baseSlideItemRule = rules.find(
      rule => rule.selector === '.h-carousel--slide .h-carousel-item',
    );
    const activeSlideItemRule = rules.find(
      rule => rule.selector === '.h-carousel--slide .h-carousel-item.is-active',
    );
    const slideAnimationRules = rules.filter(
      rule =>
        rule.selector.includes('.h-carousel--slide') && rule.declarations.has('animation-name'),
    );

    expect(baseSlideItemRule?.declarations.get('visibility')).toBe('hidden');
    expect(baseSlideItemRule?.declarations.get('transform')).toBe('none');
    expect(baseSlideItemRule?.declarations.get('transition')).toBe('none');
    expect(activeSlideItemRule?.declarations.get('visibility')).toBe('visible');
    expect(slideAnimationRules).toHaveLength(8);
    expect(slideAnimationRules.map(rule => rule.declarations.get('animation-name')).sort()).toEqual(
      [
        'h-carousel-slide-x-in',
        'h-carousel-slide-x-in-reverse',
        'h-carousel-slide-x-out',
        'h-carousel-slide-x-out-reverse',
        'h-carousel-slide-y-in',
        'h-carousel-slide-y-in-reverse',
        'h-carousel-slide-y-out',
        'h-carousel-slide-y-out-reverse',
      ].sort(),
    );
    for (const rule of slideAnimationRules) {
      expect(rule.selector).toMatch(/\.is-slide-(?:in|out)$/);
    }
  });

  test('switches with arrows, emits updates and loops in uncontrolled mode', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, moveSpeed: 120 },
      slots: { default: slides },
    });

    await wrapper.find('.h-carousel__arrow--next').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.[0]).toEqual([1, 0]);

    const carousel = wrapper.vm as unknown as CarouselVm;
    await vi.advanceTimersByTimeAsync(120);
    carousel.setActiveItem('first');
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(0);
    await vi.advanceTimersByTimeAsync(120);
    carousel.prev();
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(2);
  });

  test('clamps navigation when looping is disabled', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, loop: false, moveSpeed: 120 },
      slots: { default: slides },
    });

    expect(wrapper.find('.h-carousel__arrow--previous').attributes('disabled')).toBeDefined();
    const carousel = wrapper.vm as unknown as CarouselVm;
    carousel.setActiveItem(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.h-carousel__arrow--next').attributes('disabled')).toBeDefined();
    await vi.advanceTimersByTimeAsync(120);
    carousel.next();
    expect(carousel.activeIndex).toBe(2);
  });

  test('does not update a controlled carousel until the parent accepts the request', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, modelValue: 0, moveSpeed: 120 },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    await wrapper.find('.h-carousel__arrow--next').trigger('click');
    await wrapper.find('.h-carousel__arrow--next').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[1], [1]]);
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(carousel.activeIndex).toBe(0);
    expect(wrapper.find('.h-carousel__status').text()).toBe('1 / 3');

    await wrapper.setProps({ modelValue: 1 });
    expect(carousel.activeIndex).toBe(1);
    expect(wrapper.emitted('change')).toEqual([[1, 0]]);

    await vi.advanceTimersByTimeAsync(120);
    await wrapper.trigger('keydown', { key: 'End' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2]);
    expect(carousel.activeIndex).toBe(1);
    await wrapper.setProps({ modelValue: 2 });
    expect(carousel.activeIndex).toBe(2);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([2, 1]);
  });

  test('keeps a manual pause after hover ends and resumes on explicit play', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: true, interval: 1000 },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(1);

    await wrapper.trigger('mouseenter');
    const autoplay = wrapper.find('.h-carousel__autoplay');
    expect(autoplay.attributes('aria-label')).toBe('Stop automatic slide show');
    await autoplay.trigger('click');
    expect(autoplay.attributes('aria-label')).toBe('Start automatic slide show');
    await wrapper.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(3000);
    expect(carousel.activeIndex).toBe(1);

    carousel.play();
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(2);
  });

  test('pauses while focused and explicit play can resume without leaving the carousel', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: true, interval: 1000 },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    await wrapper.trigger('focusin', { relatedTarget: null });
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(0);

    carousel.play();
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(1);

    await wrapper.trigger('focusin', {
      relatedTarget: wrapper.find('.h-carousel__arrow--previous').element,
    });
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(2);
  });

  test('stops non-looping autoplay at the end and can replay from the beginning', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: true, interval: 1000, loop: false },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    await vi.advanceTimersByTimeAsync(3000);
    expect(carousel.activeIndex).toBe(2);
    expect(wrapper.find('.h-carousel__autoplay').attributes('aria-label')).toBe(
      'Start automatic slide show',
    );
    await vi.advanceTimersByTimeAsync(5000);
    expect(carousel.activeIndex).toBe(2);

    await wrapper.find('.h-carousel__autoplay').trigger('click');
    expect(carousel.activeIndex).toBe(0);
    await vi.advanceTimersByTimeAsync(1000);
    expect(carousel.activeIndex).toBe(1);
  });

  test('uses vertical keys, hover indicators and outside layout together', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: {
        autoplay: false,
        direction: 'vertical',
        indicatorPosition: 'outside',
        moveSpeed: 120,
        trigger: 'hover',
      },
      slots: { default: slides },
    });

    expect(wrapper.classes()).toContain('h-carousel--vertical');
    expect(wrapper.classes()).toContain('h-carousel--indicators-outside');
    await wrapper.trigger('keydown', { key: 'ArrowDown' });
    const carousel = wrapper.vm as unknown as CarouselVm;
    expect(carousel.activeIndex).toBe(1);
    await vi.advanceTimersByTimeAsync(120);
    await wrapper.findAll('.h-carousel__indicator-trigger')[2].trigger('mouseenter');
    expect(carousel.activeIndex).toBe(2);
  });

  test('renders and navigates the card arrangement with adjacent previews', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: {
        autoplay: false,
        effect: 'card',
        indicatorPosition: 'outside',
      },
      slots: { default: cardSlides },
    });
    const items = wrapper.findAll('.h-carousel-item');

    expect(wrapper.classes()).toContain('h-carousel--card');
    expect(wrapper.classes()).toContain('h-carousel--motion-next');
    expect(items[0].classes()).toContain('is-active');
    expect(items[1].classes()).toContain('is-next');
    expect(items[2].classes()).toContain('is-hidden');
    expect(items[3].classes()).toContain('is-previous');

    await wrapper.findAll('.h-carousel__indicator')[1].trigger('click');
    expect(items[0].classes()).toContain('is-previous');
    expect(items[1].classes()).toContain('is-active');
    expect(items[2].classes()).toContain('is-next');
    expect(items[3].classes()).toContain('is-hidden');

    await wrapper.findAll('.h-carousel__indicator')[0].trigger('click');
    expect(items[1].classes()).toContain('is-active');
    expect(wrapper.classes()).toContain('h-carousel--motion-next');

    await vi.advanceTimersByTimeAsync(500);
    await wrapper.findAll('.h-carousel__indicator')[0].trigger('click');
    expect(wrapper.classes()).toContain('h-carousel--motion-previous');
    expect(items[0].classes()).toContain('is-active');
    expect(items[3].classes()).toContain('is-previous');
  });

  test.each(stackingTransitionCases)(
    'keeps one incoming active $effect item and an adjacent outgoing item from $scenario',
    async ({ effect, from, motion, outgoingClass, placementClass, to }) => {
      vi.useFakeTimers();
      const wrapper = mount(HCarousel, {
        props: { autoplay: false, effect, initialIndex: from, moveSpeed: 120 },
        slots: { default: cardSlides },
      });
      const items = wrapper.findAll('.h-carousel-item');

      await wrapper.findAll('.h-carousel__indicator')[to].trigger('click');

      expect(wrapper.classes()).toContain(`h-carousel--motion-${motion}`);
      expect(items.filter(item => item.classes().includes('is-active'))).toHaveLength(1);
      expect(items[to].classes()).toContain('is-active');
      expect(items[from].classes()).not.toContain('is-active');
      expect(items[from].classes()).toEqual(
        expect.arrayContaining([outgoingClass, placementClass]),
      );
      expect(items[from].classes()).not.toContain('is-hidden');
    },
  );

  test.each([
    { from: 0, idle: 2, motion: 'next', scenario: '0 to 1', to: 1 },
    { from: 1, idle: 2, motion: 'previous', scenario: '1 to 0', to: 0 },
    { from: 2, idle: 1, motion: 'next', scenario: 'last to first', to: 0 },
  ])(
    'limits slide animation roles to source and target for $scenario',
    async ({ from, idle, motion, to }) => {
      vi.useFakeTimers();
      const wrapper = mount(HCarousel, {
        props: { autoplay: false, effect: 'slide', initialIndex: from, moveSpeed: 120 },
        slots: { default: slides },
      });
      const carousel = wrapper.vm as unknown as CarouselVm;
      const items = wrapper.findAll('.h-carousel-item');
      const indicators = wrapper.findAll('.h-carousel__indicator');

      expect(wrapper.findAll('.h-carousel-item.is-slide-in')).toHaveLength(0);
      expect(wrapper.findAll('.h-carousel-item.is-slide-out')).toHaveLength(0);

      await indicators[to].trigger('click');

      expect(carousel.activeIndex).toBe(to);
      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(['is-animating', `h-carousel--motion-${motion}`]),
      );
      expect(wrapper.findAll('.h-carousel-item.is-slide-in')).toHaveLength(1);
      expect(wrapper.findAll('.h-carousel-item.is-slide-out')).toHaveLength(1);
      expect(items[to].classes()).toEqual(expect.arrayContaining(['is-active', 'is-slide-in']));
      expect(items[from].classes()).toContain('is-slide-out');
      expect(items[from].classes()).not.toContain('is-hidden');
      expect(items[idle].classes()).toContain('is-hidden');
      expect(items[idle].classes()).not.toContain('is-slide-in');
      expect(items[idle].classes()).not.toContain('is-slide-out');

      await indicators[idle].trigger('click');
      expect(carousel.activeIndex).toBe(to);
      await vi.advanceTimersByTimeAsync(119);
      expect(wrapper.classes()).toContain('is-animating');
      expect(items[to].classes()).toContain('is-slide-in');
      expect(items[from].classes()).toContain('is-slide-out');
      await indicators[idle].trigger('click');
      expect(carousel.activeIndex).toBe(to);

      await vi.advanceTimersByTimeAsync(1);
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).not.toContain('is-animating');
      expect(wrapper.findAll('.h-carousel-item.is-slide-in')).toHaveLength(0);
      expect(wrapper.findAll('.h-carousel-item.is-slide-out')).toHaveLength(0);
      expect(items[from].classes()).toContain('is-hidden');
      expect(items[idle].classes()).toContain('is-hidden');

      await indicators[idle].trigger('click');
      expect(carousel.activeIndex).toBe(idle);
    },
  );

  test.each([
    { action: 'next' as const, from: 0, motion: 'next', to: 1 },
    { action: 'next' as const, from: 1, motion: 'next', to: 0 },
    { action: 'prev' as const, from: 0, motion: 'previous', to: 1 },
  ])(
    'keeps two-item slide $action navigation isolated from $from to $to',
    async ({ action, from, motion, to }) => {
      vi.useFakeTimers();
      const wrapper = mount(HCarousel, {
        props: { autoplay: false, effect: 'slide', initialIndex: from, moveSpeed: 120 },
        slots: { default: twoCardSlides },
      });
      const carousel = wrapper.vm as unknown as CarouselVm;
      const items = wrapper.findAll('.h-carousel-item');

      carousel[action]();
      await wrapper.vm.$nextTick();

      expect(carousel.activeIndex).toBe(to);
      expect(wrapper.classes()).toContain(`h-carousel--motion-${motion}`);
      expect(items[to].classes()).toEqual(expect.arrayContaining(['is-active', 'is-slide-in']));
      expect(items[from].classes()).toContain('is-slide-out');
      expect(items[from].classes()).not.toContain('is-hidden');
      expect(wrapper.findAll('.h-carousel-item.is-slide-in')).toHaveLength(1);
      expect(wrapper.findAll('.h-carousel-item.is-slide-out')).toHaveLength(1);

      await vi.advanceTimersByTimeAsync(120);
      expect(items[from].classes()).toContain('is-hidden');
      expect(wrapper.findAll('.h-carousel-item.is-slide-in')).toHaveLength(0);
      expect(wrapper.findAll('.h-carousel-item.is-slide-out')).toHaveLength(0);
    },
  );

  test('keeps the first card paint static and unlocks at the configured move speed', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, effect: 'card', moveSpeed: 120 },
      slots: { default: cardSlides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;
    const next = wrapper.find('.h-carousel__arrow--next');

    expect(wrapper.classes()).not.toContain('is-motion-ready');
    expect(
      (wrapper.element as HTMLElement).style.getPropertyValue('--h-carousel-transition-duration'),
    ).toBe('120ms');

    await next.trigger('click');
    expect(carousel.activeIndex).toBe(1);
    expect(wrapper.classes()).toContain('is-motion-ready');

    await next.trigger('click');
    expect(carousel.activeIndex).toBe(1);
    await vi.advanceTimersByTimeAsync(119);
    await next.trigger('click');
    expect(carousel.activeIndex).toBe(1);

    await vi.advanceTimersByTimeAsync(1);
    await next.trigger('click');
    expect(carousel.activeIndex).toBe(2);
  });

  test.each([
    {
      activePoint: { clientX: 150, clientY: 50 },
      activeRect: { bottom: 100, left: 100, right: 200, top: 0 },
      direction: 'horizontal' as const,
      nextPoint: { clientX: 250, clientY: 50 },
      nextRect: { bottom: 100, left: 180, right: 300, top: 0 },
      previousPoint: { clientX: 50, clientY: 50 },
      previousRect: { bottom: 100, left: 0, right: 120, top: 0 },
    },
    {
      activePoint: { clientX: 50, clientY: 150 },
      activeRect: { bottom: 200, left: 0, right: 100, top: 100 },
      direction: 'vertical' as const,
      nextPoint: { clientX: 50, clientY: 250 },
      nextRect: { bottom: 300, left: 0, right: 100, top: 180 },
      previousPoint: { clientX: 50, clientY: 50 },
      previousRect: { bottom: 120, left: 0, right: 100, top: 0 },
    },
  ])(
    'navigates from exposed $direction card previews without treating the active card as a preview',
    async ({
      activePoint,
      activeRect,
      direction,
      nextPoint,
      nextRect,
      previousPoint,
      previousRect,
    }) => {
      vi.useFakeTimers();
      const wrapper = mount(HCarousel, {
        props: {
          autoplay: false,
          direction,
          effect: 'card',
          initialIndex: 1,
          moveSpeed: 120,
        },
        slots: { default: cardSlides },
      });
      const carousel = wrapper.vm as unknown as CarouselVm;
      const viewport = wrapper.find('.h-carousel__viewport');
      const mockCardRects = () => {
        vi.spyOn(
          wrapper.find('.h-carousel-item.is-active').element,
          'getBoundingClientRect',
        ).mockReturnValue(createRect(activeRect));
        vi.spyOn(
          wrapper.find('.h-carousel-item.is-placement-previous').element,
          'getBoundingClientRect',
        ).mockReturnValue(createRect(previousRect));
        vi.spyOn(
          wrapper.find('.h-carousel-item.is-placement-next').element,
          'getBoundingClientRect',
        ).mockReturnValue(createRect(nextRect));
      };

      mockCardRects();
      await wrapper.find('.h-carousel-item.is-active').trigger('click', activePoint);
      expect(carousel.activeIndex).toBe(1);

      await viewport.trigger('click', previousPoint);
      expect(carousel.activeIndex).toBe(0);
      expect(wrapper.classes()).toContain('h-carousel--motion-previous');

      await vi.advanceTimersByTimeAsync(120);
      mockCardRects();
      await viewport.trigger('click', nextPoint);
      expect(carousel.activeIndex).toBe(1);
      expect(wrapper.classes()).toContain('h-carousel--motion-next');
    },
  );

  test('navigates card previews with a custom component namespace', async () => {
    const originalNamespace = useNamespace();
    setNamespace('Aurora');

    try {
      const wrapper = mount(HCarousel, {
        props: {
          autoplay: false,
          effect: 'card',
          initialIndex: 1,
        },
        slots: { default: cardSlides },
      });
      const carousel = wrapper.vm as unknown as CarouselVm;
      const active = wrapper.find('.aurora-carousel-item.is-active');
      const next = wrapper.find('.aurora-carousel-item.is-placement-next');

      expect(wrapper.classes()).toContain('aurora-carousel');
      expect(active.exists()).toBe(true);
      expect(next.exists()).toBe(true);
      vi.spyOn(active.element, 'getBoundingClientRect').mockReturnValue(
        createRect({ bottom: 100, left: 100, right: 200, top: 0 }),
      );
      vi.spyOn(next.element, 'getBoundingClientRect').mockReturnValue(
        createRect({ bottom: 100, left: 180, right: 300, top: 0 }),
      );

      await wrapper
        .find('.aurora-carousel__viewport')
        .trigger('click', { clientX: 250, clientY: 50 });
      expect(carousel.activeIndex).toBe(2);
    } finally {
      setNamespace(originalNamespace);
    }
  });

  test('uses linear card motion directions when looping is disabled', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, effect: 'card', loop: false, moveSpeed: 120 },
      slots: { default: cardSlides },
    });
    const indicators = wrapper.findAll('.h-carousel__indicator');

    await indicators[3].trigger('click');
    expect((wrapper.vm as unknown as CarouselVm).activeIndex).toBe(3);
    expect(wrapper.classes()).toContain('h-carousel--motion-next');

    await vi.advanceTimersByTimeAsync(120);
    await indicators[0].trigger('click');
    expect((wrapper.vm as unknown as CarouselVm).activeIndex).toBe(0);
    expect(wrapper.classes()).toContain('h-carousel--motion-previous');
  });

  test('uses vertical card states and only the vertical arrow keys', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: {
        autoplay: false,
        direction: 'vertical',
        effect: 'card',
      },
      slots: { default: cardSlides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;
    const items = wrapper.findAll('.h-carousel-item');

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-carousel--vertical', 'h-carousel--card']),
    );
    expect(items[0].classes()).toContain('is-active');
    expect(items[1].classes()).toContain('is-next');
    expect(items[3].classes()).toContain('is-previous');

    const horizontalEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight',
    });
    wrapper.element.dispatchEvent(horizontalEvent);
    await wrapper.vm.$nextTick();
    expect(horizontalEvent.defaultPrevented).toBe(false);
    expect(carousel.activeIndex).toBe(0);

    const downEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowDown',
    });
    wrapper.element.dispatchEvent(downEvent);
    await wrapper.vm.$nextTick();
    expect(downEvent.defaultPrevented).toBe(true);
    expect(carousel.activeIndex).toBe(1);
    expect(wrapper.classes()).toContain('h-carousel--motion-next');

    const lockedUpEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowUp',
    });
    wrapper.element.dispatchEvent(lockedUpEvent);
    await wrapper.vm.$nextTick();
    expect(lockedUpEvent.defaultPrevented).toBe(false);
    expect(carousel.activeIndex).toBe(1);
    expect(wrapper.classes()).toContain('h-carousel--motion-next');

    await vi.advanceTimersByTimeAsync(500);
    const allowedUpEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowUp',
    });
    wrapper.element.dispatchEvent(allowedUpEvent);
    await wrapper.vm.$nextTick();
    expect(allowedUpEvent.defaultPrevented).toBe(true);
    expect(carousel.activeIndex).toBe(0);
    expect(wrapper.classes()).toContain('h-carousel--motion-previous');
  });

  test('keeps the other item on both card preview sides when two items loop', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, effect: 'card', loop: true },
      slots: { default: twoCardSlides },
    });
    const items = wrapper.findAll('.h-carousel-item');

    expect(items[0].classes()).toContain('is-active');
    expect(items[1].classes()).toEqual(expect.arrayContaining(['is-previous', 'is-next']));

    await wrapper.find('.h-carousel__arrow--next').trigger('click');
    expect(items[1].classes()).toContain('is-active');
    expect(items[0].classes()).toEqual(expect.arrayContaining(['is-previous', 'is-next']));
  });

  test.each(['dot', 'line'] as const)(
    'renders one accessible indicator and visual mark per slide for %s indicators',
    indicatorType => {
      const wrapper = mount(HCarousel, {
        props: { autoplay: false, indicatorType },
        slots: { default: slides },
      });

      expect(wrapper.classes()).toContain(`h-carousel--indicator-${indicatorType}`);
      expect(wrapper.findAll('.h-carousel__indicator')).toHaveLength(3);
      expect(wrapper.findAll('.h-carousel__indicator-mark')).toHaveLength(3);
      expect(wrapper.findAll('.h-carousel__indicator-slider-mark')).toHaveLength(0);
    },
  );

  test('renders one slider thumb over accessible slide segments and updates aria-current', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, indicatorType: 'slider' },
      slots: { default: slides },
    });
    const segments = wrapper.findAll('.h-carousel__indicator-slider-segment');

    expect(wrapper.classes()).toContain('h-carousel--indicator-slider');
    expect(wrapper.findAll('.h-carousel__indicator-slider-track')).toHaveLength(1);
    expect(wrapper.findAll('.h-carousel__indicator-slider-mark')).toHaveLength(1);
    expect(wrapper.findAll('.h-carousel__indicator-mark')).toHaveLength(0);
    expect(segments).toHaveLength(3);
    expect(segments.map(segment => segment.attributes('aria-label'))).toEqual([
      'First slide',
      'Go to slide 2',
      'Go to slide 3',
    ]);
    expect(segments[0].attributes('aria-current')).toBe('true');
    expect(segments[2].attributes('aria-current')).toBeUndefined();

    await segments[2].trigger('click');
    expect(segments[0].attributes('aria-current')).toBeUndefined();
    expect(segments[2].attributes('aria-current')).toBe('true');
    expect((wrapper.vm as unknown as CarouselVm).activeIndex).toBe(2);
  });

  test('combines a vertical card with outer-right line indicators', () => {
    const wrapper = mount(HCarousel, {
      props: {
        autoplay: false,
        direction: 'vertical',
        effect: 'card',
        indicatorPosition: 'outer-right',
        indicatorType: 'line',
      },
      slots: { default: cardSlides },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'h-carousel--vertical',
        'h-carousel--card',
        'h-carousel--indicators-outer-right',
        'h-carousel--indicator-position-outer-right',
        'h-carousel--indicator-line',
      ]),
    );
    expect(wrapper.find('.h-carousel__indicators').attributes('aria-orientation')).toBe('vertical');
    expect(wrapper.findAll('.h-carousel__indicator-mark')).toHaveLength(4);
  });

  test('forwards user attributes, events, class and style from CarouselItem', async () => {
    const onClick = vi.fn();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false },
      slots: {
        default: () => [
          h(
            HCarouselItem,
            {
              class: 'featured-slide',
              id: 'featured-slide',
              label: 'Featured slide',
              onClick,
              style: { borderRadius: '12px' },
              title: 'Featured story',
            },
            () => 'Featured',
          ),
          h(HCarouselItem, { label: 'Second slide' }, () => 'Second'),
        ],
      },
    });
    const item = wrapper.find('.h-carousel-item');

    expect(item.classes()).toContain('featured-slide');
    expect(item.attributes('id')).toBe('featured-slide');
    expect(item.attributes('title')).toBe('Featured story');
    expect((item.element as HTMLElement).style.borderRadius).toBe('12px');
    await item.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not intercept keyboard events from controls inside a slide', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false },
      slots: {
        default: () => [
          h(HCarouselItem, { label: 'Interactive' }, () =>
            h('div', { role: 'slider', tabindex: 0 }, 'Volume'),
          ),
          h(HCarouselItem, { label: 'Second' }, () => 'Second'),
        ],
      },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;
    const nestedEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight',
    });

    wrapper.find('[role="slider"]').element.dispatchEvent(nestedEvent);
    await wrapper.vm.$nextTick();
    expect(nestedEvent.defaultPrevented).toBe(false);
    expect(carousel.activeIndex).toBe(0);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    const rootEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight',
    });
    wrapper.element.dispatchEvent(rootEvent);
    await wrapper.vm.$nextTick();
    expect(rootEvent.defaultPrevented).toBe(true);
    expect(carousel.activeIndex).toBe(1);
  });

  test('supports only main-axis single-touch swipes and clears cancelled gestures', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, moveSpeed: 120, swipeThreshold: 30 },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;
    const dispatchTouch = (
      type: 'touchstart' | 'touchend' | 'touchcancel',
      touches: Array<{ clientX: number; clientY: number; identifier: number }>,
    ) => {
      const event = new Event(type, { bubbles: true });
      Object.defineProperty(event, type === 'touchend' ? 'changedTouches' : 'touches', {
        value: touches,
      });
      wrapper.element.dispatchEvent(event);
    };

    dispatchTouch('touchstart', [{ clientX: 100, clientY: 20, identifier: 1 }]);
    dispatchTouch('touchend', [{ clientX: 40, clientY: 25, identifier: 1 }]);
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(1);

    await vi.advanceTimersByTimeAsync(120);
    dispatchTouch('touchstart', [{ clientX: 100, clientY: 20, identifier: 2 }]);
    dispatchTouch('touchend', [{ clientX: 60, clientY: 100, identifier: 2 }]);
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(1);

    dispatchTouch('touchstart', [{ clientX: 100, clientY: 20, identifier: 3 }]);
    dispatchTouch('touchcancel', []);
    dispatchTouch('touchend', [{ clientX: 20, clientY: 20, identifier: 3 }]);
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(1);
  });

  test('distinguishes numeric names from numeric indices', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, moveSpeed: 120 },
      slots: {
        default: () => [
          h(HCarouselItem, { name: 7, label: 'Numeric name' }, () => 'Numeric'),
          h(HCarouselItem, { name: '7', label: 'String name' }, () => 'String'),
          h(HCarouselItem, { name: 'last', label: 'Last' }, () => 'Last'),
        ],
      },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    carousel.setActiveItem({ name: '7' });
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(1);
    await vi.advanceTimersByTimeAsync(120);
    carousel.setActiveItem({ name: 7 });
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(0);
    await vi.advanceTimersByTimeAsync(120);
    carousel.setActiveItem(2);
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(2);
  });

  test('ignores invalid exposed targets and safely normalizes an invalid controlled value', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, modelValue: Number.NaN },
      slots: { default: slides },
    });
    const carousel = wrapper.vm as unknown as CarouselVm;

    expect(carousel.activeIndex).toBe(0);
    expect(wrapper.find('.h-carousel__status').text()).toBe('1 / 3');
    carousel.setActiveItem(1.5);
    carousel.setActiveItem({ index: Number.NaN });
    await wrapper.vm.$nextTick();
    expect(carousel.activeIndex).toBe(0);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  test('keeps requesting controlled autoplay when the parent rejects an update', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HCarousel, {
      props: { autoplay: true, interval: 1000, modelValue: 0 },
      slots: { default: slides },
    });

    await vi.advanceTimersByTimeAsync(3100);
    expect(wrapper.emitted('update:modelValue')).toEqual([[1], [1], [1]]);
    expect((wrapper.vm as unknown as CarouselVm).activeIndex).toBe(0);
    expect(wrapper.find('.h-carousel__autoplay').attributes('aria-label')).toBe(
      'Stop automatic slide show',
    );
  });

  test('does not consume keyboard navigation when no movement is possible', async () => {
    const wrapper = mount(HCarousel, {
      props: { autoplay: false, loop: false },
      slots: { default: slides },
    });
    const previousEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowLeft',
    });
    wrapper.element.dispatchEvent(previousEvent);
    await wrapper.vm.$nextTick();
    expect(previousEvent.defaultPrevented).toBe(false);

    const nextEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight',
    });
    wrapper.element.dispatchEvent(nextEvent);
    await wrapper.vm.$nextTick();
    expect(nextEvent.defaultPrevented).toBe(true);
  });

  test.each([
    { expected: 0, loop: true },
    { expected: 1, loop: false },
  ])(
    'normalizes a controlled index when items shrink with loop=$loop',
    async ({ expected, loop }) => {
      const count = ref(3);
      const wrapper = mount(HCarousel, {
        props: { autoplay: false, loop, modelValue: 2 },
        slots: { default: () => slides().slice(0, count.value) },
      });
      const carousel = wrapper.vm as unknown as CarouselVm;

      count.value = 2;
      await nextTick();
      expect(carousel.activeIndex).toBe(expected);
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([expected]);
      expect(wrapper.emitted('change')?.at(-1)).toEqual([expected, 2]);
      expect(wrapper.find('.h-carousel-item.is-active').text()).toBe(
        expected === 0 ? 'One' : 'Two',
      );

      count.value = 3;
      await nextTick();
      expect(carousel.activeIndex).toBe(2);
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2]);
      expect(wrapper.find('.h-carousel-item.is-active').text()).toBe('Three');
    },
  );

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
