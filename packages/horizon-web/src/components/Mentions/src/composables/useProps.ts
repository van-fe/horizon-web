import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export interface HMentionsOption {
  /** 候选项的插入值 @en The value inserted for the candidate. */
  value: string;
  /** 候选项的显示文本 @en The display label for the candidate. */
  label?: string;
  /** 是否禁用该候选项 @en Whether the candidate is disabled. */
  disabled?: boolean;
}

/** @deprecated Use `HMentionsOption` from the package entry instead. */
export type MentionOption = HMentionsOption;

export const useMentionsProps = declarePropType({
  /** 输入值 @en Input value. */ modelValue: { type: String, default: '' },
  /** 候选项 @en Mention candidates. */ options: {
    type: Array as PropType<HMentionsOption[]>,
    default: () => [],
  },
  /** 触发字符 @en Mention trigger characters. */ triggers: {
    type: Array as PropType<string[]>,
    default: () => ['@'],
  },
  /** 选中项后的分隔符 @en Separator appended after a selected mention. */ split: {
    type: String,
    default: ' ',
  },
  /** 输入占位文字 @en Input placeholder. */ placeholder: { type: String },
  /** 是否禁用 @en Whether the input is disabled. */ disabled: { type: Boolean, default: false },
  /** 最大字符数 @en Maximum input length. */ maxlength: { type: Number },
  /** 建议面板最大高度 @en Maximum suggestion panel height. */ maxHeight: {
    type: Number,
    default: 240,
  },
  /**
   * 候选面板的优先弹出方向，空间不足时会自动翻转
   * @en Preferred suggestion placement. It flips automatically when space is limited.
   */
  placement: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom',
  },
  /**
   * 自定义过滤函数
   * @en Custom candidate filter.
   * @param keyword 关键词
   * @paramEn keyword Search keyword.
   * @param option 候选项
   * @paramEn option Candidate option.
   */
  filter: {
    type: Function as PropType<(keyword: string, option: HMentionsOption) => boolean>,
  },
});

export type MentionsProps = ExtractPropTypes<typeof useMentionsProps>;
