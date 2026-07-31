import { defineComponent } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import { useImageCropperProps } from './composables/useProps';
import { useImageCropperEmits } from './composables/useEmits';
import { useImageCropperSlots } from './composables/useSlots';
import { useImageCropperExposes } from './composables/useExposes';
import { useImageCropper } from './hooks/useImageCropper';

export default defineComponent({
  name: `${useNamespace()}ImageCropper`,
  desc: '支持拖动、缩放和旋转的图片裁剪器',
  descLocales: { en: 'An image cropper with pan, zoom and rotation.' },
  props: useImageCropperProps,
  emits: useImageCropperEmits,
  slots: useImageCropperSlots,
  exposes: useImageCropperExposes,
  setup(props, { slots, emit, expose }) {
    const c = new ComponentClassBlock('image-cropper');
    const state = useImageCropper(props, emit as any);
    const rotateLabel = useLocaleLang('imageCropper.rotate', 'Rotate');
    const resetLabel = useLocaleLang('imageCropper.reset', 'Reset');
    const cropLabel = useLocaleLang('imageCropper.crop', 'Crop');
    expose({ crop: state.crop, reset: state.reset, rotate: state.rotate, canvas: state.canvas });
    return () => (
      <div class={c.block}>
        <div
          class={c.e('viewport')}
          style={{ width: `${props.width}px`, height: `${props.height}px` }}
        >
          <canvas
            ref={state.canvas}
            width={props.width}
            height={props.height}
            tabindex="0"
            aria-label={String(cropLabel.value)}
            onPointerdown={state.onPointerdown}
            onPointermove={state.onPointermove}
            onPointerup={state.onPointerup}
            onPointercancel={state.onPointerup}
            onWheel={state.onWheel}
          />
          <div class={c.e('grid')} aria-hidden="true" />
        </div>
        <div class={c.e('toolbar')}>
          <input
            type="range"
            min={props.minZoom}
            max={props.maxZoom}
            step={props.zoomStep}
            value={state.zoom.value}
            aria-label="Zoom"
            onInput={(event: Event) =>
              state.setZoom(Number((event.target as HTMLInputElement).value))
            }
          />
          {slots.actions?.({
            reset: state.reset,
            rotate: state.rotate,
            crop: async () => {
              await state.crop();
            },
          }) ?? (
            <>
              <HButton size="small" plain onClick={() => state.rotate()}>
                {rotateLabel.value}
              </HButton>
              <HButton size="small" plain onClick={state.reset}>
                {resetLabel.value}
              </HButton>
              <HButton size="small" onClick={() => void state.crop()}>
                {cropLabel.value}
              </HButton>
            </>
          )}
        </div>
      </div>
    );
  },
});
