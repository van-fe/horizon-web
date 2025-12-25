import { mount } from '@vue/test-utils';
import HAvatar from '..';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

const errorImageUrl = 'https://cdn-app.nio.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg';

describe('Avatar.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAvatar />);
    const element = wrapper.findComponent(HAvatar);

    expect(element.exists()).toBe(true);
  });

  test('error', async () => {
    const wrapper = mount(() => <HAvatar src={errorImageUrl} />);

    wrapper.find('img').trigger('error');

    await nextTick()
    
    expect(wrapper.find('img').attributes('src')).toEqual('https://cdn-app.nio.com/horizon-web/defaultAvatar.jpg')
  })
});
