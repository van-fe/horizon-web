import { mount } from '@vue/test-utils';
import Alert from '../src/components/Alert';
import { $alert } from '../../index';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { sleep } from '../../../utils/tools';

describe('alert.tsx', () => {
  test('alert.basic', async () => {
    const wrapper = mount(() => (
      <Alert title="Alert Title" content="Something need to be alerted." />
    ));

    const element = wrapper.findComponent(Alert);

    expect(element.exists()).toBe(true);
  });

  test('alert confirm', async () => {
    $alert('content').then(() => {
      // on close
    });

    const confirmButton = document.body.querySelector(
      '.n-button--primary_positive',
    ) as HTMLButtonElement | null;

    confirmButton?.click();

    await nextTick();

    await sleep(200);

    const dialogContainer = document.body.querySelector('.n-dialog__container')!;

    const style = window.getComputedStyle(dialogContainer);

    expect(style.display).eq('none');
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
