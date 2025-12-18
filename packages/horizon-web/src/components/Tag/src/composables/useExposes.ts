import type { ExposeType, ExtractExposeTypes } from '@aurora/shared';

export const useTagExposes = {
  /**
   * 手动触发编辑
   * @param content 预制的输入内容，为 `undefined` 时获取内部渲染的文字
   */
  edit: Function as ExposeType<(content?: string) => void>,
};

export const useTagGroupExposes = {
  /**
   * 手动展开收起
   * @param expand 是否展开，如果不传的话，将会直接切换状态
   */
  toggle: Function as ExposeType<(expand?: boolean) => void>,
  /**
   * 手动触发折叠计算
   * 在某些时候，为了提升性能，可能无法对元素监听，所以在此情况下可以手动调用
   * @version 2.1.0
   */
  doCollapseCalculate: Function as ExposeType<() => void>,
};

export type TagExposes = ExtractExposeTypes<typeof useTagExposes>;
export type TagGroupExposes = ExtractExposeTypes<typeof useTagGroupExposes>;
