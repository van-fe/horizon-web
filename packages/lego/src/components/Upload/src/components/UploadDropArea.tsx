import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { capitalize, cls, ComponentClassBlock, cssVariable } from '@nio-fe/shared';
import {
  NUploadPropsInjectKey,
  NUploadSlotsInjectKey,
  NUploadUploadFileHelperInjectKey,
} from '../utils/injectKeys';
import { IconAdd } from '@nio-fe/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import { NFormDisabledInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: 'UploadDropArea',
  setup() {
    const classHelper = new ComponentClassBlock('upload--drop-area');

    const dropAreaRef = ref<HTMLElement | null>(null);
    const isDragOver = ref(false);

    const props = inject(NUploadPropsInjectKey)!;
    const slots = inject(NUploadSlotsInjectKey)!;
    const uploadFileHelper = inject(NUploadUploadFileHelperInjectKey)!;

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    const acceptText = useLocaleLang('upload.dropAreaTips.fileTypeLimit');
    const fileSizeLimitText = useLocaleLang('upload.dropAreaTips.fileSizeLimit');
    const multipleLimitText = useLocaleLang('upload.dropAreaTips.fileAmountLimit');

    const tipsText = computed(() => {
      const res: string[] = [];

      if (props.accept) {
        const text = (acceptText.value as string)?.replace('{fileType}', props.accept);
        text && res.push(text);
      }

      if (props.fileSizeLimit) {
        const text = (fileSizeLimitText.value as string)?.replace(
          '{fileSizeLimit}',
          props.fileSizeLimit.toString(),
        );
        text && res.push(text);
      }

      if (props.multiple && props.limit < Infinity) {
        const text = (multipleLimitText.value as string)?.replace(
          '{amount}',
          props.limit.toString(),
        );
        text && res.push(text);
      }

      return capitalize(res.join(', '));
    });

    async function onDrop(e: DragEvent) {
      e.preventDefault();
      if (isDisabled.value) return;

      const files = Array.from(e.dataTransfer?.files ?? []);

      if (files.length) {
        await uploadFileHelper.addFiles(files);
      }

      isDragOver.value = false;
    }

    function onDragOver(e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
      if (isDisabled.value) return;

      isDragOver.value = true;
    }

    function onDragLeave(e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
    }

    function onClick() {
      if (isDisabled.value) return;
      uploadFileHelper.clickInput();
    }

    onMounted(() => {
      uploadFileHelper.createInputArea();
    });

    return () => (
      <div
        ref={dropAreaRef}
        class={cls(
          classHelper.block,
          classHelper.is('drag-over', isDragOver.value),
          classHelper.is('drop'),
          classHelper.is('disabled', isDisabled.value),
        )}
        onDragover={onDragOver}
        onDragleave={onDragLeave}
        onDragend={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
      >
        {slots.default?.() ?? (
          <div class={cls(classHelper.e('inner'))}>
            <div class={classHelper.e('title')}>
              <div class={classHelper.em('title', 'icon')}>
                {slots.icon?.() ?? (
                  <IconAdd size={cssVariable('upload', 'size', 'drop-area', 'icon')} />
                )}
              </div>
              <div class={classHelper.em('title', 'text')}>
                {slots.text?.() ?? useLocaleLang('upload.clickOrDropFile').value}
              </div>
            </div>
            <div class={classHelper.e('tips')}>{slots.tips?.() ?? tipsText.value}</div>
          </div>
        )}
      </div>
    );
  },
});
