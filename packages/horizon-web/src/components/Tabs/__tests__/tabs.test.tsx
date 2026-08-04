import { AIcon } from '@aurora/icon';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HTooltip from '../../Tooltip/src/Tooltip';
import HTab from '../src/Tab';
import HTabs from '../src/Tabs';
import type { HTabType, HTabValue } from '../src/composables/useProps';

describe('Tabs.tsx', () => {
  test('render', async () => {
    const activeKey = ref('');
    const wrapper = mount(() => (
      <HTabs activeKey={activeKey.value}>
        <HTab key="1" label="Tab1" />
        <HTab key="2" label="Tab1" />
      </HTabs>
    ));
    const element = wrapper.findComponent(HTabs);
    const tabList = wrapper.findAllComponents(HTab);

    expect(element.exists()).toBe(true);
    expect(tabList).toHaveLength(2);
    expect(wrapper.html()).toMatchInlineSnapshot(
      `
      "<div class="h-tabs h-tabs--line h-tabs--small h-tabs--underline" role="tablist" aria-orientation="horizontal">
        <div class="h-tabs__nav">
          <div class="h-tabs__nav-wrap">
            <div class="h-tabs__nav-list h-tabs__nav-list--space">
              <div role="tab" data-name="1" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                <div class="h-tabs__tab-inner">
                  <div class="h-tabs__tab-text">Tab1</div>
                  <!--teleport start-->
                  <!--teleport end-->
                  <!---->
                </div>
              </div>
              <div role="tab" data-name="2" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                <div class="h-tabs__tab-inner">
                  <div class="h-tabs__tab-text">Tab1</div>
                  <!--teleport start-->
                  <!--teleport end-->
                  <!---->
                </div>
              </div>
              <div class="h-tabs__indicator"></div>
            </div>
            <!---->
          </div>
          <div class="h-tabs__extra-outer h-tabs__extra-outer--blur">
            <div class="h-tabs__default-actions">
              <!---->
              <div class="h-tabs__arrow">
                <div class="h-tabs__icon-outer h-tabs__icon-outer--disabled" role="button" tabindex="-1" aria-disabled="true" aria-label="Scroll tabs backward"><svg class="a-icon h-icon_arrow_left h-icon__arrow_left h-tabs__icon" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;">
                    <path d="M16.2446 2L7.20708 11.4826C6.93097 11.7723 6.93097 12.2277 7.20708 12.5174L16.2446 22C16.8385 21.3769 16.8384 20.3973 16.2446 19.7741L8.83516 12L16.2446 4.22585C16.8384 3.60274 16.8385 2.62312 16.2446 2Z" fill="currentColor"></path>
                  </svg></div>
                <div class="h-tabs__icon-outer" role="button" tabindex="0" aria-disabled="false" aria-label="Scroll tabs forward"><svg class="a-icon h-icon_arrow_right h-icon__arrow_right h-tabs__icon" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;">
                    <path d="M7.75542 2L16.7929 11.4826C17.069 11.7723 17.069 12.2277 16.7929 12.5174L7.75542 22C7.16155 21.3769 7.16155 20.3973 7.75543 19.7741L15.1648 12L7.75543 4.22585C7.16155 3.60274 7.16155 2.62312 7.75542 2Z" fill="currentColor"></path>
                  </svg></div>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>"
    `,
    );
  });

  describe('props', () => {
    test('type', async () => {
      const types = ['line', 'card', 'segmented', 'page'];
      const type = ref<HTabType>('line');
      const wrapper = mount(() => (
        <HTabs type={type.value} arrow={false}>
          <HTab key="tab1" label="tab1" />
          <HTab key="tab2" label="tab2" />
        </HTabs>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-tabs h-tabs--line h-tabs--small h-tabs--underline" role="tablist" aria-orientation="horizontal" tabindex="0">
          <div class="h-tabs__nav">
            <div class="h-tabs__nav-wrap">
              <div class="h-tabs__nav-list">
                <div role="tab" data-name="tab1" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-tabs__tab-inner">
                    <div class="h-tabs__tab-text">tab1</div>
                    <!--teleport start-->
                    <!--teleport end-->
                    <!---->
                  </div>
                </div>
                <div role="tab" data-name="tab2" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-tabs__tab-inner">
                    <div class="h-tabs__tab-text">tab2</div>
                    <!--teleport start-->
                    <!--teleport end-->
                    <!---->
                  </div>
                </div>
                <div class="h-tabs__indicator"></div>
              </div>
              <!---->
            </div>
            <div class="h-tabs__extra-outer">
              <div class="h-tabs__default-actions">
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
        </div>"
      `);

      const checkType = async (next: any, t: HTabType) => {
        await next();
        type.value = t;
        await nextTick();
        expect(wrapper.classes()).toContain(`h-tabs--${t}`);
      };
      const compose = types.reduce(
        (next: any, curr: any) => {
          return () => checkType(next, curr);
        },
        () => Promise.resolve(),
      );

      await expect(compose()).resolves.not.toThrow();
    });

    test('tab with icon #render', async () => {
      const wrapper = mount(() => (
        <HTabs arrow={false}>
          <HTab key="tab1" label="tab1" icon="star" />
          <HTab key="tab2" label="tab2" icon="star" />
        </HTabs>
      ));

      const tabs = wrapper.findComponent(HTabs);
      expect(tabs.exists()).toBe(true);
      expect(wrapper.findAllComponents(AIcon)).toHaveLength(2);
    });

    test('closable and addable #render', async () => {
      const items = ref(['tab1', 'tab2']);

      const onAdd = vi.fn(() => {
        items.value.push(`new tab ${items.value.length + 1}`);
      });

      const onClose = vi.fn((key: HTabValue) => {
        items.value = items.value.filter(t => t !== key);
      });

      const wrapper = mount(() => (
        <HTabs editable onAdd={onAdd} arrow={false}>
          {items.value.map(item => (
            <HTab test-id={item} key={item} label={item} closable onClose={onClose} />
          ))}
        </HTabs>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-tabs h-tabs--line h-tabs--small h-tabs--underline" role="tablist" aria-orientation="horizontal" tabindex="0">
          <div class="h-tabs__nav">
            <div class="h-tabs__nav-wrap">
              <div class="h-tabs__nav-list">
                <div role="tab" test-id="tab1" data-name="tab1" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-tabs__tab-inner">
                    <div class="h-tabs__tab-text">tab1</div>
                    <!--teleport start-->
                    <!--teleport end--><span class="h-tabs__icon h-tabs__close" role="button" tabindex="0" aria-label="Close tab1"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;"><path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path></svg></span>
                  </div>
                </div>
                <div role="tab" test-id="tab2" data-name="tab2" class="h-tabs__tab" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-tabs__tab-inner">
                    <div class="h-tabs__tab-text">tab2</div>
                    <!--teleport start-->
                    <!--teleport end--><span class="h-tabs__icon h-tabs__close" role="button" tabindex="0" aria-label="Close tab2"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;"><path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path></svg></span>
                  </div>
                </div>
                <div class="h-tabs__indicator"></div>
              </div>
              <div class="h-tabs__icon-outer h-tabs__icon-outer--add h-tabs__icon-outer--follow" role="button" tabindex="0" aria-label="Add tab"><svg class="a-icon h-icon_add h-icon__add h-tabs__icon" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;">
                  <path d="M12.75 3.5C12.75 2.67157 12.0784 2 11.25 2V11.25H2C2 12.0784 2.67157 12.75 3.5 12.75H11.25V22C12.0784 22 12.75 21.3284 12.75 20.5V12.75H20.5C21.3284 12.75 22 12.0784 22 11.25H12.75V3.5Z" fill="currentColor"></path>
                </svg></div>
            </div>
            <div class="h-tabs__extra-outer">
              <div class="h-tabs__default-actions">
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
        </div>"
      `);

      const tabs = wrapper.findComponent(HTabs);
      expect(tabs.exists()).toBe(true);

      await wrapper.find('[test-id="tab1"] .h-tabs__close').trigger('click');
      expect(items.value).toEqual(['tab2']);
      expect(onClose).toHaveBeenCalled();

      await wrapper.find('.h-tabs__icon-outer--add').trigger('click');
      expect(items.value).toEqual(['tab2', 'new tab 2']);
      expect(onAdd).toHaveBeenCalled();
    });

    test('long tab #render', async () => {
      const IntersectionObserverMock = vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
      }));

      vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

      const current = ref('tab15');
      const tabList = Array(20)
        .fill(0)
        .map((_, i) => i);
      const tabs = mount(() => (
        <div style="width: 300px">
          <HTabs activeKey={current.value}>
            {tabList.map(tab => (
              <HTab key={`tab${tab}`} label={`tab${tab}`} />
            ))}
          </HTabs>
        </div>
      ));

      const tabsRoot = tabs.findComponent(HTabs);
      expect(tabsRoot.exists()).toBeTruthy();
      const childList = tabs.findAllComponents(HTab);
      expect(childList).toHaveLength(tabList.length);
      const rootEl = tabsRoot.get('div[role=tablist]>div>div').element as HTMLDivElement;
      const targetEl = tabsRoot.get('div[data-name=tab15]').element as HTMLDivElement;

      expect(rootEl.scrollLeft).toBe(
        targetEl.offsetLeft - rootEl.clientWidth / 2 + targetEl.clientWidth,
      );
    });
  });

  test('moves and activates tabs with arrow keys', async () => {
    const activeKey = ref<HTabValue>('one');
    const wrapper = mount(() => (
      <HTabs v-model:activeKey={activeKey.value}>
        <HTab key="one" label="One" />
        <HTab key="disabled" label="Disabled" disabled />
        <HTab key="two" label="Two" />
      </HTabs>
    ));
    const first = wrapper.find('[data-name="one"]');
    (first.element as HTMLElement).focus();
    await first.trigger('keydown', { key: 'ArrowRight' });

    expect(activeKey.value).toBe('two');
    expect(wrapper.find('[data-name="two"]').attributes('tabindex')).toBe('0');
    expect(wrapper.find('[data-name="disabled"]').attributes('tabindex')).toBe('-1');
  });

  test('shows the full label tooltip only when the tab text overflows', async () => {
    vi.useFakeTimers();
    const fullLabel = 'A tab with a complete label that does not fit';
    const wrapper = mount(
      () => (
        <HTabs arrow={false}>
          <HTab key="fits" label="Fits" />
          <HTab key="overflows" label={fullLabel} />
        </HTabs>
      ),
      { attachTo: document.body },
    );

    try {
      const tooltips = wrapper.findAllComponents(HTooltip);
      const labels = wrapper.findAll('.h-tabs__tab-text');
      expect(tooltips).toHaveLength(2);
      expect(tooltips[1].props('overflow')).toBe(true);
      expect(tooltips[1].props('content')).toBe(fullLabel);

      for (const [index, label] of labels.entries()) {
        Object.defineProperties(label.element, {
          scrollWidth: { configurable: true, value: index === 0 ? 80 : 180 },
          scrollHeight: { configurable: true, value: 20 },
          getBoundingClientRect: {
            configurable: true,
            value: () => ({ width: 100, height: 20 }),
          },
        });
      }

      await labels[0].trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(200);
      await nextTick();
      expect(document.body.querySelector('.h-tooltip__content')).toBeNull();

      await labels[1].trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(200);
      await nextTick();
      expect(document.body.querySelector('.h-tooltip__content')?.textContent).toBe(fullLabel);
    } finally {
      wrapper.unmount();
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });
});
