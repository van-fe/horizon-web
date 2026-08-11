import { flushPromises, mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HForm from '../src/Form';
import HFormItem from '../src/FormItem';
import HInput from '~/components/Input/src/Input';
import { useFormEmits } from '../src/composables/useEmits';
import type { HFormInstance } from '../src/composables/useProps';
import { localeInjectKey } from '~/provides';

interface FormItemPublicApi {
  validate: () => Promise<unknown>;
  resetFields: () => void;
  clearValidate: () => void;
}

describe('Form public API contracts', () => {
  test('grid, label, required mark and helper props render their public layout', async () => {
    const wrapper = mount(() => (
      <HForm
        cols={3}
        gap={8}
        columnGap={12}
        rowGap={16}
        align="center"
        justify="end"
        labelPosition="left"
        labelJustifyAlign="right"
        labelVerticalAlign="middle"
        labelWidth={120}
        requireMarkPosition="left"
        helperPlacement="before-label"
        helperTheme="light"
        spacing="dynamic"
      >
        <HFormItem
          label="Account"
          prop="account"
          span={2}
          offset={1}
          required
          labelWidth={144}
          helper={{
            title: () => <strong data-test="helper-title-prop">Why</strong>,
            content: () => <span data-test="helper-content-prop">Explanation</span>,
            trigger: 'click',
            placement: 'left',
            toBody: false,
            theme: 'dark',
            padding: '0.75rem',
          }}
          tip="Helpful tip"
        >
          <input data-test="field" />
        </HFormItem>
      </HForm>
    ));
    const form = wrapper.get('form');
    const item = wrapper.get('.h-form-item');
    expect(form.classes()).toEqual(
      expect.arrayContaining([
        'is-grid',
        'is-position-left',
        'is-justify-right',
        'is-vertical-middle',
        'is-spacing-dynamic',
      ]),
    );
    expect(form.attributes('style')).toEqual(expect.stringContaining('--h-grid-row-gap-xs: 16px'));
    expect(form.attributes('style')).toEqual(
      expect.stringContaining('--h-grid-column-gap-xs: 12px'),
    );
    expect(form.attributes('style')).toEqual(expect.stringContaining('place-items: center end'));
    expect(item.attributes('style')).toEqual(expect.stringContaining('--h-grid-item-span-xs: 3'));
    expect(item.attributes('style')).toEqual(expect.stringContaining('--h-grid-item-offset-xs: calc'));
    expect(wrapper.get('.h-form-item__label').attributes('style')).toContain('width: 144px');
    expect(wrapper.get('.h-form-item__text').classes()).toEqual(
      expect.arrayContaining(['is-required', 'is-required-mark-left']),
    );
    expect(wrapper.get('.h-form-item__tip').text()).toBe('Helpful tip');
    expect(wrapper.get('[data-test="field"]').element).toBeInstanceOf(HTMLInputElement);

    const popover = wrapper.findComponent({ name: 'HPopover' });
    expect(popover.props()).toMatchObject({
      trigger: 'click',
      placement: 'left',
      toBody: false,
      theme: 'dark',
    });
    await wrapper.get('.h-popover__reference').trigger('click');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.get('[data-test="helper-title-prop"]').text()).toBe('Why');
    expect(wrapper.get('[data-test="helper-content-prop"]').text()).toBe('Explanation');
    expect(wrapper.get('.h-form-item__helper').attributes('style')).toContain('0.75rem');
  });

  test('onlyRender applies the initial error immediately and ignores validation rules', async () => {
    const formRef = ref<HFormInstance | null>(null);
    const wrapper = mount(() => (
      <HForm ref={formRef} model={{ name: '' }} onlyRender>
        <HFormItem prop="name" label="Name" error="Server error" required>
          <HInput />
        </HFormItem>
      </HForm>
    ));
    await nextTick();
    expect(wrapper.get('.h-form-item').classes()).toContain('is-error');
    expect(wrapper.get('.h-form-item__error').text()).toBe('Server error');
    await expect(formRef.value?.validate()).resolves.toBeUndefined();
  });

  test('requiredUseLabel, scrollToError and expose methods preserve validation payloads', async () => {
    const formRef = ref<HFormInstance | null>(null);
    const onValidate = vi.fn();
    const wrapper = mount(
      () => (
        <HForm
          ref={formRef}
          model={{ account: '' }}
          requiredUseLabel
          scrollToError
          onValidate={onValidate}
        >
          <HFormItem prop="account" label="Account label" required>
            <HInput />
          </HFormItem>
        </HForm>
      ),
      {
        global: {
          provide: {
            [localeInjectKey as symbol]: ref({
              current: 'en',
              langService: {
                td: () => ({ horizonWeb: { form: { required: 'Please enter {prop}' } } }),
              },
            }),
          },
        },
      },
    );
    await nextTick();
    const scrollIntoView = vi.fn();
    Object.defineProperty(wrapper.get('.h-form-item').element, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    await expect(formRef.value?.validate()).rejects.toEqual(expect.any(Array));
    expect(onValidate).toHaveBeenCalledWith(
      'account',
      false,
      expect.stringContaining('Account label'),
    );
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    await expect(formRef.value?.validateField(['account'])).rejects.toEqual(expect.any(Array));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    await expect(formRef.value?.validateField(['missing'])).resolves.toBe(true);
    formRef.value?.clearValidate(['account']);
    await nextTick();
    expect(wrapper.find('.h-form-item__error').exists()).toBe(false);
    formRef.value?.scrollToField('missing');
    formRef.value?.resetFields(['missing']);
  });

  test('empty and valid forms resolve their exposed validation contracts', async () => {
    const emptyRef = ref<HFormInstance | null>(null);
    mount(() => <HForm ref={emptyRef} />);
    await nextTick();
    await expect(emptyRef.value?.validate()).resolves.toBe(true);

    const model = ref({ name: 'Ada' });
    const formRef = ref<HFormInstance | null>(null);
    const onValidate = vi.fn();
    const wrapper = mount(() => (
      <HForm
        ref={formRef}
        model={model.value}
        rules={{ name: { required: true, message: 'Required' } }}
        onValidate={onValidate}
      >
        <HFormItem prop="name" label="Name">
          <HInput v-model={model.value.name} />
        </HFormItem>
      </HForm>
    ));
    await nextTick();

    await expect(formRef.value?.validate()).resolves.toBeUndefined();
    await expect(formRef.value?.validateField(['name'])).resolves.toEqual(['name']);
    expect(onValidate).toHaveBeenCalledWith('name', true, '');

    await wrapper.get('input').setValue('Grace');
    formRef.value?.resetFields(['name']);
    await nextTick();
    expect(model.value.name).toBe('Ada');
    formRef.value?.clearValidate();
  });

  test('rule changes validate by default and preserve the rejected payload', async () => {
    const onValidate = vi.fn();
    const wrapper = mount(HForm, {
      props: {
        model: { name: '' },
        rules: { name: { required: false } },
        onValidate,
      },
      slots: {
        default: () => (
          <HFormItem prop="name">
            <HInput />
          </HFormItem>
        ),
      },
    });

    await wrapper.setProps({ rules: { name: { required: true, message: 'Now required' } } });
    await flushPromises();
    expect(onValidate).toHaveBeenCalledWith('name', false, 'Now required');
    expect(wrapper.get('.h-form-item__error').text()).toBe('Now required');
  });

  test('FormItem validateTrigger overrides support string and array browser events', async () => {
    const blurModel = ref({ name: 'ready' });
    const onBlurValidate = vi.fn();
    const blurWrapper = mount(() => (
      <HForm model={blurModel.value} validateTrigger={false} onValidate={onBlurValidate}>
        <HFormItem prop="name" required validateTrigger="blur">
          <HInput v-model={blurModel.value.name} />
        </HFormItem>
      </HForm>
    ));
    const blurInput = blurWrapper.get('input');
    await blurInput.setValue('');
    expect(onBlurValidate).not.toHaveBeenCalled();
    await blurInput.trigger('focus');
    await blurInput.trigger('blur');
    await flushPromises();
    expect(onBlurValidate).toHaveBeenCalledOnce();

    const arrayModel = ref({ name: 'ready' });
    const onArrayValidate = vi.fn();
    const arrayWrapper = mount(() => (
      <HForm model={arrayModel.value} validateTrigger={false} onValidate={onArrayValidate}>
        <HFormItem prop="name" required validateTrigger={['change', 'blur']}>
          <HInput v-model={arrayModel.value.name} />
        </HFormItem>
      </HForm>
    ));
    const arrayInput = arrayWrapper.get('input');
    await arrayInput.setValue('');
    await arrayInput.trigger('focus');
    await arrayInput.trigger('blur');
    await flushPromises();
    expect(onArrayValidate).toHaveBeenCalledTimes(2);
  });

  test('required marks, automatic label widths and helper theme fallbacks are observable', async () => {
    const wrapper = mount(() => (
      <div>
        <HForm model={{ hidden: '' }} showRequireMark={false} labelPosition="left">
          <HFormItem label="Form hidden" prop="hidden" required />
        </HForm>
        <HForm
          model={{ itemHidden: '', optional: '', arrayRule: '' }}
          labelPosition="left"
          labelWidth="auto"
          helperTheme="dark"
        >
          <HFormItem label="Item hidden" prop="itemHidden" required showRequireMark={false} />
          <HFormItem label="No prop" required />
          <HFormItem label="Optional" prop="optional" />
          <HFormItem
            label="Required array rule"
            prop="arrayRule"
            rules={[{ required: true }]}
            helper="String helper"
            helperTheme="light"
          />
          <HFormItem
            label="Fixed width"
            prop="optional"
            labelWidth="12rem"
            helper={{ title: 'Static title', content: 'Static content', toBody: false }}
          />
        </HForm>
      </div>
    ));

    const labels = wrapper.findAll('.h-form-item__text');
    expect(labels.slice(0, 4).every(label => !label.classes().includes('is-required'))).toBe(true);
    expect(labels[4].classes()).toContain('is-required');

    const labelElements = wrapper.findAll('.h-form-item__label');
    expect(labelElements[1].attributes('style')).toMatch(/width: \d+(?:\.\d+)?px/);
    expect(labelElements[5].attributes('style')).toContain('width: 12rem');

    const popovers = wrapper.findAllComponents({ name: 'HPopover' });
    expect(popovers[0].props('theme')).toBe('light');
    expect(popovers[1].props('theme')).toBe('dark');
    const references = wrapper.findAll('.h-popover__reference');
    await references[0].trigger('mouseenter');
    await references[1].trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(document.body.textContent).toContain('String helper');
    expect(wrapper.text()).toContain('Static title');
    expect(wrapper.text()).toContain('Static content');
  });

  test('FormItem exposes no-prop validation, resetFields and clearValidate', async () => {
    const itemRef = ref<FormItemPublicApi | null>(null);
    mount(() => (
      <HForm>
        <HFormItem ref={itemRef} error="Server error">
          <HInput />
        </HFormItem>
      </HForm>
    ));
    await nextTick();

    await expect(itemRef.value?.validate()).resolves.toBeNull();
    expect(itemRef.value?.resetFields).toEqual(expect.any(Function));
    itemRef.value?.resetFields();
    itemRef.value?.clearValidate();
  });

  test('submit can preserve native default and rule changes can skip automatic validation', async () => {
    const onSubmit = vi.fn();
    const onValidate = vi.fn();
    const wrapper = mount(HForm, {
      props: {
        model: { name: '' },
        rules: { name: { required: true, message: 'Required' } },
        preventSubmitDefault: false,
        validateOnRuleChange: false,
        onSubmit,
        onValidate,
      },
      slots: {
        default: () => (
          <HFormItem prop="name">
            <HInput />
          </HFormItem>
        ),
      },
    });
    const event = new Event('submit', { bubbles: true, cancelable: true });
    wrapper.element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(onSubmit).toHaveBeenCalledWith(event);

    await wrapper.setProps({ rules: { name: { min: 2, message: 'Too short' } } });
    await flushPromises();
    expect(onValidate).not.toHaveBeenCalled();
  });

  test('emit validators enforce browser submit and validation result contracts', () => {
    const event = new Event('submit');
    expect(useFormEmits.submit(event)).toBe(true);
    expect(useFormEmits.submit({} as Event)).toBe(false);
    expect(useFormEmits.validate('name', true)).toBe(true);
    expect(useFormEmits.validate('name', false, 'Required')).toBe(true);
    expect(useFormEmits.validate('name', false, 1 as never)).toBe(false);
  });
});
