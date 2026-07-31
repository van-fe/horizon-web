import type { ComponentPublicInstance, StyleValue } from 'vue';
import { computed, defineComponent, inject, ref, watch } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import HInput from '~/components/Input/src/Input';
import HSelect from '~/components/Select/src/Select';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { LicensePlateInputEmits } from './composables/useEmits';
import { useLicensePlateInputEmits } from './composables/useEmits';
import type { LicensePlateInputExposes } from './composables/useExposes';
import { useLicensePlateInputExposes } from './composables/useExposes';
import { useLicensePlateInputProps } from './composables/useProps';
import type { LicensePlateInputSlots } from './composables/useSlots';
import { useLicensePlateInputSlots } from './composables/useSlots';
import { getLicensePlateType, normalizeLicensePlate } from './utils';

interface InputInstance extends ComponentPublicInstance {
  input?: HTMLInputElement;
  focus: () => void;
  blur: () => void;
  select: () => void;
}

function normalizeSuffix(value: string) {
  return normalizeLicensePlate(value)
    .replace(/[^A-Z0-9挂学警港澳]/g, '')
    .slice(0, 7);
}

export default defineComponent({
  name: `${useNamespace()}LicensePlateInput`,
  desc: '中国大陆车牌号输入组件',
  descLocales: { en: 'Mainland China license plate input with format detection.' },
  inheritAttrs: false,
  props: useLicensePlateInputProps,
  emits: useLicensePlateInputEmits,
  slots: useLicensePlateInputSlots,
  exposes: useLicensePlateInputExposes,
  setup(
    props,
    {
      emit,
      slots,
      attrs,
      expose,
    }: HorizonWebSetupContext<
      LicensePlateInputEmits,
      LicensePlateInputSlots,
      LicensePlateInputExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('license-plate-input');
    const locale = inject(localeInjectKey, defaultLocale);
    const inputRef = ref<InputInstance>();
    const touched = ref(false);

    const labels = computed(
      () =>
        locale.value?.langService.td().horizonWeb.licensePlateInput ?? {
          label: 'License plate',
          provinceLabel: 'Province abbreviation',
          placeholder: 'Enter plate number',
        },
    );
    const normalizedModelValue = computed(() => normalizeLicensePlate(props.modelValue));
    const modelProvince = computed(() => {
      const first = normalizedModelValue.value.charAt(0);
      return props.provinces.includes(first) ? first : undefined;
    });
    const localProvince = ref(modelProvince.value ?? props.defaultProvince);
    const suffix = computed(() =>
      normalizeSuffix(
        modelProvince.value ? normalizedModelValue.value.slice(1) : normalizedModelValue.value,
      ),
    );
    const normalizedValue = computed(() =>
      suffix.value ? `${localProvince.value}${suffix.value}` : '',
    );
    const plateType = computed(() => getLicensePlateType(normalizedValue.value));
    const valid = computed(
      () => plateType.value === 'standard' || plateType.value === 'new-energy',
    );
    const showError = computed(
      () =>
        props.status === 'error' ||
        (props.validateOnBlur && touched.value && plateType.value !== 'empty' && !valid.value),
    );
    const provinceOptions = computed(() =>
      props.provinces.map(province => ({ value: province, label: province })),
    );

    watch(
      () => [modelProvince.value, props.defaultProvince, props.provinces] as const,
      ([province, defaultProvince]) => {
        if (province) localProvince.value = province;
        else if (!props.modelValue) localProvince.value = defaultProvince;
      },
    );

    watch(valid, current => emit('validityChange', current, plateType.value));

    function emitValue(nextSuffix: string, event: 'input' | 'change') {
      const value = nextSuffix ? `${localProvince.value}${nextSuffix}` : '';
      const type = getLicensePlateType(value);
      emit('update:modelValue', value);
      if (event === 'input') emit('input', value, type);
      else emit('change', value, type);
    }

    function handleInput(value: string) {
      const nextSuffix = normalizeSuffix(value);
      if (!nextSuffix) touched.value = false;
      emitValue(nextSuffix, 'input');
    }

    function handleChange(value: string) {
      emitValue(normalizeSuffix(value), 'change');
    }

    function handleProvinceChange(value: unknown) {
      if (typeof value !== 'string' || !props.provinces.includes(value)) return;
      localProvince.value = value;
      emit('provinceChange', value);
      if (suffix.value) emitValue(suffix.value, 'change');
    }

    function validate() {
      touched.value = true;
      return { valid: valid.value, type: plateType.value, value: normalizedValue.value };
    }

    expose({
      input: computed(() => inputRef.value?.input),
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur(),
      select: () => inputRef.value?.select(),
      validate,
    });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(props.size, !!props.size),
          classHelper.is('disabled', props.disabled),
          classHelper.is('readonly', props.readonly),
          classHelper.is('error', showError.value),
          attrs.class as string,
        )}
        style={attrs.style as StyleValue}
        role="group"
        aria-label={props.ariaLabel || labels.value.label}
        aria-invalid={showError.value || undefined}
        aria-describedby={attrs['aria-describedby'] as string | undefined}
      >
        <HSelect
          class={classHelper.e('province')}
          modelValue={localProvince.value}
          options={provinceOptions.value}
          useVirtualScroll={false}
          fitInputWidth={false}
          size={props.size}
          inputStyle={props.inputStyle}
          externalSelectStyle={{ width: '100%' }}
          disabled={props.disabled || props.readonly}
          aria-label={props.provinceAriaLabel || labels.value.provinceLabel}
          onUpdate:modelValue={handleProvinceChange}
        />
        <HInput
          ref={inputRef}
          class={classHelper.e('number')}
          modelValue={suffix.value}
          size={props.size}
          inputStyle={props.inputStyle}
          disabled={props.disabled}
          readonly={props.readonly}
          clearable={props.clearable}
          maxlength={7}
          status={showError.value ? 'error' : undefined}
          placeholder={props.placeholder || labels.value.placeholder}
          onUpdate:modelValue={handleInput}
          onChange={handleChange}
          onFocus={(evt: FocusEvent) => emit('focus', evt)}
          onBlur={(evt: FocusEvent) => {
            touched.value = true;
            emit('blur', evt);
          }}
          onClear={() => emit('clear')}
        >
          {{ suffix: slots.suffix }}
        </HInput>
      </div>
    );
  },
});
