import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { ImageCropperProps } from '../composables/useProps';

export function useImageCropper(
  props: ImageCropperProps,
  emit: (event: string, ...args: any[]) => void,
) {
  const canvas = ref<HTMLCanvasElement>();
  const image = new Image();
  const zoom = ref(1);
  const rotation = ref(0);
  const x = ref(0);
  const y = ref(0);
  const loaded = ref(false);
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;
  image.crossOrigin = props.crossOrigin;

  function emitChange() {
    emit('change', { zoom: zoom.value, rotation: rotation.value, x: x.value, y: y.value });
  }
  function baseScale() {
    return Math.max(props.width / image.naturalWidth, props.height / image.naturalHeight);
  }
  function draw() {
    const context = canvas.value?.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, props.width, props.height);
    if (!loaded.value) return;
    context.save();
    context.translate(props.width / 2 + x.value, props.height / 2 + y.value);
    context.rotate((rotation.value * Math.PI) / 180);
    const scale = baseScale() * zoom.value;
    context.scale(scale, scale);
    context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
    context.restore();
  }
  function reset() {
    zoom.value = props.minZoom;
    rotation.value = 0;
    x.value = 0;
    y.value = 0;
    draw();
    emitChange();
  }
  function rotate(degrees = 90) {
    rotation.value = (rotation.value + degrees) % 360;
    draw();
    emitChange();
  }
  function setZoom(value: number) {
    zoom.value = Math.min(props.maxZoom, Math.max(props.minZoom, value));
    draw();
    emitChange();
  }
  function load() {
    loaded.value = false;
    image.crossOrigin = props.crossOrigin;
    image.onload = () => {
      loaded.value = true;
      reset();
      emit('load');
    };
    image.onerror = event => emit('error', event);
    image.src = props.src;
  }
  function onPointerdown(event: PointerEvent) {
    if (!props.movable) return;
    dragging = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    canvas.value?.setPointerCapture(event.pointerId);
  }
  function onPointermove(event: PointerEvent) {
    if (!dragging) return;
    x.value += event.clientX - pointerX;
    y.value += event.clientY - pointerY;
    pointerX = event.clientX;
    pointerY = event.clientY;
    draw();
    emitChange();
  }
  function onPointerup(event: PointerEvent) {
    dragging = false;
    canvas.value?.releasePointerCapture(event.pointerId);
  }
  function onWheel(event: WheelEvent) {
    if (!props.wheelZoom) return;
    event.preventDefault();
    setZoom(zoom.value + (event.deltaY < 0 ? props.zoomStep : -props.zoomStep));
  }
  async function crop() {
    const current = canvas.value;
    if (!current) throw new Error('Crop canvas is not ready.');
    const dataUrl = current.toDataURL(props.outputType, props.quality);
    const blob = await new Promise<Blob>((resolve, reject) =>
      current.toBlob(
        value => (value ? resolve(value) : reject(new Error('Unable to export cropped image.'))),
        props.outputType,
        props.quality,
      ),
    );
    emit('crop', blob, dataUrl);
    return { blob, dataUrl };
  }
  watch(() => props.src, load, { immediate: true });
  watch(
    () => [props.width, props.height],
    () => void nextTick(draw),
  );
  onBeforeUnmount(() => {
    image.onload = null;
    image.onerror = null;
  });
  return {
    canvas,
    zoom,
    rotation,
    loaded,
    reset,
    rotate,
    setZoom,
    crop,
    onPointerdown,
    onPointermove,
    onPointerup,
    onWheel,
  };
}
