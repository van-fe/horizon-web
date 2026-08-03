import { mount } from '@vue/test-utils';
import Alert from '../src/components/Alert';
import { $alert } from '../../index';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

describe('alert.tsx', () => {
  test('alert.basic', async () => {
    const wrapper = mount(() => (
      <Alert title="Alert Title" content="Something need to be alerted." />
    ));

    const element = wrapper.findComponent(Alert);

    expect(element.exists()).toBe(true);
  });

  test('alert confirm', async () => {
    const alertPromise = $alert({
      content: 'content',
      okButtonProps: {
        debounceType: 'none',
      },
    });
    await nextTick();

    const dialog = document.body.querySelector('.h-messagebox');
    const confirmButton = dialog?.querySelector('.h-button--primary') as HTMLButtonElement | null;

    expect(confirmButton).not.toBeNull();
    confirmButton?.click();
    await alertPromise;

    await nextTick();
    expect(document.body.querySelector('.h-messagebox')).toBeNull();
  });

  // test('alert close', async () => {
  //   const onClose = vi.fn();
  //
  //   $alert('content', 'title')
  //     .then(() => {
  //       throw new Error('Cannot trigger here!');
  //     })
  //     .catch(() => {
  //       onClose();
  //       throw new Error('Cannot trigger here!');
  //     });
  //
  //   const closeButton = document.body.querySelector(
  //     'button.is-icon--only',
  //   ) as HTMLButtonElement | null;
  //
  //   closeButton?.click();
  //
  //   await nextTick();
  //
  //   await sleep(1000);
  // });
});
