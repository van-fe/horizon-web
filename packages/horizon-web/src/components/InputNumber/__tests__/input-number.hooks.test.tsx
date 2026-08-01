import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Decimal } from 'decimal.js';
import HInputNumber from '../src/InputNumber';
import {
  sanitizeBlurValue,
  toInputNumberDecimal,
  toInputNumberEmitValue,
} from '../src/utils/value';

describe('InputNumber hook boundaries', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('normalizes values without mounting the component', () => {
    expect(toInputNumberEmitValue(new Decimal('1.20'), false)).toBe(1.2);
    expect(toInputNumberEmitValue(new Decimal('1.20'), true)).toBe('1.2');
    expect(toInputNumberEmitValue(undefined, false)).toBeNull();
    expect(toInputNumberDecimal('invalid')).toBeNull();
    expect(toInputNumberDecimal('-1.5')?.toString()).toBe('-1.5');
    expect(sanitizeBlurValue('￥ -12.5 元')).toBe('-12.5');
  });

  test('preserves legacy exposed state', async () => {
    const componentRef = ref<InstanceType<typeof HInputNumber> | null>(null);
    mount(() => <HInputNumber ref={componentRef} modelValue={1} max={2} />);
    await nextTick();

    const exposed = componentRef.value as unknown as {
      enableIncrease: boolean;
      localValue: Decimal;
    };
    expect(exposed.localValue.toString()).toBe('1');
    expect(exposed.enableIncrease).toBe(true);
  });

  test('stops long press when the component unmounts', async () => {
    vi.useFakeTimers();
    const modelValue = ref(0);
    const wrapper = mount(() => (
      <HInputNumber
        v-model={modelValue.value}
        enableLangPress={true}
        langPressFrequency={10}
      />
    ));

    await wrapper.find('.h-input-number__step-up').trigger('mousedown');
    wrapper.unmount();
    await vi.advanceTimersByTimeAsync(1000);

    expect(modelValue.value).toBe(0);
  });
});
