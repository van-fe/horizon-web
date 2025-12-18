import type { BaseTreeData, BaseTreeWithLevelData, ExtendTreeData } from '~/utils/useTree/types';
import type { Component, VNode } from 'vue';
import type { Awaitable } from '@aurora/utils';

export type NTreeUuidType = string | number;

export interface NTreeData extends BaseTreeData {
  /**
   * 前置自定义 icon
   * @version 2.12.10
   */
  prefixIcon?: Component | VNode | string | null;
  /**
   * 是否允许此节点拖拽
   * @version 2.12.10
   */
  draggable?: boolean;
  /**
   * 前缀图标样式类
   */
  prefixIconClassName?: string;
}

export interface NTreeExtendsData extends ExtendTreeData<NTreeData>, NTreeData {
  // empty
}

/**
 * 自定义筛选逻辑
 * @param inputValue: 输入内容
 * @param treeData: 原始 treeData
 */
export type NTreeFilterMethodType = (inputValue: string, node: NTreeExtendsData) => boolean;

/**
 * 自定义高亮逻辑
 * @param inputValue: 输入内容
 * @param treeData: 原始 treeData
 */
export type NTreeHighlightMethod = (inputValue: string, node: NTreeExtendsData) => VNode | string;

export interface NTreeFilterType {
  /**
   * 自定义筛选逻辑
   * @param inputValue: 输入内容
   * @param treeData: 原始 treeData
   */
  filterMethod: NTreeFilterMethodType;

  /**
   * 自定义高亮逻辑
   * @param inputValue: 输入内容
   * @param treeData: 原始 treeData
   */
  highLightMethod: NTreeHighlightMethod;

  /**
   * 是否展开搜索结果子树，默认展开
   */
  expandSearchedTree: boolean;
}

export interface NTreeDynamicLoadNode {
  /**
   * 当前节点层级
   */
  level: number;
  /**
   * 当前节点信息
   */
  node: NExtendTreeNodeData | null;
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

export interface NTreeBaseNodeData {
  vnode?: VNode;
  node: NTreeExtendsData;
  value: string | number;
}

export type NTreeDynamicLoadMethod = (node: NTreeDynamicLoadNode) => Awaitable<NTreeData[]>;
export type NTreeNodeData = NTreeData;
export type NExtendTreeNodeData = NTreeExtendsData;
export type NTreeNodeDataWithLevel = BaseTreeWithLevelData;
export type BaseNode = NTreeBaseNodeData;
