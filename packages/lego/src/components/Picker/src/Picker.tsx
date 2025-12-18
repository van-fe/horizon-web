import { computed, defineComponent, nextTick, provide, ref, toRefs, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace, safelyGetEventTarget } from '@nio-fe/shared';
import type { LegoSetupContext, LegoComponentInstance } from '@nio-fe/shared';
import { usePickerProps } from './composables/useProps';
import { usePickerEmits } from './composables/useEmits';
import { usePickerSlots } from './composables/useSlots';
import { usePickerExposes } from './composables/useExposes';
import type { PickerProps, PickerInputStatusType, PickerStatusType } from './composables/useProps';
import type { PickerEmits } from './composables/useEmits';
import type { PickerSlots } from './composables/useSlots';
import type { PickerExposes, PickerInputExposes } from './composables/useExposes';
import NPopover from '~/components/Popover/src/Popover';
import NPopContent from '~/components/Popover/src/PopContent';
import { IconLoadingLine } from '@nio-fe/icon';
import {
  NPickerDomRefInjectKey,
  NPickerEmitsInjectKey,
  NPickerInputStatusInjectKey,
  NPickerPopContentDomRefInjectKey,
  NPickerPopoverDomRefInjectKey,
  NPickerPopperVisibleInjectKey,
  NPickerPropsInjectKey,
  NPickerSlotsInjectKey,
  NPickerStatusInjectKey,
} from './utils/InjectKeys';
import NPickerInput from './components/NPickerInput';
import NPickerPopper from './components/NPickerPopper';
import { unrefElement } from '@vueuse/core';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';
import { NScrollbarUpdateDelayInjectKey } from '~/components/Scrollbar/src/utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Picker`,
  desc: '所有选择器的公用组件，也可以以此为基础做自定义选择器',
  components: {
    NPopover,
    NPopContent,
    IconLoadingLine,
    NPickerInput,
    NPickerPopper,
  },
  props: usePickerProps,
  emits: usePickerEmits,
  slots: usePickerSlots,
  exposes: usePickerExposes,
  setup(
    props: PickerProps,
    { emit, slots, expose }: LegoSetupContext<PickerEmits, PickerSlots, PickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('picker');

    const {
      inputable: inputableRef,
      inputStyle: inputStyleDomRef,
      disabled: disabledProp,
    } = toRefs(props);

    const pickerDomRef = ref<HTMLDivElement | null>(null);
    const inputDomRef = ref<LegoComponentInstance<typeof NPickerInput, PickerInputExposes> | null>(
      null,
    );
    const popoverDomRef = ref<LegoComponentInstance<typeof NPopover, PopoverExposes> | null>(null);
    const popContentDomRef = ref<(InstanceType<typeof NPopContent> & HTMLElement) | null>(null);

    const popperVisible = ref(false);

    watch(popperVisible, val => {
      val ? emit('show') : emit('hide');
    });

    const pickerStatus = ref<PickerStatusType>('panel-hide');
    const inputStatus = ref<PickerInputStatusType>('normal');
    const isInputFocus = ref(false);

    const isFocus = computed(() => popperVisible.value || isInputFocus.value);

    watch(isFocus, val => {
      if (val) {
        emit('focus');
        document.addEventListener('mousedown', onDocumentClick, true);
      } else {
        emit('blur');
        document.removeEventListener('mousedown', onDocumentClick, true);
      }
    });

    provide(NPickerPropsInjectKey, props);
    provide(NPickerEmitsInjectKey, emit);
    provide(NPickerSlotsInjectKey, slots);
    provide(NPickerPopperVisibleInjectKey, popperVisible);
    provide(NPickerStatusInjectKey, pickerStatus);
    provide(NPickerInputStatusInjectKey, inputStatus);
    provide(NPickerPopoverDomRefInjectKey, popoverDomRef);
    provide(NPickerDomRefInjectKey, pickerDomRef);
    provide(NPickerPopContentDomRefInjectKey, popContentDomRef);

    watch(
      () => props.disabled,
      val => {
        if (val) {
          popperVisible.value = false;
        }
      },
    );

    watch(
      () => props.popperCanBeDisplayed,
      val => {
        if (!val) {
          popperVisible.value = false;
        }
      },
    );

    watch(
      () => props.showPopoverContentOnly,
      val => {
        if (val) {
          popperVisible.value = true;
        }
      },
      {
        immediate: true,
      },
    );

    function setPopoverVisible(status: boolean) {
      if (status !== popperVisible.value) {
        if (!status) {
          nextTick(() => {
            inputDomRef.value?.forceBlur();
          });
        }
      }

      if (
        status === popperVisible.value ||
        props.trigger === 'never' ||
        props.disabled ||
        (!props.popperCanBeDisplayed && status)
      )
        return;

      popperVisible.value = status;

      if (status) {
        pickerStatus.value = props.panelStatus === 'normal' ? 'panel-visible' : props.panelStatus;
      } else {
        pickerStatus.value = 'panel-hide';
      }
    }

    const isTriggerFocusEvent = ref(false);

    function onClick(evt: MouseEvent) {
      evt.stopPropagation();

      if (disabledProp?.value || props.trigger === 'hover' || props.readonly) {
        return;
      }

      if (!isTriggerFocusEvent.value) {
        if (!popperVisible.value) {
          setPopoverVisible(true);
        } else {
          if (!inputableRef.value) {
            setPopoverVisible(false);
          }
        }
      }

      setTimeout(() => {
        isTriggerFocusEvent.value = false;
      }, 0);

      emit('click', evt);
    }

    function showPopover() {
      popoverDomRef.value?.switchVisible(true);
    }

    function hidePopover() {
      popoverDomRef.value?.switchVisible(false);
    }

    /****** should the popover visible******/
    const isMouseOver = ref(false);
    function onMouseEnter() {
      isMouseOver.value = true;
    }

    function onMouseLeave() {
      isMouseOver.value = false;
    }

    watch(
      () => props.popperCanBeDisplayed,
      val => {
        if (val) {
          if (props.trigger === 'hover') {
            if (isMouseOver.value) {
              void nextTick(() => {
                popoverDomRef.value?.switchVisible(true);
              });
            }
          } else {
            if (popperVisible.value) {
              void nextTick(() => {
                popoverDomRef.value?.switchVisible(true);
              });
            }
          }
        }
      },
    );

    function onDocumentClick(evt: MouseEvent) {
      const target = safelyGetEventTarget(evt);

      if (
        !pickerDomRef.value?.contains(target as Node | null) &&
        !unrefElement(popContentDomRef.value)?.contains(target as Node | null)
      ) {
        if (popperVisible.value) {
          popoverDomRef.value?.switchVisible(false);
        }

        blur();
      }
    }

    function focus() {
      inputDomRef.value?.focus();
    }

    function blur() {
      inputDomRef.value?.blur();
    }

    function handleInputFocus(evt: FocusEvent) {
      if (!props.disabled && props.trigger !== 'never') {
        isInputFocus.value = true;

        if (props.popperCanBeDisplayed && !props.readonly) {
          showPopover();
        }

        emit('inputFocus', evt);
      }
    }

    function handleInputBlur(evt: FocusEvent) {
      isInputFocus.value = false;
      emit('inputBlur', evt);
    }

    provide(NScrollbarUpdateDelayInjectKey, 400);

    expose({
      show: showPopover,
      hide: hidePopover,
      showPopover,
      hidePopover,
      focus,
      blur,
      forceBlur: () => {
        inputDomRef.value?.forceBlur();
      },
      handleInputFocus,
      handleInputBlur,
      wrapperDom: () => pickerDomRef.value,
      popoverDom: () => popoverDomRef.value?.popoverDom,
    });

    return () =>
      props.showPopoverContentOnly ? (
        <NPickerPopper
          class={classHelper.is('show-popover-content-only', props.showPopoverContentOnly)}
        />
      ) : (
        <div
          ref={pickerDomRef}
          class={cls(
            classHelper.block,
            classHelper.m(inputStyleDomRef.value),
            classHelper.is('disabled', props.disabled),
            classHelper.is('readonly', props.readonly),
          )}
          onClick={onClick}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
        >
          <NPopover
            ref={popoverDomRef}
            visible={popperVisible.value}
            trigger={
              ['click', 'never'].includes(props.trigger)
                ? 'manual'
                : (props.trigger as Exclude<PickerProps['trigger'], 'never'>)
            }
            placement={props.placement}
            distance={props.distance}
            skidding={props.skidding}
            disabled={!props.popperCanBeDisplayed}
            hoverShowDelay={props.hoverShowDelay}
            hoverHideDelay={props.hoverHideDelay}
            destroyOnHide={props.destroyOnHide}
            arrow={props.arrow}
            toBody={props.toBody}
            sameWidth={props.fitInputWidth !== 'fit-content'}
            setMinWidth={!props.fitInputWidth}
            resizeObserve={true}
            transitionName="dropdown"
            transitionSpeed="slow"
            {...props.popoverOptions}
            onShow={() => setPopoverVisible(true)}
            onHide={() => setPopoverVisible(false)}
          >
            {{
              reference: () =>
                slots.pickerOuter?.(props.modelValue, inputStatus.value, pickerStatus.value) ?? (
                  <NPickerInput
                    ref={inputDomRef}
                    onSwitchPopperVisible={setPopoverVisible}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onClick={onClick}
                  />
                ),
              popper: () =>
                slots.panelOuter?.(props.modelValue, pickerStatus.value) ?? (
                  <NPickerPopper onSwitchPopperVisible={setPopoverVisible} />
                ),
            }}
          </NPopover>
        </div>
      );
  },
});
