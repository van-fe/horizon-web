import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  TagEventMap,
  TagGroupEventMap,
} from '@aurora/core';
import { tagGroupManifest, tagManifest } from '@aurora/core';
import { isBoolean, isDefined, isString, isUndefined } from '@aurora/utils';
import { createVueEmitsFromManifest } from '~/utils/componentManifest';

type TagVueEvents = AdaptComponentApiShape<
  TagEventMap<MouseEvent>,
  { activeChange: 'update:modelValue'; press: 'click' }
>;

export const useTagEmits = createVueEmitsFromManifest(tagManifest.contract.emits, {
  rename: { activeChange: 'update:modelValue', press: 'click' },
  validators: {
    'update:modelValue': (value: boolean) => isBoolean(value),
    click: (event: MouseEvent) => event instanceof MouseEvent,
    close: (event: MouseEvent) => event instanceof MouseEvent,
  },
}) as ComponentEventValidators<TagVueEvents>;

export const useTagGroupEmits = createVueEmitsFromManifest(tagGroupManifest.contract.emits, {
  validators: {
    created: (content: string) => isString(content),
    edited: (value: string, oldValue: string, id: string | number | symbol | undefined) =>
      isString(value) && isString(oldValue) && (isDefined(id) || isUndefined(id)),
    closed: (id: string | number | symbol | undefined) => isDefined(id) || isUndefined(id),
    toggled: (expanded: boolean) => isBoolean(expanded),
    exceeded: () => true,
  },
}) as ComponentEventValidators<TagGroupEventMap>;

export type TagEmits = typeof useTagEmits;
export type TagGroupEmits = typeof useTagGroupEmits;
