import { buttonManifest } from '@aurora/core';
import type {
  AdaptComponentApiShape,
  ButtonEventMap,
  ComponentEventValidators,
} from '@aurora/core';
import { createVueEmitsFromManifest } from '~/utils/componentManifest';

type ButtonVueEvents = AdaptComponentApiShape<
  ButtonEventMap<MouseEvent>,
  { press: 'click'; actionFinished: 'debounceFinished'; actionError: 'debounceError' },
  never,
  { focus: [event: FocusEvent]; blur: [event: FocusEvent] }
>;

export const useButtonEmits = createVueEmitsFromManifest(buttonManifest.contract.emits, {
  rename: {
    press: 'click',
    actionFinished: 'debounceFinished',
    actionError: 'debounceError',
  },
  validators: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  extend: {
    focus: (event: FocusEvent) => event instanceof FocusEvent,
    blur: (event: FocusEvent) => event instanceof FocusEvent,
  },
}) as ComponentEventValidators<ButtonVueEvents>;

export type ButtonEmits = typeof useButtonEmits;
