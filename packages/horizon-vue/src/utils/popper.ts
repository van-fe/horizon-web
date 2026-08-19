import type {
  Modifier,
  ModifierArguments,
  Placement,
  Rect,
  State,
  Options,
  arrow,
  OptionsGeneric,
} from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import { tryOnScopeDispose } from './tryOnScopeDispose';
import { useResizeObserver } from '@vueuse/core';

export type PopperPlacement = Placement;

export type PopperOptions = {
  placement?: PopperPlacement;
  // skidding：popper 在辅助方向上的的偏移，正值表示 popper 向 end 方向偏移 ，负值表示 popper 向 start 方向偏移
  skidding?: number;
  // distance：popper 在主方向上的偏移，正值表示 popper 远离 reference，负值表示 popper 靠近 reference
  distance?: number;
  // 小三角
  arrow?: boolean;
  arrowOption?: (typeof arrow)['options'];
  // 翻转
  flip?: boolean;
  // 监听reference和popper的大小变更
  resizeObserve?: boolean;
  // 监听reference是否不在设置的元素内
  referenceOverflowObserve?: boolean;
  // 监听reference是否不在设置的元素内的回调
  referenceOverflowCallback?: (overflow: boolean) => void;
  // 监听reference是否不在设置的元素内的root
  referenceOverflowRoot?: HTMLElement;
  // popper是否和reference保持等宽
  sameWidth?: boolean;
  sameHeight?: boolean;
  setMinWidth?: boolean;
  // 是否需要寻找子节点，HPopover组件对reference和popper进行了包裹
  findChild?: boolean;
  fallbackPlacements?: Placement[];
  onApplyArrowHide?: (arg0: ModifierArguments<Options>) => any; // 箭头变更
  /**
   * 检查主轴遮挡
   * 对于 top/bottom，检查 x轴是否有遮挡
   * 对于 left/right，检查 y轴是否有遮挡
   */
  mainAxisCheck?: boolean;
  /**
   * 检查副轴遮挡
   * 通常情况下，不会检查副轴的遮挡
   * 但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪
   */
  preventOverflow?: boolean;
  /**
   * 定位方式
   * @default 'fixed'
   */
  strategy?: 'absolute' | 'fixed';
};

export type PopperInstance = {
  state: State;
  destroy: () => void;
  forceUpdate: () => void;
  update: () => Promise<Partial<State>>;
  setOptions: (options: PopperOptions) => void;
};

export { createPopper, Rect };

