import { flushPromises, mount } from '@vue/test-utils';
import { computed, nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HMenu from '../src/Menu';
import HMenuItem from '../src/MenuItem';
import HSubMenu from '../src/SubMenu';
import CollapseButton from '../src/components/CollapseButton';
import FullViewMenu from '../src/components/FullViewMenu';
import {
  useMenuEmits,
  useMenuItemEmits,
  useSubMenuEmits,
} from '../src/composables/useEmits';
import { useMenuProps } from '../src/composables/useProps';
import {
  HMenuActivatedMenusInjectKey,
  HMenuAddExpandMenuInjectKey,
  HMenuActiveTopMenuUuidInjectKey,
  HMenuAppendChildInjectKey,
  HMenuEmitInjectKey,
  HMenuExpandedMenuInjectKey,
  HMenuIsCollapsedInjectKey,
  HMenuPropsInjectKey,
  HMenuRemoveChildInjectKey,
  HMenuRemoveExpandMenuInjectKey,
  HMenuSetActivatedMenuInjectKey,
  HMenuSwitchFullViewMenuVisibleInjectKey,
} from '../src/util/injectKeys';
import { getMapTreePath, getMapTreePathByValue } from '../src/util/treeHelper';
import { createMemoryHistory, createRouter } from 'vue-router';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { MenuExposes } from '../src/composables/useExposes';

describe('Menu public API contracts', () => {
  test('horizontal ellipsis controls overflow clipping observably', async () => {
    const wrapper = mount(HMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', ellipsis: true, maxWidth: 120 },
      slots: {
        default: () => [
          <HMenuItem value="one">One</HMenuItem>,
          <HMenuItem value="two">Two</HMenuItem>,
        ],
      },
    });
    const container = wrapper.get('.h-menu__container');

    expect(wrapper.classes()).toContain('is-ellipsis');
    expect(getComputedStyle(container.element).overflowX).toBe('hidden');
    await wrapper.setProps({ ellipsis: false });
    expect(wrapper.classes()).not.toContain('is-ellipsis');
    expect(container.attributes('style')).toContain('overflow: visible');
    expect(getComputedStyle(container.element).overflowX).toBe('visible');
    wrapper.unmount();
  });

  test('renders public layout, theme, active style, native tag and all slots', async () => {
    const prepend = vi.fn((collapsed: { value: boolean }) => (
      <div data-test="menu-prepend">{String(collapsed.value)}</div>
    ));
    const append = vi.fn((collapsed: { value: boolean }) => (
      <div data-test="menu-append">{String(collapsed.value)}</div>
    ));
    const wrapper = mount(() => (
      <HMenu
        mode="horizontal"
        theme="midnight"
        activeType="button"
        height={64}
        maxWidth="48rem"
        tag="a"
      >
        {{
          prepend,
          append,
          default: () => (
            <HMenuItem name="Fallback name" value="docs">
              {{
                default: () => <span data-test="menu-default">Before </span>,
                icon: () => <span data-test="menu-icon">I</span>,
                title: () => <span data-test="menu-title">Documentation</span>,
              }}
            </HMenuItem>
          ),
        }}
      </HMenu>
    ));
    await nextTick();

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'h-menu--midnight',
        'is-horizontal',
        'is-active-type-button',
      ]),
    );
    expect(wrapper.attributes('style')).toContain('height: 64px');
    expect(wrapper.get('.h-menu__container').attributes('style')).toContain('max-width: 48rem');
    expect(wrapper.get('[data-test="menu-prepend"]').text()).toBe('false');
    expect(wrapper.get('[data-test="menu-append"]').text()).toBe('false');
    expect(wrapper.get('[data-test="menu-default"]').text()).toBe('Before');
    expect(wrapper.get('[data-test="menu-icon"]').text()).toBe('I');
    expect(wrapper.get('[data-test="menu-title"]').text()).toBe('Documentation');
    expect(wrapper.find('a.h-menu__item').exists()).toBe(true);
  });

  test('collapse control emits controlled updates and collapseTransition reaches transitions', async () => {
    const onCollapse = vi.fn();
    const wrapper = mount(() => (
      <HMenu collapseButton collapseTransition={false} onUpdate:collapse={onCollapse}>
        <HSubMenu name="Parent" value="parent">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();

    expect(
      wrapper.findAllComponents({ name: 'HTransition' }).every(item => item.props('css') === false),
    ).toBe(true);
    await wrapper.get('.h-menu__collapse-button').trigger('click');
    expect(onCollapse).toHaveBeenCalledWith(true);
    expect(wrapper.classes()).toContain('is-collapsed');
  });

  test('submenu forwards popup props, renders slots and emits open/close/click payloads', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const onSelected = vi.fn();
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu onOpen={onOpen} onClose={onClose} onSelected={onSelected}>
        <HSubMenu
          name="Fallback"
          value="parent"
          selectable
          toBody
          popperOffset={14}
          onClick={onClick}
        >
          {{
            icon: () => <span data-test="submenu-icon">S</span>,
            title: () => <span data-test="submenu-title">Parent title</span>,
            default: () => <HMenuItem name="Child" value="child" />,
          }}
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    const title = wrapper.get('[aria-haspopup="menu"]');

    expect(wrapper.get('[data-test="submenu-icon"]').text()).toBe('S');
    expect(wrapper.get('[data-test="submenu-title"]').text()).toBe('Parent title');
    const dropdown = wrapper.findComponent({ name: 'HDropdown' });
    expect(dropdown.props()).toMatchObject({ toBody: true, distance: 14 });

    await title.trigger('click');
    await flushPromises();
    expect(onOpen.mock.calls[0][0]).toBe('parent');
    expect(onOpen.mock.calls[0][1].map((item: { value?: string }) => item.value)).toEqual([
      'parent',
    ]);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ value: 'parent' }));
    expect(onSelected).toHaveBeenCalledWith(
      'parent',
      expect.any(Array),
      expect.objectContaining({ value: 'parent' }),
    );

    await title.trigger('click');
    expect(onClose.mock.calls[0][0]).toBe('parent');
  });

  test('router mode navigates only after a successful user selection', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/settings', component: { render: () => null } }],
    });
    const push = vi.spyOn(router, 'push');
    const wrapper = mount(() => (
      <HMenu router>
        <HMenuItem name="Settings" value="/settings" />
      </HMenu>
    ), {
      global: { plugins: [router] },
    });
    await nextTick();
    await nextTick();

    await wrapper.get('[role="menuitem"]').trigger('click');
    await flushPromises();
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/settings');
  });

  test('CollapseButton reacts to model updates and emits one toggle per click', async () => {
    const wrapper = mount(CollapseButton, { props: { modelValue: false } });
    expect(wrapper.classes()).not.toContain('is-collapsed');

    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true]);
    expect(wrapper.classes()).toContain('is-collapsed');

    await wrapper.setProps({ modelValue: true });
    await nextTick();
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(wrapper.classes()).not.toContain('is-collapsed');
  });

  test('FullViewMenu renders tree slots and drives pointer/keyboard selection paths', async () => {
    const emitItem = vi.fn();
    const emitSubmenu = vi.fn();
    const parentEmit = vi.fn();
    const addExpand = vi.fn();
    const setActive = vi.fn();
    const item = {
      uuid: 'item',
      type: 'menuItem',
      level: 2,
      props: { name: 'Leaf fallback', value: 'leaf', disabled: false, icon: undefined },
      slots: { title: () => <span data-test="full-leaf">Leaf slot</span> },
      emits: emitItem,
      children: null,
      scrollTo: vi.fn(),
    } as any;
    const group = {
      uuid: 'group',
      type: 'subMenu',
      level: 1,
      props: { name: 'Group', value: 'group', selectable: true, disabled: false },
      slots: { title: () => <span data-test="full-group">Group slot</span> },
      emits: emitSubmenu,
      children: new Map([['item', item]]),
      scrollTo: vi.fn(),
    } as any;
    const directEmit = vi.fn();
    const direct = {
      uuid: 'direct',
      type: 'menuItem',
      level: 1,
      props: { name: 'Direct fallback', value: 'direct', disabled: false },
      slots: { default: () => <span data-test="full-direct">Direct slot</span> },
      emits: directEmit,
      children: null,
      scrollTo: vi.fn(),
    } as any;
    const disabled = {
      uuid: 'disabled',
      type: 'subMenu',
      level: 1,
      props: { name: 'Disabled group', value: 'disabled', selectable: true, disabled: true },
      slots: {},
      emits: vi.fn(),
      children: new Map(),
      scrollTo: vi.fn(),
    } as any;
    const top = {
      uuid: 'top',
      type: 'subMenu',
      level: 0,
      props: { name: 'Top', value: 'top', disabled: false },
      slots: {},
      emits: vi.fn(),
      children: new Map([
        ['group', group],
        ['direct', direct],
        ['disabled', disabled],
      ]),
      scrollTo: vi.fn(),
    } as any;
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const wrapper = mount(FullViewMenu, {
      props: {
        menuTree: new Map([['top', top]]),
        activeTopMenuUuid: 'top',
        onMouseEnter,
        onMouseLeave,
      },
      global: {
        provide: {
          [HMenuPropsInjectKey as symbol]: { theme: 'gray', maxWidth: 800 },
          [HMenuEmitInjectKey as symbol]: parentEmit,
          [HMenuActivatedMenusInjectKey as symbol]: computed(() => [item, group, top]),
          [HMenuAddExpandMenuInjectKey as symbol]: addExpand,
          [HMenuSetActivatedMenuInjectKey as symbol]: setActive,
        },
      },
    });

    expect(wrapper.classes()).toContain('h-menu--full-view--gray');
    expect(wrapper.get('.h-menu--full-view__container').attributes('style')).toContain('800px');
    expect(wrapper.get('[data-test="full-group"]').text()).toBe('Group slot');
    expect(wrapper.get('[data-test="full-leaf"]').text()).toBe('Leaf slot');
    expect(wrapper.get('[data-test="full-direct"]').text()).toBe('Direct slot');
    await wrapper.trigger('mouseenter');
    await wrapper.trigger('mouseleave');
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    await wrapper.get('.h-menu--full-view__group--title-content').trigger('keyup', { key: 'Enter' });
    expect(emitSubmenu).toHaveBeenCalledWith('click', group.props);
    await wrapper.get('.h-menu--full-view__group--item').trigger('click');
    await nextTick();
    expect(emitItem).toHaveBeenCalledWith('click', item.props);
    expect(addExpand).toHaveBeenCalledWith('item');
    expect(setActive).toHaveBeenCalledWith('item');
    expect(parentEmit).toHaveBeenCalledWith(
      'selected',
      'leaf',
      expect.any(Array),
      item.props,
    );

    await wrapper.get('[data-test="full-direct"]').trigger('click');
    await nextTick();
    expect(directEmit).toHaveBeenCalledWith('click', direct.props);
    expect(setActive).toHaveBeenCalledWith('direct');

    const selectionCount = parentEmit.mock.calls.length;
    await wrapper
      .findAll('.h-menu--full-view__group--title')
      .find(title => title.text() === 'Disabled group')!
      .trigger('click');
    expect(parentEmit).toHaveBeenCalledTimes(selectionCount);

    await wrapper.setProps({ activeTopMenuUuid: 'missing' });
    expect(wrapper.findAll('.h-menu--full-view__group')).toHaveLength(0);
  });

  test('FullViewMenu covers direct groups, nested submenu fallbacks and optional injections', async () => {
    const directEmit = vi.fn();
    const groupEmit = vi.fn();
    const childEmit = vi.fn();
    const direct = {
      uuid: 'direct',
      type: 'menuItem',
      level: 0,
      props: { value: undefined, disabled: false, name: 'Direct name' },
      slots: { title: () => <span data-test="direct-title">Direct title</span> },
      emits: directEmit,
      children: null,
    } as any;
    const child = {
      uuid: 'child-submenu',
      type: 'subMenu',
      level: 1,
      props: { value: undefined, disabled: false, name: 'Child submenu', icon: 'search' },
      slots: {},
      emits: childEmit,
      children: null,
    } as any;
    const group = {
      uuid: 'plain-group',
      type: 'subMenu',
      level: 0,
      props: { value: undefined, disabled: false, selectable: false, name: 'Plain group' },
      slots: {},
      emits: groupEmit,
      children: new Map([['child-submenu', child]]),
    } as any;
    const top = {
      uuid: 'top',
      type: 'subMenu',
      level: 0,
      props: { name: 'Top' },
      slots: {},
      emits: vi.fn(),
      children: new Map([
        ['direct', direct],
        ['plain-group', group],
      ]),
    } as any;
    const wrapper = mount(FullViewMenu, {
      props: { menuTree: new Map([['top', top]]), activeTopMenuUuid: 'top' },
    });

    expect(wrapper.get('[data-test="direct-title"]').text()).toBe('Direct title');
    expect(wrapper.text()).toContain('Plain group');
    expect(wrapper.text()).toContain('Child submenu');
    expect(wrapper.find('.h-menu--full-view__group--item-icon').exists()).toBe(true);

    const titles = wrapper.findAll('.h-menu--full-view__group--title-content');
    await titles[0].trigger('click');
    await titles[0].trigger('keyup', { key: 'Enter' });
    await titles[1].trigger('click');
    expect(directEmit).toHaveBeenCalledWith('click', direct.props);
    expect(groupEmit).not.toHaveBeenCalled();

    const nested = wrapper.get('.h-menu--full-view__group--item');
    const nestedContent = wrapper.get('.h-menu--full-view__group--item-content');
    Object.defineProperties(nestedContent.element, {
      scrollWidth: { configurable: true, value: 180 },
      clientWidth: { configurable: true, value: 20 },
    });
    await nestedContent.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    await nested.trigger('keyup', { key: 'Enter' });
    expect(childEmit).toHaveBeenCalledWith('click', child.props);

    await wrapper.setProps({
      menuTree: new Map([
        [
          'empty-top',
          { ...top, uuid: 'empty-top', children: null },
        ],
      ]),
      activeTopMenuUuid: 'empty-top',
    });
    expect(wrapper.findAll('.h-menu--full-view__group')).toHaveLength(0);
  });

  test('FullViewMenu emitted fallbacks, disabled items and lazy tooltip slots are observable', async () => {
    const parentEmit = vi.fn();
    const directEmit = vi.fn();
    const groupEmit = vi.fn();
    const leafEmit = vi.fn();
    const nestedEmit = vi.fn();
    const disabledEmit = vi.fn();
    const leaf = {
      uuid: 'leaf',
      type: 'menuItem',
      level: 1,
      props: { value: undefined, disabled: false, name: 'Leaf fallback' },
      slots: {},
      emits: leafEmit,
      children: null,
    } as any;
    const nested = {
      uuid: 'nested',
      type: 'subMenu',
      level: 1,
      props: { value: undefined, disabled: false, name: 'Nested fallback' },
      slots: {},
      emits: nestedEmit,
      children: null,
    } as any;
    const group = {
      uuid: 'group',
      type: 'subMenu',
      level: 0,
      props: { value: undefined, disabled: false, selectable: true, name: 'Group fallback' },
      slots: {},
      emits: groupEmit,
      children: new Map([
        ['leaf', leaf],
        ['nested', nested],
      ]),
    } as any;
    const direct = {
      uuid: 'direct-fallback',
      type: 'menuItem',
      level: 0,
      props: { value: undefined, disabled: false, name: 'Direct fallback' },
      slots: {},
      emits: directEmit,
      children: null,
    } as any;
    const disabled = {
      uuid: 'disabled-direct',
      type: 'menuItem',
      level: 0,
      props: { value: 'disabled', disabled: true, name: 'Disabled direct' },
      slots: {},
      emits: disabledEmit,
      children: null,
    } as any;
    const top = {
      uuid: 'top-fallback',
      type: 'subMenu',
      level: 0,
      props: { name: 'Top' },
      slots: {},
      emits: vi.fn(),
      children: new Map([
        ['direct', direct],
        ['group', group],
        ['disabled', disabled],
      ]),
    } as any;
    const wrapper = mount(FullViewMenu, {
      props: {
        menuTree: new Map([['top-fallback', top]]),
        activeTopMenuUuid: 'top-fallback',
      },
      global: {
        provide: {
          [HMenuEmitInjectKey as symbol]: parentEmit,
        },
      },
    });

    const titles = wrapper.findAll('.h-menu--full-view__group--title');
    for (const title of titles) await title.trigger('click');
    await flushPromises();
    expect(directEmit).toHaveBeenCalledWith('click', direct.props);
    expect(groupEmit).toHaveBeenCalledWith('click', group.props);
    expect(disabledEmit).not.toHaveBeenCalled();
    expect(parentEmit).toHaveBeenCalledWith('selected', '', [], direct.props);
    expect(parentEmit).toHaveBeenCalledWith('selected', '', [], group.props);

    const items = wrapper.findAll('.h-menu--full-view__group--item');
    const contents = wrapper.findAll('.h-menu--full-view__group--item-content');
    contents.forEach(content => {
      Object.defineProperties(content.element, {
        scrollWidth: { configurable: true, value: 180 },
        clientWidth: { configurable: true, value: 20 },
      });
    });
    for (const content of contents) await content.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    for (const item of items) await item.trigger('click');
    await flushPromises();
    expect(leafEmit).toHaveBeenCalledWith('click', leaf.props);
    expect(nestedEmit).toHaveBeenCalledWith('click', nested.props);
    wrapper.unmount();
  });

  test('tree helpers return complete paths by uuid and value', () => {
    const leaf = { uuid: 'leaf', props: { value: 'leaf-value' }, children: null } as any;
    const root = {
      uuid: 'root',
      props: { value: 'root-value' },
      children: new Map([['leaf', leaf]]),
    } as any;
    const tree = new Map([['root', root]]);

    expect(getMapTreePath(tree, 'leaf').map(item => item.uuid)).toEqual(['leaf', 'root']);
    expect(getMapTreePathByValue(tree, 'leaf-value').map(item => item.uuid)).toEqual([
      'leaf',
      'root',
    ]);
  });

  test('exposes expand, collapse and active scrolling operations as a controlled public API', async () => {
    const menuRef = ref<HorizonWebComponentInstance<typeof HMenu, MenuExposes> | null>(null);
    const wrapper = mount(() => (
      <HMenu ref={menuRef} selectedValue="two-child">
        <HSubMenu name="One" value="one">
          <HMenuItem name="One child" value="one-child" />
        </HSubMenu>
        <HSubMenu name="Two" value="two">
          <HMenuItem name="Two child" value="two-child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();

    menuRef.value?.collapseAll();
    menuRef.value?.expandAll();
    await nextTick();
    expect(menuRef.value?.expandMenus.sort()).toEqual(['one', 'two']);

    menuRef.value?.collapse(['one']);
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual(['two']);

    menuRef.value?.expand(['one'], false);
    await nextTick();
    expect(menuRef.value?.expandMenus.sort()).toEqual(['one', 'two']);

    menuRef.value?.expand(['two']);
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual(['two']);

    menuRef.value?.collapseAll();
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual([]);
    expect(() => menuRef.value?.scrollToActive()).not.toThrow();
    wrapper.unmount();
  });

  test('controlled collapse preserves expanded paths and emits both transition directions', async () => {
    const collapse = ref(false);
    const onCollapse = vi.fn();
    const menuRef = ref<HorizonWebComponentInstance<typeof HMenu, MenuExposes> | null>(null);
    const wrapper = mount(() => (
      <HMenu
        ref={menuRef}
        collapse={collapse.value}
        width={200}
        height="80vh"
        resizable
        resizeToCollapse={false}
        onUpdate:collapse={onCollapse}
      >
        <HSubMenu name="Parent" value="parent">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    menuRef.value?.expand(['parent']);
    await nextTick();
    expect(menuRef.value?.expandMenus).toEqual(['parent']);
    expect(wrapper.attributes('style')).toContain('width: 200px');
    expect(wrapper.attributes('style')).toContain('height: 80vh');
    expect(wrapper.classes()).toContain('has-resizer');
    wrapper.findComponent({ name: 'HScrollbar' }).vm.$emit('scroll', {
      scrollLeft: 0,
      scrollTop: 48,
    }, new Event('scroll'));

    collapse.value = true;
    await nextTick();
    expect(wrapper.classes()).toContain('is-collapsed');
    expect(onCollapse).toHaveBeenCalledWith(true);
    expect(menuRef.value?.expandMenus).toEqual([]);
    menuRef.value?.expandAll();
    expect(menuRef.value?.expandMenus).toEqual([]);

    collapse.value = false;
    await nextTick();
    expect(onCollapse).toHaveBeenCalledWith(false);
    expect(menuRef.value?.expandMenus).toEqual(['parent']);
  });

  test('collapseForever owns the title presentation and suppresses append/collapse controls', () => {
    const wrapper = mount(() => (
      <HMenu collapseForever collapseButton collapseShowTitle>
        {{
          default: () => <HMenuItem name="Compact item" value="compact" />,
          append: () => <span data-test="forbidden-append">Append</span>,
        }}
      </HMenu>
    ));

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'is-collapsed',
        'is-collapsed-forever',
        'is-collapsed-show-title',
      ]),
    );
    expect(wrapper.find('[data-test="forbidden-append"]').exists()).toBe(false);
    expect(wrapper.find('.h-menu__collapse-button').exists()).toBe(false);
  });

  test('collapseShowTitle works independently and selected/collapse/router fallbacks stay observable', async () => {
    const wrapper = mount(HMenu, {
      props: {
        collapse: true,
        collapseShowTitle: true,
        selectedValue: 'known',
        router: true,
      },
      slots: {
        default: () => <HMenuItem name="Known" value="known" />,
      },
    });
    await nextTick();
    await nextTick();
    expect(wrapper.classes()).toContain('is-collapsed-show-title');

    await wrapper.setProps({ selectedValue: 'missing' });
    await nextTick();
    await wrapper.setProps({ selectedValue: '' });
    await nextTick();

    await wrapper.setProps({ collapse: false });
    await new Promise(resolve => window.setTimeout(resolve, 510));
    expect(wrapper.classes()).not.toContain('is-collapsed');

    await wrapper.get('[role="menuitem"]').trigger('click');
    await flushPromises();
    wrapper.unmount();

    const horizontal = mount(HMenu, { props: { mode: 'horizontal' } });
    expect(horizontal.attributes('style')).toContain('--h-menu-size-horizontal-height');
    horizontal.unmount();

    const empty = mount(HMenu, { props: { collapse: false } });
    await empty.setProps({ collapse: true });
    await nextTick();
    await empty.setProps({ collapse: false });
    await new Promise(resolve => window.setTimeout(resolve, 510));
    expect(empty.classes()).not.toContain('is-collapsed');
    empty.unmount();
  });

  test('undefined submenu value emits empty open and close payload fallbacks', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <HMenu onOpen={onOpen} onClose={onClose}>
        <HSubMenu name="No value">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    const title = wrapper.get('[aria-haspopup="menu"]');
    await title.trigger('click');
    await title.trigger('click');
    expect(onOpen).toHaveBeenCalledWith('', expect.any(Array));
    expect(onClose).toHaveBeenCalledWith('', expect.any(Array));
  });

  test('full horizontal submenu opens its composed FullViewMenu on pointer and keyboard paths', async () => {
    const onSelected = vi.fn();
    const wrapper = mount(() => (
      <HMenu mode="horizontal" submenuExpandType="full" maxWidth={900} onSelected={onSelected}>
        <HSubMenu name="Products" value="products">
          <HSubMenu name="Platform" value="platform" selectable>
            <HMenuItem name="Console" value="console" />
          </HSubMenu>
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    const title = wrapper.get('[aria-haspopup="menu"]');

    await title.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.get('.h-menu--full-view').attributes('style')).not.toContain('display: none');
    expect(wrapper.get('.h-menu--full-view').text()).toContain('Platform');
    expect(wrapper.get('.h-menu--full-view').text()).toContain('Console');

    await wrapper.get('.h-menu--full-view__group--item').trigger('keyup', { key: 'Enter' });
    await flushPromises();
    expect(onSelected.mock.calls[0][0]).toBe('console');

    await title.trigger('keyup', { key: 'Enter' });
    await new Promise(resolve => window.setTimeout(resolve, 210));
    await title.trigger('keyup', { key: 'Enter' });
    await wrapper.get('.h-menu__container').trigger('mouseleave');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    expect(wrapper.get('.h-menu--full-view').attributes('style')).toContain('display: none');
  });

  test('menu item and submenu tooltip branches react to real overflow and collapsed state', async () => {
    const wrapper = mount(() => (
      <HMenu collapse>
        <HSubMenu name="Overflow submenu" value="submenu">
          <HMenuItem name="Overflow item" value="item" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    const texts = wrapper.findAll('.h-menu__title--text');
    texts.forEach(text => {
      Object.defineProperties(text.element, {
        scrollWidth: { configurable: true, value: 200 },
        clientWidth: { configurable: true, value: 20 },
      });
    });

    const titles = wrapper.findAll('[role="menuitem"]');
    await titles[0].trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    const tooltip = wrapper.findComponent(HSubMenu).findComponent({ name: 'HTooltip' });
    expect(tooltip.props('visible')).toBe(true);
    await titles[0].trigger('mouseleave');
    expect(tooltip.props('visible')).toBe(false);

    await titles[1].trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    const itemTooltip = wrapper.findComponent(HMenuItem).findComponent({ name: 'HTooltip' });
    expect(itemTooltip.props('visible')).toBe(true);
    await titles[1].trigger('mouseleave');
    expect(itemTooltip.props('visible')).toBe(false);
  });

  test('menu item native click guards, empty values and tooltip layout modes cover contracts', async () => {
    const blockedSelected = vi.fn();
    const blockedClick = vi.fn();
    const blocked = mount(() => (
      <HMenu beforeSelect={() => false} onSelected={blockedSelected}>
        <HMenuItem name="Blocked" value="blocked" onClick={blockedClick} />
      </HMenu>
    ));
    await nextTick();
    await blocked.get('[role="menuitem"]').trigger('keyup', { key: 'Enter' });
    await flushPromises();
    expect(blockedClick).not.toHaveBeenCalled();
    expect(blockedSelected).not.toHaveBeenCalled();
    blocked.unmount();

    const rejectedSelected = vi.fn();
    const rejected = mount(() => (
      <HMenu beforeSelect={() => Promise.reject(new Error('blocked'))} onSelected={rejectedSelected}>
        <HMenuItem name="Rejected" value="rejected" />
      </HMenu>
    ));
    await nextTick();
    await rejected.get('[role="menuitem"]').trigger('click');
    await flushPromises();
    expect(rejectedSelected).not.toHaveBeenCalled();
    rejected.unmount();

    const beforeSelect = vi.fn();
    const emptySelected = vi.fn();
    const empty = mount(() => (
      <HMenu beforeSelect={beforeSelect} onSelected={emptySelected}>
        <HMenuItem name="Empty value" value="" />
      </HMenu>
    ));
    await nextTick();
    await empty.get('[role="menuitem"]').trigger('click');
    await flushPromises();
    expect(beforeSelect).not.toHaveBeenCalled();
    expect(emptySelected).toHaveBeenCalledWith('', expect.any(Array), expect.any(Object));
    empty.unmount();

    for (const collapseForever of [true, false]) {
      const wrapper = mount(() => (
        <HMenu collapseForever={collapseForever}>
          <HMenuItem name="Tooltip item" value="tooltip" />
        </HMenu>
      ));
      await nextTick();
      const text = wrapper.get('.h-menu__title--text');
      Object.defineProperties(text.element, {
        scrollWidth: { configurable: true, value: collapseForever ? 200 : 40 },
        clientWidth: { configurable: true, value: collapseForever ? 20 : 120 },
      });
      await wrapper.get('[role="menuitem"]').trigger('mouseenter');
      await new Promise(resolve => window.setTimeout(resolve, 210));
      expect(
        wrapper.findComponent(HMenuItem).findComponent({ name: 'HTooltip' }).props('visible'),
      ).toBe(collapseForever);
      wrapper.unmount();
    }
  });

  test('standalone menu item tolerates optional parent services and exposes expanded overflow', async () => {
    const parentEmit = vi.fn();
    const wrapper = mount(HMenuItem, {
      props: { name: 'Standalone' },
      global: {
        provide: {
          [HMenuPropsInjectKey as symbol]: {
            tag: 'div',
            collapseForever: false,
            beforeSelect: undefined,
          },
          [HMenuEmitInjectKey as symbol]: parentEmit,
        },
      },
    });
    const text = wrapper.get('.h-menu__title--text');
    Object.defineProperties(text.element, {
      scrollWidth: { configurable: true, value: 200 },
      clientWidth: { configurable: true, value: 20 },
    });
    await wrapper.get('[role="menuitem"]').trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('visible')).toBe(true);

    await wrapper.get('[role="menuitem"]').trigger('click');
    await flushPromises();
    expect(parentEmit).toHaveBeenCalledWith('selected', '', [], expect.any(Object));
    wrapper.unmount();
  });

  test('collapsed submenu dropdown selects nested items and closes on external blur', async () => {
    const onSelected = vi.fn();
    const onItemClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu collapse useDropdownLevel={0} menuTrigger="click" onSelected={onSelected}>
        <HSubMenu name="Parent" value="parent">
          <HMenuItem name="Nested item" value="nested" onClick={onItemClick} />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    const title = wrapper.get('[aria-haspopup="menu"]');

    await title.trigger('keyup', { key: 'Enter' });
    await nextTick();
    const dropdownItem = wrapper.findComponent({ name: 'HDropdownItem' });
    expect(dropdownItem.exists()).toBe(true);
    dropdownItem.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ value: 'nested' }));
    expect(onSelected).toHaveBeenCalledWith(
      'nested',
      expect.any(Array),
      expect.objectContaining({ value: 'nested' }),
    );

    await title.trigger('mouseenter');
    await title.trigger('blur', { relatedTarget: document.body });
    await nextTick();
    expect(wrapper.findComponent({ name: 'HDropdown' }).props('visible')).toBe(false);
  });

  test.each([
    ['returns false', () => false],
    ['rejects', () => Promise.reject(new Error('blocked'))],
  ])('collapsed nested item guard %s without selection', async (_label, beforeSelect) => {
    const onSelected = vi.fn();
    const onItemClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu collapse useDropdownLevel={0} beforeSelect={beforeSelect} onSelected={onSelected}>
        <HSubMenu name="Parent" value="parent">
          <HMenuItem name="Nested item" value="nested" onClick={onItemClick} />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    await wrapper.get('[aria-haspopup="menu"]').trigger('mouseenter');
    const dropdownItem = wrapper.findComponent({ name: 'HDropdownItem' });
    dropdownItem.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();

    expect(onItemClick).not.toHaveBeenCalled();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test.each([
    ['returns false', () => false],
    ['rejects', () => Promise.reject(new Error('blocked'))],
  ])('collapsed nested submenu guard %s without selection', async (_label, beforeSelect) => {
    const onSelected = vi.fn();
    const onSubmenuClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu collapse useDropdownLevel={0} beforeSelect={beforeSelect} onSelected={onSelected}>
        <HSubMenu name="Parent" value="parent">
          <HSubMenu name="Nested submenu" value="nested-submenu" selectable onClick={onSubmenuClick}>
            <HMenuItem name="Leaf" value="leaf" />
          </HSubMenu>
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    await wrapper.get('[aria-haspopup="menu"]').trigger('mouseenter');
    const dropdownSubmenu = wrapper
      .findAllComponents({ name: 'HDropdownSubmenu' })
      .find(item => item.text().includes('Nested submenu'))!;
    dropdownSubmenu.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();
    expect(onSubmenuClick).not.toHaveBeenCalled();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test('disabled root submenu and disabled root item ignore pointer and keyboard activation', async () => {
    const onSelected = vi.fn();
    const onSubmenuClick = vi.fn();
    const onItemClick = vi.fn();
    const wrapper = mount(() => (
      <HMenu onSelected={onSelected}>
        <HSubMenu name="Disabled submenu" value="disabled-submenu" disabled onClick={onSubmenuClick}>
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
        <HMenuItem name="Disabled item" value="disabled-item" disabled onClick={onItemClick} />
      </HMenu>
    ));
    await nextTick();
    const targets = wrapper.findAll('[role="menuitem"]');
    await targets[0].trigger('click');
    await targets[0].trigger('keyup', { key: 'Enter' });
    await targets.at(-1)!.trigger('click');
    await targets.at(-1)!.trigger('keyup', { key: 'Enter' });
    await flushPromises();
    expect(onSubmenuClick).not.toHaveBeenCalled();
    expect(onItemClick).not.toHaveBeenCalled();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test.each([
    ['returns false', () => false],
    ['rejects', () => Promise.reject(new Error('blocked'))],
  ])('selectable root submenu guard %s before expansion and selection', async (_label, beforeSelect) => {
    const onSelected = vi.fn();
    const onClick = vi.fn();
    const onOpen = vi.fn();
    const wrapper = mount(() => (
      <HMenu beforeSelect={beforeSelect} onSelected={onSelected} onOpen={onOpen}>
        <HSubMenu name="Guarded" value="guarded" selectable onClick={onClick}>
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await wrapper.get('[aria-haspopup="menu"]').trigger('click');
    await flushPromises();
    expect(onClick).not.toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test('collapsed nested selectable and plain submenus exercise expand and close paths', async () => {
    const menuRef = ref<HorizonWebComponentInstance<typeof HMenu, MenuExposes> | null>(null);
    const onSelected = vi.fn();
    const onSelectableClick = vi.fn();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <HMenu
        ref={menuRef}
        collapse
        useDropdownLevel={1}
        onSelected={onSelected}
        onOpen={onOpen}
        onClose={onClose}
      >
        <HSubMenu name="Parent" value="parent">
          <HSubMenu
            name="Selectable child"
            value="selectable-child"
            selectable
            onClick={onSelectableClick}
          >
            <HMenuItem name="Leaf" value="leaf" />
          </HSubMenu>
          <HSubMenu name="Plain child" value="plain-child">
            <HMenuItem name="Other leaf" value="other-leaf" />
          </HSubMenu>
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    menuRef.value?.expand(['selectable-child'], false);
    await nextTick();
    await wrapper.get('[aria-haspopup="menu"]').trigger('mouseenter');
    const nested = wrapper.findAllComponents({ name: 'HDropdownSubmenu' });
    expect(nested.length).toBeGreaterThanOrEqual(2);
    const selectable = nested.find(item => item.text().includes('Selectable child'))!;
    const plain = nested.find(item => item.text().includes('Plain child'))!;

    selectable.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();
    expect(onSelectableClick).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'selectable-child' }),
    );
    expect(onSelected).toHaveBeenCalledWith(
      'selectable-child',
      expect.any(Array),
      expect.objectContaining({ value: 'selectable-child' }),
    );
    expect(onClose).toHaveBeenCalledWith('selectable-child', expect.any(Array));
    selectable.vm.$emit('click', new MouseEvent('click'));
    plain.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();
    expect(onSelected.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  test('submenu tooltip and keyboard modes cover vertical, horizontal and collapse-forever paths', async () => {
    const vertical = mount(() => (
      <HMenu useDropdownLevel={2}>
        <HSubMenu name="Vertical" value="vertical">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    const verticalTitle = vertical.get('[aria-haspopup="menu"]');
    await verticalTitle.trigger('keyup', { key: 'Enter' });
    await verticalTitle.trigger('keyup', { key: 'Enter' });
    vertical.unmount();

    const horizontal = mount(() => (
      <HMenu mode="horizontal" submenuExpandType="single">
        <HSubMenu name="Horizontal" value="horizontal">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    const horizontalTitle = horizontal.get('[aria-haspopup="menu"]');
    const horizontalText = horizontal.get('.h-menu__title--text');
    Object.defineProperties(horizontalText.element, {
      scrollWidth: { configurable: true, value: 200 },
      clientWidth: { configurable: true, value: 20 },
    });
    await horizontalTitle.trigger('mouseenter');
    await horizontalTitle.trigger('keyup', { key: 'Enter' });
    await horizontalTitle.trigger('keyup', { key: 'Enter' });
    horizontal.unmount();

    const forever = mount(() => (
      <HMenu collapseForever>
        <HSubMenu name="Forever" value="forever">
          <HMenuItem name="Child" value="child" />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    const text = forever.get('.h-menu__title--text');
    Object.defineProperties(text.element, {
      scrollWidth: { configurable: true, value: 240 },
      clientWidth: { configurable: true, value: 20 },
    });
    await forever.get('[aria-haspopup="menu"]').trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    expect(forever.findComponent(HSubMenu).findComponent({ name: 'HTooltip' }).props('visible')).toBe(
      true,
    );
    forever.unmount();
  });

  test('standalone selectable submenu tolerates optional tree services and empty values', async () => {
    const parentEmit = vi.fn();
    const onClick = vi.fn();
    const wrapper = mount(HSubMenu, {
      props: { selectable: true, value: undefined, onClick },
      slots: { default: () => <span data-test="standalone-child">Child</span> },
      global: {
        provide: {
          [HMenuPropsInjectKey as symbol]: {
            mode: 'vertical',
            submenuExpandType: 'single',
            useDropdownLevel: 1,
            menuTrigger: 'click',
            collapseForever: false,
            collapseTransition: true,
            theme: 'gray',
            beforeSelect: undefined,
          },
          [HMenuEmitInjectKey as symbol]: parentEmit,
        },
      },
    });
    const text = wrapper.get('.h-menu__title--text');
    Object.defineProperties(text.element, {
      scrollWidth: { configurable: true, value: 160 },
      clientWidth: { configurable: true, value: 20 },
    });
    const title = wrapper.get('[aria-haspopup="menu"]');
    await title.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 210));
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('visible')).toBe(true);

    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropagation = vi.spyOn(clickEvent, 'stopPropagation');
    wrapper.get('.h-menu__title--arrow').element.dispatchEvent(clickEvent);
    expect(stopPropagation).toHaveBeenCalled();

    await title.trigger('click');
    await flushPromises();
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ selectable: true }));
    expect(parentEmit).toHaveBeenCalledWith('selected', '', [], expect.any(Object));
    expect(wrapper.get('[data-test="standalone-child"]').text()).toBe('Child');
    wrapper.unmount();
  });

  test('submenu injected tree services cover registration, full view, expansion and cleanup', async () => {
    const parentProps = reactive({
      mode: 'vertical' as 'vertical' | 'horizontal',
      submenuExpandType: 'single' as 'single' | 'full',
      useDropdownLevel: 1,
      menuTrigger: 'click' as const,
      collapseForever: false,
      collapseTransition: true,
      theme: 'gray' as const,
      beforeSelect: undefined,
    });
    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const addExpand = vi.fn();
    const removeExpand = vi.fn();
    const setActive = vi.fn();
    const switchFull = vi.fn();
    const parentEmit = vi.fn();
    const expanded = ref(new Set<string>());
    const collapsed = ref(false);
    const activeTop = ref('');
    const wrapper = mount(HSubMenu, {
      props: { name: 'Services', value: 'services', selectable: true },
      slots: { default: () => <span>Child</span> },
      global: {
        provide: {
          [HMenuPropsInjectKey as symbol]: parentProps,
          [HMenuEmitInjectKey as symbol]: parentEmit,
          [HMenuAppendChildInjectKey as symbol]: appendChild,
          [HMenuRemoveChildInjectKey as symbol]: removeChild,
          [HMenuExpandedMenuInjectKey as symbol]: expanded,
          [HMenuAddExpandMenuInjectKey as symbol]: addExpand,
          [HMenuRemoveExpandMenuInjectKey as symbol]: removeExpand,
          [HMenuSetActivatedMenuInjectKey as symbol]: setActive,
          [HMenuActivatedMenusInjectKey as symbol]: ref([]),
          [HMenuIsCollapsedInjectKey as symbol]: collapsed,
          [HMenuActiveTopMenuUuidInjectKey as symbol]: activeTop,
          [HMenuSwitchFullViewMenuVisibleInjectKey as symbol]: switchFull,
        },
      },
    });
    await nextTick();
    const registered = appendChild.mock.calls.at(-1)![0];
    const scrollIntoView = vi.fn();
    Object.defineProperty(wrapper.element, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    registered.scrollTo();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest' });

    const title = wrapper.get('[aria-haspopup="menu"]');
    await title.trigger('click');
    await flushPromises();
    expect(addExpand).toHaveBeenCalledWith(registered.uuid);
    expanded.value.add(registered.uuid);
    await title.trigger('click');
    await flushPromises();
    expect(removeExpand).toHaveBeenCalledWith(registered.uuid);

    parentProps.mode = 'horizontal';
    parentProps.submenuExpandType = 'full';
    await nextTick();
    await title.trigger('mouseenter');
    expect(activeTop.value).toBe(registered.uuid);
    await title.trigger('keyup', { key: 'Enter' });
    expect(switchFull).toHaveBeenCalled();

    wrapper.unmount();
    expect(removeChild).toHaveBeenCalledWith(registered.uuid);
  });

  test('disabled nested dropdown targets stay inert for submenu and item paths', async () => {
    const onSelected = vi.fn();
    const wrapper = mount(() => (
      <HMenu collapse useDropdownLevel={0} onSelected={onSelected}>
        <HSubMenu name="Parent" value="parent">
          <HSubMenu name="Disabled group" value="group" disabled selectable>
            <HMenuItem name="Nested" value="nested" />
          </HSubMenu>
          <HMenuItem name="Disabled item" value="item" disabled />
        </HSubMenu>
      </HMenu>
    ));
    await nextTick();
    await nextTick();
    await wrapper.get('[aria-haspopup="menu"]').trigger('mouseenter');

    const dropdownSubmenu = wrapper.findAllComponents({ name: 'HDropdownSubmenu' }).at(-1)!;
    dropdownSubmenu.vm.$emit('click', new MouseEvent('click'));
    const dropdownItem = wrapper
      .findAllComponents({ name: 'HDropdownItem' })
      .find(item => item.props('disabled'))!;
    dropdownItem.vm.$emit('click', new MouseEvent('click'));
    await flushPromises();
    expect(onSelected).not.toHaveBeenCalled();
  });

  test('emit and width validators cover valid and defensive payloads', () => {
    const item = { value: 'item' } as any;
    expect(useMenuEmits['update:collapse'](true)).toBe(true);
    expect(useMenuEmits['update:collapse']('true' as never)).toBe(false);
    expect(useMenuEmits.selected('item', [item], item)).toBe(true);
    expect(useMenuEmits.selected('item', [], null as never)).toBe(false);
    expect(useMenuEmits.open('item', [item])).toBe(true);
    expect(useMenuEmits.open('item', null as never)).toBe(false);
    expect(useMenuEmits.close('item', [item])).toBe(true);
    expect(useMenuEmits.close('item', null as never)).toBe(false);
    expect(useMenuItemEmits.click(item)).toBe(true);
    expect(useMenuItemEmits.click(null as never)).toBe(false);
    expect(useSubMenuEmits.click(item)).toBe(true);
    expect(useSubMenuEmits.click(null as never)).toBe(false);
    expect(useMenuProps.width.validator?.(160)).toBe(true);
    expect(useMenuProps.width.validator?.('240px')).toBe(true);
    expect(useMenuProps.width.validator?.(159)).toBe(false);
    expect(useMenuProps.width.validator?.(241)).toBe(false);
    expect(useMenuProps.width.validator?.({})).toBe(false);
  });
});
