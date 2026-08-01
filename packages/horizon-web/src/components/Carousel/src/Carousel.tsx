import { IconArrowLeft, IconArrowRight, IconPause, IconPlay } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, flattenVNodes, useNamespace } from '@aurora/utils';
import type { CSSProperties, VNode } from 'vue';
import {
  cloneVNode,
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref,
  watch,
} from 'vue';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import CarouselItem from './CarouselItem';
import type { CarouselEmits } from './composables/useEmits';
import { useCarouselEmits } from './composables/useEmits';
import type { CarouselExposes } from './composables/useExposes';
import { useCarouselExposes } from './composables/useExposes';
import { useCarouselProps } from './composables/useProps';
import type { CarouselSlots } from './composables/useSlots';
import { useCarouselSlots } from './composables/useSlots';

type MotionDirection = 'next' | 'previous';

export default defineComponent({
  name: `${useNamespace()}Carousel`,
  desc: '走马灯用于在有限空间内循环展示一组同级内容',
  descLocales: { en: 'Carousel rotates through a set of related content in limited space.' },
  inheritAttrs: false,
  props: useCarouselProps,
  emits: useCarouselEmits,
  slots: useCarouselSlots,
  exposes: useCarouselExposes,
  setup(
    props,
    {
      attrs,
      emit,
      expose,
      slots,
    }: HorizonWebSetupContext<CarouselEmits, CarouselSlots, CarouselExposes>,
  ) {
    const classHelper = new ComponentClassBlock('carousel');
    const activeIndex = ref(props.modelValue ?? props.initialIndex);
    const previousIndex = ref(activeIndex.value);
    const itemCount = ref(0);
    const itemNames = ref<Array<string | number | undefined>>([]);
    const motion = ref<MotionDirection>('next');
    const manuallyPaused = ref(false);
    const hoverPaused = ref(false);
    const pageHidden = ref(false);
    const reducedMotion = ref(false);
    const touchStart = ref<{ x: number; y: number }>();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const carouselText = useLocaleLang('carousel.label', 'Carousel');
    const previousText = useLocaleLang('carousel.previous', 'Previous slide');
    const nextText = useLocaleLang('carousel.next', 'Next slide');
    const playText = useLocaleLang('carousel.play', 'Start automatic slide show');
    const pauseText = useLocaleLang('carousel.pause', 'Stop automatic slide show');
    const indicatorText = useLocaleLang('carousel.indicator', 'Go to slide {current}');
    const localized = (value: unknown, fallback: string) => String(value ?? fallback);

    const cssHeight = computed(() =>
      typeof props.height === 'number' ? `${props.height}px` : props.height,
    );
    const atStart = computed(() => !props.loop && activeIndex.value <= 0);
    const atEnd = computed(
      () => !props.loop && activeIndex.value >= Math.max(0, itemCount.value - 1),
    );
    const canAutoplay = computed(
      () =>
        props.autoplay &&
        itemCount.value > 1 &&
        !manuallyPaused.value &&
        !hoverPaused.value &&
        !pageHidden.value &&
        !reducedMotion.value,
    );

    const normalizeIndex = (index: number) => {
      if (!itemCount.value) return 0;
      if (!props.loop) return Math.min(Math.max(index, 0), itemCount.value - 1);
      return ((index % itemCount.value) + itemCount.value) % itemCount.value;
    };

    const changeTo = (target: number, direction?: MotionDirection, shouldEmit = true) => {
      const nextIndex = normalizeIndex(target);
      const oldIndex = activeIndex.value;
      if (nextIndex === oldIndex) return;

      previousIndex.value = oldIndex;
      motion.value =
        direction ??
        (Math.abs(nextIndex - oldIndex) > itemCount.value / 2
          ? nextIndex < oldIndex
            ? 'next'
            : 'previous'
          : nextIndex > oldIndex
            ? 'next'
            : 'previous');
      activeIndex.value = nextIndex;
      if (shouldEmit) {
        emit('update:modelValue', nextIndex);
        emit('change', nextIndex, oldIndex);
      }
    };

    const next = () => changeTo(activeIndex.value + 1, 'next');
    const prev = () => changeTo(activeIndex.value - 1, 'previous');
    const setActiveItem = (target: number | string) => {
      const index =
        typeof target === 'number'
          ? target
          : itemNames.value.findIndex(name => String(name) === target);
      if (index >= 0) changeTo(index);
    };
    const pause = () => {
      manuallyPaused.value = true;
    };
    const play = () => {
      manuallyPaused.value = false;
      reducedMotion.value = false;
    };

    const clearTimer = () => {
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
    };
    const schedule = () => {
      clearTimer();
      if (!canAutoplay.value) return;
      timer = setTimeout(next, props.interval);
    };

    watch(
      () => props.modelValue,
      value => {
        if (value === undefined || value === activeIndex.value) return;
        changeTo(value, undefined, false);
      },
    );
    watch([activeIndex, canAutoplay, () => props.interval], schedule, { flush: 'post' });
    watch(itemCount, count => {
      if (!count) {
        activeIndex.value = 0;
        return;
      }
      const normalized = normalizeIndex(activeIndex.value);
      if (normalized !== activeIndex.value)
        changeTo(normalized, undefined, props.modelValue === undefined);
    });

    const onVisibilityChange = () => {
      pageHidden.value = document.hidden;
    };
    onMounted(() => {
      reducedMotion.value =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      document.addEventListener('visibilitychange', onVisibilityChange);
      schedule();
    });
    onBeforeUnmount(() => {
      clearTimer();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    });

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      !!target.closest('button, a, input, select, textarea, [contenteditable="true"]');

    const onKeydown = (event: KeyboardEvent) => {
      if (!props.keyboard || isInteractiveTarget(event.target)) return;
      let target: number | undefined;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = itemCount.value - 1;
      if (props.direction === 'horizontal') {
        if (event.key === 'ArrowLeft') target = activeIndex.value - 1;
        if (event.key === 'ArrowRight') target = activeIndex.value + 1;
      } else {
        if (event.key === 'ArrowUp') target = activeIndex.value - 1;
        if (event.key === 'ArrowDown') target = activeIndex.value + 1;
      }
      if (target === undefined) return;
      event.preventDefault();
      changeTo(target, target < activeIndex.value ? 'previous' : 'next');
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !props.swipeThreshold) return;
      touchStart.value = { x: touch.clientX, y: touch.clientY };
    };
    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.value;
      const touch = event.changedTouches[0];
      touchStart.value = undefined;
      if (!start || !touch) return;
      const distance =
        props.direction === 'horizontal' ? touch.clientX - start.x : touch.clientY - start.y;
      if (Math.abs(distance) < props.swipeThreshold) return;
      distance < 0 ? next() : prev();
    };

    expose({ activeIndex: readonly(activeIndex), setActiveItem, prev, next, pause, play });

    const getItems = () => {
      const content = slots.default?.();
      const items = flattenVNodes(
        content ? (Array.isArray(content) ? content : [content]) : [],
      ).filter(vnode => {
        const name = (vnode.type as { name?: string })?.name;
        return vnode.type === CarouselItem || name === `${useNamespace()}CarouselItem`;
      });
      itemCount.value = items.length;
      itemNames.value = items.map(item => item.props?.name);
      return items;
    };

    const renderItem = (item: VNode, index: number, total: number) =>
      cloneVNode(item, {
        'data-carousel-index': index,
        'data-carousel-total': total,
        'data-carousel-active': activeIndex.value,
        'data-carousel-previous': previousIndex.value,
        'data-carousel-loop': props.loop,
        'data-carousel-motion': motion.value,
      });

    return () => {
      const items = getItems();
      const showControls = items.length > 1;
      const rootStyle = { '--h-carousel-size-container-height': cssHeight.value } as CSSProperties;
      return (
        <section
          {...attrs}
          class={cls(
            classHelper.block,
            classHelper.m(props.direction),
            classHelper.m(props.effect),
            classHelper.m(`arrow-${props.arrow}`),
            classHelper.m(`indicators-${props.indicatorPosition}`),
            attrs.class as string,
          )}
          style={[rootStyle, attrs.style as CSSProperties]}
          role="region"
          aria-roledescription={localized(carouselText.value, 'Carousel')}
          aria-label={props.ariaLabel ?? localized(carouselText.value, 'Carousel')}
          tabindex={0}
          onKeydown={onKeydown}
          onMouseenter={() => {
            if (props.pauseOnHover) hoverPaused.value = true;
          }}
          onMouseleave={() => {
            hoverPaused.value = false;
          }}
          onFocusin={() => {
            if (props.pauseOnFocus) pause();
          }}
          onTouchstart={onTouchStart}
          onTouchend={onTouchEnd}
        >
          <div class={classHelper.e('viewport')}>
            {items.map((item, index) => renderItem(item, index, items.length))}
          </div>

          {showControls && props.arrow !== 'never' && (
            <>
              <HButton
                class={cls(classHelper.e('arrow'), classHelper.em('arrow', 'previous'))}
                icon={slots.previous ? undefined : IconArrowLeft}
                text
                size="small"
                disabled={atStart.value}
                aria-label={previousText.value}
                onClick={prev}
              >
                {slots.previous?.()}
              </HButton>
              <HButton
                class={cls(classHelper.e('arrow'), classHelper.em('arrow', 'next'))}
                icon={slots.next ? undefined : IconArrowRight}
                text
                size="small"
                disabled={atEnd.value}
                aria-label={nextText.value}
                onClick={next}
              >
                {slots.next?.()}
              </HButton>
            </>
          )}

          {showControls && props.autoplay && (
            <HButton
              class={classHelper.e('autoplay')}
              icon={canAutoplay.value ? IconPause : IconPlay}
              text
              size="small"
              aria-label={canAutoplay.value ? pauseText.value : playText.value}
              onClick={canAutoplay.value ? pause : play}
            />
          )}

          {showControls && props.indicatorPosition !== 'none' && (
            <div
              class={classHelper.e('indicators')}
              role="group"
              aria-label={localized(carouselText.value, 'Carousel')}
            >
              {items.map((item, index) => {
                const active = activeIndex.value === index;
                const label = item.props?.label;
                return (
                  <span
                    class={classHelper.e('indicator-trigger')}
                    onMouseenter={() => {
                      if (props.trigger === 'hover') changeTo(index);
                    }}
                  >
                    <HButton
                      class={cls(classHelper.e('indicator'), classHelper.is('active', active))}
                      text
                      size="small"
                      aria-label={
                        label !== undefined
                          ? String(label)
                          : localized(indicatorText.value, 'Go to slide {current}').replace(
                              '{current}',
                              String(index + 1),
                            )
                      }
                      aria-current={active ? 'true' : undefined}
                      onClick={() => changeTo(index)}
                    >
                      {slots.indicator?.(index, active, label)}
                    </HButton>
                  </span>
                );
              })}
            </div>
          )}

          <span class={classHelper.e('status')} aria-live={canAutoplay.value ? 'off' : 'polite'}>
            {itemCount.value ? `${activeIndex.value + 1} / ${itemCount.value}` : ''}
          </span>
        </section>
      );
    };
  },
});
