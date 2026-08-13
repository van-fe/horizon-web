import {
  defineComponent,
  ref,
  onBeforeUnmount,
  watch,
  computed,
  Teleport,
  toRefs,
  provide,
} from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { TooltipOpenController } from '@aurora/core';
import {
  cls,
  ComponentClassBlock,
  useNamespace,
  useZIndex,
  usePopupContainerGetter,
} from '@aurora/utils';
import type { PopperInstance } from '~/utils/popper';
import { usePopper } from '~/utils/popper';
import { usePopoverProps } from './composables/useProps';
import type { PopoverEmits } from './composables/useEmits';
import { usePopoverEmits } from './composables/useEmits';
import type { PopoverSlots } from './composables/useSlots';
import { usePopoverSlots } from './composables/useSlots';
import type { PopoverExposes } from './composables/useExposes';
import { usePopoverExposes } from './composables/useExposes';
import HTransition from '~/components/Transition/src/Transition';
import { HPickerPopoverPropsInjectKey } from './utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Popover`,
  desc: '点击目标元素，唤起白底气泡卡片浮层',
  descLocales: { en: 'Popover and pop-content components for contextual overlays.' },
  props: usePopoverProps,
  emits: usePopoverEmits,
  slots: usePopoverSlots,
  exposes: usePopoverExposes,
  setup(
    props,
    { slots, emit, expose }: HorizonWebSetupContext<PopoverEmits, PopoverSlots, PopoverExposes>,
  ) {
    const popupContainerGetter = usePopupContainerGetter();
    const classHelper = new ComponentClassBlock('popover');
    let popperIns: PopperInstance | null = null;
    //
    const reference = ref<HTMLElement | null>(null);
    const popper = ref<HTMLElement | null>(null);
    // 将popperVisible初始化为props.visible的值
    const popperVisible = ref<boolean>(props.visible);
    const popperAppear = ref(false);
    let popperCreateTimer: ReturnType<typeof setTimeout> | undefined;
    let popperAppearTimer: ReturnType<typeof setTimeout> | undefined;
    const visibilityController = new TooltipOpenController({
      open: props.visible,
      disabled: props.disabled,
      showDelay: props.hoverShowDelay,
      hideDelay: props.hoverHideDelay,
      deferZeroDelay: true,
      onOpenChange: visible => {
        popperVisible.value = visible;
      },
    });

    const { disabled, showWithMask } = toRefs(props);
    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    provide(HPickerPopoverPropsInjectKey, props);

    // trigger为click下处理隐藏
    const hideClickShowPop = () => {
      if (props.trigger === 'click' && popperVisible.value) {
        visibilityController.closeImmediately('outside-pointer');
        document.removeEventListener(props.hideEventType, hideClickShowPop);
      }
    };

    onBeforeUnmount(() => {
      if (popperCreateTimer) clearTimeout(popperCreateTimer);
      if (popperAppearTimer) clearTimeout(popperAppearTimer);
      document.removeEventListener(props.hideEventType, hideClickShowPop);
      visibilityController.destroy();
      // 不能只设置popperVisible.value = false，因为Unmount之后watch不执行了
      if (popperVisible.value && popperIns) {
        popperVisible.value = false;
        popperIns.destroy?.();
        popperIns = null;
        emit('hide');
      }
    });

    watch(props, val => {
      popperIns?.setOptions?.(val);
      popperIns?.update();
    });

    watch(
      () => [props.disabled, props.hoverShowDelay, props.hoverHideDelay] as const,
      ([nextDisabled, showDelay, hideDelay]) => {
        visibilityController.setOptions({ disabled: nextDisabled, showDelay, hideDelay });
      },
    );

    watch(
      () => props.visible,
      newValue => {
        if (disabled.value) return false;

        visibilityController.syncOpen(newValue);
        popperVisible.value = newValue;
      },
    );

    watch(
      popperVisible,
      newValue => {
        if (newValue) {
          onPopperVisible();
        } else {
          onPopperInVisible();
        }
      },
      {
        immediate: true,
      },
    );

    function onPopperVisible() {
      // 如果还没创建，就先创建
      if (!popperIns) {
        if (popperCreateTimer) clearTimeout(popperCreateTimer);
        popperCreateTimer = setTimeout(() => {
          popperCreateTimer = undefined;
          if (!popperVisible.value || !reference.value || !popper.value) return;
          popperIns = usePopper(reference.value, popper.value, {
            ...props,
            findChild: true,
          });
        }, 1);
      } else {
        popperIns.update?.();
      }
      zIndex.value = zIndexHandler.next();
      if (popperAppearTimer) clearTimeout(popperAppearTimer);
      popperAppearTimer = setTimeout(() => {
        popperAppearTimer = undefined;
        if (popperVisible.value) popperAppear.value = true;
      });
      emit('show');
    }

    function onPopperInVisible() {
      if (popperCreateTimer) {
        clearTimeout(popperCreateTimer);
        popperCreateTimer = undefined;
      }
      if (popperAppearTimer) {
        clearTimeout(popperAppearTimer);
        popperAppearTimer = undefined;
      }
      popperAppear.value = false;
      emit('hide');
    }

    function destroyPopperInstance() {
      popperIns?.destroy?.();
      popperIns = null;
    }

    function updatePosition() {
      void popperIns?.update();
    }

    const onEnterReference = (evt: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        visibilityController.syncOpen(popperVisible.value);
        visibilityController.requestOpen('hover');
      }
      onEnterPopper();

      emit('enterReference', evt);
    };

    const onMouseLeave = (evt: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        visibilityController.requestClose('hover');
      }

      emit('leaveReference', evt);
    };

    const onDownReference = () => {
      if (disabled.value) return false;

      if (props.trigger === 'focus') {
        visibilityController.openImmediately('focus');
      }
    };

    const onUpReference = () => {
      if (disabled.value) return false;

      if (props.trigger === 'focus') {
        visibilityController.closeImmediately('focus');
      }
    };

    const onClickReference = (e: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'click') {
        if (props.stopPropagation) {
          e.stopPropagation();
        }

        visibilityController.syncOpen(popperVisible.value);
        if (popperVisible.value) visibilityController.closeImmediately('click');
        else visibilityController.openImmediately('click');
        if (popperVisible.value) {
          window.setTimeout(() => {
            document.addEventListener(props.hideEventType, hideClickShowPop);
          });
        } else {
          document.removeEventListener(props.hideEventType, hideClickShowPop);
        }

        emit('click', e);
      }
    };

    const onManualControlVisible = (visible: boolean) => {
      if (disabled.value) return false;

      // 如果 要切换的状态 和 当前状态 相同，则不处理
      if (visible === popperVisible.value) return;

      if (visible) visibilityController.openImmediately();
      else visibilityController.closeImmediately();
      if (popperVisible.value) {
        window.setTimeout(() => {
          document.addEventListener(props.hideEventType, hideClickShowPop);
        });
      } else {
        document.removeEventListener(props.hideEventType, hideClickShowPop);
      }
    };

    const onClickPopper = (e: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'click') {
        e.stopImmediatePropagation();
      }
    };

    const onEnterPopper = () => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        visibilityController.cancelClose();
      }
    };

    const toRef = computed(() => {
      // to 优先级高于 toBody
      if (props.to) return props.to;

      if (popupContainerGetter.value) return popupContainerGetter.value(reference.value!);

      // 如果挂载body 直接使用 popupContainerGetter
      if (props.toBody) return 'body';

      return undefined;
    });
    const maskToRef = computed(() => showWithMask.value?.to || 'body');

    const showPopper = computed(() => {
      // destroyOnHide为false 或 props.destroyOnHide为true且popperVisible.value为true;
      return !props.destroyOnHide || popperVisible.value;
    });

    expose({
      switchVisible: onManualControlVisible,
      updatePosition,
      referenceDom: reference,
      popoverDom: popper,
    });

    return () => (
      <span
        class={cls(classHelper.e('reference'), classHelper.is(props.theme), props.referenceClass)}
        ref={reference}
        onClick={onClickReference}
        onMouseenter={onEnterReference}
        onMouseleave={onMouseLeave}
        onMousedown={onDownReference}
        onMouseup={onUpReference}
      >
        {slots.reference?.() ?? ''}
        {/* mask */}
        {showWithMask.value?.enable && popperVisible.value && (
          <Teleport to={maskToRef.value}>
            <div
              class={[classHelper.e('mask'), showWithMask.value?.class]}
              style={{ zIndex: zIndex.value - 1, ...showWithMask.value?.style }}
            />
          </Teleport>
        )}
        {/* popper */}
        <Teleport to={toRef.value} disabled={!toRef.value}>
          <HTransition
            appear
            name={props.transitionName}
            speed={props.transitionSpeed}
            onAfterLeave={destroyPopperInstance}
          >
            {showPopper.value && (
              <span
                v-show={popperAppear.value}
                class={[
                  classHelper.e('popper'),
                  classHelper.is('hide', !popperAppear.value),
                  props.popperClass,
                ]}
                style={{ zIndex: zIndex.value, ...props.popperStyle }}
                ref={popper}
                onClick={onClickPopper}
                onMousedown={onClickPopper}
                onMouseup={onClickPopper}
                onMouseenter={onEnterPopper}
                onMouseleave={onMouseLeave}
              >
                {slots.popper?.() ?? ''}
                {props.arrow && (
                  <div
                    class={cls(classHelper.e('arrow'), classHelper.is(props.theme))}
                    data-popper-arrow="true"
                  />
                )}
              </span>
            )}
          </HTransition>
        </Teleport>
      </span>
    );
  },
});
