import { mount, shallowMount } from '@vue/test-utils';
import HSteps from '../src/Steps';
import { describe, expect, test, vi } from 'vitest';
import { HStep } from '../index';
import { nextTick, ref } from 'vue';
import type { StepsProps } from '../src/composables/useProps';

describe('Steps.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HSteps />);
    const element = wrapper.findComponent(HSteps);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('clickable', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const clickable = ref(false);

      const wrapper = mount(() => (
        <HSteps v-model={current.value} clickable={clickable.value} onChange={onChange}>
          <HStep title="1"></HStep>
          <HStep title="2"></HStep>
          <HStep title="3" clickable={false}></HStep>
        </HSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(HStep)[1];

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(current.value).eq(0);

      clickable.value = true;

      await nextTick();

      await element.trigger('click');

      expect(onChange).toHaveBeenCalledOnce();
      expect(current.value).eq(1);

      const nonClickable = wrapper.findAllComponents(HStep)[2];
      await nonClickable.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(current.value).eq(1);
    });

    test('controllable', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const controllable = ref(false);

      const wrapper = mount(() => (
        <HSteps
          v-model={current.value}
          clickable
          controllable={controllable.value}
          onChange={onChange}
        >
          <HStep title="1"></HStep>
          <HStep title="2"></HStep>
        </HSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(HStep)[1];

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
        <HSteps v-model={current.value} clickable={true} beforeChange={beforeChange.value}>
          <HStep title="1"></HStep>
          <HStep title="2"></HStep>
          <HStep title="3"></HStep>
        </HSteps>
      ));

      const step1 = wrapper.findAllComponents(HStep)[1];
      const step2 = wrapper.findAllComponents(HStep)[2];

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
        <HSteps v-model={current.value} clickable>
          <HStep title="1"></HStep>
          <HStep title="2" disabled></HStep>
          <HStep title="3"></HStep>
        </HSteps>
      ));

      await nextTick();

      const element = wrapper.findAllComponents(HStep)[1];

      await element.trigger('click');

      expect(current.value).eq(0);

      const element2 = wrapper.findAllComponents(HStep)[2];

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
        <HSteps
          v-model={current.value}
          clickable
          controllable={controllable.value}
          onChange={onChange}
        >
          <HStep title="Start" index={0}></HStep>
          {steps.value.map((step, index) => (
            <HStep title={step} index={index + 1}></HStep>
          ))}
          <HStep title="End" index={steps.value.length + 1}></HStep>
        </HSteps>
      ));

      await nextTick();

      steps.value = steps.value.concat(['Middle1', 'Middle2', 'Middle3']);

      await nextTick();

      expect(wrapper.findAllComponents(HStep)[1].classes('is-wait')).toBeTruthy();

      current.value++;

      await nextTick();

      expect(wrapper.findAllComponents(HStep)[0].classes('is-finish')).toBeTruthy();
      expect(wrapper.findAllComponents(HStep)[1].classes('is-process')).toBeTruthy();
    });
  });
});
