import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/shared';
import { declareDirectiveOptionType } from '@aurora/shared';
import type DOMPurify from 'dompurify';

export const useSafeHtmlOptions = declareDirectiveOptionType({
  /**
   * 点击目标元素外部区域时调用的函数
   * @param target 事件目标元素
   */
  html: {
    type: String,
    required: true,
  },
  /**
   * 点击目标元素外部区域时调用的函数
   * @param target 事件目标元素
   */
  options: {
    type: Object as DirectiveOptionType<DOMPurify.Config>,
    required: false,
  },
});

export type SafeHtmlOptions = ExtractDirectiveOptionTypes<typeof useSafeHtmlOptions>;
