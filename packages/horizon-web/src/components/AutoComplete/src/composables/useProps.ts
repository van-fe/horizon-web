import type { CSSProperties, ExtractPropTypes, PropType, VNode, StyleValue } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';
import type {
  PickerInputStatusType,
  PickerInputStyleType,
} from '~/components/Picker/src/composables/useProps';
import type { HAutoCompleteOption } from '../utils/typed';

export type ModelValueType = string | undefined | null;

export const useAutoCompleteProps = declarePropType({
  /**
   * value 值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Object] as PropType<ModelValueType>,
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
   * 是否可清空输入框
    * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'click',
  },
  /**
   * 放置位置
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
      | 'left'
    >,
    default: 'bottom-start',
  },
  /**
   * 是否发送到 body 节点
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 选择器输入框样式
   * `normal`: 基础样式
   * `emphasize`: 面性样式
   * `no-border`: 无边框样式
    * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<PickerInputStyleType>,
    default: 'normal',
  },
  /**
   * 尺寸
   * @default 'medium'
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 占位符，默认使用国际化配置
    * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
  },
  /**
   * 空时显示文字，默认使用国际化配置
    * @en Configuration for empty text.
   */
  emptyText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 在隐藏后是否销毁面板
    * @en Configuration for destroy on hide.
   */
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  /**
   * 给 popover 的额外参数
    * @en Configuration for popover options.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
    * @en Configuration for fit input width.
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 鼠标悬浮后多久显示 `popper`
   * 仅在 `trigger = hover` 时有效
    * @en Configuration for hover show delay.
   */
  hoverShowDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 鼠标移出后后多久隐藏 `popper`
   * 仅在 `trigger = hover` 时有效
    * @en Configuration for hover hide delay.
   */
  hoverHideDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 自定义下拉按钮
   * 可以传入 `a-icon` 的 `name`，也可以直接是 `svg`
   * 如果传入 `false`，即不展示图标
    * @en Configuration for dropdown icon.
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 自定义样式
    * @en Configuration for external style.
   */
  externalStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 自定义 class
    * @en Configuration for external class.
   */
  externalClass: {
    type: String,
    default: '',
  },
  /**
   * 自定义面板样式
    * @en Configuration for external panel style.
   */
  externalPanelStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 自定义面板 class
    * @en Configuration for external panel class.
   */
  externalPanelClass: {
    type: String,
    default: undefined,
  },
  /**
   * 是否在无选项时，默认隐藏面板
    * @en Configuration for hide panel when empty list.
   */
  hidePanelWhenEmptyList: {
    type: Boolean,
    default: true,
  },
  /**
   * 面板是否处于加载中
    * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载时自定义文案，默认为空
    * @en Configuration for loading text.
   */
  loadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否将已选择的选项置顶
   * 只有在重新打开面板时才会排序
    * @en Configuration for selected option order to top.
   */
  selectedOptionOrderToTop: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入框的状态
    * @en Configuration for input status.
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 选项列表最大高度
    * @en Configuration for option list max height.
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: 296,
  },
  /**
   * `h-option` 中 `description` 的位置
    * @en Configuration for description position.
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
    default: 'right',
  },
  /**
   * 输入触发事件的频率
   * 请谨慎设置，防止触发过快或过慢导致非预期的问题
    * @en Configuration for input emit frequency.
   */
  inputEmitFrequency: {
    type: Number,
    default: 200,
  },
  /**
   * 搜索 `icon`
   * 如果不需要搜索 `icon`，则设置为 `false`
    * @en Configuration for search icon.
   */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
    * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
    * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 展示的选项
    * @en Configuration for options.
   */
  options: {
    type: Array as PropType<HAutoCompleteOption[]>,
    default: () => [],
  },
  /**
   * 是否在开启虚拟滚动时，允许 `option` 撑开面板
    * @en Configuration for expand panel by children.
   */
  expandPanelByChildren: {
    type: Boolean,
    default: false,
  },
});

export type AutoCompleteProps = ExtractPropTypes<typeof useAutoCompleteProps>;
