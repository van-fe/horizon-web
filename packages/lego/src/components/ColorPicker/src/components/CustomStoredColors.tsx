import { computed, defineComponent, Fragment, inject, watch } from 'vue';
import { cls, ComponentClassBlock, isString, isNull } from '@nio-fe/shared';
import { ColorPickerCurrentValue } from '../utils/InjectedKeys';
import { getCustomStoredColors } from '../utils/useStorageColor';
import useLocaleLang from '~/utils/useLocaleLang';
import { tinycolor } from '@nio-fe/colors';

export default defineComponent({
  name: 'CustomStoredColors',
  emits: {
    focusedColor: (color: string | null) => isString(color) || isNull(color),
  },
  setup(_, { emit }) {
    const classHelper = new ComponentClassBlock('color-picker-panel');
    const currentColor = inject(ColorPickerCurrentValue);

    const customStoredColors = getCustomStoredColors();

    const activatedColors = computed(() =>
      customStoredColors.value.filter(color => isSameToCurrentColor(color)),
    );

    watch(
      activatedColors,
      val => {
        if (val.length > 0) {
          emit('focusedColor', val[0]);
        } else {
          emit('focusedColor', null);
        }
      },
      {
        immediate: true,
      },
    );

    function onSwitchColor(color: string) {
      currentColor?.currentActiveColorTarget?.color.analysis(color);
    }

    function isSameToCurrentColor(color: string) {
      return (
        !!currentColor?.resultsValue.value &&
        tinycolor(color).equals(currentColor.resultsValue.value)
      );
    }

    return () => (
      <div
        class={cls(
          classHelper.em('swatches', 'wrapper'),
          classHelper.is('empty', customStoredColors.value.length === 0),
        )}
      >
        <div
          class={cls(
            classHelper.e('swatches'),
            classHelper.is('empty', customStoredColors.value.length === 0),
          )}
        >
          {customStoredColors.value.map(color => (
            <div
              class={cls(
                classHelper.em('swatches', 'item'),
                classHelper.is('active', activatedColors.value.includes(color)),
              )}
              onClick={() => onSwitchColor(color)}
            >
              <div class="color-picker-swatch-bg" style={{ background: color }} />
              <div class="color-picker-swatch-alpha" />
            </div>
          ))}
          {customStoredColors.value.length === 0 && (
            <Fragment>
              <div class={cls(classHelper.em('swatches', 'item'), classHelper.is('empty'))} />
              <div class={classHelper.em('swatches', 'description')}>
                {useLocaleLang('colorPicker.noCustomDefaultColorDesc').value}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  },
});
