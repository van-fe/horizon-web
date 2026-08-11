import { mount, shallowMount } from '@vue/test-utils';
import HSteps from '../src/Steps';
import { describe, expect, test, vi } from 'vitest';
import { HStep } from '../index';
import { nextTick, ref } from 'vue';
import type { StepsProps } from '../src/composables/useProps';
import type { StepsExposes } from '../src/composables/useExposes';

describe('Steps.tsx', () => {
  test('renders every layout/detail slot contract and emits both controlled update aliases', async () => {
    const onUpdateModelValue = vi.fn();
    const onUpdateCurrent = vi.fn();
    const wrapper = mount(() => (
      <HSteps
        modelValue={1}
        direction="vertical"
        labelPlacement="vertical"
        size="small"
        status="error"
        progressDot
        initial={1}
        labelAlign="left"
        clickable
        onUpdate:modelValue={onUpdateModelValue}
        onUpdate:current={onUpdateCurrent}
      >
        {{
          default: () => [
            <HStep title="Props title" subtitle="Props subtitle" description="Props description" />,
            <HStep title="Slot title">
              {{
                subtitle: () => <span data-test="step-subtitle">Slot subtitle</span>,
                description: () => <span data-test="step-description">Slot description</span>,
                icon: () => <span data-test="step-icon">I</span>,
              }}
            </HStep>,
          ],
        }}
      </HSteps>
    ));
    await nextTick();
    expect(wrapper.get('.h-steps').classes()).toEqual(
      expect.arrayContaining([
        'is-vertical',
        'is-small',
        'is-dot',
        'is-label-placement-vertical',
        'is-label-align-left',
      ]),
    );
    expect(wrapper.text()).toContain('Props subtitle');
    expect(wrapper.text()).toContain('Props description');
    expect(wrapper.get('[data-test="step-subtitle"]').text()).toBe('Slot subtitle');
    expect(wrapper.get('[data-test="step-description"]').text()).toBe('Slot description');
    expect(wrapper.get('[data-test="step-icon"]').text()).toBe('I');

    await wrapper.findAllComponents(HStep)[1].trigger('click');
    expect(onUpdateModelValue).toHaveBeenCalledWith(2);
    expect(onUpdateCurrent).toHaveBeenCalledWith(2);
  });

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

    test('exposes current, clickable and disabled step semantics', async () => {
      const wrapper = mount(() => (
        <HSteps modelValue={1} clickable>
          <HStep title="Done" />
          <HStep title="Current" />
          <HStep title="Unavailable" disabled />
        </HSteps>
      ));
      await nextTick();

      const steps = wrapper.findAllComponents(HStep);
      expect(steps[0].attributes('role')).toBe('button');
      expect(steps[0].attributes('tabindex')).toBe('0');
      expect(steps[1].attributes('aria-current')).toBe('step');
      expect(steps[2].attributes('aria-disabled')).toBe('true');
      expect(steps[2].attributes('tabindex')).toBeUndefined();
    });

    test.each(['Enter', ' '])('activates a clickable step with the %s key', async key => {
      const current = ref(0);
      const wrapper = mount(() => (
        <HSteps v-model={current.value} clickable>
          <HStep title="First" />
          <HStep title="Second" />
        </HSteps>
      ));
      await nextTick();

      const nextStep = wrapper.findAllComponents(HStep)[1];
      await nextStep.trigger('keydown', { key });

      expect(current.value).toBe(1);
      expect(nextStep.emitted('click')).toHaveLength(1);
    });

    test('does not activate a disabled step from the keyboard', async () => {
      const current = ref(0);
      const wrapper = mount(() => (
        <HSteps v-model={current.value} clickable>
          <HStep title="First" />
          <HStep title="Disabled" disabled />
        </HSteps>
      ));
      await nextTick();

      const disabledStep = wrapper.findAllComponents(HStep)[1];
      await disabledStep.trigger('keydown', { key: 'Enter' });

      expect(current.value).toBe(0);
      expect(disabledStep.emitted('click')).toBeUndefined();
    });

    test('renders finish and error icons when progress dots are disabled', async () => {
      const current = ref(1);
      const status = ref<StepsProps['status']>('error');
      const wrapper = mount(() => (
        <HSteps modelValue={current.value} status={status.value} size="medium">
          <HStep title="Finished" />
          <HStep title="Errored" />
          <HStep title="Waiting" />
        </HSteps>
      ));
      await nextTick();
      const steps = wrapper.findAllComponents(HStep);
      expect(steps[0].classes()).toContain('is-finish');
      expect(steps[0].find('svg').exists()).toBe(true);
      expect(steps[1].classes()).toContain('is-error');
      expect(steps[1].find('svg').exists()).toBe(true);
      expect(steps[2].classes()).toContain('is-wait');
      expect(steps[2].get('.h-step__icon--number').text()).toBe('3');
    });

    test('exposes indexed focus and uses explicit indexes for status and numbering', async () => {
      const stepsRef = ref<StepsExposes | null>(null);
      const wrapper = mount(
        () => (
          <HSteps ref={stepsRef} modelValue={10} initial={10} clickable status="warning">
            <HStep title="Start" />
            <HStep title="Review" index={20} />
            <HStep title="Publish" />
          </HSteps>
        ),
        { attachTo: document.body },
      );
      await nextTick();

      const steps = wrapper.findAllComponents(HStep);
      expect(steps.map(step => step.attributes('data-index'))).toEqual(['10', '20', '21']);
      expect(steps[0].get('.h-step__icon--number').text()).toBe('11');
      expect(steps[0].classes()).toContain('is-warning');

      stepsRef.value?.focus(21);
      expect(document.activeElement).toBe(steps[2].element);
      wrapper.unmount();
    });

    test('ignores stale async before-change results', async () => {
      const current = ref(0);
      const resolvers: Array<(accepted: boolean) => void> = [];
      const wrapper = mount(() => (
        <HSteps
          v-model={current.value}
          clickable
          beforeChange={() => new Promise(resolve => resolvers.push(resolve))}
        >
          <HStep title="One" />
          <HStep title="Two" />
          <HStep title="Three" />
        </HSteps>
      ));
      await nextTick();

      await wrapper.findAllComponents(HStep)[1].trigger('click');
      await wrapper.findAllComponents(HStep)[2].trigger('click');
      resolvers[0]?.(true);
      await Promise.resolve();
      await nextTick();
      expect(current.value).toBe(0);

      resolvers[1]?.(true);
      await Promise.resolve();
      await nextTick();
      expect(current.value).toBe(2);
    });
  });
});
