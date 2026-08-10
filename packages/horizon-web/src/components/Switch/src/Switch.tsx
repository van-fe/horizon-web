import { defineComponent, inject, toRefs } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useSwitchProps } from './composables/useProps';
import type { SwitchEmits } from './composables/useEmits';
import { useSwitchEmits } from './composables/useEmits';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import useSize from '~/utils/useSize';
import useLocaleLang from '~/utils/useLocaleLang';
import { useSwitchState } from './composables/useSwitchState';

export default defineComponent({
  name: `${useNamespace()}Switch`,
  desc: '开关选择器组件',
  descLocales: { en: 'Switch control for toggling between two states.' },
  props: useSwitchProps,
  emits: useSwitchEmits,
  setup(props, { emit }: HorizonWebSetupContext<SwitchEmits>) {
    const {
      modelValue: modelValueRef,
      status: statusRef,
      statusPosition: statusPositionRef,
      statusOnText: statusOnTextRef,
      statusOffText: statusOffTextRef,
      label: labelRef,
      labelPosition: labelPositionRef,
      readonly: readonlyRef,
      size,
    } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium', { normal: 'medium' });

    /** formItemTrigger **/
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const {
      disabled: isDisabled,
      onBlur,
      onChange,
      pending,
    } = useSwitchState(props, formDisabled, formItemTrigger, emit);

    const classHelper = new ComponentClassBlock('switch');

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
        onClick={() => onChange()}
      >
        {labelRef.value && <span class={classHelper.e('label')}>{labelRef.value}</span>}
        <span class={classHelper.e('main')}>
          <span
            class={cls(
              classHelper.e('core'),
              classHelper.is('disabled', isDisabled.value),
              classHelper.is('active', modelValueRef.value),
              classHelper.is('readonly', readonlyRef.value),
              classHelper.is(
                'with-inner-text',
                statusRef.value && statusPositionRef.value === 'inside',
              ),
            )}
          >
            <input
              data-focus-visible-proxy
              role="switch"
              type="checkbox"
              readonly={readonlyRef.value}
              disabled={isDisabled.value}
              checked={modelValueRef.value}
              aria-checked={modelValueRef.value}
              aria-disabled={isDisabled.value}
              aria-readonly={readonlyRef.value}
              aria-busy={pending.value || undefined}
              aria-label={labelRef.value || undefined}
              onClick={evt => evt.stopPropagation()}
              onChange={() => onChange()}
              onBlur={onBlur}
            />
            {statusRef.value && statusPositionRef.value === 'inside' && (
              <span
                aria-hidden="true"
                class={cls(
                  classHelper.e('inner-text'),
                  classHelper.is('active', modelValueRef.value),
                )}
              >
                {modelValueRef.value
                  ? statusOnTextRef.value || useLocaleLang('switch.on').value
                  : statusOffTextRef.value || useLocaleLang('switch.off').value}
              </span>
            )}
            <span class={cls(classHelper.e('inner'))}></span>
          </span>
          {statusRef.value && statusPositionRef.value === 'outside' && (
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
