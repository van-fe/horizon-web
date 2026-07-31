import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { reactive } from 'vue';
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
});
