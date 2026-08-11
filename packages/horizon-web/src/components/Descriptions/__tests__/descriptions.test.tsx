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

  test('applies the explicit component size', () => {
    const wrapper = mount(() => (
      <HDescriptions size="small" title="Compact">
        <HDescriptionItem label="Name" value="Ada" />
      </HDescriptions>
    ));

    expect(wrapper.get('.h-descriptions__content').classes()).toContain('h-descriptions--small');
    expect(wrapper.get('.h-descriptions__title').classes()).toContain(
      'h-descriptions__title--small',
    );
  });

  test('renders an empty public default slot without synthesizing items', () => {
    const wrapper = mount(HDescriptions, { props: { title: 'Empty details' } });

    expect(wrapper.get('.h-descriptions__title').text()).toBe('Empty details');
    expect(wrapper.findAll('.h-descriptions__item')).toHaveLength(0);
  });

  test.each([
    { width: 400, breakpoint: 'xs', column: 1, span: 5 },
    { width: 600, breakpoint: 'sm', column: 2, span: 4 },
    { width: 900, breakpoint: 'md', column: 3, span: 3 },
    { width: 1300, breakpoint: 'lg', column: 4, span: 2 },
    { width: 1700, breakpoint: 'xl', column: 5, span: 1 },
  ])(
    'uses $breakpoint responsive columns and item spans at $width px',
    async ({ width, column, span }) => {
      const wrapper = mount(HDescriptions, {
        props: { type: 'vertical', column: 6, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
        attrs: { style: `width: ${width}px` },
        slots: {
          default: () => (
            <HDescriptionItem
              label="Responsive"
              value="Value"
              spanCol={6}
              xs={5}
              sm={4}
              md={3}
              lg={2}
              xl={1}
            />
          ),
        },
        attachTo: document.body,
      });

      await new Promise(resolve => setTimeout(resolve, 80));
      await nextTick();
      expect(wrapper.get('.h-descriptions__content').attributes('style')).toContain(
        `grid-template-columns: repeat(${column}, 1fr)`,
      );
      expect((wrapper.get('.h-descriptions__item').element as HTMLElement).style.gridColumn).toBe(
        `span ${span}`,
      );
      wrapper.unmount();

      const fallback = mount(HDescriptions, {
        props: { type: 'vertical', column: 6 },
        attrs: { style: `width: ${width}px` },
        slots: {
          default: () => (
            <HDescriptionItem label="Fallback" value="Value" spanCol={6} />
          ),
        },
        attachTo: document.body,
      });
      await new Promise(resolve => setTimeout(resolve, 80));
      await nextTick();
      expect(fallback.get('.h-descriptions__content').attributes('style')).toContain(
        'grid-template-columns: repeat(6, 1fr)',
      );
      expect(
        (fallback.get('.h-descriptions__item').element as HTMLElement).style.gridColumn,
      ).toBe('span 6');
      fallback.unmount();
    },
  );
});
