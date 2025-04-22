import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import { cls, ComponentClassBlock, getClientXY } from '@nio-fe/shared';
import type { Position } from '@vueuse/core';
import { clamp, useDraggable } from '@vueuse/core';
import { $message } from '~/methods';
import { localeInjectKey, defaultLocale } from '~/provides/localable';
import { ColorPickerCurrentValue, ColorPickerProps } from '../utils/InjectedKeys';

declare global {
  class EyeDropper {
    open(): Promise<{ sRGBHex: string }>;
  }

  interface Window {
    EyeDropper: EyeDropper;
  }
}

export default defineComponent({
  name: 'PreviewBlock',
  setup() {
    const colorTrackRef = ref<HTMLElement | null>(null);
    const colorCursorRef = ref<HTMLElement | null>(null);
    const alphaTrackRef = ref<HTMLElement | null>(null);
    const alphaCursorRef = ref<HTMLElement | null>(null);
    const { isDragging: colorCursorIsDragging } = useDraggable(colorTrackRef, {
      onMove: handleColorTrackDrag,
      onEnd: handleColorTrackDrag,
    });
    const { isDragging: alphaCursorIsDragging } = useDraggable(alphaTrackRef, {
      onMove: handleAlphaTrackDrag,
      onEnd: handleAlphaTrackDrag,
    });
    const classHelper = new ComponentClassBlock('color-picker-panel');
    const currentColor = inject(ColorPickerCurrentValue);
    const parentProps = inject(ColorPickerProps);
    const locale = inject(localeInjectKey, defaultLocale);
    const colorCursorLeft = ref(0);
    const alphaCursorLeft = ref(0);

    const alphaBackground = computed(() => {
      if (currentColor?.currentActiveColorTarget.color.value) {
        const [r, g, b] = currentColor?.currentActiveColorTarget.color.toRgbArr();
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
      } else {
        return undefined;
      }
    });

    watch(
      () => currentColor?.currentActiveColorTarget?.color.value,
      () => {
        initColorCursorPosition();
        initAlphaCursorPosition();
      },
    );

    function initColorCursorPosition() {
      if (colorCursorIsDragging.value) return;
      const hue = currentColor?.currentActiveColorTarget?.color.get('hue') || 0;
      const trackWidth = colorTrackRef.value?.offsetWidth || 190;
      const cursorWidth = colorCursorRef.value?.offsetWidth || 18;

      colorCursorLeft.value = (hue * trackWidth) / 360 - cursorWidth / 2;
    }

    function initAlphaCursorPosition() {
      if (alphaCursorIsDragging.value) return;
      const alpha = currentColor?.currentActiveColorTarget?.color.get('alpha') || 0;
      const trackWidth = alphaTrackRef.value?.offsetWidth || 190;
      const cursorWidth = alphaCursorRef.value?.offsetWidth || 18;

      alphaCursorLeft.value = (alpha * trackWidth) / 100 - cursorWidth / 2;
    }

    function handleColorTrackDrag(position: Position, event: MouseEvent | TouchEvent) {
      const rect = colorTrackRef.value!.getBoundingClientRect();
      const { clientX } = getClientXY(event);
      const cursorWidth = colorCursorRef.value?.offsetWidth || 18;

      const left = clamp(clientX - rect.left, 0, rect.width); // 鼠标到轨道最左侧的距离

      colorCursorLeft.value = left - cursorWidth / 2;

      currentColor?.currentActiveColorTarget?.color.set(
        'hue',
        Math.round((left / rect.width) * 360),
        true,
      );
    }

    function handleAlphaTrackDrag(position: Position, event: MouseEvent | TouchEvent) {
      const rect = alphaTrackRef.value!.getBoundingClientRect();
      const { clientX } = getClientXY(event);
      const cursorWidth = alphaCursorRef.value?.offsetWidth || 18;

      const left = clamp(clientX - rect.left, 0, rect.width); // 鼠标到轨道最左侧的距离

      alphaCursorLeft.value = left - cursorWidth / 2;

      currentColor?.currentActiveColorTarget?.color.set(
        'alpha',
        Math.round((left / rect.width) * 100),
        true,
      );
    }

    function runEyeDropper() {
      if (parentProps?.enableEyeDropper) {
        if (!window.EyeDropper) {
          $message.error(locale?.value?.langService?.td().lego.colorPicker.noEyeDropper || '');
          return;
        }

        const picker = new EyeDropper();
        picker.open().then(val => {
          currentColor?.currentActiveColorTarget?.color.analysis(val.sRGBHex);
        });
      }
    }

    onMounted(() => {
      setTimeout(() => {
        initColorCursorPosition();
        initAlphaCursorPosition();
      });
    });

    return () => (
      <div class={classHelper.e('preview')}>
        {parentProps?.enableEyeDropper && (
          <div class={classHelper.em('preview', 'picker')} onClick={runEyeDropper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1205 8.23493L4.22799 14.1275C3.57712 14.7784 2.52184 14.7784 1.87097 14.1275C1.22009 13.4766 1.22009 12.4213 1.87097 11.7705L7.76353 5.87791L7.05642 5.1708C6.79607 4.91045 6.79607 4.48834 7.05642 4.22799C7.31677 3.96764 7.73888 3.96764 7.99923 4.22799L8.70633 4.9351L11.7705 1.87097C12.4213 1.22009 13.4766 1.22009 14.1275 1.87097C14.7784 2.52184 14.7784 3.57712 14.1275 4.22799L11.0634 7.29212L11.7705 7.99923C12.0308 8.25958 12.0308 8.68169 11.7705 8.94204C11.5101 9.20238 11.088 9.20238 10.8277 8.94204L10.1205 8.23493ZM9.41344 7.52782L8.47063 6.58501L2.57808 12.4776C2.31773 12.7379 2.31773 13.16 2.57808 13.4204C2.83842 13.6807 3.26054 13.6807 3.52088 13.4204L9.41344 7.52782Z"
                fill="#040B29"
              />
            </svg>
          </div>
        )}
        <div class={classHelper.em('preview', 'track')}>
          <div ref={colorTrackRef} class="color">
            <div
              ref={colorCursorRef}
              class="cursor"
              style={{
                left: colorCursorLeft.value + 'px',
                background: currentColor?.currentActiveColorTarget?.color.pureValue,
              }}
            />
          </div>
          <div v-show={parentProps?.alpha} ref={alphaTrackRef} class="alpha">
            <div class="alpha-color-bg" style={{ background: alphaBackground.value }} />
            <div
              ref={alphaCursorRef}
              class="cursor"
              style={{
                left: alphaCursorLeft.value + 'px',
                background: currentColor?.currentActiveColorTarget?.color.value,
              }}
            />
          </div>
        </div>
        <div class={classHelper.em('preview', 'dot')}>
          <div v-show={parentProps?.alpha} class="alpha" />
          <div
            class={cls('current-color')}
            style={{
              background: currentColor?.currentActiveColorTarget?.color.value,
            }}
          />
        </div>
      </div>
    );
  },
});
