import { ComponentClassBlock } from '@aurora/utils';
import { defineComponent, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import HTreeItem from '../src/components/TreeItem';
import type { HTreeData } from '../src/utils/types';
import { createInstance } from './tree-helper';
import { sleep } from '~/utils/tools';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import type { TreeProps } from '../src/composables/useProps';
import useTreeNodeMove from '../src/hooks/useTreeNodeMove';
import TreeHelper from '~/utils/useTree';
import { transformUuid } from '../src/utils/config';

const treeClassHelper = new ComponentClassBlock('tree');
const treeItemClassHelper = new ComponentClassBlock('tree-item');

function getTreeItem(
  element: Awaited<ReturnType<typeof createInstance>>['element'],
  value: string,
) {
  return element.findAllComponents(HTreeItem).find(item => item.attributes('data-uuid') === value)!;
}

async function startDrag(source: ReturnType<typeof getTreeItem>, target: Element, clientY = 44) {
  const handler = source.get(`.${treeItemClassHelper.e('draggable-icon')}`);
  handler.element.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      clientY: 10,
      pointerId: 1,
      isPrimary: true,
    }),
  );
  target.dispatchEvent(
    new PointerEvent('pointermove', { bubbles: true, clientY, pointerId: 1, isPrimary: true }),
  );
  await nextTick();
  return handler;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Tree branch guards in Chromium', () => {
  test('adapts immutable Core moves while retaining Vue tree data identity', () => {
    const treeData: HTreeData[] = [
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
    ];
    const tree = new TreeHelper(treeData, {}, transformUuid);
    let moveNode: ReturnType<typeof useTreeNodeMove>['moveNode'];
    mount(
      defineComponent({
        setup() {
          ({ moveNode } = useTreeNodeMove(tree, {
            setNodeChildren: (_value, children) => {
              treeData.splice(0, treeData.length, ...children);
              tree.setTreeData(treeData);
            },
            deleteNode: () => [],
            addNodeChildren: () => undefined,
          }));
          return () => null;
        },
      }),
    );

    expect(moveNode!({ fromValue: 'first', toValue: 'second', position: 'after' })).toBe(true);
    expect(treeData.map(node => node.value)).toEqual(['second', 'first']);
    expect(moveNode!({ fromValue: 'missing', position: 'root' })).toBe(false);
  });

  test('passes the Vue field mapping to immutable Core moves', () => {
    const treeData = [
      { id: 'first', text: 'First' },
      { id: 'second', text: 'Second' },
    ] as unknown as HTreeData[];
    const fieldMap = { value: 'id', label: 'text' };
    const tree = new TreeHelper(treeData, fieldMap, transformUuid);
    let moveNode: ReturnType<typeof useTreeNodeMove>['moveNode'];
    mount(
      defineComponent({
        setup() {
          ({ moveNode } = useTreeNodeMove(tree, {
            setNodeChildren: (_value, children) => {
              treeData.splice(0, treeData.length, ...children);
              tree.setTreeData(treeData);
            },
            deleteNode: () => [],
            addNodeChildren: () => undefined,
          }));
          return () => null;
        },
      }),
    );

    expect(moveNode!({ fromValue: 'first', toValue: 'second', position: 'after' })).toBe(true);
    expect(treeData.map(node => node.id)).toEqual(['second', 'first']);
  });

  test('restores drag expansion through the controller and remains toggleable afterwards', async () => {
    const expandValues = ref<Array<string | number>>(['parent']);
    const { element } = await createInstance({
      draggable: true,
      isDefaultExpandAll: true,
      expandValues,
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'child', label: 'Child' }],
        },
        { value: 'target', label: 'Target' },
      ],
      'onUpdate:expandValues': values => (expandValues.value = values),
    });
    const source = getTreeItem(element, 'parent');
    await startDrag(source, getTreeItem(element, 'target').element);
    document.dispatchEvent(
      new PointerEvent('pointercancel', { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await nextTick();

    expect(getTreeItem(element, 'child').exists()).toBe(true);
    await source.get(`.${treeItemClassHelper.e('expand-icon')}`).trigger('click');
    await nextTick();
    expect(element.find('[data-uuid="child"]').exists()).toBe(false);
    await source.get(`.${treeItemClassHelper.e('expand-icon')}`).trigger('click');
    await nextTick();
    expect(getTreeItem(element, 'child').exists()).toBe(true);
  });

  test('clears the Core selection controller before a subsequent leaf selection', async () => {
    const selectedValues = ref<Array<string | number>>(['first']);
    const { element, domRef } = await createInstance({
      selectedValues,
      treeData: [
        { value: 'first', label: 'First' },
        { value: 'second', label: 'Second' },
      ],
      'onUpdate:selectedValues': values => (selectedValues.value = values),
    });
    domRef.value?.clearSelectedValues();
    await nextTick();
    await getTreeItem(element, 'second').trigger('click');
    expect(selectedValues.value).toEqual(['second']);
  });

  test('does not echo externally synchronized parent selections as a user update', async () => {
    const selectedValues = ref<Array<string | number>>(['parent']);
    const onUpdate = vi.fn();
    await createInstance({
      selectedValues,
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'leaf', label: 'Leaf' }],
        },
      ],
      'onUpdate:selectedValues': onUpdate,
    });
    await nextTick();
    expect(onUpdate).not.toHaveBeenCalled();
  });
  test('keeps the controlled event before its model update and maintains DOM tree focus metadata', async () => {
    const events: string[] = [];
    const expandValues = ref<Array<string | number>>([]);
    const { element } = await createInstance({
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'child', label: 'Child' }],
        },
      ],
      expandValues,
      onExpand: () => events.push('expand'),
      'onUpdate:expandValues': values => {
        events.push('update');
        expandValues.value = values;
      },
    });
    const tree = element.get('[role="tree"]');

    await tree.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    const activeId = tree.attributes('aria-activedescendant');
    expect(document.activeElement).toBe(tree.element);
    expect(activeId).toBe(element.get('.is-focus').attributes('id'));
    expect(element.get('.is-focus').attributes('aria-level')).toBe('1');
    expect(element.get('.is-focus').attributes('aria-setsize')).toBe('1');
    expect(element.get('.is-focus').attributes('aria-posinset')).toBe('1');

    events.length = 0;
    await getTreeItem(element, 'parent').trigger('click');
    await nextTick();
    expect(events).toStrictEqual(['expand', 'update']);
  });

  test('invalidates stale lazy results after controlled data replacement and unmount', async () => {
    let resolveFirst: ((value: HTreeData[]) => void) | undefined;
    const dynamicLoad = vi.fn(
      () =>
        new Promise<HTreeData[]>(resolve => {
          resolveFirst = resolve;
        }),
    );
    const treeData = ref<HTreeData[]>([
      { value: 'parent', label: 'Parent', isLeaf: false, children: [] },
    ]);
    const onTreeData = vi.fn((value: HTreeData[]) => {
      treeData.value = value;
    });
    const first = await createInstance({
      treeData,
      dynamicLoad,
      'onUpdate:treeData': onTreeData,
    });

    await getTreeItem(first.element, 'parent').trigger('click');
    treeData.value = [
      {
        value: 'parent',
        label: 'Parent',
        isLeaf: false,
        children: [{ value: 'external', label: 'External' }],
      },
    ];
    await nextTick();
    resolveFirst?.([{ value: 'stale', label: 'Stale' }]);
    await Promise.resolve();
    await nextTick();
    expect(treeData.value[0].children?.map(node => node.value)).toStrictEqual(['external']);
    expect(onTreeData).not.toHaveBeenCalled();

    let resolveSecond: ((value: HTreeData[]) => void) | undefined;
    dynamicLoad.mockImplementationOnce(
      () =>
        new Promise<HTreeData[]>(resolve => {
          resolveSecond = resolve;
        }),
    );
    const second = await createInstance({
      treeData: [{ value: 'second', label: 'Second', isLeaf: false, children: [] }],
      dynamicLoad,
      'onUpdate:treeData': onTreeData,
    });
    await getTreeItem(second.element, 'second').trigger('click');
    second.wrapper.unmount();
    resolveSecond?.([{ value: 'late', label: 'Late' }]);
    await Promise.resolve();
    await nextTick();
    expect(onTreeData).not.toHaveBeenCalled();
  });

  test('deduplicates, rejects and ignores empty lazy-load completions', async () => {
    let resolvePending: ((value: HTreeData[]) => void) | undefined;
    const pendingLoad = vi.fn(
      () =>
        new Promise<HTreeData[]>(resolve => {
          resolvePending = resolve;
        }),
    );
    const pending = await createInstance({
      treeData: [{ value: 'lazy', label: 'Lazy', isLeaf: false, children: [] }],
      dynamicLoad: pendingLoad,
    });
    const lazy = getTreeItem(pending.element, 'lazy');
    await lazy.trigger('click');
    await lazy.trigger('click');
    await lazy.trigger('click');
    expect(pendingLoad).toHaveBeenCalledOnce();
    resolvePending?.([]);
    await Promise.resolve();
    await nextTick();
    pending.wrapper.unmount();

    const onUpdate = vi.fn();
    const rejected = await createInstance({
      treeData: [{ value: 'reject', label: 'Reject', isLeaf: false, children: [] }],
      dynamicLoad: () => Promise.reject(new Error('network')),
      'onUpdate:treeData': onUpdate,
    });
    await getTreeItem(rejected.element, 'reject').trigger('click');
    await Promise.resolve();
    await nextTick();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  test('renders nested continuation lines and safely stops a source removed during drag', async () => {
    const treeData = ref<HTreeData[]>([
      {
        value: 'root',
        label: 'Root',
        children: [
          {
            value: 'branch',
            label: 'Branch',
            children: [
              { value: 'first', label: 'First' },
              { value: 'last', label: 'Last' },
            ],
          },
          { value: 'sibling', label: 'Sibling' },
        ],
      },
    ]);
    const { element } = await createInstance({
      treeData,
      isDefaultExpandAll: true,
      showLine: true,
      draggable: true,
    });
    expect(
      getTreeItem(element, 'first').findAll(`.${treeItemClassHelper.e('parent-shown-line')}`)
        .length,
    ).toBeGreaterThan(0);

    const source = getTreeItem(element, 'first');
    const target = getTreeItem(element, 'last');
    await startDrag(source, target.element);
    treeData.value = [{ value: 'last', label: 'Last' }];
    await nextTick();
    document.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await nextTick();
    expect(element.classes(treeClassHelper.is('dragging') as string)).toBe(false);
  });

  test('handles empty, input, wrapping, parent and Space keyboard paths', async () => {
    const empty = await createInstance({ treeData: [] });
    await empty.element.trigger('keydown', { key: 'ArrowDown' });
    expect(empty.element.find('.is-focus').exists()).toBe(false);
    empty.wrapper.unmount();

    const filterValue = ref('');
    const { wrapper, element, selectedValues, expandedValues } = await createInstance({
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'child', label: 'Child' }],
        },
        { value: 'last', label: 'Last' },
      ],
      filterable: true,
      filterValue,
    });
    const tree = element.get('[role="tree"]');

    await tree.trigger('keydown', { key: 'ArrowUp' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('last');

    await tree.trigger('keydown', { key: 'ArrowDown' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('last');

    await tree.trigger('keydown', { key: 'ArrowLeft' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('last');

    await tree.trigger('keydown', { key: 'Home' });
    await tree.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(expandedValues.value).toContain('parent');

    await tree.trigger('keydown', { key: 'ArrowRight' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('child');
    await tree.trigger('keydown', { key: 'ArrowLeft' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('parent');
    await tree.trigger('keydown', { key: 'ArrowLeft' });
    expect(expandedValues.value).not.toContain('parent');

    await tree.trigger('keydown', { key: 'ArrowRight' });
    await tree.trigger('keydown', { key: 'ArrowRight' });
    await tree.trigger('keydown', { key: ' ' });
    expect(selectedValues.value).toStrictEqual(['child']);

    const input = wrapper.get('input');
    await input.trigger('keydown', { key: 'ArrowLeft' });
    await input.trigger('keydown', { key: ' ' });
    await input.trigger('keydown', { key: 'Home' });
    expect(element.get('.is-focus').attributes('data-uuid')).toBe('child');
  });

  test('uses selected value for normal scroll and safely handles a missing default target', async () => {
    const original = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    const selectedValues = ref<Array<string | number>>(['feedback']);
    const withSelection = await createInstance({ selectedValues });
    await withSelection.domRef.value?.scrollTo();
    await nextTick();
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });

    const withoutSelection = await createInstance({ treeData: [], selectedValues: [] });
    await expect(withoutSelection.domRef.value?.scrollTo()).resolves.toBeUndefined();

    if (original) Object.defineProperty(Element.prototype, 'scrollIntoView', original);
    else delete (Element.prototype as Partial<Element>).scrollIntoView;
  });

  test('routes virtual scrollTo through the real virtual scroller expose', async () => {
    const selectedValues = ref<Array<string | number>>(['feedback']);
    const { wrapper, domRef } = await createInstance({
      selectedValues,
      useVirtualScroll: true,
      height: 160,
    });
    const scroller = wrapper.getComponent(HVirtualScroller);
    const scrollToItem = vi.spyOn(scroller.getCurrentComponent().exposed!, 'scrollToItem');

    await domRef.value?.scrollTo();
    expect(scrollToItem).toHaveBeenCalledWith(expect.any(Number));
  });

  test('deletes the complete tree, appends at root and ignores a missing parent', async () => {
    const treeData = ref<HTreeData[]>([{ value: 'root', label: 'Root' }]);
    const onUpdate = vi.fn();
    const { domRef, element } = await createInstance({
      treeData,
      'onUpdate:treeData': (value: HTreeData[]) => {
        treeData.value = value;
        onUpdate(value);
      },
    });

    domRef.value?.delNodeByValue();
    await nextTick();
    expect(treeData.value).toStrictEqual([]);

    domRef.value?.addNodeChildrenByValue([{ value: 'new-root', label: 'New root' }]);
    await nextTick();
    expect(treeData.value.map(node => node.value)).toStrictEqual(['new-root']);

    domRef.value?.addNodeChildrenByValue([{ value: 'orphan', label: 'Orphan' }], 'missing');
    await nextTick();
    expect(element.find('[data-uuid="orphan"]').exists()).toBe(false);
    expect(onUpdate).toHaveBeenCalledTimes(3);
  });

  test('guards non-primary, cancelled and outside-tree pointer drags', async () => {
    const { element } = await createInstance({
      draggable: true,
      treeData: [
        { value: 'source', label: 'Source' },
        { value: 'target', label: 'Target' },
      ],
    });
    const source = getTreeItem(element, 'source');
    const handler = source.get(`.${treeItemClassHelper.e('draggable-icon')}`);

    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 2,
        clientY: 10,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientY: 20,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientY: 10,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientY: 20,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, clientY: 20, pointerId: 1, isPrimary: true }),
    );
    await nextTick();
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientY: 10,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    handler.element.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, clientY: 10, pointerId: 1, isPrimary: true }),
    );
    await nextTick();
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));
  });

  test('drops a root node at the top after an async beforeDrop approval', async () => {
    const treeData = ref<HTreeData[]>([
      { value: 'root-a', label: 'Root A' },
      { value: 'root-b', label: 'Root B' },
    ]);
    const beforeDrop = vi.fn().mockResolvedValue(true);
    const { element } = await createInstance({ draggable: true, treeData, beforeDrop });
    const source = getTreeItem(element, 'root-b');
    const target = getTreeItem(element, 'root-a');

    const handler = await startDrag(source, target.element);
    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientY: 10,
        pointerId: 1,
        isPrimary: true,
      }),
    );
    const top = element.get(`.${treeClassHelper.em('drag', 'top')}`);
    top.element.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientY: 0, pointerId: 1, isPrimary: true }),
    );
    await nextTick();
    top.element.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, clientY: 0, pointerId: 1, isPrimary: true }),
    );
    await sleep();
    await nextTick();

    expect(beforeDrop).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'root-b', level: 0 }),
      null,
      null,
    );
    expect(treeData.value.map(node => node.value)).toStrictEqual(['root-b', 'root-a']);
  });

  test('moves a nested node after its sibling and reports parent/previous context', async () => {
    const treeData = ref<HTreeData[]>([
      {
        value: 'parent',
        label: 'Parent',
        children: [
          { value: 'child-a', label: 'Child A' },
          { value: 'child-b', label: 'Child B' },
        ],
      },
    ]);
    const beforeDrop = vi.fn(() => true);
    const { element } = await createInstance({
      draggable: true,
      isDefaultExpandAll: true,
      treeData,
      beforeDrop,
    });
    const source = getTreeItem(element, 'child-a');
    const target = getTreeItem(element, 'child-b');
    await startDrag(source, target.element);
    const sibling = element.get(
      `.${treeItemClassHelper.e('drag-over-wrap')}.${treeItemClassHelper.is('sibling')}`,
    );
    sibling.element.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await sleep();
    await nextTick();

    expect(beforeDrop).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'child-a', level: 1 }),
      expect.objectContaining({ value: 'parent', level: 0 }),
      expect.objectContaining({ value: 'child-b', level: 1 }),
    );
    expect(treeData.value[0].children?.map(node => node.value)).toStrictEqual([
      'child-b',
      'child-a',
    ]);
  });

  test('passes child-drop context and creates children after approval', async () => {
    const treeData = ref<HTreeData[]>([
      { value: 'source', label: 'Source' },
      { value: 'target', label: 'Target' },
    ]);
    const beforeDrop = vi.fn(() => true);
    const { element } = await createInstance({ draggable: true, treeData, beforeDrop });
    await startDrag(getTreeItem(element, 'source'), getTreeItem(element, 'target').element);
    const child = element.get(
      `.${treeItemClassHelper.e('drag-over-wrap')}.${treeItemClassHelper.is('child')}`,
    );
    child.element.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await sleep();
    await nextTick();

    expect(beforeDrop).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'source', level: 0 }),
      expect.objectContaining({ value: 'target', level: 0 }),
      null,
    );
    expect(treeData.value).toEqual([
      expect.objectContaining({
        value: 'target',
        children: [expect.objectContaining({ value: 'source' })],
      }),
    ]);
  });

  test.each([
    [
      'throws',
      () => {
        throw new Error('synchronous veto');
      },
    ],
    ['rejects', () => Promise.reject(new Error('asynchronous veto'))],
  ])('stops a drop when beforeDrop %s', async (_name, beforeDrop) => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const beforeDropSpy = vi.fn(beforeDrop);
    const treeData = ref<HTreeData[]>([
      { value: 'source', label: 'Source' },
      { value: 'target', label: 'Target' },
    ]);
    const { element } = await createInstance({
      draggable: true,
      treeData,
      beforeDrop: beforeDropSpy as unknown as TreeProps['beforeDrop'],
    });
    await startDrag(getTreeItem(element, 'source'), getTreeItem(element, 'target').element);
    const sibling = element.get(
      `.${treeItemClassHelper.e('drag-over-wrap')}.${treeItemClassHelper.is('sibling')}`,
    );
    sibling.element.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, pointerId: 1, isPrimary: true }),
    );
    await sleep();
    await nextTick();

    expect(treeData.value.map(node => node.value)).toStrictEqual(['source', 'target']);
    expect(consoleError).toHaveBeenCalled();
  });
});
