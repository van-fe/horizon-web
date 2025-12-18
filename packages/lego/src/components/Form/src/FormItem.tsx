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
import type { NFormRule, NFormItemHelper } from './composables/useProps';
import { useFormItemProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import {
  slotVNodes,
  ComponentClassBlock,
  getTextWidth,
  cls,
  isDefined,
  isUndefined,
  useNamespace,
  isObject,
  sizeUnitTransform,
  cssVariableKey,
} from '@nio-fe/shared';
import Schema from 'async-validator';
import type { NFormItemTriggerType } from './utils/injectedKeys';
import {
  NFormInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
  NFormItemTriggerInjectedKey,
} from './utils/injectedKeys';
import { getProp } from './utils/helper';
import { IconHelp } from '@nio-fe/icon';
import NPopover from '~/components/Popover/src/Popover';
import NPopContent from '~/components/Popover/src/PopContent';
import type { FormItemSlots } from './composables/useSlots';
import { useFormItemSlots } from './composables/useSlots';
import type { FormItemExposes } from './composables/useExposes';
import { useFormItemExposes } from './composables/useExposes';
import clone from 'lodash/clone';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}FormItem`,
  components: {
    NPopover,
    NPopContent,
    IconHelp,
  },
  props: useFormItemProps,
  slots: useFormItemSlots,
  exposes: useFormItemExposes,
  setup(props, { slots, expose }: LegoSetupContext<{}, FormItemSlots, FormItemExposes>) {
    const classHelper = new ComponentClassBlock('form-item');
    const blockRef = ref<HTMLElement | null>(null);
    const uid = getCurrentInstance()?.uid;
    const error = ref<string | undefined>();
    const nForm = inject(NFormInjectedKey)!;
    const errorRef = toRef(props, 'error');
    const onlyRenderRef = toRef(nForm, 'onlyRender');
    let initialValue: any = undefined;

    provide(NFormItemPropsInjectedKey, props);
    provide(NFormItemSlotsInjectedKey, slots);

    const currentValidateTriggers = computed(() => {
      let validateTrigger: Array<'change' | 'blur'> = [];

      if (typeof props.validateTrigger === 'string' && !!props.validateTrigger) {
        validateTrigger.push(props.validateTrigger);
      } else if (Array.isArray(props.validateTrigger) && props.validateTrigger.length) {
        validateTrigger = [...validateTrigger, ...props.validateTrigger];
      } else if (props.validateTrigger === false) {
        validateTrigger = [];
      } else if (typeof nForm.validateTrigger === 'string' && !!nForm.validateTrigger) {
        validateTrigger.push(nForm.validateTrigger);
      } else if (Array.isArray(nForm.validateTrigger) && nForm.validateTrigger.length) {
        validateTrigger = [...validateTrigger, ...nForm.validateTrigger];
      }

      return validateTrigger;
    });

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
      if (props.prop) {
        const computedValue = getProp(nForm.model, props.prop);
        initialValue = clone(computedValue.value);
      }
    });

    onBeforeUnmount(() => {
      nForm.unbindValidate(uid);
    });

    watch([onlyRenderRef, errorRef], ([onlyRenderValue, errorValue]) => {
      if (onlyRenderValue) {
        error.value = errorValue;
      }
    });

    const requiredMessage = useLocaleLang('form.required');

    const validate = () => {
      if (nForm.onlyRender) {
        return Promise.resolve(null);
      } else if (!props.prop) {
        return Promise.resolve(null);
      }

      let rule: NFormRule | NFormRule[] | undefined =
        props.rules || (nForm.rules && getProp(nForm.rules, props.prop).value);

      if (!rule) {
        if (!props.required) return Promise.resolve(null);
        else {
          rule = {
            required: true,
            message:
              props.error ||
              requiredMessage.value
                ?.toString()
                .replace(
                  '{prop}',
                  (props.requiredUseLabel ?? nForm.requiredUseLabel)
                    ? (props.label ?? props.prop)
                    : props.prop,
                ),
          };
        }
      }

      let value = getProp(nForm.model, props.prop).value;

      if (typeof value === 'string') {
        value = value.trim();
      }

      const validator = new Schema({
        [props.prop]: rule,
      });

      return validator.validate({ [props.prop]: value }, errors => {
        if (errors?.length) {
          nForm.emit('validate', props.prop!, false, errors[0].message);
          nForm.emit('validateChange', false);
          error.value = errors[0].message;
        } else {
          nForm.emit('validate', props.prop!, true, '');
          nForm.emit('validateChange', true);
          error.value = '';
        }
      });
    };

    provide(NFormItemErrorInjectedKey, error);

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

      const rules = props.rules || (nForm.rules && getProp(nForm.rules, props.prop).value);

      if (!rules && isUndefined(props.required)) {
        return false;
      }

      return Array.isArray(rules) ? rules.some(t => t.required) : rules?.required || props.required;
    });

    const labelWidthAdjust = computed(() => {
      // 标签位于 left
      if (nForm.labelPosition === 'left') {
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
      if (nForm.model && props.prop) {
        const computedValue = getProp(nForm.model, props.prop);
        computedValue.value = clone(initialValue);
      }

      clearValidate();
    };

    const clearValidate = () => {
      error.value = '';
    };

    expose({
      validate,
      resetField,
      clearValidate,
    });

    /**
     * validate trigger
     */
    const onFormChildItemNotice: NFormItemTriggerType = type => {
      if (currentValidateTriggers.value.includes(type)) {
        validate();
      }
    };

    provide(NFormItemTriggerInjectedKey, onFormChildItemNotice);

    const helperPlacement = computed(() => props.helperPlacement || nForm.helperPlacement);

    const helperOptions = computed<NFormItemHelper>(() => {
      let defOpts: NFormItemHelper = {
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
        <NPopover
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
              <NPopContent
                theme={helperTheme.value}
                class={cls(classHelper.e('helper'))}
                style={`${cssVariableKey('popover-padding--content')}: ${sizeUnitTransform(helperOptions.value.padding)}`}
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
              </NPopContent>
            ),
          }}
        </NPopover>
      );

    return () => (
      <div
        ref={blockRef}
        class={cls(
          classHelper.block,
          classHelper.is(`justify-${props.labelJustifyAlign}`, isDefined(props.labelJustifyAlign)),
          classHelper.is(
            `vertical-${props.labelVerticalAlign}`,
            isDefined(props.labelVerticalAlign),
          ),
          classHelper.is('error', !!error.value),
        )}
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
            {slots.labelAppend && nForm.labelPosition === 'top' ? (
              <div class={classHelper.e('label-append')}>{slots.labelAppend()}</div>
            ) : undefined}
          </label>
        )}
        <div class={classHelper.e('wrap')}>
          <div class={cls(classHelper.e('content'), classHelper.has('helper', !!props.helper))}>
            {slotVNodes(slots.default)}
            {helperPlacement.value === 'right' && helperRender()}
          </div>
          <div class={classHelper.e('ext')}>
            {(slots.error || error.value) && (
              <div class={classHelper.e('error')}>{slots.error?.() ?? error.value}</div>
            )}
            {(slots.tip || slots.tips || props.tip) && (
              <div class={classHelper.e('tip')}>{slots.tips?.() ?? slots.tip?.() ?? props.tip}</div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
