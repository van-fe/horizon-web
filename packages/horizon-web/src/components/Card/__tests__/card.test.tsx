import { mount } from '@vue/test-utils';
import HCard from '../src/Card';
import { describe, expect, test } from 'vitest';

describe('Card.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HCard />);
    const element = wrapper.findComponent(HCard);

    expect(element.exists()).toBe(true);
  });
});
