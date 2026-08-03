import { AIcon } from '@aurora/icon';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, reactive, ref } from 'vue';
import { HForm, HFormItem, type HFormInstance } from '../../Form';
import HSegmented from '../src/Segmented';
import HSegmentedItem from '../src/SegmentedItem';
import type { HSegmentedValue } from '../src/composables/useProps';

describe('Segmented.tsx', () => {
  test('test basic #render', () => {
    const wrapper = mount(() => <HSegmented />);
    const element = wrapper.findComponent(HSegmented);

    expect(element.html()).toMatchInlineSnapshot('""');

    expect(element.exists()).toBe(true);
  });

  test('test normal render #render', () => {
    const defaultActiveKey = ref('1');

    const wrapper = mount(() => (
      <HSegmented defaultActiveKey={defaultActiveKey.value}>
        <HSegmentedItem key="1">1</HSegmentedItem>
        <HSegmentedItem key="2">2</HSegmentedItem>
      </HSegmented>
    ));
    const element = wrapper.findComponent(HSegmented);
    expect(element.html()).toMatchInlineSnapshot(`
      "<div role="tablist" class="h-segmented h-segmented--medium" aria-orientation="horizontal">
        <div class="h-segmented__nav">
          <div class="h-segmented__nav-wrap">
            <div class="h-segmented__nav-list">
              <div class="h-segmented__item h-segmented__item--active" role="tab" data-focus-visible-inset="" tabindex="0" aria-selected="true" aria-disabled="false">
                <div class="h-segmented__item-inner">1</div>
              </div>
              <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                <div class="h-segmented__item-inner">2</div>
              </div>
              <div class="h-segmented__indicator"></div>
            </div>
          </div>
          <div class="h-segmented__extra-outer">
            <!---->
          </div>
        </div>
      </div>"
    `);

    expect(element.exists()).toBe(true);
  });

  test.fails('test long items #render', async () => {
    const max = 100;
    const wrapper = mount(() => (
      <div style={{ width: '400px' }}>
        <HSegmented arrow>
          {Array(max)
            .fill(0)
            .map((_, index) => (
              <HSegmentedItem key={index} label={`Label ${index}`} />
            ))}
        </HSegmented>
      </div>
    ));

    const sgm = wrapper.findComponent(HSegmented);
    const items = wrapper.findAllComponents(HSegmentedItem);
    expect(items).toHaveLength(max);
    const leftBtn = sgm.find('[test-id="left-btn"]');
    const rightBtn = sgm.find('[test-id="right-btn"]');
    expect(leftBtn.exists()).toBe(true);
    expect(rightBtn.exists()).toBe(true);
    expect(leftBtn.classes().join(' ')).toContain('disabled');

    await rightBtn.trigger('click');
    expect(leftBtn.classes().join(' ')).not.toContain('disabled');
  });

  test('test block mode #render', () => {
    const bw = 100;
    const wrapper = mount(() => (
      <div style={{ width: `${bw}px`, display: 'block' }}>
        <HSegmented block>
          <HSegmentedItem key="1">1</HSegmentedItem>
          <HSegmentedItem key="2">2</HSegmentedItem>
        </HSegmented>
      </div>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div style="width: 100px; display: block;">
        <div role="tablist" class="h-segmented h-segmented--medium h-segmented--block" aria-orientation="horizontal" tabindex="0">
          <div class="h-segmented__nav">
            <div class="h-segmented__nav-wrap">
              <div class="h-segmented__nav-list">
                <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-segmented__item-inner">1</div>
                </div>
                <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                  <div class="h-segmented__item-inner">2</div>
                </div>
                <div class="h-segmented__indicator"></div>
              </div>
            </div>
            <div class="h-segmented__extra-outer">
              <!---->
            </div>
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    expect(sgm.classes().join(' ')).toContain('block');
  });

  test('test disabled #render', () => {
    const fn = vi.fn();
    const wrapper = mount(() => (
      <HSegmented defaultActiveKey="2" onChange={fn}>
        <HSegmentedItem key="1" disabled>
          1
        </HSegmentedItem>
        <HSegmentedItem key="2">2</HSegmentedItem>
      </HSegmented>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role="tablist" class="h-segmented h-segmented--medium" aria-orientation="horizontal">
        <div class="h-segmented__nav">
          <div class="h-segmented__nav-wrap">
            <div class="h-segmented__nav-list">
              <div class="h-segmented__item h-segmented__item--disabled" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="true">
                <div class="h-segmented__item-inner">1</div>
              </div>
              <div class="h-segmented__item h-segmented__item--active" role="tab" data-focus-visible-inset="" tabindex="0" aria-selected="true" aria-disabled="false">
                <div class="h-segmented__item-inner">2</div>
              </div>
              <div class="h-segmented__indicator"></div>
            </div>
          </div>
          <div class="h-segmented__extra-outer">
            <!---->
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    const disabled = wrapper.find('.h-segmented__item--disabled');
    expect(disabled.exists()).toBe(true);
    disabled.trigger('click');
    expect(fn).not.toBeCalled();
  });

  test('test controller mode #render', async () => {
    const activeKey = ref<HSegmentedValue>('1');
    const fn = vi.fn((v: HSegmentedValue) => {
      activeKey.value = v;
    });
    const wrapper = mount(() => (
      <HSegmented activeKey={activeKey.value} onChange={fn}>
        <HSegmentedItem key="1">1</HSegmentedItem>
        <HSegmentedItem key="2">2</HSegmentedItem>
      </HSegmented>
    ));

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.vm.activeKey).toBe('1');
    activeKey.value = '2';
    await nextTick();
    expect(sgm.vm.activeKey).toBe('2');
    expect(fn).not.toBeCalled();

    await sgm.find('[aria-selected=false]').trigger('click');
    expect(fn).toBeCalledTimes(1);
    expect(activeKey.value).toBe('1');
  });

  test('test size #render', async () => {
    const size = ref();
    const wrapper = mount(() => (
      <HSegmented size={size.value}>
        <HSegmentedItem key="1">1</HSegmentedItem>
        <HSegmentedItem key="2">2</HSegmentedItem>
      </HSegmented>
    ));

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    expect(sgm.classes().join(' ')).contains('medium');

    const sizes = ['mini', 'small', 'medium', 'large'];

    for (const s of sizes) {
      size.value = s;
      await nextTick();
      expect(sgm.classes().join(' ')).toContain(s);
    }
  });

  test('test dynamic load #render', async () => {
    const activeKey = ref<HSegmentedValue>('1');
    const fn = vi.fn((v: HSegmentedValue) => {
      activeKey.value = v;
    });
    const items = ref<HSegmentedValue[]>(['1', '2']);
    const wrapper = mount(() => (
      <HSegmented activeKey={activeKey.value} onChange={fn}>
        {items.value.map(item => (
          <HSegmentedItem key={item} label={`Label ${item}`} />
        ))}
      </HSegmented>
    ));

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);

    items.value.push('3');
    await nextTick();
    const components = wrapper.findAllComponents(HSegmentedItem);
    expect(components).toHaveLength(items.value.length);
  });

  test('test custom item #render', () => {
    const activeKey = ref<HSegmentedValue>('1');
    const fn = vi.fn((v: HSegmentedValue) => {
      activeKey.value = v;
    });
    const wrapper = mount(() => (
      <HSegmented activeKey={activeKey.value} onChange={fn}>
        <HSegmentedItem key="1" label="1" />
        <HSegmentedItem key="2">
          <div test-id="custom">2</div>
        </HSegmentedItem>
      </HSegmented>
    ));

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    const custom = wrapper.find('[test-id="custom"]');
    expect(custom.exists()).toBe(true);
  });

  test('test custom icon #render', async () => {
    const wrapper = mount(() => (
      <HSegmented>
        <HSegmentedItem key="1" label="1" icon="layout" />
        <HSegmentedItem key="2" label="2" icon="list" />
      </HSegmented>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role="tablist" class="h-segmented h-segmented--medium" aria-orientation="horizontal" tabindex="0">
        <div class="h-segmented__nav">
          <div class="h-segmented__nav-wrap">
            <div class="h-segmented__nav-list">
              <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                <div class="h-segmented__item-inner"><svg class="a-icon h-icon_layout h-icon__layout h-segmented__icon" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;">
                    <path d="M2.79951 2.00195C2.35768 2.00195 1.99951 2.36013 1.99951 2.80195V8.20195C1.99951 8.64378 2.35768 9.00195 2.79951 9.00195H21.1995C21.6413 9.00195 21.9995 8.64378 21.9995 8.20195V2.80195C21.9995 2.36013 21.6413 2.00195 21.1995 2.00195H2.79951ZM20.4995 3.50195V7.50195H3.49951V3.50195H20.4995Z" fill="currentColor"></path>
                    <path d="M2.79951 11.002C2.35768 11.002 1.99951 11.3601 1.99951 11.802V21.202C1.99951 21.6438 2.35768 22.002 2.79951 22.002H11.1995C11.6413 22.002 11.9995 21.6438 11.9995 21.202V11.802C11.9995 11.3601 11.6413 11.002 11.1995 11.002H2.79951ZM10.4995 12.502V20.502H3.49951V12.502H10.4995Z" fill="currentColor"></path>
                    <path d="M21.9995 11.752H13.9995C13.9995 12.5804 14.6711 13.252 15.4995 13.252H20.4995C21.3279 13.252 21.9995 12.5804 21.9995 11.752Z" fill="currentColor"></path>
                    <path d="M13.9995 15.752H21.9995C21.9995 16.5804 21.3279 17.252 20.4995 17.252H15.4995C14.6711 17.252 13.9995 16.5804 13.9995 15.752Z" fill="currentColor"></path>
                    <path d="M21.9995 19.752H13.9995C13.9995 20.5804 14.6711 21.252 15.4995 21.252H20.4995C21.3279 21.252 21.9995 20.5804 21.9995 19.752Z" fill="currentColor"></path>
                  </svg>
                  <div class="h-segmented__item-text" title="1">1</div>
                </div>
              </div>
              <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                <div class="h-segmented__item-inner"><svg class="a-icon h-icon_list h-icon__list h-segmented__icon" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;">
                    <path d="M8.5 4.36743H21C21 5.19586 20.3284 5.86743 19.5 5.86743H10C9.17157 5.86743 8.5 5.19586 8.5 4.36743Z" fill="currentColor"></path>
                    <path d="M8.1065 3.34771L5.6065 6.34771C5.32416 6.68651 4.81185 6.70975 4.5 6.3979L3 4.8979C3.54604 4.35186 4.37175 4.14832 4.97993 4.75651L5.99389 3.53976C6.52423 2.90335 7.47008 2.81736 8.1065 3.34771Z" fill="currentColor"></path>
                    <path d="M8.5 10.8674H21C21 11.6959 20.3284 12.3674 19.5 12.3674H10C9.17157 12.3674 8.5 11.6959 8.5 10.8674Z" fill="currentColor"></path>
                    <path d="M8.5 17.8674H21C21 18.6959 20.3284 19.3674 19.5 19.3674H10C9.17157 19.3674 8.5 18.6959 8.5 17.8674Z" fill="currentColor"></path>
                    <path d="M5 11.8674C4.72386 11.8674 4.5 11.6436 4.5 11.3674C4.5 11.0913 4.72386 10.8674 5 10.8674C5.27614 10.8674 5.5 11.0913 5.5 11.3674C5.5 11.6436 5.27614 11.8674 5 11.8674ZM5 13.3674C6.10457 13.3674 7 12.472 7 11.3674C7 10.2629 6.10457 9.36743 5 9.36743C3.89543 9.36743 3 10.2629 3 11.3674C3 12.472 3.89543 13.3674 5 13.3674Z" fill="currentColor"></path>
                    <path d="M5 18.8674C4.72386 18.8674 4.5 18.6436 4.5 18.3674C4.5 18.0913 4.72386 17.8674 5 17.8674C5.27614 17.8674 5.5 18.0913 5.5 18.3674C5.5 18.6436 5.27614 18.8674 5 18.8674ZM5 20.3674C6.10457 20.3674 7 19.472 7 18.3674C7 17.2629 6.10457 16.3674 5 16.3674C3.89543 16.3674 3 17.2629 3 18.3674C3 19.472 3.89543 20.3674 5 20.3674Z" fill="currentColor"></path>
                  </svg>
                  <div class="h-segmented__item-text" title="2">2</div>
                </div>
              </div>
              <div class="h-segmented__indicator"></div>
            </div>
          </div>
          <div class="h-segmented__extra-outer">
            <!---->
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    const icons = wrapper.findAllComponents(AIcon);
    expect(icons).toHaveLength(2);
  });

  test('test usable with form #render', async () => {
    const formValue = reactive({ category: undefined as any });
    const fn = vi.fn((v: HSegmentedValue) => {
      formValue.category = v;
    });
    const formInst = ref<HFormInstance>();
    const onValidate = vi.fn();

    const wrapper = mount(() => (
      <div>
        <HForm model={formValue} validateTrigger="change" ref={formInst} onValidate={onValidate}>
          <HFormItem prop="category" required>
            <HSegmented form activeKey={formValue.category} onChange={fn}>
              <HSegmentedItem key="1" label="1" />
              <HSegmentedItem key="2" label="2" />
            </HSegmented>
          </HFormItem>
        </HForm>
      </div>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>
        <form class="h-form h-form--medium is-position-top is-justify-left is-vertical-top is-spacing-default">
          <div class="h-form-item">
            <!---->
            <div class="h-form-item__wrap">
              <div class="h-form-item__content">
                <div role="tablist" class="h-segmented h-segmented--medium" aria-orientation="horizontal" tabindex="0">
                  <div class="h-segmented__nav">
                    <div class="h-segmented__nav-wrap">
                      <div class="h-segmented__nav-list">
                        <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                          <div class="h-segmented__item-inner">
                            <div class="h-segmented__item-text" title="1">1</div>
                          </div>
                        </div>
                        <div class="h-segmented__item" role="tab" data-focus-visible-inset="" tabindex="-1" aria-selected="false" aria-disabled="false">
                          <div class="h-segmented__item-inner">
                            <div class="h-segmented__item-text" title="2">2</div>
                          </div>
                        </div>
                        <div class="h-segmented__indicator"></div>
                      </div>
                    </div>
                    <div class="h-segmented__extra-outer">
                      <!---->
                    </div>
                  </div>
                </div>
                <!---->
              </div>
              <div class="h-form-item__ext">
                <!---->
                <!---->
              </div>
            </div>
          </div>
        </form>
      </div>"
    `);

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);

    expect(formInst.value).toBeTruthy();
    await expect(formInst.value?.validate()).rejects.toThrowError();
    const activate = wrapper.find('[title=2]');
    await activate.trigger('click');
    await nextTick();
    expect(onValidate).toBeCalledTimes(2);
    await expect(formInst.value?.validate()).resolves.toBeUndefined();
    expect(formValue.category).toBe('2');
  });

  test('supports arrow-key selection and skips disabled items', async () => {
    const activeKey = ref<HSegmentedValue>('one');
    const wrapper = mount(() => (
      <HSegmented v-model:activeKey={activeKey.value}>
        <HSegmentedItem key="one">One</HSegmentedItem>
        <HSegmentedItem key="disabled" disabled>
          Disabled
        </HSegmentedItem>
        <HSegmentedItem key="two">Two</HSegmentedItem>
      </HSegmented>
    ));
    const items = wrapper.findAll('[role="tab"]');
    (items[0].element as HTMLElement).focus();
    await items[0].trigger('keydown', { key: 'ArrowRight' });

    expect(activeKey.value).toBe('two');
    expect(items[1].attributes('aria-disabled')).toBe('true');
    expect(items[1].attributes('tabindex')).toBe('-1');
  });
});
