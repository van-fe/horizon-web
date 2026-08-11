import type { Ref } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CarouselProps } from './useProps';

interface UseCarouselAutoplayOptions {
  activeIndex: Readonly<Ref<number>>;
  atEnd: Readonly<Ref<boolean>>;
  itemCount: Ref<number>;
  props: CarouselProps;
  restart: () => void;
  rotate: () => void;
}

/**
 * 管理用户播放意图与悬停、焦点、页面可见性和减少动态效果等临时阻塞状态。
 * @en Separates user playback intent from hover, focus, visibility, and reduced-motion blockers.
 */
export function useCarouselAutoplay({
  activeIndex,
  atEnd,
  itemCount,
  props,
  restart,
  rotate,
}: UseCarouselAutoplayOptions) {
  const manuallyPaused = ref(false);
  const hoverPaused = ref(false);
  const focusPaused = ref(false);
  const pageHidden = ref(false);
  const prefersReducedMotion = ref(false);
  const reducedMotionOverride = ref(false);
  let mediaQuery: MediaQueryList | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const ended = computed(() => props.autoplay && !props.loop && atEnd.value);
  const actionIsPaused = computed(
    () =>
      manuallyPaused.value ||
      ended.value ||
      (prefersReducedMotion.value && !reducedMotionOverride.value),
  );
  const canAutoplay = computed(
    () =>
      props.autoplay &&
      itemCount.value > 1 &&
      !manuallyPaused.value &&
      !hoverPaused.value &&
      !focusPaused.value &&
      !pageHidden.value &&
      (!prefersReducedMotion.value || reducedMotionOverride.value) &&
      !ended.value,
  );

  const pause = () => {
    manuallyPaused.value = true;
  };

  const play = () => {
    manuallyPaused.value = false;
    focusPaused.value = false;
    reducedMotionOverride.value = true;
    if (ended.value) restart();
  };

  const toggle = () => {
    actionIsPaused.value ? play() : pause();
  };

  const clearTimer = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  const schedule = () => {
    clearTimer();
    if (!canAutoplay.value) return;
    timer = setTimeout(() => {
      timer = undefined;
      rotate();
      schedule();
    }, props.interval);
  };

  const onMouseenter = () => {
    if (props.pauseOnHover) hoverPaused.value = true;
  };

  const onMouseleave = () => {
    hoverPaused.value = false;
  };

  const onFocusin = (event: FocusEvent) => {
    const currentTarget = event.currentTarget;
    const previousTarget = event.relatedTarget;
    if (
      currentTarget instanceof HTMLElement &&
      previousTarget instanceof Node &&
      currentTarget.contains(previousTarget)
    )
      return;
    if (props.pauseOnFocus) focusPaused.value = true;
  };

  const onFocusout = (event: FocusEvent) => {
    const currentTarget = event.currentTarget;
    const nextTarget = event.relatedTarget;
    if (
      currentTarget instanceof HTMLElement &&
      nextTarget instanceof Node &&
      currentTarget.contains(nextTarget)
    )
      return;
    focusPaused.value = false;
  };

  const onVisibilityChange = () => {
    pageHidden.value = document.hidden;
  };

  const onReducedMotionChange = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches;
    reducedMotionOverride.value = false;
  };

  onMounted(() => {
    pageHidden.value = document.hidden;
    mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery?.matches ?? false;
    mediaQuery?.addEventListener?.('change', onReducedMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    schedule();
  });

  onBeforeUnmount(() => {
    clearTimer();
    mediaQuery?.removeEventListener?.('change', onReducedMotionChange);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  watch([activeIndex, canAutoplay, () => props.interval], schedule, { flush: 'post' });

  return {
    actionIsPaused,
    canAutoplay,
    onFocusin,
    onFocusout,
    onMouseenter,
    onMouseleave,
    pause,
    play,
    toggle,
  };
}
