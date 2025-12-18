import { shallowMount, mount } from '@vue/test-utils';
import NSlider from '../src/Slider';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import type { SliderProps } from '../src/composables/useProps';
import SliderCursor from '../src/components/SliderCursor';

describe('Slider.tsx', () => {
  describe('basic', () => {
    test('create', async () => {
      const modelValue = ref();
      const wrapper = shallowMount(() => <NSlider v-model={modelValue.value} />);
      const element = wrapper.findComponent(NSlider);

      expect(element.exists()).toBe(true);
    });

    test('step', async () => {
      const modelValue = ref(8);
      mount(() => <NSlider v-model={modelValue.value} min={0} max={100} step={10} />);
      expect(modelValue.value).toEqual(10);
    });

    test('size', async () => {
      const modelValue = ref(0);
      const sizeRef = ref<SliderProps['size']>('small');

      const wrapper = mount(() => <NSlider v-model={modelValue.value} size={sizeRef.value} />);

      expect(wrapper.find('.n-slider--small').exists()).toBe(true);

      sizeRef.value = 'medium';

      await nextTick();

      expect(wrapper.find('.n-slider--medium').exists()).toBe(true);
    });

    test('should not exceed min and max', async () => {
      const modelValue = ref(120);
      mount(() => <NSlider v-model={modelValue.value} />);

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
            <NSlider v-model={modelValue.value} />
          </div>
        ),
        {
          attachTo: document.body,
        },
      );

      const track = wrapper.find('.n-slider__track');

      const clickEvent = new MouseEvent('click', {
        clientX: 100,
      });

      track.element.dispatchEvent(clickEvent);
      await nextTick();

      // todo:: vitest can't load stylesheet
      expect(modelValue.value).toEqual(0);
    });
  });

  describe('event', () => {
    test('keyboard event', async () => {
      const modelValue = ref(50);
      const onFocus = vi.fn();
      const wrapper = mount(() => <NSlider v-model={modelValue.value} onFocus={onFocus} />);

      const cursor = wrapper.findComponent(SliderCursor);

      expect(cursor.exists()).toBe(true);

      await cursor.trigger('focus');

      // cannot trigger focus
      // expect(onFocus).toHaveBeenCalledOnce();

      await cursor.trigger('keydown', {
        code: 'ArrowLeft',
      });
    });
  });
});
