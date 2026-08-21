import type { ButtonCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useButtonExposes = {
  /** 聚焦实际按钮或链接。 @en Focuses the rendered button or link. */
  focus: Function as ExposeType<ButtonCommandMap['focus']>,
};

export type ButtonExposes = ExtractExposeTypes<typeof useButtonExposes>;
