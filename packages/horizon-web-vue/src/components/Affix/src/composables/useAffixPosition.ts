import type { CSSProperties, Ref } from 'vue';
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';

export type AffixPosition = 'top' | 'bottom';
export type AffixTarget = string | HTMLElement | undefined;

export interface UseAffixPositionOptions {
  target: Ref<AffixTarget>;
  position: Ref<AffixPosition>;
  offset: Ref<number>;
  zIndex: Ref<number | undefined>;
}

export interface UseAffixPositionReturn {
  contentRef: Ref<HTMLElement | null>;
  contentStyle: Ref<CSSProperties>;
  isAffixed: Ref<boolean>;
  placeholderRef: Ref<HTMLElement | null>;
  placeholderStyle: Ref<CSSProperties>;
  updatePosition: () => void;
}

interface AffixBoundary {
  top: number;
  bottom: number;
}

interface AffixLayout {
  display: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  verticalAlign: string;
}

const EMPTY_LAYOUT: AffixLayout = {
  display: 'block',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  verticalAlign: 'baseline',
};

/**
 * 管理 Affix 的目标解析、滚动监听、占位尺寸与固定定位。
 * @en Manages Affix target resolution, scroll listeners, placeholder sizing, and fixed positioning.
 */
export function useAffixPosition(options: UseAffixPositionOptions): UseAffixPositionReturn {
  const {
    target: targetRef,
    position: positionRef,
    offset: offsetRef,
    zIndex: zIndexRef,
  } = options;

  const contentRef = ref<HTMLElement | null>(null);
  const placeholderRef = ref<HTMLElement | null>(null);
  const parentElementRef = shallowRef<HTMLElement | null>(null);
  const targetElementRef = shallowRef<HTMLElement | null>(null);
  const isAffixed = ref(false);
  const contentStyle = ref<CSSProperties>({});
  const placeholderStyle = ref<CSSProperties>({});

  let currentTarget: HTMLElement | Window | undefined;
  let animationFrame: number | undefined;
  let shouldMeasureNaturalBox = false;
  let mounted = false;
  let unresolvedSelector: string | undefined;
  let placeholderLayout = EMPTY_LAYOUT;

  function isWindow(target: HTMLElement | Window): target is Window {
    return target === window;
  }

  function warnUnresolvedTarget(selector: string) {
    if (unresolvedSelector === selector) return;
    unresolvedSelector = selector;
    console.warn(`[Horizon Web] Affix target "${selector}" was not found; using window instead.`);
  }

  function resolveTarget(): HTMLElement | Window {
    const target = targetRef.value;
    if (!target) {
      unresolvedSelector = undefined;
      return window;
    }
    if (typeof target !== 'string') {
      unresolvedSelector = undefined;
      return target;
    }

    try {
      const element = document.querySelector<HTMLElement>(target);
      if (element) {
        unresolvedSelector = undefined;
        return element;
      }
    } catch {
      // Invalid selectors use the same safe fallback as selectors that do not match an element.
    }

    warnUnresolvedTarget(target);
    return window;
  }

  function setTarget(nextTarget: HTMLElement | Window) {
    if (currentTarget === nextTarget) return;
    if (currentTarget && !isWindow(currentTarget)) {
      currentTarget.removeEventListener('scroll', scheduleUpdate);
    }

    currentTarget = nextTarget;
    targetElementRef.value = isWindow(nextTarget) ? null : nextTarget;

    if (mounted && !isWindow(nextTarget)) {
      nextTarget.addEventListener('scroll', scheduleUpdate, { passive: true });
    }
  }

  function getBoundary(target: HTMLElement | Window): AffixBoundary {
    if (isWindow(target)) {
      return {
        top: 0,
        bottom: window.innerHeight,
      };
    }

    const rect = target.getBoundingClientRect();
    return {
      top: rect.top + target.clientTop,
      bottom: rect.top + target.clientTop + target.clientHeight,
    };
  }

  function readLayout(element: HTMLElement): AffixLayout {
    const style = window.getComputedStyle(element);
    return {
      display: style.display === 'inline' ? 'inline-block' : style.display || 'block',
      marginBottom: style.marginBottom,
      marginLeft: style.marginLeft,
      marginRight: style.marginRight,
      marginTop: style.marginTop,
      verticalAlign: style.verticalAlign,
    };
  }

  function readMargin(element: HTMLElement, side: 'left' | 'top') {
    const style = window.getComputedStyle(element);
    const value = side === 'left' ? style.marginLeft : style.marginTop;
    return Number.parseFloat(value) || 0;
  }

  function setPlaceholderBox(rect: DOMRect) {
    placeholderStyle.value = {
      boxSizing: 'border-box',
      display: placeholderLayout.display,
      height: `${rect.height}px`,
      marginBottom: placeholderLayout.marginBottom,
      marginLeft: placeholderLayout.marginLeft,
      marginRight: placeholderLayout.marginRight,
      marginTop: placeholderLayout.marginTop,
      pointerEvents: 'none',
      verticalAlign: placeholderLayout.verticalAlign,
      width: `${rect.width}px`,
    };
  }

  function clearPosition() {
    isAffixed.value = false;
    contentStyle.value = {};
  }

  function updatePosition() {
    const content = contentRef.value;
    if (!content) return;

    const nextTarget = resolveTarget();
    setTarget(nextTarget);

    const anchor = isAffixed.value ? placeholderRef.value : content;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const boundary = getBoundary(nextTarget);
    const offset = offsetRef.value;
    const shouldAffix =
      positionRef.value === 'top'
        ? rect.top < boundary.top + offset
        : rect.bottom > boundary.bottom - offset;

    if (!shouldAffix) {
      clearPosition();
      return;
    }

    if (!isAffixed.value) {
      placeholderLayout = readLayout(content);
      setPlaceholderBox(rect);
      isAffixed.value = true;
    }

    const marginLeft = readMargin(content, 'left');
    const marginTop = readMargin(content, 'top');
    const top =
      positionRef.value === 'top' ? boundary.top + offset : boundary.bottom - offset - rect.height;

    contentStyle.value = {
      boxSizing: 'border-box',
      left: `${rect.left - marginLeft}px`,
      position: 'fixed',
      top: `${top - marginTop}px`,
      width: `${rect.width}px`,
      ...(zIndexRef.value === undefined ? {} : { zIndex: zIndexRef.value }),
    };
  }

  function scheduleUpdate() {
    if (!mounted || animationFrame !== undefined) return;
    animationFrame = window.requestAnimationFrame(() => {
      animationFrame = undefined;
      if (shouldMeasureNaturalBox && isAffixed.value) {
        shouldMeasureNaturalBox = false;
        clearPosition();
        nextTick(updatePosition);
        return;
      }
      shouldMeasureNaturalBox = false;
      updatePosition();
    });
  }

  function scheduleLayoutUpdate() {
    shouldMeasureNaturalBox = true;
    scheduleUpdate();
  }

  useResizeObserver(contentRef, () => {
    const content = contentRef.value;
    if (isAffixed.value && content) {
      const rect = content.getBoundingClientRect();
      setPlaceholderBox(rect);
    }
    scheduleUpdate();
  });
  useResizeObserver(parentElementRef, scheduleLayoutUpdate);
  useResizeObserver(targetElementRef, scheduleLayoutUpdate);

  watch(
    [targetRef, positionRef, offsetRef, zIndexRef],
    () => {
      if (!mounted) return;
      updatePosition();
    },
    { flush: 'post' },
  );

  onMounted(() => {
    mounted = true;
    parentElementRef.value = contentRef.value?.parentElement ?? null;
    window.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });
    window.addEventListener('resize', scheduleLayoutUpdate, { passive: true });
    updatePosition();
  });

  onBeforeUnmount(() => {
    mounted = false;
    window.removeEventListener('scroll', scheduleUpdate, true);
    window.removeEventListener('resize', scheduleLayoutUpdate);
    if (currentTarget && !isWindow(currentTarget)) {
      currentTarget.removeEventListener('scroll', scheduleUpdate);
    }
    if (animationFrame !== undefined) {
      window.cancelAnimationFrame(animationFrame);
    }
  });

  return {
    contentRef,
    contentStyle,
    isAffixed,
    placeholderRef,
    placeholderStyle,
    updatePosition,
  };
}
