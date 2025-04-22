import { mount } from '@vue/test-utils';
import NVPopconfirm from '../index';
import { NVClickOutside } from '../../v-click-outside';
import { describe, expect, test } from 'vitest';
import { computed, nextTick, ref } from 'vue';
import { NButton } from '../../../components/Button';

describe('v-popconfirm.tsx', () => {
  test.only('update options', async () => {
    const isOnline = ref(false);

    const popconfirmOption = computed(() => ({
      title: 'ok?',
      okText: isOnline.value ? '1' : '0',
    }));

    const onClick = () => {
      isOnline.value = !isOnline.value;
    };

    const wrapper = mount(
      () => (
        <NButton v-popconfirm={popconfirmOption.value} onClick={onClick}>
          Click
        </NButton>
      ),
      {
        global: {
          directives: {
            [NVPopconfirm.name]: NVPopconfirm,
            [NVClickOutside.name]: NVClickOutside,
          },
        },
      },
    );

    const button = wrapper.findComponent(NButton);

    await button.trigger('click');

    expect(isOnline.value).eq(false);

    console.warn(document.body.innerHTML);

    const buttons = document.body.querySelectorAll(
      '.n-popconfirm .n-button',
    ) as NodeListOf<HTMLButtonElement>;

    const confirmButton = buttons[1];

    expect(confirmButton?.textContent).eq('0');

    confirmButton?.click();

    await nextTick();

    expect(isOnline.value).eq(true);

    await button.trigger('click');

    const buttons2 = document.body.querySelectorAll(
      '.n-popconfirm .n-button',
    ) as NodeListOf<HTMLButtonElement>;

    const confirmButton2 = buttons2[1];

    expect(confirmButton2?.textContent).eq('1');

    confirmButton2?.click();

    await nextTick();

    expect(isOnline.value).eq(false);
  });
});
