import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTab from '../src/Tab';
import HTabs from '../src/Tabs';
import { useTabEmits, useTabsEmits } from '../src/composables/useEmits';
import type { TabsExposes } from '../src/composables/useExposes';
import useResponsive from '../src/composables/useResponsive';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';

const TabsResponsiveHarness = defineComponent({
  setup(_, { expose }) {
    const root = ref<HTMLElement>();
    const wrapper = ref<HTMLElement>();
    const container = ref<HTMLElement>();
    const activeKey = ref<string | number>('missing');
    const size = ref('small');
    const type = ref('line');
    const arrow = ref(false);
    const focusable = ref(true);
    const scrollableInput = ref(false);
    const api = useResponsive({
      root,
      wrapper,
      container,
      activeKey,
      size,
      type,
      arrow,
      focusable,
      scrollable: scrollableInput,
    } as never);
    expose({ ...api, activeKey, type, arrow, focusable, scrollableInput });
    return () => (
      <div ref={root}>
        <div ref={wrapper}>
          <div ref={container} data-test="tabs-responsive-container" />
        </div>
      </div>
    );
  },
});

type ResponsiveHarnessApi = ReturnType<typeof useResponsive> & {
  activeKey: Ref<string | number>;
  type: Ref<string>;
  arrow: Ref<boolean>;
  focusable: Ref<boolean>;
  scrollableInput: Ref<boolean>;
};

