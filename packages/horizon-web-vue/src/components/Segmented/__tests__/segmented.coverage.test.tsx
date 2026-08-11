import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HSegmented from '../src/Segmented';
import HSegmentedItem from '../src/SegmentedItem';
import { useSegmentedEmits, useSegmentedItemEmits } from '../src/composables/useEmits';
import useResponsive from '../src/composables/useResponsive';

const SegmentedResponsiveHarness = defineComponent({
  setup(_, { expose }) {
    const root = ref<HTMLElement>();
    const wrapper = ref<HTMLElement>();
    const container = ref<HTMLElement>();
    const activeKey = ref<string | number>('missing');
    const size = ref('small');
    const arrow = ref(false);
    const focusable = ref(true);
    const scrollableInput = ref(false);
    const api = useResponsive({
      root,
      wrapper,
      container,
      activeKey,
      size,
      arrow,
      focusable,
      scrollable: scrollableInput,
    } as never);
    expose({ ...api, activeKey, arrow, focusable, scrollableInput });
    return () => (
      <div ref={root}>
        <div ref={wrapper}>
          <div ref={container} data-test="segmented-responsive-container" />
        </div>
      </div>
    );
  },
});

type ResponsiveHarnessApi = ReturnType<typeof useResponsive> & {
  activeKey: Ref<string | number>;
  arrow: Ref<boolean>;
  focusable: Ref<boolean>;
  scrollableInput: Ref<boolean>;
};

