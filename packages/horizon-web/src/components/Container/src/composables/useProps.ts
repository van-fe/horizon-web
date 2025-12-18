import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';

export const useAsideProps = declarePropType({
  /**
   * 侧边栏宽度，默认300px
   * @version 2.0.0-beta.9 支持设定 `'auto'` 和 `var(xxx)` 的 css变量
   */
  width: {
    type: [String, Number],
    default: null,
  },
});

export const useContainerProps = declarePropType({
  /**
   * 子元素排列方向。如果没有设置此值，且子元素中存在`n-header`或`n-footer`时为`vertical`，否则为`horizontal`
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: null,
  },
});

export const useFooterProps = declarePropType({
  /**
   * 底栏高度。默认60px
   */
  height: {
    type: [String, Number],
    default: null,
  },
});

export const useHeaderProps = declarePropType({
  /**
   * 顶栏高度。默认60px
   */
  height: {
    type: [String, Number],
    default: null,
  },
});

export type AsideProps = ExtractPropTypes<typeof useAsideProps>;
export type ContainerProps = ExtractPropTypes<typeof useContainerProps>;
export type FooterProps = ExtractPropTypes<typeof useFooterProps>;
export type HeaderProps = ExtractPropTypes<typeof useHeaderProps>;
