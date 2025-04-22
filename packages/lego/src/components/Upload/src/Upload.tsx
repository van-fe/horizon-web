import {
  computed,
  defineComponent,
  inject,
  nextTick,
  provide,
  shallowRef,
  toRefs,
  watch,
} from 'vue';
import type { UploadHelperFile } from '@nio-fe/upload-helper';
import { UploadHelper, xhrUpload, getNanoid } from '@nio-fe/upload-helper';
import NUploadButton from './UploadButton';
import NUploadImg from './UploadImg';
import { useUploadProps } from './composables/useProps';
import type {
  NUploadCustomRequest,
  NUploadRequestOptions,
  NUploadOptions,
} from './composables/useProps';
import type { UploadEmits } from './composables/useEmits';
import { useUploadEmits } from './composables/useEmits';
import type { UploadSlots } from './composables/useSlots';
import { useUploadSlots } from './composables/useSlots';
import type { LegoSetupContext } from '@nio-fe/shared';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { useNamespace } from '@nio-fe/shared';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Upload`,
  desc: '用户通过该组件传输自己的本地文件',
  props: useUploadProps,
  emits: useUploadEmits,
  slots: useUploadSlots,
  setup(props, { emit, slots }: LegoSetupContext<UploadEmits, UploadSlots>) {
    const {
      icon,
      text,
      type,
      limit,
      accept,
      listenClipBorad,
      disabled,
      readonly,
      directory,
      multiple,
      mimeIcons,
      proportion,
      afterUpload,
      beforeUpload,
      uploadOptions,
      operators,
      progressNumberVisible,
      size,
    } = toRefs(props);
    let uploadHelper: UploadHelper | null = null;

    // global size
    const sizeRef = useSize(size, 'medium');

    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because uploader use many form element, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    function updateModelValue(val: UploadHelperFile[]) {
      emit('update:modelValue', val);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }

    const uploadFileList = shallowRef<UploadHelperFile[]>([]);
    const updatingProps = shallowRef(false);

    if (uploadOptions.value) {
      const uploadChange = (obj: UploadHelperFile, fileArr: UploadHelperFile[]) => {
        if (updatingProps.value) {
          return;
        }

        let arr = uploadFileList.value.slice();
        fileArr.forEach(file => {
          let idx;
          if (file.status === 'deleted') {
            arr = arr.filter(v => v.helpName !== file.helpName);
          } else if ((idx = arr.findIndex(v => v.helpName === file.helpName)) > -1) {
            arr[idx] = { ...file };
          } else {
            arr.push(file);
          }
        });

        uploadFileList.value = arr.slice();
        updateModelValue(uploadFileList.value);

        if (
          fileArr.every(v => ['success', 'error', 'canceled', 'deleted'].includes(v.status || ''))
        ) {
          afterUpload.value?.(uploadFileList.value, fileArr);
        }
      };

      const getUploadRequest =
        ({
          requestOptions,
          customRequest,
        }: {
          requestOptions?: NUploadRequestOptions;
          customRequest?: NUploadCustomRequest;
        }) =>
        async ({ file, onChange, data }: any) => {
          const req = (customRequest || xhrUpload) as any;

          const xhr = await req({
            ...requestOptions,
            file,
            onChange: ({ status, progress, response, error }: any) => {
              onChange({ status, progress, response, error });
            },
            data: {
              ...data,
              ...requestOptions?.data,
            },
          });

          return xhr;
        };

      const createInstance = (options: NUploadOptions) => {
        uploadHelper = new UploadHelper({
          ...options,
          request: getUploadRequest(options),
          onChange: uploadChange,
        });
      };

      if (typeof uploadOptions.value === 'function') {
        uploadOptions.value().then(res => {
          createInstance(res);
        });
      } else {
        createInstance(uploadOptions.value);
      }
    }

    const deleteHandler = (helpName: string) => () => {
      if (updatingProps.value) {
        return;
      }

      uploadFileList.value = uploadFileList.value.filter(v => v.helpName !== helpName);
      updateModelValue(uploadFileList.value);
    };

    watch(
      () => props.modelValue,
      arrProps => {
        updatingProps.value = true;

        // 传undefined认为是空数组
        if (!arrProps) {
          arrProps = [];
        }

        if (arrProps.length > 0) {
          const arrOrigin = uploadFileList.value.slice();
          // 增加文件
          arrProps.forEach(v => {
            // 如果没传helpName就给一个
            if (!v.helpName) {
              v.helpName = getNanoid();
            }
            //
            if (!arrOrigin.find(vv => vv.helpName === v.helpName)) {
              if (!v.delete) {
                v.delete = deleteHandler(v.helpName || '');
              }
              arrOrigin.push(v);
            }
          });

          // 删除文件
          for (let i = 0; i < arrOrigin.length; i++) {
            if (!arrProps.find(vv => vv.helpName === arrOrigin[i].helpName)) {
              arrOrigin[i]?.delete?.();
              arrOrigin.splice(i, 1);
              i--;
            }
          }

          uploadFileList.value = arrOrigin.slice();
        } else {
          // 清空
          if (uploadFileList.value.length > 0) {
            uploadFileList.value.forEach(v => {
              v?.delete?.();
            });
            uploadFileList.value = [];
          }
        }

        updatingProps.value = false;
      },
      {
        immediate: true,
      },
    );

    const commonProps = computed(() => ({
      size: sizeRef.value,
      limit: limit.value,
      accept: accept.value,
      listenClipBorad: listenClipBorad.value,
      multiple: multiple.value,
      disabled: isDisabled.value,
      directory: directory.value,
      mimeIcons: mimeIcons.value,
      operators: operators.value,
      readonly: readonly.value,
      progressNumberVisible: progressNumberVisible.value,
    }));

    const changeHandle = async (files: FileList | File[] | null) => {
      if (!files) {
        return;
      }
      emit('change', files);

      let uploadFiles: FileList | File[] = [];
      const removedFile: FileList | File[] = [];
      if (files && limit.value && files.length > limit.value - uploadFileList.value.length) {
        const len = limit.value - uploadFileList.value.length;
        for (let i = 0; i < files.length; i++) {
          if (i < len) {
            uploadFiles.push(files[i]);
          } else {
            removedFile.push(files[i]);
          }
        }
      } else {
        uploadFiles = files;
      }

      if (removedFile.length > 0) {
        emit('overLimited', removedFile);
      }

      const beforeRes = beforeUpload.value
        ? await beforeUpload.value(uploadFiles as FileList)
        : uploadFiles;
      beforeRes && beforeRes.length && uploadHelper?.addFiles(beforeRes as FileList);
    };

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    if (type.value === 'list') {
      return () => (
        <NUploadButton
          {...commonProps.value}
          icon={icon.value}
          text={text.value}
          uploadFileList={uploadFileList.value}
          onChange={changeHandle}
          onDelete={file => emit('delete', file)}
          onPause={file => emit('pause', file)}
          onResume={file => emit('resume', file)}
          onRetry={file => emit('retry', file)}
          onPreview={file => emit('preview', file)}
          onDownload={file => emit('download', file)}
          onBlur={onBlur}
        >
          {{
            default: slots.default,
            content: slots.content,
            icon: slots.icon,
            text: slots.text,
            operators: slots.operators,
          }}
        </NUploadButton>
      );
    } else if (type.value === 'img') {
      return () => (
        <NUploadImg
          {...commonProps.value}
          proportion={proportion.value}
          uploadFileList={uploadFileList.value}
          onChange={changeHandle}
          onDelete={file => emit('delete', file)}
          onPause={file => emit('pause', file)}
          onResume={file => emit('resume', file)}
          onRetry={file => emit('retry', file)}
          onPreview={file => emit('preview', file)}
          onDownload={file => emit('download', file)}
          onBlur={onBlur}
        >
          {{
            default: slots.default,
            content: slots.content,
            operators: slots.operators,
          }}
        </NUploadImg>
      );
    } else {
      return null;
    }
  },
});
