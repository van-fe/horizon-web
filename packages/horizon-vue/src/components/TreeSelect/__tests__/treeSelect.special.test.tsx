import { describe, expect, test, vi } from 'vitest';
import { createInstance, TreeSelectHelper } from './treeSelectHelper';
import { nextTick, ref } from 'vue';
import HTag from '~/components/Tag/src/Tag';
import type {
  HTreeDynamicLoadNode,
  HTreeNodeData,
  HTreeUuidType,
} from '~/components/Tree/src/utils/types';
import { sleep } from '~/utils/tools';
import HTreeItem from '~/components/Tree/src/components/TreeItem';
import HPickerPopper from '~/components/Picker/src/components/PickerPopper';

describe('TreeSelect.tsx special', () => {
  test('supports keyboard navigation and selection', async () => {
    const instance = new TreeSelectHelper();
    await instance.open();
    const input = instance.pickerInput!.find('input');

    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(instance.wrapper?.find('.h-tree-item.is-focus').text()).toContain(
      'Design Documentation',
    );

    await input.trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(instance.modelValue.value).toBe('docs');
  });

  test('default-value in multiple', async () => {
    const modelValue = ref(['feedback', 'input']);
    const onChange = vi.fn();

    const instance = new TreeSelectHelper({
      modelValue,
      multiple: true,
      onChange,
    });

    await instance.mount();

    const tags = instance.element?.findAllComponents(HTag);

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(tags?.[0].text()).toBe('Feedback');
    expect(tags?.[1].text()).toBe('Input');

    modelValue.value = ['tag', 'tree'];

    await nextTick();

    const tags2 = instance.element?.findAllComponents(HTag);

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(tags2?.[0].text()).toBe('Tag');
    expect(tags2?.[1].text()).toBe('Tree');
  });

  test('default-value in single', async () => {
    const modelValue = ref<string | string[]>(['feedback']);

    const instance = new TreeSelectHelper({
      modelValue,
    });

    await instance.mount();

    expect(instance.element?.find('input').element.value).toBe('Feedback');

    modelValue.value = 'input';

    await nextTick();

    expect(instance.element?.find('input').element.value).toBe('Input');
  });

  test('use array method to set model-value while mounted in multiple', async () => {
    const modelValue = ref<string[]>([]);

    const instance = new TreeSelectHelper({
      modelValue,
      multiple: true,
    });

    await instance.open();

    modelValue.value.push('feedback');

    await nextTick();

    expect(instance.pickerInput?.text()).toContain('Feedback');

    modelValue.value = ['input'];

    await nextTick();

    expect(instance.pickerInput?.text()).toContain('Input');
  });

  test('dynamic set tree-data', async () => {
    const treeData = ref<HTreeNodeData[]>([]);

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

    const instance = new TreeSelectHelper({
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

    await instance.open(false);

    await instance.clickOption('guide');
    await instance.clickOption('disciplines');

    await sleep(2000);

    expect(instance.pickerPopper?.findAllComponents(HTreeItem).length).eq(7);
  });

  test('when update tree-data, should not modify already selected modalValue which are not in the newest tree-data', async () => {
    const modelValue = ref<HTreeUuidType[]>(['efficiency', 'controllability']);
    const treeData = ref<HTreeNodeData[]>([
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            isLeaf: false,
            children: [],
          },
        ],
      },
    ]);

    const instance = new TreeSelectHelper({
      modelValue,
      treeData,
      'onUpdate:modelValue': (val: HTreeUuidType[]) => (modelValue.value = val),
      multiple: true,
    });

    await instance.mount(false);

    expect(instance.pickerInput?.findAllComponents(HTag).length).eq(2);

    treeData.value = [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
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
    await instance.picker?.trigger('click');

    expect(instance.pickerInput?.findAllComponents(HTag).length).eq(2);
  });

  test('change model-value after the tree-select mounted, should close on click outside after open it', async () => {
    const modelValue = ref<string[]>();

    const { picker, wrapper, outer } = await createInstance(
      {
        modelValue,
        'onUpdate:modelValue': (val: string[]) => (modelValue.value = val),
      },
      false,
      {},
      false,
    );

    await sleep(100);

    modelValue.value = ['guide', 'navigation', 'side nav'];

    await picker.trigger('click');

    await sleep(200);

    expect(wrapper.findComponent(HPickerPopper)?.isVisible()).toBeTruthy();

    await outer.trigger('mousedown');

    await sleep(200);

    expect(wrapper.findComponent(HPickerPopper)?.isVisible()).toBeFalsy();
  });
});
