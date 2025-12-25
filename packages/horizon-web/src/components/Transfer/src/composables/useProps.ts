import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export type CheckboxUnionType = string | boolean | number;
export type TransferDataProps = {
  /**
   * 数据的唯一性标识
   */
  key: string | number;
  /**
   * 显示文本
   */
  label?: string;
  /**
   * 禁止选中
   */
  disabled?: boolean;
  isGroup?: boolean;
  children?: TransferDataProps[];
  id?: string | number;
};
export const useTransferProps = declarePropType({
  /**
   * 	Transfer 的数据源
   */
  data: {
    type: Array as PropType<TransferDataProps[]>,
    required: true,
  },
  /**
   * 	绑定的key值
   */
  modelValue: {
    type: Array as PropType<CheckboxUnionType[]>,
    required: false,
    default: () => [],
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 类型
   * @deprecated
   */
  type: {
    type: String as PropType<'normal' | 'work' | 'table'>,
    required: false,
    default: 'normal',
  },
  /**
   * 自定义列表标题
   */
  titles: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ['全选', ''],
  },
  /**
   * 展示搜索框
   */
  filterable: {
    type: [Function, Boolean] as PropType<
      boolean | ((value: string, item: TransferDataProps) => boolean)
    >,
    required: false,
    default: false,
  },
  /**
   * 搜索框占位符
   */
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 自定义搜索方法
   * @version 2.12.5
   */
  filterMethod: {
    type: Function as PropType<(inputValue: string, item: TransferDataProps) => boolean>,
    required: false,
  },

  /**
   * 数据源的字段别名
   */
  props: {
    type: Object as PropType<
      Partial<Record<keyof TransferDataProps, keyof TransferDataProps | string>>
    >,
    required: false,
    default: () => {
      return {
        key: 'key',
        label: 'label',
        disabled: 'disabled',
        checked: 'checked',
        children: 'children',
        isGroup: 'isGroup',
      };
    },
  },
  /**
   * 空数据文本
   */
  emptyTxt: {
    type: Array as PropType<string[]>,
    required: false,
    default: ['暂无数据', '暂无数据'],
  },
  /**
   * 面包屑默认标题
   */
  breadcrumb: {
    type: String,
    required: false,
    default: 'HIO',
  },
  /**
   * 右侧列表元素的排序策略: 若为 original，则保持与数据源相同的顺序； 若为 push，则新加入的元素排在最后； 若为 unshift，则新加入的元素排在最前
   * @version 2.12.5
   */
  targetOrder: {
    type: String as PropType<'original' | 'push' | 'unshift'>,
    required: false,
    default: 'push',
  },
  /**
   * options 字段映射，给定一个字段映射规则以达到在 option 中覆盖默认指定字段名称的目的
   */
  fieldMap: {
    type: Object as PropType<
      Partial<Record<keyof TransferDataProps, keyof TransferDataProps | string>>
    >,
  },
  /**
   * 是否可拖拽
   */
  draggable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 节点被拖拽至可释放目标上时的回调
   */
  onDragOver: {
    type: Function as PropType<(e: DragEvent, item: TransferDataProps) => void>,
    required: false,
  },
  /**
   * 节点开始拖拽的回调
   */
  onDragStart: {
    type: Function as PropType<(e: DragEvent, item: TransferDataProps) => void>,
    required: false,
  },
  /**
   * 节点结束拖拽的回调
   */
  onDragEnd: {
    type: Function as PropType<(e: DragEvent, item: TransferDataProps) => void>,
    required: false,
  },
  /**
   * 节点离开可释放目标上时的回调
   */
  onDragLeave: {
    type: Function as PropType<(e: DragEvent, item: TransferDataProps) => void>,
    required: false,
  },
  /**
   * 节点在可释放目标上释放时的回调
   */
  onDrop: {
    type: Function as PropType<
      (e: DragEvent, dropItem: TransferDataProps, dragItem: TransferDataProps) => void
    >,
    required: false,
  },
  /**
   * work类型输入回调，具有过滤功能
   * @deprecated `filterable`
   */
  workInputFn: {
    type: Function as PropType<(item: any, input: string) => boolean>,
    required: false,
  },
});
export const useTransferPanelProps = declarePropType({
  /**
   * 数据
   */
  data: {
    type: Array as PropType<TransferDataProps[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  props: {
    type: Object as PropType<
      Partial<Record<keyof TransferDataProps, keyof TransferDataProps | string>>
    >,
    required: true,
    default: () => {
      return {
        key: 'key',
        label: 'label',
        disabled: 'disabled',
        checked: 'checked',
        children: 'children',
      };
    },
  },
  /**
   * 面包屑默认标题
   */
  breadcrumb: {
    type: String,
    required: false,
    default: 'HIO',
  },
  checkedArr: {
    type: Array as PropType<CheckboxUnionType[]>,
    required: false,
    default: () => [],
  },
  type: {
    type: String,
    required: true,
  },
  filterable: {
    type: [Function, Boolean] as PropType<((value: string, item: any) => boolean) | boolean>,
    required: false,
    default: false,
  },
  filterMethod: {
    type: Function as PropType<(inputValue: string, item: TransferDataProps) => boolean>,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Please Input',
  },
  /**
   * 是否可拖拽
   */
  draggable: {
    type: Boolean,
    required: false,
    default: false,
  },
  onDragOver: {
    type: Function as PropType<(e: DragEvent, item: any) => void>,
    required: false,
  },
  onDragStart: {
    type: Function as PropType<(e: DragEvent, item: any) => void>,
    required: false,
  },
  onDragEnd: {
    type: Function as PropType<(e: DragEvent, item: any) => void>,
    required: false,
  },
  onDragLeave: {
    type: Function as PropType<(e: DragEvent, item: any) => void>,
    required: false,
  },
  onDrop: {
    type: Function as PropType<(e: DragEvent, item: any, dragItem: any, position: number) => void>,
    required: false,
  },
  /**
   * 空数据文本
   */
  emptyTxt: {
    type: String,
    required: false,
    default: '无数据',
  },
});

export type TransferProps = ExtractPropTypes<typeof useTransferProps>;
export type TransferPanelProps = ExtractPropTypes<typeof useTransferPanelProps>;
