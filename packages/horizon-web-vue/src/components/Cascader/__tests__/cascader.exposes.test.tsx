import { describe, test, expect } from 'vitest';
import { createInstance, openCascader } from './cascader-helper';
import { nextTick, ref } from 'vue';
import CascaderSearchPanel from '../src/components/CascaderSearchPanel';

describe('Cascader.tsx exposes', () => {
  test('focusOption', async () => {
    const modelValue = ref(['guide', 'disciplines', 'feedback']);

    const { wrapper, cascaderDomRef } = createInstance({
      modelValue,
    });

    const { panelList } = await openCascader(wrapper);

    expect(panelList.at(-1)?.find('.h-cascader-item.is-focus').text()).toEqual('Feedback');

    cascaderDomRef.value?.focusOption(['component', 'form', 'input']);

    await nextTick();

    expect(panelList.at(-1)?.find('.h-cascader-item.is-focus').text()).toEqual('Input');
  });

  test('inputChange', async () => {
    const { wrapper, cascaderDomRef } = createInstance({
      filterable: true,
    });

    await openCascader(wrapper);

    cascaderDomRef.value?.inputChange('Input');

    await nextTick();

    expect(wrapper.find('.h-cascader-item__content').text()).toBe('Component / Form / Input');

    cascaderDomRef.value?.inputChange('InputNumber');

    await nextTick();

    expect(wrapper.find('.h-cascader-item__content').text()).toBe('Component / Form / InputNumber');

    cascaderDomRef.value?.inputChange(null);

    await nextTick();

    expect(wrapper.findComponent(CascaderSearchPanel).exists()).toBeFalsy();
  });
});
