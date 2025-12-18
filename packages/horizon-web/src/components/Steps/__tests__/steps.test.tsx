import { mount, shallowMount } from '@vue/test-utils';
import NSteps from '../src/Steps';
import { describe, expect, test, vi } from 'vitest';
import { NStep } from '../index';
import { nextTick, ref } from 'vue';
import type { StepsProps } from '../src/composables/useProps';

describe('Steps.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NSteps />);
    const element = wrapper.findComponent(NSteps);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('clickable', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const clickable = ref(false);

      const wrapper = mount(() => (
        <NSteps v-model={current.value} clickable={clickable.value} onChange={onChange}>
          <NStep title="1"></NStep>
          <NStep title="2"></NStep>
          <NStep title="3" clickable={false}></NStep>
        </NSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(NStep)[1];

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(current.value).eq(0);

      clickable.value = true;

      await nextTick();

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledOnce();
      expect(current.value).eq(1);

      const nonClickable = wrapper.findAllComponents(NStep)[2];
      await nonClickable.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(current.value).eq(1);
    });

    test('controllable', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const controllable = ref(false);

      const wrapper = mount(() => (
        <NSteps
          v-model={current.value}
          clickable
          controllable={controllable.value}
          onChange={onChange}
        >
          <NStep title="1"></NStep>
          <NStep title="2"></NStep>
        </NSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(NStep)[1];

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(current.value).eq(0);

      controllable.value = true;

      await nextTick();

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledOnce();
      expect(current.value).eq(1);
    });

    test('before-change', async () => {
      const current = ref(0);
      const beforeChange = ref<StepsProps['beforeChange']>(() => false);

      const wrapper = mount(() => (
        <NSteps v-model={current.value} clickable={true} beforeChange={beforeChange.value}>
          <NStep title="1"></NStep>
          <NStep title="2"></NStep>
          <NStep title="3"></NStep>
        </NSteps>
      ));

      const step1 = wrapper.findAllComponents(NStep)[1];
      const step2 = wrapper.findAllComponents(NStep)[2];

      await step1.trigger('click');

      expect(current.value).eq(0);

      beforeChange.value = () => new Promise(resolve => resolve(false));

      await nextTick();

      await step1.trigger('click');

      expect(current.value).eq(0);

      beforeChange.value = () => new Promise((resolve, reject) => reject());

      await nextTick();

      await step1.trigger('click');

      expect(current.value).eq(0);

      beforeChange.value = () => true;

      await nextTick();

      await step1.trigger('click');

      expect(current.value).eq(1);

      beforeChange.value = () => new Promise(resolve => resolve(true));

      await nextTick();

      await step2.trigger('click');

      expect(current.value).eq(2);
    });

    test('disabled', async () => {
      const current = ref(0);

      const wrapper = mount(() => (
        <NSteps v-model={current.value} clickable>
          <NStep title="1"></NStep>
          <NStep title="2" disabled></NStep>
          <NStep title="3"></NStep>
        </NSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(NStep)[1];

      await element.trigger('click');

      expect(current.value).eq(0);

      const element2 = wrapper.findAllComponents(NStep)[2];

      await element2.trigger('click');

      expect(current.value).eq(2);
    });
  });

  describe('others', () => {
    test('async load', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const controllable = ref(false);

      const steps = ref<string[]>([]);

      const wrapper = mount(() => (
        <NSteps
          v-model={current.value}
          clickable
          controllable={controllable.value}
          onChange={onChange}
        >
          <NStep title="Start" index={0}></NStep>
          {steps.value.map((step, index) => (
            <NStep title={step} index={index + 1}></NStep>
          ))}
          <NStep title="End" index={steps.value.length + 1}></NStep>
        </NSteps>
      ));

      await nextTick();

      steps.value = steps.value.concat(['Middle1', 'Middle2', 'Middle3']);

      await nextTick();

      expect(wrapper.findAllComponents(NStep)[1].classes('is-wait')).toBeTruthy();

      current.value++;

      await nextTick();

      expect(wrapper.findAllComponents(NStep)[0].classes('is-finish')).toBeTruthy();
      expect(wrapper.findAllComponents(NStep)[1].classes('is-process')).toBeTruthy();
    });
  });
});
