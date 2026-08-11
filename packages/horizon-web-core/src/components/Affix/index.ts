import type { AffixPosition } from '@aurora/core';
import { resolveAffixGeometry } from '@aurora/core';

export type AffixTarget = string | HTMLElement | Window | null | undefined;

export interface AffixContentStyle {
  boxSizing?: 'border-box';
  left?: string;
  position?: 'fixed';
  top?: string;
  width?: string;
  zIndex?: number;
}

export interface AffixPlaceholderStyle {
  boxSizing: 'border-box';
  display: string;
  height: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  pointerEvents: 'none';
  verticalAlign: string;
  width: string;
}

export interface AffixRenderState {
  affixed: boolean;
  contentStyle: AffixContentStyle;
  placeholderStyle?: AffixPlaceholderStyle;
}

export interface AffixControllerOptions {
  getContent: () => HTMLElement | null;
  getPlaceholder: () => HTMLElement | null;
  getTarget: () => AffixTarget;
  getPosition: () => AffixPosition;
  getOffset: () => number;
  getZIndex: () => number | undefined;
  onStateChange: (state: AffixRenderState) => void;
  onTargetWarning?: (target: string) => void;
}

export interface AffixController {
  readonly state: AffixRenderState;
  updatePosition(): void;
  scheduleLayoutUpdate(): void;
  destroy(): void;
}

function isWindow(target: HTMLElement | Window): target is Window {
  return 'window' in target && target.window === target;
}

/** 解析 Affix 目标，选择器无效或未匹配时回退到窗口。 @en Resolves an Affix target and falls back to the window for invalid or unmatched selectors. */
export function resolveAffixTarget(
  target: AffixTarget,
  document: Document,
  onWarning?: (selector: string) => void,
): HTMLElement | Window {
  if (!target) return document.defaultView ?? window;
  if (typeof target !== 'string') return target;
  try {
    const element = document.querySelector<HTMLElement>(target);
    if (element) return element;
  } catch {
    // Invalid selectors share the safe fallback.
  }
  onWarning?.(target);
  return document.defaultView ?? window;
}

function readNumber(value: string): number {
  return Number.parseFloat(value) || 0;
}

/** 创建 Affix 的测量、滚动监听和响应式重排控制器。 @en Creates Affix measurement, scroll-listener, and responsive-layout control. */
export function createAffixController(options: AffixControllerOptions): AffixController {
  const content = options.getContent();
  const document = content?.ownerDocument ?? window.document;
  const win = document.defaultView ?? window;
  let state: AffixRenderState = { affixed: false, contentStyle: {} };
  let currentTarget: HTMLElement | Window | undefined;
  let animationFrame: number | undefined;
  let destroyed = false;
  let measureNatural = false;
  let warnedSelector: string | undefined;
  let contentObserver: ResizeObserver | undefined;
  let parentObserver: ResizeObserver | undefined;
  let targetObserver: ResizeObserver | undefined;

  const emitState = (next: AffixRenderState) => {
    if (JSON.stringify(next) === JSON.stringify(state)) return;
    state = next;
    options.onStateChange(next);
  };
  const warn = (selector: string) => {
    if (warnedSelector === selector) return;
    warnedSelector = selector;
    options.onTargetWarning?.(selector);
  };
  const scheduleUpdate = () => {
    if (destroyed || animationFrame !== undefined) return;
    animationFrame = win.requestAnimationFrame(() => {
      animationFrame = undefined;
      if (measureNatural && state.affixed) {
        measureNatural = false;
        emitState({ affixed: false, contentStyle: {} });
        animationFrame = win.requestAnimationFrame(() => {
          animationFrame = undefined;
          updatePosition();
        });
        return;
      }
      measureNatural = false;
      updatePosition();
    });
  };
  const bindTarget = (target: HTMLElement | Window) => {
    if (currentTarget === target) return;
    if (currentTarget && !isWindow(currentTarget)) {
      currentTarget.removeEventListener('scroll', scheduleUpdate);
    }
    targetObserver?.disconnect();
    targetObserver = undefined;
    currentTarget = target;
    if (!isWindow(target)) {
      target.addEventListener('scroll', scheduleUpdate, { passive: true });
      if (typeof ResizeObserver !== 'undefined') {
        targetObserver = new ResizeObserver(() => {
          measureNatural = true;
          scheduleUpdate();
        });
        targetObserver.observe(target);
      }
    }
  };
  const updatePosition = () => {
    if (destroyed) return;
    const element = options.getContent();
    if (!element) return;
    const target = resolveAffixTarget(options.getTarget(), document, warn);
    if (typeof options.getTarget() !== 'string') warnedSelector = undefined;
    bindTarget(target);
    const anchor = state.affixed ? (options.getPlaceholder() ?? element) : element;
    const rect = anchor.getBoundingClientRect();
    const boundary = isWindow(target)
      ? { top: 0, bottom: win.innerHeight }
      : (() => {
          const targetRect = target.getBoundingClientRect();
          return {
            top: targetRect.top + target.clientTop,
            bottom: targetRect.top + target.clientTop + target.clientHeight,
          };
        })();
    const computed = win.getComputedStyle(element);
    const geometry = resolveAffixGeometry({
      rect,
      boundary,
      position: options.getPosition(),
      offset: options.getOffset(),
      marginLeft: readNumber(computed.marginLeft),
      marginTop: readNumber(computed.marginTop),
    });
    if (!geometry.affixed) {
      emitState({ affixed: false, contentStyle: {} });
      return;
    }
    const placeholderStyle: AffixPlaceholderStyle = {
      boxSizing: 'border-box',
      display: computed.display === 'inline' ? 'inline-block' : computed.display || 'block',
      height: `${rect.height}px`,
      marginBottom: computed.marginBottom,
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight,
      marginTop: computed.marginTop,
      pointerEvents: 'none',
      verticalAlign: computed.verticalAlign,
      width: `${rect.width}px`,
    };
    emitState({
      affixed: true,
      placeholderStyle,
      contentStyle: {
        boxSizing: 'border-box',
        left: `${geometry.left}px`,
        position: 'fixed',
        top: `${geometry.top}px`,
        width: `${geometry.width}px`,
        ...(options.getZIndex() === undefined ? {} : { zIndex: options.getZIndex() }),
      },
    });
  };
  const scheduleLayoutUpdate = () => {
    measureNatural = true;
    scheduleUpdate();
  };

  win.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });
  win.addEventListener('resize', scheduleLayoutUpdate, { passive: true });
  if (typeof ResizeObserver !== 'undefined' && content) {
    contentObserver = new ResizeObserver(scheduleUpdate);
    contentObserver.observe(content);
    if (content.parentElement) {
      parentObserver = new ResizeObserver(scheduleLayoutUpdate);
      parentObserver.observe(content.parentElement);
    }
  }
  updatePosition();

  return {
    get state() {
      return state;
    },
    updatePosition,
    scheduleLayoutUpdate,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      win.removeEventListener('scroll', scheduleUpdate, true);
      win.removeEventListener('resize', scheduleLayoutUpdate);
      if (currentTarget && !isWindow(currentTarget)) {
        currentTarget.removeEventListener('scroll', scheduleUpdate);
      }
      contentObserver?.disconnect();
      parentObserver?.disconnect();
      targetObserver?.disconnect();
      if (animationFrame !== undefined) win.cancelAnimationFrame(animationFrame);
    },
  };
}
