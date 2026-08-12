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
  computed,
} from 'vue';
import { useFormProps } from './composables/useProps';
import type { BindComponent } from './composables/useProps';
import { FormController } from '@aurora/core';
import { scrollFormFieldIntoView } from '@aurora/horizon-web-core';
import type { Arrayable, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { FormEmits } from './composables/useEmits';
import { useFormEmits } from './composables/useEmits';
import { HFormDisabledInjectedKey, HFormInjectedKey } from './utils/injectedKeys';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { FormSlots } from './composables/useSlots';
import { useFormSlots } from './composables/useSlots';
import type { FormExposes } from './composables/useExposes';
import { useFormExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { GRID_KEY, useGridContainerStyle } from '~/components/Layout/src/composables/useGridStyles';

export default defineComponent({
  name: `${useNamespace()}Form`,
  desc: '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据',
  descLocales: { en: 'Form and form-item controls for structured data entry.' },
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
      spacing: spacingRef,
    } = toRefs(props);

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium');
    const gridEnabled = computed(() => props.cols !== undefined);
    const { context: gridContext, style: gridStyle } = useGridContainerStyle(props, 1);

    provide(GlobalSizeInjectedKey, sizeRef);
    provide(HFormDisabledInjectedKey, disabledRef);
    provide(GRID_KEY, gridContext);

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

    const controller = new FormController({
      onFirstInvalid: field => {
        if (props.scrollToError) scrollToField(field);
      },
    });

    const validate = () =>
      controller.snapshot().fieldCount ? controller.validate() : Promise.resolve(true);

    const validateField = (itemProps: Arrayable<string>) => {
      const selected = validateComponents.value.filter(
        item => item.props.prop && itemProps.includes(item.props.prop),
      );
      if (!selected.length) return Promise.resolve(true);
      return controller.validateField(itemProps);
    };

    const resetFields = (props?: Arrayable<string>) => {
      controller.resetFields(props);
    };

    const scrollToField = (prop: string) => {
      const targetFormItem = validateComponents.value.find(item => prop === item.props.prop);
      scrollFormFieldIntoView(targetFormItem?.$el.value);
    };

    const clearValidate = (props?: Arrayable<string>) => {
      controller.clearValidate(props);
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
      controller.register({
        id: component.uid ?? Symbol('form-item'),
        field: component.props.prop,
        validate: async () => {
          await component.validate();
        },
        reset: component.resetField,
        clear: component.clearValidate,
      });
    };

    const unbindValidate = (uid?: number) => {
      const index = validateComponents.value.findIndex(t => t.uid === uid);
      if (index > -1) {
        validateComponents.value.splice(index, 1);
      }
      if (uid !== undefined) controller.unregister(uid);
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
      resolvedSize: sizeRef,
      gridEnabled,
      emit,
    });

    provide(HFormInjectedKey, nForm);

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
          classHelper.m('inline', props.inline && !gridEnabled.value),
          classHelper.m(sizeRef.value),
          classHelper.is('grid', gridEnabled.value),
          classHelper.is(`position-${props.labelPosition}`),
          classHelper.is(`justify-${props.labelJustifyAlign}`),
          classHelper.is(`vertical-${props.labelVerticalAlign}`),
          classHelper.is(`spacing-${spacingRef.value}`),
        )}
        style={gridEnabled.value ? gridStyle.value : undefined}
        onSubmit={onSubmit}
      >
        {slots.default?.()}
      </form>
    );
  },
});
