import type { ComponentPublicInstance } from 'vue';
import { ref, inject, computed, defineComponent, provide, toRefs, watch, Fragment } from 'vue';
import { ComponentClassBlock, cls, useNamespace, isNil } from '@nio-fe/shared';
import type { LegoSetupContext, Data } from '@nio-fe/shared';
import { useUploadProps } from './composables/useProps';
import { useUploadEmits } from './composables/useEmits';
import { useUploadSlots } from './composables/useSlots';
import { useUploadExposes } from './composables/useExposes';
import type { UploadProps } from './composables/useProps';
import type { UploadEmits } from './composables/useEmits';
import type { UploadSlots } from './composables/useSlots';
import type { UploadExposes, UploadBackgroundExposes } from './composables/useExposes';
import UploadFileHelper from './utils/UploadFileHelper';
import {
  NUploadEmitsInjectKey,
  NUploadOpenViewerInjectKey,
  NUploadPropsInjectKey,
  NUploadSizeInjectKey,
  NUploadSlotsInjectKey,
  NUploadUploadFileHelperInjectKey,
} from './utils/injectKeys';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import UploadButton from './components/UploadButton';
import UploadGallery from './components/UploadGallery';
import UploadDropArea from './components/UploadDropArea';
import type { NUploadFileType, NUploadRawFileType } from './utils/fileDefines';
import { NUploadFileTypeEnum, NUploadFileStatusEnum } from './utils/fileDefines';
import UploadGalleryList from './components/UploadGalleryList';
import UploadFileList from './components/UploadFileList';
import useSize from '~/utils/useSize';
import {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
} from './utils/uploadBackgroundHelper';
import NViewer from '~/components/Viewer/src/Viewer';
import { useClipboard } from './utils/useClipboard';
import UploadGalleryMixedList from '~/components/Upload/src/components/UploadGalleryMixedList';

