import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { HAlert } from '..';

describe('Alert icon', () => {
  test.each([
    ['success', '#26BD4B', 'success_filled'],
    ['info', '#1880F2', 'info_filled'],
    ['warning', '#FDA71C', 'warning_filled'],
    ['error', '#E83030', 'error_filled'],
  ] as const)('keeps the %s icon foreground visible', (type, background, icon) => {
    const wrapper = mount(() => <HAlert type={type} showIcon closable={false} />);
    const svg = wrapper.find('svg');
    const paths = svg.findAll('path');

    expect(svg.classes()).toContain(`h-icon__${icon}`);
    expect(paths[0].attributes('fill')).toBe(background);
    expect(paths[1].attributes('fill')).toBe('#FFFFFF');
  });
});
