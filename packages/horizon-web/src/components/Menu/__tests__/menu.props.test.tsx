import { describe, expect, test, vi } from 'vitest';
import MenuHelper from './MenuHelper';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import HMenu from '../src/Menu';
import HSubMenu from '../src/SubMenu';
import HMenuItem from '../src/MenuItem';
import HDropdownSubmenu from '../../Dropdown/src/DropdownSubmenu';
import type { MenuItemProps, SubMenuProps } from '../src/composables/useProps';

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
});
