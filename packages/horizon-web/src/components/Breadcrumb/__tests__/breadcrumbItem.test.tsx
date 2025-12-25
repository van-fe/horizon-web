import { mount } from '@vue/test-utils';
import { HBreadcrumb, HBreadcrumbItem } from '..';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

describe('BreadcrumbItem.tsx', () => {
  describe('props', () => {
    test('clickable in normal render', async () => {
      const clickable = ref(false);
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HBreadcrumb>
          <HBreadcrumbItem clickable={clickable.value} onClick={onClick}>
            HOME
          </HBreadcrumbItem>
        </HBreadcrumb>
      ));

      await wrapper.find('.n-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      clickable.value = true;

      await nextTick();

      await wrapper.find('.n-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });

    test('clickable in props render', async () => {
      const clickable = ref(false);
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HBreadcrumb
          texts={[
            {
              text: 'HOME',
              clickable: clickable.value,
            },
          ]}
          onItemClick={onClick}
        />
      ));

      await wrapper.find('.n-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      clickable.value = true;

      await nextTick();

      await wrapper.find('.n-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
