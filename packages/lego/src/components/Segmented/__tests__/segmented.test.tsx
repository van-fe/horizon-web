import { NIconSVG } from '@nio-fe/icon';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, reactive, ref } from 'vue';
import { NForm, NFormItem, type NFormInstance } from '../../Form';
import NSegmented from '../src/Segmented';
import NSegmentedItem from '../src/SegmentedItem';
import type { NSegmentedValue } from '../src/composables/useProps';

describe('Segmented.tsx', () => {
  test('test basic #render', () => {
    const wrapper = mount(() => <NSegmented />);
    const element = wrapper.findComponent(NSegmented);

    expect(element.html()).toMatchInlineSnapshot('""');

    expect(element.exists()).toBe(true);
  });

  test('test normal render #render', () => {
    const defaultActiveKey = ref('1');

    const wrapper = mount(() => (
      <NSegmented defaultActiveKey={defaultActiveKey.value}>
        <NSegmentedItem key="1">1</NSegmentedItem>
        <NSegmentedItem key="2">2</NSegmentedItem>
      </NSegmented>
    ));
    const element = wrapper.findComponent(NSegmented);
    expect(element.html()).toMatchInlineSnapshot(`
      "<div role=\\"tablist\\" class=\\"n-segmented n-segmented--medium\\" tabindex=\\"0\\">
        <div class=\\"n-segmented__nav\\">
          <div class=\\"n-segmented__nav-wrap\\">
            <div class=\\"n-segmented__nav-list\\">
              <div class=\\"n-segmented__item n-segmented__item--active\\" role=\\"tab\\" tabindex=\\"-1\\" aria-selected=\\"true\\">
                <div class=\\"n-segmented__item-inner\\">1</div>
              </div>
              <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                <div class=\\"n-segmented__item-inner\\">2</div>
              </div>
              <div class=\\"n-segmented__indicator\\"></div>
            </div>
          </div>
          <div class=\\"n-segmented__extra-outer\\">
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
        <NSegmented arrow>
          {Array(max)
            .fill(0)
            .map((_, index) => (
              <NSegmentedItem key={index} label={`Label ${index}`} />
            ))}
        </NSegmented>
      </div>
    ));

    const sgm = wrapper.findComponent(NSegmented);
    const items = wrapper.findAllComponents(NSegmentedItem);
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
        <NSegmented block>
          <NSegmentedItem key="1">1</NSegmentedItem>
          <NSegmentedItem key="2">2</NSegmentedItem>
        </NSegmented>
      </div>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div style=\\"width: 100px; display: block;\\">
        <div role=\\"tablist\\" class=\\"n-segmented n-segmented--medium n-segmented--block\\" tabindex=\\"0\\">
          <div class=\\"n-segmented__nav\\">
            <div class=\\"n-segmented__nav-wrap\\">
              <div class=\\"n-segmented__nav-list\\">
                <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                  <div class=\\"n-segmented__item-inner\\">1</div>
                </div>
                <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                  <div class=\\"n-segmented__item-inner\\">2</div>
                </div>
                <div class=\\"n-segmented__indicator\\"></div>
              </div>
            </div>
            <div class=\\"n-segmented__extra-outer\\">
              <!---->
            </div>
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(NSegmented);
    expect(sgm.exists()).toBe(true);
    expect(sgm.classes().join(' ')).toContain('block');
  });

  test('test disabled #render', () => {
    const fn = vi.fn();
    const wrapper = mount(() => (
      <NSegmented defaultActiveKey="2" onChange={fn}>
        <NSegmentedItem key="1" disabled>
          1
        </NSegmentedItem>
        <NSegmentedItem key="2">2</NSegmentedItem>
      </NSegmented>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role=\\"tablist\\" class=\\"n-segmented n-segmented--medium\\" tabindex=\\"0\\">
        <div class=\\"n-segmented__nav\\">
          <div class=\\"n-segmented__nav-wrap\\">
            <div class=\\"n-segmented__nav-list\\">
              <div class=\\"n-segmented__item n-segmented__item--disabled\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                <div class=\\"n-segmented__item-inner\\">1</div>
              </div>
              <div class=\\"n-segmented__item n-segmented__item--active\\" role=\\"tab\\" tabindex=\\"-1\\" aria-selected=\\"true\\">
                <div class=\\"n-segmented__item-inner\\">2</div>
              </div>
              <div class=\\"n-segmented__indicator\\"></div>
            </div>
          </div>
          <div class=\\"n-segmented__extra-outer\\">
            <!---->
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(NSegmented);
    expect(sgm.exists()).toBe(true);
    const disabled = wrapper.find('.n-segmented__item--disabled');
    expect(disabled.exists()).toBe(true);
    disabled.trigger('click');
    expect(fn).not.toBeCalled();
  });

  test('test controller mode #render', async () => {
    const activeKey = ref<NSegmentedValue>('1');
    const fn = vi.fn((v: NSegmentedValue) => {
      activeKey.value = v;
    });
    const wrapper = mount(() => (
      <NSegmented activeKey={activeKey.value} onChange={fn}>
        <NSegmentedItem key="1">1</NSegmentedItem>
        <NSegmentedItem key="2">2</NSegmentedItem>
      </NSegmented>
    ));

    const sgm = wrapper.findComponent(NSegmented);
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
      <NSegmented size={size.value}>
        <NSegmentedItem key="1">1</NSegmentedItem>
        <NSegmentedItem key="2">2</NSegmentedItem>
      </NSegmented>
    ));

    const sgm = wrapper.findComponent(NSegmented);
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
    const activeKey = ref<NSegmentedValue>('1');
    const fn = vi.fn((v: NSegmentedValue) => {
      activeKey.value = v;
    });
    const items = ref<NSegmentedValue[]>(['1', '2']);
    const wrapper = mount(() => (
      <NSegmented activeKey={activeKey.value} onChange={fn}>
        {items.value.map(item => (
          <NSegmentedItem key={item} label={`Label ${item}`} />
        ))}
      </NSegmented>
    ));

    const sgm = wrapper.findComponent(NSegmented);
    expect(sgm.exists()).toBe(true);

    items.value.push('3');
    await nextTick();
    const components = wrapper.findAllComponents(NSegmentedItem);
    expect(components).toHaveLength(items.value.length);
  });

  test('test custom item #render', () => {
    const activeKey = ref<NSegmentedValue>('1');
    const fn = vi.fn((v: NSegmentedValue) => {
      activeKey.value = v;
    });
    const wrapper = mount(() => (
      <NSegmented activeKey={activeKey.value} onChange={fn}>
        <NSegmentedItem key="1" label="1" />
        <NSegmentedItem key="2">
          <div test-id="custom">2</div>
        </NSegmentedItem>
      </NSegmented>
    ));

    const sgm = wrapper.findComponent(NSegmented);
    expect(sgm.exists()).toBe(true);
    const custom = wrapper.find('[test-id="custom"]');
    expect(custom.exists()).toBe(true);
  });

  test('test custom icon #render', async () => {
    const wrapper = mount(() => (
      <NSegmented>
        <NSegmentedItem key="1" label="1" icon="layout" />
        <NSegmentedItem key="2" label="2" icon="list" />
      </NSegmented>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role=\\"tablist\\" class=\\"n-segmented n-segmented--medium\\" tabindex=\\"0\\">
        <div class=\\"n-segmented__nav\\">
          <div class=\\"n-segmented__nav-wrap\\">
            <div class=\\"n-segmented__nav-list\\">
              <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                <div class=\\"n-segmented__item-inner\\"><svg class=\\"n-icon n-icon__v2_11_2 n-icon__svg n-segmented__icon\\" style=\\"transform: rotate(undefineddeg);\\">
                    <use href=\\"#n-icon_layout\\"></use>
                  </svg>
                  <div class=\\"n-segmented__item-text\\" title=\\"1\\">1</div>
                </div>
              </div>
              <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                <div class=\\"n-segmented__item-inner\\"><svg class=\\"n-icon n-icon__v2_11_2 n-icon__svg n-segmented__icon\\" style=\\"transform: rotate(undefineddeg);\\">
                    <use href=\\"#n-icon_list\\"></use>
                  </svg>
                  <div class=\\"n-segmented__item-text\\" title=\\"2\\">2</div>
                </div>
              </div>
              <div class=\\"n-segmented__indicator\\"></div>
            </div>
          </div>
          <div class=\\"n-segmented__extra-outer\\">
            <!---->
          </div>
        </div>
      </div>"
    `);

    const sgm = wrapper.findComponent(NSegmented);
    expect(sgm.exists()).toBe(true);
    const icons = wrapper.findAllComponents(NIconSVG);
    expect(icons).toHaveLength(2);
  });

  test('test usable with form #render', async () => {
    const formValue = reactive({ category: undefined as any });
    const fn = vi.fn((v: NSegmentedValue) => {
      formValue.category = v;
    });
    const formInst = ref<NFormInstance>();
    const onValidate = vi.fn();

    const wrapper = mount(() => (
      <div>
        <NForm model={formValue} validateTrigger="change" ref={formInst} onValidate={onValidate}>
          <NFormItem prop="category" required>
            <NSegmented form activeKey={formValue.category} onChange={fn}>
              <NSegmentedItem key="1" label="1" />
              <NSegmentedItem key="2" label="2" />
            </NSegmented>
          </NFormItem>
        </NForm>
      </div>
    ));

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>
        <form class=\\"n-form n-form--medium is-position-top is-justify-left is-vertical-top is-spacing-default\\">
          <div class=\\"n-form-item\\">
            <!---->
            <div class=\\"n-form-item__wrap\\">
              <div class=\\"n-form-item__content\\">
                <div role=\\"tablist\\" class=\\"n-segmented n-segmented--medium\\" tabindex=\\"0\\">
                  <div class=\\"n-segmented__nav\\">
                    <div class=\\"n-segmented__nav-wrap\\">
                      <div class=\\"n-segmented__nav-list\\">
                        <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                          <div class=\\"n-segmented__item-inner\\">
                            <div class=\\"n-segmented__item-text\\" title=\\"1\\">1</div>
                          </div>
                        </div>
                        <div class=\\"n-segmented__item\\" role=\\"tab\\" tabindex=\\"0\\" aria-selected=\\"false\\">
                          <div class=\\"n-segmented__item-inner\\">
                            <div class=\\"n-segmented__item-text\\" title=\\"2\\">2</div>
                          </div>
                        </div>
                        <div class=\\"n-segmented__indicator\\"></div>
                      </div>
                    </div>
                    <div class=\\"n-segmented__extra-outer\\">
                      <!---->
                    </div>
                  </div>
                </div>
                <!---->
              </div>
              <div class=\\"n-form-item__ext\\">
                <!---->
                <!---->
              </div>
            </div>
          </div>
        </form>
      </div>"
    `);

    const sgm = wrapper.findComponent(NSegmented);
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
