import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { h, nextTick, ref } from 'vue';
import {
  HDropdown,
  HDropdownGroup,
  HDropdownItem,
  HDropdownMenu,
  HDropdownSubmenu,
} from '..';

describe('Dropdown public API contracts', () => {
  test('forwards popup behavior props and exposes visibility to the trigger slot', async () => {
    const visible = ref(false);
    const wrapper = mount(() => (
      <HDropdown
        trigger="manual"
        visible={visible.value}
        size="small"
        theme="midnight"
        placement="right-end"
        distance={12}
        toBody
        teleportTo="#dropdown-target"
        hideEventType="mouseup"
        popperWidth="18rem"
        popperClass="contract-popper"
        popoverOptions={{ flip: false, skidding: 7 }}
      >
        {{
          default: ({ popperVisible }: { popperVisible: boolean }) => (
            <button data-test="dropdown-reference">{String(popperVisible)}</button>
          ),
          dropdown: () => (
            <HDropdownMenu>
              <HDropdownItem command="save">Save</HDropdownItem>
            </HDropdownMenu>
          ),
        }}
      </HDropdown>
    ), {
      attachTo: document.body.appendChild(
        Object.assign(document.createElement('div'), { id: 'dropdown-target' }),
      ),
    });

    const dropdown = wrapper.get('.h-dropdown');
    expect(dropdown.classes()).toEqual(
      expect.arrayContaining(['h-dropdown--midnight', 'h-dropdown--small']),
    );
    expect(dropdown.attributes('data-placement')).toBe('right-end');
    expect(wrapper.get('[data-test="dropdown-reference"]').text()).toBe('false');

    const popover = wrapper.findComponent({ name: 'HPopover' });
    expect(popover.props()).toMatchObject({
      trigger: 'manual',
      placement: 'right-end',
      distance: 12,
      to: '#dropdown-target',
      hideEventType: 'mouseup',
      popperClass: 'contract-popper',
      flip: false,
      skidding: 7,
    });

    visible.value = true;
    await nextTick();
    expect(wrapper.get('[data-test="dropdown-reference"]').text()).toBe('true');
    const popup = document.querySelector<HTMLElement>('#dropdown-target .h-dropdown__inner');
    expect(popup).not.toBeNull();
    expect(popup?.style.getPropertyValue('--h-dropdown-size-container-width')).toBe('18rem');

    wrapper.unmount();
    document.querySelector('#dropdown-target')?.remove();
  });

  test('item renders all states and slots and emits native pointer and keyboard payloads', async () => {
    const onClick = vi.fn();
    const wrapper = mount(HDropdownItem, {
      props: {
        active: true,
        divided: true,
        command: { id: 7 },
        tooltipOptions: { placement: 'right' },
        onClick,
      },
      slots: {
        icon: () => <span data-test="item-icon">I</span>,
        default: () => <span data-test="item-label">Archive</span>,
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['is-active', 'is-divided', 'is-focusable']),
    );
    expect(wrapper.get('[data-test="item-icon"]').text()).toBe('I');
    expect(wrapper.get('[data-test="item-label"]').text()).toBe('Archive');
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('placement')).toBe('right');

    await wrapper.get('[role="menuitem"]').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    await wrapper.get('[role="menuitem"]').trigger('keyup', { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick.mock.calls[1][0]).toBeInstanceOf(KeyboardEvent);

    await wrapper.get('[role="menuitem"]').trigger('keyup', { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
    await wrapper.get('.h-dropdown-item__content').trigger('keyup', { key: 'Enter' });
    await wrapper.get('[role="menuitem"]').trigger('keyup', { key: 'Escape' });
    expect(onClick).toHaveBeenCalledTimes(3);

    await wrapper.setProps({ disabled: true });
    await wrapper.get('[role="menuitem"]').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(wrapper.get('[role="menuitem"]').attributes()).toMatchObject({
      'aria-disabled': 'true',
      tabindex: '-1',
    });
  });

  test('group and submenu render named slots and propagate submenu popup options', async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HDropdown trigger="manual" visible submenuLeft toBody={false}>
        {{
          default: () => <button>Open</button>,
          dropdown: () => (
            <HDropdownMenu>
              <HDropdownGroup titleTooltipOptions={{ placement: 'bottom' }}>
                {{
                  title: () => <span data-test="group-title">Group</span>,
                  default: () => (
                    <HDropdownSubmenu
                      active
                      selected
                      trigger="click"
                      popoverOptions={{ distance: 9 }}
                      onClick={onClick}
                    >
                      {{
                        icon: () => <span data-test="submenu-icon">S</span>,
                        title: () => <span data-test="submenu-title">More</span>,
                        default: () => <HDropdownItem>Nested item</HDropdownItem>,
                      }}
                    </HDropdownSubmenu>
                  ),
                }}
              </HDropdownGroup>
            </HDropdownMenu>
          ),
        }}
      </HDropdown>
    ));
    await nextTick();

    expect(wrapper.get('[data-test="group-title"]').text()).toBe('Group');
    expect(wrapper.get('[data-test="submenu-icon"]').text()).toBe('S');
    expect(wrapper.get('[data-test="submenu-title"]').text()).toBe('More');
    expect(wrapper.get('.h-dropdown-submenu').classes()).toEqual(
      expect.arrayContaining(['is-active', 'is-selected']),
    );

    const popovers = wrapper.findAllComponents({ name: 'HPopover' });
    const submenuPopover = popovers.at(-1)!;
    expect(submenuPopover.props()).toMatchObject({
      trigger: 'click',
      placement: 'left-start',
      distance: 9,
    });

    await wrapper.get('.h-dropdown-submenu__item').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    const submenuInner = wrapper.get('.h-dropdown-submenu__item--inner');
    await submenuInner.trigger('keyup', { key: 'Enter' });
    await submenuInner.trigger('keyup', { key: 'Enter' });
    await submenuInner.trigger('keyup', { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(onClick.mock.calls[1][0]).toBeInstanceOf(KeyboardEvent);
  });

  test('group only shows its title tooltip when real layout reports overflow', async () => {
    const wrapper = mount(HDropdownGroup, {
      props: { title: 'A title that may overflow' },
      slots: { default: () => <span>Grouped content</span> },
    });
    const title = wrapper.get('.h-dropdown-group__title');
    const tooltip = wrapper.findComponent({ name: 'HTooltip' });

    Object.defineProperties(title.element, {
      scrollWidth: { configurable: true, value: 160 },
      clientWidth: { configurable: true, value: 48 },
    });
    await title.trigger('mouseenter');
    expect(tooltip.props('visible')).toBe(true);

    await title.trigger('mouseleave');
    expect(tooltip.props('visible')).toBe(false);

    Object.defineProperties(title.element, {
      scrollWidth: { configurable: true, value: 40 },
      clientWidth: { configurable: true, value: 48 },
    });
    await title.trigger('mouseenter');
    expect(tooltip.props('visible')).toBe(false);
  });

  test('menu prop is rendered as the popup contract without a dropdown slot', async () => {
    const menu = h(HDropdownMenu, null, {
      default: () => h(HDropdownItem, { command: 'from-menu-prop' }, () => 'Menu prop item'),
    });
    const wrapper = mount(HDropdown, {
      props: { trigger: 'manual', visible: true, menu, toBody: false },
      slots: { default: () => <button>Open menu prop</button> },
    });
    await nextTick();

    expect(wrapper.get('[role="menu"]').text()).toBe('Menu prop item');
  });

  test('exclusive controls whether opening a sibling closes this dropdown', async () => {
    const secondVisible = ref(false);
    const exclusiveVisible = ref(false);
    const siblingVisible = ref(false);
    const wrapper = mount(() => (
      <div>
        <HDropdown trigger="manual" visible toBody={false} exclusive={false}>
          {{
            default: () => <button data-test="non-exclusive">Non-exclusive</button>,
            dropdown: () => <div data-test="non-exclusive-menu">First menu</div>,
          }}
        </HDropdown>
        <HDropdown trigger="manual" visible={secondVisible.value} toBody={false} exclusive>
          {{
            default: () => <button data-test="exclusive">Exclusive</button>,
            dropdown: () => <div data-test="exclusive-menu">Second menu</div>,
          }}
        </HDropdown>
        <HDropdown trigger="manual" visible={exclusiveVisible.value} toBody={false} exclusive>
          {{
            default: () => <button data-test="exclusive-source">Exclusive source</button>,
            dropdown: () => <div data-test="exclusive-source-menu">Exclusive source menu</div>,
          }}
        </HDropdown>
        <HDropdown trigger="manual" visible={siblingVisible.value} toBody={false}>
          {{
            default: () => <button data-test="sibling">Sibling</button>,
            dropdown: () => <div data-test="sibling-menu">Sibling menu</div>,
          }}
        </HDropdown>
      </div>
    ));

    await new Promise(resolve => window.setTimeout(resolve, 10));
    secondVisible.value = true;
    await nextTick();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.find('[data-test="non-exclusive-menu"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="exclusive-menu"]').exists()).toBe(true);

    exclusiveVisible.value = true;
    await nextTick();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.find('[data-test="exclusive-source-menu"]').exists()).toBe(true);

    siblingVisible.value = true;
    await nextTick();
    await new Promise(resolve => window.setTimeout(resolve));
    expect(wrapper.find('[data-test="exclusive-source-menu"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="sibling-menu"]').exists()).toBe(true);
  });

  test('forbidEvtStop allows later listeners on the same item element', async () => {
    const normal = mount(HDropdownItem, { slots: { default: () => 'Normal' } });
    const normalNative = vi.fn();
    normal.element.addEventListener('click', normalNative);
    await normal.trigger('click');
    expect(normalNative).not.toHaveBeenCalled();

    const passThrough = mount(HDropdownItem, {
      props: { forbidEvtStop: true },
      slots: { default: () => 'Pass through' },
    });
    const passThroughNative = vi.fn();
    passThrough.element.addEventListener('click', passThroughNative);
    await passThrough.trigger('click');
    expect(passThroughNative).toHaveBeenCalledOnce();
  });

  test('contextMenu exposes coordinates, visibility events, commands and close controls', async () => {
    const onUpdateVisible = vi.fn();
    const onVisibleChange = vi.fn();
    const onCommand = vi.fn();
    const wrapper = mount(HDropdown, {
      attachTo: document.body,
      props: {
        trigger: 'contextMenu',
        toBody: false,
        popperWidth: 220,
        'onUpdate:visible': onUpdateVisible,
        onVisibleChange,
        onCommand,
      },
      slots: {
        default: () => <button data-test="context-reference">Context</button>,
        dropdown: () => (
          <HDropdownMenu>
            <HDropdownItem command="inspect">Inspect</HDropdownItem>
          </HDropdownMenu>
        ),
      },
    });

    await wrapper.get('[data-test="context-reference"]').trigger('contextmenu', {
      clientX: 40,
      clientY: 55,
    });
    const popup = wrapper.get('.h-dropdown__inner');
    expect(popup.attributes('style')).toContain('translate(40px, 55px)');
    expect(popup.attributes('style')).toContain('--h-dropdown-size-container-width: 220px');
    expect(onUpdateVisible).toHaveBeenLastCalledWith(true);
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);

    await wrapper.get('[role="menuitem"]').trigger('click');
    await nextTick();
    expect(onCommand).toHaveBeenCalledWith('inspect');
    expect(onUpdateVisible).toHaveBeenLastCalledWith(false);

    const api = wrapper.vm as unknown as { handleOpen: () => void; handleClose: () => void };
    api.handleOpen();
    api.handleOpen();
    await nextTick();
    expect(onUpdateVisible).toHaveBeenLastCalledWith(true);
    api.handleClose();
    api.handleClose();
    await nextTick();
    expect(onUpdateVisible).toHaveBeenLastCalledWith(false);

    const root = wrapper.get('.h-dropdown');
    await root.trigger('keydown', { key: 'ArrowDown' });
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(wrapper.get('[role="menuitem"]').element);
    });
    await root.trigger('keydown', { key: 'Escape' });
    await nextTick();
    await wrapper.setProps({ disabled: true });
    expect(root.attributes('tabindex')).toBeUndefined();
    wrapper.unmount();
  });

  test('keyboard opens, navigates enabled menu items, wraps and escapes to the trigger', async () => {
    const wrapper = mount(HDropdown, {
      attachTo: document.body,
      props: { trigger: 'manual', toBody: false },
      slots: {
        default: () => <button>Keyboard menu</button>,
        dropdown: () => (
          <HDropdownMenu>
            <HDropdownItem command="one">One</HDropdownItem>
            <HDropdownItem disabled command="disabled">Disabled</HDropdownItem>
            <HDropdownItem command="three">Three</HDropdownItem>
          </HDropdownMenu>
        ),
      },
    });
    const root = wrapper.get('.h-dropdown');

    // Let the immediate `visible=false` watcher finish its deferred close before
    // exercising an actual keyboard-open interaction.
    await nextTick();
    await root.trigger('keydown', { key: 'Tab' });
    expect(wrapper.find('.h-popover__popper').exists()).toBe(false);
    await root.trigger('keydown', { key: 'ArrowDown' });
    await vi.waitFor(() => {
      expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(3);
    });
    const items = wrapper.findAll('[role="menuitem"]');
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(items[0].element);
    });
    await root.trigger('keydown', { key: 'Enter' });
    await root.trigger('keydown', { key: ' ' });
    const rootElement = root.element;
    expect(rootElement).toBeInstanceOf(HTMLElement);
    if (!(rootElement instanceof HTMLElement)) throw new TypeError('Dropdown root must be HTML');
    rootElement.focus();
    await root.trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[2].element);
    rootElement.focus();
    await root.trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[0].element);
    await root.trigger('keydown', { key: 'End' });
    expect(document.activeElement).toBe(items[2].element);
    await root.trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[0].element);
    await root.trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[2].element);
    await root.trigger('keydown', { key: 'Home' });
    expect(document.activeElement).toBe(items[0].element);
    await root.trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(document.activeElement).toBe(root.element);
    wrapper.unmount();

    const disabled = mount(HDropdown, {
      props: { disabled: true, trigger: 'manual', toBody: false },
      slots: { default: () => <button>Disabled keyboard</button> },
    });
    expect(disabled.attributes('tabindex')).toBeUndefined();
    await disabled.trigger('keydown', { key: 'ArrowDown' });
    expect(disabled.find('.h-popover__popper').exists()).toBe(false);

    const empty = mount(HDropdown, {
      attachTo: document.body,
      props: { trigger: 'manual', visible: true, toBody: false },
    });
    await nextTick();
    await empty.get('.h-dropdown').trigger('keydown', { key: 'ArrowDown' });
    expect(empty.findAll('[role="menuitem"]')).toHaveLength(0);
    empty.unmount();
  });

  test('submenu ignores disabled activation and closes when a sibling becomes active', async () => {
    const direct = mount(HDropdownSubmenu, {
      props: { disabled: true, title: 'Direct submenu' },
    });
    await direct.get('.h-dropdown-submenu__item').trigger('click');
    expect(direct.emitted('click')).toBeUndefined();
    await direct.setProps({ disabled: false });
    await direct.get('.h-dropdown-submenu__item').trigger('click');
    expect(direct.emitted('click')).toHaveLength(1);

    const wrapper = mount(() => (
      <HDropdown trigger="manual" visible toBody={false}>
        {{
          default: () => <button>Sibling submenus</button>,
          dropdown: () => (
            <HDropdownMenu>
              <HDropdownSubmenu title="First" trigger="click">
                <HDropdownItem>First child</HDropdownItem>
              </HDropdownSubmenu>
              <HDropdownSubmenu title="Second" trigger="click">
                <HDropdownItem>Second child</HDropdownItem>
              </HDropdownSubmenu>
            </HDropdownMenu>
          ),
        }}
      </HDropdown>
    ), { attachTo: document.body });
    await nextTick();
    const submenus = wrapper.findAllComponents(HDropdownSubmenu);
    const secondPopover = submenus[1].findComponent({ name: 'HPopover' });
    await submenus[1].get('.h-dropdown-submenu__item').trigger('click');
    await vi.waitFor(() => {
      expect(secondPopover.emitted('show')).toHaveLength(1);
    });
    const hideCountBeforeSiblingActivation = secondPopover.emitted('hide')?.length ?? 0;
    await submenus[0].get('.h-dropdown-submenu__item').trigger('click');
    await vi.waitFor(() => {
      expect(secondPopover.emitted('hide')).toHaveLength(hideCountBeforeSiblingActivation + 1);
    });
    wrapper.unmount();
  });
});