describe('Segmented browser coverage', () => {
  test('validates every Segmented and item emit branch', () => {
    expect(useSegmentedEmits['update:activeKey']('one')).toBe(true);
    expect(useSegmentedEmits['update:activeKey'](1)).toBe(true);
    expect(useSegmentedEmits['update:activeKey']({} as never)).toBe(false);
    expect(useSegmentedEmits.change('one')).toBe(true);
    expect(useSegmentedEmits.change(1)).toBe(true);
    expect(useSegmentedEmits.change({} as never)).toBe(false);
    expect(useSegmentedItemEmits.click('one')).toBe(true);
    expect(useSegmentedItemEmits.click(1)).toBe(true);
    expect(useSegmentedItemEmits.click({} as never)).toBe(false);
  });

  test('requires items to be nested inside Segmented', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(() => mount(HSegmentedItem, { props: { value: 'orphan' } })).toThrow(
      'Please using <h-segmented-item /> in the <h-segmented />',
    );
    warn.mockRestore();
  });

  test('supports root focus, full navigation keys, item activation keys and scoped slots', async () => {
    const active = ref<string | number>('two');
    let scope: { state: boolean; activeKey: string | number } | undefined;
    const onItemClick = vi.fn();
    const wrapper = mount(
      () => (
        <HSegmented v-model:activeKey={active.value}>
          <HSegmentedItem value="one" onClick={onItemClick}>
            {{
              default: (current: { state: boolean; activeKey: string | number }) => {
                scope = current;
                return <strong data-test="scoped-segment">One</strong>;
              },
              icon: () => <i data-test="segment-icon">Icon</i>,
            }}
          </HSegmentedItem>
          <HSegmentedItem value="disabled" disabled>
            Disabled
          </HSegmentedItem>
          <HSegmentedItem value="two">Two</HSegmentedItem>
          <HSegmentedItem value={3}>Three</HSegmentedItem>
        </HSegmented>
      ),
      { attachTo: document.body },
    );
    const root = wrapper.get<HTMLElement>('[role="tablist"]');
    root.element.focus();
    await root.trigger('focus');
    expect(document.activeElement).toBe(wrapper.findAll('[role="tab"]')[0].element);
    await wrapper.get('[aria-selected="true"]').trigger('keydown', { key: 'Home' });
    expect(active.value).toBe('one');
    expect(scope).toEqual({
      activeKey: 'one',
      selected: true,
      state: true,
      value: 'one',
    });
    expect(wrapper.get('[data-test="segment-icon"]').classes()).toContain('h-segmented__icon');
    await wrapper.get('[aria-selected="true"]').trigger('keydown', { key: 'End' });
    expect(active.value).toBe(3);
    await wrapper.get('[aria-selected="true"]').trigger('keydown', { key: 'ArrowLeft' });
    expect(active.value).toBe('two');
    await wrapper.get('[aria-selected="true"]').trigger('keydown', { key: 'Tab' });
    expect(active.value).toBe('two');
    await wrapper.get('[data-test="scoped-segment"]').trigger('keydown', { key: 'Escape' });
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: ' ' });
    expect(active.value).toBe('one');
    expect(onItemClick).toHaveBeenCalledWith('one');
    wrapper.unmount();
  });

  test('uses real geometry for wheel and keyboard arrow paging', async () => {
    const active = ref<string | number>('one');
    const wrapper = mount(
      () => (
        <HSegmented activeKey={active.value} arrow scrollable focusable>
          <HSegmentedItem value="one">One</HSegmentedItem>
          <HSegmentedItem value="two">Two</HSegmentedItem>
          <HSegmentedItem value="three">Three</HSegmentedItem>
        </HSegmented>
      ),
      { attachTo: document.body },
    );
    const viewport = wrapper.get<HTMLElement>('.h-segmented__nav-wrap').element;
    const list = wrapper.get<HTMLElement>('.h-segmented__nav-list').element;
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 200 },
      scrollWidth: { configurable: true, value: 600 },
    });
    wrapper.findAll<HTMLElement>('[role="tab"]').forEach((item, index) => {
      Object.defineProperties(item.element, {
        clientWidth: { configurable: true, value: 80 },
        offsetLeft: { configurable: true, value: index * 200 },
      });
    });
    active.value = 'three';
    await nextTick();
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-380px, 0px, 0px)');
    expect(wrapper.get('.h-segmented__indicator').attributes('style')).toContain('width: 80px');

    list.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -60 }));
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-320px, 0px, 0px)');
    const mixed = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaX: 10,
      deltaY: 10,
    });
    list.dispatchEvent(mixed);
    expect(mixed.defaultPrevented).toBe(true);
    expect(list.style.transform).toBe('translate3d(-320px, 0px, 0px)');
    await wrapper.get('[aria-label="Scroll backward"]').trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-120px, 0px, 0px)');
    await wrapper.get('[aria-label="Scroll forward"]').trigger('keydown', { key: ' ' });
    await wrapper.get('[aria-label="Scroll backward"]').trigger('keydown', { key: 'Escape' });
    await wrapper.get('[aria-label="Scroll forward"]').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-320px, 0px, 0px)');
    await wrapper.get('[aria-label="Scroll forward"]').trigger('click');
    await nextTick();
    expect(wrapper.get('[aria-label="Scroll forward"]').attributes('aria-disabled')).toBe('true');
    wrapper.unmount();
  });

  test('covers reactive registration, replacement, sorting and wheel guards', async () => {
    const mounted = mount(SegmentedResponsiveHarness, { attachTo: document.body });
    const api = mounted.getCurrentComponent().exposed as unknown as ResponsiveHarnessApi;
    const container = mounted.get<HTMLElement>(
      '[data-test="segmented-responsive-container"]',
    ).element;
    const wrapper = container.parentElement!;
    let clientWidth = 100;
    let scrollWidth = 100;
    Object.defineProperties(wrapper, {
      clientWidth: { configurable: true, get: () => clientWidth },
      scrollWidth: { configurable: true, get: () => scrollWidth },
    });
    const value = ref<string | number>('first');
    const register = api.createTab(value);
    register(null);
    value.value = 'before-registration';
    const first = document.createElement('button');
    const replacement = document.createElement('button');
    Object.defineProperties(first, {
      clientWidth: { configurable: true, value: 30 },
      offsetLeft: { configurable: true, value: 10 },
    });
    Object.defineProperties(replacement, {
      clientWidth: { configurable: true, value: 40 },
      offsetLeft: { configurable: true, value: 170 },
    });
    register(first);
    register(replacement);
    value.value = 'renamed';
    const otherValue = ref<string | number>('other');
    const other = document.createElement('button');
    Object.defineProperties(other, {
      clientWidth: { configurable: true, value: 20 },
      offsetLeft: { configurable: true, value: 5 },
    });
    const registerOther = api.createTab(otherValue);
    registerOther(other);
    api.keys.value = ['missing', 'renamed', 'other'];
    expect(api.keys.value).toEqual(['renamed', 'other']);

    scrollWidth = 300;
    api.arrow.value = true;
    api.activeKey.value = 'renamed';
    await nextTick();
    await nextTick();
    expect(api.scrollable.value).toBe(true);
    expect(api.indicatorStyle.value.width).toBe('40px');
    api.activeKey.value = 'other';
    await nextTick();
    expect(container.style.transform).toContain('translate3d(0px');
    api.activeKey.value = 'renamed';

    api.scrollableInput.value = false;
    container.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 20 }));
    api.scrollableInput.value = true;
    scrollWidth = clientWidth;
    container.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 20 }));
    scrollWidth = 300;
    container.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaX: 2, deltaY: 2 }));
    container.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaX: -40, deltaY: -0 }));
    container.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 50 }));
    await nextTick();
    expect(container.style.transform).toContain('translate3d');

    api.move('left');
    api.move('right');
    clientWidth = scrollWidth;
    api.move('right');
    api.focusable.value = false;
    api.activeKey.value = 'other';
    await nextTick();
    api.focusable.value = true;
    api.activeKey.value = 'unknown';
    await nextTick();
    expect(api.indicatorStyle.value).toEqual({});
    register(null);
    registerOther(null);
    mounted.unmount();
  });

  test('covers empty root focus and active/disabled item guards', async () => {
    const empty = mount(() => (
      <HSegmented>
        <span data-test="not-a-tab">Plain content</span>
      </HSegmented>
    ));
    await empty.get('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    await empty.get('[role="tablist"]').trigger('focus');

    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HSegmented defaultActiveKey="active" onChange={onChange}>
        <HSegmentedItem value="active">Active</HSegmentedItem>
        <HSegmentedItem value="disabled" disabled>
          Disabled
        </HSegmentedItem>
      </HSegmented>
    ));
    const items = wrapper.findAll('[role="tab"]');
    items[0].element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await items[0].trigger('click');
    await items[1].trigger('click');
    await items[1].trigger('keydown', { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
