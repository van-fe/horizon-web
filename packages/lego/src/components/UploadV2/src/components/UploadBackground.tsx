import {
  computed,
  defineComponent,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import type { Arrayable, LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@nio-fe/shared';
import type { NUploadV2FileType } from '../utils/fileDefines';
import { NUploadV2FileTypeEnum, NUploadV2FileStatusEnum } from '../utils/fileDefines';
import {
  IconArrowDown,
  IconClose,
  IconErrorFilledLight,
  IconInfoFilledLight,
  IconLoadingLine,
  IconSuccessFilledLight,
  IconWarningFilledLight,
} from '@nio-fe/icon';
import UploadFileList from './UploadFileList';
import NTransition from '~/components/Transition/src/Transition';
import NButton from '~/components/Button/src/Button';
import NEmpty from '~/components/Empty/src/Empty';
import useLocaleLang from '~/utils/useLocaleLang';
import { useUploadV2BackgroundProps } from '../composables/useProps';
import type { UploadV2BackgroundEmits } from '../composables/useEmits';
import { useUploadV2BackgroundEmits } from '../composables/useEmits';
import UploadFileHelper from '../utils/UploadFileHelper';
import { suitSizeValue } from '../utils/helper';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import type { UploadV2BackgroundExposes } from '../composables/useExposes';
import { useUploadV2BackgroundExposes } from '../composables/useExposes';
import {
  NUploadV2OpenViewerInjectKey,
  NUploadV2PropsInjectKey,
  NUploadV2UploadFileHelperInjectKey,
} from '../utils/injectKeys';
import NViewer from '~/components/Viewer/src/Viewer';

export default defineComponent({
  name: `${useNamespace()}UploadBackground`,
  components: {
    NScrollbar,
  },
  props: useUploadV2BackgroundProps,
  emits: useUploadV2BackgroundEmits,
  exposes: useUploadV2BackgroundExposes,
  setup(
    props,
    { emit, expose }: LegoSetupContext<UploadV2BackgroundEmits, {}, UploadV2BackgroundExposes>,
  ) {
    const classHelper = new ComponentClassBlock('upload-v2--background');

    const uploadFileHelper = new UploadFileHelper(
      toRefs(
        reactive({
          multiple: true,
        }),
      ),
    );

    uploadFileHelper.eventEmitter.on('preview', file => {
      emit('preview', file);
    });

    uploadFileHelper.eventEmitter.on('add', file => {
      emit('add', file);
    });

    uploadFileHelper.eventEmitter.on('upload', file => {
      emit('upload', file);
    });

    uploadFileHelper.eventEmitter.on('remove', file => {
      emit('remove', file);
    });

    uploadFileHelper.eventEmitter.on('uploading', (file, process, response) => {
      emit('uploading', file, process, response);
    });

    uploadFileHelper.eventEmitter.on('uploaded', (file, response) => {
      emit('uploaded', file, response);
    });

    uploadFileHelper.eventEmitter.on('pause', file => {
      emit('pause', file);
    });

    uploadFileHelper.eventEmitter.on('continue', file => {
      emit('continue', file);
    });

    uploadFileHelper.eventEmitter.on('retry', file => {
      emit('retry', file);
    });

    uploadFileHelper.eventEmitter.on('fail', (file, reason, response) => {
      emit('fail', file, reason, response);
    });

    const backgroundVisible = ref(true);
    const bodyCollapsed = ref(props.collapsed);

    const viewerVisible = ref(false);
    const viewerIndex = ref(0);

    const canViewerFiles = computed(() =>
      Array.from(uploadFileHelper.fileList.value.values())
        .filter(file =>
          [NUploadV2FileTypeEnum.Image, NUploadV2FileTypeEnum.Video].includes(file.type),
        )
        .filter(file => props.uploadProps?.beforeViewerPreview?.(file) ?? true),
    );

    watch(bodyCollapsed, value => {
      emit('update:collapsed', value);
    });

    const fileStatuses = computed(() =>
      Array.from(uploadFileHelper.fileList.value).map(curr => curr.status),
    );

    const uploadingAmount = computed(
      () => fileStatuses.value.filter(curr => curr === NUploadV2FileStatusEnum.Uploading).length,
    );
    const successAmount = computed(
      () => fileStatuses.value.filter(curr => curr === NUploadV2FileStatusEnum.Success).length,
    );
    const failAmount = computed(
      () => fileStatuses.value.filter(curr => curr === NUploadV2FileStatusEnum.Fail).length,
    );
    const pendingAmount = computed(
      () =>
        fileStatuses.value.filter(curr =>
          [
            NUploadV2FileStatusEnum.Pending,
            NUploadV2FileStatusEnum.Pause,
            NUploadV2FileStatusEnum.New,
          ].includes(curr),
        ).length,
    );
    const fileSumSize = computed(() =>
      Array.from(uploadFileHelper.fileList.value).reduce(
        (prev, curr) => prev + (curr.size || 0),
        0,
      ),
    );

    const statusIcon = computed(() => {
      if (fileStatuses.value.length === 0) {
        return (
          <IconSuccessFilledLight
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      } else if (uploadingAmount.value > 0) {
        return (
          <IconLoadingLine
            spin="cw"
            color={['var(--n-text-brand-default)']}
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      } else if (pendingAmount.value > 0) {
        return (
          <IconInfoFilledLight
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      } else if (fileStatuses.value.length === successAmount.value) {
        return (
          <IconSuccessFilledLight
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      } else if (successAmount.value > 0 && failAmount.value > 0) {
        return (
          <IconWarningFilledLight
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      } else {
        return (
          <IconErrorFilledLight
            size={cssVariable('upload-v2', 'size', 'background', 'icon', 'status')}
          />
        );
      }
    });

    const statusText = computed(() => {
      if (fileStatuses.value.length === 0) {
        return useLocaleLang('upload.backgroundStatusText.waiting').value;
      } else if (uploadingAmount.value > 0) {
        return (useLocaleLang('upload.backgroundStatusText.uploading').value as string)
          .replace('{all}', fileStatuses.value.length.toString())
          .replace('{now}', successAmount.value.toString());
      } else if (pendingAmount.value > 0) {
        return useLocaleLang('upload.backgroundStatusText.pause').value;
      } else if (fileStatuses.value.length === successAmount.value) {
        return useLocaleLang('upload.backgroundStatusText.success').value;
      } else if (successAmount.value > 0 && failAmount.value > 0) {
        return useLocaleLang('upload.backgroundStatusText.successPartly').value;
      } else {
        return useLocaleLang('upload.backgroundStatusText.fail').value;
      }
    });

    const uploadStatusInfoText = computed(() => {
      if (fileStatuses.value.length === 0) {
        return '';
      } else if (uploadingAmount.value > 0) {
        return (useLocaleLang('upload.backgroundSubInfoText.uploading').value as string)
          .replace('{now}', uploadingAmount.value.toString())
          .replace('{done}', successAmount.value.toString())
          .replace('{size}', suitSizeValue(fileSumSize.value));
      } else if (pendingAmount.value > 0) {
        return (useLocaleLang('upload.backgroundSubInfoText.pause').value as string)
          .replace('{now}', pendingAmount.value.toString())
          .replace('{done}', successAmount.value.toString())
          .replace('{size}', suitSizeValue(fileSumSize.value));
      } else if (fileStatuses.value.length === successAmount.value) {
        return (useLocaleLang('upload.backgroundSubInfoText.success').value as string)
          .replace('{done}', successAmount.value.toString())
          .replace('{size}', suitSizeValue(fileSumSize.value));
      } else if (successAmount.value > 0 && failAmount.value > 0) {
        return (useLocaleLang('upload.backgroundSubInfoText.successPartly').value as string)
          .replace('{now}', failAmount.value.toString())
          .replace('{done}', successAmount.value.toString())
          .replace('{size}', suitSizeValue(fileSumSize.value));
      } else {
        return (useLocaleLang('upload.backgroundSubInfoText.fail').value as string)
          .replace('{now}', failAmount.value.toString())
          .replace('{size}', suitSizeValue(fileSumSize.value));
      }
    });

    watch(backgroundVisible, visible => {
      window.dispatchEvent(
        new CustomEvent('backgroundUploadVisibleChanged', {
          detail: {
            visible,
            id: props.id,
          },
        }),
      );
    });

    function onClose() {
      backgroundVisible.value = false;
      emit('close');
    }

    provide(NUploadV2PropsInjectKey, props.uploadProps);
    provide(NUploadV2UploadFileHelperInjectKey, uploadFileHelper);
    provide(NUploadV2OpenViewerInjectKey, file => {
      viewerIndex.value = canViewerFiles.value.indexOf(file);
      if (viewerIndex.value !== -1) {
        viewerVisible.value = true;
      }
    });

    expose({
      addFile(file: Arrayable<NUploadV2FileType>) {
        void uploadFileHelper.addFiles(file);
      },
      removeFile(file: NUploadV2FileType) {
        void uploadFileHelper.removeFile([file], false);
      },
      switchVisible(visible: boolean) {
        backgroundVisible.value = visible;
      },
    });

    onBeforeUnmount(() => {
      emit('destroy');
    });

    return () => (
      <div
        v-show={backgroundVisible.value}
        class={cls(classHelper.block, classHelper.is('collapsed', bodyCollapsed.value))}
      >
        <div class={classHelper.e('header')}>
          <div class={classHelper.em('header', 'left')}>
            <div class={classHelper.em('header', 'icon')}>{statusIcon.value}</div>
            <div class={classHelper.em('header', 'status')}>{statusText.value}</div>
          </div>
          <div class={classHelper.em('header', 'right')}>
            <div class={classHelper.em('header', 'control')}>
              <NButton
                type="normal"
                text
                icon={IconArrowDown}
                iconSize={cssVariable('upload-v2', 'font-size', 'background', 'control-icon')}
                class={classHelper.em('header', 'collapse-button')}
                onClick={() => (bodyCollapsed.value = !bodyCollapsed.value)}
              />
            </div>
            {props.closable && (
              <div class={classHelper.em('header', 'control')}>
                <NButton
                  type="normal"
                  text
                  icon={IconClose}
                  iconSize={cssVariable('upload-v2', 'font-size', 'background', 'control-icon')}
                  onClick={onClose}
                />
              </div>
            )}
          </div>
        </div>
        <NTransition name="collapse">
          <div v-show={!bodyCollapsed.value} class={classHelper.e('body')}>
            <div
              v-show={uploadFileHelper.fileList.value.size > 0}
              class={classHelper.em('body', 'upload-status')}
            >
              {uploadStatusInfoText.value}
            </div>
            <div
              v-show={uploadFileHelper.fileList.value.size > 0}
              class={classHelper.em('body', 'inner')}
            >
              <NScrollbar maxHeight="292">
                <UploadFileList
                  fileList={uploadFileHelper.fileList.value}
                  multipart={false}
                  controlsAlwaysVisible={true}
                />
              </NScrollbar>
            </div>
            <NEmpty
              v-show={uploadFileHelper.fileList.value.size === 0}
              size="small"
              description={useLocaleLang('upload.backgroundStatusText.noFile').value as string}
            />
          </div>
        </NTransition>

        <NViewer
          v-model={viewerVisible.value}
          initIndex={viewerIndex.value}
          sources={canViewerFiles.value.map(file => ({
            type: file.type as 'image' | 'video',
            cover: (file.posterUrl || file.url || file.blobUrl)!,
            title: file.name,
            videoSources:
              file.type === NUploadV2FileTypeEnum.Video
                ? [
                    {
                      src: (file.url || file.blobUrl)!,
                      type: 'video/mp4',
                    },
                  ]
                : undefined,
          }))}
        />
      </div>
    );
  },
});
