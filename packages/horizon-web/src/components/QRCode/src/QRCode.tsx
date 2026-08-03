import { defineComponent } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HButton from '~/components/Button/src/Button';
import HSpin from '~/components/Spin/src/Spin';
import useLocaleLang from '~/utils/useLocaleLang';
import { useQRCodeProps } from './composables/useProps';
import { useQRCodeEmits } from './composables/useEmits';
import { useQRCodeSlots } from './composables/useSlots';
import { useQRCode } from './hooks/useQRCode';

export default defineComponent({
  name: `${useNamespace()}QRCode`,
  desc: '生成可配置的二维码',
  descLocales: { en: 'Generate a configurable QR code.' },
  props: useQRCodeProps,
  emits: useQRCodeEmits,
  slots: useQRCodeSlots,
  setup(props, { slots, emit }) {
    const c = new ComponentClassBlock('qrcode');
    const state = useQRCode(props, emit as any);
    const expired = useLocaleLang('qrCode.expired', 'QR code expired');
    const refresh = useLocaleLang('qrCode.refresh', 'Refresh');
    return () => (
      <div
        class={c.block}
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
        aria-busy={state.loading.value}
      >
        <div class={c.e('canvas')} innerHTML={state.svg.value} />
        {props.icon && !props.expired && (
          <img
            class={c.e('icon')}
            src={props.icon}
            alt=""
            style={{ width: `${props.iconSize}px`, height: `${props.iconSize}px` }}
          />
        )}
        {state.loading.value && (
          <div class={c.e('mask')}>
            <HSpin size="small" />
          </div>
        )}
        {props.expired && (
          <div class={c.e('mask')}>
            {slots.expired?.() ?? (
              <>
                <span>{props.expiredText || expired.value}</span>
                <HButton size="small" onClick={(event: MouseEvent) => emit('refresh', event)}>
                  {refresh.value}
                </HButton>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
});
