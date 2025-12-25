import { mount } from '@vue/test-utils';
import HScrollbar from '../src/Scrollbar';
import { describe, expect, test } from 'vitest';

describe('Scrollbar.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HScrollbar />);
    const element = wrapper.findComponent(HScrollbar);

    expect(element.exists()).toBe(true);
  });
});
