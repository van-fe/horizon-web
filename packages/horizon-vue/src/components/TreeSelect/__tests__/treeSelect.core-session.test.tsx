import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, provide, ref } from 'vue';
import type { TreeSelectModelValue } from '@aurora/core';
import { describe, expect, test, vi } from 'vitest';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import HTreeSelect from '../src/TreeSelect';
import type { TreeSelectExposes } from '../src/composables/useExposes';
import { useTreeSelectEmits } from '../src/composables/useEmits';
import type { HTreeData } from '~/components/Tree/src/utils/types';
import { HFormItemErrorInjectedKey } from '~/components/Form/src/utils/injectedKeys';

const basicTree: HTreeData[] = [
  {
    value: 0,
    label: 'Zero',
    children: [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ],
  },
];

function pickerInput(wrapper: ReturnType<typeof mount>): HTMLInputElement {
  return wrapper.get<HTMLInputElement>('.h-picker__input input').element;
}

async function open(wrapper: ReturnType<typeof mount>): Promise<void> {
  await wrapper.get('.h-picker__input').trigger('click');
  await nextTick();
}

describe('TreeSelect Core session integration', () => {
  test('accepts numeric and null models without Vue warnings and preserves input change(undefined)', async () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const value = ref<number | null>(0);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              modelValue={value.value}
              treeData={basicTree}
              filterable
              inputEmitFrequency={0}
              toBody={false}
              onChange={onChange}
              onUpdate:modelValue={next => {
                value.value = next as number | null;
                onUpdate(next);
              }}
            />
          );
        },
      }),
      { attachTo: document.body },
    );

    expect(pickerInput(wrapper).value).toBe('Zero');
    await open(wrapper);
    await wrapper.get<HTMLInputElement>('.h-picker__input input').setValue('tw');
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith(undefined));
    await wrapper.get('[data-uuid="2"]').trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenCalledWith(2);

    value.value = null;
    await nextTick();
    expect(pickerInput(wrapper).value).toBe('');
    expect(warn.mock.calls.flat().join(' ')).not.toContain('Invalid prop');
    wrapper.unmount();
    warn.mockRestore();
  });

  test('keeps one confirmation draft across confirm, cancel, outside, Escape and reopen', async () => {
    const modelValue = ref<(string | number)[]>([1]);
    const onUpdate = vi.fn((next: TreeSelectModelValue) => {
      modelValue.value = next as (string | number)[];
    });
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <>
              <HTreeSelect
                modelValue={modelValue.value}
                treeData={basicTree}
                multiple
                checkStrictly
                needConfirm
                toBody={false}
                onUpdate:modelValue={onUpdate}
              />
              <button data-test="outside">outside</button>
            </>
          );
        },
      }),
      { attachTo: document.body },
    );

    await open(wrapper);
    await wrapper.get('[data-uuid="2"]').trigger('click');
    expect(onUpdate).not.toHaveBeenCalled();
    await wrapper.get('.h-picker__pop-content--confirm-wrapper button').trigger('click');
    await nextTick();
    expect(modelValue.value).toEqual([1]);

    await open(wrapper);
    await wrapper.get('[data-uuid="2"]').trigger('click');
    const confirmButtons = wrapper.findAll('.h-picker__pop-content--confirm-wrapper button');
    await confirmButtons.at(-1)!.trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenLastCalledWith([1, 2]);

    await open(wrapper);
    await wrapper.get('[data-uuid="1"]').trigger('click');
    await wrapper.get('[data-test="outside"]').trigger('mousedown');
    await nextTick();
    await open(wrapper);
    expect(wrapper.get('[data-uuid="1"]').attributes('aria-selected')).toBe('true');

    await wrapper.get('[data-uuid="1"]').trigger('click');
    await wrapper.get<HTMLInputElement>('.h-picker__input input').trigger('keydown', {
      key: 'Escape',
    });
    await nextTick();
    await open(wrapper);
    expect(wrapper.get('[data-uuid="1"]').attributes('aria-selected')).toBe('true');
    wrapper.unmount();
  });

  test('commits clear and tag removal directly and obeys multipleLimit', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(
      () => (
        <HTreeSelect
          modelValue={[1, 2]}
          treeData={basicTree[0].children as HTreeData[]}
          multiple
          multipleLimit={2}
          checkStrictly
          needConfirm
          clearable
          toBody={false}
          onUpdate:modelValue={onUpdate}
        />
      ),
      { attachTo: document.body },
    );

    await nextTick();
    expect(wrapper.findAll('.h-tag__close')).toHaveLength(2);
    await wrapper.get('.h-tag__close').trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenCalledWith([2]);

    await wrapper.get('.h-picker__input').trigger('mouseenter');
    await wrapper.get('.h-picker__input--icon.is-clear').trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenLastCalledWith([]);
    wrapper.unmount();

    const limitedUpdate = vi.fn();
    const limited = mount(
      () => (
        <HTreeSelect
          modelValue={[]}
          treeData={basicTree[0].children as HTreeData[]}
          multiple
          multipleLimit={1}
          checkStrictly
          toBody={false}
          onUpdate:modelValue={limitedUpdate}
        />
      ),
      { attachTo: document.body },
    );
    await open(limited);
    await limited.get('[data-uuid="1"]').trigger('click');
    await limited.get('[data-uuid="2"]').trigger('click');
    expect(limitedUpdate).toHaveBeenLastCalledWith([1]);
    limited.unmount();
  });

  test('updates both projections when fieldMap changes at runtime', async () => {
    const mapped = ref(false);
    const model = ref<string | number>('legacy');
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              modelValue={model.value}
              treeData={
                mapped.value
                  ? ([{ id: 'mapped', text: 'Mapped label' }] as unknown as HTreeData[])
                  : [{ value: 'legacy', label: 'Legacy label' }]
              }
              fieldMap={
                mapped.value
                  ? ({ value: 'id', label: 'text' } as unknown as Record<string, string>)
                  : undefined
              }
              toBody={false}
            />
          );
        },
      }),
      { attachTo: document.body },
    );
    expect(pickerInput(wrapper).value).toBe('Legacy label');
    mapped.value = true;
    model.value = 'mapped';
    await nextTick();
    await nextTick();
    expect(pickerInput(wrapper).value).toBe('Mapped label');
    await open(wrapper);
    expect(wrapper.get('[data-uuid="mapped"]').text()).toContain('Mapped label');

    mapped.value = false;
    model.value = 'legacy';
    await nextTick();
    await nextTick();
    expect(pickerInput(wrapper).value).toBe('Legacy label');

    const splitTree = ref<HTreeData[]>([{ value: 'plain', label: 'Plain label' }]);
    const splitMap = ref<Record<string, string> | undefined>();
    const splitModel = ref<string | number>('plain');
    const split = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              modelValue={splitModel.value}
              treeData={splitTree.value}
              fieldMap={splitMap.value}
              toBody={false}
            />
          );
        },
      }),
      { attachTo: document.body },
    );
    splitTree.value = [{ id: 'split', text: 'Split label' }] as unknown as HTreeData[];
    await nextTick();
    splitMap.value = { value: 'id', label: 'text' };
    splitModel.value = 'split';
    await nextTick();
    await nextTick();
    expect(pickerInput(split).value).toBe('Split label');
    split.unmount();
    wrapper.unmount();
  });

  test('links the combobox only while open, moves real focus to the tree and exposes Core commands', async () => {
    const component = ref<HorizonWebComponentInstance<
      typeof HTreeSelect,
      TreeSelectExposes
    > | null>(null);
    const model = ref<(string | number)[]>([1]);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              ref={component}
              modelValue={model.value}
              treeData={basicTree}
              multiple
              checkStrictly
              needConfirm
              toBody={false}
              inputAttrs={{ 'aria-label': 'Pick a node' }}
              onUpdate:modelValue={next => (model.value = next as (string | number)[])}
            />
          );
        },
      }),
      { attachTo: document.body },
    );

    const input = wrapper.get<HTMLInputElement>('.h-picker__input input[role="combobox"]');
    expect(input.attributes('role')).toBe('combobox');
    expect(input.attributes('aria-label')).toBe('Pick a node');
    expect(input.attributes('aria-controls')).toBeUndefined();
    await open(wrapper);
    const tree = wrapper.get<HTMLElement>('[role="tree"]');
    expect(input.attributes('aria-controls')).toBe(tree.attributes('id'));
    await input.trigger('keydown', { key: 'ArrowDown' });
    await vi.waitFor(() => expect(document.activeElement).toBe(tree.element));

    component.value?.clearSelectedValues();
    await nextTick();
    expect(model.value).toEqual([]);
    component.value?.changePanelVisible(false);
    await nextTick();
    expect(input.attributes('aria-controls')).toBeUndefined();
    wrapper.unmount();
  });

  test('ignores stale dynamic results after source replacement and unmount', async () => {
    const resolvers: Array<(data: HTreeData[]) => void> = [];
    const onUpdateTreeData = vi.fn();
    const treeData = ref<HTreeData[]>([
      { value: 'lazy', label: 'Lazy', isLeaf: false, children: [] },
    ]);
    const dynamicLoad = vi.fn(() => new Promise<HTreeData[]>(resolve => resolvers.push(resolve)));
    const wrapper = mount(
      () => (
        <HTreeSelect
          treeData={treeData.value}
          dynamicLoad={dynamicLoad}
          toBody={false}
          onUpdate:treeData={onUpdateTreeData}
        />
      ),
      { attachTo: document.body },
    );

    await open(wrapper);
    await wrapper.get('[data-uuid="lazy"]').trigger('click');
    treeData.value = [{ value: 'fresh', label: 'Fresh' }];
    await nextTick();
    onUpdateTreeData.mockClear();
    resolvers[0]?.([{ value: 'stale', label: 'Stale' }]);
    await nextTick();
    expect(onUpdateTreeData).not.toHaveBeenCalled();

    treeData.value = [{ value: 'lazy-2', label: 'Lazy 2', isLeaf: false, children: [] }];
    await nextTick();
    onUpdateTreeData.mockClear();
    await wrapper.get('[data-uuid="lazy-2"]').trigger('click');
    wrapper.unmount();
    resolvers[1]?.([{ value: 'late', label: 'Late' }]);
    await nextTick();
    expect(onUpdateTreeData).not.toHaveBeenCalled();
  });

  test('covers live prop convergence, IME debounce cleanup and the remaining expose delegates', async () => {
    const model = ref<TreeSelectModelValue>([1, 2]);
    const multiple = ref(true);
    const limit = ref(2);
    const strict = ref(true);
    const needConfirm = ref(false);
    const frequency = ref(50);
    const disabled = ref(false);
    const onUpdate = vi.fn((next: TreeSelectModelValue) => {
      model.value = next;
    });
    const onInput = vi.fn();
    const component = ref<HorizonWebComponentInstance<
      typeof HTreeSelect,
      TreeSelectExposes
    > | null>(null);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              ref={component}
              modelValue={model.value}
              treeData={basicTree}
              multiple={multiple.value}
              multipleLimit={limit.value}
              checkStrictly={strict.value}
              needConfirm={needConfirm.value}
              inputEmitFrequency={frequency.value}
              disabled={disabled.value}
              filterable
              isDefaultExpandAll
              toBody={false}
              onInput={onInput}
              onUpdate:modelValue={onUpdate}
            />
          );
        },
      }),
      { attachTo: document.body },
    );

    limit.value = 1;
    await nextTick();
    expect(onUpdate).toHaveBeenCalledWith([1]);
    multiple.value = false;
    needConfirm.value = true;
    strict.value = false;
    await nextTick();
    expect(onUpdate).toHaveBeenLastCalledWith(1);

    await open(wrapper);
    const input = wrapper.get<HTMLInputElement>('.h-picker__input input[role="combobox"]');
    await input.trigger('compositionstart');
    input.element.value = 'composing';
    await input.trigger('input');
    expect(onInput).not.toHaveBeenCalledWith('composing');
    frequency.value = 0;
    await nextTick();
    await input.trigger('compositionend');
    await vi.waitFor(() => expect(onInput).toHaveBeenCalledWith('composing'));

    component.value?.setSelectedStatus([2], true);
    component.value?.setCollapseStatusByValue([0], true);
    expect(component.value?.getSelectedNodes()?.values).toContain(2);
    expect(component.value?.getPartSelectedNodes()).toBeTruthy();
    expect(component.value?.getUnSelectedNodes()).toBeTruthy();
    expect(component.value?.getExpandNodes()).toBeTruthy();
    expect(component.value?.getNodeByValues([1])?.[1]?.value).toBe(1);
    expect(component.value?.getVisibleItems()).toEqual(expect.any(Array));
    component.value?.setAllCollapseStatus(false);
    component.value?.scrollTo(1);
    component.value?.setNodeByValue({ value: 3, label: 'Three' });
    component.value?.addNodeChildrenByValue([{ value: 4, label: 'Four' }], 0);
    component.value?.delNodeByValue(3);

    disabled.value = true;
    await nextTick();
    component.value?.changePanelVisible(true);
    expect(input.attributes('aria-expanded')).toBe('false');
    wrapper.unmount();
  });

  test('covers filter reopen, composition without an event and tag cache branches', async () => {
    const model = ref<TreeSelectModelValue>(['missing']);
    const tree = ref<HTreeData[]>([]);
    const frequency = ref(20);
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              modelValue={model.value}
              treeData={tree.value}
              multiple
              checkStrictly
              filterable
              inputEmitFrequency={frequency.value}
              toBody={false}
            />
          );
        },
      }),
      { attachTo: document.body },
    );
    await nextTick();
    expect(wrapper.findAll('.h-tag')).toHaveLength(1);

    tree.value = [{ value: 'missing', label: 'Recovered' }];
    await nextTick();
    expect(wrapper.get('.h-tag').text()).toBe('Recovered');
    tree.value = [];
    await nextTick();
    expect(wrapper.findAll('.h-tag')).toHaveLength(1);

    const input = wrapper.get<HTMLInputElement>('.h-picker__input input[role="combobox"]');
    input.element.value = 'late';
    await input.trigger('input');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(input.attributes('aria-expanded')).toBe('true');
    await input.trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(input.attributes('aria-expanded')).toBe('false');
    wrapper.unmount();
  });

  test('covers renderer fallbacks, error status and remaining validator branches', async () => {
    const error = ref<string | undefined>('invalid');
    const model = ref<TreeSelectModelValue>();
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(HFormItemErrorInjectedKey, error);
          return () => (
            <HTreeSelect
              modelValue={model.value}
              treeData={basicTree}
              filterable
              useBuildInPanelFilter
              searchIcon={undefined}
              toBody={false}
            >
              {{
                selectRender: () => undefined,
                tagRender: () => undefined,
              }}
            </HTreeSelect>
          );
        },
      }),
      { attachTo: document.body },
    );
    expect(wrapper.get('.h-picker__input').classes()).toContain('is-error');
    await open(wrapper);
    expect(wrapper.find('.h-picker__panel-input svg').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-selection"]').exists()).toBe(false);

    model.value = 1;
    await nextTick();
    expect(wrapper.find('.h-picker__input input').exists()).toBe(false);
    error.value = undefined;
    await nextTick();
    expect(wrapper.get('.h-picker__input').classes()).not.toContain('is-error');

    const vnode = h('span', 'node');
    const clickDetails = {
      checked: true,
      node: basicTree[0],
      allCheckedValues: [],
      halfCheckedValues: [],
    };
    const expandDetails = { expanded: true, node: { ...basicTree[0], level: 0 } };
    expect(useTreeSelectEmits.select([], 0, clickDetails)).toBe(true);
    expect(useTreeSelectEmits.expand([], 0, expandDetails)).toBe(true);
    expect(useTreeSelectEmits.click(new MouseEvent('click'), 0, basicTree[0])).toBe(true);
    expect(useTreeSelectEmits.click(new MouseEvent('click'), 0, basicTree[0], vnode)).toBe(true);
    expect(useTreeSelectEmits.contextmenu(new MouseEvent('contextmenu'), 0, basicTree[0])).toBe(
      true,
    );
    expect(
      useTreeSelectEmits.contextmenu(new MouseEvent('contextmenu'), 0, basicTree[0], vnode),
    ).toBe(true);
    wrapper.unmount();
  });

  test('covers guarded commands, custom missing-tag cache and keyboard timer cleanup', async () => {
    const component = ref<HorizonWebComponentInstance<
      typeof HTreeSelect,
      TreeSelectExposes
    > | null>(null);
    const model = ref<TreeSelectModelValue>(['cached']);
    const tree = ref<HTreeData[]>([{ value: 'cached', label: 'Cached' }]);
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              ref={component}
              modelValue={model.value}
              selectedValues={['cached']}
              treeData={tree.value}
              multiple
              checkStrictly
              searchIcon={false}
              toBody={false}
              onConfirm={onConfirm}
              onCancel={onCancel}
            >
              {{ tagRender: ({ label }: { label: string }) => <span>{label}</span> }}
            </HTreeSelect>
          );
        },
      }),
      { attachTo: document.body },
    );
    await nextTick();
    expect(wrapper.text()).toContain('Cached');
    component.value?.confirmHandle();
    component.value?.cancelHandle();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();

    tree.value = [];
    await nextTick();
    expect(wrapper.text()).toContain('Cached');
    model.value = [];
    await nextTick();

    await open(wrapper);
    const input = wrapper.get<HTMLInputElement>('.h-picker__input input[role="combobox"]');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'Tab' });
    await input.trigger('keydown', { key: 'Escape' });
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.unmount();

    const disabled = mount(
      () => (
        <HTreeSelect
          ref={component}
          treeData={basicTree}
          needConfirm
          disabled
          toBody={false}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ),
      { attachTo: document.body },
    );
    component.value?.confirmHandle();
    component.value?.cancelHandle();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    disabled.unmount();
  });
});
