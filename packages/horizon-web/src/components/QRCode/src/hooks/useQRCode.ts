import { ref, watch } from 'vue';
import QRCode from 'qrcode';
import type { QRCodeProps } from '../composables/useProps';

export function useQRCode(props: QRCodeProps, emit: (event: string, ...args: any[]) => void) {
  const svg = ref('');
  const loading = ref(false);
  const error = ref<unknown>();
  let request = 0;
  async function render() {
    const id = ++request;
    loading.value = true;
    error.value = undefined;
    try {
      const result = await QRCode.toString(props.value || ' ', {
        type: 'svg',
        width: props.size,
        margin: props.margin,
        errorCorrectionLevel: props.level,
        color: { dark: props.color, light: props.background },
      });
      if (id === request) svg.value = result;
    } catch (reason) {
      if (id === request) {
        error.value = reason;
        emit('error', reason);
      }
    } finally {
      if (id === request) loading.value = false;
    }
  }
  watch(
    () => [props.value, props.size, props.margin, props.level, props.color, props.background],
    render,
    { immediate: true },
  );
  return { svg, loading, error, render };
}
