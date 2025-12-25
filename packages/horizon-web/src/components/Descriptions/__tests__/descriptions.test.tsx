import { mount } from '@vue/test-utils';
import { HDescriptions, HDescriptionItem } from '../index';
import { describe, expect, test } from 'vitest';

describe('Descriptions.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HDescriptions title="User Info">
        <HDescriptionItem label="Name:" value="bingkun Zhou" />
        <HDescriptionItem label="Telephone:" value="0924-250492" />
        <HDescriptionItem label="Residence:" value="Norway" />
        <HDescriptionItem label="City:" value="Oslo" />
        <HDescriptionItem label="Address:" value="Leg.Kiropraktor Iréne Johnson" />
      </HDescriptions>
    ));
    const element = wrapper.findComponent(HDescriptions);
    const itemElements = wrapper.findAllComponents(HDescriptionItem);

    expect(element.exists()).toBe(true);
    expect(itemElements.length).toBe(5);
  });
});
