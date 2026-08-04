import type { SelectProps } from '../composables/useProps';
import { nanoid } from 'nanoid';
import type { Ref, ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import { isOptionChecked } from '../utils/valueFormat';
import type { ModelValueSingleType } from '../utils/types';

export function transformOptionList(
  props: SelectProps,
  options: {
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    isDisabled: ComputedRef<boolean>;
  },
): ComputedRef<SelectCollectedOptionData<'option'>[]> {
  return computed(
    () =>
      props.options?.map(optionProp => {
        const normalizedOptionProps = {
          ...optionProp,
          disabled: optionProp.disabled ?? false,
        };
        const active = computed(() =>
          isOptionChecked(
            options.presetModelValueSet.value,
            optionProp.value,
            props.valueFormat ? () => props.valueFormat!(normalizedOptionProps) : undefined,
          ),
        );

        return {
          uuid: nanoid(),
          type: 'option',
          props: normalizedOptionProps,
          slots: {},
          attrs: {},
          el: ref<HTMLElement | null>(null),
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
      }) ?? [],
  );
}
