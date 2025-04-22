import type { ModelValueSingleType, SelectProps } from '../composables/useProps';
import { nanoid } from 'nanoid';
import type { Ref, ComputedRef } from 'vue';
import { shallowRef, computed } from 'vue';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import { isOptionChecked } from '../utils/valueFormat';

export function transformOptionList(
  props: SelectProps,
  options: {
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    isDisabled: ComputedRef<boolean>;
  },
): SelectCollectedOptionData<'option'>[] {
  return (
    props.options?.map(optionProp => {
      const active = computed(() =>
        isOptionChecked(options.presetModelValueSet.value, optionProp.value),
      );

      return {
        uuid: nanoid(),
        type: 'option',
        props: {
          ...optionProp,
          disabled: optionProp.disabled ?? false,
        },
        slots: {},
        attrs: {},
        el: shallowRef(null),
        active,
        disabled: computed(
          () =>
            optionProp.disabled ||
            options.isDisabled.value ||
            (options.presetModelValueSet.value.size >= props.multipleLimit && !active.value),
        ),
        children: null,
        scrollTo: () => void 0,
      };
    }) ?? []
  );
}
