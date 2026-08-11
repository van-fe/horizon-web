import { mount, shallowMount } from '@vue/test-utils';
import HRate from '../src/Rate';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';

describe('Rate.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HRate modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HRate);

    expect(element.exists()).toBe(true);
  });

  test('exposes slider semantics and keyboard controls', async () => {
    const modelValue = ref(2);
    const wrapper = mount(() => <HRate v-model={modelValue.value} count={5} />);
    const slider = wrapper.find('[role="slider"]');

    expect(slider.attributes('aria-valuenow')).toBe('2');
    await slider.trigger('keydown', { key: 'ArrowRight' });
    expect(modelValue.value).toBe(3);
  });

  test('clamps Home and End keyboard changes and emits both public events', async () => {
    const modelValue = ref(2);
    const onChange = vi.fn();
    const wrapper = mount(() => <HRate v-model={modelValue.value} count={4} onChange={onChange} />);
    const rate = wrapper.findComponent(HRate);
    const slider = wrapper.find('[role="slider"]');

    await slider.trigger('keydown', { key: 'End' });
    expect(modelValue.value).toBe(4);
    expect(onChange).toHaveBeenLastCalledWith(4);

    await slider.trigger('keydown', { key: 'Home' });
    expect(modelValue.value).toBe(0);
    expect(rate.emitted('update:modelValue')).toEqual([[4], [0]]);
  });

  test('supports half-step pointer and keyboard input', async () => {
    const modelValue = ref(2);
    const wrapper = mount(() => <HRate v-model={modelValue.value} half />);

    await wrapper.findAll('.h-rate__icon')[2].trigger('click', { offsetX: 1 });
    expect(modelValue.value).toBe(2.5);

    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' });
    expect(modelValue.value).toBe(2);
  });

  test.each([
    ['disabled', { disabled: true }],
    ['readonly', { readonly: true }],
  ] as const)('%s mode prevents pointer and keyboard updates', async (_, props) => {
    const modelValue = ref(2);
    const onChange = vi.fn();
    const wrapper = mount(() => <HRate {...props} v-model={modelValue.value} onChange={onChange} />);
    const slider = wrapper.find('[role="slider"]');

    await wrapper.findAll('.h-rate__icon')[3].trigger('click');
    await slider.trigger('keydown', { key: 'End' });

    expect(modelValue.value).toBe(2);
    expect(onChange).not.toHaveBeenCalled();
    expect(slider.attributes('disabled' in props ? 'aria-disabled' : 'aria-readonly')).toBe(
      'true',
    );
  });

  test('renders custom tooltip text for the current score', () => {
    const wrapper = mount(() => (
      <HRate modelValue={2} count={3} showTooltip tooltip={['Low', 'Medium', 'High']} />
    ));

    expect(wrapper.find('.h-rate__tooltip').text()).toBe('Medium');
  });

  test('maps custom icon presentation props to every rating item', () => {
    const wrapper = mount(() => (
      <HRate
        modelValue={2}
        count={3}
        size={24}
        icon="heart"
        color="rgb(255, 0, 0)"
        voidColor="rgb(0, 0, 255)"
        gutter={7}
      />
    ));
    const icons = wrapper.findAll('.h-rate__icon');

    expect(icons).toHaveLength(3);
    expect((icons[0].element as HTMLElement).style.color).toBe('rgb(255, 0, 0)');
    expect((icons[2].element as HTMLElement).style.color).toBe('rgb(0, 0, 255)');
    expect((icons[0].element as HTMLElement).style.fontSize).toBe('24px');
    expect((icons[0].element as HTMLElement).style.marginRight).toBe('7px');
    expect(icons.every(item => item.find('svg').classes().some(name => name.includes('heart')))).toBe(
      true,
    );
  });

  test('uses disabledColor and emits a native FocusEvent on blur', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(() => (
      <HRate modelValue={1} disabled disabledColor="rgb(1, 2, 3)" onBlur={onBlur} />
    ));

    expect((wrapper.get('.h-rate__icon').element as HTMLElement).style.color).toBe(
      'rgb(1, 2, 3)',
    );
    await wrapper.get('[role="slider"]').trigger('blur');
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
  });

  test('renders the default slot for full, half and void rating states', () => {
    const wrapper = mount(HRate, {
      props: { modelValue: 1.5, count: 3, half: true },
      slots: { default: '<span data-rate-slot>★</span>' },
    });

    expect(wrapper.findAll('[data-rate-slot]')).toHaveLength(4);
    expect(wrapper.find('.h-rate--half').exists()).toBe(false);
    expect(wrapper.findAll('.h-rate__icon')[1].findAll('[data-rate-slot]')).toHaveLength(2);
  });

  test('uses numeric-size half hit testing and covers vertical/unrelated keyboard paths', async () => {
    const value = ref(1);
    const wrapper = mount(() => <HRate v-model={value.value} half size={24} count={3} />);
    await wrapper.findAll('.h-rate__icon')[1].trigger('click', { offsetX: 5 });
    expect(value.value).toBe(1.5);

    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowUp' });
    expect(value.value).toBe(2);
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowDown' });
    expect(value.value).toBe(1.5);
    const before = value.value;
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'KeyA' });
    expect(value.value).toBe(before);
  });

  test('falls back to the numeric value when custom tooltip entries do not match count', () => {
    const wrapper = mount(() => (
      <HRate modelValue={2} count={3} showTooltip tooltip={['Only one']} />
    ));
    expect(wrapper.get('.h-rate__tooltip').text()).toBe('2');
  });
});
