import { buttonManifest } from '@aurora/core';
import type { ButtonCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import { createVueExposesFromManifest } from '~/utils/componentManifest';

export const useButtonExposes = createVueExposesFromManifest(buttonManifest.contract.exposes) as {
  /** 聚焦实际按钮或链接。 @en Focuses the rendered button or link. */
  focus: ExposeType<ButtonCommandMap['focus']>;
};

export type ButtonExposes = ExtractExposeTypes<typeof useButtonExposes>;
