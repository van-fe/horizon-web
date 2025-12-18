import { computed, defineComponent, inject, nextTick, provide, ref, toRef, watch } from 'vue';
import { useColorPickerProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@nio-fe/shared';
import ColorPickerColor from './utils/ColorPickerColor';
import type { ColorPickerEmits } from './composables/useEmits';
import { useColorPickerEmits } from './composables/useEmits';
import {
  ColorPickerCurrentValue,
  ColorPickerEmit,
  ColorPickerModelValue,
  ColorPickerOnCancel,
  ColorPickerOnClear,
  ColorPickerOnConfirm,
  ColorPickerProps,
  ColorPickerSlotsInjectedKey,
} from './utils/InjectedKeys';
import type { ColorPickerSlots } from './composables/useSlots';
import { useColorPickerSlots } from './composables/useSlots';
import type { ColorPickerExposes } from './composables/useExposes';
import { useColorPickerExposes } from './composables/useExposes';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import useSize from '~/utils/useSize';
import NPicker from '~/components/Picker/src/Picker';
import ColorPickerPanel from './components/ColorPickerPanel';
import ColorPickerTrigger from './components/ColorPickerTrigger';
import { recordRecentlyColor } from '~/components/ColorPicker/src/utils/useStorageColor';

export default defineComponent({
  name: `${useNamespace()}ColorPicker`,
  desc: '用于选择颜色，支持HEX、RGB、HSL、HSB四种格式',
  components: {
    NPicker,
  },
  props: useColorPickerProps,
  emits: useColorPickerEmits,
  slots: useColorPickerSlots,
  exposes: useColorPickerExposes,
  setup(
    props,
    {
      attrs,
      emit,
      expose,
      slots,
    }: LegoSetupContext<ColorPickerEmits, ColorPickerSlots, ColorPickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('color-picker');
    const pickerRef = ref<typeof NPicker | null>(null);

    const modelValue = new ColorPickerColor(props);

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because color-picker use n-input and so no, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    function onModelValueChanged(value: string) {
      emit('update:modelValue', value);
      emit('change', value);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }

    watch(
      () => modelValue.resultsValue.value,
      val => {
        onModelValueChanged(val);
      },
    );

    const currValue = new ColorPickerColor(props);
    function onCurrentValueChanged(value: string) {
      emit('activeChange', value);

      if (!props.needConfirm) {
        modelValue.fromString(value);
      }
    }

    watch(
      () => currValue.resultsValue.value,
      val => {
        onCurrentValueChanged(val);
      },
    );

    watch(
      () => props.modelValue,
      val => {
        modelValue.fromString(val || '');
        currValue.fromString(val || '');
      },
    );

    function onConfirm() {
      modelValue.fromString(currValue.resultsValue.value);
      handleClose();
      currentRecordRecentlyColor();
    }

    function onCancel() {
      currValue.fromString(modelValue.value);
      handleClose();
    }

    let prevColor = modelValue?.resultsValue.value;
    function onClose() {
      if (props.recentlyColors && prevColor !== modelValue?.resultsValue.value) {
        currentRecordRecentlyColor();
      }
    }

    function currentRecordRecentlyColor() {
      if (modelValue?.resultsValue.value) {
        recordRecentlyColor(modelValue?.resultsValue.value);
        prevColor = modelValue?.resultsValue.value;
      }
    }

    provide(ColorPickerModelValue, modelValue);
    provide(ColorPickerCurrentValue, currValue);
    provide(ColorPickerProps, props);
    provide(ColorPickerEmit, emit);
    provide(ColorPickerSlotsInjectedKey, slots);
    provide(ColorPickerOnCancel, onCancel);
    provide(ColorPickerOnConfirm, onConfirm);
    provide(ColorPickerOnClear, onClear);

    function handleClose() {
      manualControlVisible(false);
    }

    function manualControlVisible(visible: boolean) {
      visible ? pickerRef.value?.show?.() : pickerRef.value?.hide?.();
    }

    function onBlur() {
      emit('blur');
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    function onShow() {
      currValue.fromString(modelValue.value);
    }

    function onClear() {
      modelValue.clearValue();
      currValue.clearValue();
      handleClose();
    }

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium');

    // form-error
    const error = inject(NFormItemErrorInjectedKey, ref(''));

    expose({
      colorPicker: pickerRef.value?.wrapperDom?.().input,
    });

    return () => (
      <NPicker
        ref={pickerRef}
        modelValue={modelValue.resultsValue.value}
        class={cls(
          classHelper.block,
          classHelper.m(slots.trigger ? 'square' : props.triggerType),
          classHelper.m(sizeRef.value),
        )}
        size={sizeRef.value}
        inputStatus={!!error?.value ? 'error' : undefined}
        disabled={isDisabled.value}
        fitInputWidth="fit-content"
        placement={props.triggerType === 'square' ? 'bottom' : 'bottom-end'}
        needConfirm={props.needConfirm || props.clearable}
        confirmNeedConfirm={props.needConfirm}
        confirmNeedCancel={props.needConfirm}
        confirmAreaSize="small"
        confirmAreaPadding={cssVariable('color-picker-padding--confirm')}
        confirmNeedClear={props.clearable}
        destroyOnHide={true}
        popoverOptions={{ hideEventType: 'mousedown' }}
        hideInput={props.triggerType === 'square'}
        toBody={props.toBody}
        {...attrs}
        onShow={onShow}
        onInputBlur={onBlur}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClear={onClear}
        onHide={onClose}
      >
        {{
          default: () => <ColorPickerPanel />,
          pickerIcon: () => (
            <ColorPickerTrigger withText={props.triggerType === 'square' && props.squareText} />
          ),
          ...(slots.trigger ? { pickerOuter: () => slots.trigger?.(modelValue) } : {}),
        }}
      </NPicker>
    );
  },
});
