import type { ExtractPropTypes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { declarePropType } from '@aurora/utils';
import { IconPropType } from '~/utils/useIcon';

export const useLinkProps = declarePropType({
  /**
   * 类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<'primary' | 'normal' | 'danger'>,
    default: 'primary',
  },
  /**
   * 是否启用下划线
   * @en Configuration for underline.
   */
  underline: {
    type: [Boolean, String] as PropType<boolean | 'always'>,
    default: true,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生href属性
   * @en Configuration for href.
   */
  href: {
    type: String,
  },
  /**
   * 原生target属性
   * @en Configuration for target.
   */
  target: {
    type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
  },
  /**
   * 是否有注释
   * @en Configuration for attribute.
   */
  attribute: {
    type: Boolean,
    default: false,
  },
  /**
   * 锚点，会对当前 link 增加`id`为此值
   * @en Configuration for anchor.
   */
  anchor: {
    type: String,
  },
  /**
   * 锚点位置
   * @en Configuration for anchor position.
   */
  anchorPosition: {
    type: String as PropType<'right' | 'left'>,
    default: 'right',
  },
  /**
   * 锚点距顶部偏移px
   * @en Configuration for anchor offset.
   */
  anchorOffset: {
    type: Number,
    default: 0,
  },
  /**
   * 字体，即 `a-icon` 的 `name` 属性，或直接传入 icon 对象
   * @en Configuration for icon.
   */
  icon: {
    type: IconPropType,
  },
  /**
   * `a-icon` 的 `size` 属性
   * @en Configuration for icon size.
   */
  iconSize: {
    type: [String, Number],
  },
  /**
   * 路由跳转对象，同 `vue-router` 的 `to`
   * @en Configuration for to.
   */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  /**
   * 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
   * @en Configuration for replace.
   */
  replace: {
    type: Boolean,
    default: false,
  },
  /**
   * 滑动的外包容器，默认为 `body`
   * 设置的如果是 `string` 类型，会传入 `document.querySelector` 获取元素
   * @en Configuration for scroll target.
   */
  scrollTarget: {
    type: [String, Object] as PropType<string | Element>,
    default: 'body',
  },
  /**
   * 大小
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 是否正在加载，内容文字会被国际化替换
   * 需要注意的是，加载中的 `link` 会忽视 `click` 事件
   * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
});

export type LinkProps = ExtractPropTypes<typeof useLinkProps>;
