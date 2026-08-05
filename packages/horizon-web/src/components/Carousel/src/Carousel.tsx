import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconPause,
  IconPlay,
} from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, flattenVNodes, useNamespace } from '@aurora/utils';
import type { CSSProperties, VNode } from 'vue';
import { cloneVNode, computed, defineComponent, ref } from 'vue';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import CarouselItem from './CarouselItem';
import type { CarouselEmits } from './composables/useEmits';
import { useCarouselEmits } from './composables/useEmits';
import type { CarouselExposes } from './composables/useExposes';
import { useCarouselExposes } from './composables/useExposes';
import { useCarouselAutoplay } from './composables/useCarouselAutoplay';
import { useCarouselNavigation } from './composables/useCarouselNavigation';
import { useCarouselProps } from './composables/useProps';
import type { CarouselSlots } from './composables/useSlots';
import { useCarouselSlots } from './composables/useSlots';

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
    const itemClassHelper = new ComponentClassBlock('carousel-item');
    const itemCount = ref(0);
    const itemNames = ref<Array<string | number | undefined>>([]);
    const touchStart = ref<{ identifier: number; x: number; y: number }>();

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
    const resolvedIndicatorPosition = computed(() => {
      if (props.indicatorPosition === 'inside')
        return props.direction === 'vertical' ? 'right' : 'bottom';
      if (props.indicatorPosition === 'outside') return 'outer';
      return props.indicatorPosition;
    });
    const {
      activeIndex,
      atEnd,
      atStart,
      cardMotionReady,
      isAnimating,
      motion,
      next,
      prev,
      previousIndex,
      requestChange,
      setActiveItem,
    } = useCarouselNavigation(props, itemCount, itemNames, emit);
    const {
      actionIsPaused,
      canAutoplay,
      onFocusin,
      onFocusout,
      onMouseenter,
      onMouseleave,
      pause,
      play,
      toggle,
    } = useCarouselAutoplay({
      activeIndex,
      atEnd,
      itemCount,
      props,
      restart: () => requestChange(0, 'next'),
      rotate: next,
    });
    const previousIcon = computed(() =>
      props.direction === 'vertical' ? IconArrowUp : IconArrowLeft,
    );
    const nextIcon = computed(() =>
      props.direction === 'vertical' ? IconArrowDown : IconArrowRight,
    );

    const onKeydown = (event: KeyboardEvent) => {
      if (
        !props.keyboard ||
        event.target !== event.currentTarget ||
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
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
      const changed = requestChange(target, target < activeIndex.value ? 'previous' : 'next');
      if (changed) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.length === 1 ? event.touches[0] : undefined;
      if (!touch || !props.swipeThreshold) {
        touchStart.value = undefined;
        return;
      }
      touchStart.value = {
        identifier: touch.identifier ?? 0,
        x: touch.clientX,
        y: touch.clientY,
      };
    };
    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.value;
      const touch = Array.from(event.changedTouches).find(
        item => (item.identifier ?? 0) === start?.identifier,
      );
      touchStart.value = undefined;
      if (!start || !touch) return;
      const distanceX = touch.clientX - start.x;
      const distanceY = touch.clientY - start.y;
      const mainDistance = props.direction === 'horizontal' ? distanceX : distanceY;
      const crossDistance = props.direction === 'horizontal' ? distanceY : distanceX;
      if (
        Math.abs(mainDistance) < props.swipeThreshold ||
        Math.abs(mainDistance) <= Math.abs(crossDistance)
      )
        return;
      mainDistance < 0 ? next() : prev();
    };
    const onTouchCancel = () => {
      touchStart.value = undefined;
    };

    const onViewportClick = (event: MouseEvent) => {
      if (props.effect !== 'card' || itemCount.value < 2) return;
      const viewport = event.currentTarget;
      if (!(viewport instanceof HTMLElement)) return;
      const findItem = (state: 'active' | 'placement-previous' | 'placement-next') => {
        const stateClass = itemClassHelper.is(state);
        return Array.from(viewport.children).find(
          (child): child is HTMLElement =>
            child instanceof HTMLElement &&
            child.classList.contains(itemClassHelper.block) &&
            !!stateClass &&
            child.classList.contains(stateClass),
        );
      };
      const activeItem = findItem('active');
      if (!activeItem || (event.target instanceof Node && activeItem.contains(event.target)))
        return;

      const isWithin = (element: Element | null) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        );
      };
      const activeRect = activeItem.getBoundingClientRect();
      if (props.direction === 'horizontal') {
        if (event.clientX < activeRect.left && isWithin(findItem('placement-previous') ?? null))
          prev();
        if (event.clientX > activeRect.right && isWithin(findItem('placement-next') ?? null))
          next();
        return;
      }
      if (event.clientY < activeRect.top && isWithin(findItem('placement-previous') ?? null))
        prev();
      if (event.clientY > activeRect.bottom && isWithin(findItem('placement-next') ?? null)) next();
    };

    expose({ activeIndex, setActiveItem, prev, next, pause, play });

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
        'data-carousel-animating': isAnimating.value,
        'data-carousel-effect': props.effect,
      });

    return () => {
      const items = getItems();
      const showControls = items.length > 1;
      const rootStyle = {
        '--h-carousel-size-container-height': cssHeight.value,
        '--h-carousel-transition-duration': `${props.moveSpeed}ms`,
      } as CSSProperties;
      return (
        <section
          {...attrs}
          class={cls(
            classHelper.block,
            classHelper.m(props.direction),
            classHelper.m(props.effect),
            classHelper.m(`motion-${motion.value}`),
            classHelper.is('animating', isAnimating.value),
            classHelper.is('motion-ready', cardMotionReady.value),
            classHelper.m(`arrow-${props.arrow}`),
            classHelper.m(`indicators-${props.indicatorPosition}`),
            classHelper.m(`indicator-position-${resolvedIndicatorPosition.value}`),
            classHelper.m(`indicator-${props.indicatorType}`),
            attrs.class as string,
          )}
          style={[attrs.style as CSSProperties, rootStyle]}
          role="region"
          aria-roledescription={localized(carouselText.value, 'Carousel')}
          aria-label={props.ariaLabel ?? localized(carouselText.value, 'Carousel')}
          tabindex={0}
          onKeydown={onKeydown}
          onMouseenter={onMouseenter}
          onMouseleave={onMouseleave}
          onFocusin={onFocusin}
          onFocusout={onFocusout}
          onTouchstart={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchCancel}
        >
          {showControls && props.autoplay && (
            <HButton
              class={classHelper.e('autoplay')}
              icon={actionIsPaused.value ? IconPlay : IconPause}
              iconSize={14}
              size="small"
              aria-label={actionIsPaused.value ? playText.value : pauseText.value}
              onClick={toggle}
            />
          )}

          <div class={classHelper.e('viewport')} onClick={onViewportClick}>
            {items.map((item, index) => renderItem(item, index, items.length))}
          </div>

          {showControls && props.arrow !== 'never' && (
            <>
              <HButton
                class={cls(classHelper.e('arrow'), classHelper.em('arrow', 'previous'))}
                icon={slots.previous ? undefined : previousIcon.value}
                iconSize={14}
                size="small"
                disabled={atStart.value}
                aria-label={previousText.value}
                onClick={prev}
                v-slots={slots.previous ? { icon: slots.previous } : undefined}
              />
              <HButton
                class={cls(classHelper.e('arrow'), classHelper.em('arrow', 'next'))}
                icon={slots.next ? undefined : nextIcon.value}
                iconSize={14}
                size="small"
                disabled={atEnd.value}
                aria-label={nextText.value}
                onClick={next}
                v-slots={slots.next ? { icon: slots.next } : undefined}
              />
            </>
          )}

          {showControls && props.indicatorPosition !== 'none' && (
            <div
              class={classHelper.e('indicators')}
              role="group"
              aria-label={localized(carouselText.value, 'Carousel')}
              aria-orientation={
                ['left', 'right', 'outer-right'].includes(resolvedIndicatorPosition.value)
                  ? 'vertical'
                  : 'horizontal'
              }
            >
              {props.indicatorType === 'slider' && !slots.indicator ? (
                <div class={classHelper.e('indicator-slider')}>
                  <span class={classHelper.e('indicator-slider-track')} aria-hidden="true" />
                  <span
                    class={classHelper.e('indicator-slider-mark')}
                    style={
                      {
                        '--h-carousel-indicator-slider-offset': `${
                          (activeIndex.value * 100) / items.length
                        }%`,
                        '--h-carousel-indicator-slider-size': `${100 / items.length}%`,
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                  {items.map((item, index) => {
                    const active = activeIndex.value === index;
                    const label = item.props?.label;
                    return (
                      <span
                        key={item.key ?? index}
                        class={classHelper.e('indicator-slider-segment-trigger')}
                        style={
                          {
                            '--h-carousel-indicator-segment-offset': `${
                              (index * 100) / items.length
                            }%`,
                            '--h-carousel-indicator-segment-size': `${100 / items.length}%`,
                          } as CSSProperties
                        }
                        onMouseenter={() => {
                          if (props.trigger === 'hover') requestChange(index);
                        }}
                      >
                        <HButton
                          class={cls(
                            classHelper.e('indicator-slider-segment'),
                            classHelper.is('active', active),
                          )}
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
                          onClick={() => requestChange(index)}
                        />
                      </span>
                    );
                  })}
                </div>
              ) : (
                items.map((item, index) => {
                  const active = activeIndex.value === index;
                  const label = item.props?.label;
                  return (
                    <span
                      key={item.key ?? index}
                      class={classHelper.e('indicator-trigger')}
                      onMouseenter={() => {
                        if (props.trigger === 'hover') requestChange(index);
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
                        onClick={() => requestChange(index)}
                      >
                        {slots.indicator ? (
                          slots.indicator(index, active, label)
                        ) : (
                          <span class={classHelper.e('indicator-mark')} aria-hidden="true" />
                        )}
                      </HButton>
                    </span>
                  );
                })
              )}
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
