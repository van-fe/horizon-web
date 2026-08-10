import { mount } from '@vue/test-utils';
import { HDescriptions, HDescriptionItem } from '../index';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Descriptions.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HDescriptions title="User Info">
        <HDescriptionItem label="Name:" value="bingkun Zhou" />
        <HDescriptionItem label="Telephone:" value="0924-250492" />
        <HDescriptionItem label="Residence:" value="Norway" />
        <HDescriptionItem label="City:" value="Oslo" />
        <HDescriptionItem label="Address:" value="Leg.Kiropraktor Iréne Johnson" />
      </HDescriptions>
    ));
    const element = wrapper.findComponent(HDescriptions);
    const itemElements = wrapper.findAllComponents(HDescriptionItem);

    expect(element.exists()).toBe(true);
    expect(itemElements.length).toBe(5);
  });

  test('renders title and item slots in preference to prop fallbacks', () => {
    const wrapper = mount(() => (
      <HDescriptions title="Fallback title" v-slots={{ title: () => <h2>Slot title</h2> }}>
        <HDescriptionItem
          label="Fallback label"
          value="Fallback value"
          v-slots={{ label: () => <strong>Slot label</strong>, default: () => 'Slot value' }}
        />
      </HDescriptions>
    ));

    expect(wrapper.get('.h-descriptions__title').text()).toBe('Slot title');
    expect(wrapper.get('.h-descriptions__label').text()).toBe('Slot label');
    expect(wrapper.get('.h-descriptions__value').text()).toBe('Slot value');
    expect(wrapper.text()).not.toContain('Fallback value');
  });

  test('applies columns, spans, border and custom classes', () => {
    const wrapper = mount(() => (
      <HDescriptions column={4} border labelClass="custom-label" valueClass="custom-value">
        <HDescriptionItem label="Name" value="Ada" spanCol={2} spanRow={3} />
      </HDescriptions>
    ));
    const content = wrapper.get('.h-descriptions__content');
    const item = wrapper.get('.h-descriptions__item');

    expect(content.classes()).toContain('h-descriptions--border');
    expect(content.attributes('style')).toContain('grid-template-columns: repeat(4, 1fr)');
    expect((item.element as HTMLElement).style.gridColumn).toBe('span 2');
    expect((item.element as HTMLElement).style.gridRow).toBe('span 3');
    expect(wrapper.get('.h-descriptions__label').classes()).toContain('custom-label');
    expect(wrapper.get('.h-descriptions__value').classes()).toContain('custom-value');
  });

  test('updates layout and values when controlled props change', async () => {
    const vertical = ref(false);
    const value = ref('before');
    const wrapper = mount(() => (
      <HDescriptions
        type={vertical.value ? 'vertical' : 'horizontal'}
        labelPosition={vertical.value ? 'top' : 'left'}
      >
        <HDescriptionItem label="State" value={value.value} />
      </HDescriptions>
    ));

    expect(wrapper.get('.h-descriptions__item').attributes('style')).toContain('display: flex');
    vertical.value = true;
    value.value = 'after';
    await nextTick();
    expect(wrapper.get('.h-descriptions').classes()).toContain('h-descriptions--vertical');
    expect(wrapper.get('.h-descriptions__item').classes()).toContain(
      'h-descriptions__item--vertical',
    );
    expect(wrapper.get('.h-descriptions__item').attributes('style')).toContain('display: block');
    expect(wrapper.get('.h-descriptions__value').text()).toBe('after');
  });
});
