import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, HChildOnly, cls, useNamespace, useZIndex } from '@aurora/utils';
import { TooltipOpenController } from '@aurora/core';
import type { TooltipOpenReason } from '@aurora/core';
import { createPositioner } from '@aurora/horizon-core';
import type { PositionerInstance, WebPlacement } from '@aurora/horizon-core';
import { useClipboard, useMutationObserver, useResizeObserver } from '@vueuse/core';
import {
  Teleport,
  cloneVNode,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue';
import HTransition from '~/components/Transition/src/Transition';
import { $message } from '~/methods';
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
  descLocales: { en: "`placement` supports 12 positions around the trigger. The example also controls size, theme, and delay while reporting the most recently opened position." },
  components: { HChildOnly, HTransition },
  props: useTooltipProps,
  emits: useTooltipEmits,
  slots: useTooltipSlots,
  exposes: useTooltipExposes,
  setup(
    props,
    { emit, slots, expose }: HorizonWebSetupContext<TooltipEmits, TooltipSlots, TooltipExposes>,
  ) {
    let instance: PositionerInstance | null = null;

    const classHelper = new ComponentClassBlock('tooltip');
    const tooltipRef = ref<HTMLElement | null>(null);
    const arrowRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    const tooltipVisible = ref(props.visible);
    const tooltipDisabled = ref(props.disabled);

    let isEnteredInTooltip = false;
    const referenceRef = ref<any>(null);

    const tooltipController = new TooltipOpenController({
      open: props.visible,
      disabled: props.disabled,
      showDelay: props.showAfter,
      hideDelay: props.hideAfter,
      onOpenChange: open => {
        tooltipVisible.value = open;
      },
    });

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
          tooltipController.syncOpen(val);
          tooltipVisible.value = val;

          if (val) {
            zIndex.value = zIndexHandler.next();
          }
        }
      },
    );

    watch(
      [() => props.showAfter, () => props.hideAfter],
      ([showDelay, hideDelay]) => {
        tooltipController.setOptions({ showDelay, hideDelay });
      },
    );

    watch(tooltipDisabled, disabled => tooltipController.setDisabled(disabled));

    watch(tooltipVisible, val => {
      if (val) {
        emit('show');
      } else {
        emit('hide');
      }
    });

    watch(sizeRef, () => instance?.update?.());

    function showTooltip(reason: TooltipOpenReason = props.trigger) {
      if (tooltipDisabled.value) return;

      zIndex.value = props.zIndex ?? zIndexHandler.next();
      tooltipController.requestOpen(reason);
      void instance?.update();
    }

    function hideTooltip(reason: TooltipOpenReason = props.trigger) {
      tooltipController.requestClose(reason);
    }

    function useTooltipObserver(target: HTMLElement) {
      const isOverflow = useOverflow(target, props.referenceScale);

      if (!isOverflow && props.overflow) {
        tooltipDisabled.value = true;
      } else {
        tooltipDisabled.value = props.disabled;
      }
    }

    const onMouseenter = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'hover') return;
      isEnteredInTooltip = false;
      useTooltipObserver(event.target as HTMLElement);
      showTooltip('hover');
    };

    const onMouseleave = () => {
      if (tooltipDisabled.value || props.trigger !== 'hover' || isEnteredInTooltip) return;
      hideTooltip('hover');
    };

    const onMousedown = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'focus') return;
      useTooltipObserver(event.target as HTMLElement);
      showTooltip('focus');
    };

    const onMouseup = () => {
      if (tooltipDisabled.value || props.trigger !== 'focus') return;
      hideTooltip('focus');
    };

    const onHandleClick = (event: MouseEvent) => {
      if (props.disabled || props.trigger !== 'click') return;
      if (tooltipVisible.value) {
        hideTooltip('click');
      } else {
        useTooltipObserver(event.target as HTMLElement);
        showTooltip('click');
      }
    };

    const onHandleContextmenu = (event: MouseEvent) => {
      event.preventDefault();
      if (props.disabled || props.trigger !== 'contextmenu') return;
      if (tooltipVisible.value) {
        hideTooltip('contextmenu');
      } else {
        useTooltipObserver(event.target as HTMLElement);
        showTooltip('contextmenu');
      }
    };

    const index = Math.floor(Math.random() * 100);

    function onMouseEnterTooltip() {
      if (props.trigger === 'manual') return;
      if (!props.enterable) {
        hideTooltip(props.trigger);
      } else {
        isEnteredInTooltip = true;
        tooltipController.cancelClose();
      }
    }

    function onMouseLeaveTooltip() {
      if (props.trigger === 'manual') return;

      if (isEnteredInTooltip) {
        hideTooltip(props.trigger);
        isEnteredInTooltip = false;
      }
    }

    function isElementNode() {
      return referenceRef.value && referenceRef.value.el && referenceRef.value.el.nodeType === 1;
    }

    const localeCopySuccessText = useLocaleLang(
      'tooltip.copySuccess',
      'Successful replication',
    );
    const localeCopyFailText = useLocaleLang('tooltip.copyFail', 'Replication failure');
    const copySuccessText = computed<string>(
      () => props.copySuccessText ?? String(localeCopySuccessText.value),
    );
    const copyFailText = computed<string>(
      () => props.copyFailText ?? String(localeCopyFailText.value),
    );

    const { copy: legacyCopyText } = useClipboard({ legacy: true });

    function copyText(value: string) {
      // Prefer the native API whenever it exists. `useClipboard` waits for an
      // asynchronous permission query and can otherwise route the first click to
      // its legacy fallback, hiding a real Clipboard API rejection from consumers.
      return navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(value)
        : legacyCopyText(value);
    }

    function onClickContent() {
      if (props.clickToCopy) {
        copyText(
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
      [tooltipVisible, tooltipRef],
      ([isVisible, floating]) => {
        if (isVisible && floating) {
          nextTick(() => {
            if (!instance && isElementNode()) {
              instance = createPositioner(referenceRef.value.el, floating, {
                placement: props.placement as WebPlacement,
                skidding: props.skidding,
                distance: props.distance,
                arrowElement: props.arrow ? arrowRef.value : null,
                flip: props.flip,
                fallbackPlacements: props.fallbackPlacements?.filter(
                  placement => placement !== 'auto',
                ) as WebPlacement[] | undefined,
                hideWhenReferenceHidden: props.popperReferenceHidden,
                shift: props.preventOverflow,
                strategy: props.strategy,
                onPosition: snapshot => {
                  if (props.referenceHiddenObserve && snapshot.referenceHidden) {
                    tooltipController.closeImmediately('reference-hidden');
                  }
                },
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
        void instance?.update();
      },
      switchVisible: (visible: boolean) => {
        // 如果 要切换的状态 和 当前状态 相同，则不处理
        if (visible === tooltipVisible.value) return;

        if (visible) tooltipController.openImmediately();
        else tooltipController.closeImmediately();
      },
    });

    onDeactivated(() => {
      tooltipController.closeImmediately();
    });

    onBeforeUnmount(() => {
      tooltipController.destroy();
      instance?.destroy();
      instance = null;
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
      instance?.destroy();
      instance = null;
    };

    const onTextMutation = () => {
      if (!instance) return;
      void instance.update();
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
