import type { ToRefs, Ref } from 'vue';
import { computed, inject, nextTick, ref, watch } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { NTreeSelectModelValueType, NTreeSelectContext, NTreeSelectDomRefs } from './types';
import type { NTreeUuidType, NTreeExtendsData, NTreeData } from '~/components/Tree/src/utils/types';
import { isEmpty, isEqualLoose } from '~/components/Select/src/utils/utils';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { isNil } from '@aurora/utils';
import type TreeHelper from '~/utils/useTree/index';

export default function useData(
  props: ToRefs<TreeSelectProps>,
  context: NTreeSelectContext,
  domRefs: NTreeSelectDomRefs,
  treeHelper: TreeHelper<NTreeData, NTreeExtendsData>,
  emitChange: () => void,
) {
  const modelValue = ref<NTreeSelectModelValueType>();
  const modelValueSet = ref(new Set<NTreeUuidType>());
  const presetModelValueSet = ref(new Set<NTreeUuidType>());
  const visibleNodes = ref<NTreeExtendsData[]>([]);

  /** injects **/
  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
  const formDisabled = inject(NFormDisabledInjectedKey, undefined);

  /** computed **/
  const isDisabled = computed(() => props.disabled?.value ?? formDisabled?.value ?? false);

  /** watches**/
  watch(
    () => props.modelValue?.value,
    val => {
      if (isNil(val)) {
        modelValueSet.value.clear();
      } else {
        modelValueSet.value = new Set(Array.isArray(val) ? val : [val]);
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    props.treeData,
    val => {
      treeHelper.setTreeData(val);
    },
    {
      deep: true,
    },
  );

  watch(props.multiple, val => {
    if (!val) {
      if (!reserveNumberOfModelValues()) {
        updateModelValue();
      }
    } else {
      updateModelValue();
    }
  });

  watch(
    props.multipleLimit,
    val => {
      reserveNumberOfModelValues(val);
    },
    {
      immediate: true,
    },
  );

  watch(
    modelValue,
    newValue => {
      if (!isEqualLoose(newValue, props.modelValue?.value)) {
        context.emit('update:modelValue', newValue);

        emitChange();

        void nextTick(() => {
          formItemTrigger?.('change');
        });
      }
    },
    {
      deep: true,
    },
  );

  watch(
    modelValueSet,
    val => {
      presetModelValueSet.value = new Set(val);
    },
    {
      immediate: true,
    },
  );

  /** methods **/
  function updateModelValue() {
    const transformedValue: (string | number)[] = Array.from(modelValueSet.value.values());

    const value = props.multiple.value ? transformedValue : transformedValue[0];

    if (isEmpty(value)) {
      modelValue.value = props.initialValue.value as Exclude<
        TreeSelectProps['initialValue'],
        symbol
      >;
    } else {
      modelValue.value = value;
    }
  }

  function reserveNumberOfModelValues(reserveAmount = 1) {
    if (reserveAmount === Infinity || reserveAmount >= modelValueSet.value.size) {
      return false;
    }

    if (reserveAmount <= 0) {
      modelValueSet.value.clear();
      return false;
    }

    let count = 0;

    for (const item of modelValueSet.value.values()) {
      if (count < reserveAmount) {
        count++;
        continue;
      }
      modelValueSet.value.delete(item);
      count++;
    }

    return true;
  }

  function updatePresetToFormal() {
    modelValueSet.value = presetModelValueSet.value;
    updateModelValue();
  }

  function setModelValue(uuids: NTreeUuidType[], confirm = true) {
    presetModelValueSet.value = new Set(uuids);

    if (confirm) {
      updatePresetToFormal();
    }
  }

  return {
    visibleNodes: visibleNodes as Ref<NTreeExtendsData[]>,
    modelValue,
    modelValueSet,
    presetModelValueSet,
    isDisabled,
    setModelValue,
    updateModelValue,
    updatePresetToFormal,
  };
}
