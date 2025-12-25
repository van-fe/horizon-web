import { mount } from '@vue/test-utils';
import HVSafeHtml from '../index';
import { describe, expect, test } from 'vitest';

describe('v-safe-html.tsx', () => {
  test('basic', async () => {
    const xss = `<span>some text</span><img src="xxx" onerror="console.info('XSS attack with v-html!')">`;

    // vitest bug!
    // TypeError: Cannot read properties of undefined (reading 'call') at ...dompurify@2.4.1/node_modules/dompurify/src/purify.js:880:31

    // const wrapper = mount(() => <div class="wrapper" v-safe-html={xss} />, {
    //   global: {
    //     directives: {
    //       [HVSafeHtml.name]: HVSafeHtml,
    //     },
    //   },
    // });

    // const img = wrapper.find('img');
    //
    // console.info(img.attributes());
    //
    // expect(img.attributes('onerror')).toBe(false);
  });
});
