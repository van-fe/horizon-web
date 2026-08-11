import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HCascader from '../src/Cascader';
import HPicker from '../../Picker/src/Picker';
import HTagGroup from '../../Tag/src/TagGroup';
import HTooltip from '../../Tooltip/src/Tooltip';
import CascaderItem from '../src/components/CascaderItem';
import type {
  HCascaderExtendOption,
  HCascaderFilterFunction,
  HCascaderFilterSortFunction,
  HCascaderOption,
} from '../src/utils/types';
import { createInstance, openCascader } from './cascader-helper';
import { sleep } from '~/utils/tools';
import { HFormItemErrorInjectedKey } from '../../Form/src/utils/injectedKeys';

const simpleOptions: HCascaderOption[] = [
  {
    value: 'root',
    label: 'Root',
    children: [
      { value: 'alpha', label: 'Alpha', isLeaf: true },
      { value: 'beta', label: 'Beta', isLeaf: true },
    ],
  },
];

describe('Cascader remaining public props', () => {
  test('form validation errors override the explicit picker input status', () => {
    const wrapper = mount(HCascader, {
      props: {
        options: simpleOptions,
        inputStatus: 'warning',
        toBody: false,
      },
      global: {
        provide: {
          [HFormItemErrorInjectedKey as symbol]: ref('Invalid cascader value'),
        },
      },
    });

    expect(wrapper.getComponent(HPicker).props('inputStatus')).toBe('error');
  });

  test('forwards picker presentation, popup, icon and timing contracts', () => {
    const popoverOptions = { distance: 18 };
    const wrapper = mount(HCascader, {
      props: {
        options: simpleOptions,
        toBody: false,
        size: 'small',
        popperClassName: 'cascader-contract-popper',
        inputStatus: 'warning',
        popoverOptions,
        hoverShowDelay: 12,
        hoverHideDelay: 34,
        placement: 'top-end',
        flip: false,
        dropdownIcon: false,
        searchIcon: false,
        fitInputWidth: 'fit-content',
        panelFilterInputValue: 'remote',
        panelInputPlaceholder: 'Filter options',
        fitContentInputMinWidth: 24,
        showPopoverContentOnly: true,
        confirmButtonText: 'Apply',
        cancelButtonText: 'Dismiss',
        needConfirm: true,
      },
    });
    const picker = wrapper.getComponent(HPicker);

    expect(picker.props()).toMatchObject({
      size: 'small',
      panelClass: 'cascader-contract-popper',
      inputStatus: 'warning',
      hoverShowDelay: 12,
      hoverHideDelay: 34,
      placement: 'top-end',
      dropdownIcon: false,
      searchIcon: false,
      fitInputWidth: 'fit-content',
      panelInputPlaceholder: 'Filter options',
      fitContentInputMinWidth: 24,
      showPopoverContentOnly: true,
      confirmButtonText: 'Apply',
      cancelButtonText: 'Dismiss',
    });
    expect(picker.props('popoverOptions')).toEqual({ distance: 18, flip: false });
  });

  test('formats full and leaf paths and applies initialValue', async () => {
    const full = createInstance({
      modelValue: ['guide', 'disciplines', 'feedback'],
      showCheckedStrategy: 'fullPath',
      pathSeparator: '>',
    });
    expect(full.pickerInput.text()).toContain('Guide > Disciplines > Feedback');

    const leaf = createInstance({
      modelValue: ['guide', 'disciplines', 'feedback'],
      showCheckedStrategy: 'leaf',
    });
    expect(leaf.pickerInput.text()).toContain('Feedback');
    expect(leaf.pickerInput.text()).not.toContain('Guide');

    const initial = createInstance({ initialValue: ['guide', 'disciplines', 'feedback'] });
    await nextTick();
    expect(initial.modelValue.value).toEqual(['guide', 'disciplines', 'feedback']);
  });

  test('configures collapsed multiple tags and statistic output', async () => {
    const values = [
      ['guide', 'disciplines', 'feedback'],
      ['component', 'form', 'checkbox'],
    ];
    const collapsed = createInstance({
      modelValue: values,
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      maxCollapseTags: 1,
      collapseTagsFillUp: false,
      collapsedTagsProps: { color: '#f00' },
      tooltipShowAfter: 11,
      tooltipHideAfter: 22,
    });
    await nextTick();
    const group = collapsed.wrapper.getComponent(HTagGroup);
    expect(group.props()).toMatchObject({
      collapse: true,
      collapseUseTooltip: true,
      minDisplayed: 1,
      fillUp: false,
      tooltipShowAfter: 11,
      tooltipHideAfter: 22,
    });
    expect(group.props('collapseTagProps')).toEqual({ clickable: false, color: '#f00' });

    const statistic = createInstance({
      modelValue: values,
      multiple: true,
      useStatistic: true,
      statisticText: 'choices',
    });
    await nextTick();
    expect(statistic.pickerInput.text()).toContain('choices (2)');
  });

  test('uses custom option fields, sorting and filter methods', async () => {
    const filterMethod = vi.fn<HCascaderFilterFunction>((input, paths) =>
      Boolean(paths.at(-1)?.label.toLowerCase().includes(input.toLowerCase())),
    );
    const filterResultSort = vi.fn<HCascaderFilterSortFunction>(
      (left: HCascaderExtendOption, right: HCascaderExtendOption) =>
        String(right.label).localeCompare(String(left.label)),
    );
    const options = [
      { code: 'root', name: 'Root', nodes: [
        { code: 'a', name: 'Alpha', leaf: true },
        { code: 'b', name: 'Beta', leaf: true },
      ] },
    ] as unknown as HCascaderOption[];
    const wrapper = mount(HCascader, {
      props: {
        options,
        toBody: false,
        multiple: true,
        filterable: true,
        fieldMap: { value: 'code', label: 'name', children: 'nodes', isLeaf: 'leaf' },
        filterMethod,
        filterResultSort,
        filterMaxResult: 5,
      },
      attachTo: document.body,
    });
    await wrapper.get('input').setValue('a');
    await sleep(220);

    expect(filterMethod).toHaveBeenCalled();
    expect(filterResultSort).toHaveBeenCalled();
    expect(wrapper.findAllComponents(CascaderItem).map(item => item.text()).join(' ')).toContain('Alpha');
  });

  test('supports inputAble independently from filtering', async () => {
    const onInput = vi.fn();
    const onSearch = vi.fn();
    const wrapper = mount(HCascader, {
      props: { options: simpleOptions, toBody: false, inputAble: true, onInput, onSearch },
      attachTo: document.body,
    });
    await openCascader(wrapper, 'click', 0);
    const input = wrapper.get('input.h-picker__input--inner');
    expect(input.attributes('readonly')).toBeUndefined();
    await input.setValue('custom query');
    await sleep(220);
    expect(onInput).toHaveBeenLastCalledWith('custom query');
    expect(onSearch).not.toHaveBeenCalled();
  });

  test('applies search panel width, item wrapping, icons and CSS max lines', async () => {
    const wrapper = mount(HCascader, {
      props: {
        options: simpleOptions,
        toBody: false,
        multiple: true,
        filterable: true,
        searchPanelWidth: 420,
        maxPanelItemWidth: 180,
        showTooltip: false,
        optionMaxLines: 3,
        expandIcon: 'add',
        selectedIcon: 'close',
      },
      attachTo: document.body,
    });
    await wrapper.get('input').setValue('a');
    await sleep(220);
    expect(wrapper.get('.h-cascader-search-panel').attributes('style')).toContain('width: 420px');
    expect(wrapper.get('.h-cascader-item__content-wrapper').attributes('style')).toContain(
      'max-width: 180px',
    );
    expect(wrapper.get('.h-cascader-item__content-wrapper').attributes('style')).toContain(
      'white-space: normal',
    );
    expect(wrapper.getComponent(HTooltip).props('overflow')).toBe(false);
    expect(wrapper.get('.h-cascader-search-panel').attributes('style')).toContain(
      '--h-cascader-size-item-max-line: 3',
    );

    const icons = mount(HCascader, {
      props: {
        options: simpleOptions,
        toBody: false,
        expandIcon: 'add',
        selectedIcon: 'close',
      },
      attachTo: document.body,
    });
    await openCascader(icons, 'click', 0);
    expect(icons.find('.h-icon_add').exists()).toBe(true);
    await icons.findComponent(CascaderItem).trigger('click');
    await icons.findAllComponents(CascaderItem).at(-1)?.trigger('click');
    expect(icons.find('.h-icon_close').exists()).toBe(true);
  });

  test('filters from external panel input and renders tags inside the confirmation panel', async () => {
    const wrapper = mount(HCascader, {
      props: {
        options: simpleOptions,
        modelValue: [['root', 'alpha']],
        toBody: false,
        multiple: true,
        needConfirm: true,
        panelFilterOption: true,
        panelFilterInputValue: 'alpha',
        useBuildInPanelFilter: true,
        panelInputPlaceholder: 'Panel search',
        showTagsInPanel: true,
      },
      global: {
        directives: {
          loading: {
            mounted(element, binding) {
              element.dataset.loadingContract = binding.value.text;
            },
          },
        },
      },
      attachTo: document.body,
    });
    await openCascader(wrapper, 'click', 0);
    expect(wrapper.get('.h-cascader__panel-tags').text()).toContain('Root / Alpha');
    expect(wrapper.get('.h-picker__panel-input input').attributes('placeholder')).toBe(
      'Panel search',
    );

    const loading = mount(HCascader, {
      props: {
        options: simpleOptions,
        toBody: false,
        panelsLoading: { text: 'Loading options' },
      },
      global: {
        directives: {
          loading: {
            mounted(element, binding) {
              element.dataset.loadingContract = binding.value.text;
            },
          },
        },
      },
      attachTo: document.body,
    });
    await openCascader(loading, 'click', 0);
    expect(loading.get('.h-cascader-panels').attributes('data-loading-contract')).toBe(
      'Loading options',
    );
  });

  test('expandStrictly and reserveKeyword change real selection behavior', async () => {
    const strict = createInstance({ checkStrictly: true, expandStrictly: false });
    await openCascader(strict.wrapper, 'click', 0);
    await strict.wrapper.findAllComponents(CascaderItem)[0].trigger('click');
    await nextTick();
    expect(strict.wrapper.findAll('.h-cascader-panel').length).toBeGreaterThan(1);

    const reserved = createInstance({ multiple: true, filterable: true, reserveKeyword: false });
    await reserved.pickerInput.find('input').setValue('feedback');
    await sleep(220);
    await reserved.wrapper.findComponent(CascaderItem).trigger('click');
    await nextTick();
    expect((reserved.pickerInput.find('input').element as HTMLInputElement).value).toBe('');
  });
});
