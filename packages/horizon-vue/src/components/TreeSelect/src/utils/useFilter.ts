import type { Ref, ToRefs, VNode } from 'vue';
import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { resolveTreeSelectKeywordAfterSelection, type TreeSelectStageResult } from '@aurora/core';
import type { TreeSelectProps } from '../composables/useProps';
import { debounce } from 'lodash-es';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './types';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import type {
  HTreeUuidType,
  HTreeData,
  HTreeExtendsData,
  HTreeNodeData,
} from '~/components/Tree/src/utils/types';
import type Tree from '~/utils/useTree/index';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  domRefs: HTreeSelectDomRefs,
  modelValueSet: Ref<Set<HTreeUuidType>>,
  presetModelValueSet: Ref<Set<HTreeUuidType>>,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  popperVisible: Ref<boolean>,
  emitChange: () => void,
  controlVisible: (visible: boolean) => void,
  clearValue: () => TreeSelectStageResult,
  setFilterValue: (value: string) => boolean,
) {
  const inputValue = ref<string>();
  const filterValue = ref<string>();
  const isDuringComposition = ref(false);
  const isInputFocusing = ref(false);

  /** injects **/
  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

  /** computed **/
  const isDuringFilter = computed(() => !!filterValue.value);
  const isFilterable = computed(
    () => (props.filterable?.value && !props.panelFilterable.value) || false,
  );
  const isReadonly = computed(() => !(isFilterable.value && popperVisible.value));

  const inputValueMerged = computed(() => filterValue.value || props.panelFilterInputValue.value);

  const isHideInput = computed(() => {
    if (props.multiple.value) {
      if (props.useStatistic.value && modelValueSet.value.size > 0) {
        return false;
      } else if (!isFilterable.value) {
        if (modelValueSet.value.size > 0) {
          return true;
        }
      } else {
        if (modelValueSet.value.size > 0) {
          return true;
        }
      }
    } else {
      if (context.slots.tagRender && modelValueSet.value.size > 0) {
        return true;
      }
    }

    return false;
  });

  /** watches *
   * @en Description for watch.
   */
  watch(inputValue, val => {
    context.emit('input', val);
  });

  watch(popperVisible, val => {
    if (val) {
      presetModelValueSet.value = new Set(modelValueSet.value.values());
      whetherInputCanFocus();
    } else {
      inputValue.value = '';
      filterValue.value = '';
    }

    if (isFilterable.value && props.multiple.value) {
      void nextTick(() => {
        domRefs.tagGroup.value?.doCollapseCalculate();
      });
    }
  });

  /** methods **/
  function handleFocus() {
    context.emit('focus');
  }

  function handleBlur() {
    context.emit('blur');

    nextTick(() => {
      formItemTrigger?.('blur');
    });
  }
  function handleInputFocus() {
    isInputFocusing.value = true;
  }

  function handleInputBlur() {
    isInputFocusing.value = false;
  }

  function focusInput() {
    domRefs.filterInput.value?.focus();
    domRefs.picker.value?.focus();
  }

  function handleInput(evt: Event) {
    if (isDuringComposition.value) return;
    const target = (evt.composedPath?.()?.[0] ?? evt.target) as HTMLInputElement;
    delInputDebounced(target.value);
  }

  function delInput(value: string) {
    inputValue.value = value;
    filterValue.value = value;
    setFilterValue(value);
    emitChange();

    void nextTick(() => {
      if (!popperVisible.value) {
        controlVisible(true);
      }
    });
  }

  let delInputDebounced = debounce(delInput, props.inputEmitFrequency.value);

  watch(props.inputEmitFrequency, value => {
    delInputDebounced.cancel();
    delInputDebounced = debounce(delInput, value);
  });

  watch(popperVisible, visible => {
    if (!visible) delInputDebounced.cancel();
  });

  onBeforeUnmount(() => delInputDebounced.cancel());

  function onCompositionStart() {
    isDuringComposition.value = true;
  }

  function onCompositionEnd(evt: CompositionEvent) {
    isDuringComposition.value = false;
    handleInput(evt);
  }

  function onTagGroupSuffixInputFocus(evt: FocusEvent) {
    domRefs.picker.value?.handleInputFocus(evt);
  }

  function onTagGroupSuffixInputBlur(evt: FocusEvent) {
    if (
      evt.relatedTarget &&
      !domRefs.picker.value?.wrapperDom().contains(evt.relatedTarget as Node) &&
      !domRefs.picker.value?.popoverDom().contains(evt.relatedTarget as Node)
    ) {
      controlVisible(false);
    }

    domRefs.picker.value?.handleInputBlur(evt);
  }

  function handleClear() {
    clearValue();
    inputValue.value = '';
    filterValue.value = '';
    context.emit('clear');
  }

  function whetherInputCanFocus() {
    void nextTick(() => {
      if (
        (isFilterable.value || props.multiple.value || props.needConfirm.value) &&
        popperVisible.value
      ) {
        void nextTick(() => {
          focusInput();
        });
      }
    });
  }

  function onSelectValue(
    checkedValues: (string | number)[],
    value: string | number,
    e: {
      checked: boolean;
      node: HTreeNodeData;
      allCheckedValues: (string | number)[];
      halfCheckedValues: (string | number)[];
      vnode?: VNode;
      nativeEvent?: Event;
    },
  ) {
    void nextTick(() => {
      const keyword = resolveTreeSelectKeywordAfterSelection(
        props.reserveKeyword.value,
        e.checked,
        inputValue.value ?? '',
        filterValue.value ?? '',
      );
      inputValue.value = keyword.inputValue;
      filterValue.value = keyword.filterValue;
      setFilterValue(keyword.filterValue);

      void nextTick(() => {
        focusInput();
      });

      context.emit('select', checkedValues, value, e);
    });
  }

  return {
    inputValue,
    filterValue,
    inputValueMerged,
    isDuringFilter,
    isFilterable,
    isReadonly,
    isHideInput,
    isInputFocusing,
    handleInput,
    handleInputFocus,
    handleInputBlur,
    handleFocus,
    handleBlur,
    focusInput,
    delInput,
    delInputDebounced,
    isDuringComposition,
    onCompositionStart,
    onCompositionEnd,
    onTagGroupSuffixInputFocus,
    onTagGroupSuffixInputBlur,
    handleClear,
    whetherInputCanFocus,
    onSelectValue,
  };
}
