import type { ExtractPropTypes, PropType } from 'vue';

export const useEmptyProps = {
  /**
   * 图片地址
   * 可使用内置图片，列表见文档
   * 可使用自定义图片，建议使用 svg，尺寸 160*160
   * 还可使用插槽自定义
   */
  image: {
    type: String,
    required: false,
  },
  /**
   * 尺寸(图片宽度)
   * 支持内置 small, medium, large 宽度和数值宽度。默认是 medium.
   */
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    required: false,
  },
  /**
   * 描述文字
   * 可使用插槽自定义
   */
  description: {
    type: String,
    required: false,
  },
};

export type EmptyProps = ExtractPropTypes<typeof useEmptyProps>;
