import type { MentionOption } from './useProps';
export const useMentionsEmits = {
  /** 输入值变化 @en Emitted when the input changes. @param value 输入值 @paramEn value Input value. */ 'update:modelValue':
    (value: string) => typeof value === 'string',
  /** 选中提及项 @en Emitted when a candidate is selected. @param option 候选项 @paramEn option Selected option. @param trigger 触发字符 @paramEn trigger Trigger character. */ select:
    (option: MentionOption, trigger: string) => Boolean(option && trigger),
  /** 搜索内容变化 @en Emitted when the active query changes. @param keyword 关键词 @paramEn keyword Search keyword. @param trigger 触发字符 @paramEn trigger Trigger character. */ search:
    (keyword: string, trigger: string) => typeof keyword === 'string' && Boolean(trigger),
};
export type MentionsEmits = typeof useMentionsEmits;
