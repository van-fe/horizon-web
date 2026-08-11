import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HInputNumber from '../../InputNumber/src/InputNumber';
import HTooltip from '../../Tooltip/src/Tooltip';
import HSlider from '../src/Slider';
import SliderCursor from '../src/components/SliderCursor';
import type { SliderProps } from '../src/composables/useProps';
import { getCorrectedValue, getStepPrecision, transformValue } from '../src/utils/valueMethods';

const props = (overrides: Partial<SliderProps> = {}) =>
  ({
    modelValue: 0,
    disabled: false,
    max: 100,
    min: 0,
    step: 10,
    showSeparator: false,
    type: 'primary',
    range: false,
    trackClickable: true,
    inputEnable: false,
    keyboardEnable: true,
    tooltipEnable: true,
    tooltipPlacement: 'top',
    ...overrides,
  }) as SliderProps;

describe('Slider browser coverage', () => {
  test('normalizes scalar and malformed range values and rounds steps precisely', () => {
    expect(transformValue([] as unknown as [number, number], props())).toEqual([0, 0]);
    expect(transformValue([35, 80], props())).toEqual([35, 0]);
    expect(transformValue(35, props())).toEqual([35, 0]);
    expect(transformValue([20, 70], props({ range: true }))).toEqual([20, 70]);
    expect(transformValue([20] as unknown as [number, number], props({ range: true }))).toEqual([
      20, 100,
    ]);
    expect(transformValue(120, props({ range: true }))).toEqual([100, 100]);
    expect(getStepPrecision(0.25)).toBe(2);
    expect(getCorrectedValue(1.13, props({ min: 1, max: 2, step: 0.25 }), true)).toBe(1.25);
    expect(getCorrectedValue(1.12, props({ min: 1, max: 2, step: 0.25 }), true)).toBe(1);
  });

  test('moves the closest range cursor for track clicks on both halves', async () => {
    const model = ref<[number, number]>([20, 80]);
    const wrapper = mount(
      () => <HSlider v-model={model.value} range min={0} max={100} step={10} />,
      { attachTo: document.body },
    );
    const track = wrapper.get('.h-slider__track').element;
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 8));
    wrapper.get('.h-slider__container').element.dispatchEvent(
      new MouseEvent('click', { bubbles: true, clientX: 10 }),
    );
    await nextTick();
    expect(model.value).toEqual([10, 80]);
    wrapper.get('.h-slider__container').element.dispatchEvent(
      new MouseEvent('click', { bubbles: true, clientX: 90 }),
    );
    await nextTick();
    expect(model.value).toEqual([10, 90]);
  });

  test('reacts to range and bound changes and accepts nullable input-number updates', async () => {
    const range = ref(false);
    const min = ref(0);
    const max = ref(100);
    const model = ref<number | [number, number]>(40);
    const wrapper = mount(() => (
      <HSlider
        v-model={model.value}
        range={range.value}
        min={min.value}
        max={max.value}
        inputEnable
      />
    ));
    wrapper.getComponent(HInputNumber).vm.$emit('update:modelValue', null);
    await nextTick();
    expect(model.value).toBe(0);
    range.value = true;
    model.value = [20, 80];
    await nextTick();
    expect(wrapper.findAllComponents(SliderCursor)).toHaveLength(2);
    model.value = [20, 70];
    await nextTick();
    expect(model.value).toEqual([20, 70]);
    model.value = [30, 70];
    await nextTick();
    expect(model.value).toEqual([30, 70]);
    min.value = 30;
    max.value = 70;
    await nextTick();
    expect(model.value).toEqual([30, 70]);
  });

  test('shows cursor tooltip on hover/focus and holds arrow keys until keyup', async () => {
    vi.useFakeTimers();
    const model = ref(20);
    const wrapper = mount(
      () => <HSlider v-model={model.value} step={10} tooltipEnable />,
      { attachTo: document.body },
    );
    const cursor = wrapper.get<HTMLElement>('[role="slider"]');
    await cursor.trigger('mouseenter');
    await nextTick();
    expect(wrapper.getComponent(HTooltip).props('visible')).toBe(true);
    await cursor.trigger('mouseleave');
    await nextTick();
    expect(wrapper.getComponent(HTooltip).props('visible')).toBe(false);
    await cursor.trigger('focus');
    await cursor.trigger('mouseleave');
    expect(wrapper.getComponent(HTooltip).props('visible')).toBe(true);

    await cursor.trigger('keydown', { code: 'ArrowRight' });
    await vi.advanceTimersByTimeAsync(400);
    expect(model.value).toBe(50);
    await cursor.trigger('keyup');
    await vi.advanceTimersByTimeAsync(400);
    expect(model.value).toBe(50);
    await cursor.trigger('blur');
    expect(wrapper.getComponent(HTooltip).props('visible')).toBe(false);
    vi.useRealTimers();
  });

  test('drags with native pointer events across minimum, middle and maximum', async () => {
    const model = ref(50);
    const wrapper = mount(
      () => <HSlider v-model={model.value} step={10} />,
      { attachTo: document.body },
    );
    const track = wrapper.get('.h-slider__track').element;
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(20, 0, 100, 8));
    const cursor = wrapper.get<HTMLElement>('[role="slider"]').element;
    Object.defineProperty(cursor, 'offsetWidth', { configurable: true, value: 20 });

    cursor.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 70 }));
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 10 }));
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 70 }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 130 }));
    await nextTick();
    expect(model.value).toBe(100);
    wrapper.unmount();
  });

  test('keeps disabled cursors inert across hover, pointer and exposed updates', async () => {
    const model = ref(40);
    const wrapper = mount(
      () => <HSlider v-model={model.value} disabled tooltipEnable={false} step={10} />,
      { attachTo: document.body },
    );
    const cursorWrapper = wrapper.getComponent(SliderCursor);
    const cursor = wrapper.get<HTMLElement>('[role="slider"]');
    await cursor.trigger('mouseenter');
    expect(wrapper.getComponent(HTooltip).props('visible')).toBe(false);
    cursor.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, clientX: 20 }),
    );
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 80 }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 80 }));
    const exposed = cursorWrapper.getCurrentComponent().exposed as {
      updateCurrentValue: (value: number, correct?: boolean) => void;
      updateCursorPosition: () => void;
    };
    exposed.updateCurrentValue(40);
    exposed.updateCursorPosition();
    await nextTick();
    expect(model.value).toBe(40);
    wrapper.unmount();
  });
});
