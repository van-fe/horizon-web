import { ComponentClassBlock } from '@aurora/utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import HTreeItem from '../src/components/TreeItem';
import type { HTreeData } from '../src/utils/types';
import { createInstance } from './tree-helper';
import { sleep } from '~/utils/tools';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import type { TreeProps } from '../src/composables/useProps';

const treeClassHelper = new ComponentClassBlock('tree');
const treeItemClassHelper = new ComponentClassBlock('tree-item');

function getTreeItem(element: Awaited<ReturnType<typeof createInstance>>['element'], value: string) {
  return element
    .findAllComponents(HTreeItem)
    .find(item => item.attributes('data-uuid') === value)!;
}

async function startDrag(
  source: ReturnType<typeof getTreeItem>,
  target: Element,
  clientY = 44,
) {
  const handler = source.get(`.${treeItemClassHelper.e('draggable-icon')}`);
  handler.element.dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 10 }),
  );
  target.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientY }));
  await nextTick();
  return handler;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Tree branch guards in Chromium', () => {
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
      new PointerEvent('pointerdown', { bubbles: true, button: 2, clientY: 10 }),
    );
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientY: 20 }));
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 10 }),
    );
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientY: 20 }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 20 }));
    await nextTick();
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    handler.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 10 }),
    );
    handler.element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 10 }));
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
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 10 }),
    );
    const top = element.get(`.${treeClassHelper.em('drag', 'top')}`);
    top.element.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientY: 0 }));
    await nextTick();
    top.element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 0 }));
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
    sibling.element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
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
    child.element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
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
    ['throws', () => {
      throw new Error('synchronous veto');
    }],
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
    sibling.element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    await sleep();
    await nextTick();

    expect(treeData.value.map(node => node.value)).toStrictEqual(['source', 'target']);
    expect(consoleError).toHaveBeenCalled();
  });
});
