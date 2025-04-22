import type { ExtractPropTypes, PropType } from 'vue';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { declarePropType } from '@nio-fe/shared';

export const useColorPickerProps = declarePropType({
  /**
   * 颜色色值，可以是 `rgb(a)`、`hsl(a)`、`hex(a)`、`hsv(a)` 色值形式
   */
  modelValue: {
    type: String,
  },
  /**
   * 选择器大小，不会影响颜色选择器弹出框的面板及内容大小
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 允许使用透明度
   */
  alpha: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发器类型
   */
  triggerType: {
    type: String as PropType<'square' | 'input'>,
    default: 'input',
  },
  /**
   * 方块形状后是否有颜色文字
   * @version 2.3.0
   */
  squareText: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否允许清空色值
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否允许使用编辑框
   */
  editable: {
    type: Boolean,
    default: false,
  },
  /**
   * 编辑色值类型
   * @version 2.10.0
   */
  editMode: {
    type: String as PropType<'hex' | 'rgb' | 'hsl' | 'hsv'>,
    default: 'hex',
  },
  /**
   * 使用编辑框时，允许使用的色值格式
   */
  editableModes: {
    type: Array as PropType<Array<'rgb' | 'hsl' | 'hsv'>>,
    default: () => ['rgb', 'hsl', 'hsv'],
  },
  /**
   * 是否显示色板
   */
  showSwatch: {
    type: Boolean,
    default: false,
  },
  /**
   * 色板数据
   */
  swatches: {
    type: Array as PropType<Array<{ name: string; value: string } | string>>,
    default: () => [],
  },
  /**
   * 是否启用最近使用的颜色
   * 这个数据只会存储在本地
   * @version 2.3.0
   */
  recentlyColors: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许用户保存自定义颜色
   * 这个数据只会存储在本地
   * @version 2.3.0
   */
  customColors: {
    type: Boolean,
    default: false,
  },
  /**
   * 色值最终转换格式
   */
  format: {
    type: String as PropType<'rgb' | 'hsl' | 'hsv' | 'hex'>,
    default: 'hex',
  },
  /**
   * 是否需要确认，如果为否，则在画板上的实时操作会及时通知更新
   */
  needConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * 弹出的 `popover` 的 `props`
   */
  popoverProps: {
    type: Object as PropType<Partial<PopoverProps>>,
    default: () => ({}),
  },
  /**
   * 是否允许使用 [EyeDropper](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper)，启用前请检查浏览器支持性
   */
  enableEyeDropper: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启设置渐变色
   */
  enableGradient: {
    type: Boolean,
    default: false,
  },
  /**
   * 渐变色允许范围
   * @version 2.3.0
   */
  gradientList: {
    type: Array as PropType<Array<'linear' | 'radial' | 'conic'>>,
    default: () => ['linear', 'radial', 'conic'],
  },
  /**
   * 是否在开启了 `editable` 后，输入框内输入的时候会直接更新颜色
   */
  updateOnInput: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否传送到 `body` 节点
   * @version 2.3.0
   */
  toBody: {
    type: Boolean,
    default: false,
  },
});

export type ColorPickerProps = ExtractPropTypes<typeof useColorPickerProps>;
