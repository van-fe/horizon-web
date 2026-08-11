import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Decimal } from 'decimal.js';
import HInputNumber from '../src/InputNumber';
import { useInputNumberEmits } from '../src/composables/useEmits';
import { formatInputForNumber, sanitizeInput } from '../src/utils/inputHelper';
import useCursor from '../src/utils/useCursor';
import type { InputNumberValue } from '../src/types';
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
    expect(toInputNumberDecimal('')).toBeNull();
    expect(toInputNumberEmitValue('2.5', false)).toBe('2.5');
    expect(toInputNumberEmitValue('not-a-number', false)).toBeNull();
    expect(
      toInputNumberEmitValue({ toString: () => { throw new TypeError('invalid numeric value'); } } as unknown as InputNumberValue, false),
    ).toBeNull();
    expect(
      toInputNumberDecimal({ toString: () => { throw new TypeError('invalid decimal'); } } as unknown as InputNumberValue),
    ).toBeNull();
  });

  test('sanitizes partial numeric input while preserving useful editing states', () => {
    expect(sanitizeInput('€-1.2.3-')).toBe('-1.23');
    expect(sanitizeInput('1-2')).toBe('12');
    expect(sanitizeInput('-.5')).toBe('-0.5');
    expect(formatInputForNumber('.5')).toBe('0.5');
    expect(formatInputForNumber('-')).toBeNull();
    expect(formatInputForNumber(12)).toBe(12);
  });

  test('validates every public emit payload defensively', () => {
    const updateValidator = useInputNumberEmits['update:modelValue'] as (value: unknown) => boolean;
    const inputValidator = useInputNumberEmits.input as (value: unknown) => boolean;
    const changeValidator = useInputNumberEmits.change as (value: unknown) => boolean;
    for (const validator of [updateValidator, inputValidator, changeValidator]) {
      expect(validator(1)).toBe(true);
      expect(validator('1')).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator({})).toBe(false);
    }

    const eventValidators = [
      [useInputNumberEmits.focus, new FocusEvent('focus')],
      [useInputNumberEmits.blur, new FocusEvent('blur')],
      [useInputNumberEmits.keydown, new KeyboardEvent('keydown')],
      [useInputNumberEmits.keypress, new KeyboardEvent('keypress')],
      [useInputNumberEmits.keyup, new KeyboardEvent('keyup')],
      [useInputNumberEmits.wheel, new WheelEvent('wheel')],
    ] as const;
    for (const [validator, event] of eventValidators) {
      const validate = validator as (value: unknown) => boolean;
      expect(validate(event)).toBe(true);
      expect(validate(new Event('invalid'))).toBe(false);
    }
    expect(useInputNumberEmits.clear()).toBe(true);
  });

  test('restores the real input caret for formatter suffix, prefix and changed middle text', async () => {
    const input = document.body.appendChild(document.createElement('input'));
    const inputRef = ref<HTMLInputElement | null>(input);
    const focused = ref(true);
    const cursor = useCursor(inputRef, focused);

    input.value = '12.34';
    input.setSelectionRange(2, 4);
    cursor.recordCursor();
    cursor.restoreCursor('12,34');
    await nextTick();
    expect(input.selectionStart).toBe(4);

    input.value = '1234';
    input.setSelectionRange(2, 3);
    cursor.recordCursor();
    cursor.restoreCursor('12x');
    await nextTick();
    expect(input.selectionStart).toBe(2);

    input.value = 'abcd';
    input.setSelectionRange(2, 2);
    cursor.recordCursor();
    cursor.restoreCursor('zbx');
    await nextTick();
    expect(input.selectionStart).toBe(2);

    cursor.restoreCursor('zzz');
    await nextTick();
    expect(input.selectionStart).toBe(3);

    focused.value = false;
    cursor.restoreCursor('ignored');
    await nextTick();
    expect(input.selectionStart).toBe(3);

    inputRef.value = null;
    cursor.recordCursor();
    useCursor(ref<HTMLInputElement | null>(null), ref(true)).restoreCursor('no selection');
    input.remove();
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
