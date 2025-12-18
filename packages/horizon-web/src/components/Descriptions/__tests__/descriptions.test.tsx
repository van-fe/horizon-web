import { mount } from '@vue/test-utils';
import { NDescriptions, NDescriptionItem } from '../index';
import { describe, expect, test } from 'vitest';

describe('Descriptions.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NDescriptions title="User Info">
        <NDescriptionItem label="Name:" value="bingkun Zhou" />
        <NDescriptionItem label="Telephone:" value="0924-250492" />
        <NDescriptionItem label="Residence:" value="Norway" />
        <NDescriptionItem label="City:" value="Oslo" />
        <NDescriptionItem label="Address:" value="Leg.Kiropraktor Iréne Johnson" />
      </NDescriptions>
    ));
    const element = wrapper.findComponent(NDescriptions);
    const itemElements = wrapper.findAllComponents(NDescriptionItem);

    expect(element.exists()).toBe(true);
    expect(itemElements.length).toBe(5);
  });
});
