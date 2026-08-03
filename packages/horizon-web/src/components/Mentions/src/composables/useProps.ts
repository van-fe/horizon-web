import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export interface MentionOption {
  value: string;
  label?: string;
  disabled?: boolean;
}
export const useMentionsProps = declarePropType({
  /** 输入值 @en Input value. */ modelValue: { type: String, default: '' },
  /** 候选项 @en Mention candidates. */ options: {
    type: Array as PropType<MentionOption[]>,
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
  /** 自定义过滤函数 @en Custom candidate filter. */ filter: {
    type: Function as PropType<(keyword: string, option: MentionOption) => boolean>,
  },
});
export type MentionsProps = ExtractPropTypes<typeof useMentionsProps>;
