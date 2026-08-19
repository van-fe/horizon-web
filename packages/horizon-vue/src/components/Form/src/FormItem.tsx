import {
  defineComponent,
  inject,
  ref,
  provide,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  onBeforeMount,
  watch,
  toRef,
  onMounted,
  Fragment,
} from 'vue';
import type { HFormItemHelper } from './composables/useProps';
import { useFormItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  slotVNodes,
  ComponentClassBlock,
  getTextWidth,
  cls,
  isDefined,
  useNamespace,
  isObject,
  sizeUnitTransform,
  cssVariableKey,
} from '@aurora/utils';
import {
  FormFieldController,
  getFormPathValue,
  resolveFormRequiredMark,
  resolveFormValidateEvents,
} from '@aurora/core';
import type { HFormItemTriggerType } from './utils/injectedKeys';
import {
  HFormInjectedKey,
  HFormItemErrorInjectedKey,
  HFormItemPropsInjectedKey,
  HFormItemSlotsInjectedKey,
  HFormItemTriggerInjectedKey,
} from './utils/injectedKeys';
import { IconHelp } from '@aurora/icon';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import type { FormItemSlots } from './composables/useSlots';
import { useFormItemSlots } from './composables/useSlots';
import type { FormItemExposes } from './composables/useExposes';
import { useFormItemExposes } from './composables/useExposes';
import useLocaleLang from '~/utils/useLocaleLang';
import { GRID_KEY, useGridItemStyle } from '~/components/Layout/src/composables/useGridStyles';

