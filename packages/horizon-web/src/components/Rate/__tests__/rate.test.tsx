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
});
