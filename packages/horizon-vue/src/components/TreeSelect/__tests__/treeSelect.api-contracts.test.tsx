import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, type Ref, type VNode } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTreeSelect from '../src/TreeSelect';
import type { TreeSelectExposes } from '../src/composables/useExposes';
import { useTreeSelectEmits } from '../src/composables/useEmits';
import type {
  HTreeDynamicLoadNode,
  HTreeExtendsData,
  HTreeNodeData,
  HTreeNodeDataWithLevel,
  HTreeUuidType,
} from '~/components/Tree/src/utils/types';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { HTreeSelectModelValueType } from '../src/utils/types';

const treeData: HTreeNodeData[] = [
  {
    value: 'root',
    label: 'Root',
    isLeaf: false,
    children: [{ value: 'leaf', label: 'Leaf' }],
  },
];

describe('TreeSelect public API contracts', () => {
  test('renders all scoped and structural slots and invokes confirm slot handlers', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    let visibleScope!: Ref<boolean>;
    let dataMap!: Map<HTreeUuidType, HTreeNodeData>;
    const wrapper = mount(
      () => (
        <HTreeSelect
          modelValue="leaf"
          treeData={treeData}
          toBody={false}
          isDefaultExpandAll
          needConfirm
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          {{
            default: ({
              visible,
              treeDataMap,
            }: {
              visible: Ref<boolean>;
              treeDataMap: Map<HTreeUuidType, HTreeNodeData>;
            }) => {
              visibleScope = visible;
              dataMap = treeDataMap;
              return <span data-test="outer">outer:{String(visible.value)}</span>;
            },
            treeNodeRender: ({ data, vnode }: { data: HTreeNodeDataWithLevel; vnode: VNode }) => (
              <span data-test={`node-${String(data.value)}`} data-vnode={String(Boolean(vnode))}>
                node:{String(data.label)}
              </span>
            ),
            panelHeaderRender: () => <header data-test="header">header</header>,
            panelFooterRender: () => <footer data-test="footer">footer</footer>,
            confirmRender: ({
              cancelHandle,
              confirmHandle,
            }: {
              cancelHandle: () => void;
              confirmHandle: () => void;
            }) => (
              <div data-test="confirm-area">
                <button data-test="cancel" onClick={cancelHandle}>
                  custom cancel
                </button>
                <button data-test="confirm" onClick={confirmHandle}>
                  custom confirm
                </button>
              </div>
            ),
          }}
        </HTreeSelect>
      ),
      { attachTo: document.body },
    );

    expect(wrapper.get('[data-test="outer"]').text()).toBe('outer:false');
    expect(dataMap.get('leaf')?.label).toBe('Leaf');

    await wrapper.get('[data-test="outer"]').trigger('click');
    await nextTick();
    expect(visibleScope.value).toBe(true);
    expect(wrapper.get('[data-test="header"]').text()).toBe('header');
    expect(wrapper.get('[data-test="footer"]').text()).toBe('footer');
    expect(wrapper.get('[data-test="node-root"]').attributes('data-vnode')).toBe('false');
    expect(wrapper.get('[data-test="node-leaf"]').text()).toBe('node:Leaf');

    await wrapper.get('[data-test="confirm"]').trigger('click');
    expect(onConfirm).toHaveBeenCalledOnce();
    await wrapper.get('[data-test="outer"]').trigger('click');
    await nextTick();
    await wrapper.get('[data-test="cancel"]').trigger('click');
    expect(onCancel).toHaveBeenCalledOnce();

    wrapper.unmount();

    const tag = mount(() => (
      <HTreeSelect modelValue="leaf" treeData={treeData} toBody={false}>
        {{
          tagRender: (data: HTreeExtendsData) => (
            <span data-test="tag">tag:{String(data.label)}</span>
          ),
        }}
      </HTreeSelect>
    ));
    expect(tag.get('[data-test="tag"]').text()).toBe('tag:Root / Leaf');
    tag.unmount();

    const select = mount(() => (
      <HTreeSelect modelValue="leaf" treeData={treeData} toBody={false}>
        {{
          selectRender: (data: HTreeExtendsData) => (
            <span data-test="select">select:{String(data.label)}</span>
          ),
        }}
      </HTreeSelect>
    ));
    expect(select.get('[data-test="select"]').text()).toBe('select:Root / Leaf');
    select.unmount();
  });

  test('renders the empty slot and emits visible, input, clear, update and change payloads', async () => {
    const modelValue = ref<HTreeUuidType | undefined>('leaf');
    const onVisibleChange = vi.fn();
    const onInput = vi.fn();
    const onClear = vi.fn();
    const onChange = vi.fn();
    const onUpdateModelValue = vi.fn((value: HTreeSelectModelValueType) => {
      modelValue.value = Array.isArray(value) ? value[0] : (value ?? undefined);
    });
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <HTreeSelect
              modelValue={modelValue.value}
              treeData={treeData}
              toBody={false}
              clearable
              filterable
              inputEmitFrequency={0}
              onVisibleChange={onVisibleChange}
              onInput={onInput}
              onClear={onClear}
              onChange={onChange}
              onUpdate:modelValue={onUpdateModelValue}
            />
          );
        },
      }),
      { attachTo: document.body },
    );

    await wrapper.get('.h-picker__input').trigger('click');
    await nextTick();
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    const input = wrapper.get<HTMLInputElement>('.h-picker__input input');
    await input.setValue('roo');
    await vi.waitFor(() => expect(onInput).toHaveBeenCalledWith('roo'));
    expect(onChange).toHaveBeenCalledWith(undefined);

    await input.trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);

    await wrapper.get('.h-picker__input').trigger('mouseenter');
    await wrapper.get('.h-picker__input--icon.is-clear').trigger('click');
    await nextTick();
    expect(onClear).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).toHaveBeenCalledWith([]);

    wrapper.unmount();

    const empty = mount(
      () => (
        <HTreeSelect treeData={[]} toBody={false}>
          {{ empty: () => <div data-test="empty">No tree nodes</div> }}
        </HTreeSelect>
      ),
      { attachTo: document.body },
    );
    await empty.get('.h-picker__input').trigger('click');
    await nextTick();
    expect(empty.get('[data-test="empty"]').text()).toBe('No tree nodes');
    empty.unmount();
  });

  test('forwards dynamic tree-data updates and exposed confirm/cancel operations', async () => {
    const onUpdateTreeData = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const component = ref<HorizonWebComponentInstance<
      typeof HTreeSelect,
      TreeSelectExposes
    > | null>(null);
    const dynamicLoad = vi.fn(async ({ node }: HTreeDynamicLoadNode) =>
      node?.value === 'root' ? [{ value: 'loaded', label: 'Loaded' }] : [],
    );
    const wrapper = mount(
      () => (
        <HTreeSelect
          ref={component}
          treeData={[{ value: 'root', label: 'Root', isLeaf: false, children: [] }]}
          dynamicLoad={dynamicLoad}
          toBody={false}
          needConfirm
          onUpdate:treeData={onUpdateTreeData}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ),
      { attachTo: document.body },
    );

    await wrapper.get('.h-picker__input').trigger('click');
    await nextTick();
    await wrapper.get('[data-uuid="root"]').trigger('click');
    await nextTick();
    await nextTick();
    expect(dynamicLoad).toHaveBeenCalledOnce();
    expect(onUpdateTreeData).toHaveBeenCalledOnce();
    expect(onUpdateTreeData.mock.calls[0][0][0].children).toEqual([
      expect.objectContaining({ value: 'loaded', label: 'Loaded' }),
    ]);

    component.value?.confirmHandle(false);
    component.value?.cancelHandle();
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  test('validates every declared emit payload defensively', () => {
    expect(useTreeSelectEmits['update:modelValue'](['leaf'])).toBe(true);
    expect(useTreeSelectEmits['update:modelValue']('leaf')).toBe(true);
    expect(useTreeSelectEmits['update:modelValue'](undefined)).toBe(true);
    expect(useTreeSelectEmits['update:modelValue'](1)).toBe(true);
    expect(useTreeSelectEmits['update:expandValues']([1])).toBe(true);
    expect(useTreeSelectEmits['update:expandValues']('1' as never)).toBe(false);
    expect(useTreeSelectEmits['update:treeData']([])).toBe(true);
    expect(useTreeSelectEmits['update:treeData']({} as never)).toBe(false);
    expect(useTreeSelectEmits.change(1)).toBe(true);
    expect(useTreeSelectEmits.change(null)).toBe(true);
    expect(useTreeSelectEmits.visibleChange(true)).toBe(true);
    expect(useTreeSelectEmits.visibleChange('true' as never)).toBe(false);
    expect(useTreeSelectEmits.clear()).toBe(true);
    expect(useTreeSelectEmits.focus()).toBe(true);
    expect(useTreeSelectEmits.blur()).toBe(true);
    expect(useTreeSelectEmits.input()).toBe(true);
    expect(useTreeSelectEmits.input('query')).toBe(true);
    expect(useTreeSelectEmits.input(1 as never)).toBe(false);
    expect(useTreeSelectEmits.confirm()).toBe(true);
    expect(useTreeSelectEmits.cancel()).toBe(true);
  });
});
