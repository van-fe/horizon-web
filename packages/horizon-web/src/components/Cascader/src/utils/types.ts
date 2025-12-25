import type { VNode } from 'vue';
import type { BaseTreeData, ExtendTreeData } from '~/utils/useTree/types';

export type ModelValueSingleType = (string | number)[];

export type ModelValueType = ModelValueSingleType | ModelValueSingleType[] | undefined | null;

export type HCascaderModelValueType = ModelValueType;

export type HCascaderUuidType = string | number;

export type HCascaderOption = BaseTreeData;

export type HCascaderExtendOption = ExtendTreeData<HCascaderOption>;

export interface HCascaderFilterPathData {
  label: string;
  value: string | number;
  option: HCascaderExtendOption;
}

export type HCascaderFilterFunction = (input: string, paths: HCascaderFilterPathData[]) => boolean;

export type HCascaderFilterSortFunction = (
  a: HCascaderExtendOption,
  b: HCascaderExtendOption,
  inputValue: string,
) => ReturnType<Exclude<Parameters<typeof Array.prototype.sort>[0], undefined>>;

export interface HCascaderSearchParams {
  /**
   * 自定义搜索过滤方法
   */
  filter: HCascaderFilterFunction;

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
  sort?: HCascaderFilterSortFunction;
}

/**
 * 动态加载时，当前触发加载的选项
 */
export interface HCascaderDynamicLoadNode {
  /**
   * 当前节点层级
   */
  level: number;

  /**
   * 当前节点直到根节点的路径
   */
  options: (HCascaderOption | null)[];

  /**
   * 当前节点 vNode
   */
  vnode?: VNode;
}
