import { computed, defineComponent, inject } from 'vue';
import type { SlotsType } from 'vue';
import { cls, ComponentClassBlock, cssVariable } from '@aurora/utils';
import {
  HUploadPropsInjectKey,
  HUploadSizeInjectKey,
  HUploadSlotsInjectKey,
  HUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import UploadGalleryItem from './UploadGalleryItem';
import { HUploadFileTypeEnum } from '~/components/Upload/src/utils/fileDefines';
import UploadFileItem from '~/components/Upload/src/components/UploadFileItem';

export default defineComponent({
  name: 'UploadGalleryMixedList',
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

    const fileItemSize = computed(() => {
      switch (sizeRef.value) {
        case 'small':
          return 'medium';
        case 'large':
          return 'huge';
        case 'huge':
          return 'gigantic';
        case 'medium':
        default:
          return 'large';
      }
    });

    const fileItemHeight = computed(() => {
      if (props.galleryShape === 'square') {
        switch (sizeRef.value) {
          case 'small':
            return cssVariable('upload', 'size', 'gallery', 'rectangle', 'small', 'height');
          case 'medium':
            return cssVariable('upload', 'size', 'gallery', 'rectangle', 'medium', 'width');
          case 'large':
            return cssVariable('upload', 'size', 'gallery', 'rectangle', 'large', 'width');
          case 'huge':
            return cssVariable('upload', 'size', 'gallery', 'rectangle', 'huge', 'width');
        }
      }

      return undefined;
    });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.e('list'),
          classHelper.m(props.galleryShape),
          classHelper.m(sizeRef.value),
        )}
      >
        {Array.from(uploadFileHelper.fileList.value).map(file =>
          parentSlots?.file?.(file) ??
          ([HUploadFileTypeEnum.Video, HUploadFileTypeEnum.Image].includes(file.type) &&
            props?.showMediaWithNormalModeInGalleryMixed === false) ? (
            <UploadGalleryItem file={file} />
          ) : (
            <UploadFileItem
              file={file}
              key={file.uuid}
              multipart={props.multipart}
              controls={props.controls}
              controlsAlwaysVisible={props.controlsAlwaysVisible}
              showFileThumbnail={props.showFileThumbnail}
              size={fileItemSize.value}
              height={fileItemHeight.value}
              showFileSize={props?.showFileSize}
              crossorigin={props?.crossorigin}
              beforePreview={props?.beforePreview}
            />
          ),
        )}
        {slots.append?.()}
      </div>
    );
  },
});
