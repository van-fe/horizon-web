import type { PropType, VNode } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  ref,
  toRefs,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { cls, ComponentClassBlock, cssVariableKey, useNamespace } from '@aurora/utils';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import useIconRender from '~/utils/useIconRender';
import {
  HSelectFocusedOptionValueInjectKey,
  HSelectMouseOverOptionInjectKey,
  HSelectPickOptionInjectKey,
  HSelectPresetModelValueInjectKey,
  HSelectPropsInjectKey,
  HSelectVirtualScrollListIsScrollingInjectKey,
} from '../utils/injectKeys';
import { isOptionChecked } from '../utils/valueFormat';
import { useHighlightOption } from '../hooks/useHighlight';

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

    const optionDomRef = ref<HTMLDivElement>();
    const contentDomRef = ref<HTMLDivElement>();
    const descriptionDomRef = ref<HTMLDivElement>();

    const presetModelValue = inject(HSelectPresetModelValueInjectKey)!;
    const parentProps = inject(HSelectPropsInjectKey)!;
    const pickOption = inject(HSelectPickOptionInjectKey)!;
    const focusedOptionValue = inject(HSelectFocusedOptionValueInjectKey)!;
    const scrollListIsScrolling = inject(HSelectVirtualScrollListIsScrollingInjectKey)!;
    const onMouseOverOption = inject(HSelectMouseOverOptionInjectKey)!;

    const isMouseEnter = ref(false);
    const isChecked = computed(() => isOptionChecked(presetModelValue.value, valueRef.value));
    const isLimited = computed(
      () => presetModelValue.value.size >= parentProps.multipleLimit && !isChecked.value,
    );
    const isDisabled = computed(() => disabledRef.value || isLimited.value);
    const isFocused = computed(() => focusedOptionValue.value === valueRef.value);

    watch(isFocused, val => {
      if (val && !scrollListIsScrolling.value && !isMouseEnter.value) {
        optionDomRef.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      }
    });

    const { startWatch, stopWatch } = useHighlightOption(parentProps, props, {
      contentDomRef,
      descriptionDomRef,
    });

    function onClick(evt: MouseEvent) {
      if (isDisabled.value) return;

      emit('click', valueRef.value, { ...attrs, ...props }, evt);

      pickOption(valueRef.value);
    }

    function handleMouseEnter() {
      if (isDisabled.value) return;

      isMouseEnter.value = true;
      onMouseOverOption(props.value);
    }

    function handleMouseLeave() {
      isMouseEnter.value = false;
    }

    onMounted(() => {
      setTimeout(() => {
        startWatch();
      });
    });

    onBeforeUnmount(() => {
      stopWatch();
    });

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
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >
        <div class={classHelper.e('inner')}>
          {parentProps.multiple && (
            <div class={classHelper.e('checkbox')}>
              <HCheckbox
                true-label={true}
                false-label={false}
                modelValue={isChecked.value}
                disabled={isDisabled.value}
              />
            </div>
          )}
          <div class={classHelper.e('content-wrapper')}>
            <HTooltip
              overflow={true}
              showAfter={parentProps.tooltipShowAfter}
              hideAfter={parentProps.tooltipHideAfter}
            >
              {{
                content: () => labelRef.value,
                default: () => (
                  <div ref={contentDomRef} class={classHelper.e('content')}>
                    {labelRef.value}
                  </div>
                ),
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
                    <div ref={descriptionDomRef} class={classHelper.e('description')}>
                      {props.description}
                    </div>
                  ),
                }}
              </HTooltip>
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
