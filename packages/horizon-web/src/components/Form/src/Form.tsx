import {
  reactive,
  toRefs,
  provide,
  defineComponent,
  ref,
  watch,
  shallowRef,
  toRef,
  onMounted,
} from 'vue';
import { useFormProps } from './composables/useProps';
import type { ValidateReturnType, BindComponent } from './composables/useProps';
import type { Arrayable, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isNil, useNamespace } from '@aurora/utils';
import type { FormEmits } from './composables/useEmits';
import { useFormEmits } from './composables/useEmits';
import { NFormDisabledInjectedKey, NFormInjectedKey } from './utils/injectedKeys';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { FormSlots } from './composables/useSlots';
import { useFormSlots } from './composables/useSlots';
import type { FormExposes } from './composables/useExposes';
import { useFormExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Form`,
  desc: '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据',
  props: useFormProps,
  emits: useFormEmits,
  slots: useFormSlots,
  exposes: useFormExposes,
  setup(props, { slots, expose, emit }: HorizonWebSetupContext<FormEmits, FormSlots, FormExposes>) {
    const classHelper = new ComponentClassBlock('form');

    const formDomRef = ref<HTMLFormElement>();

    const validateComponents = shallowRef<BindComponent[]>([]);

    const {
      rules: rulesRef,
      model: modelRef,
      disabled: disabledRef,
      compact: compactRef,
      spacing: spacingRef,
    } = toRefs(props);

    const hasHelper = ref(false);

    function updateHasHelperStates() {
      hasHelper.value =
        props.helperPlacement === 'right' &&
        validateComponents.value.some(
          curr =>
            !!curr.props.helper &&
            (isNil(curr.props.helperPlacement) || curr.props.helperPlacement === 'right'),
        );
    }

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium');

    provide(GlobalSizeInjectedKey, sizeRef);
    provide(NFormDisabledInjectedKey, disabledRef);

    watch(
      rulesRef,
      () => {
        if (props.validateOnRuleChange) {
          validate().catch(() => {
            // no need to console error
          });
        }
      },
      {
        deep: true,
      },
    );

    watch(
      modelRef,
      () => {
        if (props.validateOnChange) {
          validate().catch(() => {
            // no need to console error
          });
        }
      },
      {
        deep: true,
      },
    );

    const validate = () => {
      if (!validateComponents.value.length) {
        return Promise.resolve(true);
      }

      return new Promise<void>((resolve, reject) => {
        Promise.allSettled(validateComponents.value.map(t => t.validate()))
          .then(res => {
            const rejected = res.filter(item => item.status === 'rejected') as {
              status: 'rejected' | 'fulfilled';
              reason: ValidateReturnType;
            }[];

            if (rejected.length) {
              reject(rejected.map(rej => rej.reason.errors).flat());

              if (props.scrollToError) {
                scrollToField(rejected[0].reason.errors[0].field);
              }
            } else {
              resolve();
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    };

    const validateField = (itemProps: Arrayable<string>) => {
      if (
        !validateComponents.value.filter(
          item => item.props.prop && itemProps.includes(item.props.prop),
        ).length
      ) {
        return Promise.resolve(true);
      }
      return new Promise((resolve, reject) => {
        Promise.allSettled(
          validateComponents.value
            .filter(item => item.props.prop && itemProps.includes(item.props.prop))
            .map(t => t.validate()),
        )
          .then(res => {
            const rejected = res.filter(item => item.status === 'rejected') as {
              status: 'rejected' | 'fulfilled';
              reason: ValidateReturnType;
            }[];

            if (rejected.length) {
              reject(rejected.map(rej => rej.reason.errors).flat());

              if (props.scrollToError) {
                scrollToField(rejected[0].reason.errors[0].field);
              }
            } else {
              resolve(itemProps);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    };

    const resetFields = (props?: Arrayable<string>) => {
      validateComponents.value
        .filter(item => item.props.prop && (!props || (props && props.includes(item.props.prop))))
        .forEach(formItem => {
          formItem.resetField();
        });
    };

    const scrollToField = (prop: string) => {
      const targetFormItem = validateComponents.value.find(item => prop === item.props.prop);
      if (targetFormItem) {
        targetFormItem.$el.value?.scrollIntoView({
          behavior: 'smooth',
        });
      }
    };

    const clearValidate = (props?: Arrayable<string>) => {
      validateComponents.value
        .filter(item => item.props.prop && (!props || (props && props.includes(item.props.prop))))
        .forEach(formItem => {
          formItem.clearValidate();
        });
    };

    expose({
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate,
    });

    const bindValidate = (component: BindComponent) => {
      validateComponents.value.push(component);
      updateHasHelperStates();
    };

    const unbindValidate = (uid?: number) => {
      const index = validateComponents.value.findIndex(t => t.uid === uid);
      if (index > -1) {
        validateComponents.value.splice(index, 1);
      }
      updateHasHelperStates();
    };

    const autoLabelWidth = ref<string | number>('auto');
    const setAutoLabelWidth = (width: number) => {
      if (typeof autoLabelWidth.value !== 'number') {
        autoLabelWidth.value = width;
      } else {
        if (width > autoLabelWidth.value) {
          autoLabelWidth.value = width;
        }
      }
    };

    const nForm = reactive({
      ...toRefs(props),
      bindValidate,
      unbindValidate,
      autoLabelWidth,
      setAutoLabelWidth,
      emit,
    });

    provide(NFormInjectedKey, nForm);

    function onSubmit(e: Event) {
      if (props.preventSubmitDefault) {
        e.preventDefault();
      }

      emit('submit', e);
    }

    onMounted(() => {
      if (formDomRef.value) {
        formDomRef.value.getModel = () => modelRef;
      }
    });

    return () => (
      <form
        ref={formDomRef}
        class={cls(
          classHelper.block,
          classHelper.m('inline', props.inline),
          classHelper.m(sizeRef.value),
          classHelper.is(`position-${props.labelPosition}`),
          classHelper.is(`justify-${props.labelJustifyAlign}`),
          classHelper.is(`vertical-${props.labelVerticalAlign}`),
          classHelper.is(`spacing-${compactRef?.value ? 'compact' : spacingRef.value}`),
          classHelper.has('helper', hasHelper.value),
        )}
        onSubmit={onSubmit}
      >
        {slots.default?.()}
      </form>
    );
  },
});
