import { describe, expect, test, vi } from 'vitest';
import MenuHelper from './MenuHelper';
import { nextTick, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import HMenu from '../src/Menu';
import HSubMenu from '../src/SubMenu';
import HMenuItem from '../src/MenuItem';
import HDropdownSubmenu from '../../Dropdown/src/DropdownSubmenu';
import type { MenuItemProps, SubMenuProps } from '../src/composables/useProps';
import type { MenuExposes } from '../src/composables/useExposes';
import type { HorizonWebComponentInstance } from '@aurora/utils';

describe('Menu.tsx props', () => {
  test('is-default-expand-all', async () => {
    const instance = new MenuHelper({
      isDefaultExpandAll: true,
    });

    await nextTick();

    expect(instance.domRef.value?.expandMenus.length).toBe(11);
  });

  test('uses the clicked nested submenu in before-select', async () => {
    const beforeSelect = vi.fn((_value: string, _props: MenuItemProps | SubMenuProps) => true);
    const wrapper = mount(
      () => (
        <HMenu collapse={true} useDropdownLevel={0} beforeSelect={beforeSelect}>
          <HSubMenu name="Outer" value="outer">
            <HSubMenu name="Nested" value="nested" selectable={true}>
              <HMenuItem name="Leaf" value="leaf" />
            </HSubMenu>
          </HSubMenu>
        </HMenu>
      ),
      {
        attachTo: document.body,
      },
    );

    await nextTick();
    await wrapper.find('.h-menu__title--inner').trigger('mouseenter');
    await nextTick();

    const dropdownSubmenu = wrapper.findComponent(HDropdownSubmenu);
    expect(dropdownSubmenu.exists()).toBe(true);

    dropdownSubmenu.vm.$emit('click', new MouseEvent('click'));
    await nextTick();

    expect(beforeSelect).toHaveBeenCalledTimes(1);
    expect(beforeSelect.mock.calls[0][0]).toBe('nested');
    expect(beforeSelect.mock.calls[0][1].value).toBe('nested');
  });

  test('disabled menu items are removed from the tab order and cannot be selected', async () => {
    const beforeSelect = vi.fn(() => true);
    const onSelected = vi.fn();
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu beforeSelect={beforeSelect} onSelected={onSelected}>
        <HMenuItem disabled name="Disabled" value="disabled" onClick={onClick} />
      </HMenu>
    ));

    await nextTick();
    const item = wrapper.find('[role="menuitem"]');

    expect(item.attributes('aria-disabled')).toBe('true');
    expect(item.attributes('tabindex')).toBe('-1');

    await item.trigger('click');
    await item.trigger('keyup', { key: 'Enter' });
    await flushPromises();

    expect(beforeSelect).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test('Enter and Space select an enabled item with its complete path', async () => {
    const onSelected = vi.fn();
    const wrapper = mount(() => (
      <HMenu onSelected={onSelected}>
        <HSubMenu name="Parent" value="parent">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));

    await nextTick();
    await nextTick();

    const child = wrapper.findAll('[role="menuitem"]')[1];
    expect(child.attributes('aria-disabled')).toBe('false');
    expect(child.attributes('tabindex')).toBe('0');

    await child.trigger('keyup', { key: 'Enter' });
    await flushPromises();
    await nextTick();

    expect(onSelected).toHaveBeenCalledTimes(1);
    expect(onSelected.mock.calls[0][0]).toBe('child');
    expect(
      onSelected.mock.calls[0][1].map((item: MenuItemProps | SubMenuProps) => item.value),
    ).toEqual(['parent', 'child']);

    await child.trigger('keyup', { key: ' ' });
    await flushPromises();
    expect(onSelected).toHaveBeenCalledTimes(2);
  });

  test.each([
    ['resolves false', () => Promise.resolve(false)],
    ['rejects', () => Promise.reject(new Error('not allowed'))],
  ])('before-select %s without changing the active item', async (_label, guard) => {
    const onSelected = vi.fn();
    const wrapper = mount(() => (
      <HMenu selectedValue="first" beforeSelect={guard} onSelected={onSelected}>
        <HMenuItem name="First" value="first" />
        <HMenuItem name="Second" value="second" />
      </HMenu>
    ));

    await nextTick();
    await nextTick();

    const items = wrapper.findAll('[role="menuitem"]');
    await items[1].trigger('click');
    await flushPromises();
    await nextTick();

    expect(onSelected).not.toHaveBeenCalled();
    expect(items[0].element.parentElement?.classList.contains('is-active')).toBe(true);
    expect(items[1].element.parentElement?.classList.contains('is-active')).toBe(false);
  });

  test('reacts to controlled selected-value changes', async () => {
    const selectedValue = ref('first');
    const wrapper = mount(() => (
      <HMenu selectedValue={selectedValue.value}>
        <HMenuItem name="First" value="first" />
        <HMenuItem name="Second" value="second" />
      </HMenu>
    ));

    await nextTick();
    await nextTick();
    const items = wrapper.findAll('[role="menuitem"]');
    expect(items[0].element.parentElement?.classList.contains('is-active')).toBe(true);

    selectedValue.value = 'second';
    await nextTick();
    await nextTick();

    expect(items[0].element.parentElement?.classList.contains('is-active')).toBe(false);
    expect(items[1].element.parentElement?.classList.contains('is-active')).toBe(true);
  });

  test('exclusive-expand keeps only the latest submenu open', async () => {
    const menuRef = ref<HorizonWebComponentInstance<typeof HMenu, MenuExposes> | null>(null);
    const wrapper = mount(() => (
      <HMenu ref={menuRef} exclusiveExpand>
        <HSubMenu name="First" value="first">
          <HMenuItem name="First child" value="first-child" />
        </HSubMenu>
        <HSubMenu name="Second" value="second">
          <HMenuItem name="Second child" value="second-child" />
        </HSubMenu>
      </HMenu>
    ));

    await nextTick();
    await nextTick();
    const submenus = wrapper.findAll('[aria-haspopup="menu"]');

    await submenus[0].trigger('click');
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual(['first']);

    await submenus[1].trigger('click');
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual(['second']);
    expect(submenus[0].attributes('aria-expanded')).toBe('false');
    expect(submenus[1].attributes('aria-expanded')).toBe('true');
  });
});
