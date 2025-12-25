import { mount } from '@vue/test-utils';
import { HAlert } from '..';
import { describe, expect, test } from 'vitest';

describe('Alert.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAlert title="成功提示的文案" type="success" />);
    const element = wrapper.findComponent(HAlert);

    expect(element.exists()).toBe(true);
  });
});