export default defineComponent({
  name: `${useNamespace()}FormItem`,
  desc: '表单中的字段布局与校验容器',
  descLocales: { en: 'Provides field layout and validation context within a form.' },
  components: {
    HPopover,
    HPopContent,
    IconHelp,
  },
  props: useFormItemProps,
  slots: useFormItemSlots,
  exposes: useFormItemExposes,
  setup(props, { slots, expose }: HorizonWebSetupContext<{}, FormItemSlots, FormItemExposes>) {
    const classHelper = new ComponentClassBlock('form-item');
    const blockRef = ref<HTMLElement | null>(null);
    const uid = getCurrentInstance()?.uid;
    const error = ref<string | undefined>();
    const nForm = inject(HFormInjectedKey)!;
    const grid = inject(GRID_KEY)!;
    const errorRef = toRef(props, 'error');
    const onlyRenderRef = toRef(nForm, 'onlyRender');

    const labelPosition = computed(() => props.labelPosition ?? nForm.labelPosition);
    const labelJustifyAlign = computed(() => props.labelJustifyAlign ?? nForm.labelJustifyAlign);
    const labelVerticalAlign = computed(() => props.labelVerticalAlign ?? nForm.labelVerticalAlign);
    const gridStyle = useGridItemStyle(props, grid, 'flex');

    provide(HFormItemPropsInjectedKey, props);
    provide(HFormItemSlotsInjectedKey, slots);

    const currentValidateTriggers = computed(() =>
      resolveFormValidateEvents(props.validateTrigger, nForm.validateTrigger),
    );

    onBeforeMount(() => {
      props.label && nForm.setAutoLabelWidth(getTextWidth(props.label));
      nForm.bindValidate({
        uid,
        $el: blockRef,
        props,
        validate,
        resetField,
        clearValidate,
      });
    });

    onMounted(() => {
      syncFieldOptions();
      fieldController.captureInitialValue();
    });

    onBeforeUnmount(() => {
      nForm.unbindValidate(uid);
    });

    watch(
      [onlyRenderRef, errorRef],
      ([onlyRenderValue, errorValue]) => {
        if (onlyRenderValue) {
          error.value = errorValue;
        }
      },
      { immediate: true },
    );

    const requiredMessage = useLocaleLang('form.required');
    const resolveRules = () =>
      props.rules ||
      (nForm.rules && props.prop ? getFormPathValue(nForm.rules, props.prop) : undefined);
    const syncFieldOptions = () => {
      fieldController.setOptions({
        field: props.prop,
        model: nForm.model,
        rules: resolveRules(),
        required: props.required,
        requiredMessage: props.error || requiredMessage.value?.toString(),
        requiredName:
          (props.requiredUseLabel ?? nForm.requiredUseLabel) && props.label
            ? props.label
            : props.prop,
        externalError: props.error,
        onlyRender: nForm.onlyRender,
        onErrorChange: value => {
          error.value = value;
        },
        onValidate: (field, valid, message) => nForm.emit('validate', field, valid, message),
      });
    };
    const fieldController = new FormFieldController({
      onErrorChange: value => {
        error.value = value;
      },
    });

    const validate = async () => {
      if (nForm.onlyRender) {
        return null;
      } else if (!props.prop) {
        return null;
      }
      syncFieldOptions();
      await fieldController.validate();
      return null;
    };

    provide(HFormItemErrorInjectedKey, error);

    const showMark = computed(() => {
      if (!nForm.showRequireMark) {
        return false;
      }

      if (!props.showRequireMark) {
        return false;
      }

      if (!props.label || !props.prop) {
        return false;
      }

      return resolveFormRequiredMark({
        formVisible: nForm.showRequireMark,
        fieldVisible: props.showRequireMark,
        label: props.label,
        field: props.prop,
        rules: resolveRules(),
        required: props.required,
      });
    });

    const labelWidthAdjust = computed(() => {
      // 标签位于 left
      if (labelPosition.value === 'left') {
        const labelWidth = props.labelWidth || nForm.labelWidth;

        // 自适应宽度，要自动按照最大宽度计算
        if (labelWidth === 'auto') {
          if (nForm.autoLabelWidth === 0) {
            return 'auto';
          }
          if (typeof nForm.autoLabelWidth === 'number') {
            return `${nForm.autoLabelWidth}px`;
          }
          return nForm.autoLabelWidth;
        }
        // 用户传入了固定宽度
        if (typeof labelWidth === 'number') {
          return `${labelWidth}px`;
        }
        return labelWidth;
      }
      // 标签位于 top
      return 'auto';
    });

    const helperTheme = computed(() => {
      if (typeof props.helper === 'object' && isDefined(props.helper.theme)) {
        return props.helper.theme;
      }

      if (props.helperTheme) {
        return props.helperTheme;
      }

      if (nForm.helperTheme) {
        return nForm.helperTheme;
      }

      return 'light';
    });

    const resetField = () => {
      syncFieldOptions();
      fieldController.reset();
    };

    const clearValidate = () => {
      fieldController.clear();
    };

    expose({
      validate,
      resetFields: resetField,
      clearValidate,
    });

    /**
     * validate trigger
     */
    const onFormChildItemNotice: HFormItemTriggerType = type => {
      if (currentValidateTriggers.value.includes(type)) {
        void validate().catch(() => undefined);
      }
    };

    provide(HFormItemTriggerInjectedKey, onFormChildItemNotice);

    const helperPlacement = computed(() => props.helperPlacement || nForm.helperPlacement);
    const hasRightHelper = computed(
      () =>
        helperPlacement.value === 'right' &&
        !!(props.helper || slots.helper || slots.helperTitle || slots.helperContent),
    );

    const helperOptions = computed<HFormItemHelper>(() => {
      let defOpts: HFormItemHelper = {
        title: undefined,
        content: '',
        placement: 'top',
        toBody: true,
        trigger: 'hover',
        padding: 8,
      };

      if (typeof props.helper === 'string') {
        defOpts.content = props.helper;
      }

      if (isObject(props.helper)) {
        defOpts = {
          ...defOpts,
          ...props.helper,
        };
      }

      return defOpts;
    });

    const helperRender = () =>
      (props.helper || slots.helper || slots.helperTitle || slots.helperContent) && (
        <HPopover
          trigger={helperOptions.value.trigger}
          toBody={helperOptions.value.toBody}
          placement={helperOptions.value.placement}
          referenceClass={classHelper.em('helper', `reference-${helperPlacement.value}`)}
          theme={helperTheme.value}
          transitionName="tooltip"
        >
          {{
            reference: () => <IconHelp size={16} />,
            popper: () => (
              <HPopContent
                theme={helperTheme.value}
                class={cls(classHelper.e('helper'))}
                style={`${cssVariableKey('popover', 'spacing', 'content', 'padding')}: ${sizeUnitTransform(helperOptions.value.padding)}`}
              >
                {slots.helper?.() ?? (
                  <Fragment>
                    {(helperOptions.value.title || slots.helperTitle) && (
                      <div class={classHelper.em('helper', 'title')}>
                        {slots.helperTitle?.() ??
                          (typeof helperOptions.value.title === 'function'
                            ? helperOptions.value.title()
                            : helperOptions.value.title)}
                      </div>
                    )}
                    <div class={classHelper.em('helper', 'content')}>
                      {slots.helperContent?.() ??
                        (typeof helperOptions.value.content === 'function'
                          ? helperOptions.value.content()
                          : helperOptions.value.content)}
                    </div>
                  </Fragment>
                )}
              </HPopContent>
            ),
          }}
        </HPopover>
      );

    return () => (
      <div
        ref={blockRef}
        class={cls(
          classHelper.block,
          classHelper.m(nForm.resolvedSize),
          classHelper.is(`position-${labelPosition.value}`),
          classHelper.is(`justify-${labelJustifyAlign.value}`),
          classHelper.is(`vertical-${labelVerticalAlign.value}`),
          classHelper.is('inline', nForm.inline && !nForm.gridEnabled),
          classHelper.is('grid-item', nForm.gridEnabled),
          classHelper.is(`spacing-${nForm.spacing}`),
          classHelper.is('error', !!error.value),
        )}
        style={nForm.gridEnabled ? gridStyle.value : undefined}
      >
        {(props.label || slots.label) && (
          <label
            class={classHelper.e('label')}
            style={{
              width: labelWidthAdjust.value,
            }}
          >
            {helperPlacement.value === 'before-label' && helperRender()}
            <span
              class={cls(
                classHelper.e('text'),
                classHelper.is('required', showMark.value),
                classHelper.is(`required-mark-${nForm.requireMarkPosition}`),
              )}
            >
              {slots.label?.() ?? props.label}
            </span>
            {helperPlacement.value === 'after-label' && helperRender()}
            {slots.labelAppend && labelPosition.value === 'top' ? (
              <div class={classHelper.e('label-append')}>{slots.labelAppend()}</div>
            ) : undefined}
          </label>
        )}
        <div class={classHelper.e('wrap')}>
          <div
            class={cls(classHelper.e('content'), classHelper.has('helper', hasRightHelper.value))}
          >
            {slotVNodes(slots.default)}
            {helperPlacement.value === 'right' && helperRender()}
          </div>
          <div class={classHelper.e('ext')}>
            {(slots.error || error.value) && (
              <div class={classHelper.e('error')}>{slots.error?.() ?? error.value}</div>
            )}
            {(slots.tip || props.tip) && (
              <div class={classHelper.e('tip')}>{slots.tip?.() ?? props.tip}</div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
