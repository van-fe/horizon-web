import type { PropType, VNode } from 'vue';
import { computed, defineComponent, inject, ref, toRefs, watch } from 'vue';
import { cls, ComponentClassBlock, cssVariableKey, useNamespace } from '@nio-fe/shared';
import { NCheckbox } from '~/components/Checkbox';
import { NTooltip } from '~/components/Tooltip';
import useIconRender from '~/utils/useIconRender';
import {
  NSelectFilterInputValueInjectKey,
  NSelectFocusedOptionValueInjectKey,
  NSelectMouseOverOptionInjectKey,
  NSelectPickOptionInjectKey,
  NSelectPresetModelValueInjectKey,
  NSelectPropsInjectKey,
  NSelectVirtualScrollListIsScrollingInjectKey,
} from '../utils/injectKeys';
import { isOptionChecked } from '../utils/valueFormat';

export default defineComponent({
  name: `${useNamespace()}SimpleOption`,
  props: {
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 选项的值
     */
    value: {
      type: [String, Number, Boolean, Object, Symbol],
      required: true,
    },
    /**
     * 选项的展示内容
     */
    label: {
      type: [String, Number] as PropType<string | number>,
    },
    /**
     * 辅助说明文字或 VNode 节点
     */
    description: {
      type: [String, Object] as PropType<string | VNode>,
    },
  },
  setup(props, { emit, attrs }) {
    const classHelper = new ComponentClassBlock('select-option');

    const { value: valueRef, label: labelRef, disabled: disabledRef } = toRefs(props);

    const optionDomRef = ref<HTMLDivElement | null>(null);

    const presetModelValue = inject(NSelectPresetModelValueInjectKey)!;
    const parentProps = inject(NSelectPropsInjectKey)!;
    const pickOption = inject(NSelectPickOptionInjectKey)!;
    const focusedOptionValue = inject(NSelectFocusedOptionValueInjectKey)!;
    const scrollListIsScrolling = inject(NSelectVirtualScrollListIsScrollingInjectKey)!;
    const filterInputValue = inject(NSelectFilterInputValueInjectKey)!;
    const onMouseOverOption = inject(NSelectMouseOverOptionInjectKey)!;

    const isChecked = computed(() => isOptionChecked(presetModelValue.value, valueRef.value));
    const isLimited = computed(
      () => presetModelValue.value.size >= parentProps.multipleLimit && !isChecked.value,
    );
    const isDisabled = computed(() => disabledRef.value || isLimited.value);
    const isFocused = computed(() => focusedOptionValue.value === valueRef.value);

    watch(isFocused, val => {
      if (val && !scrollListIsScrolling.value) {
        optionDomRef.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      }
    });

    function onClick(evt: MouseEvent) {
      if (isDisabled.value) return;

      emit('click', valueRef.value, { ...attrs, ...props }, evt);

      pickOption(valueRef.value);
    }

    return () => (
      <div
        ref={optionDomRef}
        class={cls(
          classHelper.block,
          classHelper.is('active', isChecked.value),
          classHelper.is('disabled', isDisabled.value),
          classHelper.is('focus', isFocused.value),
          classHelper.is(
            'description-' +
              (parentProps.showSelectedIcon ? 'bottom' : parentProps.descriptionPosition),
          ),
          classHelper.has('icon', parentProps.showSelectedIcon ?? false),
        )}
        style={{
          [cssVariableKey('select-max-line--option')]: parentProps.optionMaxLines,
        }}
        data-value={props.value}
        onClick={onClick}
        onMouseenter={() => !isDisabled.value && onMouseOverOption(props.value)}
      >
        <div class={classHelper.e('inner')}>
          {parentProps.multiple && (
            <div class={classHelper.e('checkbox')}>
              <NCheckbox
                true-label={true}
                false-label={false}
                modelValue={isChecked.value}
                disabled={isDisabled.value}
              />
            </div>
          )}
          <div class={classHelper.e('content-wrapper')}>
            <NTooltip
              overflow={true}
              showAfter={parentProps.tooltipShowAfter}
              hideAfter={parentProps.tooltipHideAfter}
            >
              {{
                content: () => labelRef.value,
                default: () => (
                  <div class={classHelper.e('content')}>
                    {filterInputValue.value || parentProps.panelFilterInputValue ? (
                      <span
                        v-html={labelRef.value
                          ?.toString()
                          .replace(
                            new RegExp(
                              filterInputValue.value || parentProps.panelFilterInputValue,
                              'ig',
                            ),
                            substring => `<span class="keyword">${substring}</span>`,
                          )}
                      />
                    ) : (
                      labelRef.value
                    )}
                  </div>
                ),
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
                    <div class={classHelper.e('description')}>
                      {(filterInputValue.value || parentProps.panelFilterInputValue) &&
                      parentProps.descriptionFilterable ? (
                        <span
                          v-html={props.description
                            ?.toString()
                            .replace(
                              new RegExp(
                                filterInputValue.value || parentProps.panelFilterInputValue,
                                'ig',
                              ),
                              substring => `<span class="keyword">${substring}</span>`,
                            )}
                        />
                      ) : (
                        props.description
                      )}
                    </div>
                  ),
                }}
              </NTooltip>
            )}
          </div>
          {parentProps.showSelectedIcon && isChecked.value && (
            <div class={classHelper.e('icon')}>
              {useIconRender(parentProps.selectedIcon, undefined, {
                size: 16,
              })}
            </div>
          )}
        </div>
      </div>
    );
  },
});
