import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTreeSelect from '../src/TreeSelect';
import HPicker from '~/components/Picker/src/Picker';
import HTagGroup from '~/components/Tag/src/TagGroup';
import HTree from '~/components/Tree/src/Tree';
import type { HTreeData, HTreeNodeData } from '~/components/Tree/src/utils/types';

const ContractIcon = defineComponent({
  name: 'ContractIcon',
  setup: () => () => <svg data-test="contract-icon" />,
});

const basicTree: HTreeNodeData[] = [
  {
    value: 'root',
    label: 'Root',
    children: [
      { value: 'leaf', label: 'Leaf' },
      { value: 'other', label: 'Other' },
    ],
  },
];

describe('TreeSelect public prop contracts', () => {
  test('applies trigger, picker, popover, search-panel, statistic, and confirmation props', async () => {
    const wrapper = mount(
      () => (
        <HTreeSelect
          selectedValues={['leaf', 'other']}
          treeData={basicTree}
          multiple
          size="small"
          inputStyle="no-border"
          popperClassName="tree-contract-panel"
          inputStatus="warning"
          popoverOptions={{ distance: 17 }}
          trigger="hover"
          hoverShowDelay={0}
          hoverHideDelay={5}
          useStatistic
          statisticText="Chosen"
          dropdownIcon={false}
          needConfirm
          confirmButtonText="Apply tree"
          cancelButtonText="Discard tree"
          placement="top-end"
          flip={false}
          fitInputWidth="fit-content"
          searchPanelWidth={321}
          useBuildInPanelFilter
          searchInputPlaceholder="Search alias"
          searchIcon={ContractIcon}
          fitContentInputMinWidth={18}
          toBody={false}
        />
      ),
      { attachTo: document.body },
    );
    const picker = wrapper.getComponent(HPicker);

    expect(wrapper.get<HTMLInputElement>('.h-picker__input input').element.value).toBe(
      'Chosen (2)',
    );
    expect(wrapper.get('.h-picker__input').classes()).toEqual(
      expect.arrayContaining(['h-picker__input--small', 'is-warning']),
    );
    expect(wrapper.find('.h-picker__input--dropdown').exists()).toBe(false);
    expect(picker.props()).toMatchObject({
      inputStyle: 'no-border',
      placement: 'top-end',
      fitInputWidth: 'fit-content',
      panelWidth: 321,
      fitContentInputMinWidth: 18,
      hoverShowDelay: 0,
      hoverHideDelay: 5,
    });
    expect(picker.props('popoverOptions')).toMatchObject({ distance: 17, flip: false });

    await wrapper.get('.h-picker').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(wrapper.get('.h-picker__pop-content--wrapper').classes()).toContain(
        'tree-contract-panel',
      ),
    );
    expect(wrapper.get('.h-picker__panel-input input').attributes('placeholder')).toBe(
      'Search alias',
    );
    expect(wrapper.find('[data-test="contract-icon"]').exists()).toBe(true);
    expect(wrapper.get('.h-picker__pop-content--confirm-wrapper').text()).toContain('Discard tree');
    expect(wrapper.get('.h-picker__pop-content--confirm-wrapper').text()).toContain('Apply tree');
    expect(wrapper.get('.h-picker__pop-content').attributes('style')).toContain('width: 321px');

    wrapper.unmount();
  });

  test('forwards every collapse-tag option and uses initialValue after clearing', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(
      () => (
        <HTreeSelect
          modelValue={['leaf', 'other']}
          initialValue={['root']}
          treeData={basicTree}
          multiple
          clearable
          collapseTags
          collapseTagsTooltip
          maxCollapseTags={1}
          collapseTagsFillUp={false}
          collapsedTagsProps={{ type: 'warning', closable: false }}
          tooltipShowAfter={7}
          tooltipHideAfter={9}
          toBody={false}
          onUpdate:modelValue={onUpdate}
        />
      ),
      { attachTo: document.body },
    );
    const tagGroup = wrapper.getComponent(HTagGroup);

    expect(tagGroup.classes()).toContain('is-collapsed');
    expect(tagGroup.props()).toMatchObject({
      collapse: true,
      collapseUseTooltip: true,
      minDisplayed: 1,
      fillUp: false,
      tooltipShowAfter: 7,
      tooltipHideAfter: 9,
    });
    expect(tagGroup.props('collapseTagProps')).toMatchObject({
      clickable: false,
      type: 'warning',
      closable: false,
    });

    await wrapper.get('.h-picker__input').trigger('mouseenter');
    await wrapper.get('.h-picker__input--icon.is-clear').trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenCalledWith(['root']);
    wrapper.unmount();
  });

  test('maps filtering, layout, selection, tree appearance, and drag props to observable tree output', async () => {
    const filterMethod = vi.fn(() => true);
    const highlightMethod = vi.fn((label: string) => label);
    const beforeDrop = vi.fn(() => true);
    const mappedTree = [
      {
        key: 'root',
        name: 'Mapped root',
        nodes: [
          { key: 'leaf', name: 'Mapped leaf' },
          { key: 'locked', name: 'Locked', disabled: true, draggable: false },
        ],
      },
    ] as unknown as HTreeData[];
    const wrapper = mount(
      () => (
        <HTreeSelect
          treeData={mappedTree}
          fieldMap={{ value: 'key', label: 'name', children: 'nodes' }}
          selectedValues={['leaf']}
          multiple
          multipleLimit={1}
          height={140}
          maxHeight="180"
          useVirtualScroll
          treeSize="huge"
          treeWidth="360px"
          filterable
          filterMethod={filterMethod}
          filterToHideChildren={false}
          panelFilterable={false}
          panelFilterInputValue="fallback-filter"
          panelInputPlaceholder="Panel search"
          highlightMethod={highlightMethod}
          expandFilteredTree={false}
          foldIcon={ContractIcon}
          expandIcon={ContractIcon}
          prefixIcon={ContractIcon}
          checkStrictly
          checkOnClickLeaf={false}
          stress
          isDefaultExpandAll
          isDefaultExpandParent={false}
          rootClassName="tree-contract-root"
          rootStyle={{ color: 'rgb(1, 2, 3)' }}
          indent={13}
          tooltip={false}
          parentEffectDisabledChild
          showCheckbox={false}
          showRadio
          showLine
          expandPanelByChildren
          draggable
          draggableIcon={ContractIcon}
          undraggableIcon={ContractIcon}
          draggableIconAlwaysVisible
          dragOnHandler
          dragToLeaf
          beforeDrop={beforeDrop}
          toBody={false}
        />
      ),
      { attachTo: document.body },
    );

    await wrapper.get('.h-picker__input').trigger('click');
    await nextTick();
    const tree = wrapper.getComponent(HTree);

    expect(tree.classes()).toEqual(
      expect.arrayContaining(['h-tree--huge', 'tree-contract-root', 'is-draggable']),
    );
    expect(tree.attributes('style')).toContain('color: rgb(1, 2, 3)');
    expect(tree.props()).toMatchObject({
      height: 140,
      maxHeight: 180,
      useVirtualScroll: true,
      filterable: true,
      filterToHideChildren: false,
      filterInputValue: 'fallback-filter',
      expandFilteredTree: false,
      checkStrictly: true,
      multiple: true,
      multipleLimit: 1,
      selectedValues: ['leaf'],
      checkOnClickLeaf: false,
      stress: true,
      isDefaultExpandAll: true,
      isDefaultExpandParent: false,
      indent: 13,
      tooltip: false,
      parentEffectDisabledChild: true,
      showCheckbox: false,
      showRadio: true,
      showLine: true,
      expandWrapperByChildren: true,
      draggable: true,
      draggableIconAlwaysVisible: true,
      dragOnHandler: true,
      dragToLeaf: true,
    });
    expect(tree.props('filterMethod')).toBe(filterMethod);
    expect(tree.props('highlightMethod')).toBe(highlightMethod);
    expect(tree.props('beforeDrop')).toBe(beforeDrop);
    expect(tree.props('foldIcon')).toBe(ContractIcon);
    expect(tree.props('expandIcon')).toBe(ContractIcon);
    expect(tree.props('prefixIcon')).toBe(ContractIcon);
    expect(tree.props('draggableIcon')).toBe(ContractIcon);
    expect(tree.props('undraggableIcon')).toBe(ContractIcon);
    expect(wrapper.findAll('[data-test="contract-icon"]').length).toBeGreaterThan(2);
    expect(wrapper.get('[data-uuid="leaf"]').attributes('aria-selected')).toBe('true');
    expect(wrapper.get('[data-uuid="leaf"]').text()).toContain('fallback-filter');
    expect(highlightMethod).toHaveBeenCalled();
    expect(wrapper.get('[data-uuid="leaf"]').attributes('style')).toContain('padding-left: 57px');
    expect(wrapper.get('[data-uuid="locked"]').find('.h-tree-item__draggable-icon').exists()).toBe(
      true,
    );

    wrapper.unmount();

    const radio = mount(
      () => (
        <HTreeSelect
          treeData={basicTree}
          showRadio
          checkStrictly
          isDefaultExpandAll
          toBody={false}
        />
      ),
      { attachTo: document.body },
    );
    await radio.get('.h-picker__input').trigger('click');
    expect(radio.get('[data-uuid="leaf"]').find('.h-tree-item__radio').exists()).toBe(true);
    radio.unmount();
  });

  test('uses built-in panel filtering, custom empty text, and reserveKeyword selection policy', async () => {
    const wrapper = mount(
      () => (
        <HTreeSelect
          treeData={basicTree}
          multiple
          filterable
          panelFilterable
          useBuildInPanelFilter
          panelInputPlaceholder="Filter nodes"
          emptyText="No matching nodes"
          inputEmitFrequency={0}
          toBody={false}
        />
      ),
      { attachTo: document.body },
    );

    await wrapper.get('.h-picker__input').trigger('click');
    const panelInput = wrapper.get<HTMLInputElement>('.h-picker__panel-input input');
    expect(panelInput.attributes('placeholder')).toBe('Filter nodes');
    await panelInput.setValue('missing');
    await vi.waitFor(() =>
      expect(wrapper.get('.h-tree__empty').text()).toContain('No matching nodes'),
    );

    await panelInput.setValue('Leaf');
    await vi.waitFor(() => expect(wrapper.find('[data-uuid="leaf"]').exists()).toBe(true));
    wrapper.unmount();

    const onInput = vi.fn();
    const reserve = mount(
      () => (
        <HTreeSelect
          treeData={basicTree}
          multiple
          filterable
          reserveKeyword={false}
          inputEmitFrequency={0}
          checkOnClickLeaf
          toBody={false}
          onInput={onInput}
        />
      ),
      { attachTo: document.body },
    );
    await reserve.get('.h-picker__input').trigger('click');
    const triggerInput = reserve.get<HTMLInputElement>('.h-picker__input input');
    await triggerInput.setValue('Leaf');
    await vi.waitFor(() => expect(onInput).toHaveBeenCalledWith('Leaf'));
    await reserve.get('[data-uuid="leaf"]').trigger('click');
    await vi.waitFor(() => expect(onInput).toHaveBeenLastCalledWith(''));
    reserve.unmount();
  });
});
