import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { HButton } from '../../Button';
import HSpace from '../src/Space';
import type { HSpaceSize } from '../src/composables/useProps';

describe('Space.tsx', () => {
  describe('test props', () => {
    test('test basic #render', async () => {
      const wrapper = mount(() => (
        <HSpace>
          <button>Hello</button>
          <button>Hello</button>
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--horizontal h-space--center h-space--medium">
          <div class="h-space--item"><button>Hello</button></div>
          <div class="h-space--item"><button>Hello</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(HSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.h-space--item')).toHaveLength(2);
    });

    test('test vertical layout #render', async () => {
      const wrapper = mount(() => (
        <HSpace direction="vertical">
          <button>Hello</button>
          <button>Hello</button>
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--vertical h-space--medium">
          <div class="h-space--item"><button>Hello</button></div>
          <div class="h-space--item"><button>Hello</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(HSpace);
      expect(space.exists()).toBe(true);
      expect(space.classes().join(' ')).contains('vertical');
    });

    test('custom size #render', async () => {
      const size = ref<HSpaceSize>(10);
      const wrapper = mount(() => (
        <HSpace size={size.value}>
          <button>Hello</button>
          <button>Hello</button>
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--horizontal h-space--center" style="column-gap: 10px;">
          <div class="h-space--item"><button>Hello</button></div>
          <div class="h-space--item"><button>Hello</button></div>
        </div>"
      `);

      size.value = [100, 200];
      await nextTick();

      console.debug(wrapper.html());
      expect((wrapper.element as HTMLElement).style.gap).toBe('100px 200px');
    });

    test('test separator #render', async () => {
      const wrapper = mount(() => (
        <HSpace separator>
          <button>Hello</button>
          <button>World</button>
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--horizontal h-space--center h-space--medium">
          <div class="h-space--item"><button>Hello</button></div>
          <div class="h-divider h-divider--vertical h-divider--default h-divider--title-center" style="margin: 0px;">
            <div class="h-divider__line-left" style="border-right-style: solid;"></div>
            <!---->
          </div>
          <div class="h-space--item"><button>World</button></div>
        </div>"
      `);

      const space = wrapper.findComponent(HSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.h-divider--vertical')).toHaveLength(1);
    });
  });

  describe('test slots', () => {
    test('test any component #render', async () => {
      const msg = ref('Hello World');
      const show = ref(false);
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <HSpace>
          <div>Hello World</div>
          <HButton onClick={onClick}>{msg.value}</HButton>
          {show.value && <div test-id="show">Any</div>}
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--horizontal h-space--center h-space--medium">
          <div class="h-space--item">
            <div>Hello World</div>
          </div>
          <div class="h-space--item"><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false">
              <!---->
              <div class="h-button__content">Hello World</div>
              <!---->
            </button></div>
        </div>"
      `);

      const space = wrapper.findComponent(HSpace);
      expect(space.exists()).toBe(true);

      msg.value = 'Hello World 2';
      await nextTick();
      expect(space.element.textContent).contains(msg.value);

      await wrapper.findComponent(HButton).trigger('click');
      expect(onClick).toBeCalledTimes(1);

      show.value = true;
      await nextTick();
      expect(wrapper.find('[test-id="show"]').exists()).toBe(true);
    });

    test('test custom separator #render', async () => {
      const wrapper = mount(() => (
        <HSpace v-slots={{ separator: () => <span class="custom-separator">|</span> }}>
          <button>Hello</button>
          <button>World</button>
        </HSpace>
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="h-space h-space--horizontal h-space--center h-space--medium">
          <div class="h-space--item"><button>Hello</button></div><span class="custom-separator">|</span>
          <div class="h-space--item"><button>World</button></div>
        </div>"
      `);
      const space = wrapper.findComponent(HSpace);
      expect(space.exists()).toBe(true);
      expect(space.findAll('.custom-separator')).toHaveLength(1);
      expect(space.find('.custom-separator').text()).toBe('|');
    });
  });
});
