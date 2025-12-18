import type { LegoSetupContext } from '@aurora/utils';
import { isDefined, safelyGetEventTarget } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { NFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import type { Ref, Reactive } from 'vue';
import { ref, nextTick, inject, provide, onBeforeUnmount, watch } from 'vue';
import type { OptionProps, SelectProps } from '../composables/useProps';
import type { SelectDomRefs, ModelValueType } from '../utils/types';
import {
  NSelectMouseOverOptionInjectKey,
  type SelectCollectedOptionData,
} from '../utils/injectKeys';
import throttle from 'lodash/throttle';
import { clamp } from '@vueuse/core';

export default function useEvents(
  props: SelectProps,
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    inputValue: Ref<string>;
    isInputable: Ref<boolean>;
    filterInputValue: Ref<string>;
    modelValueSet: Ref<Set<OptionProps['value']>>;
    presetModelValueSet: Ref<Set<OptionProps['value']>>;
    prevOptionValue: ModelValueType;
    prevScrollTop: number;
    optionsMap: Reactive<Map<OptionProps['value'], SelectCollectedOptionData<'option'>>>;
    visibleOptions: Ref<SelectCollectedOptionData<'option'>[]>;
    isDisabled: Ref<boolean>;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    isCreateOptionVisible: Ref<boolean>;
    getOptionDataByValue: (
      value: OptionProps['value'] | undefined,
    ) => SelectCollectedOptionData<'option'> | undefined | null;
    pickOption: (
      value: OptionProps['value'],
      isPickAll?: boolean,
      isPickByKeyboard?: boolean,
    ) => void;
    toggleCheckAll: () => void;
    onClickCreateOption: () => void;
    popperVisible: Ref<boolean>;
    setPopperVisible: (visible: boolean) => void;
    changeIsAddValue: Ref<boolean>;
    emitChange: (emptyInputValue: boolean, inputVal: string) => void;
    judgeWhetherInputCanFocus: () => void;
    getAllOptionsInDom: () => SelectCollectedOptionData<'option'>[];
    delInput: (
      value: string,
      switchPopperVisible?: boolean,
      manual?: boolean,
      emitChangeEvent?: boolean,
    ) => void;
    delInputDebounced: (value: string) => void;
  },
) {
  const isInputFocus = ref(false);
  const isSelectFocus = ref(false);
  const isSelectWillBeActivated = ref(false);
  const isDuringComposition = ref(false);

  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

  watch(isSelectFocus, val => {
    if (val) {
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }
  });

  const handleInput = (evt: Event) => {
    const target = safelyGetEventTarget(evt) as HTMLInputElement;
    options.delInput(target.value);
  };

  function onTagGroupSuffixInputFocus(evt: FocusEvent) {
    options.domRefs.pickerDomRef.value?.handleInputFocus(evt);
  }

  function onTagGroupSuffixInputBlur(evt: FocusEvent) {
    if (
      evt.relatedTarget &&
      !options.domRefs.pickerDomRef.value?.wrapperDom().contains(evt.relatedTarget as Node) &&
      !options.domRefs.pickerDomRef.value?.popoverDom().contains(evt.relatedTarget as Node)
    ) {
      options.setPopperVisible(false);
    }

    options.domRefs.pickerDomRef.value?.handleInputBlur(evt);
  }

  function handleClear(evt?: MouseEvent) {
    evt?.preventDefault();
    let modelValueHasChanged = false;

    if (props.multiple) {
      for (const value of Array.from(options.modelValueSet.value.values())) {
        const option = options.getOptionDataByValue(value);
        if (!option?.props?.disabled) {
          modelValueHasChanged = true;
          options.modelValueSet.value.delete(option?.props?.value ?? value);
        }
      }
    } else {
      if (options.modelValueSet.value.size > 0) modelValueHasChanged = true;

      options.modelValueSet.value.clear();
    }

    options.delInput('', false, true, !modelValueHasChanged);
    context.emit('clear');
  }

  function handleClick(evt: MouseEvent) {
    isSelectWillBeActivated.value = true;
    options.judgeWhetherInputCanFocus();
    context.emit('click', evt);
  }

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

  function onScroll(position: { scrollLeft: number; scrollTop: number }) {
    options.prevScrollTop = position.scrollTop;
  }

  function onCompositionStart() {
    isDuringComposition.value = true;
  }

  function onCompositionEnd() {
    isDuringComposition.value = false;
  }

  function handleKeydown(evt: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown'].includes(evt.key) && options.popperVisible.value) {
      evt.preventDefault();

      focusOnOptionByKeyboard(evt);
    }

    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (options.isDisabled.value) return;

      if (options.popperVisible.value && !isDuringComposition.value) {
        if (
          options.focusedOptionValue.value &&
          options.optionsMap.has(options.focusedOptionValue.value)
        ) {
          if (
            options.isCreateOptionVisible.value &&
            options.focusedOptionValue.value === options.inputValue.value
          ) {
            options.onClickCreateOption();
          } else if (props.useCheckAll && options.focusedOptionValue.value === '__checkAll') {
            options.toggleCheckAll();
          } else {
            options.pickOption(options.focusedOptionValue.value, false);

            if (!props.multiple) {
              options.setPopperVisible(false);
            }
          }
        }
      } else {
        options.setPopperVisible(true);
      }

      if ((props.multiple || props.needDropdownConfirm) ?? props.needConfirm ?? props.needConfirm) {
        options.judgeWhetherInputCanFocus();
      }
    }

    if (
      evt.key === 'Backspace' &&
      options.isInputable.value &&
      options.inputValue.value?.length === 0 &&
      !isDuringComposition.value &&
      props.panelFilterOption === false &&
      props.multiple
    ) {
      if (options.modelValueSet.value.size > 0) {
        options.pickOption(Array.from(options.modelValueSet.value.values()).at(-1)!, true, true);
      }
    }

    if (evt.key === 'Escape') {
      options.setPopperVisible(false);
    }
  }

  const focusOnOptionByKeyboard = throttle((evt: KeyboardEvent) => {
    const opts = isDefined(props.options)
      ? options.visibleOptions.value.filter(curr => curr.props.disabled !== true)
      : options.getAllOptionsInDom();

    if (options.focusedOptionValue.value === undefined) {
      options.focusedOptionValue.value =
        Array.from(options.modelValueSet.value.values()).at(0) ??
        (options.isCreateOptionVisible.value ? options.inputValue.value : undefined);
    }

    let index = opts.findIndex(value => value.props.value === options.focusedOptionValue.value);

    if (evt.key === 'ArrowUp') {
      index -= 1;
    } else if (evt.key === 'ArrowDown') {
      index += 1;
    }

    let min = 0;

    if (options.isCreateOptionVisible.value) {
      min--;
    }

    if (props.useCheckAll) {
      min--;
    }

    const aimIndex = index;
    index = clamp(index, min, Math.max(opts.length - 1, min));

    // virtual scroll
    if (isDefined(props.options)) {
      options.domRefs.virtualScrollListDomRef.value?.scrollToIndex(index, true);
    }

    if (index === -2 && props.useCheckAll) {
      options.focusedOptionValue.value = '__checkAll';
    } else if (index === -1) {
      if (props.useCheckAll && !options.isCreateOptionVisible.value) {
        options.focusedOptionValue.value = '__checkAll';
      }

      if (options.isCreateOptionVisible.value) {
        options.focusedOptionValue.value = options.inputValue.value;
      }
    } else {
      options.focusedOptionValue.value = opts[index]?.props?.value;
    }

    if (aimIndex > index && !props.loading) {
      context.emit('optionListReachBottom', evt);
    }
  }, 100);

  function onMouseOverOption(value: OptionProps['value']) {
    options.focusedOptionValue.value = value;
  }

  function onReachBottom(evt?: Event) {
    if (!props.loading) context.emit('optionListReachBottom', evt, options.filterInputValue.value);
  }

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  provide(NSelectMouseOverOptionInjectKey, onMouseOverOption);

  return {
    isInputFocus,
    isSelectFocus,
    isSelectWillBeActivated,
    handleInput,
    handleInputFocus,
    handleInputBlur,
    handleFocus,
    handleBlur,
    onCompositionStart,
    onCompositionEnd,
    onTagGroupSuffixInputFocus,
    onTagGroupSuffixInputBlur,
    onScroll,
    handleClear,
    handleClick,
    handleKeydown,
    onMouseOverOption,
    onReachBottom,
  };
}
