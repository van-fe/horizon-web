import { computed, defineComponent, inject, onMounted } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import {
  HUploadPropsInjectKey,
  HUploadSizeInjectKey,
  HUploadSlotsInjectKey,
  HUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconAdd } from '@aurora/icon';
import { HFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadGallery',
  setup() {
    const classHelper = new ComponentClassBlock('upload--gallery');

    const props = inject(HUploadPropsInjectKey)!;
    const slots = inject(HUploadSlotsInjectKey)!;
    const sizeRef = inject(HUploadSizeInjectKey)!;
    const uploadFileHelper = inject(HUploadUploadFileHelperInjectKey)!;

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
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
