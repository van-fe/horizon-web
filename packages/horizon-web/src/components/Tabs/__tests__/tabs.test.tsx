import { AIconSVG } from '@aurora/icon';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import NTab from '../src/Tab';
import NTabs from '../src/Tabs';
import type { NTabType, NTabValue } from '../src/composables/useProps';

describe('Tabs.tsx', () => {
  test('render', async () => {
    const activeKey = ref('');
    const wrapper = mount(() => (
      <NTabs activeKey={activeKey.value}>
        <NTab key="1" label="Tab1" />
        <NTab key="2" label="Tab1" />
      </NTabs>
    ));
    const element = wrapper.findComponent(NTabs);
    const tabList = wrapper.findAllComponents(NTab);

    expect(element.exists()).toBe(true);
    expect(tabList).toHaveLength(2);
    expect(wrapper.html()).toMatchInlineSnapshot(
      `
      "<div class="n-tabs n-tabs--line n-tabs--medium n-tabs--underline" role="tablist" tabindex="0">
        <div class="n-tabs__nav">
          <div class="n-tabs__nav-wrap">
            <div class="n-tabs__nav-list n-tabs__nav-list--space">
              <div role="tab" data-name="1" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                <div class="n-tabs__tab-inner">
                  <div class="n-tabs__tab-text">Tab1</div>
                  <!---->
                </div>
              </div>
              <div role="tab" data-name="2" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                <div class="n-tabs__tab-inner">
                  <div class="n-tabs__tab-text">Tab1</div>
                  <!---->
                </div>
              </div>
              <div class="n-tabs__indicator"></div>
            </div>
            <!---->
          </div>
          <div class="n-tabs__extra-outer n-tabs__extra-outer--blur">
            <div class="n-tabs__default-actions">
              <!---->
              <div class="n-tabs__arrow">
                <div class="n-tabs__icon-outer n-tabs__icon-outer--disabled"><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-tabs__icon" style="transform: rotate(undefineddeg);">
                    <use href="#n-icon_arrow_left"></use>
                  </svg></div>
                <div class="n-tabs__icon-outer"><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-tabs__icon" style="transform: rotate(undefineddeg);">
                    <use href="#n-icon_arrow_right"></use>
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
      const type = ref<NTabType>('line');
      const wrapper = mount(() => (
        <NTabs type={type.value} arrow={false}>
          <NTab key="tab1" label="tab1" />
          <NTab key="tab2" label="tab2" />
        </NTabs>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="n-tabs n-tabs--line n-tabs--medium n-tabs--underline" role="tablist" tabindex="0">
          <div class="n-tabs__nav">
            <div class="n-tabs__nav-wrap">
              <div class="n-tabs__nav-list">
                <div role="tab" data-name="tab1" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                  <div class="n-tabs__tab-inner">
                    <div class="n-tabs__tab-text">tab1</div>
                    <!---->
                  </div>
                </div>
                <div role="tab" data-name="tab2" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                  <div class="n-tabs__tab-inner">
                    <div class="n-tabs__tab-text">tab2</div>
                    <!---->
                  </div>
                </div>
                <div class="n-tabs__indicator"></div>
              </div>
              <!---->
            </div>
            <div class="n-tabs__extra-outer">
              <div class="n-tabs__default-actions">
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
        </div>"
      `);

      const checkType = async (next: any, t: NTabType) => {
        await next();
        type.value = t;
        await nextTick();
        expect(wrapper.classes()).toContain(`n-tabs--${t}`);
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
        <NTabs arrow={false}>
          <NTab key="tab1" label="tab1" icon="star" />
          <NTab key="tab2" label="tab2" icon="star" />
        </NTabs>
      ));

      const tabs = wrapper.findComponent(NTabs);
      expect(tabs.exists()).toBe(true);
      expect(wrapper.findAllComponents(AIconSVG)).toHaveLength(2);
    });

    test('closable and addable #render', async () => {
      const items = ref(['tab1', 'tab2']);

      const onAdd = vi.fn(() => {
        items.value.push(`new tab ${items.value.length + 1}`);
      });

      const onClose = vi.fn((key: NTabValue) => {
        items.value = items.value.filter(t => t !== key);
      });

      const wrapper = mount(() => (
        <NTabs editable onAdd={onAdd} arrow={false}>
          {items.value.map(item => (
            <NTab test-id={item} key={item} label={item} closable onClose={onClose} />
          ))}
        </NTabs>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="n-tabs n-tabs--line n-tabs--medium n-tabs--underline" role="tablist" tabindex="0">
          <div class="n-tabs__nav">
            <div class="n-tabs__nav-wrap">
              <div class="n-tabs__nav-list">
                <div role="tab" test-id="tab1" data-name="tab1" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                  <div class="n-tabs__tab-inner">
                    <div class="n-tabs__tab-text">tab1</div><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-tabs__icon n-tabs__close" style="transform: rotate(undefineddeg);">
                      <use href="#n-icon_close"></use>
                    </svg>
                  </div>
                </div>
                <div role="tab" test-id="tab2" data-name="tab2" class="n-tabs__tab" tabindex="0" aria-selected="false" aria-disabled="false">
                  <div class="n-tabs__tab-inner">
                    <div class="n-tabs__tab-text">tab2</div><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-tabs__icon n-tabs__close" style="transform: rotate(undefineddeg);">
                      <use href="#n-icon_close"></use>
                    </svg>
                  </div>
                </div>
                <div class="n-tabs__indicator"></div>
              </div>
              <div class="n-tabs__icon-outer n-tabs__icon-outer--add n-tabs__icon-outer--follow"><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-tabs__icon" style="transform: rotate(undefineddeg);">
                  <use href="#n-icon_add"></use>
                </svg></div>
            </div>
            <div class="n-tabs__extra-outer">
              <div class="n-tabs__default-actions">
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
        </div>"
      `);

      const tabs = wrapper.findComponent(NTabs);
      expect(tabs.exists()).toBe(true);

      await wrapper.find('[test-id="tab1"] .n-tabs__close').trigger('click');
      expect(items.value).toEqual(['tab2']);
      expect(onClose).toHaveBeenCalled();

      await wrapper.find('.n-tabs__icon-outer--add').trigger('click');
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
          <NTabs activeKey={current.value}>
            {tabList.map(tab => (
              <NTab key={tab} name={`tab${tab}`} label={`tab${tab}`} />
            ))}
          </NTabs>
        </div>
      ));

      const tabsRoot = tabs.findComponent(NTabs);
      expect(tabsRoot.exists()).toBeTruthy();
      const childList = tabs.findAllComponents(NTab);
      expect(childList).toHaveLength(tabList.length);
      const rootEl = tabsRoot.get('div[role=tablist]>div>div').element as HTMLDivElement;
      const targetEl = tabsRoot.get('div[data-name=tab15]').element as HTMLDivElement;

      expect(rootEl.scrollLeft).toBe(
        targetEl.offsetLeft - rootEl.clientWidth / 2 + targetEl.clientWidth,
      );
    });
  });
});
