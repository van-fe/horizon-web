import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { Fragment, nextTick, ref } from 'vue';
import HSplitter from '../src/Splitter';
import HSplitterPanel from '../src/SplitterPanel';

describe('Splitter', () => {
  test('direction changes the separator orientation and vertical keyboard axis', async () => {
    const wrapper = mount(HSplitter, {
      props: { direction: 'vertical', keyboardStep: 10 },
      slots: {
        default: () => [
          <HSplitterPanel size={30}>Top</HSplitterPanel>,
          <HSplitterPanel>Bottom</HSplitterPanel>,
        ],
      },
    });
    const separator = wrapper.get('[role="separator"]');
    expect(separator.attributes('aria-orientation')).toBe('vertical');
    await separator.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([40, 60]);
  });

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

    wrapper
      .get('[role="separator"]')
      .element.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 30 }),
      );
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

  test('normalizes invalid controlled sizes and exercises resizeTo/reset boundaries', async () => {
    const value = ref([0, 0]);
    const wrapper = mount(HSplitter, {
      props: {
        modelValue: value.value,
        'onUpdate:modelValue': next => {
          value.value = next;
        },
      },
      slots: {
        default: () => (
          <Fragment>
            <HSplitterPanel>A</HSplitterPanel>
            <HSplitterPanel>B</HSplitterPanel>
          </Fragment>
        ),
      },
    });
    expect(wrapper.get('[role="separator"]').attributes('aria-valuenow')).toBe('50');

    await wrapper.setProps({ modelValue: [Number.NaN, 100] });
    expect(wrapper.get('[role="separator"]').attributes('aria-valuenow')).toBe('50');
    const calls = wrapper.emitted('resize')?.length ?? 0;
    (wrapper.vm as any).resizeTo(-1, 20);
    (wrapper.vm as any).resizeTo(0, Number.NaN);
    expect(wrapper.emitted('resize')?.length ?? 0).toBe(calls);

    (wrapper.vm as any).resizeTo(1, 20);
    await nextTick();
    expect(value.value).toEqual([80, 20]);
    (wrapper.vm as any).reset();
    await nextTick();
    expect(value.value).toEqual([50, 50]);
  });

  test('uses End/shift keyboard bounds and collapses the right-hand panel', async () => {
    const wrapper = mount(HSplitter, {
      props: { keyboardStep: 2 },
      slots: {
        default: () => [
          <HSplitterPanel size={60} min={10} max={90}>A</HSplitterPanel>,
          <HSplitterPanel min={15} collapsible>B</HSplitterPanel>,
        ],
      },
    });
    const separator = wrapper.get('[role="separator"]');
    await separator.trigger('keydown', { key: 'ArrowLeft', shiftKey: true });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([50, 50]);
    await separator.trigger('keydown', { key: 'End' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([85, 15]);

    await separator.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('collapse')?.at(-1)).toEqual([1, true]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([100, 0]);
    await separator.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('collapse')?.at(-1)).toEqual([1, false]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([85, 15]);
  });

  test('ignores invalid pointer starts and ends an active resize on pointercancel', () => {
    const wrapper = mount(HSplitter, {
      slots: {
        default: () => [<HSplitterPanel>A</HSplitterPanel>, <HSplitterPanel>B</HSplitterPanel>],
      },
    });
    const separator = wrapper.get('[role="separator"]');
    Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }),
    });
    separator.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 1, clientX: 20 }),
    );
    separator.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 20 }),
    );
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 40 }));
    expect(wrapper.emitted('resizeStart')).toBeUndefined();

    Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 100, height: 100, top: 0, left: 0, right: 100, bottom: 100 }),
    });
    separator.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 50 }),
    );
    window.dispatchEvent(new PointerEvent('pointercancel'));
    expect(wrapper.emitted('resizeStart')?.at(-1)).toEqual([0]);
    expect(wrapper.emitted('resizeEnd')?.at(-1)?.[0]).toEqual([50, 50]);
  });

  test('does nothing when neither adjacent panel is collapsible', async () => {
    const wrapper = mount(HSplitter, {
      slots: {
        default: () => [<HSplitterPanel>A</HSplitterPanel>, <HSplitterPanel>B</HSplitterPanel>],
      },
    });
    await wrapper.get('[role="separator"]').trigger('dblclick');
    expect(wrapper.emitted('collapse')).toBeUndefined();
  });

  test('supports an empty slot and ignores controlled updates before panels exist', async () => {
    const wrapper = mount(HSplitter, { props: { modelValue: [25, 75] } });
    expect(wrapper.find('[role="separator"]').exists()).toBe(false);
    await wrapper.setProps({ modelValue: [40, 60] });
    expect(wrapper.emitted('resize')).toBeUndefined();
  });

  test('resizes vertically through native pointer coordinates and ignores idle global events', () => {
    const wrapper = mount(HSplitter, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [
          <HSplitterPanel size={30}>Top</HSplitterPanel>,
          <HSplitterPanel>Bottom</HSplitterPanel>,
        ],
      },
    });
    Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 80, height: 200, top: 0, left: 0, right: 80, bottom: 200 }),
    });

    window.dispatchEvent(new PointerEvent('pointermove', { clientY: 50 }));
    window.dispatchEvent(new PointerEvent('pointerup'));
    wrapper
      .get('[role="separator"]')
      .element.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 60 }),
      );
    window.dispatchEvent(new PointerEvent('pointermove', { clientY: 100 }));
    window.dispatchEvent(new PointerEvent('pointerup'));

    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([50, 50]);
    expect(wrapper.emitted('resizeEnd')?.at(-1)?.[0]).toEqual([50, 50]);
  });

  test('does not collapse while disabled even when the native dblclick handler runs', async () => {
    const wrapper = mount(HSplitter, {
      props: { disabled: true },
      slots: {
        default: () => [
          <HSplitterPanel collapsible>A</HSplitterPanel>,
          <HSplitterPanel>B</HSplitterPanel>,
        ],
      },
    });
    await wrapper.get('[role="separator"]').trigger('dblclick');
    expect(wrapper.emitted('collapse')).toBeUndefined();
  });
});