export function usePopper(
  reference: HTMLElement | null,
  popper: HTMLElement | null,
  options: PopperOptions = {
    placement: 'top',
    flip: true,
    resizeObserve: false,
    referenceOverflowObserve: false,
    referenceOverflowRoot: document.body,
    sameWidth: false,
    sameHeight: false,
    setMinWidth: false,
    findChild: false,
    mainAxisCheck: true,
    preventOverflow: false,
    strategy: 'fixed',
  },
): PopperInstance | null {
  let referenceDom = reference;
  let popperDom = popper;

  if (options.findChild) {
    referenceDom = findFirstValidChild(reference);
    popperDom = findFirstValidChild(popper);
  }

  if (referenceDom && popper) {
    function genPopperJsOptions(
      options: PopperOptions,
    ): OptionsGeneric<Partial<Modifier<string, any>>> {
      if (typeof options.flip === 'undefined') {
        options.flip = true;
      }

      const modifiers: Partial<Modifier<string, any>>[] = [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [options.skidding || 0, options.distance || 0],
          },
        },
        {
          name: 'flip',
          enabled: options.flip,
          options:
            options.fallbackPlacements && options.fallbackPlacements.length
              ? {
                  fallbackPlacements: options.fallbackPlacements,
                }
              : {},
        },
        {
          name: 'arrow',
          enabled: Boolean(options.arrow),
          options: {
            ...options.arrowOption,
            padding: 10,
          },
        },
        {
          name: 'applyArrowHide',
          enabled: Boolean(options.arrow) && !!options.onApplyArrowHide,
          phase: 'write',
          fn: (...arg) => {
            options.onApplyArrowHide?.(...arg);
          },
        },
        {
          name: 'referenceOverflowObserve',
          enabled: Boolean(options.referenceOverflowObserve),
          phase: 'main',
          fn: () => {},
          effect: ({ state }) => {
            const observerKey = Symbol('referenceOverflowObserve');
            const { reference, popper }: { reference: any; popper: HTMLElement } = state.elements;

            reference[observerKey] = new IntersectionObserver(
              function (entries) {
                if (entries[0].intersectionRatio <= 0) {
                  popper.dataset.referenceOverflowObserved = 'true';
                  options.referenceOverflowCallback?.(true);
                } else {
                  delete popper.dataset.referenceOverflowObserved;
                  options.referenceOverflowCallback?.(false);
                }
              },
              {
                root: options.referenceOverflowRoot,
              },
            );

            reference[observerKey].observe(reference);

            return () => {
              reference[observerKey].disconnect();
              delete reference[observerKey];
            };
          },
        },
        {
          name: 'resizeObserve',
          enabled: Boolean(options.resizeObserve),
          phase: 'main',
          fn: () => {},
          effect: ({ state, instance }) => {
            const observerKey = Symbol('resizeObserver');
            const {
              reference,
              popper,
            }: {
              reference: any & { [observerKey]: ReturnType<typeof useResizeObserver>[] };
              popper: HTMLElement;
            } = state.elements;

            reference[observerKey] = [
              useResizeObserver(reference, () => {
                void instance.update();
              }),
              useResizeObserver(popper, () => {
                void instance.update();
              }),
            ];

            return () => {
              reference[observerKey].forEach((observer: ReturnType<typeof useResizeObserver>) =>
                observer.stop(),
              );
              delete reference[observerKey];
            };
          },
        },
        {
          name: 'sameWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            const attr = options.setMinWidth ? 'minWidth' : 'width';

            if (options.sameWidth) {
              popperDom && (popperDom.style[attr] = `${state.rects.reference.width}px`);
            } else {
              popperDom && (popperDom.style[attr] = '');
            }
          },
        },
        {
          name: 'sameHeight',
          enabled: Boolean(options.sameHeight),
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            popperDom && (popperDom.style.height = `${state.rects.reference.height}px`);
          },
        },
        {
          name: 'preventOverflow',
          phase: 'main',
          options: {
            altAxis: !!options.preventOverflow,
            mainAxis: options.mainAxisCheck,
          },
        },
        {
          name: 'remove-transform',
          phase: 'beforeWrite',
          enabled: true,
          fn({ state }) {
            if (state.styles) {
              delete state.styles.popper.transform;
            }
          },
        },
        {
          name: 'computeStyles',
          phase: 'beforeWrite',
          options: {
            gpuAcceleration: false,
          },
        },
      ];

      return {
        placement: options.placement || 'top',
        strategy: options.strategy || 'fixed',
        modifiers,
      };
    }

    const popperIns = createPopper(referenceDom, popper, genPopperJsOptions(options));

    tryOnScopeDispose(() => {
      popperIns.destroy();
    });

    const { update, state, forceUpdate, destroy, setOptions: setPopperJsOptions } = popperIns;

    const setOptions = (options: PopperOptions) => {
      void setPopperJsOptions(genPopperJsOptions(options));
    };

    return {
      update,
      state,
      setOptions,
      forceUpdate,
      destroy,
    };
  }

  return null;
}

// function isHtmlElem(node: any) {
//   return node && node.nodeType === Node.ELEMENT_NODE;
// }

function findFirstValidChild(node: HTMLElement | null): HTMLElement | null {
  if (!node) return null;
  for (const child of node.childNodes) {
    if (child) {
      switch (child.nodeType) {
        case Node.ELEMENT_NODE:
          return child as HTMLElement;
        default:
      }
    }
  }
  return null;
}
