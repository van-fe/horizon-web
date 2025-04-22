import { defineComponent, inject } from 'vue';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import { ColorPickerCurrentValue } from '../utils/InjectedKeys';
import { getRecentlyColors } from '../utils/useStorageColor';

export default defineComponent({
  name: 'RecentlyColors',
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-panel');
    const currentColor = inject(ColorPickerCurrentValue);

    const recentlyColors = getRecentlyColors();

    function onSwitchColor(color: string) {
      currentColor?.currentActiveColorTarget?.color.analysis(color);
    }

    return () => (
      <div class={classHelper.em('swatches', 'wrapper')}>
        <div class={classHelper.e('swatches')}>
          {recentlyColors.value.map(color => (
            <div
              class={cls(classHelper.em('swatches', 'item'))}
              onClick={() => onSwitchColor(color)}
            >
              <div class="color-picker-swatch-bg" style={{ background: color }} />
              <div class="color-picker-swatch-alpha" />
            </div>
          ))}
        </div>
      </div>
    );
  },
});
