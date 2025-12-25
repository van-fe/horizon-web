import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, cssVariableKey, useNamespace } from '@aurora/utils';
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { useOptionProps } from './composables/useProps';
import type { OptionSlots } from './composables/useSlots';
import { useOptionSlots } from './composables/useSlots';
import type { OptionEmits } from './composables/useEmits';
import { useOptionEmits } from './composables/useEmits';
import type { SelectCollectedOptionData } from './utils/injectKeys';
import {
  HOptionGroupPropsInjectKey,
  HSelectAddOptionInjectKey,
  HSelectFocusedOptionValueInjectKey,
  HSelectMouseOverOptionInjectKey,
  HSelectPickOptionInjectKey,
  HSelectPopperVisibleInjectKey,
  HSelectPresetModelValueInjectKey,
  HSelectPropsInjectKey,
  HSelectRemoveOptionInjectKey,
  HSelectSlotsInjectKey,
  HSelectVisibleOptionsInjectKey,
} from './utils/injectKeys';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import useIconRender from '~/utils/useIconRender';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { isOptionChecked } from './utils/valueFormat';
import SafeHtml from '~/directives/v-safe-html/src/index';
import { useHighlightOption } from './hooks/useHighlight';

export default defineComponent({
  name: `${useNamespace()}Option`,
  components: {
    HCheckbox,
    HTooltip,
  },
  directives: {
    safeHtml: SafeHtml,
  },
  props: useOptionProps,
  emits: useOptionEmits,
  slots: useOptionSlots,
  setup(props, { emit, slots, attrs }: HorizonWebSetupContext<OptionEmits, OptionSlots>) {
    const classHelper = new ComponentClassBlock('select-option');

    const orderValue = ref(1);
    const isMouseEnter = ref(false);

    const optionDomRef = ref<HTMLDivElement>();
    const contentDomRef = ref<HTMLDivElement>();
    const descriptionDomRef = ref<HTMLDivElement>();

    const presetModelValue = inject(HSelectPresetModelValueInjectKey)!;
    const parentProps = inject(HSelectPropsInjectKey)!;
    const parentSlots = inject(HSelectSlotsInjectKey)!;
    const groupProps = inject(HOptionGroupPropsInjectKey, undefined);
    const addOption = inject(HSelectAddOptionInjectKey);
    const removeOption = inject(HSelectRemoveOptionInjectKey);
    const pickOption = inject(HSelectPickOptionInjectKey)!;
    const visibleOptions = inject(HSelectVisibleOptionsInjectKey)!;
    const focusedOptionValue = inject(HSelectFocusedOptionValueInjectKey)!;
    const popperVisible = inject(HSelectPopperVisibleInjectKey)!;
    const onMouseOverOption = inject(HSelectMouseOverOptionInjectKey)!;

    watch(popperVisible, val => {
      if (val && parentProps.selectedOptionOrderToTop) {
        orderValue.value = isChecked.value ? 0 : 1;
      }
    });

    const isChecked = computed(() => isOptionChecked(presetModelValue.value, props.value));
    const isLimited = computed(
      () => presetModelValue.value.size >= parentProps.multipleLimit && !isChecked.value,
    );
    const isDisabled = computed(
      () => props.disabled || parentProps.disabled || groupProps?.disabled || isLimited.value,
    );
    const isVisible = computed(() =>
      visibleOptions.value.some(curr => curr.props.value === props.value),
    );

    const isFocused = computed(() => focusedOptionValue.value === props.value);

    const descriptionPosition = computed(() => {
      const position = props.descriptionPosition ?? parentProps.descriptionPosition;

      if (parentProps.showSelectedIcon) {
        return 'bottom';
      }

      return position;
    });

    watch(isFocused, val => {
      if (val && !isMouseEnter.value) {
        scrollToSelf();
      }
    });

    const { startWatch, stopWatch } = useHighlightOption(parentProps, props, {
      contentDomRef,
      descriptionDomRef,
    });

    function scrollToSelf() {
      optionDomRef.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }

    const packagedData = computed<SelectCollectedOptionData<'option'>>(() => ({
      type: 'option',
      props,
      slots,
      attrs,
      el: optionDomRef as Ref<HTMLElement | null>,
      active: isChecked,
      disabled: isDisabled,
      children: null,
    }));

    function onClick(evt: MouseEvent) {
      if (isDisabled.value) return;

      emit('click', props.value, { ...attrs, ...props }, evt);

      pickOption(props.value);
    }

    function onMouseEnter() {
      if (!isDisabled.value) {
        onMouseOverOption(props.value);
        isMouseEnter.value = true;
      }
    }

    onMounted(() => {
      addOption?.(packagedData.value);
      startWatch();
    });

    onBeforeUnmount(() => {
      removeOption?.(props.value);
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
          classHelper.is('description-' + descriptionPosition.value),
          classHelper.is('hide', !isVisible.value),
          classHelper.has('icon', parentProps.showSelectedIcon ?? false),
        )}
        style={{
          [cssVariableKey('select-max-line--option')]: props.maxLines ?? parentProps.optionMaxLines,
          order: orderValue.value,
        }}
        data-value={props.value}
        onClick={onClick}
        onMouseenter={onMouseEnter}
        onMouseleave={() => (isMouseEnter.value = false)}
      >
        {slots.default?.({ ...props, ...attrs, active: isChecked.value }) ??
          parentSlots.optionRender?.({ ...props, ...attrs, active: isChecked.value }) ??
          parentSlots.dropdownRender?.({ ...props, ...attrs, active: isChecked.value }) ?? (
            <div class={classHelper.e('inner')}>
              {slots.labelPrefix?.({ ...props, ...attrs, active: isChecked.value })}
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
                  referenceHiddenObserve={true}
                  showAfter={parentProps.tooltipShowAfter}
                  hideAfter={parentProps.tooltipHideAfter}
                >
                  {{
                    content: () =>
                      slots.innerRender?.({ ...props, ...attrs, active: isChecked.value }) ??
                      slots.label?.({ ...props, ...attrs, active: isChecked.value }) ??
                      props.label,
                    default: () => (
                      <div ref={contentDomRef} class={classHelper.e('content')}>
                        {slots.innerRender?.({ ...props, ...attrs, active: isChecked.value }) ??
                          slots.label?.({ ...props, ...attrs, active: isChecked.value }) ??
                          props.label}
                      </div>
                    ),
                  }}
                </HTooltip>
                {slots.labelSuffix?.({ ...props, ...attrs, active: isChecked.value })}
                {(props.description || slots.description) && (
                  <HTooltip
                    overflow={true}
                    referenceHiddenObserve={true}
                    showAfter={parentProps.tooltipShowAfter}
                    hideAfter={parentProps.tooltipHideAfter}
                  >
                    {{
                      content: () =>
                        slots.description?.({ ...props, ...attrs, active: isChecked.value }) ??
                        props.description,
                      default: () => (
                        <div ref={descriptionDomRef} class={classHelper.e('description')}>
                          {slots.description?.({ ...props, ...attrs, active: isChecked.value }) ??
                            props.description}
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
          )}
      </div>
    );
  },
});
