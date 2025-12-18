import { watchEffect, ref, inject } from 'vue';
import type { Ref, SetupContext } from 'vue';
import type { UploadPreviewItemEmits } from './useEmits';

import type { UploadHelperFile } from '@nio-fe/upload-helper';
import { defaultLocale, localeInjectKey } from '~/provides';

export const useOperateIcon = (file: Ref<UploadHelperFile>) => {
  const icon = ref<{
    icon: string;
    text: string;
  }>();
  const locale = inject(localeInjectKey, defaultLocale);

  watchEffect(() => {
    icon.value = {
      success: {
        icon: 'scale_big',
        text: locale.value?.langService.td().lego.upload.view as string,
      },
      error: {
        icon: 'refresh',
        text: locale.value?.langService.td().lego.upload.retry as string,
      },
      paused: {
        icon: 'play',
        text: locale.value?.langService.td().lego.upload.continue as string,
      },
      uploading: {
        icon: 'pause',
        text: locale.value?.langService.td().lego.upload.pause as string,
      },
    }[file.value.status as string];
  });

  return icon;
};

export const useFileSize = (fileSize = 0) => {
  if (fileSize < 1024) return `${fileSize}B`;
  if (fileSize < 1024 * 1024) return `${(fileSize / 1024).toFixed(2)}KB`;
  if (fileSize < 1204 * 1024 * 1024) return `${(fileSize / 1024 / 1024).toFixed(2)}MB`;
  return `${(fileSize / 1024 / 1024 / 1024).toFixed(2)}GB`;
};

export const useHandles = (
  file: Ref<UploadHelperFile>,
  emit: SetupContext<UploadPreviewItemEmits>['emit'],
) => {
  const deleteHandle = ref();
  const downloadHandle = ref();
  const statusHandle = ref();

  watchEffect(() => {
    deleteHandle.value = () => {
      file.value.delete?.();
      emit('delete', file.value);
    };
    downloadHandle.value = () => {
      emit('download', file.value);
    };
    statusHandle.value = () => {
      if (file.value.status === 'paused') {
        file.value.resume?.();
        emit('resume', file.value);
      } else if (file.value.status === 'uploading') {
        file.value.pause?.();
        emit('pause', file.value);
      } else if (file.value.status === 'success') {
        emit('preview', file.value);
      } else if (file.value.status === 'error') {
        file.value.retry?.();
        emit('retry', file.value);
      }
    };
  });

  return {
    deleteHandle,
    downloadHandle,
    statusHandle,
  };
};
