import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { RadioCommandMap } from '@aurora/core';

export const useRadioExposes = {
  /** 聚焦原生单选输入。@en Focuses the native radio input. */
  focus: Function as ExposeType<RadioCommandMap['focus']>,
};

export type RadioExposes = ExtractExposeTypes<typeof useRadioExposes>;
