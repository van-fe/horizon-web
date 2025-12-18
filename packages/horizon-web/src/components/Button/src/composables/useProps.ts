import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { Awaitable } from '@aurora/shared';
import { declarePropType } from '@aurora/shared';
import type { RouteLocationRaw } from 'vue-router';
import { warn } from '~/utils/useLog';

export const useButtonProps = declarePropType({
  /**
   * 按钮类型
   * 此字段由其他属性替代:
   * `secondary`: 请改用 `plain`
   * `text`: 请改用 `text`
   */
  type: {
    type: String as PropType<'primary' | 'normal' | 'danger' | 'secondary' | 'text' | 'tertiary'>,
    default: 'primary',
    validator(value: unknown): boolean {
      if (value === 'secondary') {
        warn('button', 'type = `secondary` is deprecated. Please use `props.plain` instead.');
      }

      if (value === 'text') {
        warn('button', 'type = `text` is deprecated. Please use `props.text` instead.');
      }

      if (value === 'tertiary') {
        warn('button', 'type = `tertiary` is deprecated. Please use `props.active` instead.');
      }

      return (
        typeof value === 'string' &&
        ['primary', 'secondary', 'normal', 'text', 'danger'].includes(value)
      );
    },
  },
  /**
   * 类型
   * 此字段由其他属性替代:
   * `neutral`: 请改为 `type = 'normal'`
   * `negative`: 请改用 `danger`
   * @deprecated
   */
  kind: {
    type: String as PropType<'positive' | 'neutral' | 'negative'>,
    default: 'positive',
    validator(value: unknown): boolean {
      if (value === 'negative') {
        warn(
          'button',
          "kind = `negative` is deprecated. Please use `props.type = 'danger'` instead.",
        );
      }

      if (value === 'neutral') {
        warn(
          'button',
          "kind = `neutral` is deprecated. Please use `props.type = 'normal'` instead.",
        );
      }

      return typeof value === 'string' && ['positive', 'neutral', 'negative'].includes(value);
    },
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'huge' | 'large' | 'medium' | 'small' | 'mini'>,
    validator(value: unknown): boolean {
      if (value === 'mini') {
        warn('button', 'size = `mini` is deprecated. Please use `small` value.');
      }

      return (
        typeof value === 'string' && ['huge', 'large', 'medium', 'small', 'mini'].includes(value)
      );
    },
  },
  /**
   * 是否是椭圆按钮
   * @version 2.0.0
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是文字按钮
   * @version 2.0.0
   */
  text: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是链接按钮
   * @version 2.0.0
   */
  link: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自适应父宽度
   * @version 2.0.0
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是简洁按钮，与 `type='secondary'`效果相同
   * @version 2.0.0
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否激活按钮
   * @version 2.0.0
   */
  active: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自动聚焦
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否处于加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自适应启用最小宽度
   */
  autoFit: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标，请传入图标对象
   */
  icon: {
    type: [Object, String] as PropType<Component | string>,
    validator(value: unknown): boolean {
      return ['object', 'string'].includes(typeof value) && value !== null;
    },
  },
  /**
   * 图标尺寸
   */
  iconSize: {
    type: [String, Number],
  },
  /**
   * 按钮 `type` 的原生属性
   */
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  /**
   * 使用哪种原生渲染 `button`
   * @version 2.0.0
   */
  tag: {
    type: String as PropType<'button' | 'div' | 'a'>,
    default: 'button',
  },
  /**
   * 点击跳转链接，使用 `location.href`
   * 优先级高于 `to`
   */
  href: {
    type: String,
  },
  /**
   * 点击跳转的目标，使用 `router.push`
   * 优先级高于 `debounce-fn`
   */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  /**
   * 需结合 `to` 字段一起使用
   * 是否用 `router.replace` 而不是 `router.push`
   */
  replace: {
    type: Boolean,
    default: false,
  },
  /**
   * 链接打开目标对象
   * 只针对 `href` 有效
   */
  target: {
    type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
    default: '_self',
  },
  /**
   * 防抖调用函数
   */
  debounceFn: {
    type: Function as PropType<() => Awaitable<any>>,
  },
  /**
   * 防抖过程中的按钮状态控制
   * `disabled`: 防抖时自动控制按钮的 `disabled` 属性
   * `loading`: 防抖时自动控制按钮的 `loading` 属性
   * `none`: 仅做防抖控制
   */
  debounceType: {
    type: String as PropType<'disabled' | 'loading' | 'none'>,
  },
  /**
   * 是否强制使用最新尺寸规则
   * @version 2.0.2
   */
  forceNewestSize: {
    type: Boolean,
    default: false,
  },
  /**
   * 幽灵按钮
   * @version 2.4.0
   */
  ghost: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义文字颜色
   * @version 2.8.0
   */
  color: {
    type: String,
  },
  /**
   * 按钮边框样式
   * @version 2.8.0
   */
  borderStyle: {
    type: String as PropType<'solid' | 'dashed' | 'dotted'>,
    default: 'solid',
  },
});

export const useButtonGroupProps = declarePropType({
  /**
   * 控制按钮组内按钮的尺寸
   */
  size: {
    type: String as PropType<'huge' | 'large' | 'medium' | 'small'>,
  },
  /**
   * 控制按钮组内按钮的类型
   */
  type: {
    type: String as PropType<'primary' | 'normal' | 'danger'>,
  },
});

export type ButtonProps = ExtractPropTypes<typeof useButtonProps>;
export type ButtonGroupProps = ExtractPropTypes<typeof useButtonGroupProps>;
