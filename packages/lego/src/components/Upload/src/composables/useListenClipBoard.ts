import { onBeforeUnmount, onMounted } from 'vue';
import type { SetupContext, Ref } from 'vue';

import type { NUploadListenClipBorad } from './useProps';
import type { UploadEmits, UploadAreaEmits } from './useEmits';

export const useListenClipBoard = ({
  listenClipBoard,
  emit,
}: {
  listenClipBoard: Ref<NUploadListenClipBorad | undefined>;
  emit: SetupContext<UploadEmits | UploadAreaEmits>['emit'];
}) => {
  const listenClipBoradPaste = async (e: ClipboardEvent) => {
    const items = e?.clipboardData && e.clipboardData.items;
    const files: File[] = [];
    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        if (items[i]?.kind === 'file') {
          const file = items[i].getAsFile();
          file && files.push(file);
        }
      }

      if (files.length) {
        let beforeRes;
        if (typeof listenClipBoard?.value?.filter === 'function') {
          beforeRes = await listenClipBoard?.value?.filter(files);
        } else {
          beforeRes = files;
        }

        beforeRes && beforeRes.length && emit('change', beforeRes);
      }
    }
  };

  onMounted(() => {
    if (listenClipBoard?.value?.enable) {
      document.addEventListener('paste', listenClipBoradPaste);
    }
  });

  onBeforeUnmount(() => {
    if (listenClipBoard?.value?.enable) {
      document.removeEventListener('paste', listenClipBoradPaste);
    }
  });
};
