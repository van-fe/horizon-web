import type { InjectionKey, SetupContext } from 'vue';
import type ColorPickerColor from './ColorPickerColor';
import type { ColorPickerProps as ColorPickerPropsType } from '../composables/useProps';
import type { LegoSetupContext } from '@aurora/shared';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { ColorPickerSlots } from '~/components/ColorPicker/src/composables/useSlots';
import type { ColorPickerEmits } from '~/components/ColorPicker/src/composables/useEmits';

export const ColorPickerTriggerId = Symbol(
  '[horizon-web color-picker] trigger-id',
) as InjectionKey<string>;

export const ColorPickerModelValue = Symbol(
  '[horizon-web color-picker] model-value',
) as InjectionKey<ColorPickerColor>;

export const ColorPickerCurrentValue = Symbol(
  '[horizon-web color-picker] current-value',
) as InjectionKey<ColorPickerColor>;

export const ColorPickerProps = Symbol(
  generatorInjectedKeyName('color-picker', 'props'),
) as InjectionKey<ColorPickerPropsType>;

export const ColorPickerEmit = Symbol(
  generatorInjectedKeyName('color-picker', 'emits'),
) as InjectionKey<SetupContext<ColorPickerEmits>['emit']>;

export const ColorPickerSlotsInjectedKey = Symbol(
  generatorInjectedKeyName('color-picker', 'slots'),
) as InjectionKey<LegoSetupContext<{}, ColorPickerSlots>['slots']>;

export const ColorPickerOnCancel = Symbol('[horizon-web color-picker] on-cancel') as InjectionKey<
  () => void
>;

export const ColorPickerOnConfirm = Symbol('[horizon-web color-picker] on-confirm') as InjectionKey<
  () => void
>;

export const ColorPickerOnClear = Symbol('[horizon-web color-picker] on-clear') as InjectionKey<
  () => void
>;
