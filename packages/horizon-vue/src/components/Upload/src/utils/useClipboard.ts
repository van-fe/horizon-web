import type { ComputedRef, ToRefs } from 'vue';
import { watch, onBeforeUnmount } from 'vue';
import type { UploadProps } from '../composables/useProps';
import type UploadFileHelper from './UploadFileHelper';

export function useClipboard(
  propsRef: ToRefs<UploadProps>,
  uploadFileHelper: UploadFileHelper,
  isDisabled: ComputedRef<boolean>,
) {
  async function onPaste(evt: ClipboardEvent) {
    if (propsRef.useClipboard.value && !isDisabled.value) {
      const items = evt?.clipboardData?.items;

      let files: File[] = [];

      if (items?.length) {
        for (let i = 0; i < items.length; i++) {
          if (items[i]?.kind === 'file') {
            const file = items[i].getAsFile();
            file && files.push(file);
          }
        }

        if (files.length) {
          if (typeof propsRef.beforePaste?.value === 'function') {
            files = await propsRef.beforePaste?.value(files);
          }

          void uploadFileHelper.addFiles(files, true);
        }
      }
    }
  }

  watch(
    propsRef.useClipboard,
    val => {
      if (val) {
        document.addEventListener('paste', onPaste);
      } else {
        document.removeEventListener('paste', onPaste);
      }
    },
    {
      immediate: true,
    },
  );

  onBeforeUnmount(() => {
    document.removeEventListener('paste', onPaste);
  });
}
