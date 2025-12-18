import type { NTreeNodeData, NTreeNodeDataWithLevel } from '~/components/Tree/src/utils/types';
import type { VNode } from 'vue';
import { isBoolean, isObject, isString, isNumber, isUndefined } from '@aurora/shared';
import type { NTreeSelectModelValueType } from '../utils/types';
import { isTreeModelValue } from '~/components/Tree/src/utils/config';
import { isVNode } from 'vue';

export const useTreeSelectEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (values: NTreeSelectModelValueType | undefined | null) =>
    Array.isArray(values) || isString(values) || isUndefined(values),
  /**
   * 更新变化节点时触发
   * @param values 节点 `value`
   */
  'update:expandValues': (values: (string | number)[]) => Array.isArray(values),
  /**
   * 动态加载改变时会通知
   * @param data `tree-data` 数据
   */
  'update:treeData': (data: NTreeNodeData[]) => Array.isArray(data),
  /**
   *  变化时触发
   */
  change: (value: NTreeSelectModelValueType | undefined) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isUndefined(value),
  /**
   * panel 面板展开或者收起时触发
   * @param visible 是否展开
   */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 清空时触发
   */
  clear: () => true,
  /**
   * 输入框聚焦时触发
   */
  focus: () => true,
  /**
   * 输入框失焦时触发
   */
  blur: () => true,
  /**
   * 触发器可输入时输入事件
   * @param value 输入框内容
   */
  input: (value?: string) => isString(value) || isUndefined(value),
  /**
   * 选中时触发
   * @param checkedValues 选中状态 value 列表
   * @param value 当前操作的 Tree Item 对应的 value
   * @param e checked: 选中或取消选中\n node: 当前 Tree Item 对应的原始数据信息\n vnode: 当前 Tree Item VNode 节点信息\n allCheckedValues: 全选状态节点 value 列表\n halfCheckedValues: 半选状态节点 value 列表\n nativeEvent: 事件对象
   */
  select: (
    checkedValues: Array<string | number>,
    value: string | number,
    e: {
      checked: boolean;
      node: NTreeNodeData;
      allCheckedValues: (string | number)[];
      halfCheckedValues: (string | number)[];
      vnode?: VNode;
      nativeEvent?: Event;
    },
  ) => Array.isArray(checkedValues) && isTreeModelValue(value) && isObject(e),
  /**
   * expand 触发时调用
   * @param expandValues 已经展开的 value 列表
   * @param value 当前操作的 Tree Item 对应的 value
   * @param e expanded: 展开还是收起\n nativeEvent: 事件对象\n vnode: 当前 Tree Item VNode 节点信息\n node: 当前 Tree Item 对应的原始数据信息
   */
  expand: (
    expandValues: (string | number)[],
    value: string | number,
    e: {
      expanded: boolean;
      node: NTreeNodeDataWithLevel;
      nativeEvent?: Event;
      vnode?: VNode;
    },
  ) => Array.isArray(expandValues) && isTreeModelValue(value) && isObject(e),
  /**
   * 节点被点击时触发
   * @param evt 事件对象
   * @param value 当前操作的 Tree Item 对应的 value
   * @param node 当前操作的 Tree Item 对应的数据信息
   * @param vnode 当前操作的 Tree Item 对应的 VNode 节点信息
   */
  click: (evt: MouseEvent, value: string | number, node: NTreeNodeData, vnode?: VNode) =>
    evt instanceof MouseEvent &&
    isTreeModelValue(value) &&
    isObject(node) &&
    (isVNode(vnode) || isUndefined(vnode)),

  /**
   * 节点上右键点击时触发
   * @param evt 事件对象
   * @param value 当前操作的 Tree Item 对应的 value
   * @param node 当前操作的 Tree Item 对应的数据信息
   * @param vnode 当前操作的 Tree Item 对应的 VNode 节点信息
   */
  contextmenu: (evt: MouseEvent, value: string | number, node: NTreeNodeData, vnode?: VNode) =>
    evt instanceof MouseEvent &&
    isTreeModelValue(value) &&
    isObject(node) &&
    (isVNode(vnode) || isUndefined(vnode)),
  /**
   * 在点击了确认按钮后触发
   * @version latest
   */
  confirm: () => true,
  /**
   * 在点击了取消按钮后触发
   * @version latest
   */
  cancel: () => true,
};

export type TreeSelectEmits = typeof useTreeSelectEmits;
