import { mount } from '@vue/test-utils';
import HImage from '../src/Image';
import { describe, expect, test } from 'vitest';

describe('Image.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HImage src="https://www.example.com/cdn-static/mydemo/nextjs/images/home/vehicle-slider/es7-desktop.png" />
    ));
    const element = wrapper.findComponent(HImage);

    expect(element.exists()).toBe(true);
  });
});
