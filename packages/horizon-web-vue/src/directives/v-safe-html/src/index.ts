import type { DirectiveHook } from 'vue';
import dompurify from 'dompurify';
import { defineDirective } from '@aurora/utils';
import type { SafeHtmlOptions } from './composables/useOptions';
import { useSafeHtmlOptions } from './composables/useOptions';

const fn: DirectiveHook<HTMLElement, unknown, Partial<SafeHtmlOptions> | string> = (
  el,
  binding,
) => {
  let result = '';

  if (typeof binding.value === 'string') {
    result = dompurify.sanitize(binding.value);
  } else if (typeof binding.value === 'object') {
    const { html, options } = binding.value;
    if (html) {
      result = String(dompurify.sanitize(html, options || {}));
    }
  }

  el.innerHTML = result;
};

export default defineDirective<HTMLElement, typeof useSafeHtmlOptions | string>({
  name: 'safe-html',
  options: useSafeHtmlOptions,
  desc: '原生 v-html 指令的替代方案，用于安全地设置 HTML 内容',
  descLocales: { en: 'A safer alternative to native `v-html` for setting HTML content.' },
  mounted: fn,
  updated: fn,
});
