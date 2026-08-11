import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HDialog from '../src/Dialog';
import { useDialogEmits } from '../src/composables/useEmits';

describe('Dialog public API contracts', () => {
  beforeEach(() => {
    document.body.removeAttribute('data-popup-parent-hidden');
  });

  test('renders icon, color, classes, attrs, text and button props', () => {
    const wrapper = mount(() => (
      <HDialog
        visible
        to={null}
        title="Delete item"
        iconName="close"
        iconColor="#f00"
        okText="Delete"
        cancelText="Keep"
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ size: 'small' }}
        classNames={{
          wrapper: 'wrapper-contract',
          mask: 'mask-contract',
          header: 'header-contract',
          body: 'body-contract',
          footer: 'footer-contract',
        }}
        data-dialog="contract"
      >
        Dialog content
      </HDialog>
    ));

    expect(wrapper.get('.h-dialog').attributes('data-dialog')).toBe('contract');
    expect(wrapper.get('.h-dialog__container').classes()).toContain('wrapper-contract');
    expect(wrapper.get('.h-dialog__mask').classes()).toContain('mask-contract');
    expect(wrapper.get('.h-dialog__header').classes()).toContain('header-contract');
    expect(wrapper.get('.h-dialog__body').classes()).toContain('body-contract');
    expect(wrapper.get('.h-dialog__footer').classes()).toContain('footer-contract');
    expect(wrapper.get('.h-dialog__body').text()).toBe('Dialog content');
    expect(wrapper.get('.h-dialog__icon path').attributes('fill')).toBe('#f00');
    expect(wrapper.get('.h-dialog__main').classes()).toContain('h-dialog__main--icon-offset');
    expect(wrapper.get('.h-dialog__footer .h-button--primary').attributes('disabled')).toBeDefined();
    expect(wrapper.get('.h-dialog__footer .h-button--primary').text()).toBe('Delete');
    expect(wrapper.get('.h-dialog__footer .h-button--normal').classes()).toContain('h-button--small');
    expect(wrapper.get('.h-dialog__footer .h-button--normal').text()).toBe('Keep');
  });

  test('supports every named size and string top while allowing buttons and mask to be hidden', async () => {
    const size = ref<'small' | 'medium' | 'large' | 'huge'>('small');
    const wrapper = mount(() => (
      <HDialog
        visible
        to={null}
        title="Minimal"
        top="12vh"
        size={size.value}
        mask={false}
        closeButton={false}
        okButtonProps={false}
        cancelButtonProps={false}
      />
    ));

    expect(wrapper.get('.h-dialog__container').classes()).toContain('h-dialog--small');
    expect(wrapper.get('.h-dialog__container').attributes('style')).toContain('top: 12vh');
    expect(wrapper.find('.h-dialog__mask').exists()).toBe(false);
    expect(wrapper.find('.h-dialog__header-close').exists()).toBe(false);
    expect(wrapper.find('.h-dialog__footer').exists()).toBe(false);

    for (const value of ['medium', 'large', 'huge'] as const) {
      size.value = value;
      await nextTick();
      expect(wrapper.get('.h-dialog__container').classes()).toContain(`h-dialog--${value}`);
    }
  });

  test('accepts boolean button switches and applies their empty prop fallback', () => {
    const wrapper = mount(() => (
      <HDialog visible to={null} okButtonProps={true} cancelButtonProps={true} />
    ));
    expect(wrapper.findAll('.h-dialog__footer button')).toHaveLength(2);
  });

  test('honors maskClose and beforeClose before updating visibility', async () => {
    const beforeClose = vi.fn<(close: () => void) => void>();
    const update = vi.fn();
    const maskClick = vi.fn();
    const maskClose = ref(false);
    const wrapper = mount(() => (
      <HDialog
        visible
        to={null}
        maskClose={maskClose.value}
        beforeClose={beforeClose}
        onMaskClick={maskClick}
        onUpdate:visible={update}
      />
    ));

    await wrapper.get('.h-dialog__mask').trigger('click');
    expect(maskClick).not.toHaveBeenCalled();
    expect(beforeClose).not.toHaveBeenCalled();
    maskClose.value = true;
    await nextTick();
    await wrapper.get('.h-dialog__mask').trigger('click');
    expect(maskClick).toHaveBeenCalledTimes(1);
    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(update).not.toHaveBeenCalled();

    beforeClose.mock.calls[0][0]();
    expect(update).toHaveBeenCalledWith(false);
  });

  test('closes from Escape only when visible and escClose are enabled', async () => {
    const visible = ref(true);
    const escClose = ref(false);
    const update = vi.fn();
    mount(() => (
      <HDialog
        visible={visible.value}
        to={null}
        escClose={escClose.value}
        onUpdate:visible={update}
      />
    ));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(update).not.toHaveBeenCalled();
    escClose.value = true;
    await nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(update).toHaveBeenCalledTimes(1);
    visible.value = false;
    await nextTick();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  test('traps focus inside dialogs with and without focusable children', async () => {
    const empty = mount(
      () => (
        <HDialog
          visible
          to={null}
          okButtonProps={false}
          cancelButtonProps={false}
          closeButton={false}
        />
      ),
      { attachTo: document.body },
    );
    const emptyDialog = empty.get('[role="dialog"]');
    const emptyTab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    emptyDialog.element.dispatchEvent(emptyTab);
    expect(emptyTab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(emptyDialog.element);

    const wrapper = mount(() => <HDialog visible to={null} title="Focusable" />, {
      attachTo: document.body,
    });
    const dialog = wrapper.get('[role="dialog"]');
    const buttons = wrapper.findAll('button');
    const first = buttons[0].element as HTMLButtonElement;
    const last = buttons.at(-1)!.element as HTMLButtonElement;
    last.focus();
    dialog.element.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    );
    expect(document.activeElement).toBe(first);
    first.focus();
    dialog.element.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.activeElement).toBe(last);
    (dialog.element as HTMLElement).focus();
    const neutralTab = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    dialog.element.dispatchEvent(neutralTab);
    expect(neutralTab.defaultPrevented).toBe(false);
    dialog.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });

  test('emits close-icon payload once and stops the native click from reaching the root', async () => {
    const closeIcon = vi.fn();
    const update = vi.fn();
    const rootClick = vi.fn();
    const wrapper = mount(HDialog, {
      props: {
        visible: true,
        to: null,
        title: 'Closable',
        onCloseIconClick: closeIcon,
        'onUpdate:visible': update,
      },
      attrs: { onClick: rootClick },
    });

    await wrapper.get('.h-dialog__header-close').trigger('click');
    expect(closeIcon).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(false);
    expect(rootClick).not.toHaveBeenCalled();
  });

  test('emits open/close exactly on controlled visibility changes without scroll locking', async () => {
    const visible = ref(false);
    const open = vi.fn();
    const close = vi.fn();
    const wrapper = mount(() => (
      <HDialog
        visible={visible.value}
        to={null}
        lockScroll={false}
        onOpen={open}
        onClose={close}
      />
    ));
    expect(open).not.toHaveBeenCalled();
    visible.value = true;
    await nextTick();
    expect(open).toHaveBeenCalledTimes(1);
    expect(document.body.dataset.popupParentHidden).toBeUndefined();
    visible.value = false;
    await nextTick();
    expect(close).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  test('validates update:visible and accepts all zero-argument event contracts', () => {
    expect(useDialogEmits['update:visible'](false)).toBe(true);
    expect(useDialogEmits['update:visible']('false' as never)).toBe(false);
    for (const name of [
      'ok',
      'cancel',
      'open',
      'opened',
      'close',
      'closed',
      'closeIconClick',
      'maskClick',
      'confirmDebounceFinished',
      'cancelDebounceFinished',
    ] as const) {
      expect(useDialogEmits[name]()).toBe(true);
    }
  });
});
