import { nextTick } from 'vue';
import { describe, expect, test } from 'vitest';
import { createInstance } from './tree-helper';

describe('Tree keyboard navigation', () => {
  test('navigates hierarchy, skips disabled nodes and selects with Enter', async () => {
    const { wrapper, selectedValues, expandedValues } = await createInstance({
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [
            { value: 'disabled', label: 'Disabled', disabled: true },
            { value: 'leaf', label: 'Leaf' },
          ],
        },
        { value: 'last', label: 'Last' },
      ],
    });
    const tree = wrapper.find('[role="tree"]');

    await tree.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.find('.h-tree-item.is-focus').text()).toContain('Parent');

    await tree.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(expandedValues.value).toContain('parent');

    await tree.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.find('.h-tree-item.is-focus').text()).toContain('Leaf');

    await tree.trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(selectedValues.value).toStrictEqual(['leaf']);

    await tree.trigger('keydown', { key: 'End' });
    expect(wrapper.find('.h-tree-item.is-focus').text()).toContain('Last');

    await tree.trigger('keydown', { key: 'Home' });
    expect(wrapper.find('.h-tree-item.is-focus').text()).toContain('Parent');
  });
});
