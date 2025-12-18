import { NIcon } from '@nio-fe/icon';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import type { ComputedRef } from 'vue';
import { computed, defineComponent, inject, ref, toRefs } from 'vue';
import { getUploadFile } from '@nio-fe/upload-helper';
import { useCalcImgRect } from './composables/useCalcImgRect';
import { useUploadImgProps } from './composables/useProps';
import UploadPreviewFileItem from './UploadPreviewFileItem';
import UploadPreviewImgItem from './UploadPreviewImgItem';
import type { UploadEmits } from './composables/useEmits';
import { useUploadEmits } from './composables/useEmits';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import type { UploadImageSlots } from './composables/useSlots';
import { useUploadImageSlots } from './composables/useSlots';
import { useListenClipBoard } from './composables/useListenClipBoard';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}UploadImg`,
  props: useUploadImgProps,
  emits: useUploadEmits,
  slots: useUploadImageSlots,
  setup(
    props,
    {
      emit,
      slots,
    }: LegoSetupContext<Omit<UploadEmits, 'update:modelValue' | 'overLimited'>, UploadImageSlots>,
  ) {
    const {
      accept,
      listenClipBorad,
      multiple,
      directory,
      disabled,
      uploadFileList,
      operators,
      progressNumberVisible,
      limit,
      readonly,
      mimeIcons,
      proportion,
    } = toRefs(props);

    const classHelper = new ComponentClassBlock('upload-img');

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => props.size || globalSize.value,
    ) as ComputedRef<NApplicationSizeType>;

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    const { rect, iconSize, setUnit } = useCalcImgRect(sizeRef, proportion);

    const rectStyle = computed(() => setUnit(rect.value));

    const showUploadImgControl = computed(
      () =>
        (limit.value === undefined || (uploadFileList.value ?? [])?.length < limit.value) &&
        readonly.value === false,
    );

    useListenClipBoard({ listenClipBoard: listenClipBorad, emit });

    const onFileChange = (files: FileList | null) => {
      emit('change', files);
    };

    const uploadHandle = (evt: MouseEvent) => {
      evt.stopPropagation();
      if (isDisabled.value) return;
      getUploadFile({
        accept: accept.value,
        multiple: multiple.value,
        directory: directory.value,
        onChange: onFileChange,
      });
    };

    function onBlur(evt: FocusEvent) {
      if (isDisabled.value) return;
      emit('blur', evt);
    }

    return () => {
      return (
        <div class={cls(classHelper.block)} data-size={sizeRef.value}>
          {uploadFileList.value?.map(file => {
            return file.displayType === 'img' ? (
              <UploadPreviewImgItem
                file={file}
                operators={operators.value}
                mimeIcons={mimeIcons.value}
                size={sizeRef.value}
                proportion={proportion.value}
                onResume={file => emit('resume', file)}
                onDelete={file => emit('delete', file)}
                onPause={file => emit('pause', file)}
                onPreview={file => emit('preview', file)}
                onDownload={file => emit('download', file)}
                onRetry={file => emit('retry', file)}
                readonly={readonly.value}
                disabled={isDisabled.value}
              >
                {{
                  content: slots.content,
                  operators: slots.operators,
                }}
              </UploadPreviewImgItem>
            ) : (
              <UploadPreviewFileItem
                file={file}
                size={sizeRef.value}
                operators={operators.value}
                mimeIcons={mimeIcons.value}
                progressNumberVisible={progressNumberVisible.value}
                onResume={file => emit('resume', file)}
                onDelete={file => emit('delete', file)}
                onPause={file => emit('pause', file)}
                onPreview={file => emit('preview', file)}
                onDownload={file => emit('download', file)}
                onRetry={file => emit('retry', file)}
                readonly={readonly.value}
                disabled={isDisabled.value}
              >
                {{
                  content: slots.content,
                  operators: slots.operators,
                }}
              </UploadPreviewFileItem>
            );
          })}
          {showUploadImgControl.value && (
            <div
              class={cls(classHelper.e('control'), {
                [classHelper.em('control', 'disabled')]: !!isDisabled.value,
                [classHelper.em('control', 'normal')]: !isDisabled.value,
              })}
              style={rectStyle.value}
              tabindex={0}
              onClick={uploadHandle}
              onBlur={onBlur}
            >
              {slots.default ? slots.default() : <NIcon name="add" size={iconSize.value} />}
            </div>
          )}
        </div>
      );
    };
  },
});
