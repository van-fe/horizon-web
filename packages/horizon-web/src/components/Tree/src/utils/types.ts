import type { BaseTreeData, BaseTreeWithLevelData, ExtendTreeData } from '~/utils/useTree/types';
import type { Component, VNode } from 'vue';
import type { Awaitable } from '@aurora/utils';

export type HTreeUuidType = string | number;

export interface HTreeData extends BaseTreeData {
  /**
   * 前置自定义 icon
   */
  prefixIcon?: Component | VNode | string | null;
  /**
   * 是否允许此节点拖拽
   */
  draggable?: boolean;
  /**
   * 前缀图标样式类
   */
  prefixIconClassName?: string;
}

export interface HTreeExtendsData extends ExtendTreeData<HTreeData>, HTreeData {
  // empty
}

/**
 * 自定义筛选逻辑
 * @param inputValue: 输入内容
 * @param treeData: 原始 treeData
 */
export type HTreeFilterMethodType = (inputValue: string, node: HTreeExtendsData) => boolean;

/**
 * 自定义高亮逻辑
 * @param inputValue: 输入内容
 * @param treeData: 原始 treeData
 */
export type HTreeHighlightMethod = (inputValue: string, node: HTreeExtendsData) => VNode | string;

export interface HTreeFilterType {
  /**
   * 自定义筛选逻辑
   * @param inputValue: 输入内容
   * @param treeData: 原始 treeData
   */
  filterMethod: HTreeFilterMethodType;

  /**
   * 自定义高亮逻辑
   * @param inputValue: 输入内容
   * @param treeData: 原始 treeData
   */
  highLightMethod: HTreeHighlightMethod;

  /**
   * 是否展开搜索结果子树，默认展开
   */
  expandSearchedTree: boolean;
}

export interface HTreeDynamicLoadNode {
  /**
   * 当前节点层级
   */
  level: number;
  /**
   * 当前节点信息
   */
  node: HExtendTreeNodeData | null;
  /**
   * 当前节点 `vNode`
   * @deprecated `vNode`
   */
  vnode?: VNode;
  /**
   * 当前节点 `vNode`
   */
  vNode?: VNode;
}

export interface HTreeBaseNodeData {
  vnode?: VNode;
  node: HTreeExtendsData;
  value: string | number;
}

export type HTreeDynamicLoadMethod = (node: HTreeDynamicLoadNode) => Awaitable<HTreeData[]>;
export type HTreeNodeData = HTreeData;
export type HExtendTreeNodeData = HTreeExtendsData;
export type HTreeNodeDataWithLevel = BaseTreeWithLevelData;
export type BaseNode = HTreeBaseNodeData;
