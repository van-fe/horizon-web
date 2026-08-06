import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { Awaitable } from '@aurora/utils';
import { declarePropType, isNumber } from '@aurora/utils';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import { warn } from '~/utils/useLog';

export const useTagProps = declarePropType({
  /**
   * `tag` 唯一标识符，在修改其内容时可以对外抛事件来判断是哪个标签被修改
   * @en Configuration for id.
   */
  id: {
    type: [String, Number, Symbol],
  },
  /**
   * 需要做到类似于 `checkbox` 的功能，传入 `boolean` 值即可
   * @en Configuration for model value.
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'error' | '' | 'hollow'>,
    validator(value: unknown): boolean {
      if (value === 'hollow') {
        warn(
          'tag',
          `Tag's prop (type) won't receive 'hollow' value. It will replaced with 'prop.plain'.`,
        );
      }

      return (
        value === undefined ||
        (typeof value === 'string' && ['success', 'info', 'warning', 'error', ''].includes(value))
      );
    },
  },
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    validator(value: unknown): boolean {
      if (typeof value === 'string') {
        if (value === 'mini') {
          warn(
            'tag',
            `Tag's prop (size) won't receive 'mini' value. It will replaced with 'small' value.`,
          );
          return false;
        } else return ['small', 'medium', 'large'].includes(value);
      } else return false;
    },
  },
  /**
   * 是否加粗
   * @en Configuration for bold.
   */
  bold: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许点击
   * @en Configuration for clickable.
   */
  clickable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否允许关闭
   * @en Configuration for closable.
   */
  closable: {
    type: Boolean,
    default: false,
  },
  /**
   * @invisible tag没有自己的拦截器，所以不推荐直接设置
   * 是否可以编辑
   * @en Configuration for editable.
   */
  editable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用，禁用时不会显示 `关闭icon`
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是线性样式
   * @en Configuration for plain.
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启圆角
   * @en Configuration for round.
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * 头像链接地址
   * @en Configuration for avatar.
   */
  avatar: {
    type: String,
  },
  /**
   * 图标
   * @en Configuration for icon.
   */
  icon: {
    type: [Object, String] as PropType<Component | string>,
    validator(value: unknown): boolean {
      return ['object', 'string'].includes(typeof value) || value === undefined;
    },
  },
  /**
   * 标签的长宽是否相同
   * @en Configuration for equally.
   */
  equally: {
    type: Boolean,
    default: false,
  },
  /**
   * 在 `equally`、`closable`、`clickable` 同时设置时，鼠标悬浮后多久显示关闭按钮
   * 单位 `ms`
   * @en Configuration for show close delay.
   */
  showCloseDelay: {
    type: Number,
    default: 1000,
  },
  /**
   * 用于自动生成各状态配色的基础色
   * @en Base color used to derive colors for each state automatically.
   */
  color: {
    type: String as PropType<
      string | 'brand' | 'lime' | 'indigo' | 'purple' | 'magenta' | 'orange'
    >,
  },
  /**
   * 背景颜色
   * @en Configuration for background.
   */
  background: {
    type: String as PropType<string>,
  },
  /**
   * 是否处于加载中
   * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * `tooltip` 文本或选项
   * @en Configuration for tooltip.
   */
  tooltip: {
    type: [String, Object, Boolean] as PropType<string | Partial<TooltipProps> | boolean>,
    default: undefined,
  },
  /**
   * `tooltip` 显示延迟时间
   * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
    default: 200,
  },
  /**
   * `tooltip` 消失延迟时间
   * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 禁用渐变动画
   * 在某些性能有瓶颈时可以设置为 `true`
   * @en Configuration for disable transitions.
   */
  disableTransitions: {
    type: Boolean,
    default: false,
  },
  /**
   * @invisible
   * 是否是创建标签，内部使用
   * @en Configuration for is create tag.
   */
  isCreateTag: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是一个只渲染 `default` 插槽的 `tag`
   * @en Configuration for is pure.
   */
  isPure: {
    type: Boolean,
    default: false,
  },
  /**
   * @invisible
   * 是否是一个省略+N的tag， 仅内部使用此属性
   * @en Configuration for is ellipsis.
   */
  isEllipsis: {
    type: Boolean,
    default: false,
  },
  /**
   * @invisible
   * 是否是在popover中展示，是则不进行折叠计算。仅内部使用此属性
   * @en Configuration for is in popover.
   */
  isInPopover: {
    type: Boolean,
    default: false,
  },
});

