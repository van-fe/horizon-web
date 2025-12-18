import { computed, defineComponent, inject } from 'vue';
import type { SlotsType } from 'vue';
import { cls, ComponentClassBlock, cssVariable } from '@aurora/shared';
import {
  NUploadPropsInjectKey,
  NUploadSizeInjectKey,
  NUploadSlotsInjectKey,
  NUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import UploadGalleryItem from './UploadGalleryItem';
import { NUploadFileTypeEnum } from '~/components/Upload';
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
    const uploadFileHelper = inject(NUploadUploadFileHelperInjectKey)!;
    const props = inject(NUploadPropsInjectKey)!;
    const sizeRef = inject(NUploadSizeInjectKey)!;
    const parentSlots = inject(NUploadSlotsInjectKey, undefined);

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
          ([NUploadFileTypeEnum.Video, NUploadFileTypeEnum.Image].includes(file.type) &&
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
