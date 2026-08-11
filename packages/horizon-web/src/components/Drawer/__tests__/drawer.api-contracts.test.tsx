import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import Drawer from '../src/Drawer';
import type { ButtonProps } from '../../Button/src/composables/useProps';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Drawer public API contracts', () => {
  test('applies placement, numeric size, mask, header, footer and draggable props', () => {
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        placement="left"
        size={320}
        mask={false}
        header={false}
        footer={false}
        sizeDraggable
      >
        <p class="drawer-content">Content</p>
      </Drawer>
    ));

    const dialog = wrapper.get('[role="dialog"]');
    expect(dialog.classes()).toContain('h-drawer--left');
    expect((dialog.element as HTMLElement).style.width).toBe('320px');
    expect(dialog.attributes('aria-modal')).toBeUndefined();
    expect(wrapper.find('.h-drawer__mask').exists()).toBe(false);
    expect(wrapper.find('.h-drawer__header').exists()).toBe(false);
    expect(wrapper.find('.h-drawer__footer').exists()).toBe(false);
    expect(wrapper.get('.drawer-content').text()).toBe('Content');
    expect(wrapper.get('.h-drawer__draggable').classes()).toContain('h-drawer__draggable--left');
  });

  test('renders default, title and footer slots in their public regions', () => {
    const wrapper = mount(Drawer, {
      props: { to: null, visible: true, title: 'Fallback title' },
      slots: {
        default: () => <p class="body-slot">Body slot</p>,
        title: () => <h2 class="title-slot">Title slot</h2>,
        footer: () => <div class="footer-slot">Footer slot</div>,
      },
    });

    expect(wrapper.get('.h-drawer__body .body-slot').text()).toBe('Body slot');
    expect(wrapper.get('.h-drawer__default-title .title-slot').text()).toBe('Title slot');
    expect(wrapper.text()).not.toContain('Fallback title');
    expect(wrapper.get('.h-drawer__footer .footer-slot').text()).toBe('Footer slot');
  });

  test('header slot replaces the complete default header', () => {
    const wrapper = mount(Drawer, {
      props: { to: null, visible: true, title: 'Fallback title' },
      slots: { header: () => <header class="header-slot">Header slot</header> },
    });

    expect(wrapper.get('.h-drawer__header .header-slot').text()).toBe('Header slot');
    expect(wrapper.find('[aria-label="Close drawer"]').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Fallback title');
  });

  test('configures button visibility, text, disabled state and loading state', async () => {
    const onOk = vi.fn();
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        okButton={{ disabled: true } as ButtonProps}
        okButtonText="Save"
        cancelButton={false}
        loading
        onOk={onOk}
      />
    ));

    const buttons = wrapper.findAll('.h-drawer__footer button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toContain('Save');
    expect(buttons[0].attributes('disabled')).toBeDefined();
    expect(buttons[0].classes()).toContain('is-loading');
    await buttons[0].trigger('click');
    expect(onOk).not.toHaveBeenCalled();
  });

  test('forwards object props to the cancel action', () => {
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        cancelButton={{ disabled: true } as ButtonProps}
        okButton={false}
      />
    ));

    const cancel = wrapper.get('.h-drawer__footer button');
    expect(cancel.attributes('disabled')).toBeDefined();
  });

  test('always reports mask clicks but only closes when maskClosable allows it', async () => {
    const visible = ref(true);
    const maskClosable = ref(false);
    const onMaskClick = vi.fn();
    const onUpdate = vi.fn((value: boolean) => (visible.value = value));
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible={visible.value}
        maskClosable={maskClosable.value}
        onMaskClick={onMaskClick}
        onUpdate:visible={onUpdate}
      />
    ));

    await wrapper.get('.h-drawer__mask').trigger('click');
    expect(onMaskClick).toHaveBeenCalledOnce();
    expect(onUpdate).not.toHaveBeenCalled();

    maskClosable.value = true;
    await nextTick();
    await wrapper.get('.h-drawer__mask').trigger('click');
    expect(onMaskClick).toHaveBeenCalledTimes(2);
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  test('close icon emits its event while beforeClose can veto the state update', async () => {
    const allowClose = ref(false);
    const beforeClose = vi.fn(() => allowClose.value);
    const onIconClick = vi.fn();
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        beforeClose={beforeClose}
        onIconClick={onIconClick}
        onUpdate:visible={onUpdate}
      />
    ));

    await wrapper.get('[aria-label="Close drawer"]').trigger('click');
    await nextTick();
    expect(onIconClick).toHaveBeenCalledOnce();
    expect(beforeClose).toHaveBeenCalledOnce();
    expect(onUpdate).not.toHaveBeenCalled();

    allowClose.value = true;
    await wrapper.get('[aria-label="Close drawer"]').trigger('click');
    await nextTick();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  test('escClosable gates Escape closing and emits update:visible only when allowed', async () => {
    const escClosable = ref(false);
    const onUpdate = vi.fn();
    mount(() => (
      <Drawer to={null} visible escClosable={escClosable.value} onUpdate:visible={onUpdate} />
    ));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(onUpdate).not.toHaveBeenCalled();

    escClosable.value = true;
    await nextTick();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(onUpdate).toHaveBeenCalledWith(false));
  });

  test('Escape only closes the topmost visible drawer', async () => {
    const firstUpdate = vi.fn();
    const secondUpdate = vi.fn();
    mount(() => (
      <>
        <Drawer to={null} visible onUpdate:visible={firstUpdate} />
        <Drawer to={null} visible onUpdate:visible={secondUpdate} />
      </>
    ));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(secondUpdate).toHaveBeenCalledWith(false));
    expect(firstUpdate).not.toHaveBeenCalled();
  });

  test('an initially undefined visibility does not report a close transition', () => {
    const onClose = vi.fn();
    mount(() => <Drawer to={null} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
  });

  test('cancelButtonText labels the cancel action and cancel emits update:visible', async () => {
    const onCancel = vi.fn();
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        cancelButtonText="Discard"
        onCancel={onCancel}
        onUpdate:visible={onUpdate}
      />
    ));

    const cancel = wrapper.findAll('.h-drawer__footer button')[0];
    expect(cancel.text()).toContain('Discard');
    await cancel.trigger('click');
    await nextTick();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  test('traps Tab focus for empty and button-filled drawers', async () => {
    const empty = mount(
      () => <Drawer to={null} visible header={false} footer={false} closable={false} />,
      { attachTo: document.body },
    );
    const emptyDialog = empty.get<HTMLElement>('[role="dialog"]');
    emptyDialog.element.focus();
    await emptyDialog.trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(emptyDialog.element);
    empty.unmount();

    const buttons = mount(() => <Drawer to={null} visible />, { attachTo: document.body });
    const dialog = buttons.get('[role="dialog"]');
    const focusable = buttons.findAll<HTMLButtonElement>('button');
    const first = focusable[0].element;
    const last = focusable.at(-1)!.element;

    last.focus();
    await dialog.trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(first);
    first.focus();
    await dialog.trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
    focusable[1].element.focus();
    await dialog.trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(focusable[1].element);
    await dialog.trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(focusable[1].element);
  });

  test('rejected beforeClose promises veto closing while a later resolution permits it', async () => {
    const rejectClose = ref(true);
    const beforeClose = vi.fn(() =>
      rejectClose.value ? Promise.reject(new Error('veto')) : Promise.resolve(true),
    );
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        beforeClose={beforeClose}
        onUpdate:visible={onUpdate}
      />
    ));

    await wrapper.get('.h-drawer__mask').trigger('click');
    await nextTick();
    expect(onUpdate).not.toHaveBeenCalled();

    rejectClose.value = false;
    await wrapper.get('.h-drawer__mask').trigger('click');
    await vi.waitFor(() => expect(onUpdate).toHaveBeenCalledWith(false));
  });

  test('real pointer drags resize horizontal and vertical drawers in placement direction', async () => {
    const placement = ref<'left' | 'right' | 'top' | 'bottom'>('left');
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible
        placement={placement.value}
        size="40%"
        sizeDraggable
      />
    ));
    await nextTick();
    let dialog = wrapper.get<HTMLElement>('[role="dialog"]');
    let handle = wrapper.get<HTMLElement>('.h-drawer__draggable');
    Object.defineProperty(handle.element.parentElement, 'clientWidth', {
      configurable: true,
      value: 300,
    });
    handle.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        clientX: 100,
        clientY: 0,
        pointerId: 1,
        bubbles: true,
      }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 140, clientY: 0, pointerId: 1, bubbles: true }),
    );
    window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true }));
    await nextTick();
    expect(dialog.element.style.width).toBe('340px');

    placement.value = 'right';
    await nextTick();
    dialog = wrapper.get<HTMLElement>('[role="dialog"]');
    handle = wrapper.get<HTMLElement>('.h-drawer__draggable');
    Object.defineProperty(handle.element.parentElement, 'clientWidth', {
      configurable: true,
      value: 340,
    });
    handle.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        clientX: 100,
        clientY: 0,
        pointerId: 3,
        bubbles: true,
      }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 140, clientY: 0, pointerId: 3, bubbles: true }),
    );
    window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 3, bubbles: true }));
    await nextTick();
    expect(dialog.element.style.width).toBe('300px');

    placement.value = 'top';
    await nextTick();
    dialog = wrapper.get<HTMLElement>('[role="dialog"]');
    handle = wrapper.get<HTMLElement>('.h-drawer__draggable');
    Object.defineProperty(handle.element.parentElement, 'clientHeight', {
      configurable: true,
      value: 200,
    });
    handle.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        clientX: 0,
        clientY: 100,
        pointerId: 2,
        bubbles: true,
      }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 0, clientY: 135, pointerId: 2, bubbles: true }),
    );
    window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 2, bubbles: true }));
    await nextTick();
    expect(dialog.element.style.height).toBe('235px');

    placement.value = 'bottom';
    await nextTick();
    dialog = wrapper.get<HTMLElement>('[role="dialog"]');
    handle = wrapper.get<HTMLElement>('.h-drawer__draggable');
    Object.defineProperty(handle.element.parentElement, 'clientHeight', {
      configurable: true,
      value: 235,
    });
    handle.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        clientX: 0,
        clientY: 100,
        pointerId: 4,
        bubbles: true,
      }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 0, clientY: 135, pointerId: 4, bubbles: true }),
    );
    window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 4, bubbles: true }));
    await nextTick();
    expect(dialog.element.style.height).toBe('200px');
  });

  test('custom vertical sizes reset while hidden and responsive sizes track viewport bands', async () => {
    const customVisible = ref(true);
    const custom = mount(() => (
      <Drawer
        to={null}
        visible={customVisible.value}
        placement="top"
        size="40%"
        destroyOnClose={false}
      />
    ));
    expect(custom.get<HTMLElement>('[role="dialog"]').element.style.height).toBe('40%');
    customVisible.value = false;
    await nextTick();
    expect(custom.get<HTMLElement>('[role="dialog"]').element.style.height).toBe('40%');

    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1200 });
    const responsive = mount(() => (
      <Drawer to={null} visible placement="top" size="medium" />
    ));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    const dialog = responsive.get<HTMLElement>('[role="dialog"]');
    const smallViewportHeight = Number.parseFloat(dialog.element.style.height);

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1360 });
    window.dispatchEvent(new Event('resize'));
    await vi.waitFor(() =>
      expect(Number.parseFloat(dialog.element.style.height)).toBeGreaterThan(smallViewportHeight),
    );
    const mediumViewportHeight = Number.parseFloat(dialog.element.style.height);

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1600 });
    window.dispatchEvent(new Event('resize'));
    await vi.waitFor(() =>
      expect(Number.parseFloat(dialog.element.style.height)).toBeGreaterThan(mediumViewportHeight),
    );
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
    window.dispatchEvent(new Event('resize'));
  });
});
