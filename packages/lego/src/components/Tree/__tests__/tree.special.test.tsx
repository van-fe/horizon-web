import { describe, expect, test } from 'vitest';
import { createInstance } from './tree-helper';
import { nextTick, ref } from 'vue';
import unselectableOptions from './modifiedOptions/unselectable-options.json';
import type {
  NTreeData,
  NTreeDynamicLoadNode,
  NTreeNodeData,
} from '~/components/Tree/src/utils/types';
import NTreeItem from '~/components/Tree/src/components/TreeItem';
import { sleep } from '~/utils/tools';

describe('Tree.tsx special', () => {
  test('selected-values old version bug', async () => {
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
      .find('.n-tree-item[data-uuid="feedback"] .n-tree-item__checkbox')
      .trigger('click');

    expect(selectedValues.value).toStrictEqual([]);

    await wrapper
      .find('.n-tree-item[data-uuid="efficiency"] .n-tree-item__checkbox')
      .trigger('click');

    expect(selectedValues.value).toStrictEqual(['efficiency']);
  });

  test('dynamic-load on only has one level on init and the padding is correct', async () => {
    const treeData = ref<NTreeData[]>([
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

    wrapper.findAllComponents(NTreeItem).forEach((item, index) => {
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

    expect(wrapper.findAllComponents(NTreeItem).length).toBe(9);

    domRef.value?.setCollapseStatusByValue(['disciplines'], false);

    await nextTick();

    expect(wrapper.findAllComponents(NTreeItem).length).toBe(5);

    filterInputValue.value = 'gui';

    await nextTick();

    expect(wrapper.findAllComponents(NTreeItem).length).toBe(9);
  });

  test('dynamic set tree-data', async () => {
    const treeData = ref<NTreeNodeData[]>();

    function dynamicLoad(data: NTreeDynamicLoadNode) {
      return new Promise<NTreeNodeData[]>((resolve, reject) => {
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

    await element.find('.n-tree-item[data-uuid="guide"]').trigger('click');
    await element.find('.n-tree-item[data-uuid="disciplines"]').trigger('click');

    await sleep(2000);

    expect(element.findAllComponents(NTreeItem).length).eq(7);
  });
});
