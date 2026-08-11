import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref, shallowRef } from 'vue';
import { IconCloseFilled } from '@aurora/icon';
import HPickerInput from '../../Picker/src/components/PickerInput';
import { sleep } from '~/utils/tools';

describe('Option.tsx', () => {
  describe('props', () => {
    test('disabled', async () => {
      const value = ref<number[]>([]);

      const optionList = [
        { value: 1, label: '上海', disabled: true },
        { value: 2, label: '北京' },
        { value: 3, label: '合肥' },
      ];

      const wrapper = mount(() => (
        <HSelect v-model={value.value} multiple={true} clearable toBody={false}>
          {optionList.map(option => (
            <HOption
              label={option.label}
              value={option.value}
              disabled={option?.disabled ?? false}
            />
          ))}
        </HSelect>
      ));

      const trigger = wrapper.findComponent(HPickerInput);

      await trigger.trigger('click');

      const option1 = wrapper.find('.h-select-option[data-value="1"]');

      expect(option1.classes('is-disabled')).eq(true);

      value.value.push(1);

      await nextTick();

      const selectedTag = wrapper.find('.h-picker__input .h-tag');

      expect(selectedTag.exists()).eq(true);
      expect(selectedTag.classes('is-show-close')).eq(false);

      await trigger.trigger('mouseenter');

      const clearIcon = wrapper.findComponent(IconCloseFilled);

      expect(clearIcon.exists()).eq(true);

      await clearIcon.trigger('click');

      expect(value.value.length).eq(1);
      expect(value.value[0]).eq(1);
    });

    test('max-lines', async () => {
      const wrapper = mount(
        () => (
          <HSelect toBody={false}>
            <HOption value={1} label="A" maxLines={3} />
            <HOption value={2} label="B" />
            <HOption value={3} label="C" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2, opt3] = wrapper.findAll('.h-select-option');

      expect(opt1.attributes('style')).contains('--h-select-size-option-max-line: 3;');
      expect(opt2.attributes('style')).contains('--h-select-size-option-max-line: 1;');
      expect(opt3.attributes('style')).contains('--h-select-size-option-max-line: 1;');
    });

    test('value set object', async () => {
      const modelValue = shallowRef({ value: 1 });

      const wrapper = mount(
        () => (
          <HSelect v-model={modelValue.value} toBody={false}>
            <HOption value={{ value: 1 }} label="A" />
            <HOption value={{ value: 2 }} label="B" />
            <HOption value={{ value: 3 }} label="C" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2, opt3] = wrapper.findAllComponents(HOption);

      expect(opt1.classes('is-active')).toBeTruthy();
      expect(opt2.classes('is-active')).toBeFalsy();
      expect(opt3.classes('is-active')).toBeFalsy();
      expect(wrapper.find('input').element.value).toEqual('A');
    });

    test('value is boolean', async () => {
      const modelValue = ref();
      const onChange = vi.fn();

      const wrapper = mount(
        () => (
          <HSelect v-model={modelValue.value} toBody={false} onChange={onChange}>
            <HOption value={true} label="TRUE" />
            <HOption value={false} label="FALSE" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2] = wrapper.findAllComponents(HOption);

      expect(modelValue.value).toBeUndefined();
      expect(onChange).toHaveBeenCalledTimes(0);

      await opt1.trigger('click');

      expect(modelValue.value).toBeTruthy();
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(null, true);

      await opt2.trigger('click');

      expect(modelValue.value).toBeFalsy();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(null, false);
    });
  });

  test('renders every scoped option slot and exposes active state', async () => {
    const value = ref('a');
    const scopes: any[] = [];
    const wrapper = mount(() => (
      <HSelect v-model={value.value} toBody={false} showSelectedIcon>
        <HOption
          value="a"
          label="fallback"
          description="fallback description"
          v-slots={{
            labelPrefix: (scope?: any) => <span data-prefix>{scope?.active ? 'active' : 'idle'}</span>,
            label: (scope?: any) => {
              scopes.push(scope);
              return <strong data-label>Custom {scope?.value}</strong>;
            },
            labelSuffix: () => <span data-suffix>suffix</span>,
            description: () => <em data-description>Custom description</em>,
          }}
        />
      </HSelect>
    ));

    await wrapper.findComponent(HPickerInput).trigger('click');
    expect(wrapper.get('[data-prefix]').text()).toBe('active');
    expect(wrapper.get('[data-label]').text()).toBe('Custom a');
    expect(wrapper.get('[data-suffix]').text()).toBe('suffix');
    expect(wrapper.get('[data-description]').text()).toBe('Custom description');
    expect(scopes.at(-1)).toMatchObject({ value: 'a', active: true });
    expect(wrapper.get('.h-select-option').classes()).toContain('is-description-bottom');
  });

  test('parent optionRender overrides the option recipe and receives attrs', async () => {
    const wrapper = mount(() => (
      <HSelect
        toBody={false}
        v-slots={{
          optionRender: (scope?: any) => (
            <button data-parent-render>{scope?.label}:{scope?.['data-code']}</button>
          ),
        }}
      >
        <HOption value="a" label="Alpha" data-code="A1" />
      </HSelect>
    ));

    await wrapper.findComponent(HPickerInput).trigger('click');
    expect(wrapper.get('[data-parent-render]').text()).toBe('Alpha:A1');
    expect(wrapper.find('.h-select-option__inner').exists()).toBe(false);
  });

  test('moves selected options first only when the panel opens', async () => {
    const wrapper = mount(() => (
      <HSelect modelValue="b" toBody={false} selectedOptionOrderToTop>
        <HOption value="a" label="A" />
        <HOption value="b" label="B" />
      </HSelect>
    ));
    const options = wrapper.findAllComponents(HOption);
    expect((options[1].element as HTMLElement).style.order).toBe('1');

    await wrapper.findComponent(HPickerInput).trigger('click');
    expect((options[0].element as HTMLElement).style.order).toBe('1');
    expect((options[1].element as HTMLElement).style.order).toBe('0');
  });

  test('opens real overflow tooltips for label and description pointer events', async () => {
    const wrapper = mount(
      () => (
        <HSelect toBody={false} tooltipShowAfter={0} tooltipHideAfter={0}>
          <HOption value="a" label="Overflow label" description="Overflow description" />
        </HSelect>
      ),
      { attachTo: document.body },
    );
    await wrapper.findComponent(HPickerInput).trigger('click');

    const forceOverflow = (element: Element) => {
      Object.defineProperty(element, 'scrollWidth', { configurable: true, value: 200 });
      Object.defineProperty(element, 'scrollHeight', { configurable: true, value: 40 });
      Object.defineProperty(element, 'getBoundingClientRect', {
        configurable: true,
        value: () => new DOMRect(0, 0, 20, 10),
      });
    };
    const content = wrapper.get('.h-select-option__content');
    forceOverflow(content.element);
    await content.trigger('mouseenter');
    await sleep(0);
    expect(
      Array.from(document.querySelectorAll('.h-tooltip__content')).some(
        tooltip => tooltip.textContent === 'Overflow label',
      ),
    ).toBe(true);

    await content.trigger('mouseleave');
    const description = wrapper.get('.h-select-option__description');
    forceOverflow(description.element);
    await description.trigger('mouseenter');
    await sleep(0);
    expect(
      Array.from(document.querySelectorAll('.h-tooltip__content')).some(
        tooltip => tooltip.textContent === 'Overflow description',
      ),
    ).toBe(true);

    await wrapper.get('.h-select-option').trigger('mouseenter');
    expect(wrapper.get('.h-select-option').classes()).toContain('is-focus');
    await wrapper.get('.h-select-option').trigger('mouseleave');
    wrapper.unmount();
  });
});
