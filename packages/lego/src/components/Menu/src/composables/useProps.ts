import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { Promisable } from '@nio-fe/shared';
import { declarePropType, isNumber, isString } from '@nio-fe/shared';
import { warn } from '~/utils/useLog';

export const useMenuProps = declarePropType({
  /**
   * 选中菜单值
   */
  selectedValue: {
    type: String,
  },
  /**
   * 菜单展示形式
   * @version 2.0.1
   */
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  /**
   * 主题
   * @version 2.0.1
   */
  theme: {
    type: String as PropType<'default' | 'gray' | 'midnight'>,
    default: 'default',
  },
  /**
   * 菜单是否折叠，只在 `mode = 'vertical'` 时可用
   */
  collapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否省略多余的子项，只有在 `mode = 'horizontal'` 时可用
   */
  ellipsis: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示折叠按钮，只在 `mode = 'vertical'` 时可用
   */
  collapseButton: {
    type: Boolean,
    default: false,
  },
  /**
   * 一级菜单带标题的永久折叠
   */
  collapseForever: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 折叠显示标题
   * @version 2.12.0
   */
  collapseShowTitle: {
    type: Boolean,
    default: false,
  },
  /**
   * 菜单展开是否互斥
   */
  exclusiveExpand: {
    type: Boolean,
    default: false,
  },
  /**
   * 子菜单打开的方式，只有在 `mode = 'horizontal'` 时可用
   */
  menuTrigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'hover',
  },
  /**
   * 是否使用 `vue-router` 模式导航。
   * 启用后会根据子菜单的 `value` 或 `index` 作为路由 `path` 跳转
   */
  router: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用折叠动画
   * @version 2.0.5
   */
  collapseTransition: {
    type: Boolean,
    default: true,
  },
  /**
   * 高度，如果是 Number，会自动加上单位 px
   * `mode = 'vertical'` 时默认 `100%`
   */
  height: {
    type: [Number, String],
  },
  /**
   * 激活态样式
   * `mode = 'vertical'` 只提供 `button` 样式
   * `mode = 'horizontal'` 默认 `link` 样式
   *
   * @version 2.0.5
   */
  activeType: {
    type: String as PropType<'button' | 'link'>,
  },
  /**
   * 容器的最大宽度，只对 `mode = 'horizontal'` 有效
   */
  maxWidth: {
    type: [String, Number],
    default: '100%',
  },
  /**
   * 子菜单展开的模式，仅对 `mode = 'horizontal'` 有效
   * `single`: 只会对当前鼠标悬浮的菜单弹出弹窗
   * `full`: 只要悬浮在菜单任意位置，会把所有子菜单都展示出来
   *
   * @version 2.0.5
   */
  submenuExpandType: {
    type: String as PropType<'single' | 'full'>,
    default: 'single',
  },
  /**
   * 宽度
   * 需要设置在 160 - 240 之间
   * 仅在 `mode = vertical` 时有效
   * @version 2.3.0
   */
  width: {
    type: [String, Number],
    default: 240,
    validator(value: unknown): boolean {
      if (isNumber(value) || isString(value)) {
        if (parseInt(value.toString()) > 240 || parseInt(value.toString()) < 160) {
          warn('menu', 'The width should set between 160 to 240');
          return false;
        } else return true;
      } else return false;
    },
  },
  /**
   * 是否可以拖拽调整大小
   * @version 2.3.0
   */
  resizable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许在拖拽到一定程度后收起菜单栏
   * @version 2.3.0
   */
  resizeToCollapse: {
    type: Boolean,
    default: true,
  },
  /**
   * 使用哪种原生标签渲染
   * @version 2.6.1
   */
  tag: {
    type: String as PropType<'div' | 'a'>,
    default: 'div',
  },
  /**
   * 选择前函数钩子
   * 如果希望控制用户是否可以选择该菜单，可以传入函数判断，并返回一个 `boolean` 值告知是否可选择
   * @version 2.9.1
   */
  beforeSelect: {
    type: Function as PropType<
      (value: string, props: MenuItemProps | SubMenuProps) => Promisable<boolean>
    >,
  },
  /**
   * 在第几层级后开始使用 `dropdown` 展示子层级 （从 `0` 开始计数）
   * @version 2.9.4
   */
  useDropdownLevel: {
    type: Number,
    default: 2,
  },
  /**
   * 是否默认展开全部
   * 只有在第一次挂载时有效，后期层级有变动请使用 `expandAll` 方法
   * @version 2.10.0
   */
  isDefaultExpandAll: {
    type: Boolean,
    default: false,
  },
});

export const useSubMenuProps = declarePropType({
  /**
   * 字体图标名称或对象
   * @version 2.0.1 支持传入组件
   */
  icon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 唯一标识，可以作为 `vue-router` 模式下的路由导航的 `path`
   */
  value: {
    type: String,
  },
  /**
   * 名称，与 `slots.title` 相同，优先级比 `slots.title` 低
   */
  name: {
    type: String,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可选中
   */
  selectable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将 `dropdown` 元素发送到 `body` 上
   */
  toBody: {
    type: Boolean,
    default: false,
  },
  /**
   * `popper` 的偏移量
   */
  popperOffset: {
    type: Number,
    default: 6,
  },
});

export const useMenuItemProps = declarePropType({
  /**
   * 字体图标名称或对象
   * @version 2.0.1 支持传入组件
   */
  icon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 菜单名称
   */
  name: {
    type: String,
  },
  /**
   * 组件值，可以在 `menu.router` 开启后作为 `path`
   */
  value: {
    type: String,
  },
  /**
   * 是否激活
   */
  active: {
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
});

export type MenuProps = ExtractPropTypes<typeof useMenuProps>;
export type SubMenuProps = ExtractPropTypes<typeof useSubMenuProps>;
export type MenuItemProps = ExtractPropTypes<typeof useMenuItemProps>;
