import type { DirectiveHook } from 'vue';
import dompurify from 'dompurify';
import { defineDirective } from '@aurora/shared';
import type { SafeHtmlOptions } from './composables/useOptions';
import { useSafeHtmlOptions } from './composables/useOptions';
import { useSensor } from '~/utils/useSensor';

const fn: DirectiveHook<HTMLElement, unknown, Partial<SafeHtmlOptions> | string> = (
  el,
  binding,
) => {
  useSensor('v-safe-html', binding.value, 'directive');

  let result = '';

  if (typeof binding.value === 'string') {
    result = dompurify.sanitize(binding.value);
  } else if (typeof binding.value === 'object') {
    const { html, options } = binding.value;
    if (html) {
      result = dompurify.sanitize(html, options || {}) as string;
    }
  }

  el.innerHTML = result;
};

export default defineDirective<HTMLElement, typeof useSafeHtmlOptions | string>({
  name: 'safe-html',
  options: useSafeHtmlOptions,
  desc: '原生 v-html 指令的替代方案，用于安全地设置 HTML 内容',
  mounted: fn,
  updated: fn,
});
