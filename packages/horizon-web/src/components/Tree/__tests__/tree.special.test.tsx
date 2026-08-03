import { describe, expect, test } from 'vitest';
import { createInstance } from './tree-helper';
import { nextTick, ref } from 'vue';
import unselectableOptions from './modifiedOptions/unselectable-options.json';
import type {
  HTreeData,
  HTreeDynamicLoadNode,
  HTreeNodeData,
} from '~/components/Tree/src/utils/types';
import HTreeItem from '~/components/Tree/src/components/TreeItem';
import { sleep } from '~/utils/tools';

describe('Tree.tsx special', () => {
  test('selected-values update', async () => {
    const selectedValues = ref(['component', 'basic', 'color', 'data']);

    await createInstance(
      {
        selectedValues,
        'onUpdate:selectedValues': val => (selectedValues.value = val),
        multiple: true,
      },
      false,
    );

    expect(selectedValues.value).toStrictEqual([
      'color',
      'table',
      'tag',
      'progress',
      'tree',
      'pagination',
      'badge',
    ]);
  });

  test('if the set-selected-status second param is true when target option is checked, keep checked status', async () => {
    const selectedValues = ref(['feedback']);

    const { domRef } = await createInstance(
      {
        selectedValues,
        'onUpdate:selectedValues': val => (selectedValues.value = val),
        multiple: true,
        checkStrictly: true,
      },
      false,
    );

    domRef.value?.setSelectedStatus(['feedback'], true);

    await nextTick();

    expect(selectedValues.value).toStrictEqual(['feedback']);
  });

  test('unselectable', async () => {
    const selectedValues = ref([]);

    const { wrapper } = await createInstance({
      selectedValues,
      'onUpdate:selectedValues': val => (selectedValues.value = val),
      multiple: true,
      treeData: unselectableOptions,
      isDefaultExpandAll: true,
    });

    await wrapper
      .find('.h-tree-item[data-uuid="feedback"] .h-tree-item__checkbox')
      .trigger('click');

    expect(selectedValues.value).toStrictEqual([]);

    await wrapper
      .find('.h-tree-item[data-uuid="efficiency"] .h-tree-item__checkbox')
      .trigger('click');

    expect(selectedValues.value).toStrictEqual(['efficiency']);
  });

  test('dynamic-load on only has one level on init and the padding is correct', async () => {
    const treeData = ref<HTreeData[]>([
      {
        value: 'guide',
        label: 'Guide',
        isLeaf: false,
        children: [],
      },
      {
        value: 'guide2',
        label: 'Guide2',
      },
    ]);

    const { wrapper } = await createInstance({
      treeData,
    });

    const padding = [8, 32];

    wrapper.findAllComponents(HTreeItem).forEach((item, index) => {
      expect(item.attributes('style')).toContain(`padding-left: ${padding[index]}px`);
    });
  });

  test("filtered result should let user toggle node's expand status", async () => {
    const filterInputValue = ref('guide');

    const { wrapper, domRef } = await createInstance({
      filterable: true,
      filterInputValue,
      filterToHideChildren: false,
    });

    expect(wrapper.findAllComponents(HTreeItem).length).toBe(9);

    domRef.value?.setCollapseStatusByValue(['disciplines'], false);

    await nextTick();

    expect(wrapper.findAllComponents(HTreeItem).length).toBe(5);

    filterInputValue.value = 'gui';

    await nextTick();

    expect(wrapper.findAllComponents(HTreeItem).length).toBe(9);
  });

  test('dynamic set tree-data', async () => {
    const treeData = ref<HTreeNodeData[]>();

    function dynamicLoad(data: HTreeDynamicLoadNode) {
      return new Promise<HTreeNodeData[]>((resolve, reject) => {
        if (!data.node) return reject();

        setTimeout(
          () =>
            resolve(
              data.node!.value === 'disciplines'
                ? [
                    {
                      value: 'consistency',
                      label: 'Consistency',
                    },
                    {
                      value: 'feedback',
                      label: 'Feedback',
                    },
                    {
                      value: 'efficiency',
                      label: 'Efficiency',
                    },
                    {
                      value: 'controllability',
                      label: 'Controllability',
                    },
                  ]
                : [
                    {
                      value: 'side nav',
                      label: 'Side Navigation',
                    },
                    {
                      value: 'top nav',
                      label: 'Top Navigation',
                    },
                  ],
            ),
          2000,
        );
      });
    }

    const { element } = await createInstance({
      treeData,
      dynamicLoad,
    });

    treeData.value = [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            isLeaf: false,
            children: [],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            isLeaf: false,
            children: [],
          },
        ],
      },
    ];

    await sleep();

    await element.find('.h-tree-item[data-uuid="guide"]').trigger('click');
    await element.find('.h-tree-item[data-uuid="disciplines"]').trigger('click');

    await sleep(2000);

    expect(element.findAllComponents(HTreeItem).length).eq(7);
  });
});
