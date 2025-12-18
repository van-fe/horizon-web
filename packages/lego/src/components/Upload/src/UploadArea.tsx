import { NIcon } from '@nio-fe/icon';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { computed, defineComponent, inject, toRefs } from 'vue';
import { getUploadFile } from '@nio-fe/upload-helper';
import { useUploadAreaProps } from './composables/useProps';
import type { UploadAreaEmits } from './composables/useEmits';
import { useUploadAreaEmits } from './composables/useEmits';
import type { UploadAreaSlots } from './composables/useSlots';
import { useUploadAreaSlots } from './composables/useSlots';
import { useListenClipBoard } from './composables/useListenClipBoard';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}UploadArea`,
  props: useUploadAreaProps,
  emits: useUploadAreaEmits,
  slots: useUploadAreaSlots,
  setup(props, { emit, slots }: LegoSetupContext<UploadAreaEmits, UploadAreaSlots>) {
    const { accept, listenClipBorad, multiple, directory, disabled, title, text } = toRefs(props);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    const classHelper = new ComponentClassBlock('upload-area');

    useListenClipBoard({ listenClipBoard: listenClipBorad, emit });

    const onFileChange = (files: FileList | null) => {
      emit('change', files);
    };

    const onClick = () => {
      if (disabled.value) return;
      getUploadFile({
        accept: accept.value,
        multiple: multiple.value,
        directory: directory.value,
        onChange: onFileChange,
      });
    };

    const dropHandle = (evt: DragEvent) => {
      evt.preventDefault();
      if (disabled.value) return;
      const files = evt.dataTransfer?.files ?? null;
      onFileChange(files);
    };

    const dragoverHandle = (evt: DragEvent) => {
      evt.preventDefault();
    };

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m('disabled', isDisabled.value),
          classHelper.m('normal', !isDisabled.value),
        )}
        onClick={onClick}
        onDragover={dragoverHandle}
        onDrop={dropHandle}
      >
        <div class={cls(classHelper.e('inner-box'))}>
          <div class={cls(classHelper.e('title'))}>
            {slots.icon ? (
              slots.icon()
            ) : (
              <span class={cls(classHelper.e('icon-box'))}>
                <NIcon name="add" size={20} />
              </span>
            )}
            {slots.text ? (
              slots.text()
            ) : (
              <span class={cls(classHelper.e('title-text'))}>{title.value}</span>
            )}
          </div>
          {text.value && <div class={cls(classHelper.e('tips'))}>{text.value}</div>}
        </div>
      </div>
    );
  },
});
