import { mount } from '@vue/test-utils';
import { HBreadcrumb, HBreadcrumbItem } from '..';
import { describe, expect, test } from 'vitest';
import type { BreadcrumbProps } from '../src/composables/useProps';
import { nextTick, ref } from 'vue';

describe('Breadcrumb.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HBreadcrumb texts={[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]} />
    ));

    const element = wrapper.findComponent(HBreadcrumb);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('breadcrumb size', async () => {
      const size = ref<BreadcrumbProps['size']>('medium');
      const wrapper = mount(() => (
        <HBreadcrumb
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
        <HBreadcrumb size="medium">
          <HBreadcrumbItem>Home</HBreadcrumbItem>
          <HBreadcrumbItem>Components</HBreadcrumbItem>
          <HBreadcrumbItem size="small">Breadcrumb</HBreadcrumbItem>
        </HBreadcrumb>
      ));

      expect(wrapper.classes('n-breadcrumb--medium')).eq(true);
      expect(wrapper.findAll('.h-breadcrumb-item__text')[2].classes('n-breadcrumb-item--small')).eq(
        true,
      );
    });
  });
});
