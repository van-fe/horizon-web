import type { MaybeRef, HorizonWebComponentInstance, Arrayable } from '@aurora/utils';
import { Fragment, nextTick, ref, SetupContext, unref } from 'vue';
import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import HTreeSelect from '~/components/TreeSelect/src/TreeSelect';
import TreeData from './options.json';
import DisabledTreeData from './modifiedOptions/disabled-options.json';
import type { TreeSelectExposes } from '~/components/TreeSelect/src/composables/useExposes';
import type { TreeSelectSlots } from '~/components/TreeSelect/src/composables/useSlots';
import type { TreeSelectProps } from '~/components/TreeSelect/src/composables/useProps';
import HPicker from '~/components/Picker/src/Picker';
import HTree from '~/components/Tree/src/Tree';
import HTreeItem from '~/components/Tree/src/components/TreeItem';
import HPickerInput from '~/components/Picker/src/components/PickerInput';
import HPickerPopper from '~/components/Picker/src/components/PickerPopper';
import type { Mock } from 'vitest';
import type { TreeSelectEmits } from '~/components/TreeSelect/src/composables/useEmits';
import type { HTreeUuidType } from '~/components/Tree/src/utils/types';

export class TreeSelectHelper<
  T extends `on${Capitalize<keyof TreeSelectEmits>}` | keyof TreeSelectProps,
> {
  private readonly propsOrEmits: {
    [K in T]?: K extends keyof TreeSelectProps ? MaybeRef<TreeSelectProps[K]> : Mock | Function;
  };
  private readonly slots: SetupContext<{}, TreeSelectSlots>['slots'];

  public modelValue = ref<HTreeUuidType | HTreeUuidType[]>();
  public selectedValues = ref();
  public expandedValues = ref();
  public domRef = ref<HorizonWebComponentInstance<typeof HTreeSelect, TreeSelectExposes> | null>(null);

  public wrapper?: VueWrapper<any, any>;
  public element?: VueWrapper<typeof HTreeSelect, any>;
  public outer?: DOMWrapper<HTMLDivElement>;
  public picker?: VueWrapper<typeof HPicker, any>;
  public pickerInput?: VueWrapper<typeof HPickerInput, any>;
  public tree?: VueWrapper<typeof HTree, any>;
  public pickerPopper?: VueWrapper<typeof HPickerPopper, any>;

  constructor(
    propsOrEmits: {
      [K in T]?: K extends keyof TreeSelectProps ? MaybeRef<TreeSelectProps[K]> : Mock | Function;
    } = {},
    slots: SetupContext<{}, TreeSelectSlots>['slots'] = {},
  ) {
    this.propsOrEmits = propsOrEmits;
    this.slots = slots;
  }

  public async mount(isDefaultExpandAll = true, useDisabledOptions = false) {
    this.wrapper = mount(
      () => (
        <Fragment>
          <HTreeSelect
            ref={this.domRef}
            v-model={this.modelValue.value}
            v-model:selectedValues={this.selectedValues.value}
            v-model:expandValues={this.expandedValues.value}
            treeData={useDisabledOptions ? DisabledTreeData : TreeData}
            toBody={false}
            isDefaultExpandAll={isDefaultExpandAll}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            v-slots={this.slots}
          />
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    this.element = this.wrapper.findComponent(HTreeSelect);
    this.outer = this.wrapper.find('#outer');
    this.picker = this.wrapper.findComponent(HPicker);
    this.pickerInput = this.wrapper.findComponent(HPickerInput);
  }

  public async open(isDefaultExpandAll = true, useDisabledOptions = false) {
    if (!this.wrapper) {
      await this.mount(isDefaultExpandAll, useDisabledOptions);
    }

    await this.picker?.trigger('click');

    await nextTick();

    this.tree = this.wrapper?.findComponent(HTree);
    this.pickerPopper = this.wrapper?.findComponent(HPickerPopper);
  }

  public async clickOption(values: Arrayable<string>) {
    if (!this.pickerPopper) {
      throw new Error(`Unable to pick option '${values}'. You haven't mount the component.`);
    }

    if (!Array.isArray(values)) {
      values = [values];
    }

    const treeItems = this.pickerPopper.findAllComponents(HTreeItem);

    for (const value of values) {
      await treeItems.find(curr => curr.attributes('data-uuid') === value)?.trigger('click');
    }

    await nextTick();
  }
}

export async function createInstance<T extends string | keyof TreeSelectProps>(
  propsOrEmits?: Partial<
    Record<T, MaybeRef<T extends keyof TreeSelectProps ? TreeSelectProps[T] : unknown>>
  >,
  useDisabledOptions = false,
  slots: SetupContext<{}, TreeSelectSlots>['slots'] = {},
  open = true,
) {
  const selectedValues = ref();
  const expandedValues = ref();
  const domRef = ref<HorizonWebComponentInstance<typeof HTreeSelect, TreeSelectExposes> | null>(null);

  const wrapper = mount(
    () => (
      <>
        <HTreeSelect
          ref={domRef}
          v-model:selectedValues={selectedValues.value}
          v-model:expandValues={expandedValues.value}
          treeData={useDisabledOptions ? DisabledTreeData : TreeData}
          toBody={false}
          {...Object.fromEntries(
            Object.entries(propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
          )}
        >
          {slots}
        </HTreeSelect>
        <div id="outer"></div>
      </>
    ),
    {
      attachTo: document.body,
    },
  );

  await nextTick();

  const element = wrapper.findComponent(HTreeSelect);
  const outer = wrapper.find('#outer');
  const picker = wrapper.findComponent(HPicker);
  const pickerInput = wrapper.findComponent(HPickerInput);

  let tree: VueWrapper<(typeof HTree)['props']> | undefined = undefined;
  let pickerPopper: VueWrapper | undefined = undefined;

  if (open) {
    await picker.trigger('click');
    tree = wrapper.findComponent(HTree);
    pickerPopper = wrapper.findComponent(HPickerPopper);
  }

  return {
    domRef,
    selectedValues,
    expandedValues,
    wrapper,
    element,
    picker,
    pickerInput,
    pickerPopper,
    tree,
    outer,
  };
}
