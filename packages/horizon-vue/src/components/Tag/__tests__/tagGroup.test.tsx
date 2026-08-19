import { mount } from '@vue/test-utils';
import HTagGroup from '../src/TagGroup';
import { describe, expect, test } from 'vitest';

describe('TagGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HTagGroup />);
    const element = wrapper.findComponent(HTagGroup);

    expect(element.exists()).toBe(true);
  });
});
