import type { ComputedRef } from 'vue';
import { computed, toRefs, defineComponent, inject, ref } from 'vue';
import NButton from '~/components/Button';
import { NIcon } from '@nio-fe/icon';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { getUploadFile } from '@nio-fe/upload-helper';
import UploadPreviewFileItem from './UploadPreviewFileItem';
import { useUploadButtonProps } from './composables/useProps';
import type { UploadEmits } from './composables/useEmits';
import { useUploadEmits } from './composables/useEmits';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import type { UploadSlots } from './composables/useSlots';
import { useUploadSlots } from './composables/useSlots';
import { useListenClipBoard } from './composables/useListenClipBoard';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}UploadButton`,
  components: {
    NButton,
  },
  props: useUploadButtonProps,
  emits: useUploadEmits,
  slots: useUploadSlots,
  setup(props, { emit, slots }: LegoSetupContext<UploadEmits, UploadSlots>) {
    const {
      accept,
      listenClipBorad,
      multiple,
      directory,
      disabled,
      icon,
      text,
      uploadFileList,
      operators,
      progressNumberVisible,
      limit,
      readonly,
    } = toRefs(props);

    const classHelper = new ComponentClassBlock('upload-button');

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => props.size || globalSize.value,
    ) as ComputedRef<NApplicationSizeType>;

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    const showBtn = computed(
      () =>
        (limit.value === undefined || (uploadFileList.value ?? [])?.length < limit.value) &&
        readonly.value === false,
    );

    useListenClipBoard({ listenClipBoard: listenClipBorad, emit });

    const onFileChange = (files: FileList | null) => {
      emit('change', files);
    };

    const onClick = () => {
      getUploadFile({
        accept: accept.value,
        multiple: multiple.value,
        directory: directory.value,
        onChange: onFileChange,
      });
    };

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
    }

    return () => (
      <div class={cls(classHelper.block)}>
        {showBtn.value &&
          (slots.default ? (
            slots.default({ onClick, disabled: isDisabled.value })
          ) : (
            <NButton
              disabled={isDisabled.value}
              size={sizeRef.value}
              forceNewestSize={true}
              onClick={onClick}
              onBlur={onBlur}
            >
              <span style="display: contents;">
                {slots.icon ? (
                  slots.icon()
                ) : (
                  <NIcon name={icon.value} class={classHelper.e('icon')} size={16} />
                )}
                {slots.text ? (
                  slots.text()
                ) : (
                  <span class={classHelper.e('text')}>{text.value}</span>
                )}
              </span>
            </NButton>
          ))}
        <div class={cls(classHelper.e('file-items'))}>
          {uploadFileList.value?.map(file => (
            <UploadPreviewFileItem
              file={file}
              size={sizeRef.value}
              progressNumberVisible={progressNumberVisible.value}
              operators={operators.value}
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
          ))}
        </div>
      </div>
    );
  },
});
