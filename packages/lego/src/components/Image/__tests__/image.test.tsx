import { mount } from '@vue/test-utils';
import NImage from '../src/Image';
import { describe, expect, test } from 'vitest';

describe('Image.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NImage src="https://www.nio.cn/cdn-static/mynio/nextjs/images/home/vehicle-slider/es7-desktop.png" />
    ));
    const element = wrapper.findComponent(NImage);

    expect(element.exists()).toBe(true);
  });
});
