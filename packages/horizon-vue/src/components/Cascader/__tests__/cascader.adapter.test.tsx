import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type {
  HCascaderDynamicLoadNode,
  HCascaderExtendOption,
  HCascaderOption,
} from '../src/utils/types';
import HCascaderItem from '../src/components/CascaderItem';
import { toCoreCascaderOption } from '../src/utils/coreAdapter';
import {
  clickConfirmCancelBtn,
  clickOptionByOrder,
  createInstance,
  openCascader,
} from './cascader-helper';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('Cascader Core and Web adapters', () => {
  test('normalizes an omitted options source and derives a branch leaf state in the Core adapter', async () => {
    const omitted = createInstance({ options: undefined });
    await nextTick();
    expect(omitted.wrapper.findComponent(HCascaderItem).exists()).toBe(false);

    const branch = {
      value: 'branch',
      label: 'Branch',
      stringLabel: 'Branch',
      disabled: false,
      passingDisabled: false,
      selectable: true,
      isRoot: true,
      level: 0,
      _index: 0,
      parent: null,
      transformedChildren: [],
      path: ['branch'],
      labels: ['Branch'],
      originOption: { value: 'branch', label: 'Branch' },
    } as unknown as HCascaderExtendOption;
    const leaf = {
      ...branch,
      value: 'leaf',
      label: 'Leaf',
      stringLabel: 'Leaf',
      isRoot: false,
      isLeaf: true,
      level: 1,
      parent: branch,
      transformedChildren: [],
      path: ['branch', 'leaf'],
      labels: ['Branch', 'Leaf'],
      originOption: { value: 'leaf', label: 'Leaf', isLeaf: true },
    } as unknown as HCascaderExtendOption;
    branch.transformedChildren = [leaf];
    expect(toCoreCascaderOption(branch).isLeaf).toBe(false);
  });

  test('renders scalar group headings and leaf tooltip content', async () => {
    const grouped = createInstance({
      options: [
        { value: 'heading', label: 'Heading', groupLabel: 'Group heading' },
        { value: 'leaf', label: 'Leaf', isLeaf: true },
      ],
      showTooltip: true,
      showCheckedStrategy: 'leaf',
    });
    await openCascader(grouped.wrapper);
    expect(grouped.wrapper.find('.h-cascader-panel__group-label').text()).toBe('Group heading');
    expect(grouped.wrapper.text()).toContain('Leaf');
  });

  test('exposes tree semantics and a roving active treeitem during keyboard navigation', async () => {
    const { wrapper, pickerInput } = createInstance({ multiple: true }, 'disabled');
    await openCascader(wrapper);

    const tree = wrapper.get('[role="tree"]');
    expect(tree.attributes('aria-multiselectable')).toBe('true');
    const items = wrapper.findAllComponents(HCascaderItem);
    expect(items.length).toBeGreaterThan(1);
    expect(items[0].attributes('role')).toBe('treeitem');
    expect(items[0].attributes('aria-level')).toBe('1');
    expect(items.every(item => item.attributes('tabindex') === '-1')).toBe(true);

    const input = pickerInput.find('input');
    (input.element as HTMLInputElement).focus();
    await input.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    const active = wrapper
      .findAllComponents(HCascaderItem)
      .find(item => item.attributes('tabindex') === '0');
    expect(active?.exists()).toBe(true);
    expect(tree.attributes('aria-activedescendant')).toBe(active?.attributes('id'));
    expect(document.activeElement).toBe(input.element);
    expect(input.attributes('role')).toBe('combobox');
    expect(input.attributes('aria-controls')).toBe(tree.attributes('id'));
    expect(input.attributes('aria-activedescendant')).toBe(active?.attributes('id'));
    expect(
      wrapper
        .findAllComponents(HCascaderItem)
        .filter(item => item.attributes('aria-disabled') === 'true')
        .every(item => item.attributes('tabindex') === '-1'),
    ).toBe(true);
  });

  test('delegates open, sibling, child, parent, activation and close keys to Core navigation', async () => {
    const { wrapper, pickerInput, modelValue } = createInstance();
    const input = pickerInput.find('input');

    await input.trigger('keydown', { key: 'ArrowDown' });
    await vi.waitFor(() => expect(wrapper.find('[role="tree"]').exists()).toBe(true));
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'End' });
    await input.trigger('keydown', { key: 'Home' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    await input.trigger('keydown', { key: 'ArrowLeft' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    await input.trigger('keydown', { key: 'Enter' });
    await nextTick();

    expect(modelValue.value).toEqual(['guide', 'disciplines', 'consistency']);
    await openCascader(wrapper);
    await input.trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(wrapper.find('[role="tree"]').isVisible()).toBe(false);
  });

  test('opens a closed filter result tree from the keyboard', async () => {
    const { wrapper, pickerInput } = createInstance({ filterable: true });
    const input = pickerInput.find('input');
    (input.element as HTMLInputElement).focus();
    await input.setValue('navigation');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await vi.waitFor(() => expect(wrapper.find('[role="tree"]').isVisible()).toBe(true));
    await input.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    const tree = wrapper.get('[role="tree"]');
    const active = wrapper
      .findAllComponents(HCascaderItem)
      .find(item => item.attributes('tabindex') === '0');
    expect(active?.exists()).toBe(true);
    expect(document.activeElement).toBe(input.element);
    expect(input.attributes('aria-controls')).toBe(tree.attributes('id'));
    expect(input.attributes('aria-activedescendant')).toBe(active?.attributes('id'));
  });

  test('loads a lazy branch through ArrowRight before Core children exist', async () => {
    const request = deferred<HCascaderOption[]>();
    const dynamicLoad = vi.fn(() => request.promise);
    const { wrapper, pickerInput } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad,
    });
    await openCascader(wrapper);
    const input = pickerInput.find('input');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    expect(dynamicLoad).toHaveBeenCalledOnce();

    request.resolve([{ value: 'leaf', label: 'Leaf', isLeaf: true }]);
    await vi.waitFor(() => expect(wrapper.text()).toContain('Leaf'));
  });

  test('deduplicates an in-flight node load and clears busy after it resolves', async () => {
    const request = deferred<HCascaderOption[]>();
    const dynamicLoad = vi.fn(() => request.promise);
    const { wrapper } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad,
    });
    await openCascader(wrapper);
    const item = wrapper.findComponent(HCascaderItem);

    await item.trigger('click');
    await item.trigger('click');
    expect(dynamicLoad).toHaveBeenCalledOnce();
    expect(wrapper.get('[role="tree"]').attributes('aria-busy')).toBe('true');

    request.resolve([{ value: 'leaf', label: 'Leaf', isLeaf: true }]);
    await vi.waitFor(() => expect(wrapper.text()).toContain('Leaf'));
    expect(wrapper.get('[role="tree"]').attributes('aria-busy')).toBeUndefined();
  });

  test('settles rejected loads without mutating options or leaving a busy node', async () => {
    const request = deferred<HCascaderOption[]>();
    const updateOptions = vi.fn();
    const { wrapper } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad: () => request.promise,
      'onUpdate:options': updateOptions,
    });
    await openCascader(wrapper);
    await wrapper.findComponent(HCascaderItem).trigger('click');

    request.reject(new Error('network'));
    await vi.waitFor(() =>
      expect(wrapper.get('[role="tree"]').attributes('aria-busy')).toBeUndefined(),
    );
    expect(updateOptions).not.toHaveBeenCalled();
    expect(wrapper.findAllComponents(HCascaderItem)).toHaveLength(1);
  });

  test('ignores stale dynamic results after options replacement', async () => {
    const request = deferred<HCascaderOption[]>();
    const options = ref<HCascaderOption[]>([{ value: 'old', label: 'Old root', isLeaf: false }]);
    const updateOptions = vi.fn();
    const { wrapper } = createInstance({
      options,
      dynamicLoad: () => request.promise,
      'onUpdate:options': updateOptions,
    });
    await openCascader(wrapper);
    await wrapper.findComponent(HCascaderItem).trigger('click');

    options.value = [{ value: 'new', label: 'New root', isLeaf: true }];
    await nextTick();
    request.resolve([{ value: 'stale', label: 'Stale leaf', isLeaf: true }]);
    await nextTick();
    await nextTick();

    expect(updateOptions).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain('New root');
    expect(wrapper.text()).not.toContain('Stale leaf');
  });

  test('ignores an in-flight result after the dynamic loader changes', async () => {
    const oldRequest = deferred<HCascaderOption[]>();
    const dynamicLoad = ref((_node: HCascaderDynamicLoadNode) => oldRequest.promise);
    const updateOptions = vi.fn();
    const { wrapper } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad,
      'onUpdate:options': updateOptions,
    });
    await openCascader(wrapper);
    await wrapper.findComponent(HCascaderItem).trigger('click');

    dynamicLoad.value = () => Promise.resolve([{ value: 'new', label: 'New leaf' }]);
    await nextTick();
    oldRequest.resolve([{ value: 'stale', label: 'Stale leaf', isLeaf: true }]);
    await nextTick();
    await nextTick();

    expect(updateOptions).not.toHaveBeenCalled();
    expect(wrapper.text()).not.toContain('Stale leaf');
  });

  test('ignores dynamic results and clears scheduled work after unmount', async () => {
    const request = deferred<HCascaderOption[]>();
    const updateOptions = vi.fn();
    const dynamicLoad = vi.fn((_node: HCascaderDynamicLoadNode) => request.promise);
    const { wrapper } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad,
      'onUpdate:options': updateOptions,
    });
    await openCascader(wrapper);
    await wrapper.findComponent(HCascaderItem).trigger('click');
    wrapper.unmount();

    request.resolve([{ value: 'late', label: 'Late leaf', isLeaf: true }]);
    await nextTick();
    await nextTick();
    expect(dynamicLoad).toHaveBeenCalledOnce();
    expect(updateOptions).not.toHaveBeenCalled();
  });

  test('emits one controlled multiple value only when confirm commits the staged selection', async () => {
    const updateModelValue = vi.fn();
    const onConfirm = vi.fn();
    const controlled = ref<never[]>([]);
    const { wrapper } = createInstance({
      modelValue: controlled,
      multiple: true,
      needConfirm: true,
      'onUpdate:modelValue': updateModelValue,
      onConfirm,
    });
    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);
    expect(updateModelValue).not.toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();

    await clickConfirmCancelBtn(wrapper);
    await nextTick();
    expect(updateModelValue).toHaveBeenCalledTimes(1);
    expect(updateModelValue).toHaveBeenCalledWith([['guide', 'disciplines', 'consistency']]);
    expect(onConfirm).toHaveBeenCalledWith([['guide', 'disciplines', 'consistency']]);
    expect(controlled.value).toEqual([]);
  });
});
