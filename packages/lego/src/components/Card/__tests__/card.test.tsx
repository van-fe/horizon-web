import { mount } from '@vue/test-utils';
import NCard from '../src/Card';
import { describe, expect, test } from 'vitest';

describe('Card.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NCard />);
    const element = wrapper.findComponent(NCard);

    expect(element.exists()).toBe(true);
  });
});
