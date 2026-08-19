import { ComponentClassBlock } from '@aurora/utils';
import { IconAdd, IconCar } from '@aurora/icon';
import { mount } from '@vue/test-utils';
import { createApp, defineComponent, h, nextTick, reactive, ref, shallowReactive } from 'vue';
import type { ToRefs } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import HCheckbox from '../../Checkbox';
import HInput from '../../Input';
import HRadio from '../../Radio';
import HScrollbar from '../../Scrollbar/src/Scrollbar';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import HTree from '../index';
import HTreeItem from '../src/components/TreeItem';
import type { TreeProps } from '../src/composables/useProps';
import { useTreeEmits } from '../src/composables/useEmits';
import type { HTreeData } from '../src/utils/types';
import useFilter from '../src/hooks/useFilter';
import useTreeNodeMove from '../src/hooks/useTreeNodeMove';
import TreeHelper from '~/utils/useTree';
import { transformUuid } from '../src/utils/config';
import { createInstance } from './tree-helper';

const treeClassHelper = new ComponentClassBlock('tree');
const treeItemClassHelper = new ComponentClassBlock('tree-item');

function getTreeItem(
  element: Awaited<ReturnType<typeof createInstance>>['element'],
  value: string,
) {
  return element.findAllComponents(HTreeItem).find(item => item.attributes('data-uuid') === value)!;
}

function dispatchPointer(
  target: EventTarget,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
  options: PointerEventInit = {},
) {
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      button: 0,
      clientY: type === 'pointerdown' ? 10 : 42,
      pointerId: 31,
      isPrimary: true,
      ...options,
    }),
  );
}

