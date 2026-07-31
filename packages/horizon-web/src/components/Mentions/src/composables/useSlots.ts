import type { SlotsType } from 'vue';
import type { MentionOption } from './useProps';
export const useMentionsSlots = Object as SlotsType<{
  /** 自定义候选项 @en Custom candidate. */ option?: { option: MentionOption; active: boolean };
  /** 空候选内容 @en Empty suggestion content. */ empty?: {};
}>;
export type MentionsSlots = typeof useMentionsSlots;
