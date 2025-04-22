import type { ComputedRef } from 'vue';
import { ref, computed, defineComponent, toRefs, inject } from 'vue';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { useUploadPreviewImgItemProps } from './composables/useProps';
import { useCalcImgRect } from './composables/useCalcImgRect';
import NImage from '~/components/Image';
import { useMIMETypeMap } from './composables/useMIMETypeMap';
import { NIcon } from '@nio-fe/icon';
import NProgress from '~/components/Progress';
import colors from '~/styles/colors';
import { useOperateIcon, useHandles } from './composables/useVCAs';
import tooltip from '~/directives/v-tooltip';
import type { UploadPreviewItemEmits } from './composables/useEmits';
import { useUploadPreviewItemEmits } from './composables/useEmits';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import type { UploadPreviewImgItemSlots } from './composables/useSlots';
import { useUploadPreviewImgItemSlots } from './composables/useSlots';
import { defaultLocale, localeInjectKey } from '~/provides';

export default defineComponent({
  name: `${useNamespace()}UploadPreviewImgItem`,
  directives: {
    tooltip,
  },
  props: useUploadPreviewImgItemProps,
  emits: useUploadPreviewItemEmits,
  slots: useUploadPreviewImgItemSlots,
  setup(
    props,
    { emit, slots }: LegoSetupContext<UploadPreviewItemEmits, UploadPreviewImgItemSlots>,
  ) {
    const { file, mimeIcons, proportion, operators, externalClassName } = toRefs(props);

    const classHelper = new ComponentClassBlock('upload-img-preview');

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => props.size || globalSize.value,
    ) as ComputedRef<NApplicationSizeType>;

    // locale
    const locale = inject(localeInjectKey, defaultLocale);

    const { rect, setUnit, iconSize } = useCalcImgRect(sizeRef, proportion);
    const { getIcon } = useMIMETypeMap(mimeIcons.value);
    const { deleteHandle, downloadHandle, statusHandle } = useHandles(file, emit);
    const opeIcon = useOperateIcon(file);

    let timer: any = null;

    const showMask = ref(false);

    const showThumbnail = computed(() => file.value.status === 'success' && !!file.value.thumbnail);
    const isUploading = computed(
      () => file.value.status === 'uploading' || file.value.status === 'paused',
    );

    const rectStyle = computed(() => setUnit(rect.value));

    const iconInfo = computed(() =>
      getIcon(file.value.type, file.value.name ?? '', file.value.specialFileType),
    );

    const mouseEnterHandle = () => {
      clearTimeout(timer);
      showMask.value = true;
    };

    const mouseLeaveHandle = () => {
      timer = setTimeout(() => {
        showMask.value = false;
      }, 100);
    };

    return () => (
      <div
        class={cls(classHelper.block, externalClassName.value ?? '')}
        style={rectStyle.value}
        onMouseenter={mouseEnterHandle}
        onMouseleave={mouseLeaveHandle}
      >
        {showMask.value && (operators.value?.length > 0 || slots.operators) && (
          <div class={cls(classHelper.e('mask'))}>
            {operators.value.map(v => {
              if (!props.disabled && !props.readonly && v === 'delete') {
                return (
                  <span
                    class={cls(classHelper.e('op-icon'))}
                    onClick={deleteHandle.value}
                    v-tooltip={locale.value?.langService.td().lego.upload.deleteFile}
                  >
                    <NIcon name="rubbish" size={16} />
                  </span>
                );
              } else if (v === 'download') {
                return (
                  <span
                    class={cls(classHelper.e('op-icon'))}
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
                      class={cls(classHelper.e('op-icon'))}
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
        {slots.content ? (
          slots.content(file.value)
        ) : showThumbnail.value ? (
          <NImage src={file.value.thumbnail} objectFit="cover" width="100%" height="100%" />
        ) : (
          <div class={cls(classHelper.e('content'))}>
            {file.value.status === 'error' ? (
              <NIcon name="picture_error" color={colors.red[5]} size={iconSize.value} />
            ) : typeof iconInfo.value.name === 'string' ? (
              <NIcon
                name={iconInfo.value.name}
                color={iconInfo.value.color}
                size={iconSize.value}
              />
            ) : (
              <iconInfo.value.name size={iconSize.value} />
            )}
            {isUploading.value ? (
              <NProgress
                size="small"
                percentage={file.value.progress}
                color={colors.brand[3]}
                showText={false}
              />
            ) : (
              <span
                class={cls(
                  classHelper.e('file-name'),
                  classHelper.em('file-name', file.value.status || ''),
                )}
              >
                {file.value.name}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
});
