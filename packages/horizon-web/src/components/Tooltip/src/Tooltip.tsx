import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, HChildOnly, cls, useNamespace, useZIndex } from '@aurora/utils';
import { useClipboard, useMutationObserver, useResizeObserver } from '@vueuse/core';
import type { ComputedRef } from 'vue';
import {
  Teleport,
  cloneVNode,
  defineComponent,
  nextTick,
  onDeactivated,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue';
import HTransition from '~/components/Transition/src/Transition';
import { $message } from '~/methods';
import type { PopperInstance } from '~/utils/popper';
import { usePopper } from '~/utils/popper';
import useLocaleLang from '~/utils/useLocaleLang';
import useOverflow from '~/utils/useOverflow';
import useSize from '~/utils/useSize';
import type { TooltipEmits } from './composables/useEmits';
import { useTooltipEmits } from './composables/useEmits';
import type { TooltipExposes } from './composables/useExposes';
import { useTooltipExposes } from './composables/useExposes';
import { useTooltipProps } from './composables/useProps';
import type { TooltipSlots } from './composables/useSlots';
import { useTooltipSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Tooltip`,
  desc: 'Tooltip 是浮动标签，主要用于简要说明界面元素的功能。',
  components: { HChildOnly, HTransition },
  props: useTooltipProps,
  emits: useTooltipEmits,
  slots: useTooltipSlots,
  exposes: useTooltipExposes,
  setup(
    props,
    { emit, slots, expose }: HorizonWebSetupContext<TooltipEmits, TooltipSlots, TooltipExposes>,
  ) {
    let instance: PopperInstance | null = null;

    const classHelper = new ComponentClassBlock('tooltip');
    const tooltipRef = ref<HTMLElement | null>(null);
    const arrowRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    const tooltipVisible = ref(props.visible);
    const tooltipDisabled = ref(props.disabled);

    let isEnteredInTooltip = false;
    let mouseEnterTimer: ReturnType<typeof setTimeout> | null = null;
    let mouseLeaveTimer: ReturnType<typeof setTimeout> | null = null;
    const referenceRef = ref<any>(null);

    const sizeRef = useSize(toRef(props, 'size'), 'medium');

    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    watch(
      () => props.disabled,
      val => {
        tooltipDisabled.value = val;
      },
    );

    watch(
      () => props.visible,
      val => {
        if (props.trigger === 'manual') {
          tooltipVisible.value = val;

          if (val) {
            zIndex.value = zIndexHandler.next();
          }
        }
      },
    );

    watch(tooltipVisible, val => {
      if (val) {
        emit('show');
      } else {
        emit('hide');
      }
    });

    watch(sizeRef, () => instance?.update?.());

    function clearMouseEnterTimer() {
      if (mouseEnterTimer !== null) {
        clearTimeout(mouseEnterTimer);
        mouseEnterTimer = null;
      }
    }
    function clearMouseLeaveTimer() {
      if (mouseLeaveTimer !== null) {
        clearTimeout(mouseLeaveTimer);
        mouseLeaveTimer = null;
      }
    }

    function showTooltip() {
      if (tooltipDisabled.value) return;

      zIndex.value = props.zIndex ?? zIndexHandler.next();
      clearMouseEnterTimer();
      mouseEnterTimer = setTimeout(() => {
        tooltipVisible.value = true;
        instance?.update?.();
      }, props.showAfter);
    }

    function hideTooltip() {
      clearMouseEnterTimer();
      clearMouseLeaveTimer();
      mouseLeaveTimer = setTimeout(() => {
        tooltipVisible.value = false;
      }, props.hideAfter);
    }

    function useTooltipObserver(target: HTMLElement | null) {
      if (!target) {
        tooltipDisabled.value = true;
      } else {
        const isOverflow = useOverflow(target, props.referenceScale);

        if (!isOverflow && props.overflow) {
          tooltipDisabled.value = true;
        } else {
          tooltipDisabled.value = props.disabled;
        }
      }
    }

    const onMouseenter = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'hover') return;
      isEnteredInTooltip = false;
      useTooltipObserver(event.target as HTMLElement);
      showTooltip();
    };

    const onMouseleave = () => {
      if (tooltipDisabled.value || props.trigger !== 'hover' || isEnteredInTooltip) return;
      hideTooltip();
    };

    const onMousedown = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'focus') return;
      useTooltipObserver(event.target as HTMLElement);
      showTooltip();
    };

    const onMouseup = () => {
      if (tooltipDisabled.value || props.trigger !== 'focus') return;
      hideTooltip();
    };

    const onHandleClick = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'click') return;
      if (tooltipVisible.value) {
        hideTooltip();
      } else {
        useTooltipObserver(event.target as HTMLElement);
        showTooltip();
      }
    };

    const onHandleContextmenu = (event: MouseEvent) => {
      event.preventDefault();
      if (props.disabled || props.trigger !== 'contextmenu') return;
      if (tooltipVisible.value) {
        hideTooltip();
      } else {
        useTooltipObserver(event.target as HTMLElement);
        showTooltip();
      }
    };

    const index = Math.floor(Math.random() * 100);

    function onMouseEnterTooltip() {
      if (props.trigger === 'manual') return;
      if (!props.enterable) {
        hideTooltip();
      } else {
        isEnteredInTooltip = true;
        clearMouseLeaveTimer();
      }
    }

    function onMouseLeaveTooltip() {
      if (props.trigger === 'manual') return;

      if (isEnteredInTooltip) {
        hideTooltip();
        isEnteredInTooltip = false;
      }
    }

    function isElementNode() {
      return referenceRef.value && referenceRef.value.el && referenceRef.value.el.nodeType === 1;
    }

    const copySuccessText = (props.copySuccessText ??
      useLocaleLang('tooltip.copySuccess', 'Successful replication')) as ComputedRef<string>;

    const copyFailText = (props.copyFailText ??
      useLocaleLang('tooltip.copyFail', 'Replication failure')) as ComputedRef<string>;

    function onClickContent() {
      if (props.clickToCopy) {
        const { copy } = useClipboard();

        copy(
          (props.copyTarget === 'content' ? contentRef.value : referenceRef.value?.el)?.innerText,
        )
          .then(() => {
            copySuccessText.value && $message.success(copySuccessText.value);
          })
          .catch(() => {
            copyFailText.value && $message.error(copyFailText.value);
          });
      }
    }

    // 箭头位置锁定逻辑 暂时不启用
    const arrowLock = ref(false);
    // function onApplyArrowHide({ state }) {
    //   const { placement, modifiersData } = state;
    //   const { arrow, hide } = modifiersData;
    //   const [p0, p1] = placement.split('-');

    //   // tooltip隐藏不处理 定位居中不处理
    //   if (hide.hasPopperEscaped || !p1) return;

    //   if (p1 === 'start') {
    //     if (['left', 'right'].includes(p0)) {
    //       if (arrow.y > 9) return (arrowLock.value = true);
    //     }
    //   }

    //   arrowLock.value = false;
    // }

    watch(
      () => tooltipVisible.value,
      isVisible => {
        if (isVisible) {
          nextTick(() => {
            if (!instance && isElementNode()) {
              instance = usePopper(referenceRef.value.el, tooltipRef.value as HTMLElement, {
                placement: props.placement,
                skidding: props.skidding,
                distance: props.distance,
                arrow: props.arrow,
                flip: props.flip,
                fallbackPlacements: props.fallbackPlacements,
                referenceOverflowObserve: props.referenceHiddenObserve,
                referenceOverflowCallback: overflow => overflow && (tooltipVisible.value = false),
                arrowOption: { padding: 3 },
                preventOverflow: props.preventOverflow,
                strategy: props.strategy,
                // onApplyArrowHide,
              });
            } else {
              instance?.update?.();
            }
          });
        }
      },
      { immediate: true },
    );

    expose({
      updateTooltip() {
        instance?.update?.();
      },
      switchVisible: (visible: boolean) => {
        // 如果 要切换的状态 和 当前状态 相同，则不处理
        if (visible === tooltipVisible.value) return;

        tooltipVisible.value = visible;
      },
    });

    onDeactivated(() => {
      tooltipVisible.value = false;
    });

    let stopResizeObserver: (() => void) | undefined = undefined;
    watchEffect(() => {
      if (isElementNode() && props.visible && props.overflow) {
        const { stop } = useResizeObserver(referenceRef.value.el, entries => {
          const targetEl = entries[0].target;
          useTooltipObserver(targetEl as HTMLElement);
          tooltipVisible.value = !tooltipDisabled.value;
        });
        stopResizeObserver = stop;
      } else {
        stopResizeObserver?.();
        tooltipDisabled.value = props.disabled;
      }
    });

    const onAfterLeave = () => {
      instance?.destroy?.();
      instance = null;
    };

    const onTextMutation = () => {
      if (!instance) return;
      instance.update();
    };
    useMutationObserver(contentRef, onTextMutation, {
      characterData: true,
      subtree: true,
      childList: false,
      attributes: false,
    });

    return () => {
      const reference = slots?.default?.();
      return (
        <HChildOnly>
          <HChildOnly ref={referenceRef}>
            {reference &&
              cloneVNode(reference[0], {
                onMouseenter: (event: MouseEvent) => onMouseenter(event),
                onMouseleave: () => onMouseleave(),
                onMousedown: (event: MouseEvent) => onMousedown(event),
                onMouseup: () => onMouseup(),
                onClick: (event: MouseEvent) => onHandleClick(event),
                onContextmenu: (event: MouseEvent) => onHandleContextmenu(event),
              })}
          </HChildOnly>
          <Teleport to={props.teleportTo} disabled={!props.toBody}>
            <HTransition appear name="tooltip" onAfterLeave={onAfterLeave}>
              {tooltipVisible.value && !tooltipDisabled.value && (
                <div
                  ref={tooltipRef}
                    class={cls(
                      classHelper.block,
                      props.popperClass,
                      classHelper.m('hidden', !tooltipVisible.value),
                      classHelper.m('lock', arrowLock.value),
                      classHelper.m(sizeRef.value),
                      classHelper.m(props.theme),
                      classHelper.has(
                        'reference-hidden-observer',
                        props.referenceHiddenObserve,
                      ),
                      classHelper.is('popper-reference-hidden', props.popperReferenceHidden),
                    )}
                  style={{ zIndex: zIndex.value }}
                  onMouseenter={onMouseEnterTooltip}
                  onMouseleave={onMouseLeaveTooltip}
                  onClick={onClickContent}
                  data-index={index}
                >
                  <div
                    ref={contentRef}
                    class={cls(
                      classHelper.e('content'),
                      classHelper.is('clickable', props.clickToCopy),
                    )}
                  >
                    {slots.content?.() ?? props.content}
                  </div>
                  {props.arrow && (
                    <div ref={arrowRef} class={[classHelper.e('arrow')]} data-popper-arrow></div>
                  )}
                </div>
              )}
            </HTransition>
          </Teleport>
        </HChildOnly>
      );
    };
  },
});
