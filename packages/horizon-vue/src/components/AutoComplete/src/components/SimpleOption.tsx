import type { PropType, VNode } from 'vue';
import { computed, defineComponent, Fragment, inject, ref, toRefs, watch } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import {
  HAutoCompleteFocusedOptionValueInjectKey,
  HAutoCompleteModelValueInjectKey,
  HAutoCompleteMouseOverOptionInjectKey,
  HAutoCompletePickOptionInjectKey,
  HAutoCompletePropsInjectKey,
  HAutoCompleteSlotsInjectKey,
  HAutoCompleteVirtualScrollListIsScrollingInjectKey,
} from '../utils/injectKeys';
import type { HAutoCompleteOptionWithUuid } from '../utils/typed';

export default defineComponent({
  name: `${useNamespace()}SimpleOption`,
  props: {
    /**
     * 唯一标识
     */
    uuid: {
      type: String,
      required: true,
    },
    /**
     * 选项的展示内容
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * 选项的值，如果没设置则以 `label` 为主
     */
    value: {
      type: String,
      required: true,
    },
    /**
     * 辅助说明文字或 VNode 节点
     */
    description: {
      type: [String, Object] as PropType<string | VNode>,
    },
    /**
     * 子数据
     */
    item: {
      type: Object as PropType<HAutoCompleteOptionWithUuid>,
      required: true,
    },
    /** 选项索引。 @en Option index. */
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('auto-complete-option');

    const { label: labelProp, value: valueProp } = toRefs(props);

    const optionDomProp = ref<HTMLDivElement | null>(null);

    const parentProps = inject(HAutoCompletePropsInjectKey)!;
    const pickOption = inject(HAutoCompletePickOptionInjectKey)!;
    const focusedOptionValue = inject(HAutoCompleteFocusedOptionValueInjectKey)!;
    const scrollListIsScrolling = inject(HAutoCompleteVirtualScrollListIsScrollingInjectKey)!;
    const onMouseOverOption = inject(HAutoCompleteMouseOverOptionInjectKey)!;
    const slots = inject(HAutoCompleteSlotsInjectKey)!;
    const modelValue = inject(HAutoCompleteModelValueInjectKey)!;

    const isFocused = computed(() => focusedOptionValue.value === labelProp.value);
    const isSelected = computed(() => modelValue.value === valueProp.value);

    watch(isFocused, val => {
      if (val && !scrollListIsScrolling.value) {
        optionDomProp.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      }
    });

    function onClick() {
      pickOption(valueProp.value);
    }

    return () => (
      <div
        ref={optionDomProp}
        id={props.uuid}
        role="option"
        aria-selected={isSelected.value}
        class={cls(
          classHelper.block,
          classHelper.is('focus', isFocused.value),
          classHelper.is('description-' + parentProps.descriptionPosition),
        )}
        onClick={onClick}
        onMouseenter={() => onMouseOverOption(labelProp.value)}
      >
        <div class={classHelper.e('inner')}>
          <div class={classHelper.e('content-wrapper')}>
            {slots.option ? (
              slots.option({
                option: props.item,
                index: props.index,
                active: isFocused.value,
                selected: isSelected.value,
              })
            ) : (
              <Fragment>
                <HTooltip
                  overflow={true}
                  showAfter={parentProps.tooltipShowAfter}
                  hideAfter={parentProps.tooltipHideAfter}
                >
                  {{
                    content: () => labelProp.value,
                    default: () => <div class={classHelper.e('content')}>{labelProp.value}</div>,
                  }}
                </HTooltip>
                {props.description && (
                  <HTooltip
                    overflow={true}
                    showAfter={parentProps.tooltipShowAfter}
                    hideAfter={parentProps.tooltipHideAfter}
                  >
                    {{
                      content: () => props.description,
                      default: () => (
                        <div class={classHelper.e('description')}>{props.description}</div>
                      ),
                    }}
                  </HTooltip>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  },
});
