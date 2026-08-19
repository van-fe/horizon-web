import { getCurrentInstance, onBeforeUnmount, ref, watch } from 'vue';
import { QRCodeGenerationController, resolveQRCodeRenderOptions } from '@aurora/core';
import { generateQRCodeSvg } from '@aurora/horizon-core';
import type { QRCodeProps } from '../composables/useProps';

export type QRCodeSvgGenerator = typeof generateQRCodeSvg;

export function useQRCode(
  props: QRCodeProps,
  emit: (event: string, ...args: any[]) => void,
  generate: QRCodeSvgGenerator = generateQRCodeSvg,
) {
  const svg = ref('');
  const loading = ref(false);
  const error = ref<unknown>();
  const controller = new QRCodeGenerationController();

  async function render() {
    loading.value = true;
    error.value = undefined;
    const options = resolveQRCodeRenderOptions(props);
    const result = await controller.render(() => generate(options));
    if (result.status === 'rendered') {
      svg.value = result.svg;
      loading.value = false;
    } else if (result.status === 'rejected') {
      error.value = result.error;
      loading.value = false;
      emit('error', result.error);
    }
  }
  watch(
    () => [props.value, props.size, props.margin, props.level, props.color, props.background],
    render,
    { immediate: true },
  );

  if (getCurrentInstance()) onBeforeUnmount(() => controller.destroy());
  return { svg, loading, error, render };
}
