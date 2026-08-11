import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useAsideProps = declarePropType({
  /**
   * 侧边栏宽度，默认300px
    * @en Configuration for width.
   */
  width: {
    type: [String, Number],
    default: null,
  },
});

export const useContainerProps = declarePropType({
  /**
   * 子元素排列方向。如果没有设置此值，且子元素中存在`h-header`或`h-footer`时为`vertical`，否则为`horizontal`
    * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: null,
  },
});

export const useFooterProps = declarePropType({
  /**
   * 底栏高度。默认60px
    * @en Configuration for height.
   */
  height: {
    type: [String, Number],
    default: null,
  },
});

export const useHeaderProps = declarePropType({
  /**
   * 顶栏高度。默认60px
    * @en Configuration for height.
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
