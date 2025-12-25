import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { ComponentClassBlock, cssVariable } from '@aurora/utils';
import HButton from '~/components/Button/src/Button';
import {
  HUploadPropsInjectKey,
  HUploadSizeInjectKey,
  HUploadSlotsInjectKey,
  HUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconUpload } from '@aurora/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import { HFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadButton',
  setup() {
    const classHelper = new ComponentClassBlock('upload--button');

    const buttonRef = ref<HTMLElement | null>(null);

    const props = inject(HUploadPropsInjectKey)!;
    const slots = inject(HUploadSlotsInjectKey)!;
    const sizeRef = inject(HUploadSizeInjectKey)!;
    const uploadFileHelper = inject(HUploadUploadFileHelperInjectKey)!;

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
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
        <HButton
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
        </HButton>
      </div>
    );
  },
});
