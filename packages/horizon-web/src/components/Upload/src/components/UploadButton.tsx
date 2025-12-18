import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { ComponentClassBlock, cssVariable } from '@aurora/shared';
import NButton from '~/components/Button/src/Button';
import {
  NUploadPropsInjectKey,
  NUploadSizeInjectKey,
  NUploadSlotsInjectKey,
  NUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconUpload } from '@aurora/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadButton',
  setup() {
    const classHelper = new ComponentClassBlock('upload--button');

    const buttonRef = ref<HTMLElement | null>(null);

    const props = inject(NUploadPropsInjectKey)!;
    const slots = inject(NUploadSlotsInjectKey)!;
    const sizeRef = inject(NUploadSizeInjectKey)!;
    const uploadFileHelper = inject(NUploadUploadFileHelperInjectKey)!;

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
                  <IconUpload size={cssVariable('upload', 'size', 'button', 'icon')} />
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
