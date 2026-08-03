import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import HSplitter from '../src/Splitter';
import HSplitterPanel from '../src/SplitterPanel';

describe('Splitter', () => {
  test('renders panels and accessible separators', () => {
    const wrapper = mount(() => (
      <HSplitter>
        <HSplitterPanel size={30}>Navigation</HSplitterPanel>
        <HSplitterPanel>Main</HSplitterPanel>
      </HSplitter>
    ));

    expect(wrapper.findAllComponents(HSplitterPanel)).toHaveLength(2);
    const separator = wrapper.get('[role="separator"]');
    expect(separator.attributes('aria-orientation')).toBe('horizontal');
    expect(separator.attributes('aria-valuenow')).toBe('30');
  });

  test('applies panel bounds to initial sizes', () => {
    const wrapper = mount(() => (
      <HSplitter>
        <HSplitterPanel size={5} min={20}>
          Navigation
        </HSplitterPanel>
        <HSplitterPanel>Main</HSplitterPanel>
      </HSplitter>
    ));

    expect(wrapper.get('[role="separator"]').attributes('aria-valuenow')).toBe('20');
  });

  test('resizes with keyboard and respects bounds', async () => {
    const wrapper = mount(HSplitter, {
      props: { keyboardStep: 10 },
      slots: {
        default: () => [
          <HSplitterPanel size={30} min={20} max={40}>
            A
          </HSplitterPanel>,
          <HSplitterPanel>B</HSplitterPanel>,
        ],
      },
    });
    const separator = wrapper.get('[role="separator"]');

    await separator.trigger('keydown', { key: 'ArrowRight' });
    await separator.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([40, 60]);

    await separator.trigger('keydown', { key: 'Home' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([20, 80]);
  });

  test('resizes adjacent panels with pointer input', async () => {
    const wrapper = mount(HSplitter, {
      slots: {
        default: () => [
          <HSplitterPanel size={30}>A</HSplitterPanel>,
          <HSplitterPanel>B</HSplitterPanel>,
        ],
      },
    });
    Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 100, height: 100, top: 0, left: 0, right: 100, bottom: 100 }),
    });

    await wrapper.get('[role="separator"]').trigger('pointerdown', {
      button: 0,
      clientX: 30,
    });
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 40 }));
    window.dispatchEvent(new PointerEvent('pointerup'));

    expect(wrapper.emitted('resizeStart')?.[0]).toEqual([0]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([40, 60]);
    expect(wrapper.emitted('resizeEnd')?.at(-1)?.[0]).toEqual([40, 60]);
  });

  test('updates controlled sizes', async () => {
    const value = ref([25, 75]);
    const wrapper = mount(() => (
      <HSplitter modelValue={value.value} onUpdate:modelValue={next => (value.value = next)}>
        <HSplitterPanel>A</HSplitterPanel>
        <HSplitterPanel>B</HSplitterPanel>
      </HSplitter>
    ));

    await wrapper.get('[role="separator"]').trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(value.value).toEqual([27, 73]);
  });

  test('collapses and restores a collapsible panel', async () => {
    const wrapper = mount(HSplitter, {
      slots: {
        default: () => [
          <HSplitterPanel size={25} collapsible>
            A
          </HSplitterPanel>,
          <HSplitterPanel>B</HSplitterPanel>,
        ],
      },
    });
    const separator = wrapper.get('[role="separator"]');
    await separator.trigger('dblclick');
    expect(wrapper.emitted('collapse')?.[0]).toEqual([0, true]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([0, 100]);

    await separator.trigger('dblclick');
    expect(wrapper.emitted('collapse')?.[1]).toEqual([0, false]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([25, 75]);
  });

  test('disabled separators are not interactive', async () => {
    const wrapper = mount(HSplitter, {
      props: { disabled: true },
      slots: {
        default: () => [<HSplitterPanel>A</HSplitterPanel>, <HSplitterPanel>B</HSplitterPanel>],
      },
    });
    const separator = wrapper.get('[role="separator"]');
    expect(separator.attributes('tabindex')).toBe('-1');
    await separator.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('resize')).toBeUndefined();
  });
});
