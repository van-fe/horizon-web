import type { SlotsType } from 'vue';

export const useInputOtpSlots = Object as SlotsType<{
  /**
   * 自定义单个验证码字符的展示
   * @param character 当前字符
   * @paramEn character Current character.
   * @param index 字符位置
   * @paramEn index Character index.
   * @param filled 当前位置是否已有字符
   * @paramEn filled Whether the cell is filled.
   * @param active 当前位置是否为当前输入位置
   * @paramEn active Whether the cell is the active input position.
   * @en Custom content for each verification-code character.
   */
  character?: {
    character: string;
    index: number;
    filled: boolean;
    active: boolean;
  };
}>;

export type InputOtpSlots = typeof useInputOtpSlots;