export default defineComponent({
  name: `${useNamespace()}Upload`,
  desc: '通过点击或拖拽，将信息（文件、图片、视频等）上传到远程服务器上的过程',
  props: useUploadProps,
  emits: useUploadEmits,
  slots: useUploadSlots,
  exposes: useUploadExposes,
  setup(
    props: UploadProps,
    { emit, slots, expose }: LegoSetupContext<UploadEmits, UploadSlots, UploadExposes>,
  ) {
    const classHelper = new ComponentClassBlock('upload');
    const propsRef = toRefs(props);

    const viewerVisible = ref(false);
    const viewerIndex = ref(0);

    const sizeRef = useSize(propsRef.size, 'medium');

    // form-item injects
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const nFormError = inject(NFormItemErrorInjectedKey, ref(''));

    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    const uploadFileHelper = new UploadFileHelper(propsRef);

    const canViewerFiles = computed(() =>
      Array.from(uploadFileHelper.fileList.value.values())
        .filter(file =>
          [NUploadFileTypeEnum.Image, NUploadFileTypeEnum.Video].includes(file.type),
        )
        .filter(file => propsRef.beforeViewerPreview?.value?.(file) ?? true),
    );

    useClipboard(propsRef, uploadFileHelper, isDisabled);

    provide(NUploadPropsInjectKey, props);
    provide(NUploadEmitsInjectKey, emit);
    provide(NUploadSlotsInjectKey, slots);
    provide(NUploadSizeInjectKey, sizeRef);
    provide(NUploadUploadFileHelperInjectKey, uploadFileHelper);
    provide(NUploadOpenViewerInjectKey, file => {
      viewerIndex.value = canViewerFiles.value.indexOf(file);
      if (viewerIndex.value !== -1) {
        viewerVisible.value = true;
      }
    });

    const shouldShowFileList = computed(
      () => props.showFileList && uploadFileHelper.fileList.value.size > 0,
    );

    const uploadTrigger = computed(() => {
      if (props.noUploader) {
        return undefined;
      }

      switch (props.type) {
        case 'button':
        default:
          return <UploadButton />;
        case 'gallery':
        case 'gallery-mixed':
          return <UploadGallery />;
        case 'drop':
          return <UploadDropArea />;
      }
    });

    let backgroundUploader: ComponentPublicInstance<
      {},
      {},
      {},
      {},
      UploadBackgroundExposes
    > | null = null;
    let backgroundUploaderInstanceIndex: number | null = null;

    function emitChange(file: NUploadFileType, response?: Data | undefined) {
      emit('update:modelValue', Array.from(uploadFileHelper.fileList.value.values()));
      emit('change', file, response);
      formItemTrigger?.('change');
      formItemTrigger?.('blur');
    }

    uploadFileHelper.eventEmitter.on('change', (file, response) => {
      if (file.status === NUploadFileStatusEnum.New) {
        backgroundUploader?.addFile?.(file);
      }

      if (
        [
          NUploadFileStatusEnum.New,
          NUploadFileStatusEnum.Success,
          NUploadFileStatusEnum.Fail,
        ].includes(file.status)
      ) {
        emitChange(file, response);
      }
    });

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
      backgroundUploader?.removeFile?.(file);
      emitChange(file);
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

    uploadFileHelper.eventEmitter.on('exceed', (picked, existed) => {
      emit('exceed', picked, existed);
    });

    uploadFileHelper.eventEmitter.on('fileSizeExceed', files => {
      emit('fileSizeExceed', files);
    });

    uploadFileHelper.eventEmitter.on('acceptError', files => {
      emit('acceptError', files);
    });

    uploadFileHelper.eventEmitter.on('update:modelValue', files => {
      emit('update:modelValue', files);
    });

    watch(
      propsRef.useBackground,
      val => {
        if (val) {
          ({ instance: backgroundUploader, index: backgroundUploaderInstanceIndex } =
            createBackgroundUploadInstance(props));
        } else {
          backgroundUploader = null;
        }
      },
      {
        immediate: true,
      },
    );

    expose({
      async upload(files?: NUploadFileType[]) {
        if (files?.length) {
          await uploadFileHelper.addFiles(files);
        }

        await uploadFileHelper.uploadFiles();
      },
      async abort(files?: NUploadFileType[]) {
        if (files?.length) {
          await uploadFileHelper.abortFiles(files);
        }
      },
      clearFiles(status?: NUploadFileStatusEnum[]) {
        if (status?.length) {
          const readyToClearFiles = Array.from(uploadFileHelper.fileList.value).filter(curr =>
            status.includes(curr.status),
          );

          void uploadFileHelper.removeFile(readyToClearFiles, false);
        } else if (isNil(status)) {
          uploadFileHelper.removeAllFiles();
        }
      },
      handleSelect() {
        uploadFileHelper.clickInput();
      },
      handleRemove(rawFiles?: NUploadRawFileType[]) {
        if (rawFiles?.length) {
          void uploadFileHelper.removeFile(rawFiles, false);
        } else if (isNil(rawFiles)) {
          uploadFileHelper.removeAllFiles();
        }
      },
      destroyBackgroundUploader() {
        destroyBackgroundUploadInstance(props.id, backgroundUploaderInstanceIndex);
      },
    });

    return () => {
      const uploadTriggerElement = uploadTrigger.value ? (
        <div class={cls(classHelper.e('trigger'))}>{uploadTrigger.value}</div>
      ) : undefined;

      function getFileListNode() {
        switch (props.type) {
          case 'gallery':
            return (
              slots.uploadedFiles?.(Array.from(uploadFileHelper.fileList.value)) ?? (
                <UploadGalleryList>
                  {{
                    append: () => uploadTriggerElement,
                  }}
                </UploadGalleryList>
              )
            );
          case 'gallery-mixed':
            return (
              slots.uploadedFiles?.(Array.from(uploadFileHelper.fileList.value)) ?? (
                <UploadGalleryMixedList>
                  {{
                    append: () => uploadTriggerElement,
                  }}
                </UploadGalleryMixedList>
              )
            );
          case 'button':
          case 'drop':
            return (
              <Fragment>
                {uploadTriggerElement}
                {slots.uploadedFiles?.(Array.from(uploadFileHelper.fileList.value)) || (
                  <UploadFileList
                    fileList={uploadFileHelper.fileList.value}
                    multipart={propsRef.multipart.value}
                    controls={propsRef.controls.value}
                    controlsAlwaysVisible={props.controlsAlwaysVisible}
                  />
                )}
              </Fragment>
            );
        }
      }

      return (
        <div
          class={cls(
            classHelper.block,
            classHelper.m(props.type),
            classHelper.is('disabled', isDisabled.value),
            classHelper.is('error', !!nFormError.value),
          )}
        >
          {shouldShowFileList.value ? getFileListNode() : uploadTriggerElement}
          <NViewer
            v-model={viewerVisible.value}
            initIndex={viewerIndex.value}
            sources={canViewerFiles.value.map(file => ({
              type: file.type as 'image' | 'video',
              cover: (file.posterUrl || file.url || file.blobUrl)!,
              title: file.name,
              videoSources:
                file.type === NUploadFileTypeEnum.Video
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
    };
  },
});