export const useTagGroupProps = declarePropType({
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    validator(value: unknown): boolean {
      if (typeof value === 'string') {
        if (value === 'mini') {
          warn(
            'tagGroup',
            `Tag's prop (size) won't receive 'mini' value. It will replaced with 'small' value.`,
          );
          return false;
        } else return ['small', 'medium', 'large'].includes(value);
      } else return false;
    },
  },
  /**
   * 是否可以编辑
   * @en Configuration for editable.
   */
  editable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 超出是否折叠
   * @en Configuration for collapse.
   */
  collapse: {
    type: Boolean,
    default: true,
  },
  /**
   * 折叠按钮的 `props`
   * @en Configuration for collapse tag props.
   */
  collapseTagProps: {
    type: Object as PropType<Partial<TagProps>>,
  },
  /**
   * 是否可以点击展开所有隐藏的tag
   * @en Configuration for expand.
   */
  expand: {
    type: Boolean,
    default: false,
  },
  /**
   * 折叠的数量是否显示 `tooltip`
   * @en Configuration for collapse use tooltip.
   */
  collapseUseTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * @verison latest
   * 折叠 `tooltip` 展示的内容
   * `innerText`: 展示每个元素的文字内容
   * `full`: 完整渲染元素
   * @en Configuration for tooltip render type.
   */
  tooltipRenderType: {
    type: String as PropType<'innerText' | 'full'>,
    default: 'innerText',
  },
  /**
   * 在超出隐藏时，显示的剩余的词组的分隔符
   * @en Configuration for separator.
   */
  separator: {
    type: String,
    default: '、',
  },
  /**
   * 是否启用创建标签功能
   * @en Configuration for use create.
   */
  useCreate: {
    type: Boolean,
    default: false,
  },
  /**
   * 创建标签的 `props`
   * @en Configuration for create tag props.
   */
  createTagProps: {
    type: Object as PropType<Partial<TagProps>>,
  },
  /**
   * 创建完成前回调，返回 `false` 或 `Promise.reject` 取消该标签的创建
   * 如果是一个异步函数，则会出现 `loading` 状态
   * @param content 创建的内容
   * @paramEn content The content value.
   * @en Configuration for before create.
   */
  beforeCreate: {
    type: Function as PropType<(content: string) => Awaitable<boolean>>,
  },
  /**
   * 修改完成前的回调，返回 `false` 或 `Promise.reject` 取消该标签的修改
   * 如果是一个异步函数，则会出现 `loading` 状态
   * @param content 修改的内容
   * @paramEn content The content value.
   * @param oldValue 原值
   * @paramEn oldValue The old value value.
   * @param id `tag` 唯一标识符
   * @paramEn id The id value.
   * @en Configuration for before edit.
   */
  beforeEdit: {
    type: Function as PropType<
      (
        content: string,
        oldValue: string,
        id: number | string | symbol | undefined,
      ) => Awaitable<boolean>
    >,
  },
  /**
   * 关闭完成前的回调，返回 `false` 或 `Promise.reject` 取消该标签的关闭
   * 如果是一个异步函数，则会出现 `loading` 状态
   * @param id `tag` 唯一标识符
   * @paramEn id The id value.
   * @en Configuration for before close.
   */
  beforeClose: {
    type: Function as PropType<(id: number | string | symbol | undefined) => Awaitable<boolean>>,
  },
  /**
   * 创建标签的文本，默认使用国际化的 `添加标签`
   * @en Configuration for create text.
   */
  createText: {
    type: String,
  },
  /**
   * 限制最多有多少标签，达到数量后将不会显示创建标签
   * @en Configuration for max tags.
   */
  maxTags: {
    type: Number,
    default: Infinity,
  },
  /**
   * 禁用渐变动画
   * 在某些性能有瓶颈时可以设置为 `true`
   * @en Configuration for disable transitions.
   */
  disableTransitions: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否撑满容器，会导致最后一个 `tag` 出现省略号
   * 在展开折叠时无效
   * @en Configuration for fill up.
   */
  fillUp: {
    type: Boolean,
    default: false,
  },
  /**
   * 最少展示的 `Tag` 个数
   * @en Configuration for min displayed.
   */
  minDisplayed: {
    type: Number,
    validator: (val: unknown) => {
      if (!isNumber(val)) {
        console.error('[horizon-web tag-group]: You must pass number value to minDisplayed.');
        return false;
      }

      if (val < 0) {
        console.error(
          `[horizon-web tag-group]: You can't pass number less than 0 to minDisplayed.`,
        );
        return false;
      }

      return true;
    },
  },
  /**
   * 弹出层内部包裹元素的 `class`
   * @en Configuration for popper inner class.
   */
  popperInnerClass: {
    type: String,
  },
  /**
   * `tooltip` 显示延迟时间
   * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
  },
  /**
   * `tooltip` 消失延迟时间
   * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
  },
});

export type TagProps = ExtractPropTypes<typeof useTagProps>;
export type TagGroupProps = ExtractPropTypes<typeof useTagGroupProps>;
