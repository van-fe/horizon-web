import { mount } from '@vue/test-utils';
import NTagGroup from '../src/TagGroup';
import { describe, expect, test } from 'vitest';

describe('TagGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NTagGroup />);
    const element = wrapper.findComponent(NTagGroup);

    expect(element.exists()).toBe(true);
  });
});
