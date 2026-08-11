import { mount } from '@vue/test-utils';
import HVSafeHtml from '../index';
import { describe, expect, test } from 'vitest';

describe('v-safe-html.tsx', () => {
  test('sanitizes unsafe attributes while preserving safe markup', () => {
    const xss = `<span>some text</span><img src="xxx" onerror="console.info('XSS attack with v-html!')">`;

    const wrapper = mount(() => <div class="wrapper" v-safe-html={xss} />, {
      global: {
        directives: {
          [HVSafeHtml.name]: HVSafeHtml,
        },
      },
    });

    expect(wrapper.get('span').text()).toBe('some text');
    expect(wrapper.get('img').attributes('src')).toBe('xxx');
    expect(wrapper.get('img').attributes('onerror')).toBeUndefined();
  });
});
