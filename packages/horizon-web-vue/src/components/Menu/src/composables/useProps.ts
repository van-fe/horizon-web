import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { Promisable } from '@aurora/utils';
import { declarePropType, isNumber, isString } from '@aurora/utils';
import { warn } from '~/utils/useLog';

export const useMenuProps = declarePropType({
  /**
   * 选中菜单值
    * @en Configuration for selected value.
   */
  selectedValue: {
    type: String,
  },
  /**
   * 菜单展示形式
    * @en Configuration for mode.
   */
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  /**
   * 主题
    * @en Configuration for theme.
   */
  theme: {
    type: String as PropType<'default' | 'gray' | 'midnight'>,
    default: 'default',
  },
  /**
   * 菜单是否折叠，只在 `mode = 'vertical'` 时可用
    * @en Configuration for collapse.
   */
  collapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否省略多余的子项，只有在 `mode = 'horizontal'` 时可用
    * @en Configuration for ellipsis.
   */
  ellipsis: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示折叠按钮，只在 `mode = 'vertical'` 时可用
    * @en Configuration for collapse button.
   */
  collapseButton: {
    type: Boolean,
    default: false,
  },
  /**
   * 一级菜单带标题的永久折叠
    * @en Configuration for collapse forever.
   */
  collapseForever: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 折叠显示标题
    * @en Configuration for collapse show title.
   */
  collapseShowTitle: {
    type: Boolean,
    default: false,
  },
  /**
   * 菜单展开是否互斥
    * @en Configuration for exclusive expand.
   */
  exclusiveExpand: {
    type: Boolean,
    default: false,
  },
  /**
   * 子菜单打开的方式，只有在 `mode = 'horizontal'` 时可用
    * @en Configuration for menu trigger.
   */
  menuTrigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'hover',
  },
  /**
   * 是否使用 `vue-router` 模式导航。
   * 启用后会根据子菜单的 `value` 或 `index` 作为路由 `path` 跳转
    * @en Configuration for router.
   */
  router: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用折叠动画
    * @en Configuration for collapse transition.
   */
  collapseTransition: {
    type: Boolean,
    default: true,
  },
  /**
   * 高度，如果是 Number，会自动加上单位 px
   * `mode = 'vertical'` 时默认 `100%`
    * @en Configuration for height.
   */
  height: {
    type: [Number, String],
  },
  /**
   * 激活态样式
   * `mode = 'vertical'` 只提供 `button` 样式
   * `mode = 'horizontal'` 默认 `link` 样式
   *
    * @en Configuration for active type.
   */
  activeType: {
    type: String as PropType<'button' | 'link'>,
  },
  /**
   * 容器的最大宽度，只对 `mode = 'horizontal'` 有效
    * @en Configuration for max width.
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
    * @en Configuration for submenu expand type.
   */
  submenuExpandType: {
    type: String as PropType<'single' | 'full'>,
    default: 'single',
  },
  /**
   * 宽度
   * 需要设置在 160 - 240 之间
   * 仅在 `mode = vertical` 时有效
    * @en Configuration for width.
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
    * @en Configuration for resizable.
   */
  resizable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许在拖拽到一定程度后收起菜单栏
    * @en Configuration for resize to collapse.
   */
  resizeToCollapse: {
    type: Boolean,
    default: true,
  },
  /**
   * 使用哪种原生标签渲染
    * @en Configuration for tag.
   */
  tag: {
    type: String as PropType<'div' | 'a'>,
    default: 'div',
  },
  /**
   * 选择前函数钩子
   * 如果希望控制用户是否可以选择该菜单，可以传入函数判断，并返回一个 `boolean` 值告知是否可选择
    * @en Configuration for before select.
   */
  beforeSelect: {
    type: Function as PropType<
      (value: string, props: MenuItemProps | SubMenuProps) => Promisable<boolean>
    >,
  },
  /**
   * 在第几层级后开始使用 `dropdown` 展示子层级 （从 `0` 开始计数）
    * @en Configuration for use dropdown level.
   */
  useDropdownLevel: {
    type: Number,
    default: 2,
  },
  /**
   * 是否默认展开全部
   * 只有在第一次挂载时有效，后期层级有变动请使用 `expandAll` 方法
    * @en Configuration for is default expand all.
   */
  isDefaultExpandAll: {
    type: Boolean,
    default: false,
  },
});

export const useSubMenuProps = declarePropType({
  /**
   * 字体图标名称或对象
    * @en Configuration for icon.
   */
  icon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 唯一标识，可以作为 `vue-router` 模式下的路由导航的 `path`
    * @en Configuration for value.
   */
  value: {
    type: String,
  },
  /**
   * 名称，与 `slots.title` 相同，优先级比 `slots.title` 低
    * @en Configuration for name.
   */
  name: {
    type: String,
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
   * 是否可选中
    * @en Configuration for selectable.
   */
  selectable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将 `dropdown` 元素发送到 `body` 上
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: false,
  },
  /**
   * `popper` 的偏移量
    * @en Configuration for popper offset.
   */
  popperOffset: {
    type: Number,
    default: 6,
  },
});

export const useMenuItemProps = declarePropType({
  /**
   * 字体图标名称或对象
    * @en Configuration for icon.
   */
  icon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 菜单名称
    * @en Configuration for name.
   */
  name: {
    type: String,
  },
  /**
   * 组件值，可以在 `menu.router` 开启后作为 `path`
    * @en Configuration for value.
   */
  value: {
    type: String,
  },
  /**
   * 是否激活
    * @en Configuration for active.
   */
  active: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type MenuProps = ExtractPropTypes<typeof useMenuProps>;
export type SubMenuProps = ExtractPropTypes<typeof useSubMenuProps>;
export type MenuItemProps = ExtractPropTypes<typeof useMenuItemProps>;
