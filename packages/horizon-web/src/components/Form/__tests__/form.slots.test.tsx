import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HForm from '~/components/Form/src/Form';
import HFormItem from '~/components/Form/src/FormItem';
import { nextTick, ref } from 'vue';
import type { FormProps } from '../src/composables/useProps';

describe('Form.tsx slots', () => {
  test('label-append', async () => {
    const labelPosition = ref<FormProps['labelPosition']>('top');

    const wrapper = mount(
      () => (
        <HForm labelPosition={labelPosition.value}>
          <HFormItem>
            {{
              default: () => <div>default slot</div>,
              label: () => 'Tag',
              labelAppend: () => 'LABEL APPEHD',
            }}
          </HFormItem>
        </HForm>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.h-form-item__label-append').exists()).toBeTruthy();

    labelPosition.value = 'left';

    await nextTick();

    expect(wrapper.find('.h-form-item__label-append').exists()).toBeFalsy();
  });

  test('renders every FormItem slot in its public region', async () => {
    const wrapper = mount(() => (
      <HForm model={{ name: '' }}>
        <HFormItem
          prop="name"
          error="Invalid"
          tip="Fallback tip"
          helper={{ content: '', toBody: false }}
        >
          {{
            default: () => <input data-test="field" />,
            label: () => <span data-test="label">Name</span>,
            labelAppend: () => <span data-test="label-append">Optional</span>,
            helper: () => <span data-test="helper">Helper body</span>,
            tip: () => <span data-test="tip">Custom tip</span>,
            error: () => <span data-test="error">Custom error</span>,
          }}
        </HFormItem>
      </HForm>
    ));

    expect(wrapper.find('[data-test="field"]').exists()).toBe(true);
    expect(wrapper.get('[data-test="label"]').text()).toBe('Name');
    expect(wrapper.get('[data-test="label-append"]').text()).toBe('Optional');
    expect(wrapper.get('[data-test="tip"]').text()).toBe('Custom tip');
    expect(wrapper.get('[data-test="error"]').text()).toBe('Custom error');
    await wrapper.get('.h-popover__reference').trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.get('[data-test="helper"]').text()).toBe('Helper body');
  });

  test('renders helperTitle/helperContent and forwards helper behavior options', async () => {
    const wrapper = mount(() => (
      <HForm helperPlacement="right" helperTheme="dark">
        <HFormItem
          label="Account"
          helper={{ content: 'Fallback', trigger: 'click', toBody: false, placement: 'right' }}
        >
          {{
            helperTitle: () => <strong data-test="helper-title">Why?</strong>,
            helperContent: () => <span data-test="helper-content">Explanation</span>,
          }}
        </HFormItem>
      </HForm>
    ));
    const popover = wrapper.findComponent({ name: 'HPopover' });

    expect(popover.props()).toMatchObject({
      trigger: 'click',
      toBody: false,
      placement: 'right',
      theme: 'dark',
    });
    expect(wrapper.get('.h-form-item__content').classes()).toContain('has-helper');
    await wrapper.get('.h-popover__reference').trigger('click');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.get('[data-test="helper-title"]').text()).toBe('Why?');
    expect(wrapper.get('[data-test="helper-content"]').text()).toBe('Explanation');
  });

  test('emits one native submit and honors preventSubmitDefault', async () => {
    const onSubmit = vi.fn();
    const wrapper = mount(HForm, {
      props: { preventSubmitDefault: true, onSubmit },
      slots: { default: () => <button type="submit">Submit</button> },
    });
    const event = new Event('submit', { bubbles: true, cancelable: true });
    wrapper.element.dispatchEvent(event);
    await nextTick();

    expect(event.defaultPrevented).toBe(true);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBe(event);
  });
});
