import type { VNode } from 'vue';
import type { NTreeExtendsData, NTreeNodeData, NTreeNodeDataWithLevel } from '../utils/types';
import { isObject, isString, isUndefined } from '@nio-fe/shared';
import { isVNode } from 'vue';
import { isTreeModelValue } from '~/components/Tree/src/utils/config';

export const useTreeEmits = {
  /**
   * 动态加载改变时会通知
   * @param data `tree-data` 数据
   */
  'update:treeData': (data: NTreeNodeData[]) => Array.isArray(data),

  /**
   * 同步展开节点 `values`
   * @param values 节点 `value`
   */
  'update:expandValues': (values: (string | number)[]) => Array.isArray(values),

  /**
   * 同步选中节点 `values`
   * @param values 节点 `value`
   */
  'update:selectedValues': (values: (string | number)[]) => Array.isArray(values),

  /**
   * @invisible
   *
   * 可见选项列表
   * @param values 节点 `value`
   */
  'update:visibleNodes': (values: NTreeExtendsData[]) => Array.isArray(values),
  /**
   * filterValue 触发时调用
   * @param value 过滤的值
   * @version 2.12.15-alpha.3
   */
  'update:filterValue': (value: string | undefined) => isString(value) || isUndefined(value),
  /**
   * expand 触发时调用
   * @param expandValues 已经展开的 value 列表
   * @param value 当前操作的 Tree Item 对应的 value
   * @param e expanded: 展开还是收起\n nativeEvent: 事件对象\n vnode: 当前 Tree Item VNode 节点信息\n node: 当前 Tree Item 对应的原始数据信息 \n nodeComputed: 经计算后的 node 数据，包括父子级关系等
   */
  expand: (
    expandValues: (string | number)[],
    value: string | number,
    e: {
      expanded: boolean;
      node: NTreeNodeDataWithLevel;
      nodeComputed: NTreeExtendsData;
      nativeEvent?: Event;
      vnode?: VNode;
    },
  ) => Array.isArray(expandValues) && isTreeModelValue(value) && isObject(e),

  /**
   * 选中时触发
   * @param checkedValues 选中状态 value 列表
   * @param value 当前操作的 Tree Item 对应的 value
   * @param e checked: 选中或取消选中\n node: 当前 Tree Item 对应的原始数据信息\n vnode: 当前 Tree Item VNode 节点信息\n allCheckedValues: 全选状态节点 value 列表\n halfCheckedValues: 半选状态节点 value 列表\n nativeEvent: 事件对象
   */
  select: (
    checkedValues: (string | number)[],
    value: string | number,
    e: {
      checked: boolean;
      node: NTreeNodeData;
      nodeComputed: NTreeExtendsData;
      allCheckedValues: (string | number)[];
      halfCheckedValues: (string | number)[];
      vnode?: VNode;
      nativeEvent?: Event;
    },
  ) => Array.isArray(checkedValues) && isTreeModelValue(value) && isObject(e),

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
   * 滚动后触顶时触发
   * @version 2.7.0
   */
  reachTop: () => true,
  /**
   * 滚动后触底时触发
   * @version 2.7.0
   */
  reachBottom: () => true,
};

export type TreeEmits = typeof useTreeEmits;
