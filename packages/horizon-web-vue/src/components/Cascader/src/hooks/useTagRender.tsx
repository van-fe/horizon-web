import { ref, watch, type VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type { HCascaderExtendOption, HCascaderUuidType } from '../utils/types';
import HTag from '~/components/Tag/src/Tag';
import useLocaleLang from '~/utils/useLocaleLang';

export default function useTagRender(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  options: {
    modelValueSet: { value: Set<HCascaderUuidType> };
    presetModelValueSet: { value: Set<HCascaderUuidType> };
    optionListMap: Readonly<{
      value: Map<HCascaderUuidType, HCascaderExtendOption>;
    }>;
    optionsVersion: Readonly<{ value: number }>;
    isDisabled: Readonly<{ value: boolean }>;
    getShowLabel: (uuid: HCascaderUuidType) => string | number;
    pickOption: (
      uuid: HCascaderUuidType,
      singleChooseHide?: boolean,
      forcePick?: boolean,
      emitChange?: boolean,
      singlePickToClear?: boolean,
    ) => void;
    handleClear: () => void;
  },
) {
  const renderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
  const presetRenderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
  const prevRenderedModelValueTags = new Map<HCascaderUuidType, VNode | JSX.Element>();

  function getShouldRenderedTags(
    fromValueSet: Set<HCascaderUuidType> = options.modelValueSet.value,
  ) {
    return Array.from(fromValueSet)
      .map(uuid => {
        const option = options.optionListMap.value.get(uuid);

        if (!option) {
          return (
            prevRenderedModelValueTags.get(uuid) ?? (
              <HTag
                clickable={false}
                closable={true}
                disabled={options.isDisabled.value}
                tooltip={{ toBody: false }}
                onClose={() => options.pickOption(uuid, true, true, true, true)}
              >
                {options.getShowLabel(uuid)}
              </HTag>
            )
          );
        }

        const tag = context.slots.tagRender?.({ ...option, label: option.fullPathLabel }) ?? (
          <HTag
            clickable={false}
            closable={
              !option.disabled &&
              !options.isDisabled.value &&
              (props.checkStrictly || (!props.checkStrictly && !option.passingDisabled))
            }
            disabled={option.disabled || options.isDisabled.value}
            tooltip={{ toBody: false }}
            onClose={() => options.pickOption(uuid, true, true, true, true)}
          >
            {options.getShowLabel(uuid)}
          </HTag>
        );

        prevRenderedModelValueTags.set(uuid, tag as VNode | JSX.Element);
        return tag;
      })
      .filter((tag): tag is VNode | JSX.Element => !!tag);
  }

  function resetRenderedTags() {
    if (
      props.useCheckAllSummary &&
      options.optionListMap.value.size > 0 &&
      (props.checkStrictly
        ? Array.from(options.optionListMap.value.keys()).every(uuid =>
            options.modelValueSet.value.has(uuid),
          )
        : Array.from(options.optionListMap.value.entries()).every(
            ([uuid, node]) => !node.isLeaf || options.modelValueSet.value.has(uuid),
          ))
    ) {
      renderedModelValueTags.value = [
        <HTag
          clickable={false}
          closable={true}
          disabled={options.isDisabled.value}
          onClose={options.handleClear}
        >
          {props.checkAllSummaryText ?? useLocaleLang('select.all', 'All').value}
        </HTag>,
      ];
      return;
    }

    renderedModelValueTags.value = getShouldRenderedTags();

    for (const optionValue of prevRenderedModelValueTags.keys()) {
      if (!options.modelValueSet.value.has(optionValue)) {
        prevRenderedModelValueTags.delete(optionValue);
      }
    }
  }

  watch(
    [
      options.modelValueSet,
      () => options.optionsVersion.value,
      () => props.checkStrictly,
      options.isDisabled,
      () => props.useCheckAllSummary,
    ],
    resetRenderedTags,
    { deep: true, immediate: true },
  );
  watch(
    () => options.presetModelValueSet.value,
    value => {
      presetRenderedModelValueTags.value = getShouldRenderedTags(value);
    },
    { deep: true, immediate: true },
  );

  return {
    renderedModelValueTags,
    presetRenderedModelValueTags,
    getShouldRenderedTags,
    resetRenderedTags,
  };
}
