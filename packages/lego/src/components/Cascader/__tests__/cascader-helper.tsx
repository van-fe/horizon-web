import type { CascaderProps } from '~/components/Cascader/src/composables/useProps';
import type { MaybeRef, Capitalize, LegoComponentInstance } from '@nio-fe/shared';
import { Fragment, nextTick, ref, unref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NCascader from '~/components/Cascader/src/Cascader';
import CascaderPanel from '~/components/Cascader/src/components/CascaderPanel';
import CascaderPanels from '~/components/Cascader/src/components/CascaderPanels';
import CascaderItem from '~/components/Cascader/src/components/CascaderItem';
import NPopover from '../../Popover';
import { sleep } from '~/utils/tools';
import NPickerInput from '~/components/Picker/src/components/NPickerInput';
import options from './options.json';
import disabledOptions from './disabled-options.json';
import unselectableOptions from './unselectable-options.json';
import NPicker from '~/components/Picker/src/Picker';
import type { CascaderEmits } from '~/components/Cascader/src/composables/useEmits';
import type { Mock } from 'vitest';
import NButton from '~/components/Button/src/Button';
import type { CascaderExposes } from '~/components/Cascader/src/composables/useExposes';
import type { ModelValueSingleType } from '~/components/Cascader/src/utils/types';

export function createInstance<
  T extends keyof CascaderProps | `on${Capitalize<keyof CascaderEmits>}`,
>(
  propsOrEmits?: Partial<
    Record<T, T extends keyof CascaderProps ? MaybeRef<CascaderProps[T]> : Mock | Function>
  >,
  optionsType: 'default' | 'disabled' | 'unselectable' = 'default',
) {
  const modelValue = ref<ModelValueSingleType | ModelValueSingleType[]>();
  const cascaderDomRef = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();
  const wrapper = mount(
    () => (
      <Fragment>
        <NCascader
          ref={cascaderDomRef}
          v-model={modelValue.value}
          options={
            optionsType === 'default'
              ? options
              : optionsType === 'disabled'
                ? disabledOptions
                : unselectableOptions
          }
          toBody={false}
          {...Object.fromEntries(
            Object.entries(propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
          )}
        />
        <div id="outside"></div>
      </Fragment>
    ),
    {
      attachTo: document.body,
    },
  );

  const element = wrapper.findComponent(NCascader);
  const pickerInput = wrapper.findComponent(NPickerInput);

  return {
    modelValue,
    wrapper,
    element,
    pickerInput,
    cascaderDomRef,
  };
}

export async function hoverOptionByOrder(wrapper: VueWrapper<any, any>, ...orders: number[]) {
  return triggerOptionByOrderWithLimit(wrapper, 'hover', Number.MAX_VALUE, ...orders);
}

export async function clickOptionByOrder(wrapper: VueWrapper<any, any>, ...orders: number[]) {
  return clickOptionByOrderWithLimit(wrapper, Number.MAX_VALUE, ...orders);
}

export async function hoverOptionByOrderWithLimit(
  wrapper: VueWrapper<any, any>,
  panelsLimit = Number.MAX_VALUE,
  ...orders: number[]
) {
  return triggerOptionByOrderWithLimit(wrapper, 'hover', panelsLimit, ...orders);
}

export async function clickOptionByOrderWithLimit(
  wrapper: VueWrapper<any, any>,
  panelsLimit = Number.MAX_VALUE,
  ...orders: number[]
) {
  return triggerOptionByOrderWithLimit(wrapper, 'click', panelsLimit, ...orders);
}

export async function triggerOptionByOrderWithLimit(
  wrapper: VueWrapper<any, any>,
  trigger: CascaderProps['trigger'],
  panelsLimit = Number.MAX_VALUE,
  ...orders: number[]
) {
  let panels = wrapper.findAllComponents(CascaderPanel);
  let prevPanelsAmount = panels.length;
  let orderIndex = 0;
  let panelIndex = 0;
  orders ??= [0];

  while (panelIndex <= prevPanelsAmount && panels.length <= panelsLimit) {
    await panels
      .at(panelIndex++)
      ?.findAllComponents(CascaderItem)
      ?.at(orders[orderIndex++] ?? orders[0])
      ?.trigger(trigger);
    await nextTick();

    panels = wrapper.findAllComponents(CascaderPanel);
    prevPanelsAmount = panels.length;
  }

  return panels;
}

export async function clickConfirmCancelBtn(wrapper: VueWrapper<any, any>, confirm = true) {
  const confirmWrapper = wrapper.find('.n-picker__pop-content--confirm-wrapper');

  const [cancelBtn, confirmBtn] = confirmWrapper.findAllComponents(NButton);

  if (confirm) {
    confirmBtn.trigger('click');
  } else {
    cancelBtn.trigger('click');
  }
}

export async function openCascader(
  wrapper: VueWrapper<any, any>,
  trigger: CascaderProps['trigger'] = 'click',
  waitTime = 200,
) {
  let element: ReturnType<typeof wrapper.findComponent>;

  if (trigger === 'click') {
    element = wrapper.findComponent(NPicker);
  } else {
    element = wrapper.findComponent(NPopover);
  }

  await element.trigger(trigger === 'hover' ? 'mouseenter' : trigger);
  await sleep(waitTime);
  await nextTick();
  await sleep(200);

  return {
    panels: wrapper.findComponent(CascaderPanels),
    panelList: wrapper.findAllComponents(CascaderPanel),
  };
}

export async function closeCascader(wrapper: VueWrapper<any, any>) {
  await wrapper.find('#outside').trigger('mousedown');
}

export async function maskClearIconVisible(wrapper: VueWrapper<any, any>) {
  await wrapper.findComponent(NPickerInput).trigger('mouseenter');
}

export async function checkAllItems(wrapper: VueWrapper<any, any>) {
  const panel = wrapper.findComponent(CascaderPanel);

  for (const item of panel.findAllComponents(CascaderItem)) {
    await item.find('.n-cascader-item__checkbox').trigger('click');
  }
}
