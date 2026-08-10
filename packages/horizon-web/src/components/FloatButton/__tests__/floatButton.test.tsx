import { mount } from '@vue/test-utils';
import { HFloatButton, HFloatButtonGroup } from '..';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

describe('FloatButton.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HFloatButton />);
    const element = wrapper.findComponent(HFloatButton);

    expect(element.exists()).toBe(true);
  });

  test('renders public content, shape/type, tooltip and badge options', () => {
    const wrapper = mount(() => (
      <HFloatButton
        type="primary"
        shape="square"
        description="Create"
        tooltip="Create item"
        badge={{ type: 'num', content: 7 }}
        data-test="create"
      />
    ));
    const button = wrapper.get('.h-float-button');

    expect(button.classes()).toContain('h-float-button--primary');
    expect(button.classes()).toContain('h-float-button--square');
    expect(button.attributes('data-test')).toBe('create');
    expect(wrapper.get('.h-float-button__description').text()).toBe('Create');
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('content')).toBe('Create item');
    expect(wrapper.findComponent({ name: 'HBadge' }).props('content')).toBe(7);
  });

  test('emits the native click event and honors dynamic visibility', async () => {
    const visible = ref(true);
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HFloatButton visible={visible.value} description="Action" onClick={onClick} />
    ));

    await wrapper.get('.h-float-button').trigger('click');
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    visible.value = false;
    await nextTick();
    expect(wrapper.get('.h-float-button').attributes('style')).toContain('display: none');
  });

  test('group overrides child shape and type', () => {
    const wrapper = mount(() => (
      <HFloatButtonGroup shape="square" type="primary">
        <HFloatButton shape="circle" type="normal" description="Grouped" />
      </HFloatButtonGroup>
    ));
    const button = wrapper.get('.h-float-button');

    expect(button.classes()).toContain('h-float-button--square');
    expect(button.classes()).toContain('h-float-button--primary');
  });
});
