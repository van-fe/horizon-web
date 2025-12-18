import { mount } from '@vue/test-utils';
import NScrollbar from '../src/Scrollbar';
import { describe, expect, test } from 'vitest';

describe('Scrollbar.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NScrollbar />);
    const element = wrapper.findComponent(NScrollbar);

    expect(element.exists()).toBe(true);
  });
});
