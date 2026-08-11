import type { HTreeNodeData, HTreeNodeDataWithLevel } from '~/components/Tree/src/utils/types';
import type { VNode } from 'vue';
import { isBoolean, isObject, isString, isNumber, isUndefined } from '@aurora/utils';
import type { HTreeSelectModelValueType } from '../utils/types';
import { isTreeModelValue } from '~/components/Tree/src/utils/config';
import { isVNode } from 'vue';

export const useTreeSelectEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (values: HTreeSelectModelValueType | undefined | null) =>
    Array.isArray(values) || isString(values) || isUndefined(values),
  /**
   * 更新变化节点时触发
   * @param values 节点 `value`
   * @paramEn values The values value.
    * @en Emitted when update:expand values changes.
   */
  'update:expandValues': (values: (string | number)[]) => Array.isArray(values),
  /**
   * 动态加载改变时会通知
   * @param data `tree-data` 数据
   * @paramEn data The data value.
    * @en Emitted when update:tree data changes.
   */
  'update:treeData': (data: HTreeNodeData[]) => Array.isArray(data),
  /**
   *  变化时触发
    * @en Emitted when change changes.
   */
  change: (value: HTreeSelectModelValueType | undefined) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isUndefined(value),
  /**
   * panel 面板展开或者收起时触发
   * @param visible 是否展开
   * @paramEn visible The visible value.
    * @en Emitted when visible change changes.
   */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 清空时触发
    * @en Emitted when clear changes.
   */
  clear: () => true,
  /**
   * 输入框聚焦时触发
    * @en Emitted when focus changes.
   */
  focus: () => true,
  /**
   * 输入框失焦时触发
    * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 触发器可输入时输入事件
   * @param value 输入框内容
   * @paramEn value The value value.
    * @en Emitted when input changes.
   */
  input: (value?: string) => isString(value) || isUndefined(value),
  /**
   * 选中时触发
   * @param checkedValues 选中状态 value 列表
   * @paramEn checkedValues The checked values value.
   * @param value 当前操作的 Tree Item 对应的 value
   * @paramEn value The value value.
   * @param e checked: 选中或取消选中\n node: 当前 Tree Item 对应的原始数据信息\n vnode: 当前 Tree Item VNode 节点信息\n allCheckedValues: 全选状态节点 value 列表\n halfCheckedValues: 半选状态节点 value 列表\n nativeEvent: 事件对象
   * @paramEn e The e value.
    * @en Emitted when select changes.
   */
  select: (
    checkedValues: Array<string | number>,
    value: string | number,
    e: {
      checked: boolean;
      node: HTreeNodeData;
      allCheckedValues: (string | number)[];
      halfCheckedValues: (string | number)[];
      vnode?: VNode;
      nativeEvent?: Event;
    },
  ) => Array.isArray(checkedValues) && isTreeModelValue(value) && isObject(e),
  /**
   * expand 触发时调用
   * @param expandValues 已经展开的 value 列表
   * @paramEn expandValues The expand values value.
   * @param value 当前操作的 Tree Item 对应的 value
   * @paramEn value The value value.
   * @param e expanded: 展开还是收起\n nativeEvent: 事件对象\n vnode: 当前 Tree Item VNode 节点信息\n node: 当前 Tree Item 对应的原始数据信息
   * @paramEn e The e value.
    * @en Emitted when expand changes.
   */
  expand: (
    expandValues: (string | number)[],
    value: string | number,
    e: {
      expanded: boolean;
      node: HTreeNodeDataWithLevel;
      nativeEvent?: Event;
      vnode?: VNode;
    },
  ) => Array.isArray(expandValues) && isTreeModelValue(value) && isObject(e),
  /**
   * 节点被点击时触发
   * @param evt 事件对象
   * @paramEn evt The evt value.
   * @param value 当前操作的 Tree Item 对应的 value
   * @paramEn value The value value.
   * @param node 当前操作的 Tree Item 对应的数据信息
   * @paramEn node The node value.
   * @param vnode 当前操作的 Tree Item 对应的 VNode 节点信息
   * @paramEn vnode The vnode value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent, value: string | number, node: HTreeNodeData, vnode?: VNode) =>
    evt instanceof MouseEvent &&
    isTreeModelValue(value) &&
    isObject(node) &&
    (isVNode(vnode) || isUndefined(vnode)),

  /**
   * 节点上右键点击时触发
   * @param evt 事件对象
   * @paramEn evt The evt value.
   * @param value 当前操作的 Tree Item 对应的 value
   * @paramEn value The value value.
   * @param node 当前操作的 Tree Item 对应的数据信息
   * @paramEn node The node value.
   * @param vnode 当前操作的 Tree Item 对应的 VNode 节点信息
   * @paramEn vnode The vnode value.
    * @en Emitted when contextmenu changes.
   */
  contextmenu: (evt: MouseEvent, value: string | number, node: HTreeNodeData, vnode?: VNode) =>
    evt instanceof MouseEvent &&
    isTreeModelValue(value) &&
    isObject(node) &&
    (isVNode(vnode) || isUndefined(vnode)),
  /**
   * 在点击了确认按钮后触发
    * @en Emitted when confirm changes.
   */
  confirm: () => true,
  /**
   * 在点击了取消按钮后触发
    * @en Emitted when cancel changes.
   */
  cancel: () => true,
};

export type TreeSelectEmits = typeof useTreeSelectEmits;
