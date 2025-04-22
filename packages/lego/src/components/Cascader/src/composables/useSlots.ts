import type { Ref } from 'vue';
import { isBoolean, isObject, isUndefined } from '@nio-fe/shared';
import type { NCascaderExtendOption, NCascaderFilterPathData } from '../utils/types';

export const useCascaderSlots = {
  /**
   * 自定义触发器完整展示内容，相当于直接使用 `cascaderPanel`
   * @param val 是否显示
   */
  default: (val?: { visible: Ref<boolean> }) =>
    isUndefined(val?.visible) || isBoolean(val?.visible.value),
  /**
   * 自定义 `select` 中被选中的项目
   * @param value 每个选项的经转义后的对象
   */
  tagRender: (value: NCascaderExtendOption) => isObject(value),
  /**
   * 自定义 完整 `select` 渲染内容
   */
  selectRender: () => true,
  /**
   * 自定义 `cascaderPanel` 选项渲染内容
   * @param props 当前子元素
   */
  itemRender: (props: NCascaderExtendOption) => isObject(props),
  /**
   * 自定义 `cascaderPanel` 中搜索场景下渲染内容
   * @param data 当前渲染的子选项
   */
  searchPanelRender: (data: { paths: NCascaderFilterPathData[]; inputValue: string }) =>
    isObject(data),
  /**
   * 自定义 `cascaderPanel` 空列表渲染内容
   * @deprecated empty
   */
  emptyRender: () => true,
  /**
   * 自定义 `cascaderPanel` 空列表渲染内容
   * @deprecated empty
   */
  optionEmptyRender: () => true,
  /**
   * 自定义 `cascaderPanel` 空列表渲染内容
   */
  empty: () => true,
  /**
   * 自定义 `cascaderPanel` 确认选中渲染内容
   * @param handler 确认和取消的操作方法，其中 `enterHandle` 会被去除，请勿使用
   */
  confirmRender: (handler: {
    cancelHandle: () => void;
    enterHandle: () => void;
    confirmHandle: () => void;
  }) => isObject(handler),
  /**
   * 自定义面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * 自定义面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 自定义 `panelConfirmLeft` 渲染
   * @version 2.12.15-alpha.3
   */
  panelConfirmLeft: () => true,
};

export type CascaderSlots = typeof useCascaderSlots;
