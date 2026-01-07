import { mount } from '@vue/test-utils';
import HVPopconfirm from '../index';
import { HVClickOutside } from '../../v-click-outside';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

describe('v-popconfirm.tsx', () => {
  test.only('basic', async () => {
    const wrapper = mount(
      () => <div v-popconfirm class="need-click" style="width: 300px; height: 300px;" />,
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVPopconfirm.name]: HVPopconfirm,
            [HVClickOutside.name]: HVClickOutside,
          },
        },
      },
    );

    const element = wrapper.find('.need-click');

    await element.trigger('click');

    await nextTick();

    expect(document.body.querySelector('.h-popconfirm')).not.eq(null);
  });
});
