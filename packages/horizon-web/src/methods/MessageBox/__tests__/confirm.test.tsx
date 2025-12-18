import { mount } from '@vue/test-utils';
import Confirm from '../src/components/Confirm';
import { $confirm } from '../../index';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { sleep } from '../../../utils/tools';

describe('confirm.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <Confirm title="Alert Title" content="Something need to be alerted." />
    ));

    const element = wrapper.findComponent(Confirm);

    expect(element.exists()).toBe(true);
  });

  test('confirm close', async () => {
    $confirm('content').then(close => {
      close();
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
});
