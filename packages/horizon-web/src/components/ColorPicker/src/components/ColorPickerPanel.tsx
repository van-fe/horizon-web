import { defineComponent, inject, ref } from 'vue';
import { ComponentClassBlock, cssVariableKey } from '@aurora/shared';
import ColorBoard from './ColorBoard';
import PreviewBlock from './PreviewBlock';
import ColorEditForm from './ColorEditForm';
import Swatches from './Swatches';
import ColorType from './ColorType';
import { ColorPickerCurrentValue, ColorPickerProps } from '../utils/InjectedKeys';
import useLocaleLang from '~/utils/useLocaleLang';
import RecentlyColors from './RecentlyColors';
import CustomStoredColors from './CustomStoredColors';
import { IconAdd, IconRubbish } from '@aurora/icon';
import {
  getRecentlyColors,
  recordCustomStoredColor,
  removeCustomStoredColor,
} from '../utils/useStorageColor';
import NButton from '~/components/Button/src/Button';

export default defineComponent({
  name: 'ColorPickerPanel',
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-panel');
    const parentProps = inject(ColorPickerProps);
    const currentColor = inject(ColorPickerCurrentValue)!;

    const recentlyColors = getRecentlyColors();

    function addCustomColor() {
      recordCustomStoredColor(currentColor?.resultsValue.value);
    }

    const focusedColor = ref<string | null>(null);

    function removeCustomColor() {
      focusedColor.value && removeCustomStoredColor(focusedColor.value);
    }

    return () => (
      <div class={classHelper.block}>
        {parentProps?.enableGradient && <ColorType />}
        <ColorBoard />
        <PreviewBlock />
        {parentProps?.editable && <ColorEditForm />}
        {parentProps?.recentlyColors && recentlyColors.value.length > 0 && (
          <div class={classHelper.e('block')}>
            <div class={classHelper.em('block', 'title')}>
              {useLocaleLang('colorPicker.recentlyUsedColors').value}
            </div>
            <RecentlyColors />
          </div>
        )}
        {parentProps?.showSwatch && (
          <div class={classHelper.e('block')}>
            <div class={classHelper.em('block', 'title')}>
              {useLocaleLang('colorPicker.systemDefaultColors').value}
            </div>
            <Swatches />
          </div>
        )}
        {parentProps?.customColors && (
          <div class={classHelper.e('block')}>
            <div class={classHelper.em('block', 'title')}>
              {useLocaleLang('colorPicker.customDefaultColors').value}
              <div class={classHelper.em('block', 'button-group')}>
                <NButton
                  icon={IconAdd}
                  iconSize={12}
                  type="normal"
                  size="small"
                  class={classHelper.em('block', 'pointer-icon')}
                  text={true}
                  style={{ [cssVariableKey('button-height--small')]: '16px' }}
                  onClick={addCustomColor}
                />
                <NButton
                  v-show={focusedColor.value !== null}
                  icon={IconRubbish}
                  iconSize={12}
                  type="normal"
                  size="small"
                  class={classHelper.em('block', 'pointer-icon')}
                  text={true}
                  style={{ [cssVariableKey('button-height--small')]: '16px' }}
                  onClick={removeCustomColor}
                />
              </div>
            </div>
            <CustomStoredColors onFocusedColor={val => (focusedColor.value = val)} />
          </div>
        )}
      </div>
    );
  },
});
