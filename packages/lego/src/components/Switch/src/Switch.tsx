import { computed, defineComponent, inject, nextTick, toRefs } from 'vue';
import {
  cls,
  ComponentClassBlock,
  isBoolean,
  isDefined,
  isUndefined,
  useNamespace,
} from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { useSwitchProps } from './composables/useProps';
import type { SwitchEmits } from './composables/useEmits';
import { useSwitchEmits } from './composables/useEmits';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import useSize from '~/utils/useSize';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}Switch`,
  desc: '开关选择器组件',
  props: useSwitchProps,
  emits: useSwitchEmits,
  setup(props, { emit }: LegoSetupContext<SwitchEmits>) {
    const {
      modelValue: modelValueRef,
      status: statusRef,
      statusOnText: statusOnTextRef,
      statusOffText: statusOffTextRef,
      label: labelRef,
      labelPosition: labelPositionRef,
      disabled: disabledRef,
      readonly: readonlyRef,
      size,
    } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium', { normal: 'medium' });

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabledRef?.value ?? formDisabled?.value ?? false);

    const onChange = async () => {
      if (isDisabled.value || readonlyRef.value) {
        return;
      }
      const newVal = !modelValueRef.value;

      if (isDefined(props.beforeChange)) {
        if (isBoolean(props.beforeChange)) {
          props.beforeChange && doChange(newVal);
        } else {
          Promise.resolve<boolean | undefined>(props.beforeChange(newVal))
            .then(res => {
              if ((isDefined(res) && res) || isUndefined(res)) {
                doChange(newVal);
              }
            })
            .catch(() => {
              // no nothing
            });
        }
      } else {
        doChange(newVal);
      }
    };

    const doChange = (newVal: boolean) => {
      emit('update:modelValue', newVal);
      emit('change', newVal);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    };

    const classHelper = new ComponentClassBlock('switch');

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(labelPositionRef.value),
          classHelper.m('active', modelValueRef.value),
          classHelper.m('sm', sizeRef.value === 'small'),
          classHelper.m(sizeRef.value),
          classHelper.m('disabled', isDisabled.value),
        )}
      >
        {labelRef.value && (
          <span class={classHelper.e('label')} onClick={() => onChange()}>
            {labelRef.value}
          </span>
        )}
        <span class={classHelper.e('main')}>
          <span
            class={cls(
              classHelper.e('core'),
              classHelper.is('disabled', isDisabled.value),
              classHelper.is('active', modelValueRef.value),
              classHelper.is('readonly', readonlyRef.value),
            )}
            onClick={() => onChange()}
          >
            <input
              role="switch"
              type="checkbox"
              readonly={readonlyRef.value}
              checked={modelValueRef.value}
              aria-checked={modelValueRef.value}
              aria-disabled={isDisabled.value}
              onBlur={onBlur}
            />
            <span class={cls(classHelper.e('inner'))}></span>
          </span>
          {statusRef.value && (
            <span class={classHelper.e('status')}>
              {modelValueRef.value
                ? statusOnTextRef.value || useLocaleLang('switch.on').value
                : statusOffTextRef.value || useLocaleLang('switch.off').value}
            </span>
          )}
        </span>
      </div>
    );
  },
});
