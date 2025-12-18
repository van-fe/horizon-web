import type { PropType } from 'vue';
import { inject, computed, defineComponent, ref, toRef, Fragment } from 'vue';
import { cls, ComponentClassBlock, cssVariable, sizeUnitTransform } from '@nio-fe/shared';
import { IconRemind, IconComplete, IconStart } from '@nio-fe/icon';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NViewer from '~/components/Viewer/src/Viewer';
import NProgress from '~/components/Progress/src/Progress';
import type { NUploadV2FileType } from '../utils/fileDefines';
import {
  fileTypeIconMapping,
  NUploadV2FileStatusEnum,
  NUploadV2FileTypeEnum,
} from '../utils/fileDefines';
import UploadItemControls from './UploadItemControls';
import type { UploadV2Props } from '../composables/useProps';
import type { NUploadV2MultipartSetting } from '../composables/useMultipartUpload';
import { getBaseExtName, suitSizeValue } from '../utils/helper';
import {
  NUploadV2OpenViewerInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';

export default defineComponent({
  name: 'UploadFileItem',
  components: {
    NTooltip,
    NViewer,
    NProgress,
  },
  props: {
    file: {
      type: Object as PropType<NUploadV2FileType>,
      required: true,
    },
    size: {
      type: String as PropType<UploadV2Props['size'] | 'gigantic'>,
      default: 'medium',
    },
    height: {
      type: [Number, String],
    },
    multipart: {
      type: [Boolean, Object] as PropType<false | NUploadV2MultipartSetting>,
      required: true,
    },
    controls: {
      type: [Array, Function] as PropType<UploadV2Props['controls']>,
      default: () => ['view', 'delete'],
    },
    controlsAlwaysVisible: {
      type: Boolean,
      default: false,
    },
    showFileSize: {
      type: Boolean,
      default: true,
    },
    showFileThumbnail: {
      type: Boolean,
      default: false,
    },
    beforePreview: {
      type: Function as PropType<UploadV2Props['beforePreview']>,
    },
    crossorigin: {
      type: String,
    },
  },
  setup(props) {
    const file = toRef(props, 'file');
    const classHelper = new ComponentClassBlock('upload-v2--file-item');
    const itemRef = ref<HTMLElement | null>(null);

    const uploadFileHelper = inject(NUploadV2UploadFileHelperInjectKey)!;
    const openViewer = inject(NUploadV2OpenViewerInjectKey)!;

    const shouldShowProgress = computed(() => {
      return [NUploadV2FileStatusEnum.Uploading, NUploadV2FileStatusEnum.Pause].includes(
        file.value.status,
      );
    });

    const shouldShowThumbnail = computed(
      () =>
        props.showFileThumbnail &&
        [NUploadV2FileTypeEnum.Image, NUploadV2FileTypeEnum.Video].includes(file.value.type),
    );

    const iconSize = computed(() => {
      switch (props.size) {
        case 'gigantic':
          return 80;
        case 'huge':
          return 64;
        case 'large':
          return 48;
        case 'medium':
        default:
          return 32;
        case 'small':
          return 24;
      }
    });

    const getStatus = (status: NUploadV2FileStatusEnum) => {
      return [NUploadV2FileStatusEnum.Success, NUploadV2FileStatusEnum.Fail].includes(status) ? (
        <div class={classHelper.em('details', 'file-status')}>
          {status === NUploadV2FileStatusEnum.Success ? (
            <IconComplete
              size={16}
              color={cssVariable('upload-v2', 'color', 'file-list-item', 'success')}
            />
          ) : status === NUploadV2FileStatusEnum.Fail ? (
            <IconRemind
              size={16}
              color={cssVariable('upload-v2', 'color', 'file-list-item', 'fail')}
            />
          ) : undefined}
        </div>
      ) : undefined;
    };

    const fileIcon = computed(() => fileTypeIconMapping[file.value.type]);

    function previewFile() {
      if (!shouldShowThumbnail.value) return;

      Promise.resolve(props.beforePreview?.(file.value) ?? true).then(res => {
        if (res !== false) {
          uploadFileHelper?.eventEmitter.emit('preview', file.value);

          openViewer(file.value);
        }
      });
    }

    return () => {
      const [baseName, ext] = getBaseExtName(file.value.name);
      const fileSizeText = suitSizeValue(file.value.size);

      return (
        <div
          ref={itemRef}
          class={cls(
            classHelper.block,
            classHelper.m(props.size),
            classHelper.is(file.value.type),
            classHelper.is(file.value.status),
            classHelper.is('controls-always-visible', props.controlsAlwaysVisible),
          )}
          style={{
            height: sizeUnitTransform(props.height),
          }}
        >
          <div class={classHelper.em('details', 'wrapper')}>
            <div class={classHelper.e('preview')}>
              <div
                class={cls(
                  classHelper.em('preview', 'preview-icon'),
                  classHelper.has('thumbnail', shouldShowThumbnail.value),
                )}
                style={{
                  width: iconSize.value + 'px',
                  height: iconSize.value + 'px',
                }}
                onClick={previewFile}
              >
                {shouldShowThumbnail.value ? (
                  file.value.type === NUploadV2FileTypeEnum.Image ? (
                    <img src={file.value.url || file.value.blobUrl} alt="file thumbnail" />
                  ) : (
                    <Fragment>
                      <video
                        src={file.value.url || file.value.posterUrl || file.value.blobUrl}
                        crossorigin={props.crossorigin}
                      />
                      <IconStart
                        class={classHelper.em('preview', 'preview-icon-play')}
                        color={cssVariable('text', 'inverse')}
                      />
                    </Fragment>
                  )
                ) : (
                  <fileIcon.value size={iconSize.value} />
                )}
              </div>
            </div>
            <div class={classHelper.e('details')}>
              <div class={classHelper.em('details', 'file-name')}>
                <NTooltip overflow={true} content={file.value.name} enterable={true}>
                  <span class={classHelper.em('details', 'file-base-name')}>{baseName}</span>
                </NTooltip>
                <span class={classHelper.em('details', 'file-ext-name')}>
                  {ext ? `.${ext}` : ''}
                </span>
                {props.size === 'small' && props.showFileSize && (
                  <div class={classHelper.em('details', 'size')}>{fileSizeText}</div>
                )}
                {getStatus(file.value.status)}
              </div>
              {props.size !== 'small' && props.showFileSize && (
                <div class={classHelper.em('details', 'size')}>{fileSizeText}</div>
              )}
              {shouldShowProgress.value && (
                <div class={classHelper.em('details', 'progress')}>
                  <NProgress
                    percentage={file.value.percentage}
                    size={props.size === 'small' ? 'mini' : 'small'}
                    showText={props.size !== 'small'}
                  />
                </div>
              )}
            </div>
          </div>
          <UploadItemControls
            file={file.value}
            theme="dark"
            multipart={props.multipart}
            controls={props.controls}
            uploadFileHelper={uploadFileHelper}
            beforePreview={props.beforePreview}
          />
        </div>
      );
    };
  },
});
