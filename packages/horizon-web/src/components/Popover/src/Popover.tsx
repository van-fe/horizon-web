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
import NTransition from '~/components/Transition/src/Transition';
import { NPickerPopoverPropsInjectKey } from './utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Popover`,
  desc: '点击目标元素，唤起白底气泡卡片浮层',
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
    // hover情况下，离开reference后，popper的延迟隐藏时间，让用户有时间进入popper区域
    let hoverHideTimer: number | null = null;
    let hoverShowTimer: number | null = null;
    let popperIns: PopperInstance | null = null;
    //
    const reference = ref<HTMLElement | null>(null);
    const popper = ref<HTMLElement | null>(null);
    // 将popperVisible初始化为props.visible的值
    const popperVisible = ref<boolean>(props.visible);
    const popperAppear = ref(false);

    const { disabled, showWithMask } = toRefs(props);
    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    provide(NPickerPopoverPropsInjectKey, props);

    // trigger为click下处理隐藏
    const hideClickShowPop = () => {
      if (['click', 'click-hide', 'click-remain'].includes(props.trigger) && popperVisible.value) {
        popperVisible.value = false;
        document.removeEventListener(props.hideEventType, hideClickShowPop);
      }
    };

    onBeforeUnmount(() => {
      document.removeEventListener(props.hideEventType, hideClickShowPop);
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
      () => props.visible,
      newValue => {
        if (disabled.value) return false;

        if (props.trigger === 'manual') {
          popperVisible.value = newValue;
        }
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
        setTimeout(() => {
          popperIns = usePopper(reference.value, popper.value, {
            ...props,
            findChild: true,
          });
        }, 1);
      } else {
        popperIns.update?.();
      }
      zIndex.value = zIndexHandler.next();
      setTimeout(() => {
        popperAppear.value = true;
      });
      emit('show');
    }

    function onPopperInVisible() {
      popperAppear.value = false;
      emit('hide');
    }

    function destroyPopperInstance() {
      popperIns?.destroy?.();
      popperIns = null;
    }

    const clearHoverShowTimer = () => {
      if (hoverShowTimer !== null) {
        window.clearTimeout(hoverShowTimer);
        hoverShowTimer = null;
      }
    };

    const clearHoverHideTimer = () => {
      if (hoverHideTimer !== null) {
        window.clearTimeout(hoverHideTimer);
        hoverHideTimer = null;
      }
    };

    const onEnterReference = (evt: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        hoverShowTimer = window.setTimeout(() => {
          popperVisible.value = true;
        }, props.hoverShowDelay);
      }
      onEnterPopper();

      emit('enterReference', evt);
    };

    const onMouseLeave = (evt: MouseEvent) => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        if (hoverHideTimer === null) {
          hoverHideTimer = window.setTimeout(() => {
            popperVisible.value = false;
            hoverHideTimer = null;
          }, props.hoverHideDelay);
        }
        clearHoverShowTimer();
      }

      emit('leaveReference', evt);
    };

    const onDownReference = () => {
      if (disabled.value) return false;

      if (props.trigger === 'focus') {
        popperVisible.value = true;
      }
    };

    const onUpReference = () => {
      if (disabled.value) return false;

      if (props.trigger === 'focus') {
        popperVisible.value = false;
      }
    };

    const onClickReference = (e: MouseEvent) => {
      if (disabled.value) return false;

      if (['click', 'click-hide', 'click-remain'].includes(props.trigger)) {
        if (props.stopPropagation) {
          e.stopPropagation();
        }

        popperVisible.value = !popperVisible.value;
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

      popperVisible.value = visible;
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

      if ('click-remain' === props.trigger) {
        e.stopImmediatePropagation();
      }
    };

    const onEnterPopper = () => {
      if (disabled.value) return false;

      if (props.trigger === 'hover') {
        clearHoverHideTimer();
      }
    };

    watch(disabled, val => {
      if (val) {
        popperVisible.value = false;
        clearHoverShowTimer();
        clearHoverHideTimer();
      }
    });

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
          <NTransition
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
          </NTransition>
        </Teleport>
      </span>
    );
  },
});
