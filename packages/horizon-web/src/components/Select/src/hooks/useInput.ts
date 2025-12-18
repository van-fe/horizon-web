import type { ComputedRef, Ref, Reactive } from 'vue';
import { computed, inject, nextTick, provide, ref, watch } from 'vue';
import type { OptionProps, SelectProps } from '../composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import {
  NSelectFilterInputValueInjectKey,
  NSelectInputValueInjectKey,
  type SelectCollectedOptionData,
} from '../utils/injectKeys';
import type { NSelectFilterFunction, SelectDomRefs } from '../utils/types';
import { NFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import debounce from 'lodash/debounce';

export default function useInput(
  props: SelectProps,
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    inputValue: Ref<string>;
    filterInputValue: Ref<string>;
    popperVisible: Ref<boolean>;
    optionsMap: Reactive<Map<OptionProps['value'], SelectCollectedOptionData<'option'>>>;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    modelValueSet: Ref<Set<OptionProps['value']>>;
    renderedModelValueTags: Ref<OptionProps['value'][]>;
    isFilterable: ComputedRef<boolean>;
    isInputable: ComputedRef<boolean>;
    emitChange: (emptyInputValue: boolean, inputVal: string) => void;
    changeIsAddValue: Ref<boolean>;
    setPopperVisible: (visible: boolean) => void;
  },
) {
  /**
   * refs
   */
  const isDuringComposition = ref(false);
  const isInputFocus = ref(false);
  const isSelectFocus = ref(false);
  // This value is set for some element which should be visibled before select focused
  const isSelectWillBeActivated = ref(false);

  /**
   * inject
   */
  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

  /**
   * computed
   */
  const isCreateOptionVisible = computed(() => {
    if (props.allowCreate) {
      if (options.inputValue.value) {
        return !Array.from(options.optionsMap.values()).some(
          curr => curr.props.label?.toString().trim() === options.inputValue.value.trim(),
        );
      } else return options.optionsMap.size === 0;
    } else {
      return false;
    }
  });

  const filterMethod = computed<NSelectFilterFunction>(() => {
    const defaultFilterMethod = (input: string, option: OptionProps & Record<string, unknown>) => {
      return (
        option.label?.toString().toLowerCase().includes(input.toLowerCase()) ||
        (props.descriptionFilterable &&
          typeof option.description === 'string' &&
          option.description.toLowerCase().includes(input.toLowerCase())) ||
        false
      );
    };

    if (props.filterOption) {
      return typeof props.filterOption === 'boolean' ? defaultFilterMethod : props.filterOption;
    }

    if (props.filterable) {
      return props.filterMethod ? props.filterMethod : defaultFilterMethod;
    }

    if (props.panelFilterOption) {
      return typeof props.panelFilterOption === 'boolean'
        ? defaultFilterMethod
        : props.panelFilterOption;
    }

    return defaultFilterMethod;
  });

  const isInputShouldHide = computed(() => {
    if (props.multiple) {
      if (props.useStatistic && options.modelValueSet.value.size > 0) {
        return true;
      } else if (!(options.isFilterable.value || props.allowCreate)) {
        if (options.renderedModelValueTags.value.length > 0) {
          return true;
        }
      } else {
        if (options.modelValueSet.value.size > 0) {
          return true;
        }
      }
    } else {
      if (context.slots.tagRender && options.modelValueSet.value.size > 0) {
        return true;
      }
    }

    return false;
  });

  /**
   * watch
   */
  watch(options.inputValue, val => {
    if (props.allowCreate) {
      options.focusedOptionValue.value = val;
    }

    context.emit('input', val);
  });

  /**
   * methods
   */

  function delInput(
    value: string,
    switchPopperVisible = true,
    manual = true,
    emitChangeEvent = true,
  ) {
    if (isDuringComposition.value) return;

    if (value !== options.inputValue.value && emitChangeEvent) {
      options.emitChange(!value, value);
    }

    options.inputValue.value = value;
    options.changeIsAddValue.value = true;

    if (manual || (!manual && props.reserveKeyword !== 'reserve-special')) {
      options.filterInputValue.value = value;

      if (props.showSearch) {
        context.emit('search', value);
      }
    }

    nextTick(() => {
      if (!options.popperVisible.value && switchPopperVisible) {
        options.setPopperVisible(true);
      }
    });
  }

  const delInputDebounced = debounce(delInput, props.inputEmitFrequency);

  function handleInputFocus() {
    isInputFocus.value = true;
  }

  function handleInputBlur() {
    isInputFocus.value = false;
  }

  function handleFocus() {
    isSelectFocus.value = true;
    context.emit('focus');
  }

  function handleBlur() {
    isSelectFocus.value = false;
    isSelectWillBeActivated.value = false;
    context.emit('blur');

    nextTick(() => {
      formItemTrigger?.('blur');
    });
  }

  function focusInput() {
    options.domRefs.filterInputDomRef.value?.focus();
    options.domRefs.pickerDomRef.value?.focus();
  }

  function blurInput() {
    options.domRefs.filterInputDomRef.value?.blur();
    options.domRefs.pickerDomRef.value?.blur();
  }

  function judgeWhetherInputCanFocus() {
    setTimeout(() => {
      if (
        (options.isInputable.value ||
          ((props.multiple || props.needDropdownConfirm) ??
            props.needConfirm ??
            props.needConfirm)) &&
        (options.popperVisible.value || props.showSearch)
      ) {
        void nextTick(() => {
          focusInput();
        });
      }
    });
  }

  provide(NSelectInputValueInjectKey, options.inputValue);
  provide(NSelectFilterInputValueInjectKey, options.filterInputValue);

  return {
    isDuringComposition,
    isCreateOptionVisible,
    isInputShouldHide,
    filterMethod,
    isInputFocus,
    isSelectFocus,
    isSelectWillBeActivated,
    handleInputFocus,
    handleInputBlur,
    handleFocus,
    handleBlur,
    focusInput,
    blurInput,
    judgeWhetherInputCanFocus,
    delInput,
    delInputDebounced,
  };
}
