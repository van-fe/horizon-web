import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref } from 'vue';
import { HButton } from '../../Button';
import HSpace from '../src/Space';
import type { HSpaceSize } from '../src/composables/useProps';
import SpaceItem from '../src/SpaceItem';

describe('Space.tsx', () => {
  describe('test props', () => {
    test('block/align/fragment produce the public layout contract', () => {
      const wrapper = mount(() => (
        <HSpace block align="end" fragment>
          <Fragment>
            <span>A</span>
            <span>B</span>
          </Fragment>
        </HSpace>
      ));
      expect(wrapper.get('.h-space').classes()).toEqual(
        expect.arrayContaining(['h-space--block', 'h-space--end']),
      );
      expect(wrapper.findAll('.h-space--item')).toHaveLength(2);
      expect(wrapper.findAll('.h-space--item').map(item => item.text())).toEqual(['A', 'B']);
    });

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

    test('normalizes invalid direction and maps custom spacing on both axes', () => {
      const horizontal = mount(HSpace, {
        props: { direction: 'diagonal' as never, size: '12px', wrap: true },
        attrs: { style: { color: 'red' } },
        slots: { default: () => <span>A</span> },
      });
      const horizontalStyle = horizontal.element as HTMLElement;
      expect(horizontal.classes()).toEqual(
        expect.arrayContaining(['h-space--horizontal', 'h-space--center', 'h-space--wrap']),
      );
      expect(horizontalStyle.style.columnGap).toBe('12px');
      expect(horizontalStyle.style.gap).toBe('12px');
      expect(horizontalStyle.style.color).toBe('red');

      const vertical = mount(HSpace, {
        props: { direction: 'vertical', size: 8, wrap: true },
        slots: { default: () => <SpaceItem>Existing item</SpaceItem> },
      });
      expect(vertical.classes()).toContain('h-space--vertical');
      expect(vertical.classes()).not.toContain('h-space--wrap');
      expect(vertical.classes()).not.toContain('h-space--center');
      expect((vertical.element as HTMLElement).style.rowGap).toBe('8px');
      expect(vertical.findAll('.h-space--item')).toHaveLength(1);
    });

    test('does not render a separator without neighboring content', () => {
      const wrapper = mount(HSpace, { props: { separator: true } });
      expect(wrapper.find('.h-divider').exists()).toBe(false);
      expect(wrapper.findAll('.h-space--item')).toHaveLength(0);
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
          <div class="h-space--item"><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0">
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
