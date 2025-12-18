import type { PropType } from 'vue';
import { computed, defineComponent, inject, toRef } from 'vue';
import { cls, ComponentClassBlock, cssVariable } from '@aurora/utils';
import {
  NUploadPropsInjectKey,
  NUploadSizeInjectKey,
  NUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import NMask from '~/components/Mask/src/Mask';
import type { NUploadFileType } from '../utils/fileDefines';
import {
  fileTypeIconMapping,
  NUploadFileStatusEnum,
  NUploadFileTypeEnum,
} from '../utils/fileDefines';
import { IconPictureError, IconVideo } from '@aurora/icon';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NProgress from '~/components/Progress/src/Progress';
import NHover from '~/components/Hover/src/Hover';
import UploadItemControls from './UploadItemControls';
import { durationFormat, getBaseExtName } from '../utils/helper';

export default defineComponent({
  name: 'UploadGalleryItem',
  components: {
    NMask,
    NTooltip,
    NProgress,
  },
  props: {
    file: {
      type: Object as PropType<NUploadFileType>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('upload--gallery');

    const file = toRef(props, 'file');
    const parentProps = inject(NUploadPropsInjectKey)!;
    const sizeRef = inject(NUploadSizeInjectKey)!;
    const uploadFileHelper = inject(NUploadUploadFileHelperInjectKey)!;

    const fileIcon = computed(() => fileTypeIconMapping[file.value.type]);

    const iconSize = computed(() => {
      switch (sizeRef.value) {
        case 'small':
          return 24;
        default:
        case 'medium':
          return 32;
        case 'large':
        case 'huge':
          return 40;
      }
    });

    return () => {
      const [baseName, ext] = getBaseExtName(props.file.name);

      const innerRender = () => {
        switch (props.file.status) {
          case NUploadFileStatusEnum.Success:
            switch (props.file.type) {
              case NUploadFileTypeEnum.Image:
                return (
                  <div class={classHelper.em('item', 'success')}>
                    <div class={classHelper.em('item', 'success-image')}>
                      <img
                        src={props.file.url}
                        crossorigin={parentProps.crossorigin}
                        alt={props.file.name}
                      />
                    </div>
                  </div>
                );
              case NUploadFileTypeEnum.Video:
                return (
                  <div class={classHelper.em('item', 'success')}>
                    <div class={classHelper.em('item', 'success-video')}>
                      <div class={classHelper.em('item', 'duration')}>
                        <div class={classHelper.em('item', 'duration-icon')}>
                          <IconVideo size={14} />
                        </div>
                        {!(sizeRef.value === 'small' && parentProps.galleryShape === 'square') &&
                          durationFormat(props.file.duration)}
                      </div>
                      <video src={props.file.url} crossorigin={parentProps.crossorigin} />
                    </div>
                  </div>
                );
              default:
                return (
                  <div class={classHelper.em('item', 'success')}>
                    <div class={classHelper.em('item', 'success-other-file')}>
                      <fileIcon.value size={iconSize.value} />
                    </div>
                  </div>
                );
            }
          case NUploadFileStatusEnum.Fail:
            return (
              <div class={classHelper.em('item', 'error')}>
                <div class={classHelper.em('item', 'error-icon')}>
                  <IconPictureError
                    color={cssVariable('text-error-default')}
                    size={iconSize.value}
                  />
                </div>
                <div class={classHelper.em('item', 'error-name')}>
                  <NTooltip overflow={true} content={props.file.name} enterable={true}>
                    <span class={classHelper.em('details', 'file-base-name')}>{baseName}</span>
                  </NTooltip>
                  <span class={classHelper.em('details', 'file-ext-name')}>
                    {ext ? `.${ext}` : ''}
                  </span>
                </div>
              </div>
            );
          case NUploadFileStatusEnum.Uploading:
            return (
              <div class={classHelper.em('item', 'uploading')}>
                <div class={classHelper.em('item', 'uploading-icon')}>
                  <fileIcon.value size={iconSize.value} />
                </div>
                <div class={classHelper.em('item', 'uploading-progress')}>
                  <NProgress percentage={props.file.percentage} showText={false} />
                </div>
              </div>
            );
          default:
            return (
              <div class={classHelper.em('item', 'others')}>
                <div class={classHelper.em('item', 'others-icon')}>
                  <fileIcon.value size={iconSize.value} />
                </div>
              </div>
            );
        }
      };

      return (
        <NHover>
          {{
            default: ({ hover }: { hover: boolean }) => (
              <div class={cls(classHelper.e('item'))}>
                <div class={cls(classHelper.em('item', 'inner'))}>{innerRender()}</div>
                <NMask value={hover} absolute={true} contentFullSize={true}>
                  <UploadItemControls
                    file={file.value}
                    theme="light"
                    controls={parentProps.controls}
                    multipart={parentProps.multipart}
                    uploadFileHelper={uploadFileHelper}
                    beforePreview={parentProps.beforePreview}
                  />
                </NMask>
              </div>
            ),
          }}
        </NHover>
      );
    };
  },
});
