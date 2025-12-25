import { shallowMount } from '@vue/test-utils';
import { HRow, HCol } from '../index';
import { describe, expect, test } from 'vitest';

describe('Row.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HRow />);
    const element = wrapper.findComponent(HRow);

    expect(element.exists()).toBe(true);
  });
});

describe('Col.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HCol />);
    const element = wrapper.findComponent(HCol);

    expect(element.exists()).toBe(true);
  });
});
