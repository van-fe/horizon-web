import { mount } from '@vue/test-utils';
import { NAlert } from '..';
import { describe, expect, test } from 'vitest';

describe('Alert.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NAlert title="成功提示的文案" type="success" />);
    const element = wrapper.findComponent(NAlert);

    expect(element.exists()).toBe(true);
  });
});
