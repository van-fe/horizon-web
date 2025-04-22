import type { VNode } from 'vue';
import type { BaseTreeData, ExtendTreeData } from '~/utils/useTree/types';

export type ModelValueSingleType = (string | number)[];

export type ModelValueType = ModelValueSingleType | ModelValueSingleType[] | undefined | null;

export type NCascaderModelValueType = ModelValueType;

export type NCascaderUuidType = string | number;

export type NCascaderOption = BaseTreeData;

export type NCascaderExtendOption = ExtendTreeData<NCascaderOption>;

export interface NCascaderFilterPathData {
  label: string;
  value: string | number;
  option: NCascaderExtendOption;
}

export type NCascaderFilterFunction = (input: string, paths: NCascaderFilterPathData[]) => boolean;

export type NCascaderFilterSortFunction = (
  a: NCascaderExtendOption,
  b: NCascaderExtendOption,
  inputValue: string,
) => ReturnType<Exclude<Parameters<typeof Array.prototype.sort>[0], undefined>>;

export interface NCascaderSearchParams {
  /**
   * 自定义搜索过滤方法
   */
  filter: NCascaderFilterFunction;

  /**
   * 限制最大展示数量
   */
  limit?: number;

  /**
   * 搜索结果展示面板宽度
   */
  searchPanelWidth?: number | string;

  /**
   * 搜索结果排序
   */
  sort?: NCascaderFilterSortFunction;
}

/**
 * 动态加载时，当前触发加载的选项
 */
export interface NCascaderDynamicLoadNode {
  /**
   * 当前节点层级
   */
  level: number;

  /**
   * 当前节点直到根节点的路径
   */
  options: (NCascaderOption | null)[];

  /**
   * 当前节点 vNode
   */
  vnode?: VNode;
}
