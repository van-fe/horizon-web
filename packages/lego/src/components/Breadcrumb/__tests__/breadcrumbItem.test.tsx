import { mount } from '@vue/test-utils';
import { NBreadcrumb, NBreadcrumbItem } from '../';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

describe('BreadcrumbItem.tsx', () => {
  describe('props', () => {
    test('clickable in normal render', async () => {
      const clickable = ref(false);
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <NBreadcrumb>
          <NBreadcrumbItem clickable={clickable.value} onClick={onClick}>
            HOME
          </NBreadcrumbItem>
        </NBreadcrumb>
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
        <NBreadcrumb
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
