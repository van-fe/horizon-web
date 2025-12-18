import type { CSSProperties, ExtractPropTypes, PropType, VNode, StyleValue } from 'vue';
import { declarePropType } from '@aurora/shared';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';
import type {
  PickerInputStatusType,
  PickerInputStyleType,
} from '~/components/Picker/src/composables/useProps';
import type { NAutoCompleteOption } from '../utils/typed';

export type ModelValueType = string | undefined | null;

export const useAutoCompleteProps = declarePropType({
  /**
   * value 值
   */
  modelValue: {
    type: [String, Object] as PropType<ModelValueType>,
    default: undefined,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否可清空输入框
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'click',
  },
  /**
   * 放置位置
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
   */
  inputStyle: {
    type: String as PropType<PickerInputStyleType>,
    default: 'normal',
  },
  /**
   * 尺寸
   * @default 'medium'
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 占位符，默认使用国际化配置
   */
  placeholder: {
    type: String,
  },
  /**
   * 空时显示文字，默认使用国际化配置
   */
  emptyText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 在隐藏后是否销毁面板
   */
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  /**
   * 给 popover 的额外参数
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
   * @version 2.12.10 支持 fit-content
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 鼠标悬浮后多久显示 `popper`
   * 仅在 `trigger = hover` 时有效
   */
  hoverShowDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 鼠标移出后后多久隐藏 `popper`
   * 仅在 `trigger = hover` 时有效
   */
  hoverHideDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 自定义下拉按钮
   * 可以传入 `n-icon` 的 `name`，也可以直接是 `svg`
   * 如果传入 `false`，即不展示图标
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 自定义样式
   */
  externalStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 自定义 class
   */
  externalClass: {
    type: String,
    default: '',
  },
  /**
   * 自定义面板样式
   */
  externalPanelStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 自定义面板 class
   */
  externalPanelClass: {
    type: String,
    default: undefined,
  },
  /**
   * 是否在无选项时，默认隐藏面板
   */
  hidePanelWhenEmptyList: {
    type: Boolean,
    default: true,
  },
  /**
   * 面板是否处于加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载时自定义文案，默认为空
   */
  loadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否将已选择的选项置顶
   * 只有在重新打开面板时才会排序
   */
  selectedOptionOrderToTop: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入框的状态
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 选项列表最大高度
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: 296,
  },
  /**
   * `n-option` 中 `description` 的位置
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
    default: 'right',
  },
  /**
   * 输入触发事件的频率
   * 请谨慎设置，防止触发过快或过慢导致非预期的问题
   */
  inputEmitFrequency: {
    type: Number,
    default: 200,
  },
  /**
   * 搜索 `icon`
   * 如果不需要搜索 `icon`，则设置为 `false`
   */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   */
  tooltipShowAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 展示的选项
   */
  options: {
    type: Array as PropType<NAutoCompleteOption[]>,
    default: () => [],
  },
  /**
   * 是否在开启虚拟滚动时，允许 `option` 撑开面板
   * @version 2.12.10
   */
  expandPanelByChildren: {
    type: Boolean,
    default: false,
  },
});

export type AutoCompleteProps = ExtractPropTypes<typeof useAutoCompleteProps>;
