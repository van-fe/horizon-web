import { mount } from '@vue/test-utils';
import { NBreadcrumb, NBreadcrumbItem } from '../';
import { describe, expect, test } from 'vitest';
import type { BreadcrumbProps } from '../src/composables/useProps';
import { nextTick, ref } from 'vue';

describe('Breadcrumb.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NBreadcrumb texts={[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]} />
    ));

    const element = wrapper.findComponent(NBreadcrumb);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('breadcrumb size', async () => {
      const size = ref<BreadcrumbProps['size']>('medium');
      const wrapper = mount(() => (
        <NBreadcrumb
          size={size.value}
          texts={[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]}
        />
      ));

      expect(wrapper.classes('n-breadcrumb--medium')).eq(true);

      size.value = 'small';

      await nextTick();

      expect(wrapper.classes('n-breadcrumb--small')).eq(true);
    });

    test('breadcrumb-item size', async () => {
      const wrapper = mount(() => (
        <NBreadcrumb size="medium">
          <NBreadcrumbItem>Home</NBreadcrumbItem>
          <NBreadcrumbItem>Components</NBreadcrumbItem>
          <NBreadcrumbItem size="small">Breadcrumb</NBreadcrumbItem>
        </NBreadcrumb>
      ));

      expect(wrapper.classes('n-breadcrumb--medium')).eq(true);
      expect(wrapper.findAll('.n-breadcrumb-item__text')[2].classes('n-breadcrumb-item--small')).eq(
        true,
      );
    });
  });
});
