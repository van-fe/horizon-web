import type { InjectionKey, SetupContext } from 'vue';
import type ColorPickerColor from './ColorPickerColor';
import type { ColorPickerProps as ColorPickerPropsType } from '../composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ColorPickerSlots } from '~/components/ColorPicker/src/composables/useSlots';
import type { ColorPickerEmits } from '~/components/ColorPicker/src/composables/useEmits';

export const ColorPickerTriggerId = Symbol(
  '[lego color-picker] trigger-id',
) as InjectionKey<string>;

export const ColorPickerModelValue = Symbol(
  '[lego color-picker] model-value',
) as InjectionKey<ColorPickerColor>;

export const ColorPickerCurrentValue = Symbol(
  '[lego color-picker] current-value',
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

export const ColorPickerOnCancel = Symbol('[lego color-picker] on-cancel') as InjectionKey<
  () => void
>;

export const ColorPickerOnConfirm = Symbol('[lego color-picker] on-confirm') as InjectionKey<
  () => void
>;

export const ColorPickerOnClear = Symbol('[lego color-picker] on-clear') as InjectionKey<
  () => void
>;
