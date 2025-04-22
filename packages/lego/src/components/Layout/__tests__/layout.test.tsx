import { shallowMount } from '@vue/test-utils';
import { NRow, NCol } from '../index';
import { describe, expect, test } from 'vitest';

describe('Row.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NRow />);
    const element = wrapper.findComponent(NRow);

    expect(element.exists()).toBe(true);
  });
});

describe('Col.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NCol />);
    const element = wrapper.findComponent(NCol);

    expect(element.exists()).toBe(true);
  });
});
