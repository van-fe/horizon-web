import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { ComponentClassBlock, cssVariable } from '@nio-fe/shared';
import NButton from '~/components/Button/src/Button';
import {
  NUploadV2PropsInjectKey,
  NUploadV2SizeInjectKey,
  NUploadV2SlotsInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconUpload } from '@nio-fe/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadButton',
  setup() {
    const classHelper = new ComponentClassBlock('upload-v2--button');

    const buttonRef = ref<HTMLElement | null>(null);

    const props = inject(NUploadV2PropsInjectKey)!;
    const slots = inject(NUploadV2SlotsInjectKey)!;
    const sizeRef = inject(NUploadV2SizeInjectKey)!;
    const uploadFileHelper = inject(NUploadV2UploadFileHelperInjectKey)!;

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    const size = computed<'small' | 'medium' | 'large'>(() =>
      sizeRef.value === 'huge' ? 'large' : sizeRef.value,
    );

    function onClick() {
      uploadFileHelper.clickInput();
    }

    onMounted(() => {
      uploadFileHelper.createInputArea();
    });

    return () => (
      <div class={classHelper.block}>
        <NButton
          ref={buttonRef}
          size={size.value}
          {...(props.buttonProps || {})}
          disabled={isDisabled.value}
          onClick={onClick}
        >
          {slots.default?.() ?? (
            <div class={classHelper.e('inner')}>
              {slots.icon?.() ?? (
                <span class={classHelper.e('icon')}>
                  <IconUpload size={cssVariable('upload-v2', 'size', 'button', 'icon')} />
                </span>
              )}
              {props.buttonText ?? slots.text?.() ?? useLocaleLang('upload.upload').value}
            </div>
          )}
        </NButton>
      </div>
    );
  },
});
