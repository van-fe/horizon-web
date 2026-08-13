import { mount } from '@vue/test-utils';
import { computed, defineComponent, inject, nextTick, provide, reactive, ref } from 'vue';
import type { VNode } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import Tree from '~/utils/useTree';
import { HFormItemTriggerInjectedKey } from '../../Form/src/utils/injectedKeys';
import type { CascaderItemProps, CascaderProps } from '../src/composables/useProps';
import useEvents from '../src/hooks/useEvents';
import useModelValue from '../src/hooks/useModelValue';
import useOption from '../src/hooks/useOption';
import useFilter from '../src/hooks/useFilter';
import useOptions from '../src/hooks/useOptions';
import useDisplay from '../src/hooks/useDisplay';
import useTagRender from '../src/hooks/useTagRender';
import useCheckAll from '../src/hooks/useCheckAll';
import useHighlight, { useHighlightCascaderItem } from '../src/hooks/useHighlight';
import CascaderPanels from '../src/components/CascaderPanels';
import {
  HCascaderEmitsInjectKey,
  HCascaderInputStringInjectKey,
  HCascaderModelValueInjectKey,
  HCascaderModifyOptionChildrenListInjectKey,
  HCascaderOptionListInjectKey,
  HCascaderOptionListMapInjectKey,
  HCascaderPickOptionInjectKey,
  HCascaderPopperVisibleInjectKey,
  HCascaderPresetModelValueInjectKey,
  HCascaderPropsInjectKey,
  HCascaderRegisterVNodeGetterInjectKey,
  HCascaderSlotsInjectKey,
  HCascaderTreeHelperInjectKey,
  HCascaderVisibleOptionsInjectKey,
} from '../src/utils/injectKeys';
import type {
  CascaderDomRefs,
  HCascaderExtendOption,
  HCascaderOption,
  HCascaderUuidType,
} from '../src/utils/types';

function createTree() {
  const tree = new Tree<HCascaderOption, HCascaderExtendOption>(
    [
      {
        label: 'Root',
        value: 'root',
        children: [
          { label: 'Leaf', value: 'leaf', isLeaf: true },
          { label: 'Disabled', value: 'disabled', disabled: true, isLeaf: true },
          { label: 'Blocked', value: 'blocked', isLeaf: true },
        ],
      },
    ],
    {},
    option => option.value,
  );
  return {
    tree,
    root: tree.getInfoByValue('root')!,
    leaf: tree.getInfoByValue('leaf')!,
    disabled: tree.getInfoByValue('disabled')!,
    blocked: tree.getInfoByValue('blocked')!,
  };
}

function propsOf(values: Partial<CascaderProps>) {
  return reactive({
    modelValue: undefined,
    multiple: false,
    multipleLimit: Infinity,
    initialValue: undefined,
    showCheckedStrategy: 'leaf',
    pathSeparator: '/',
    checkStrictly: false,
    reserveKeyword: false,
    needConfirm: false,
    inputEmitFrequency: 0,
    ...values,
  }) as unknown as CascaderProps;
}

