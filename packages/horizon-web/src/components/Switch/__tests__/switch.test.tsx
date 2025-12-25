import { mount, shallowMount } from '@vue/test-utils';
import HSwitch from '../src/Switch';
import { describe, expect, test, vi, Mock } from 'vitest';
import { nextTick, ref } from 'vue';
import type { Awaitable } from '@aurora/utils';

describe('Switch.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HSwitch modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HSwitch);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('disabled', () => {
      const wrapper = mount(() => <HSwitch modelValue={true} disabled={true} />);

      const core = wrapper.find('.n-switch__core');

      expect(core.classes('is-disabled')).eq(true);
      expect(core.classes('is-active')).eq(true);
    });

    test('before-change', async () => {
      const modelValue = ref(false);
      const beforeChange = ref<boolean | Mock<((newValue: boolean) => Awaitable<boolean>)> | ((newValue: boolean) => Awaitable<boolean>)>(false);
      const wrapper = mount(() => (
        <HSwitch
          modelValue={modelValue.value}
          beforeChange={beforeChange.value}
          onUpdate:modelValue={val => (modelValue.value = val)}
        />
      ));
      const core = wrapper.find('.n-switch__core');

      await core.trigger('click');
      expect(modelValue.value).toBeFalsy();

      beforeChange.value = true;
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeTruthy();

      beforeChange.value = () => true;
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeFalsy();

      beforeChange.value = () => false;
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeFalsy();

      beforeChange.value = () => new Promise(resolve => resolve(true));
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeTruthy();

      beforeChange.value = () => new Promise(resolve => resolve(false));
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeTruthy();

      beforeChange.value = () => new Promise((resolve, reject) => reject());
      await nextTick();

      await core.trigger('click');
      expect(modelValue.value).toBeTruthy();

      beforeChange.value = vi.fn();
      await nextTick();

      await core.trigger('click');
      expect(beforeChange.value).toHaveBeenLastCalledWith(false);
    });
  });
});
