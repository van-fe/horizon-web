import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTransfer from '..';
import TransferPanel from '../src/TransferPanel';
import type { TransferDataProps } from '../src/composables/useProps';
import { handleFindTreeTarget, handleFlatTree } from '../src/utils/useFunc';

async function settle() {
  await nextTick();
  await nextTick();
}

describe('Transfer browser coverage', () => {
  test('flattens and finds default and custom tree fields', () => {
    const tree = [
      {
        code: 'root',
        name: 'Root',
        nodes: [{ code: 'child', name: 'Child', nodes: [{ code: 'leaf', name: 'Leaf' }] }],
      },
    ];

    expect(handleFlatTree(undefined)).toEqual([]);
    expect(handleFlatTree(tree, 'nodes').map(item => item.code)).toEqual([
      'leaf',
      'child',
      'root',
    ]);
    expect(handleFindTreeTarget(tree, 'root', 'code', 'name', 'nodes')).toBe('Root');
    expect(handleFindTreeTarget(tree, 'leaf', 'code', 'name', 'nodes')).toBe('Leaf');
    expect(handleFindTreeTarget(tree, 'missing', 'code', 'name', 'nodes')).toBeNull();
  });

  test('select-all moves eligible keys and clearing preserves disabled selections', async () => {
    const model = ref<Array<string | number | boolean>>([2]);
    const onChange = vi.fn();
    const wrapper = mount(
      () => (
        <HTransfer
          data={
            [
              { key: 1, label: 'One' },
              { key: 2, label: 'Disabled selected', disabled: true },
              { key: 'three', label: 'String key' },
              { key: true, label: 'Boolean key' },
              { key: 9, label: 'Group', isGroup: true },
            ] as unknown as TransferDataProps[]
          }
          modelValue={model.value}
          onUpdate:modelValue={value => {
            model.value = value as Array<string | number | boolean>;
          }}
          onChange={onChange}
        />
      ),
      { attachTo: document.body },
    );
    await settle();
    const selectAll = wrapper.get<HTMLInputElement>(
      '.h-transfer--left .h-transfer__header input[type="checkbox"]',
    );
    await selectAll.setValue(true);
    await settle();
    expect(model.value).toEqual([1, 2, 'three', true]);
    expect(onChange).toHaveBeenLastCalledWith(
      [1, 2, 'three', true],
      'right',
      [1, 'three', true],
    );

    await wrapper
      .get<HTMLInputElement>('.h-transfer--left .h-transfer__header input[type="checkbox"]')
      .setValue(false);
    await settle();
    expect(model.value).toEqual([2]);
    expect(onChange).toHaveBeenLastCalledWith([2], 'left', [1, 'three', true]);
    wrapper.unmount();
  });

  test.each([
    {
      name: 'people only',
      modelValue: [2],
      expected: '1',
    },
    {
      name: 'groups only',
      modelValue: [1],
      expected: '1',
    },
    {
      name: 'people and groups',
      modelValue: [1, 2],
      expected: '1 undefined、1',
    },
  ])('reports tree totals for $name', async ({ modelValue, expected }) => {
    const wrapper = mount(HTransfer, {
      props: {
        data: [
          { key: 1, label: 'Department', children: [{ key: 2, label: 'Member' }] },
        ],
        modelValue,
      },
    });
    await settle();
    expect(wrapper.get('.h-transfer--right .flex-1 > div:first-child').text()).toContain(
      expected,
    );
    wrapper.unmount();
  });

  test('normalizes custom ids, nested children, and missing id mappings for panels', async () => {
    const wrapper = mount(HTransfer, {
      props: {
        data: [
          { code: 'string-id', text: 'String' },
          { code: 2, text: 'Number', children: [{ code: { complex: true }, text: 'Complex' }] },
        ] as unknown as TransferDataProps[],
        props: { id: '', key: 'code', label: 'text' },
      },
    });
    await settle();
    const panel = wrapper.findAllComponents(TransferPanel)[0];
    const normalized = panel.props('data') as TransferDataProps[];
    expect(normalized[0].id).toBe('string-id');
    expect(normalized[1].id).toBe(2);
    expect(normalized[1].children?.[0].id).toBeUndefined();
    expect((panel.props('props') as Record<string, string>).id).toBeUndefined();
    await wrapper.setProps({ data: null as never });
    await settle();
    expect(wrapper.findAllComponents(TransferPanel)[0].props('data')).toEqual([]);
  });

  test('accepts filterable as the filter function itself', async () => {
    const filterable = vi.fn((value: string, item: TransferDataProps) =>
      String(item.label).endsWith(value),
    );
    let filtered: TransferDataProps[] = [];
    const wrapper = mount(HTransfer, {
      props: {
        data: [
          { key: 1, label: 'Alpha' },
          { key: 2, label: 'Beta' },
        ],
        filterable,
      },
      slots: {
        leftBody: (scope?: { data: TransferDataProps[] }) => {
          filtered = scope?.data ?? [];
          return <div data-test="filtered-body">{filtered.map(item => item.label).join(',')}</div>;
        },
      },
    });
    await settle();
    await wrapper.get('.h-transfer--left .h-input__inner').setValue('ta');
    await settle();
    expect(filterable).toHaveBeenCalled();
    expect(filtered.map(item => item.label)).toEqual(['Beta']);
    expect(wrapper.get('[data-test="filtered-body"]').text()).toBe('Beta');
  });

  test('drops a later item before the first target through a real DragEvent', async () => {
    const model = ref([1, 2, 3]);
    const rect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        const rows = [
          ...(this.closest('.h-transfer-panel')?.querySelectorAll(
            '.h-transfer-panel__item--right',
          ) ?? []),
        ];
        return new DOMRect(0, Math.max(0, rows.indexOf(this)) * 38, 100, 38);
      });
    const wrapper = mount(
      () => (
        <HTransfer
          data={[
            { key: 1, label: 'One' },
            { key: 2, label: 'Two' },
            { key: 3, label: 'Three' },
          ]}
          modelValue={model.value}
          draggable
          onUpdate:modelValue={value => {
            model.value = value as number[];
          }}
        />
      ),
      { attachTo: document.body },
    );
    await settle();
    const rows = wrapper.findAll('.h-transfer--right .h-transfer-panel__item--right');
    rows[2].element.dispatchEvent(new DragEvent('dragstart', { bubbles: true }));
    rows[0].element.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, clientY: 1 }),
    );
    rows[0].element.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, clientY: 1 }),
    );
    await settle();
    expect(model.value).toEqual([3, 1, 2]);

    const reorderedRows = wrapper.findAll('.h-transfer--right .h-transfer-panel__item--right');
    reorderedRows[0].element.dispatchEvent(new DragEvent('dragstart', { bubbles: true }));
    reorderedRows[1].element.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, clientY: 75 }),
    );
    reorderedRows[1].element.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, clientY: 75 }),
    );
    await settle();
    expect(model.value).toEqual([3, 2, 1]);
    rect.mockRestore();
    wrapper.unmount();
  });
});
