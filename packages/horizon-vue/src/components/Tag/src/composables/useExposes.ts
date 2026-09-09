import type { TagCommandMap, TagGroupCommandMap } from '@aurora/core';
import { tagGroupManifest, tagManifest } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import { createVueExposesFromManifest } from '~/utils/componentManifest';

export const useTagExposes = createVueExposesFromManifest(tagManifest.contract.exposes) as {
  edit: ExposeType<TagCommandMap['edit']>;
};

export const useTagGroupExposes = createVueExposesFromManifest(tagGroupManifest.contract.exposes, {
  rename: { calculate: 'doCollapseCalculate' },
}) as {
  toggle: ExposeType<TagGroupCommandMap['toggle']>;
  doCollapseCalculate: ExposeType<TagGroupCommandMap['calculate']>;
};

export type TagExposes = ExtractExposeTypes<typeof useTagExposes>;
export type TagGroupExposes = ExtractExposeTypes<typeof useTagGroupExposes>;
