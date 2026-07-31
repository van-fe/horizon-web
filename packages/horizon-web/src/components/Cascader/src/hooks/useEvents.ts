import { inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type { CascaderDomRefs, HCascaderExtendOption, HCascaderUuidType } from '../utils/types';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useEvents(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  options: {
    domRefs: CascaderDomRefs;
    inputValue: { value: string };
    popperVisible: { value: boolean };
    inputable: Readonly<{ value: boolean }>;
    modelValueSet: { value: Set<HCascaderUuidType> };
    presetModelValueSet: { value: Set<HCascaderUuidType> };
    optionListMap: Readonly<{
      value: Map<HCascaderUuidType, HCascaderExtendOption>;
    }>;
  },
) {
  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
  const isDuringComposition = ref(false);
  const isCascaderFocus = ref(false);
  const isInputFocus = ref(false);

  function manualControlPopperVisible(visible: boolean) {
    if (visible) {
      options.domRefs.pickerDomRef.value?.showPopover();
    } else {
      options.domRefs.pickerDomRef.value?.hidePopover();
    }
  }

  function delInput(value: string, controlPopperVisible = true) {
    options.inputValue.value = value;

    nextTick(() => {
      if (!options.popperVisible.value && controlPopperVisible) {
        manualControlPopperVisible(true);
      }
    });
  }

  const delInputDebounced = debounce(delInput, props.inputEmitFrequency);
  const handleInput = (event: Event) => {
    const target = (event.composedPath?.()?.[0] ?? event.target) as HTMLInputElement;
    delInputDebounced(target.value);
  };

  function focusInput() {
    options.domRefs.filterInputDomRef.value?.focus();
    options.domRefs.pickerDomRef.value?.focus();
  }

  function judgeWhetherInputCanFocus() {
    void nextTick(() => {
      if (
        (options.inputable.value || props.multiple || props.needConfirm) &&
        options.popperVisible.value
      ) {
        void nextTick(focusInput);
      }
    });
  }

  function handleClear() {
    if (props.multiple) {
      for (const value of Array.from(options.modelValueSet.value.values())) {
        const option = options.optionListMap.value.get(value);
        if (
          !option?.disabled &&
          (props.checkStrictly || (!props.checkStrictly && !option?.passingDisabled))
        ) {
          options.modelValueSet.value.delete(value);
        }
      }
    } else {
      options.modelValueSet.value.clear();
    }

    delInput('', false);
    context.emit('clear');
  }

  function handleClick(event: MouseEvent) {
    judgeWhetherInputCanFocus();
    context.emit('click', event);
  }

  function handleInputFocus() {
    isInputFocus.value = true;
  }

  function handleInputBlur() {
    isInputFocus.value = false;
  }

  function handleFocus() {
    isCascaderFocus.value = true;
    context.emit('focus');
  }

  function handleBlur() {
    isCascaderFocus.value = false;
    context.emit('blur');
    nextTick(() => formItemTrigger?.('blur'));
  }

  function onCompositionStart() {
    isDuringComposition.value = true;
  }

  function onCompositionEnd() {
    isDuringComposition.value = false;
  }

  function onTagGroupSuffixInputFocus(event: FocusEvent) {
    options.domRefs.pickerDomRef.value?.handleInputFocus(event);
  }

  function onTagGroupSuffixInputBlur(event: FocusEvent) {
    if (
      event.relatedTarget &&
      !options.domRefs.pickerDomRef.value?.wrapperDom().contains(event.relatedTarget as Node) &&
      !options.domRefs.pickerDomRef.value?.popoverDom().contains(event.relatedTarget as Node)
    ) {
      manualControlPopperVisible(false);
    }

    options.domRefs.pickerDomRef.value?.handleInputBlur(event);
  }

  watch(options.popperVisible, visible => {
    if (visible) {
      options.presetModelValueSet.value = new Set(options.modelValueSet.value);
      judgeWhetherInputCanFocus();
    } else {
      options.inputValue.value = '';
    }

    if (options.inputable.value && props.multiple) {
      void nextTick(() => options.domRefs.tagGroupDomRef.value?.doCollapseCalculate());
    }
  });

  onBeforeUnmount(() => {
    delInputDebounced.cancel();
  });

  return {
    isDuringComposition,
    isCascaderFocus,
    isInputFocus,
    manualControlPopperVisible,
    delInput,
    delInputDebounced,
    focusInput,
    judgeWhetherInputCanFocus,
    handleInput,
    handleClear,
    handleClick,
    handleInputFocus,
    handleInputBlur,
    handleFocus,
    handleBlur,
    onCompositionStart,
    onCompositionEnd,
    onTagGroupSuffixInputFocus,
    onTagGroupSuffixInputBlur,
  };
}
