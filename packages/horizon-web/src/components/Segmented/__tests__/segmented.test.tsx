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
      "<div role="tablist" class="n-segmented n-segmented--medium" tabindex="0">
        <div class="n-segmented__nav">
          <div class="n-segmented__nav-wrap">
            <div class="n-segmented__nav-list">
              <div class="n-segmented__item n-segmented__item--active" role="tab" tabindex="-1" aria-selected="true">
                <div class="n-segmented__item-inner">1</div>
              </div>
              <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                <div class="n-segmented__item-inner">2</div>
              </div>
              <div class="n-segmented__indicator"></div>
            </div>
          </div>
          <div class="n-segmented__extra-outer">
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
        <div role="tablist" class="n-segmented n-segmented--medium n-segmented--block" tabindex="0">
          <div class="n-segmented__nav">
            <div class="n-segmented__nav-wrap">
              <div class="n-segmented__nav-list">
                <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                  <div class="n-segmented__item-inner">1</div>
                </div>
                <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                  <div class="n-segmented__item-inner">2</div>
                </div>
                <div class="n-segmented__indicator"></div>
              </div>
            </div>
            <div class="n-segmented__extra-outer">
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
      "<div role="tablist" class="n-segmented n-segmented--medium" tabindex="0">
        <div class="n-segmented__nav">
          <div class="n-segmented__nav-wrap">
            <div class="n-segmented__nav-list">
              <div class="n-segmented__item n-segmented__item--disabled" role="tab" tabindex="0" aria-selected="false">
                <div class="n-segmented__item-inner">1</div>
              </div>
              <div class="n-segmented__item n-segmented__item--active" role="tab" tabindex="-1" aria-selected="true">
                <div class="n-segmented__item-inner">2</div>
              </div>
              <div class="n-segmented__indicator"></div>
            </div>
          </div>
          <div class="n-segmented__extra-outer">
            <!---->
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(HSegmented);
    expect(sgm.exists()).toBe(true);
    const disabled = wrapper.find('.n-segmented__item--disabled');
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
      "<div role="tablist" class="n-segmented n-segmented--medium" tabindex="0">
        <div class="n-segmented__nav">
          <div class="n-segmented__nav-wrap">
            <div class="n-segmented__nav-list">
              <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                <div class="n-segmented__item-inner"><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-segmented__icon" style="transform: rotate(undefineddeg);">
                    <use href="#n-icon_layout"></use>
                  </svg>
                  <div class="n-segmented__item-text" title="1">1</div>
                </div>
              </div>
              <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                <div class="n-segmented__item-inner"><svg class="a-icon n-icon__v2_11_24 n-icon__svg n-segmented__icon" style="transform: rotate(undefineddeg);">
                    <use href="#n-icon_list"></use>
                  </svg>
                  <div class="n-segmented__item-text" title="2">2</div>
                </div>
              </div>
              <div class="n-segmented__indicator"></div>
            </div>
          </div>
          <div class="n-segmented__extra-outer">
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
        <form class="n-form n-form--medium is-position-top is-justify-left is-vertical-top is-spacing-default">
          <div class="n-form-item">
            <!---->
            <div class="n-form-item__wrap">
              <div class="n-form-item__content">
                <div role="tablist" class="n-segmented n-segmented--medium" tabindex="0">
                  <div class="n-segmented__nav">
                    <div class="n-segmented__nav-wrap">
                      <div class="n-segmented__nav-list">
                        <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                          <div class="n-segmented__item-inner">
                            <div class="n-segmented__item-text" title="1">1</div>
                          </div>
                        </div>
                        <div class="n-segmented__item" role="tab" tabindex="0" aria-selected="false">
                          <div class="n-segmented__item-inner">
                            <div class="n-segmented__item-text" title="2">2</div>
                          </div>
                        </div>
                        <div class="n-segmented__indicator"></div>
                      </div>
                    </div>
                    <div class="n-segmented__extra-outer">
                      <!---->
                    </div>
                  </div>
                </div>
                <!---->
              </div>
              <div class="n-form-item__ext">
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
});
