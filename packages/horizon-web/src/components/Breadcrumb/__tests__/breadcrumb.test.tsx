import { mount } from '@vue/test-utils';
import { HBreadcrumb, HBreadcrumbItem } from '..';
import { describe, expect, test } from 'vitest';
import type { BreadcrumbProps } from '../src/composables/useProps';
import { createSSRApp, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';

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

      expect(wrapper.classes('h-breadcrumb--medium')).eq(true);

      size.value = 'small';

      await nextTick();

      expect(wrapper.classes('h-breadcrumb--small')).eq(true);
    });

    test('breadcrumb-item size', async () => {
      const wrapper = mount(() => (
        <HBreadcrumb size="medium">
          <HBreadcrumbItem>Home</HBreadcrumbItem>
          <HBreadcrumbItem>Components</HBreadcrumbItem>
          <HBreadcrumbItem size="small">Breadcrumb</HBreadcrumbItem>
        </HBreadcrumb>
      ));

      expect(wrapper.classes('h-breadcrumb--medium')).eq(true);
      expect(wrapper.findAll('.h-breadcrumb-item__text')[2].classes('h-breadcrumb-item--small')).eq(
        true,
      );
    });
  });

  describe('SSR', () => {
    test('renders items during server-side rendering', async () => {
      const app = createSSRApp({
        render: () => (
          <HBreadcrumb
            texts={[
              { text: 'Home' },
              { text: 'Sub Page1' },
              { text: 'Sub Page2' },
            ]}
          />
        ),
      });

      const html = await renderToString(app);

      expect(html).toContain('h-breadcrumb');
      expect(html).toContain('h-breadcrumb-item');
      expect(html).toContain('Home');
      expect(html).toContain('Sub Page2');
    });
  });
});
