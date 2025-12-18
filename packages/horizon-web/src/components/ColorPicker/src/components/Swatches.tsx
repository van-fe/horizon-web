import { defineComponent, inject } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/shared';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import { ColorPickerCurrentValue, ColorPickerProps } from '../utils/InjectedKeys';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default defineComponent({
  name: 'Swatches',
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-panel');
    const parentProps = inject(ColorPickerProps);
    const currentColor = inject(ColorPickerCurrentValue);

    function onSwitchColor(color: string) {
      currentColor?.currentActiveColorTarget?.color.analysis(color);
    }

    return () => (
      <NScrollbar maxHeight={82} size="small">
        <div class={classHelper.em('swatches', 'wrapper')}>
          <div class={classHelper.e('swatches')}>
            {parentProps?.swatches?.map(item => {
              const obj =
                typeof item === 'string'
                  ? {
                      name: '',
                      value: item,
                    }
                  : item;
              return (
                <NTooltip content={obj.name} disabled={!obj.name} showAfter={200}>
                  <div
                    class={cls(classHelper.em('swatches', 'item'))}
                    onClick={() => onSwitchColor(obj.value)}
                  >
                    <div class="color-picker-swatch-bg" style={{ background: obj.value }} />
                    <div class="color-picker-swatch-alpha" />
                  </div>
                </NTooltip>
              );
            })}
          </div>
        </div>
      </NScrollbar>
    );
  },
});
