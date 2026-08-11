import { mount, shallowMount } from '@vue/test-utils';
import HSwitch from '../src/Switch';
import { describe, expect, test, vi, Mock } from 'vitest';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import type { Awaitable } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { getSwitchState, switchStateTestVectors } from '@aurora/core';
import { useSwitchState } from '../src/composables/useSwitchState';
import type { SwitchEmits } from '../src/composables/useEmits';
import type { SwitchProps } from '../src/composables/useProps';

describe('Switch.tsx', () => {
  test.each(switchStateTestVectors)(
    'consumes shared state vector: $name',
    ({ input, interactive }) => {
      expect(getSwitchState(input).interactive).toBe(interactive);
    },
  );

  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HSwitch modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HSwitch);

    expect(element.exists()).toBe(true);
  });

  test('uses the native switch as a focus-visible proxy', () => {
    const input = mount(() => <HSwitch modelValue={false} />).find('input[role="switch"]');

    expect(input.attributes()).toHaveProperty('data-focus-visible-proxy');
    expect((input.element as HTMLInputElement).tabIndex).toBe(0);
  });

  test('renders the default label slot at the requested size and emits native blur', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(() => (
      <HSwitch modelValue={false} size="large" onBlur={onBlur}>
        {{ default: () => <strong data-test="switch-label">Slot label</strong> }}
      </HSwitch>
    ));
    expect(wrapper.get('.h-switch').classes()).toContain('h-switch--large');
    expect(wrapper.get('[data-test="switch-label"]').text()).toBe('Slot label');
    await wrapper.get('input[role="switch"]').trigger('blur');
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
  });

  test('clicking anywhere in the switch toggles it', async () => {
    const modelValue = ref(false);
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HSwitch
        modelValue={modelValue.value}
        label="Auto update"
        status={true}
        onChange={onChange}
        onUpdate:modelValue={val => (modelValue.value = val)}
      />
    ));

    await wrapper.find('.h-switch').trigger('click');
    expect(modelValue.value).toBe(true);

    await wrapper.find('.h-switch__label').trigger('click');
    expect(modelValue.value).toBe(false);

    await wrapper.find('.h-switch__status').trigger('click');
    expect(modelValue.value).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  test('displays status text inside the track', async () => {
    const modelValue = ref(false);
    const wrapper = mount(() => (
      <HSwitch
        modelValue={modelValue.value}
        status={true}
        statusPosition="inside"
        statusOnText="ON"
        statusOffText="OFF"
        onUpdate:modelValue={val => (modelValue.value = val)}
      />
    ));

    const innerText = wrapper.find('.h-switch__inner-text');
    expect(innerText.text()).toBe('OFF');
    expect(innerText.attributes('aria-hidden')).toBe('true');
    expect(wrapper.find('.h-switch__status').exists()).toBe(false);

    await wrapper.find('.h-switch').trigger('click');
    expect(innerText.text()).toBe('ON');
    expect(innerText.classes('is-active')).toBe(true);
  });

  test('readonly native and wrapper clicks remain inert and expose readonly semantics', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <HSwitch modelValue={false} readonly label="Readonly" onUpdate:modelValue={onUpdate} />
    ));
    expect(wrapper.get('.h-switch__core').classes()).toContain('is-readonly');
    expect(wrapper.get('input').attributes('aria-readonly')).toBe('true');
    await wrapper.get('input').trigger('click');
    await wrapper.get('.h-switch').trigger('click');
    expect(onUpdate).not.toHaveBeenCalled();
  });

  describe('props', () => {
    test('disabled', () => {
      const wrapper = mount(() => <HSwitch modelValue={true} disabled={true} />);

      const core = wrapper.find('.h-switch__core');

      expect(core.classes('is-disabled')).eq(true);
      expect(core.classes('is-active')).eq(true);
      const input = wrapper.find('input[role="switch"]');
      expect(input.attributes('disabled')).toBeDefined();
      expect(input.attributes('aria-disabled')).toBe('true');
    });

    test('before-change', async () => {
      const modelValue = ref(false);
      const beforeChange = ref<
        | boolean
        | Mock<(newValue: boolean) => Awaitable<boolean>>
        | ((newValue: boolean) => Awaitable<boolean>)
      >(false);
      const wrapper = mount(() => (
        <HSwitch
          modelValue={modelValue.value}
          beforeChange={beforeChange.value}
          onUpdate:modelValue={val => (modelValue.value = val)}
        />
      ));
      const core = wrapper.find('.h-switch__core');

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

  test('drops an async transition after scope disposal and supports scope-free state reads', async () => {
    let resolve!: (accepted: boolean) => void;
    const props = reactive({
      modelValue: false,
      disabled: false,
      readonly: false,
      status: false,
      statusPosition: 'outside',
      statusOnText: '',
      statusOffText: '',
      label: '',
      labelPosition: 'top',
      beforeChange: () => new Promise<boolean>(done => (resolve = done)),
    }) as SwitchProps;
    const emit = vi.fn() as HorizonWebSetupContext<SwitchEmits>['emit'];
    let stateApi!: ReturnType<typeof useSwitchState>;
    const Harness = defineComponent({
      setup() {
        stateApi = useSwitchState(props, undefined, undefined, emit);
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    stateApi.onChange();
    expect(stateApi.pending.value).toBe(true);
    wrapper.unmount();
    resolve(true);
    await Promise.resolve();
    await Promise.resolve();
    expect(emit).not.toHaveBeenCalled();

    const scopeFree = useSwitchState(
      reactive({ modelValue: false, disabled: false, readonly: false }) as SwitchProps,
      undefined,
      undefined,
      vi.fn() as HorizonWebSetupContext<SwitchEmits>['emit'],
    );
    expect(scopeFree.state.value.interactive).toBe(true);
  });
});
