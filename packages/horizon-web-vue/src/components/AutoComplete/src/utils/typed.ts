import type { ResolvedAutoCompleteOption } from '@aurora/core';
import type { HAutoCompleteOption } from '../composables/useProps';

export type { HAutoCompleteOption } from '../composables/useProps';

export interface HAutoCompleteOptionWithUuid extends Omit<HAutoCompleteOption, 'value'> {
  uuid: string;
  value: string;
}

export type HResolvedAutoCompleteOption = ResolvedAutoCompleteOption<
  HAutoCompleteOption['description']
>;
