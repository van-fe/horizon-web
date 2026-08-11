import { defineComponent, inject } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import {
  ColorPickerModelValue,
  ColorPickerProps,
  ColorPickerSlotsInjectedKey,
} from '../utils/InjectedKeys';

export default defineComponent({
  name: 'ColorPickerTrigger',
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-trigger');
    const parentProps = inject(ColorPickerProps)!;
    const parentSlots = inject(ColorPickerSlotsInjectedKey)!;
    const modelColor = inject(ColorPickerModelValue)!;

    return () => (
      <div class={cls(classHelper.block)}>
        <div
          class={cls(
            classHelper.em('color', 'wrapper'),
            classHelper.is('alpha', parentProps.alpha),
          )}
        >
          <div
            class={cls(
              classHelper.e('color'),
              classHelper.is('empty', !modelColor.resultsValue.value),
            )}
            style={{ background: modelColor.resultsValue.value }}
          />
        </div>
        {parentProps.squareText && parentProps.triggerType === 'square' && modelColor.resultsValue.value && (
            <div class={classHelper.e('text')}>
              {parentSlots.squareText?.(modelColor) ?? modelColor.resultsValue.value}
            </div>
          )}
      </div>
    );
  },
});
