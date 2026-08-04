import type { Ref } from 'vue';
import { computed, onBeforeUnmount, readonly, ref, watch } from 'vue';
import type { CarouselProps, HCarouselTarget } from './useProps';

export type CarouselMotionDirection = 'next' | 'previous';

type CarouselEmit = {
  (event: 'update:modelValue', index: number): void;
  (event: 'change', current: number, previous: number): void;
};

interface PendingRequest {
  direction: CarouselMotionDirection;
  target: number;
}

/**
 * 统一管理受控与非受控的轮播索引，并保证所有导航入口遵循同一提交规则。
 * @en Manages controlled and uncontrolled indices so every navigation path follows one commit rule.
 */
export function useCarouselNavigation(
  props: CarouselProps,
  itemCount: Ref<number>,
  itemNames: Ref<Array<string | number | undefined>>,
  emit: CarouselEmit,
) {
  const isValidIndex = (value: number) => Number.isInteger(value) && Number.isFinite(value);
  const initialIndex = props.modelValue ?? props.initialIndex;
  const activeIndex = ref(isValidIndex(initialIndex) ? initialIndex : 0);
  const previousIndex = ref(activeIndex.value);
  const motion = ref<CarouselMotionDirection>('next');
  const isAnimating = ref(false);
  const cardMotionReady = ref(false);
  let pendingRequest: PendingRequest | undefined;
  let animationTimer: ReturnType<typeof setTimeout> | undefined;

  const beginAnimation = () => {
    if (props.effect === 'card') cardMotionReady.value = true;
    isAnimating.value = true;
    if (animationTimer !== undefined) clearTimeout(animationTimer);
    const reducedMotion =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
    animationTimer = setTimeout(
      () => {
        isAnimating.value = false;
        animationTimer = undefined;
      },
      reducedMotion ? 1 : props.moveSpeed,
    );
  };

  const normalizeIndex = (index: number) => {
    if (!isValidIndex(index)) return 0;
    if (!itemCount.value) return 0;
    if (!props.loop) return Math.min(Math.max(index, 0), itemCount.value - 1);
    return ((index % itemCount.value) + itemCount.value) % itemCount.value;
  };

  const inferDirection = (current: number, next: number): CarouselMotionDirection => {
    if (!props.loop) return next > current ? 'next' : 'previous';
    return Math.abs(next - current) > itemCount.value / 2
      ? next < current
        ? 'next'
        : 'previous'
      : next > current
        ? 'next'
        : 'previous';
  };

  const commitIndex = (
    target: number,
    direction?: CarouselMotionDirection,
    shouldEmitChange = true,
  ) => {
    const nextIndex = normalizeIndex(target);
    const oldIndex = activeIndex.value;
    if (nextIndex === oldIndex) return false;

    previousIndex.value = oldIndex;
    motion.value = direction ?? inferDirection(oldIndex, nextIndex);
    activeIndex.value = nextIndex;
    beginAnimation();
    if (shouldEmitChange) emit('change', nextIndex, oldIndex);
    return true;
  };

  const requestChange = (target: number, direction?: CarouselMotionDirection) => {
    if (isAnimating.value) return false;
    if (!isValidIndex(target)) return false;
    const nextIndex = normalizeIndex(target);
    const oldIndex = activeIndex.value;
    if (nextIndex === oldIndex) return false;

    const nextDirection = direction ?? inferDirection(oldIndex, nextIndex);
    if (props.modelValue !== undefined) {
      pendingRequest = { direction: nextDirection, target: nextIndex };
      emit('update:modelValue', nextIndex);
      return true;
    }

    emit('update:modelValue', nextIndex);
    return commitIndex(nextIndex, nextDirection);
  };

  const next = () => requestChange(activeIndex.value + 1, 'next');
  const prev = () => requestChange(activeIndex.value - 1, 'previous');

  const resolveTarget = (target: HCarouselTarget) => {
    if (typeof target === 'number') return isValidIndex(target) ? target : -1;
    if (typeof target === 'string')
      return itemNames.value.findIndex(name => Object.is(name, target));
    if ('index' in target) return isValidIndex(target.index) ? target.index : -1;
    return itemNames.value.findIndex(name => Object.is(name, target.name));
  };

  const setActiveItem = (target: HCarouselTarget) => {
    const index = resolveTarget(target);
    if (index >= 0) requestChange(index);
  };

  watch(
    () => props.modelValue,
    value => {
      if (value === undefined) return;
      const nextIndex = normalizeIndex(value);
      const direction = pendingRequest?.target === nextIndex ? pendingRequest.direction : undefined;
      pendingRequest = undefined;
      commitIndex(nextIndex, direction);
    },
  );

  watch(
    () => props.effect,
    () => {
      cardMotionReady.value = false;
      isAnimating.value = false;
      if (animationTimer !== undefined) clearTimeout(animationTimer);
      animationTimer = undefined;
    },
  );

  onBeforeUnmount(() => {
    if (animationTimer !== undefined) clearTimeout(animationTimer);
  });

  watch(
    itemCount,
    count => {
      if (!count) {
        commitIndex(0, undefined, false);
        return;
      }

      const sourceIndex = props.modelValue ?? activeIndex.value;
      const nextIndex = normalizeIndex(sourceIndex);
      if (nextIndex === activeIndex.value) return;

      emit('update:modelValue', nextIndex);
      commitIndex(nextIndex);
    },
    { flush: 'sync' },
  );

  const atStart = computed(() => !props.loop && activeIndex.value <= 0);
  const atEnd = computed(
    () => !props.loop && activeIndex.value >= Math.max(0, itemCount.value - 1),
  );

  return {
    activeIndex: readonly(activeIndex),
    atEnd,
    atStart,
    cardMotionReady: readonly(cardMotionReady),
    isAnimating: readonly(isAnimating),
    motion: readonly(motion),
    next,
    normalizeIndex,
    prev,
    previousIndex: readonly(previousIndex),
    requestChange,
    setActiveItem,
  };
}
