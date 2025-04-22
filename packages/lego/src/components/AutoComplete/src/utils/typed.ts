import type { VNode } from 'vue';

export interface NAutoCompleteOption {
  /**
   * 选项的展示内容
   */
  label: string;
  /**
   * 选项的值，如果没设置则以 `label` 为主
   */
  value?: string;
  /**
   * 辅助说明文字或 VNode 节点
   */
  description?: string | VNode;
}

export interface NAutoCompleteOptionWithUuid extends NAutoCompleteOption {
  uuid: string;
}
