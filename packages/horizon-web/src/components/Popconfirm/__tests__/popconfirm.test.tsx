import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, reactive } from 'vue';
import HPopconfirm from '../src/Popconfirm';
import { usePopconfirm } from '../src/hooks/usePopconfirm';

describe('Popconfirm', () => {
  test('keeps async guard state inside the hook', async () => {
    const emit = vi.fn();
    const state = usePopconfirm(
      reactive({ visible: undefined, disabled: false, beforeConfirm: async () => false }) as any,
      emit,
    );
    state.setVisible(true);
    await state.confirm(new MouseEvent('click'));
    expect(state.visible.value).toBe(true);
    expect(emit).not.toHaveBeenCalledWith('confirm', expect.anything());
  });

  test('confirms and closes after async guard', async () => {
    const guard = vi.fn().mockResolvedValue(true);
    const wrapper = mount(HPopconfirm, {
      props: { title: 'Delete?', beforeConfirm: guard },
      slots: { reference: '<button>Delete</button>' },
      attachTo: document.body,
    });
    await wrapper.get('button').trigger('click');
    await new Promise(resolve => setTimeout(resolve, 10));
    const confirm = Array.from(document.body.querySelectorAll('button')).find(
      item => item.textContent === 'Confirm',
    )!;
    confirm.click();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(guard).toHaveBeenCalledOnce();
    expect(wrapper.emitted('confirm')).toHaveLength(1);
    wrapper.unmount();
  });

  test('does not open while disabled and closes when disabled dynamically', async () => {
    const props = reactive({ disabled: false });
    const wrapper = mount(HPopconfirm, {
      props,
      slots: { reference: '<button>Delete</button>' },
      attachTo: document.body,
    });

    await wrapper.get('button').trigger('click');
    await nextTick();
    expect(document.body.querySelector('[role="alertdialog"]')).not.toBeNull();

    await wrapper.setProps({ disabled: true });
    await nextTick();
    expect(document.body.querySelector('[role="alertdialog"]')).toBeNull();

    await wrapper.get('button').trigger('click');
    await nextTick();
    expect(document.body.querySelector('[role="alertdialog"]')).toBeNull();
    wrapper.unmount();
  });

  test('renders alertdialog semantics, custom labels and emits cancel', async () => {
    const wrapper = mount(HPopconfirm, {
      props: { title: 'Delete account?', confirmText: 'Remove', cancelText: 'Keep' },
      slots: { reference: '<button class="reference">Delete</button>' },
      attachTo: document.body,
    });

    await wrapper.get('.reference').trigger('click');
    await nextTick();

    const dialog = document.body.querySelector('[role="alertdialog"]')!;
    expect(dialog.getAttribute('aria-label')).toBe('Delete account?');
    const cancel = Array.from(dialog.querySelectorAll('button')).find(
      button => button.textContent === 'Keep',
    )!;
    cancel.click();
    await nextTick();

    expect(wrapper.emitted('cancel')).toHaveLength(1);
    expect(document.body.querySelector('[role="alertdialog"]')).toBeNull();
    wrapper.unmount();
  });

  test('ignores duplicate confirmations while an async guard is pending', async () => {
    let resolveGuard!: (value: boolean) => void;
    const guard = vi.fn(
      () => new Promise<boolean>(resolve => {
        resolveGuard = resolve;
      }),
    );
    const emit = vi.fn();
    const state = usePopconfirm(
      reactive({ visible: undefined, disabled: false, beforeConfirm: guard }) as any,
      emit,
    );
    state.setVisible(true);
    const event = new MouseEvent('click');

    const first = state.confirm(event);
    const second = state.confirm(event);
    expect(guard).toHaveBeenCalledOnce();
    expect(state.loading.value).toBe(true);

    resolveGuard(true);
    await Promise.all([first, second]);

    expect(emit).toHaveBeenCalledTimes(3);
    expect(emit).toHaveBeenCalledWith('confirm', event);
    expect(state.loading.value).toBe(false);
  });

  test('restores loading and stays open when the guard rejects', async () => {
    const emit = vi.fn();
    const state = usePopconfirm(
      reactive({
        visible: undefined,
        disabled: false,
        beforeConfirm: () => Promise.reject(new Error('blocked')),
      }) as any,
      emit,
    );
    state.setVisible(true);

    await expect(state.confirm(new MouseEvent('click'))).rejects.toThrow('blocked');

    expect(state.visible.value).toBe(true);
    expect(state.loading.value).toBe(false);
    expect(emit).not.toHaveBeenCalledWith('confirm', expect.anything());
  });
});
