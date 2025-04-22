import type { PropType, VNode } from 'vue';
import { computed, defineComponent, Fragment, inject, ref, toRefs, watch } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { NTooltip } from '~/components/Tooltip';
import {
  NAutoCompleteFocusedOptionValueInjectKey,
  NAutoCompleteMouseOverOptionInjectKey,
  NAutoCompletePickOptionInjectKey,
  NAutoCompletePropsInjectKey,
  NAutoCompleteSlotsInjectKey,
  NAutoCompleteVirtualScrollListIsScrollingInjectKey,
} from '../utils/injectKeys';
import type { NAutoCompleteOptionWithUuid } from '~/components/AutoComplete/src/utils/typed';

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
      type: Object as PropType<NAutoCompleteOptionWithUuid>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('auto-complete-option');

    const { label: labelProp, value: valueProp } = toRefs(props);

    const optionDomProp = ref<HTMLDivElement | null>(null);

    const parentProps = inject(NAutoCompletePropsInjectKey)!;
    const parentSlots = inject(NAutoCompleteSlotsInjectKey)!;
    const pickOption = inject(NAutoCompletePickOptionInjectKey)!;
    const focusedOptionValue = inject(NAutoCompleteFocusedOptionValueInjectKey)!;
    const scrollListIsScrolling = inject(NAutoCompleteVirtualScrollListIsScrollingInjectKey)!;
    const onMouseOverOption = inject(NAutoCompleteMouseOverOptionInjectKey)!;

    const isFocused = computed(() => focusedOptionValue.value === labelProp.value);

    watch(isFocused, val => {
      if (val && !scrollListIsScrolling.value) {
        optionDomProp.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      }
    });

    function onClick() {
      pickOption(valueProp?.value ?? labelProp.value);
    }

    return () => (
      <div
        ref={optionDomProp}
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
            {parentSlots.default?.(props.item) ?? (
              <Fragment>
                <NTooltip
                  overflow={true}
                  showAfter={parentProps.tooltipShowAfter}
                  hideAfter={parentProps.tooltipHideAfter}
                >
                  {{
                    content: () => labelProp.value,
                    default: () => <div class={classHelper.e('content')}>{labelProp.value}</div>,
                  }}
                </NTooltip>
                {props.description && (
                  <NTooltip
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
                  </NTooltip>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  },
});
