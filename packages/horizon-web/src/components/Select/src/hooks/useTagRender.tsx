import type { Ref, VNode, Reactive } from 'vue';
import { computed, ref, toDisplayString, watch } from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import type { OptionProps, SelectProps } from '../composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import HTag from '~/components/Tag/src/Tag';
import HTagGroup from '~/components/Tag/src/TagGroup';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import type { ModelValueSingleType, SelectDomRefs } from '../utils/types';
import useLocaleLang from '~/utils/useLocaleLang';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default function useTagRender(
  props: SelectProps,
  context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    renderedModelValueTags: Ref<Array<VNode | JSX.Element>>;
    sizeRef: Ref<NonNullable<SelectProps['size']>>;
    modelValueSet: Ref<Set<ModelValueSingleType>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    optionsMap: Reactive<Map<ModelValueSingleType, SelectCollectedOptionData<'option'>>>;
    getOptionDataByValue: (
      value: ModelValueSingleType | undefined,
    ) => SelectCollectedOptionData<'option'> | undefined | null;
    isDisabled: Ref<boolean>;
    isInputable: Ref<boolean>;
    handleClear: () => void;
    pickOption: (
      value: ModelValueSingleType,
      emitClose: boolean,
      emitPick: boolean,
      evt: MouseEvent | undefined,
      emitPickEmpty: boolean,
    ) => void;
    getFormattedModelValue: (modelValueSet: Set<ModelValueSingleType>) => ModelValueSingleType[];
    isModelValueSetHasValue: (
      setData: Set<ModelValueSingleType>,
      value: ModelValueSingleType,
    ) => boolean;
  },
) {
  const presetRenderedModelValueTags: Ref<Array<VNode | JSX.Element>> = ref([]);
  const prevRenderedModelValueTags = new Map<ModelValueSingleType, VNode | JSX.Element>();

  const shouldTagAppendInputExists = computed(
    () => props.multiple && options.modelValueSet.value.size > 0 && options.isInputable.value,
  );

  watch(
    options.presetModelValueSet,
    val => {
      presetRenderedModelValueTags.value = getShouldRenderedTags(val);
    },
    {
      deep: true,
    },
  );

  watch(
    () => [
      props.useCheckAllSummary,
      options.optionsMap.size,
      ...Array.from(options.optionsMap.values()).flatMap(option => [
        option.props.label,
        option.props.disabled,
      ]),
      ...options.modelValueSet.value,
    ],
    () => {
      resetRenderedTags();
    },
    {
      immediate: true,
    },
  );

  function getSelectedOptionsPopoverRender(
    reference: VNode,
    popoverProps: Partial<PopoverProps> = {},
  ) {
    return (
      <HPopover {...popoverProps}>
        {{
          popper: () => (
            <HPopContent style={{ maxWidth: '320px' }}>
              <HScrollbar maxHeight={152} size="small">
                <HTagGroup
                  ref={options.domRefs.tagGroupDomRef}
                  collapse={false}
                  tooltipRenderType="full"
                  size={options.sizeRef.value}
                  disabled={options.isDisabled.value}
                  tooltipShowAfter={props.tooltipShowAfter}
                  tooltipHideAfter={props.tooltipHideAfter}
                  collapseTagProps={{
                    clickable: false,
                    ...props.collapsedTagsProps,
                  }}
                >
                  {getShouldRenderedTags()}
                </HTagGroup>
              </HScrollbar>
            </HPopContent>
          ),
          reference: () => reference,
        }}
      </HPopover>
    );
  }

  function resetRenderedTags() {
    if (
      props.useCheckAllSummary &&
      options.optionsMap.size > 0 &&
      Array.from(options.optionsMap.keys()).every(curr =>
        options.isModelValueSetHasValue(options.modelValueSet.value, curr),
      )
    ) {
      options.renderedModelValueTags.value = [
        getSelectedOptionsPopoverRender(
          <HTag
            clickable={false}
            closable={true}
            disabled={options.isDisabled.value}
            onClose={options.handleClear}
          >
            {props.checkAllSummaryText ?? useLocaleLang('select.all').value}
          </HTag>,
          {
            disabled: !props.collapseTagsTooltip,
          },
        ),
      ] as Array<VNode>;
      return;
    }

    options.renderedModelValueTags.value = getShouldRenderedTags();

    // remove deselected option in prevRenderedModelValueTags
    for (const optValue of prevRenderedModelValueTags.keys()) {
      if (!options.modelValueSet.value.has(optValue)) {
        prevRenderedModelValueTags.delete(optValue);
      }
    }
  }

  function getShouldRenderedTags(
    fromValueSet: Set<ModelValueSingleType> = options.modelValueSet.value,
  ) {
    return Array.from(fromValueSet.values())
      .map(optValue => {
        const option = options.getOptionDataByValue(optValue);

        if (!option) {
          return (
            prevRenderedModelValueTags.get(optValue) ??
            (props.showValueUnMatch
              ? (context.slots.tagRender?.({
                  value: optValue,
                } as OptionProps & Record<string, unknown>) ?? (
                  <HTag
                    clickable={false}
                    closable={true}
                    disabled={options.isDisabled.value}
                    onClose={evt => options.pickOption(optValue, true, true, evt, true)}
                  >
                    {toDisplayString(optValue)}
                  </HTag>
                ))
              : undefined)
          );
        }

        const res = context.slots.tagRender?.({
          ...option.props,
          ...option.attrs,
        }) ?? (
          <HTag
            clickable={false}
            closable={!option?.props.disabled}
            disabled={option?.props.disabled || options.isDisabled.value}
            onClose={() => options.pickOption(optValue, true, true, undefined, true)}
          >
            {option?.props.label ??
              option?.slots.label?.({
                ...option?.props,
                ...option?.attrs,
                active: option?.active.value ?? false,
              })}
          </HTag>
        );

        prevRenderedModelValueTags.set(optValue, res as VNode | JSX.Element);

        return res;
      })
      .filter(Boolean) as Array<VNode | JSX.Element>;
  }

  return {
    resetRenderedTags,
    presetRenderedModelValueTags,
    shouldTagAppendInputExists,
    getSelectedOptionsPopoverRender,
  };
}