async function beginDrag(
  element: Awaited<ReturnType<typeof createInstance>>['element'],
  sourceValue: string,
  target: Element,
) {
  const source = getTreeItem(element, sourceValue);
  const handler = source.get(`.${treeItemClassHelper.e('draggable-icon')}`);
  dispatchPointer(handler.element, 'pointerdown');
  dispatchPointer(target, 'pointermove');
  await nextTick();
  return source;
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Tree Vue adapter coverage in Chromium', () => {
  test('installs through the public component entry', () => {
    const app = createApp({ render: () => null });

    app.use(HTree);

    expect(app.component(HTree.name!)).toBe(HTree);
  });

  test('accepts optional model and VNode payloads through the public emit contract', () => {
    const event = new MouseEvent('click');
    const node = { value: 1, label: 'Numeric node' };

    expect(useTreeEmits['update:filterValue'](undefined)).toBe(true);
    expect(useTreeEmits.click(event, 1, node)).toBe(true);
    expect(useTreeEmits.contextmenu(event, 1, node)).toBe(true);
  });

  test('rejects a missing adapter move target without mutating controlled data', () => {
    const treeData: HTreeData[] = [
      {
        value: 'source',
        label: 'Source',
        children: [{ value: 'child', label: 'Child' }],
      },
    ];
    const tree = new TreeHelper<HTreeData, any>(treeData, {}, transformUuid);
    const setNodeChildren = vi.fn();
    const { moveNode } = useTreeNodeMove(tree, {
      setNodeChildren,
      deleteNode: () => [],
      addNodeChildren: () => undefined,
    });

    expect(moveNode({ fromValue: 'source', toValue: 'missing', position: 'after' })).toBe(false);
    expect(moveNode({ fromValue: 'source', toValue: 'child', position: 'child' })).toBe(false);
    expect(setNodeChildren).not.toHaveBeenCalled();
    expect(treeData[0].children?.map(node => node.value)).toStrictEqual(['child']);
  });

  test('adapts replaced external filters and preserves the last valid normalized projection', async () => {
    const tree = new TreeHelper<HTreeData, any>(
      [
        { value: 'alpha', label: 'Alpha' },
        { value: 'beta', label: 'Beta' },
      ],
      {},
      transformUuid,
    );
    const externalFilter = ref<string | undefined>('Alpha');
    const props = shallowReactive({
      filterValue: externalFilter,
      filterInputValue: ref<string | undefined>(),
      filterable: ref(true),
      filterMethod: ref<(input: string, node: any) => boolean>((input, node) =>
        String(node.label).startsWith(input),
      ),
      filterToHideChildren: ref(true),
      expandFilteredTree: ref(true),
    }) as unknown as ToRefs<TreeProps>;
    let filter!: ReturnType<typeof useFilter>;
    const wrapper = mount(
      defineComponent({
        setup() {
          filter = useFilter(props, vi.fn(), tree, reactive(new Set()), vi.fn());
          return () => null;
        },
      }),
    );

    expect(filter.filterMethod.value).toBe(props.filterMethod!.value);
    expect(filter.expandFilteredTree.value).toBe(true);
    expect(filter.visibleItems.value.map(node => node.value)).toStrictEqual(['alpha']);

    props.filterValue = ref('Beta');
    await nextTick();
    expect(filter.filterValue.value).toBe('Beta');
    expect(filter.visibleItems.value.map(node => node.value)).toStrictEqual(['beta']);

    props.filterValue = ref(undefined);
    props.filterable.value = false;
    props.filterInputValue!.value = 'Alpha';
    props.filterMethod!.value = () => false;
    await nextTick();
    expect(filter.visibleItems.value.map(node => node.value)).toStrictEqual(['alpha']);

    tree.originTreeData.push({ value: 'alpha', label: 'Temporary duplicate' });
    props.filterInputValue!.value = 'Beta';
    await nextTick();
    expect(filter.visibleItems.value.map(node => node.value)).toStrictEqual(['beta']);
    wrapper.unmount();

    const invalidTree = new TreeHelper<HTreeData, any>(
      [{ value: 'stable', label: 'Stable' }],
      {},
      transformUuid,
    );
    invalidTree.originTreeData.push({ value: 'stable', label: 'Duplicate' });
    const invalidProps = shallowReactive({
      filterValue: ref('Stable'),
      filterInputValue: ref<string | undefined>(),
      filterable: ref(true),
      filterMethod: ref(undefined),
      filterToHideChildren: ref(true),
      expandFilteredTree: ref(true),
    }) as unknown as ToRefs<TreeProps>;
    let invalidFilter!: ReturnType<typeof useFilter>;
    const invalidWrapper = mount(
      defineComponent({
        setup() {
          invalidFilter = useFilter(
            invalidProps,
            vi.fn(),
            invalidTree,
            reactive(new Set()),
            vi.fn(),
          );
          return () => null;
        },
      }),
    );
    expect(invalidFilter.visibleItems.value).toStrictEqual([]);
    invalidWrapper.unmount();
  });

  test('renders function labels and scoped node content with the documented icon precedence', async () => {
    vi.useFakeTimers();
    const renderLabel = vi.fn((node: HTreeData) => h('strong', `Rendered ${node.value}`));
    const functionLabel = await createInstance({
      tooltip: true,
      tooltipShowAfter: 0,
      treeData: [{ value: 'rendered', label: renderLabel }],
    });
    const content = functionLabel.element.get(`.${treeItemClassHelper.e('content')}`);
    Object.defineProperty(content.element, 'scrollWidth', { configurable: true, value: 200 });
    Object.defineProperty(content.element, 'scrollHeight', { configurable: true, value: 40 });
    vi.spyOn(content.element, 'getBoundingClientRect').mockReturnValue({
      width: 20,
      height: 20,
      top: 0,
      bottom: 20,
      left: 0,
      right: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    expect(content.get('strong').text()).toBe('Rendered rendered');
    expect(renderLabel).toHaveBeenCalledWith(expect.objectContaining({ value: 'rendered' }));
    await content.trigger('mouseenter');
    await vi.runAllTimersAsync();
    await nextTick();
    expect(document.body.querySelector('.h-tooltip__content')?.textContent).toContain(
      'Rendered rendered',
    );
    functionLabel.wrapper.unmount();

    const scopedRender = vi.fn(({ data }: { data: { value: string | number } }) => [
      <span data-node-value={data.value}>Slot {data.value}</span>,
    ]);
    const slotted = await createInstance(
      {
        prefixIcon: IconCar,
        treeData: [
          {
            value: 'custom-prefix',
            label: 'Custom prefix',
            prefixIcon: IconAdd,
            prefixIconClassName: 'custom-prefix-class',
          },
          { value: 'default-prefix', label: 'Default prefix' },
        ],
      },
      false,
      { treeNodeRender: scopedRender },
    );

    expect(scopedRender).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ value: 'custom-prefix' }) }),
    );
    expect(slotted.element.get('[data-node-value="custom-prefix"]').text()).toBe(
      'Slot custom-prefix',
    );
    expect(getTreeItem(slotted.element, 'custom-prefix').findComponent(IconAdd).exists()).toBe(
      true,
    );
    expect(getTreeItem(slotted.element, 'custom-prefix').classes()).not.toContain(
      'custom-prefix-class',
    );
    expect(getTreeItem(slotted.element, 'custom-prefix').get('.custom-prefix-class')).toBeTruthy();
    expect(getTreeItem(slotted.element, 'default-prefix').findComponent(IconCar).exists()).toBe(
      true,
    );
    slotted.wrapper.unmount();
  });

  test('keeps expand and loading controls independent from node clicks and whole-row dragging', async () => {
    let resolveLoad: ((children: HTreeData[]) => void) | undefined;
    const dynamicLoad = vi.fn(
      () =>
        new Promise<HTreeData[]>(resolve => {
          resolveLoad = resolve;
        }),
    );
    const onClick = vi.fn();
    const onExpand = vi.fn();
    const { wrapper, element } = await createInstance({
      draggable: true,
      dragOnHandler: false,
      dynamicLoad,
      onClick,
      onExpand,
      treeData: [{ value: 'lazy', label: 'Lazy', isLeaf: false, children: [] }],
    });
    const lazy = getTreeItem(element, 'lazy');
    const expandIcon = lazy.get(`.${treeItemClassHelper.e('expand-icon')}`);

    dispatchPointer(expandIcon.element, 'pointerdown');
    dispatchPointer(document, 'pointermove');
    await nextTick();
    expect(lazy.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    await expandIcon.trigger('click');
    await nextTick();
    expect(onExpand).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
    expect(dynamicLoad).toHaveBeenCalledOnce();

    const loadingIcon = lazy.get(`.${treeItemClassHelper.e('loading-icon')}`);
    dispatchPointer(loadingIcon.element, 'pointerdown');
    dispatchPointer(document, 'pointermove');
    await nextTick();
    expect(lazy.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    resolveLoad?.([]);
    await Promise.resolve();
    await nextTick();
    wrapper.unmount();
  });

  test('selects through checkbox and radio controls without starting a whole-row drag', async () => {
    const checkboxClick = vi.fn();
    const checkbox = await createInstance({
      draggable: true,
      dragOnHandler: false,
      multiple: true,
      showCheckbox: true,
      onClick: checkboxClick,
      treeData: [{ value: 'checkbox', label: 'Checkbox' }],
    });
    const checkboxItem = getTreeItem(checkbox.element, 'checkbox');
    const checkboxControl = checkboxItem.get(`.${treeItemClassHelper.e('checkbox')}`);
    dispatchPointer(checkboxControl.element, 'pointerdown');
    dispatchPointer(document, 'pointermove');
    await nextTick();
    expect(checkboxItem.classes()).not.toContain(treeItemClassHelper.is('dragging'));
    await checkboxControl.trigger('click');
    expect(checkbox.element.findComponent(HCheckbox).props('modelValue')).toBe(true);
    expect(checkboxClick).not.toHaveBeenCalled();
    checkbox.wrapper.unmount();

    const radioClick = vi.fn();
    const radio = await createInstance({
      draggable: true,
      dragOnHandler: false,
      showRadio: true,
      checkStrictly: true,
      onClick: radioClick,
      treeData: [{ value: 'radio', label: 'Radio' }],
    });
    const radioItem = getTreeItem(radio.element, 'radio');
    const radioControl = radioItem.get(`.${treeItemClassHelper.e('radio')}`);
    dispatchPointer(radioControl.element, 'pointerdown');
    dispatchPointer(document, 'pointermove');
    await nextTick();
    expect(radioItem.classes()).not.toContain(treeItemClassHelper.is('dragging'));
    await radioControl.trigger('click');
    expect(radio.element.findComponent(HRadio).props('modelValue')).toBe(true);
    expect(radioClick).not.toHaveBeenCalled();
    radio.wrapper.unmount();

    const selectedValues = ref<Array<string | number>>([]);
    const rowRadio = await createInstance({
      showRadio: true,
      checkOnClickLeaf: true,
      selectedValues,
      'onUpdate:selectedValues': values => {
        selectedValues.value = values;
      },
      treeData: [{ value: 7, label: 'Numeric radio leaf' }],
    });
    await rowRadio.element.get('[data-uuid="7"]').trigger('click');
    expect(selectedValues.value).toStrictEqual([7]);
    rowRadio.wrapper.unmount();

    const disabledSelection = ref<Array<string | number>>([]);
    const disabled = await createInstance({
      multiple: true,
      showCheckbox: true,
      selectedValues: disabledSelection,
      'onUpdate:selectedValues': values => {
        disabledSelection.value = values;
      },
      treeData: [{ value: 'disabled', label: 'Disabled', disabled: true }],
    });
    await disabled.element.get('[data-uuid="disabled"] .h-tree-item__checkbox').trigger('click');
    expect(disabledSelection.value).toStrictEqual([]);
    disabled.domRef.value?.setSelectedStatus(['missing'], true);
    expect(disabled.domRef.value?.getSelectedNodes().values).toStrictEqual([]);
    disabled.wrapper.unmount();
  });

  test('clears filter expansion and exercises built-in highlight fallback and cleanup', async () => {
    vi.useFakeTimers();
    const filtered = await createInstance({
      filterable: true,
      expandFilteredTree: true,
      treeData: [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'needle', label: 'Needle' }],
        },
      ],
    });
    const filterInput = filtered.wrapper.get('input');
    await filterInput.setValue('Needle');
    await vi.runAllTimersAsync();
    await nextTick();
    expect(getTreeItem(filtered.element, 'needle').exists()).toBe(true);
    expect(filtered.domRef.value?.getExpandNodes().values).toContain('parent');

    await filterInput.setValue('');
    await nextTick();
    expect(filtered.domRef.value?.getExpandNodes().values).toStrictEqual([]);
    expect(filtered.element.find('[data-uuid="needle"]').exists()).toBe(false);
    filtered.wrapper.unmount();

    const highlightsDescriptor = Object.getOwnPropertyDescriptor(CSS, 'highlights');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    Object.defineProperty(CSS, 'highlights', {
      configurable: true,
      value: undefined,
    });
    const unsupported = await createInstance({
      filterable: true,
      filterInputValue: 'alp',
      filterMethod: () => true,
      treeData: [{ value: 'alpha', label: 'Alpha' }],
    });
    await vi.runAllTimersAsync();
    await nextTick();
    expect(unsupported.element.get('[data-uuid="alpha"]').text()).toBe('Alpha');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("doesn't support Highlight API"));
    unsupported.wrapper.unmount();
    if (highlightsDescriptor) Object.defineProperty(CSS, 'highlights', highlightsDescriptor);

    const filterInputValue = ref('alp');
    const noTextContainer = await createInstance(
      {
        filterable: true,
        filterInputValue,
        filterMethod: () => true,
        treeData: [{ value: 'alpha-slot', label: 'Alpha slot' }],
      },
      false,
      { treeNodeRender: ({ data }) => [<span data-custom-node>{data.label as string}</span>] },
    );
    await vi.runAllTimersAsync();
    filterInputValue.value = 'missing';
    await nextTick();
    expect(noTextContainer.element.get('[data-custom-node]').text()).toBe('Alpha slot');
    noTextContainer.wrapper.unmount();

    const emptyLabel = await createInstance({
      filterable: true,
      filterInputValue: 'missing',
      filterMethod: () => true,
      treeData: [{ value: 'empty-label', label: () => h('span') }],
    });
    await vi.runAllTimersAsync();
    await nextTick();
    expect(emptyLabel.element.get('[data-uuid="empty-label"]').text()).toBe('');
    emptyLabel.wrapper.unmount();
  });

  test('expands a hovered drag target and rejects a non-primary drag start', async () => {
    vi.useFakeTimers();
    const { wrapper, element } = await createInstance({
      draggable: true,
      showRadio: true,
      treeData: [
        { value: 'source', label: 'Source' },
        {
          value: 'target',
          label: 'Target',
          children: [{ value: 'target-child', label: 'Target child' }],
        },
      ],
    });
    const source = getTreeItem(element, 'source');
    const handler = source.get(`.${treeItemClassHelper.e('draggable-icon')}`);

    dispatchPointer(handler.element, 'pointerdown', { isPrimary: false });
    dispatchPointer(document, 'pointermove');
    await nextTick();
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));

    await beginDrag(element, 'source', getTreeItem(element, 'target').element);
    expect(element.find('[data-uuid="target-child"]').exists()).toBe(false);
    await vi.advanceTimersByTimeAsync(1000);
    await nextTick();
    expect(element.find('[data-uuid="target-child"]').exists()).toBe(true);

    dispatchPointer(document, 'pointercancel');
    await nextTick();
    expect(source.classes()).not.toContain(treeItemClassHelper.is('dragging'));
    wrapper.unmount();
  });

  test('restores a dragged branch after a veto and safely stops when its target disappears', async () => {
    const expandedValues = ref<Array<string | number>>(['source']);
    const treeData = ref<HTreeData[]>([
      {
        value: 'source',
        label: 'Source',
        children: [{ value: 'source-child', label: 'Source child' }],
      },
      { value: 'target', label: 'Target' },
    ]);
    const beforeDrop = vi.fn(() => false);
    const vetoed = await createInstance({
      draggable: true,
      treeData,
      expandValues: expandedValues,
      'onUpdate:expandValues': (values: Array<string | number>) => {
        expandedValues.value = values;
      },
      beforeDrop,
    });

    await beginDrag(vetoed.element, 'source', getTreeItem(vetoed.element, 'target').element);
    expect(vetoed.element.find('[data-uuid="source-child"]').exists()).toBe(false);
    const siblingZone = vetoed.element.get(
      `.${treeItemClassHelper.e('drag-over-wrap')}.${treeItemClassHelper.is('sibling')}`,
    );
    dispatchPointer(siblingZone.element, 'pointerup');
    await vi.waitFor(() => expect(beforeDrop).toHaveBeenCalledOnce());
    await vi.waitFor(() =>
      expect(vetoed.element.find('[data-uuid="source-child"]').exists()).toBe(true),
    );
    expect(treeData.value.map(node => node.value)).toStrictEqual(['source', 'target']);
    vetoed.wrapper.unmount();

    const disappearingData = ref<HTreeData[]>([
      { value: 'moving', label: 'Moving' },
      { value: 'vanishing', label: 'Vanishing' },
    ]);
    const disappearing = await createInstance({
      draggable: true,
      treeData: disappearingData,
    });
    await beginDrag(
      disappearing.element,
      'moving',
      getTreeItem(disappearing.element, 'vanishing').element,
    );
    disappearingData.value = [{ value: 'moving', label: 'Moving' }];
    await nextTick();
    dispatchPointer(document, 'pointerup');
    await nextTick();
    expect(disappearingData.value.map(node => node.value)).toStrictEqual(['moving']);
    expect(disappearing.element.classes(treeClassHelper.is('dragging') as string)).toBe(false);
    disappearing.wrapper.unmount();

    const rootVetoData = ref<HTreeData[]>([
      { value: 'root-a', label: 'Root A' },
      { value: 'root-b', label: 'Root B' },
    ]);
    const rootVeto = vi.fn(() => false);
    const rootDrop = await createInstance({
      draggable: true,
      treeData: rootVetoData,
      beforeDrop: rootVeto,
    });
    await beginDrag(rootDrop.element, 'root-b', getTreeItem(rootDrop.element, 'root-a').element);
    const top = rootDrop.element.get(`.${treeClassHelper.em('drag', 'top')}`);
    dispatchPointer(top.element, 'pointermove', { clientY: 0 });
    await nextTick();
    dispatchPointer(top.element, 'pointerup', { clientY: 0 });
    await vi.waitFor(() => expect(rootVeto).toHaveBeenCalledOnce());
    expect(rootVetoData.value.map(node => node.value)).toStrictEqual(['root-a', 'root-b']);
    rootDrop.wrapper.unmount();
  });

  test('renders huge continuation geometry and ignores unsupported keyboard commands', async () => {
    const { wrapper, element, domRef, selectedValues } = await createInstance({
      size: 'huge',
      showLine: true,
      stress: true,
      checkStrictly: true,
      isDefaultExpandAll: true,
      treeData: [
        {
          value: 'root',
          label: 'Root',
          children: [
            {
              value: 'first-branch',
              label: 'First branch',
              children: [{ value: 'first-leaf', label: 'First leaf' }],
            },
            {
              value: 'second-branch',
              label: 'Second branch',
              children: [{ value: 'second-leaf', label: 'Second leaf' }],
            },
          ],
        },
      ],
    });
    const firstLeaf = getTreeItem(element, 'first-leaf');
    expect(firstLeaf.classes()).toContain(treeItemClassHelper.is('stress'));
    expect(
      firstLeaf.get(`.${treeItemClassHelper.e('parent-shown-line')}`).attributes('style'),
    ).toContain('18px');

    const tree = element.get('[role="tree"]');
    const unsupported = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    tree.element.dispatchEvent(unsupported);
    expect(unsupported.defaultPrevented).toBe(false);

    await tree.trigger('keydown', { key: 'ArrowDown' });
    await tree.trigger('keydown', { key: 'Enter' });
    expect(selectedValues.value).toStrictEqual(['root']);
    domRef.value?.setCollapseStatusByValue(['missing'], true);
    expect(domRef.value?.getExpandNodes().values).toContain('missing');
    wrapper.unmount();
  });

  test('uses the documented filter size mapping and flushes queued scrolls on both renderers', async () => {
    vi.useFakeTimers();
    const size = ref<'huge' | 'medium'>('huge');
    const sized = await createInstance({ filterable: true, size });
    expect(sized.wrapper.getComponent(HInput).props('size')).toBe('large');
    size.value = 'medium';
    await nextTick();
    expect(sized.wrapper.getComponent(HInput).props('size')).toBe('medium');
    sized.wrapper.unmount();

    const originalScrollIntoView = Object.getOwnPropertyDescriptor(
      Element.prototype,
      'scrollIntoView',
    );
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    const virtual = await createInstance({
      treeData: [{ value: 'virtual', label: 'Virtual' }],
      useVirtualScroll: true,
      height: 100,
    });
    const virtualScroller = virtual.wrapper.getComponent(HVirtualScroller);
    virtualScroller.vm.$emit('scrollBegin');
    const virtualScroll = virtual.domRef.value?.scrollTo('virtual');
    await vi.runAllTimersAsync();
    await virtualScroll;
    expect(scrollIntoView).not.toHaveBeenCalled();
    virtualScroller.vm.$emit('scrollStop');
    await nextTick();
    expect(scrollIntoView).toHaveBeenCalledOnce();
    virtual.wrapper.unmount();

    scrollIntoView.mockClear();
    const native = await createInstance({
      treeData: [{ value: 'native', label: 'Native' }],
      height: 100,
    });
    const scrollbar = native.wrapper.getComponent(HScrollbar);
    scrollbar.vm.$emit('scroll');
    const nativeScroll = native.domRef.value?.scrollTo('native');
    await vi.runAllTimersAsync();
    await nativeScroll;
    expect(scrollIntoView).not.toHaveBeenCalled();
    scrollbar.vm.$emit('scrollEnd');
    await nextTick();
    expect(scrollIntoView).toHaveBeenCalledOnce();
    native.wrapper.unmount();

    const inactive = await createInstance({
      treeData: [{ value: 'inactive', label: 'Inactive' }],
    });
    const inactiveApi = inactive.domRef.value!;
    inactive.wrapper.unmount();
    await expect(inactiveApi.scrollTo('inactive')).resolves.toBeUndefined();

    if (originalScrollIntoView) {
      Object.defineProperty(Element.prototype, 'scrollIntoView', originalScrollIntoView);
    } else {
      delete (Element.prototype as Partial<Element>).scrollIntoView;
    }
  });
});
