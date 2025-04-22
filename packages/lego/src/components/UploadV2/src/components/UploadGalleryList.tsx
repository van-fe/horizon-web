import { defineComponent, inject } from 'vue';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import {
  NUploadV2PropsInjectKey,
  NUploadV2SizeInjectKey,
  NUploadV2SlotsInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';
import UploadGalleryItem from './UploadGalleryItem';

export default defineComponent({
  name: 'UploadGalleryList',
  slots: {
    /**
     * 追加元素
     */
    append: () => true,
  },
  setup(_, { slots }) {
    const classHelper = new ComponentClassBlock('upload-v2--gallery');
    const uploadFileHelper = inject(NUploadV2UploadFileHelperInjectKey)!;
    const props = inject(NUploadV2PropsInjectKey)!;
    const sizeRef = inject(NUploadV2SizeInjectKey)!;
    const parentSlots = inject(NUploadV2SlotsInjectKey, undefined);

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
