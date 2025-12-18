import { computed, defineComponent, inject, onMounted } from 'vue';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import {
  NUploadV2PropsInjectKey,
  NUploadV2SizeInjectKey,
  NUploadV2SlotsInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconAdd } from '@nio-fe/icon';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadGallery',
  setup() {
    const classHelper = new ComponentClassBlock('upload-v2--gallery');

    const props = inject(NUploadV2PropsInjectKey)!;
    const slots = inject(NUploadV2SlotsInjectKey)!;
    const sizeRef = inject(NUploadV2SizeInjectKey)!;
    const uploadFileHelper = inject(NUploadV2UploadFileHelperInjectKey)!;

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    const shouldShowAddFile = computed(() => {
      if (props.multiple) {
        return uploadFileHelper.fileList.value.size < props.limit;
      } else {
        return uploadFileHelper.fileList.value.size === 0;
      }
    });

    function onClick() {
      if (isDisabled.value) return;
      uploadFileHelper.clickInput();
    }

    onMounted(() => {
      uploadFileHelper.createInputArea();
    });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(props.galleryShape),
          classHelper.m(sizeRef.value),
          classHelper.is('disabled', isDisabled.value),
        )}
      >
        {shouldShowAddFile.value && (
          <div class={cls(classHelper.e('item'), classHelper.e('add-file'))} onClick={onClick}>
            <div class={classHelper.em('add-file', 'icon')}>
              {slots.icon?.() ?? <IconAdd size="var(--font-size--add-file--icon)" />}
            </div>
          </div>
        )}
      </div>
    );
  },
});
