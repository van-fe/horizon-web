import { mount } from '@vue/test-utils';
import HVPopconfirm from '../index';
import { HVClickOutside } from '../../v-click-outside';
import { describe, expect, test } from 'vitest';
import { computed, nextTick, ref } from 'vue';
import { HButton } from '../../../components/Button';

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
        <HButton v-popconfirm={popconfirmOption.value} onClick={onClick}>
          Click
        </HButton>
      ),
      {
        global: {
          directives: {
            [HVPopconfirm.name]: HVPopconfirm,
            [HVClickOutside.name]: HVClickOutside,
          },
        },
      },
    );

    const button = wrapper.findComponent(HButton);

    await button.trigger('click');

    expect(isOnline.value).eq(false);

    const buttons = document.body.querySelectorAll(
      '.h-popconfirm .h-button',
    ) as NodeListOf<HTMLButtonElement>;

    const confirmButton = buttons[1];

    expect(confirmButton?.textContent).eq('0');

    confirmButton?.click();

    await nextTick();

    expect(isOnline.value).eq(true);

    await button.trigger('click');

    const buttons2 = document.body.querySelectorAll(
      '.h-popconfirm .h-button',
    ) as NodeListOf<HTMLButtonElement>;

    const confirmButton2 = buttons2[1];

    expect(confirmButton2?.textContent).eq('1');

    confirmButton2?.click();

    await nextTick();

    expect(isOnline.value).eq(false);
  });
});
