import type { ComputedRef } from 'vue';
import { computed, defineComponent, inject, ref, toRefs } from 'vue';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { useUploadPreviewFileItemProps } from './composables/useProps';
import NImage from '~/components/Image';
import { NIcon } from '@nio-fe/icon';
import { useMIMETypeMap } from './composables/useMIMETypeMap';
import NProgress from '~/components/Progress';
import colors from '~/styles/colors';
import { useFileSize, useOperateIcon, useHandles } from './composables/useVCAs';
import tooltip from '~/directives/v-tooltip';
import type { UploadPreviewItemEmits } from './composables/useEmits';
import { useUploadPreviewItemEmits } from './composables/useEmits';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { UploadPreviewFileItemSlots } from './composables/useSlots';
import { useUploadPreviewFileItemSlots } from './composables/useSlots';
import { defaultLocale, localeInjectKey } from '~/provides';

export default defineComponent({
  name: `${useNamespace()}UploadPreviewFileItem`,
  directives: {
    tooltip,
  },
  props: useUploadPreviewFileItemProps,
  emits: useUploadPreviewItemEmits,
  slots: useUploadPreviewFileItemSlots,
  setup(
    props,
    { emit, slots }: LegoSetupContext<UploadPreviewItemEmits, UploadPreviewFileItemSlots>,
  ) {
    const { file, mimeIcons, operators, externalClassName, progressNumberVisible } = toRefs(props);

    const classHelper = new ComponentClassBlock('upload-file-preview');

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => props.size || globalSize.value,
    ) as ComputedRef<NApplicationSizeType>;

    const locale = inject(localeInjectKey, defaultLocale);

    const { getIcon } = useMIMETypeMap(mimeIcons.value);
    const opeIcon = useOperateIcon(file);
    const cmpFileSize = computed(() => useFileSize(file.value.size));
    const { deleteHandle, downloadHandle, statusHandle } = useHandles(file, emit);

    const showThumbnail = computed(() => file.value.status === 'success' && !!file.value.thumbnail);
    const isUploading = computed(
      () => file.value.status === 'paused' || file.value.status === 'uploading',
    );

    const iconInfo = computed(() =>
      getIcon(file.value.type, file.value.name ?? '', file.value.specialFileType),
    );

    const iconSize = computed(() => ({ large: 40, medium: 27, small: 20 })[sizeRef.value]);

    const isHorizontal = computed(() => isUploading.value || sizeRef.value === 'small');

    const progressFormat = (percentage: number) =>
      progressNumberVisible.value && sizeRef.value !== 'small' ? `${percentage}%` : '';

    return () => (
      <div
        class={cls(classHelper.block, classHelper.m(sizeRef.value), externalClassName.value ?? '')}
      >
        <div
          class={cls(classHelper.e('icon'), {
            [classHelper.em('icon', 'thumbnail')]: showThumbnail.value,
          })}
        >
          {showThumbnail.value ? (
            <NImage
              src={file.value.thumbnail}
              objectFit="cover"
              width="100%"
              height="100%"
              showViewer
            />
          ) : typeof iconInfo.value.name === 'string' ? (
            <NIcon size={iconSize.value} name={iconInfo.value.name} color={iconInfo.value.color} />
          ) : (
            <iconInfo.value.name size={iconSize.value} />
          )}
        </div>
        {slots.content ? (
          <div class={cls(classHelper.e('content'))}>{slots.content(file.value)}</div>
        ) : (
          <div class={cls(classHelper.e('content'))}>
            <div
              class={classHelper.em('content-info', isHorizontal.value ? 'horizontal' : 'vertical')}
            >
              <div class={cls(classHelper.e('top-line'))}>
                <span
                  class={cls(
                    classHelper.e('file-name'),
                    classHelper.em('file-name', file.value.status || ''),
                  )}
                >
                  {file.value.name}
                </span>
                <span class={cls(classHelper.e('icon-box'))}>
                  {file.value.status === 'success' && (
                    <NIcon name="success_filled" color={colors.green[5]} size={16} />
                  )}
                  {file.value.status === 'error' && (
                    <NIcon name="warning_filled" color={colors.red[5]} size={16} />
                  )}
                </span>
              </div>
              {cmpFileSize.value !== undefined && (
                <span class={cls(classHelper.e('file-size'))}>{cmpFileSize.value}</span>
              )}
            </div>
            {isUploading.value && (
              <div
                class={cls(classHelper.e('progress-bar'), {
                  [classHelper.em('progress-bar', 'no-text')]: !progressNumberVisible.value,
                })}
              >
                <NProgress
                  size={sizeRef.value === 'small' ? 'mini' : 'small'}
                  format={progressFormat}
                  percentage={file.value.progress}
                  color={colors.brand[3]}
                  showText={progressNumberVisible.value}
                />
              </div>
            )}
          </div>
        )}
        {(operators.value.length > 0 || slots.operators) && (
          <div
            class={cls(classHelper.e('operators'), classHelper.e(`operators-${file.value.status}`))}
          >
            {operators.value.map(v => {
              if (!props.disabled && !props.readonly && v === 'delete') {
                return (
                  <span
                    class={cls(classHelper.e('op-icon-item'))}
                    onClick={deleteHandle.value}
                    v-tooltip={locale.value?.langService.td().lego.upload.deleteFile}
                  >
                    <NIcon name="rubbish" size={16} />
                  </span>
                );
              } else if (v === 'download') {
                return (
                  <span
                    class={cls(classHelper.e('op-icon-item'))}
                    onClick={downloadHandle.value}
                    v-tooltip={locale.value?.langService.td().lego.upload.download}
                  >
                    <NIcon name="download" size={16} />
                  </span>
                );
              } else if (v === 'status') {
                return (
                  opeIcon.value && (
                    <span
                      class={cls(classHelper.e('op-icon-item'))}
                      onClick={statusHandle.value}
                      v-tooltip={opeIcon.value.text}
                    >
                      <NIcon name={opeIcon.value.icon} size={16} />
                    </span>
                  )
                );
              }
            })}
            {slots.operators && slots.operators(file.value)}
          </div>
        )}
      </div>
    );
  },
});
