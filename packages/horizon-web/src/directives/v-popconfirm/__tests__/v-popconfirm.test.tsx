import { mount } from '@vue/test-utils';
import NVPopconfirm from '../index';
import { NVClickOutside } from '../../v-click-outside';
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
            [NVPopconfirm.name]: NVPopconfirm,
            [NVClickOutside.name]: NVClickOutside,
          },
        },
      },
    );

    const element = wrapper.find('.need-click');

    await element.trigger('click');

    await nextTick();

    expect(document.body.querySelector('.n-popconfirm')).not.eq(null);
  });
});
