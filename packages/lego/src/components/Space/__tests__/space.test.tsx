import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { NButton } from '../../Button';
import NSpace from '../src/Space';
import type { NSpaceSize } from '../src/composables/useProps';

describe('Space.tsx', () => {
  describe('test props', () => {
    test('test basic #render', async () => {
      const wrapper = mount(() => (
        <NSpace>
          <button>Hello</button>
          <button>Hello</button>
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--horizontal n-space--center n-space--medium\\">
          <div class=\\"n-space--item\\"><button>Hello</button></div>
          <div class=\\"n-space--item\\"><button>Hello</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(NSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.n-space--item')).toHaveLength(2);
    });

    test('test vertical layout #render', async () => {
      const wrapper = mount(() => (
        <NSpace direction="vertical">
          <button>Hello</button>
          <button>Hello</button>
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--vertical n-space--medium\\">
          <div class=\\"n-space--item\\"><button>Hello</button></div>
          <div class=\\"n-space--item\\"><button>Hello</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(NSpace);
      expect(space.exists()).toBe(true);
      expect(space.classes().join(' ')).contains('vertical');
    });

    test('custom size #render', async () => {
      const size = ref<NSpaceSize>(10);
      const wrapper = mount(() => (
        <NSpace size={size.value}>
          <button>Hello</button>
          <button>Hello</button>
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--horizontal n-space--center\\" style=\\"column-gap: 10px;\\">
          <div class=\\"n-space--item\\"><button>Hello</button></div>
          <div class=\\"n-space--item\\"><button>Hello</button></div>
        </div>"
      `);

      size.value = [100, 200];
      await nextTick();

      console.debug(wrapper.html());
      expect((wrapper.element as HTMLElement).style.gap).toBe('100px 200px');
    });

    test('test separator #render', async () => {
      const wrapper = mount(() => (
        <NSpace separator>
          <button>Hello</button>
          <button>World</button>
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--horizontal n-space--center n-space--medium\\">
          <div class=\\"n-space--item\\"><button>Hello</button></div>
          <div class=\\"n-divider n-divider--vertical n-divider--default n-divider--title-center\\" style=\\"margin: 0px;\\">
            <div class=\\"n-divider__line-left\\" style=\\"border-right-style: solid;\\"></div>
            <!---->
          </div>
          <div class=\\"n-space--item\\"><button>World</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(NSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.n-divider--vertical')).toHaveLength(1);
    });
  });

  describe('test slots', () => {
    test('test any component #render', async () => {
      const msg = ref('Hello World');
      const show = ref(false);
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <NSpace>
          <div>Hello World</div>
          <NButton onClick={onClick}>{msg.value}</NButton>
          {show.value && <div test-id="show">Any</div>}
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--horizontal n-space--center n-space--medium\\">
          <div class=\\"n-space--item\\">
            <div>Hello World</div>
          </div>
          <div class=\\"n-space--item\\"><button class=\\"n-button n-button--primary n-button--medium is-solid\\" type=\\"button\\" tabindex=\\"0\\" autofocus=\\"false\\">
              <!---->
              <div class=\\"n-button__content\\">Hello World</div>
              <!---->
            </button></div>
        </div>"
      `);

      const space = wrapper.findComponent(NSpace);
      expect(space.exists()).toBe(true);

      msg.value = 'Hello World 2';
      await nextTick();
      expect(space.element.textContent).contains(msg.value);

      await wrapper.findComponent(NButton).trigger('click');
      expect(onClick).toBeCalledTimes(1);

      show.value = true;
      await nextTick();
      expect(wrapper.find('[test-id="show"]').exists()).toBe(true);
    });

    test('test custom separator #render', async () => {
      const wrapper = mount(() => (
        <NSpace v-slots={{ separator: () => <span class="custom-separator">|</span> }}>
          <button>Hello</button>
          <button>World</button>
        </NSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"n-space n-space--horizontal n-space--center n-space--medium\\">
          <div class=\\"n-space--item\\"><button>Hello</button></div><span class=\\"custom-separator\\">|</span>
          <div class=\\"n-space--item\\"><button>World</button></div>
        </div>"
      `);
      const space = wrapper.findComponent(NSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.custom-separator')).toHaveLength(1);
      expect(space.find('.custom-separator').text()).toBe('|');
    });
  });
});