describe('Tabs browser coverage', () => {
  test('exposes focus for the selected or requested enabled tab', async () => {
    const tabsRef = ref<TabsExposes | null>(null);
    const wrapper = mount(
      () => (
        <HTabs ref={tabsRef} defaultActiveKey="one">
          <HTab key="one" label="One" />
          <HTab key="disabled" label="Disabled" disabled />
          <HTab key="two" label="Two" />
        </HTabs>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    tabsRef.value?.focus();
    expect(document.activeElement).toBe(wrapper.get('[data-name="one"]').element);
    tabsRef.value?.focus('two');
    expect(document.activeElement).toBe(wrapper.get('[data-name="two"]').element);
    wrapper.unmount();
  });

  test('validates every Tabs and Tab emit branch', () => {
    expect(useTabsEmits['update:activeKey']('one')).toBe(true);
    expect(useTabsEmits['update:activeKey'](1)).toBe(true);
    expect(useTabsEmits['update:activeKey']({} as never)).toBe(false);
    expect(useTabsEmits.change('one')).toBe(true);
    expect(useTabsEmits.change(1)).toBe(true);
    expect(useTabsEmits.change({} as never)).toBe(false);
    expect(useTabsEmits.add()).toBe(true);
    expect(useTabsEmits.close('one')).toBe(true);
    expect(useTabsEmits.close(1)).toBe(true);
    expect(useTabsEmits.close(undefined as never)).toBe(true);
    expect(useTabsEmits.close({} as never)).toBe(false);
    expect(useTabsEmits.sort(0, 1, ['one'])).toBe(true);
    expect(useTabsEmits.sort('0' as never, 1, ['one'])).toBe(false);
    expect(useTabsEmits.sort(0, '1' as never, ['one'])).toBe(false);
    expect(useTabsEmits.sort(0, 1, {} as never)).toBe(false);
    expect(useTabEmits.click('one')).toBe(true);
    expect(useTabEmits.click(1)).toBe(true);
    expect(useTabEmits.click({} as never)).toBe(false);
    expect(useTabEmits.close('one')).toBe(true);
    expect(useTabEmits.close(1)).toBe(true);
    expect(useTabEmits.close({} as never)).toBe(false);
  });

  test('renders nothing without a default slot', () => {
    const wrapper = mount(HTabs);
    expect(wrapper.html()).toBe('');
  });

  test('supports Home, End, ArrowLeft and root focus while skipping disabled tabs', async () => {
    const active = ref('two');
    const wrapper = mount(
      () => (
        <HTabs v-model:activeKey={active.value}>
          <HTab key="one" label="One" />
          <HTab key="disabled" label="Disabled" disabled />
          <HTab key="two" label="Two" />
          <HTab key="three" label="Three" />
        </HTabs>
      ),
      { attachTo: document.body },
    );
    const root = wrapper.get<HTMLElement>('[role="tablist"]');
    root.element.focus();
    await root.trigger('focus');
    expect(document.activeElement).toBe(wrapper.get('[data-name="one"]').element);

    await wrapper.get('[data-name="two"]').trigger('keydown', { key: 'Home' });
    expect(active.value).toBe('one');
    await wrapper.get('[data-name="one"]').trigger('keydown', { key: 'End' });
    expect(active.value).toBe('three');
    await wrapper.get('[data-name="three"]').trigger('keydown', { key: 'ArrowLeft' });
    expect(active.value).toBe('two');
    await wrapper.get('[data-name="two"]').trigger('keydown', { key: 'Tab' });
    expect(active.value).toBe('two');
    wrapper.unmount();
  });

  test('blocks changes rejected by beforeChange and avoids stale async changes', async () => {
    const gate = Promise.withResolvers<boolean>();
    const active = ref('one');
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HTabs activeKey={active.value} beforeChange={() => gate.promise} onChange={onChange}>
        <HTab key="one" label="One" />
        <HTab key="two" label="Two" />
      </HTabs>
    ));
    await wrapper.get('[data-name="two"]').trigger('click');
    active.value = 'external';
    await nextTick();
    gate.resolve(true);
    await nextTick();
    expect(onChange).not.toHaveBeenCalled();

    const rejected = mount(() => (
      <HTabs defaultActiveKey="one" beforeChange={async () => false} onChange={onChange}>
        <HTab key="one" label="One" />
        <HTab key="two" label="Two" />
      </HTabs>
    ));
    await rejected.get('[data-name="two"]').trigger('click');
    await nextTick();
    expect(rejected.get('[data-name="one"]').attributes('aria-selected')).toBe('true');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('closes the active first tab onto its next sibling and supports keyboard controls', async () => {
    const active = ref('one');
    const onClose = vi.fn();
    const onAdd = vi.fn();
    const wrapper = mount(
      () => (
        <HTabs v-model:activeKey={active.value} editable onClose={onClose} onAdd={onAdd}>
          <HTab key="one" label="One" closable />
          <HTab key="two" label="Two" closable />
        </HTabs>
      ),
      { attachTo: document.body },
    );
    await wrapper.get('[data-name="one"] .h-tabs__close').trigger('keydown', { key: 'Enter' });
    expect(active.value).toBe('two');
    expect(onClose).toHaveBeenCalledWith('one');
    await wrapper.get('.h-tabs__icon-outer--add').trigger('keydown', { key: ' ' });
    expect(onAdd).toHaveBeenCalledOnce();
    await wrapper.get('.h-tabs__icon-outer--add').trigger('keydown', { key: 'Escape' });
    expect(onAdd).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  test('renders scoped tab content, icon slot and scoped extra size', () => {
    let scope: { state: boolean; activeKey: string | number } | undefined;
    let extraSize: string | undefined;
    const wrapper = mount(() => (
      <HTabs defaultActiveKey="custom" size="large">
        {{
          default: () => (
            <HTab key="custom">
              {{
                default: (current: { state: boolean; activeKey: string | number }) => {
                  scope = current;
                  return <strong data-test="scoped-tab">Scoped</strong>;
                },
                icon: () => <i data-test="icon-slot">Icon</i>,
              }}
            </HTab>
          ),
          extra: ({ size }: { size: string }) => {
            extraSize = size;
            return <span data-test="extra">Extra</span>;
          },
        }}
      </HTabs>
    ));
    expect(wrapper.get('[data-test="scoped-tab"]').text()).toBe('Scoped');
    expect(wrapper.get('[data-test="icon-slot"]').classes()).toContain('h-tabs__icon');
    expect(wrapper.get('[data-test="extra"]').text()).toBe('Extra');
    expect(scope).toEqual({ state: true, activeKey: 'custom' });
    expect(extraSize).toBe('large');
  });

  test('uses real geometry for indicators, wheels, and arrow paging', async () => {
    const active = ref('one');
    const wrapper = mount(
      () => (
        <HTabs activeKey={active.value} arrow scrollable>
          <HTab key="one" label="One" />
          <HTab key="two" label="Two" />
          <HTab key="three" label="Three" />
        </HTabs>
      ),
      { attachTo: document.body },
    );
    const viewport = wrapper.get<HTMLElement>('.h-tabs__nav-wrap').element;
    const list = wrapper.get<HTMLElement>('.h-tabs__nav-list').element;
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 200 },
      scrollWidth: { configurable: true, value: 600 },
    });
    const tabs = wrapper.findAll<HTMLElement>('[role="tab"]');
    tabs.forEach((tab, index) => {
      Object.defineProperties(tab.element, {
        clientWidth: { configurable: true, value: 100 },
        offsetLeft: { configurable: true, value: index * 200 },
      });
    });

    active.value = 'three';
    await nextTick();
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-350px, 0px, 0px)');
    expect(wrapper.get('.h-tabs__indicator').attributes('style')).toContain('width: 100px');

    const mixed = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaX: 10,
      deltaY: 20,
    });
    list.dispatchEvent(mixed);
    expect(mixed.defaultPrevented).toBe(true);
    expect(list.style.transform).toBe('translate3d(-350px, 0px, 0px)');
    list.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 60 }));
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-400px, 0px, 0px)');
    await wrapper.get('[aria-label="Scroll tabs backward"]').trigger('click');
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-200px, 0px, 0px)');
    await wrapper.get('[aria-label="Scroll tabs forward"]').trigger('keydown', { key: 'Enter' });
    await wrapper.get('[aria-label="Scroll tabs backward"]').trigger('keydown', { key: 'Escape' });
    await wrapper.get('[aria-label="Scroll tabs forward"]').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(list.style.transform).toBe('translate3d(-400px, 0px, 0px)');
    wrapper.unmount();
  });

  test('handles all drag lifecycle branches including same and disabled drop targets', async () => {
    const onSort = vi.fn();
    const wrapper = mount(() => (
      <HTabs draggable onSort={onSort} arrow={false}>
        <HTab key="one" label="One" />
        <HTab key="two" label="Two" />
        <HTab key="fixed" label="Fixed" draggable={false} />
      </HTabs>
    ));
    const tabs = wrapper.findAll<HTMLElement>('[role="tab"]');
    const transfer = new DataTransfer();
    tabs[0].element.dispatchEvent(
      new DragEvent('dragstart', { bubbles: true, dataTransfer: transfer }),
    );
    tabs[0].element.dispatchEvent(new DragEvent('drag', { bubbles: true }));
    tabs[0].element.dispatchEvent(new DragEvent('dragenter', { bubbles: true }));
    tabs[0].element.dispatchEvent(new DragEvent('dragleave', { bubbles: true }));
    tabs[0].element.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true }));
    tabs[0].element.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    expect(onSort).not.toHaveBeenCalled();

    tabs[2].element.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true }));
    tabs[2].element.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    expect(onSort).not.toHaveBeenCalled();
    tabs[0].element.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
    expect(tabs[0].classes()).not.toContain('h-tabs__tab--dragging');
  });

  test('drives responsive registration, sorting and every wheel guard in Chromium', async () => {
    const mounted = mount(TabsResponsiveHarness, { attachTo: document.body });
    const api = mounted.getCurrentComponent().exposed as unknown as ResponsiveHarnessApi;
    const container = mounted.get<HTMLElement>('[data-test="tabs-responsive-container"]').element;
    const wrapper = container.parentElement!;
    let clientWidth = 100;
    let scrollWidth = 100;
    Object.defineProperties(wrapper, {
      clientWidth: { configurable: true, get: () => clientWidth },
      scrollWidth: { configurable: true, get: () => scrollWidth },
    });
    const left = document.createElement('button');
    const right = document.createElement('button');
    Object.defineProperties(left, {
      clientWidth: { configurable: true, value: 30 },
      offsetLeft: { configurable: true, value: 10 },
    });
    Object.defineProperties(right, {
      clientWidth: { configurable: true, value: 40 },
      offsetLeft: { configurable: true, value: 180 },
    });
    const registerLeft = api.createTab('left');
    const registerRight = api.createTab('right');
    registerLeft(left);
    registerRight(right);
    api.keys.value = ['missing', 'right', 'left'];
    expect(api.keys.value).toEqual(['right', 'left']);

    api.activeKey.value = 'right';
    scrollWidth = 300;
    api.arrow.value = true;
    await nextTick();
    await nextTick();
    expect(api.scrollable.value).toBe(true);
    expect(api.indicatorStyle.value.width).toBe('40px');
    api.activeKey.value = 'left';
    await nextTick();
    expect(container.style.transform).toContain('translate3d(0px');
    api.activeKey.value = 'right';

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
    api.move('left');
    api.focusable.value = false;
    api.activeKey.value = 'left';
    api.type.value = 'card';
    await nextTick();
    api.type.value = 'line';
    api.focusable.value = true;
    api.activeKey.value = 'unknown';
    await nextTick();
    expect(api.indicatorStyle.value).toEqual({});
    registerLeft(null);
    registerRight(null);
    mounted.unmount();
  });

  test('covers orphan, disabled and fallback-label Tab keyboard contracts', async () => {
    expect(() => mount(HTab, { props: { label: 'Orphan' } })).toThrow(
      'Please using <h-tab> in the <h-tabs>',
    );
    const onChange = vi.fn();
    const formItemTrigger = vi.fn();
    const wrapper = mount(
      () => (
        <HTabs defaultActiveKey="active" editable onChange={onChange}>
          <HTab key="active" label={undefined} closable />
          <HTab key="disabled" label="Disabled" disabled closable />
        </HTabs>
      ),
      { global: { provide: { [HFormItemTriggerInjectedKey as symbol]: formItemTrigger } } },
    );
    wrapper
      .get('[data-name="active"]')
      .element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await wrapper.get('[data-name="active"]').trigger('click');
    await wrapper.get('[data-name="disabled"]').trigger('click');
    await wrapper.get('[data-name="disabled"]').trigger('keydown', { key: 'Enter' });
    await wrapper.get('[data-name="disabled"] .h-tabs__close').trigger('keydown', {
      key: 'Escape',
    });
    expect(wrapper.get('[data-name="active"] .h-tabs__close').attributes('aria-label')).toBe(
      'Close tab',
    );
    expect(onChange).not.toHaveBeenCalled();
    await wrapper.get('[role="tablist"]').trigger('blur');
    expect(formItemTrigger).toHaveBeenCalledWith('blur');

    const empty = mount(() => (
      <HTabs>
        <span data-test="plain-tab-content">Plain</span>
      </HTabs>
    ));
    await empty.get('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    await empty.get('[role="tablist"]').trigger('focus');

    const active = ref('two');
    const closeSecond = mount(() => (
      <HTabs v-model:activeKey={active.value} editable>
        <HTab key="one" label="One" closable />
        <HTab key="two" label="Two" closable />
      </HTabs>
    ));
    await closeSecond.get('[data-name="two"] .h-tabs__close').trigger('click');
    expect(active.value).toBe('one');
  });
});
