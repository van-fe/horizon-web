import { shallowMount, mount } from '@vue/test-utils';
import HSlider from '../src/Slider';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import type { SliderProps } from '../src/composables/useProps';
import SliderCursor from '../src/components/SliderCursor';
import HInputNumber from '../../InputNumber/src/InputNumber';
import HTooltip from '../../Tooltip/src/Tooltip';
import { useSliderCursorEmits } from '../src/composables/useEmits';

describe('Slider.tsx', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('basic', () => {
    test('renders separators, custom progress, input options and tooltip options', async () => {
      const onUpdateModelValue = vi.fn();
      const tooltipFormatter = vi.fn((value: number) => `Value ${value}`);
      const wrapper = mount(HSlider, {
        props: {
          modelValue: 25,
          step: 25,
          showSeparator: true,
          color: 'rgb(1, 2, 3)',
          inputEnable: true,
          inputProps: { precision: 2 },
          tooltipEnable: true,
          tooltipPlacement: 'bottom',
          tooltipFormatter,
          'onUpdate:modelValue': onUpdateModelValue,
        },
      });

      expect(wrapper.findAll('.h-slider__separator--item')).toHaveLength(3);
      expect(wrapper.get('.h-slider__progress').attributes('style')).toContain(
        'background: rgb(1, 2, 3)',
      );
      expect(wrapper.getComponent(HInputNumber).props('precision')).toBe(2);
      expect(wrapper.getComponent(HTooltip).props()).toMatchObject({
        disabled: false,
        placement: 'bottom',
      });
      await wrapper.get('[role="slider"]').trigger('keydown', { code: 'ArrowRight' });
      await wrapper.get('[role="slider"]').trigger('keyup');
      await nextTick();
      expect(onUpdateModelValue).toHaveBeenCalledWith(50);
      expect(tooltipFormatter).toHaveBeenCalled();
      expect(useSliderCursorEmits['update:modelValue'](50)).toBe(true);
    });

    test('create', async () => {
      const modelValue = ref();
      const wrapper = shallowMount(() => <HSlider v-model={modelValue.value} />);
      const element = wrapper.findComponent(HSlider);

      expect(element.exists()).toBe(true);
    });

    test('step', async () => {
      const modelValue = ref(8);
      mount(() => <HSlider v-model={modelValue.value} min={0} max={100} step={10} />);
      expect(modelValue.value).toEqual(10);
    });

    test('size', async () => {
      const modelValue = ref(0);
      const sizeRef = ref<SliderProps['size']>('small');

      const wrapper = mount(() => <HSlider v-model={modelValue.value} size={sizeRef.value} />);

      expect(wrapper.find('.h-slider--small').exists()).toBe(true);

      sizeRef.value = 'medium';

      await nextTick();

      expect(wrapper.find('.h-slider--medium').exists()).toBe(true);
    });

    test('should not exceed min and max', async () => {
      const modelValue = ref(120);
      mount(() => <HSlider v-model={modelValue.value} />);

      expect(modelValue.value).toEqual(100);

      modelValue.value = -10;

      await nextTick();

      expect(modelValue.value).toEqual(0);
    });

    test('click track', async () => {
      const modelValue = ref(0);

      const wrapper = mount(
        () => (
          <div style="width: 100px;">
            <HSlider v-model={modelValue.value} />
          </div>
        ),
        {
          attachTo: document.body,
        },
      );

      const track = wrapper.find('.h-slider__track');

      vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        width: 100,
        height: 8,
        top: 0,
        right: 100,
        bottom: 8,
        left: 0,
        toJSON: () => {},
      });

      const clickEvent = new MouseEvent('click', {
        clientX: 55,
      });

      wrapper.find('.h-slider__container').element.dispatchEvent(clickEvent);
      await nextTick();

      expect(modelValue.value).toEqual(55);
    });

    test('does not react to track clicks when disabled or track-clickable is false', async () => {
      const disabledValue = ref(20);
      const disabledWrapper = mount(() => <HSlider v-model={disabledValue.value} disabled />);
      const disabledTrack = disabledWrapper.find('.h-slider__track');

      vi.spyOn(disabledTrack.element, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        width: 100,
        height: 8,
        top: 0,
        right: 100,
        bottom: 8,
        left: 0,
        toJSON: () => {},
      });

      await disabledWrapper.find('.h-slider__container').trigger('click', { clientX: 80 });
      expect(disabledValue.value).toBe(20);

      const unclickableValue = ref(30);
      const unclickableWrapper = mount(() => (
        <HSlider v-model={unclickableValue.value} trackClickable={false} />
      ));

      await unclickableWrapper.find('.h-slider__container').trigger('click', { clientX: 80 });
      expect(unclickableValue.value).toBe(30);
    });

    test('normalizes and sorts range values', async () => {
      const modelValue = ref<[number, number]>([90, 10]);
      const wrapper = mount(() => (
        <HSlider v-model={modelValue.value} range min={20} max={80} step={10} />
      ));

      await nextTick();

      expect(modelValue.value).toEqual([20, 80]);
      expect(wrapper.findAll('[role="slider"]')).toHaveLength(2);
      expect(
        wrapper.findAll('[role="slider"]').map(item => item.attributes('aria-valuenow')),
      ).toEqual(['80', '20']);
    });
  });

  describe('event', () => {
    test('left and right arrow keys update the value and ARIA state', async () => {
      vi.useFakeTimers();
      const modelValue = ref(50);
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const wrapper = mount(() => (
        <HSlider v-model={modelValue.value} step={10} onFocus={onFocus} onBlur={onBlur} />
      ));

      const cursor = wrapper.findComponent(SliderCursor);
      const slider = wrapper.find('[role="slider"]');

      expect(cursor.exists()).toBe(true);
      expect(slider.attributes('aria-valuenow')).toBe('50');

      await slider.trigger('focus');
      expect(onFocus).toHaveBeenCalledOnce();

      await slider.trigger('keydown', {
        code: 'ArrowLeft',
      });
      await slider.trigger('keyup');
      await nextTick();

      expect(modelValue.value).toBe(40);
      expect(slider.attributes('aria-valuenow')).toBe('40');

      await slider.trigger('keydown', {
        code: 'ArrowRight',
      });
      await slider.trigger('keyup');
      await nextTick();

      expect(modelValue.value).toBe(50);
      expect(slider.attributes('aria-valuenow')).toBe('50');

      await slider.trigger('blur');
      expect(onBlur).toHaveBeenCalledOnce();
    });

    test.each([
      { props: { disabled: true }, label: 'disabled' },
      { props: { keyboardEnable: false }, label: 'keyboard disabled' },
    ])('ignores arrow keys when $label', async ({ props }) => {
      vi.useFakeTimers();
      const modelValue = ref(50);
      const wrapper = mount(() => <HSlider v-model={modelValue.value} {...props} />);
      const slider = wrapper.find('[role="slider"]');

      await slider.trigger('keydown', { code: 'ArrowRight' });
      await slider.trigger('keyup');
      await nextTick();

      expect(modelValue.value).toBe(50);
      expect(wrapper.find('[role="slider"]').attributes('aria-disabled')).toBe(
        props.disabled ? 'true' : 'false',
      );
    });
  });
});