describe('Cascader hook defensive branches', () => {
  test('useFilter selects boolean/object filters, limits, sorting and panel input sources', async () => {
    const { tree } = createTree();
    const props = propsOf({
      options: tree.originTreeData,
      filter: true,
      filterable: false,
      filterMaxResult: 20,
      panelFilterOption: false,
      panelFilterInputValue: '',
      useBuildInPanelFilter: false,
      checkStrictly: false,
    });
    const emit = vi.fn();
    let api!: ReturnType<typeof useFilter>;
    mount(
      defineComponent({
        setup() {
          api = useFilter(props, { emit } as unknown as Parameters<typeof useFilter>[1], {
            optionList: tree.flattenTreeData,
          });
          return () => <div />;
        },
      }),
    );

    api.inputValue.value = 'leaf';
    api.popperVisible.value = true;
    await nextTick();
    expect(
      api.filterMethod.value('LEAF', [
        { label: 'Leaf', value: 'leaf', option: tree.getInfoByValue('leaf')! },
      ]),
    ).toBe(true);
    expect(api.visibleOptions.value.map(option => option.value)).toEqual(['leaf']);
    expect(api.isReadonly.value).toBe(false);
    expect(emit).toHaveBeenCalledWith('search', 'leaf');
    expect(emit).toHaveBeenCalledWith('dropdownVisibleChange', true);

    const customFilter = vi.fn(() => true);
    const customSort = vi.fn(() => 0);
    props.filter = { filter: customFilter, limit: 1, sort: customSort };
    expect(api.filterMethod.value).toBe(customFilter);
    expect(api.visibleOptions.value).toHaveLength(1);
    expect(customSort).toHaveBeenCalled();

    props.filter = false;
    props.filterable = false;
    props.panelFilterOption = true;
    props.panelFilterInputValue = 'disabled';
    props.useBuildInPanelFilter = false;
    expect(api.visibleOptions.value.map(option => option.value)).toEqual(['disabled']);
    props.useBuildInPanelFilter = true;
    api.inputValue.value = 'blocked';
    expect(api.visibleOptions.value.map(option => option.value)).toEqual(['blocked']);
    props.options = [];
    expect(api.panelStatus.value).toBe('empty');

    props.panelFilterOption = false;
    expect(
      api.filterMethod.value('leaf', [
        { label: 'Leaf', value: 'leaf', option: tree.getInfoByValue('leaf')! },
      ]),
    ).toBe(true);
  });

  test('useOptions clears absent options, registers vnode getters and appends lazy children', async () => {
    const props = propsOf({
      options: [{ label: 'Root', value: 'root', isLeaf: false }],
      fieldMap: {},
    });
    const emit = vi.fn();
    let api!: ReturnType<typeof useOptions>;
    let registerVNodeGetter!: (uuid: string | number, getter: () => VNode | undefined) => void;
    const Probe = defineComponent({
      setup() {
        registerVNodeGetter = inject(HCascaderRegisterVNodeGetterInjectKey)!;
        return () => <div />;
      },
    });
    mount(
      defineComponent({
        setup() {
          api = useOptions(props, { emit } as unknown as Parameters<typeof useOptions>[1]);
          return () => <Probe />;
        },
      }),
    );
    await nextTick();
    const root = api.optionList.value[0];
    const getter = () => undefined;
    registerVNodeGetter('missing', getter);
    registerVNodeGetter(root._uuid, getter);
    expect(root.vNodeGetter).toBe(getter);

    api.modifyOptionChildrenList(root, [{ label: 'Lazy', value: 'lazy', isLeaf: true }]);
    expect(root.transformedChildren[0].value).toBe('lazy');
    expect(emit).toHaveBeenCalledWith(
      'update:options',
      expect.arrayContaining([expect.objectContaining({ value: 'root' })]),
    );

    props.options = undefined as unknown as CascaderProps['options'];
    await nextTick();
    expect(api.optionList.value).toEqual([]);
    expect(api.optionListMap.value.size).toBe(0);
  });

  test('CascaderPanels handles Backspace and every keyboard navigation mode', async () => {
    const { tree, leaf } = createTree();
    const props = propsOf({ panelFilterOption: false, multiple: true });
    const pickOption = vi.fn();
    const modelValueSet = ref(new Set<string | number>(['first', 'last']));
    const presetModelValueSet = ref(new Set<string | number>());
    const popperVisible = ref(false);
    const optionList = ref<HCascaderExtendOption[]>([]);
    const visibleOptions = ref<HCascaderExtendOption[]>([]);
    const wrapper = mount(CascaderPanels, {
      props: { duringInput: false, inputValue: '', treeId: 'test-cascader-tree' },
      global: {
        stubs: {
          HCascaderPanel: true,
          HCascaderSearchPanel: true,
        },
        provide: {
          [HCascaderPropsInjectKey as symbol]: props,
          [HCascaderEmitsInjectKey as symbol]: vi.fn(),
          [HCascaderSlotsInjectKey as symbol]: {},
          [HCascaderOptionListInjectKey as symbol]: optionList,
          [HCascaderOptionListMapInjectKey as symbol]: ref(
            new Map<HCascaderUuidType, HCascaderExtendOption>(tree.flattenTreeDataMapping.value),
          ),
          [HCascaderPickOptionInjectKey as symbol]: pickOption,
          [HCascaderPopperVisibleInjectKey as symbol]: popperVisible,
          [HCascaderPresetModelValueInjectKey as symbol]: presetModelValueSet,
          [HCascaderModelValueInjectKey as symbol]: modelValueSet,
          [HCascaderModifyOptionChildrenListInjectKey as symbol]: vi.fn(),
          [HCascaderVisibleOptionsInjectKey as symbol]: visibleOptions,
          [HCascaderTreeHelperInjectKey as symbol]: tree,
        },
      },
    });
    const keyboardEventDeal = wrapper.getCurrentComponent().exposed!.keyboardEventDeal as (
      event: KeyboardEvent,
    ) => void;

    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(presetModelValueSet.value).toEqual(new Set(['first', 'last']));
    expect(pickOption).toHaveBeenCalledWith('last', true, true);

    pickOption.mockClear();
    modelValueSet.value.clear();
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(pickOption).not.toHaveBeenCalled();

    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(wrapper.emitted('switchPanelStatus')?.at(-1)).toEqual([true]);

    popperVisible.value = true;
    await nextTick();
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    optionList.value = tree.flattenTreeData.value;
    await nextTick();
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'End' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Home' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Enter' }));

    await wrapper.setProps({ duringInput: true });
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Home' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    visibleOptions.value = [leaf];
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'End' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Home' }));
    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(pickOption).toHaveBeenCalledWith(leaf._uuid, true, false, false);

    keyboardEventDeal(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.emitted('switchPanelStatus')?.at(-1)).toEqual([false]);
  });

  test('useModelValue preserves unmatched paths, formats labels and enforces selection limits', async () => {
    const { tree, leaf } = createTree();
    const props = propsOf({
      modelValue: [['root', 'leaf'], ['missing']],
      multiple: true,
      multipleLimit: 3,
      showCheckedStrategy: 'fullPath',
      pathSeparator: ' / ',
    });
    const emit = vi.fn();
    const optionsVersion = ref(0);
    let api!: ReturnType<typeof useModelValue>;
    const Harness = defineComponent({
      setup() {
        api = useModelValue(props, { emit } as unknown as Parameters<typeof useModelValue>[1], {
          tree,
          optionListMap: tree.flattenTreeDataMapping,
          optionsVersion,
          triggerFormChange: vi.fn(),
        });
        return () => <div />;
      },
    });
    mount(Harness);
    await nextTick();

    const unmatchedUuid = [...api.modelValueSet.value].find(value => typeof value === 'number')!;
    expect(api.getValuePathByUuid(unmatchedUuid)).toEqual(['missing']);
    expect(api.getValuePathByUuid('unknown')).toBeUndefined();
    expect(api.getShowLabel(leaf._uuid)).toBe('Root  /  Leaf');
    expect(api.getShowLabel(unmatchedUuid)).toBe('missing');
    expect(api.getShowLabel(999)).toBe(999);

    props.showCheckedStrategy = 'leaf';
    expect(api.getShowLabel(leaf._uuid)).toBe('Leaf');
    expect(api.getShowLabel(unmatchedUuid)).toBe('missing');
    expect(api.getShowLabel(999)).toBe('');
    expect(api.transformUuidsToModelValue(['unknown'])).toEqual([]);
    expect(api.transformUuidsToModelValue([leaf._uuid], false)).toEqual(['root', 'leaf']);

    expect(api.reserveNumberOfModelValues(Infinity)).toBe(false);
    expect(api.reserveNumberOfModelValues(10)).toBe(false);
    expect(api.reserveNumberOfModelValues(1)).toBe(true);
    props.modelValue = [['missing'], ['missing']];
    await nextTick();
    expect(api.modelValueSet.value).toEqual(new Set([unmatchedUuid]));
    api.modelValueSet.value = new Set([leaf._uuid, unmatchedUuid]);
    expect(api.reserveNumberOfModelValues(0)).toBe(false);
    expect(api.modelValueSet.value.size).toBe(0);

    api.setModified(leaf, true);
    api.emitSelectOrDeselect();
    expect(emit).toHaveBeenCalledWith('select', ['root', 'leaf'], leaf);
    api.setModified(undefined, false);
    api.emitSelectOrDeselect();
    expect(emit).toHaveBeenCalledWith('deselect', undefined, undefined);

    api.modelValueSet.value = new Set([leaf._uuid]);
    await nextTick();
    props.multiple = false;
    await nextTick();
    expect(api.modelValue.value).toEqual(['root', 'leaf']);
    expect(api.isOutOfLimit.value).toBe(false);
    props.multiple = true;
    await nextTick();
    expect(api.modelValue.value).toEqual([['root', 'leaf']]);
    props.multipleLimit = 0;
    await nextTick();
    expect(api.modelValueSet.value.size).toBe(0);
  });

  test('useModelValue resolves a formerly unmatched lazy path after options load', async () => {
    const tree = new Tree<HCascaderOption, HCascaderExtendOption>([], {}, option => option.value);
    const props = propsOf({ modelValue: ['late'], multiple: false });
    const optionsVersion = ref(0);
    const emit = vi.fn();
    let api!: ReturnType<typeof useModelValue>;
    mount(
      defineComponent({
        setup() {
          api = useModelValue(props, { emit } as unknown as Parameters<typeof useModelValue>[1], {
            tree,
            optionListMap: tree.flattenTreeDataMapping,
            optionsVersion,
          });
          return () => <div />;
        },
      }),
    );
    await nextTick();
    expect([...api.modelValueSet.value][0]).toBe(-1);

    tree.setTreeData([{ label: 'Late', value: 'late', isLeaf: true }]);
    optionsVersion.value += 1;
    await nextTick();
    expect([...api.modelValueSet.value]).toEqual(['late']);
    expect(api.chosenOptionList.value[0]?.stringLabel).toBe('Late');

    api.modelValueSet.value = new Set();
    await nextTick();
    expect(emit).toHaveBeenCalledWith('update:modelValue', undefined);
  });

  test('useOption covers blocked, multiple, single, confirm, cancel and strictness paths', async () => {
    vi.useFakeTimers();
    const { tree, root, leaf, disabled, blocked } = createTree();
    blocked.passingDisabled = true;
    const props = propsOf({ multiple: true, needConfirm: true });
    const emit = vi.fn();
    const modelValueSet = ref(new Set<string | number>());
    const presetModelValueSet = ref(new Set<string | number>());
    const isOutOfLimit = ref(false);
    const delInput = vi.fn();
    const manualControlPopperVisible = vi.fn();
    const judgeWhetherInputCanFocus = vi.fn();
    const setModified = vi.fn();
    const emitSelectOrDeselect = vi.fn();
    const collapse = vi.fn();
    let api!: ReturnType<typeof useOption>;
    const wrapper = mount(
      defineComponent({
        setup() {
          api = useOption(props, { emit } as unknown as Parameters<typeof useOption>[1], {
            domRefs: {
              pickerDomRef: ref(),
              filterInputDomRef: ref(),
              tagGroupDomRef: ref({ doCollapseCalculate: collapse }),
              cascaderPanelsDomRef: ref(),
            } as unknown as CascaderDomRefs,
            optionListMap: tree.flattenTreeDataMapping,
            modelValueSet,
            presetModelValueSet,
            isOutOfLimit,
            delInput,
            manualControlPopperVisible,
            judgeWhetherInputCanFocus,
            setModified,
            emitSelectOrDeselect,
            transformUuidsToModelValue: uuids => uuids.map(String),
          });
          return () => <div />;
        },
      }),
    );

    api.pickOption(disabled._uuid);
    api.pickOption(blocked._uuid);
    api.pickOption(root._uuid);
    leaf.selectable = false;
    api.pickOption(leaf._uuid);
    expect(presetModelValueSet.value.size).toBe(0);
    leaf.selectable = true;
    blocked.passingDisabled = false;

    api.pickOption(leaf._uuid);
    expect(presetModelValueSet.value.has(leaf._uuid)).toBe(true);
    expect(delInput).toHaveBeenCalledWith('');
    api.pickOption(leaf._uuid);
    expect(presetModelValueSet.value.has(leaf._uuid)).toBe(false);

    isOutOfLimit.value = true;
    api.pickOption(leaf._uuid);
    expect(presetModelValueSet.value.size).toBe(0);
    isOutOfLimit.value = false;
    props.reserveKeyword = true;
    delInput.mockClear();
    api.pickOption(leaf._uuid, true, false, false);
    expect(delInput).not.toHaveBeenCalled();
    props.reserveKeyword = 'reserve-deselect';
    api.pickOption(leaf._uuid);
    api.pickOption(leaf._uuid);
    expect(delInput).toHaveBeenCalled();

    props.multiple = false;
    props.needConfirm = false;
    presetModelValueSet.value.clear();
    api.pickOption(leaf._uuid, true, false, true, true);
    expect(presetModelValueSet.value.has(leaf._uuid)).toBe(true);
    api.pickOption(leaf._uuid, true, false, true, true);
    expect(presetModelValueSet.value.has(leaf._uuid)).toBe(false);
    api.pickOption(leaf._uuid);
    api.pickOption(leaf._uuid);
    expect(modelValueSet.value).toEqual(new Set([leaf._uuid]));

    api.confirmHandle(false, true);
    expect(judgeWhetherInputCanFocus).toHaveBeenCalled();
    expect(emit).toHaveBeenCalledWith('confirm', ['leaf']);
    api.confirmHandle(true);
    expect(manualControlPopperVisible).toHaveBeenCalledWith(false);
    api.cancelHandle();
    expect(emit).toHaveBeenCalledWith('cancel', ['leaf']);

    props.checkStrictly = true;
    modelValueSet.value = new Set([root._uuid, leaf._uuid]);
    await nextTick();
    props.checkStrictly = false;
    await nextTick();
    expect(modelValueSet.value).toEqual(new Set([leaf._uuid]));
    await vi.advanceTimersByTimeAsync(500);
    expect(collapse).toHaveBeenCalled();
    wrapper.unmount();
    vi.useRealTimers();
  });

  test('useEvents covers browser input, composition, clear, focus and popover transitions', async () => {
    const { tree, leaf, disabled, blocked } = createTree();
    blocked.passingDisabled = true;
    const props = propsOf({ multiple: true, inputEmitFrequency: 0 });
    const emit = vi.fn();
    const formItemTrigger = vi.fn();
    const inputValue = ref('query');
    const popperVisible = ref(false);
    const inputable = ref(true);
    const modelValueSet = ref(new Set([leaf._uuid, disabled._uuid, blocked._uuid]));
    const presetModelValueSet = ref(new Set<string | number>());
    const wrapperElement = document.createElement('div');
    const popoverElement = document.createElement('div');
    const inside = document.createElement('button');
    wrapperElement.appendChild(inside);
    const showPopover = vi.fn();
    const hidePopover = vi.fn();
    const focusPicker = vi.fn();
    const handleInputFocus = vi.fn();
    const handleInputBlur = vi.fn();
    const focusFilter = vi.fn();
    const collapse = vi.fn();
    let api!: ReturnType<typeof useEvents>;
    const wrapper = mount(
      defineComponent({
        setup() {
          api = useEvents(props, { emit } as unknown as Parameters<typeof useEvents>[1], {
            domRefs: {
              pickerDomRef: ref({
                showPopover,
                hidePopover,
                focus: focusPicker,
                handleInputFocus,
                handleInputBlur,
                wrapperDom: () => wrapperElement,
                popoverDom: () => popoverElement,
              }),
              filterInputDomRef: ref({ focus: focusFilter }),
              tagGroupDomRef: ref({ doCollapseCalculate: collapse }),
              cascaderPanelsDomRef: ref(),
            } as unknown as CascaderDomRefs,
            inputValue,
            popperVisible,
            inputable,
            modelValueSet,
            presetModelValueSet,
            optionListMap: tree.flattenTreeDataMapping,
          });
          return () => <div />;
        },
      }),
      { global: { provide: { [HFormItemTriggerInjectedKey as symbol]: formItemTrigger } } },
    );

    api.manualControlPopperVisible(true);
    api.manualControlPopperVisible(false);
    expect(showPopover).toHaveBeenCalled();
    expect(hidePopover).toHaveBeenCalled();

    api.delInput('typed');
    await nextTick();
    expect(inputValue.value).toBe('typed');
    expect(showPopover).toHaveBeenCalledTimes(2);
    const target = document.createElement('input');
    target.value = 'composed';
    api.handleInput({ composedPath: () => [target] } as unknown as Event);
    api.delInputDebounced.flush();
    expect(inputValue.value).toBe('composed');
    target.value = 'fallback';
    api.handleInput({ target } as unknown as Event);
    api.delInputDebounced.flush();
    expect(inputValue.value).toBe('fallback');

    api.focusInput();
    expect(focusFilter).toHaveBeenCalled();
    expect(focusPicker).toHaveBeenCalled();
    api.handleClick(new MouseEvent('click'));
    api.handleInputFocus();
    api.handleFocus();
    api.onCompositionStart();
    expect(api.isInputFocus.value).toBe(true);
    expect(api.isCascaderFocus.value).toBe(true);
    expect(api.isDuringComposition.value).toBe(true);
    api.onCompositionEnd();
    api.handleInputBlur();
    api.handleBlur();
    await nextTick();
    expect(formItemTrigger).toHaveBeenCalledWith('blur');

    api.handleClear();
    expect(modelValueSet.value).toEqual(new Set([disabled._uuid, blocked._uuid]));
    props.checkStrictly = true;
    api.handleClear();
    expect(modelValueSet.value).toEqual(new Set([disabled._uuid]));
    props.multiple = false;
    modelValueSet.value.add(leaf._uuid);
    api.handleClear();
    expect(modelValueSet.value.size).toBe(0);
    expect(emit).toHaveBeenCalledWith('clear');

    api.onTagGroupSuffixInputFocus(new FocusEvent('focus'));
    api.onTagGroupSuffixInputBlur(new FocusEvent('blur', { relatedTarget: inside }));
    expect(hidePopover).toHaveBeenCalledTimes(1);
    const outside = document.createElement('button');
    api.onTagGroupSuffixInputBlur(new FocusEvent('blur', { relatedTarget: outside }));
    expect(hidePopover).toHaveBeenCalledTimes(2);
    expect(handleInputFocus).toHaveBeenCalled();
    expect(handleInputBlur).toHaveBeenCalledTimes(2);

    props.multiple = true;
    popperVisible.value = true;
    await nextTick();
    await nextTick();
    expect(presetModelValueSet.value).toEqual(modelValueSet.value);
    expect(collapse).toHaveBeenCalled();
    popperVisible.value = false;
    await nextTick();
    expect(inputValue.value).toBe('');

    const cancel = vi.spyOn(api.delInputDebounced, 'cancel');
    wrapper.unmount();
    expect(cancel).toHaveBeenCalled();
  });

  test('useDisplay preserves labels and renders every statistic form', async () => {
    const { tree, leaf, disabled } = createTree();
    const props = propsOf({
      multiple: true,
      useStatistic: true,
      statisticText: '',
    });
    const modelValueSet = ref(new Set<string | number>([leaf._uuid]));
    const optionListMap = ref(
      new Map<HCascaderUuidType, HCascaderExtendOption>(tree.flattenTreeDataMapping.value),
    );
    const inputValue = ref('');
    const inputable = ref(false);
    const useFilter = ref(true);
    const renderedModelValueTags = ref<unknown[]>([]);
    const getShowLabel = vi.fn((uuid: string | number) =>
      uuid === leaf._uuid ? 'Leaf label' : `Fallback ${uuid}`,
    );
    let api!: ReturnType<typeof useDisplay>;

    const wrapper = mount(
      defineComponent({
        setup() {
          api = useDisplay(
            props,
            {},
            {
              modelValueSet,
              optionListMap,
              inputValue,
              inputable,
              useFilter,
              renderedModelValueTags,
              getShowLabel,
            },
          );
          return () => (
            <div class="display-value" data-hide-input={String(api.isHideInput.value)}>
              {String(api.showValue.value)}
            </div>
          );
        },
      }),
    );
    const showValue = () => wrapper.get('.display-value').text();

    expect(showValue()).not.toContain('(1)');
    modelValueSet.value = new Set([leaf._uuid, disabled._uuid]);
    await nextTick();
    expect(showValue()).toContain('(2)');
    props.statisticText = 'Chosen';
    await nextTick();
    expect(showValue()).toBe('Chosen (2)');

    props.useStatistic = false;
    inputable.value = true;
    inputValue.value = 'typed';
    modelValueSet.value = new Set();
    await nextTick();
    expect(showValue()).toBe('typed');
    props.multiple = false;
    await nextTick();
    expect(showValue()).toBe('typed');

    inputValue.value = '';
    modelValueSet.value = new Set([leaf._uuid]);
    await nextTick();
    expect(showValue()).toBe('Leaf label');
    optionListMap.value = new Map();
    await nextTick();
    expect(showValue()).toBe('Leaf label');
    modelValueSet.value = new Set(['missing']);
    await nextTick();
    expect(showValue()).toBe('Fallback missing');

    props.multiple = true;
    useFilter.value = false;
    renderedModelValueTags.value = [{}];
    await nextTick();
    expect(wrapper.get('.display-value').attributes('data-hide-input')).toBe('true');
    props.useStatistic = true;
    await nextTick();
    expect(wrapper.get('.display-value').attributes('data-hide-input')).toBe('false');
  });

  test('useTagRender reuses unmatched tags, closes tags and renders strict and leaf summaries', async () => {
    const { tree, root, leaf, disabled, blocked } = createTree();
    const props = propsOf({
      multiple: true,
      useCheckAllSummary: false,
      checkAllSummaryText: 'Everything',
    });
    const modelValueSet = ref(new Set<string | number>([leaf._uuid]));
    const presetModelValueSet = ref(new Set<string | number>());
    const optionListMap = ref(
      new Map<HCascaderUuidType, HCascaderExtendOption>(tree.flattenTreeDataMapping.value),
    );
    const optionsVersion = ref(0);
    const isDisabled = ref(false);
    const pickOption = vi.fn();
    const handleClear = vi.fn();
    let api!: ReturnType<typeof useTagRender>;

    mount(
      defineComponent({
        setup() {
          api = useTagRender(
            props,
            {
              attrs: {},
              emit: vi.fn(),
              expose: vi.fn(),
              slots: {},
            } as unknown as Parameters<typeof useTagRender>[1],
            {
              modelValueSet,
              presetModelValueSet,
              optionListMap,
              optionsVersion,
              isDisabled,
              getShowLabel: uuid => `Label ${uuid}`,
              pickOption,
              handleClear,
            },
          );
          return () => <div class="tag-host">{api.renderedModelValueTags.value}</div>;
        },
      }),
    );
    await nextTick();

    const leafTag = api.getShouldRenderedTags()[0];
    leafTag.props?.onClose();
    expect(pickOption).toHaveBeenCalledWith(leaf._uuid, true, true, true, true);

    optionListMap.value = new Map();
    expect(api.getShouldRenderedTags()[0]).toBe(leafTag);

    modelValueSet.value = new Set(['missing']);
    await nextTick();
    const unmatched = api.getShouldRenderedTags()[0];
    unmatched.props?.onClose();
    expect(pickOption).toHaveBeenCalledWith('missing', true, true, true, true);

    optionListMap.value = new Map(tree.flattenTreeDataMapping.value);
    props.checkStrictly = true;
    props.useCheckAllSummary = true;
    modelValueSet.value = new Set([root._uuid, leaf._uuid, disabled._uuid, blocked._uuid]);
    await nextTick();
    expect(api.renderedModelValueTags.value).toHaveLength(1);
    api.renderedModelValueTags.value[0].props?.onClose();
    expect(handleClear).toHaveBeenCalledOnce();

    props.checkStrictly = false;
    modelValueSet.value = new Set([leaf._uuid, disabled._uuid, blocked._uuid]);
    await nextTick();
    expect(api.renderedModelValueTags.value).toHaveLength(1);
  });

  test('useHighlight handles browsers without Highlight API and empty option content', async () => {
    const originalHighlights = Object.getOwnPropertyDescriptor(CSS, 'highlights');
    Object.defineProperty(CSS, 'highlights', {
      configurable: true,
      value: undefined,
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const input = ref('');
    const contentDomRef = ref<HTMLElement>();
    let itemApi!: ReturnType<typeof useHighlightCascaderItem>;

    const Probe = defineComponent({
      setup() {
        const element = document.createElement('div');
        element.textContent = 'Alpha label';
        contentDomRef.value = element;
        itemApi = useHighlightCascaderItem({ value: 'highlight' } as CascaderItemProps, {
          contentDomRef,
        });
        itemApi.startWatch();
        return () => <div />;
      },
    });
    const wrapper = mount(
      defineComponent({
        setup() {
          useHighlight();
          provide(
            HCascaderInputStringInjectKey,
            computed(() => input.value),
          );
          return () => <Probe />;
        },
      }),
    );

    input.value = 'alpha';
    await nextTick();
    await nextTick();
    expect(warn).toHaveBeenCalled();

    contentDomRef.value?.replaceChildren();
    input.value = 'missing';
    await nextTick();
    await nextTick();
    itemApi.stopWatch();
    wrapper.unmount();
    warn.mockRestore();
    if (originalHighlights) {
      Object.defineProperty(CSS, 'highlights', originalHighlights);
    } else {
      Reflect.deleteProperty(CSS, 'highlights');
    }
  });

  test('useCheckAll filters strict and inherited disabled options and honors confirmation mode', () => {
    const { root, leaf, disabled, blocked } = createTree();
    blocked.passingDisabled = true;
    leaf.selectable = false;
    const props = propsOf({ checkStrictly: false, needConfirm: false });
    const options = ref([root, leaf, disabled, blocked]);
    const selected = ref(new Set<HCascaderUuidType>([root._uuid]));
    const pickOption = vi.fn();
    const emit = vi.fn();
    const api = useCheckAll(
      props,
      computed(() => options.value),
      selected,
      pickOption,
      emit,
    );

    expect(api.isCheckAll.value).toBe(false);
    expect(api.isIndeterminate.value).toBe(true);
    api.toggleCheckAll();
    expect(pickOption).toHaveBeenCalledWith(root._uuid);
    expect(pickOption).not.toHaveBeenCalledWith(leaf._uuid);
    expect(pickOption).not.toHaveBeenCalledWith(disabled._uuid);
    expect(pickOption).not.toHaveBeenCalledWith(blocked._uuid);
    expect(emit).toHaveBeenCalledWith('confirm');

    pickOption.mockClear();
    props.checkStrictly = true;
    props.needConfirm = true;
    selected.value = new Set([root._uuid, blocked._uuid]);
    api.toggleCheckAll();
    expect(pickOption).toHaveBeenCalledWith(root._uuid);
    expect(pickOption).toHaveBeenCalledWith(blocked._uuid);
    expect(emit).toHaveBeenCalledTimes(1);
  });
});
