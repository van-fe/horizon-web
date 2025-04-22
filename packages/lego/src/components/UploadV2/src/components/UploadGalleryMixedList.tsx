import { computed, defineComponent, inject } from 'vue';
import { cls, ComponentClassBlock, cssVariable } from '@nio-fe/shared';
import {
  NUploadV2PropsInjectKey,
  NUploadV2SizeInjectKey,
  NUploadV2SlotsInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';
import UploadGalleryItem from './UploadGalleryItem';
import { NUploadV2FileTypeEnum } from '~/components/UploadV2';
import UploadFileItem from '~/components/UploadV2/src/components/UploadFileItem';

export default defineComponent({
  name: 'UploadGalleryMixedList',
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
            return cssVariable('upload-v2', 'size', 'gallery', 'rectangle', 'small', 'height');
          case 'medium':
            return cssVariable('upload-v2', 'size', 'gallery', 'rectangle', 'medium', 'width');
          case 'large':
            return cssVariable('upload-v2', 'size', 'gallery', 'rectangle', 'large', 'width');
          case 'huge':
            return cssVariable('upload-v2', 'size', 'gallery', 'rectangle', 'huge', 'width');
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
          ([NUploadV2FileTypeEnum.Video, NUploadV2FileTypeEnum.Image].includes(file.type) &&
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
