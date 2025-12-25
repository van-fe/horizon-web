import { defineComponent, inject } from 'vue';
import type { SlotsType } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import {
  HUploadPropsInjectKey,
  HUploadSizeInjectKey,
  HUploadSlotsInjectKey,
  HUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import UploadGalleryItem from './UploadGalleryItem';

export default defineComponent({
  name: 'UploadGalleryList',
  slots: Object as SlotsType<{
    /**
     * 追加元素
     */
    append?: {}
  }>,
  setup(_, { slots }) {
    const classHelper = new ComponentClassBlock('upload--gallery');
    const uploadFileHelper = inject(HUploadUploadFileHelperInjectKey)!;
    const props = inject(HUploadPropsInjectKey)!;
    const sizeRef = inject(HUploadSizeInjectKey)!;
    const parentSlots = inject(HUploadSlotsInjectKey, undefined);

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.e('list'),
          classHelper.m(props.galleryShape),
          classHelper.m(sizeRef.value),
        )}
      >
        {Array.from(uploadFileHelper.fileList.value).map(
          file => parentSlots?.file?.(file) ?? <UploadGalleryItem file={file} />,
        )}
        {slots.append?.()}
      </div>
    );
  },
});
