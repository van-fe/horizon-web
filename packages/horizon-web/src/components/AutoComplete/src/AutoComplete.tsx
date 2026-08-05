import { computed, defineComponent, inject, nextTick, provide, ref, toRefs, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace, isNil, safelyGetEventTarget } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { useAutoCompleteProps } from './composables/useProps';
import { useAutoCompleteEmits } from './composables/useEmits';
import { useAutoCompleteSlots } from './composables/useSlots';
import { useAutoCompleteExposes } from './composables/useExposes';
import type { AutoCompleteProps, ModelValueType } from './composables/useProps';
import type { AutoCompleteEmits } from './composables/useEmits';
import type { AutoCompleteSlots } from './composables/useSlots';
import type { AutoCompleteExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import {
  HAutoCompleteEmitsInjectKey,
  HAutoCompleteFocusedOptionValueInjectKey,
  HAutoCompleteModelValueInjectKey,
  HAutoCompleteMouseOverOptionInjectKey,
  HAutoCompletePickOptionInjectKey,
  HAutoCompletePopperVisibleInjectKey,
  HAutoCompletePropsInjectKey,
  HAutoCompleteSlotsInjectKey,
  HAutoCompleteVisibleOptionsInjectKey,
} from './utils/injectKeys';
import useSize from '~/utils/useSize';
import debounce from 'lodash/debounce';
import { clamp } from '@vueuse/core';
import HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import {
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
  HFormDisabledInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { isEqualLoose } from './utils/utils';
import VirtualScrollList from './components/VirtualScrollList';
import throttle from 'lodash/throttle';
import { nanoid } from 'nanoid';
import type { HAutoCompleteOptionWithUuid, HAutoCompleteOption } from './utils/typed';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}AutoComplete`,
  desc: '根据输入内容提供对应的输入建议',
  descLocales: { en: "Provide suggestions through `options` and filter them in the `search` handler. Supply initial options before input if suggestions should appear on focus. The demo also compares `size` and `input-style`." },
  components: {
    HPicker,
    HPickerFitContentInput,
    VirtualScrollList,
  },
  props: useAutoCompleteProps,
  emits: useAutoCompleteEmits,
  slots: useAutoCompleteSlots,
  exposes: useAutoCompleteExposes,
  setup(
    props: AutoCompleteProps,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<AutoCompleteEmits, AutoCompleteSlots, AutoCompleteExposes>,
  ) {
    const classHelper = new ComponentClassBlock('auto-complete');

    const {
      size,
      inputStyle: inputStyleProp,
      modelValue: modelValueProp,
      disabled: disabledProp,
      clearable: clearableProp,
      trigger: triggerProp,
      placement: placementProp,
      toBody: toBodyProp,
      placeholder: placeholderProp,
      emptyText: emptyTextProp,
      destroyOnHide: destroyOnHideProp,
      fitInputWidth: fitInputWidthProp,
      dropdownIcon: dropdownIconProp,
      externalPanelStyle: externalPanelStyleProp,
      externalPanelClass: externalPanelClassProp,
      externalStyle: externalStyleProp,
      loading: loadingProp,
      loadingText: loadingTextProp,
      inputStatus: inputStatusProp,
      popoverOptions: popoverOptionsProp,
      hoverShowDelay: hoverShowDelayProp,
      hoverHideDelay: hoverHideDelayProp,
      inputEmitFrequency: inputEmitFrequencyProp,
      hidePanelWhenEmptyList: hidePanelWhenEmptyListProp,
      searchIcon: searchIconProp,
      options: optionsProp,
    } = toRefs(props);

    /**
     * dom ref
     */
    const pickerDomRef = ref<null | HorizonWebComponentInstance<typeof HPicker, PickerExposes>>(
      null,
    );
    const virtualScrollListDomRef = ref<null | typeof VirtualScrollList>(null);

    /**
     * other ref value
     */
    const sizeRef = useSize(size, 'medium');

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
    const nFormError = inject(HFormItemErrorInjectedKey, ref(''));

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabledProp?.value ?? formDisabled?.value ?? false);

    /**
     * model value collect
     */
    const modelValue = ref<ModelValueType>();

    watch(
      modelValue,
      newValue => {
        if (!isEqualLoose(newValue, modelValueProp?.value)) {
          emit('update:modelValue', newValue);

          void nextTick(() => {
            formItemTrigger?.('change');
          });
        }
      },
      {
        deep: true,
      },
    );

    /**
     * visible deal
     */
    const popperVisible = ref(false);

    watch(popperVisible, val => {
      emit('dropdownVisibleChange', val);

      if (!val) {
        focusedOptionValue.value = undefined;
      }
    });

    provide(HAutoCompletePopperVisibleInjectKey, popperVisible);

    function manualControlPopperVisible(visible: boolean) {
      if (visible) {
        pickerDomRef.value?.showPopover();
      } else {
        pickerDomRef.value?.hidePopover();
      }
    }

    const isDuringComposition = ref(false);

    const visibleOptions = computed(() => Array.from(optionList.value.values()));

    provide(HAutoCompleteVisibleOptionsInjectKey, visibleOptions);

    const handleInput = (evt: Event) => {
      const target = safelyGetEventTarget(evt) as HTMLInputElement;
      delInputDebounced(target.value);
    };

    function delInput(value: string, switchPopperVisible = true) {
      modelValue.value = value;
      if (!isDuringComposition.value) emit('search', value);

      void nextTick(() => {
        if (!popperVisible.value && switchPopperVisible) {
          manualControlPopperVisible(true);
        }
      });
    }

    const delInputDebounced = debounce(delInput, inputEmitFrequencyProp.value);

    function onCompositionStart() {
      isDuringComposition.value = true;
    }

    function onCompositionEnd() {
      isDuringComposition.value = false;
    }

    function handleClear() {
      modelValue.value = '';
      delInputDebounced('', false);
      emit('clear');
    }

    const isInputFocus = ref(false);
    function handleInputFocus() {
      isInputFocus.value = true;
      emit('focus');
    }

    function handleInputBlur() {
      isInputFocus.value = false;
      emit('blur');

      void nextTick(() => {
        formItemTrigger?.('blur');
      });
    }

    function focusInput() {
      pickerDomRef.value?.focus();
    }

    function judgeWhetherInputCanFocus(panelVisible = true) {
      void nextTick(() => {
        focusInput();
        manualControlPopperVisible(panelVisible);
      });
    }

    function handleClick() {
      judgeWhetherInputCanFocus();
    }

    /**
     * collect options
     */
    const optionList = computed(
      () =>
        new Map<HAutoCompleteOptionWithUuid['label'], HAutoCompleteOptionWithUuid>(
          optionsProp.value.map(opt => [
            opt.label,
            {
              ...opt,
              uuid: nanoid(),
            },
          ]),
        ),
    );

    watch(popperVisible, val => {
      if (val) {
        judgeWhetherInputCanFocus(true);
      }
    });

    watch(visibleOptions, (val, oldVal) => {
      void nextTick(() => {
        if (oldVal.length === 0 && val.length > 0 && isInputFocus.value) {
          manualControlPopperVisible(true);
        }
      });
    });

    function pickOption(value: HAutoCompleteOption['label'] | HAutoCompleteOption['value']) {
      modelValue.value = value;

      emit('change', value);
      emit('select', value);

      judgeWhetherInputCanFocus(false);
    }

    provide(HAutoCompletePickOptionInjectKey, pickOption);

    watch(
      () => modelValueProp?.value,
      val => {
        if (isNil(val)) {
          modelValue.value = '';
        } else {
          modelValue.value = val;
        }
      },
      {
        immediate: true,
      },
    );

    const panelStatus = computed(() => {
      if (visibleOptions.value.length === 0) {
        return 'empty';
      }

      return 'normal';
    });

    /******* keyboard up down to focus option *******/
    const focusedOptionValue = ref<
      HAutoCompleteOption['label'] | HAutoCompleteOption['value'] | undefined
    >();
    provide(HAutoCompleteFocusedOptionValueInjectKey, focusedOptionValue);

    const focusOnOptionByKeyboard = throttle((evt: KeyboardEvent) => {
      const options = visibleOptions.value;

      let index = options.findIndex(value => value.label === focusedOptionValue.value);

      if (evt.key === 'ArrowUp') {
        index -= 1;
      } else if (evt.key === 'ArrowDown') {
        index += 1;
      }

      const aimIndex = index;
      index = clamp(index, 0, Math.max(options.length - 1, 0));

      focusedOptionValue.value = options[index]?.label;

      if (aimIndex > index && !loadingProp.value) {
        emit('optionListReachBottom', evt);
      }
    }, 100);

    function handleKeydown(evt: KeyboardEvent) {
      if (['ArrowUp', 'ArrowDown'].includes(evt.key) && popperVisible.value) {
        evt.preventDefault();

        focusOnOptionByKeyboard(evt);
      }

      if (evt.key === 'Enter') {
        evt.preventDefault();
        if (isDisabled.value) return;

        if (popperVisible.value && !isDuringComposition.value) {
          if (focusedOptionValue.value) {
            const focusedOption = visibleOptions.value.find(
              option => option.label === focusedOptionValue.value,
            );

            if (focusedOption) {
              pickOption(focusedOption.value ?? focusedOption.label);
            }
          }
        } else {
          manualControlPopperVisible(true);
        }
      }

      if (evt.key === 'Escape') {
        manualControlPopperVisible(false);
      }
    }

    function onMouseOverOption(value: HAutoCompleteOption['label'] | HAutoCompleteOption['value']) {
      focusedOptionValue.value = value;
    }

    provide(HAutoCompleteMouseOverOptionInjectKey, onMouseOverOption);

    /**
     * normal provide
     */
    provide(HAutoCompletePropsInjectKey, props);
    provide(HAutoCompleteEmitsInjectKey, emit);
    provide(HAutoCompleteSlotsInjectKey, slots);
    provide(HAutoCompleteModelValueInjectKey, modelValue);

    expose({
      changePanelVisible: manualControlPopperVisible,
    });

    return () => (
      <HPicker
        ref={pickerDomRef}
        size={sizeRef.value}
        modelValue={modelValue.value}
        class={cls(classHelper.block)}
        inputable
        inputIsSearching
        inputStatus={!!nFormError?.value ? 'error' : inputStatusProp.value}
        disabled={isDisabled.value}
        clearable={clearableProp.value}
        trigger={triggerProp.value}
        placement={placementProp.value}
        toBody={toBodyProp.value}
        placeholder={placeholderProp?.value ?? (useLocaleLang('input.placeholder').value as string)}
        popperCanBeDisplayed={hidePanelWhenEmptyListProp.value ? optionList.value.size > 0 : true}
        emptyText={emptyTextProp?.value}
        destroyOnHide={destroyOnHideProp.value}
        fitInputWidth={fitInputWidthProp.value}
        hoverShowDelay={hoverShowDelayProp.value}
        hoverHideDelay={hoverHideDelayProp.value}
        inputStyle={inputStyleProp.value}
        panelStatus={panelStatus.value}
        dropdownIcon={dropdownIconProp?.value}
        panelStyle={externalPanelStyleProp?.value}
        panelClass={externalPanelClassProp?.value}
        loading={loadingProp.value}
        loadingText={loadingTextProp?.value}
        popoverOptions={popoverOptionsProp?.value}
        useFitContentInput={true}
        searchIcon={searchIconProp.value}
        style={externalStyleProp?.value}
        onClick={handleClick}
        onClear={handleClear}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        onInput={handleInput}
        onShow={() => {
          popperVisible.value = true;
        }}
        onHide={() => {
          popperVisible.value = false;
        }}
        onKeydown={handleKeydown}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      >
        {{
          panelEmpty: slots.empty,
          panelPrefix: slots.panelHeaderRender,
          panelSuffix: slots.panelFooterRender,
          pickerContainer: slots.pickerContainer,
          pickerInner: slots.pickerInner,
          picker: slots.picker,
          default: () => <VirtualScrollList ref={virtualScrollListDomRef} />,
        }}
      </HPicker>
    );
  },
});
