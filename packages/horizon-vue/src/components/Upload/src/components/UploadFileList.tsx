import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import {
  HUploadPropsInjectKey,
  HUploadSizeInjectKey,
  HUploadSlotsInjectKey,
} from '../utils/injectKeys';
import UploadFileItem from './UploadFileItem';
import type { UploadProps } from '../composables/useProps';
import type { HUploadMultipartSetting } from '../composables/useMultipartUpload';
import type { HUploadFileType } from '../utils/fileDefines';

export default defineComponent({
  name: 'UploadFileList',
  components: {
    UploadFileItem,
  },
  props: {
    fileList: {
      type: Object as PropType<Set<HUploadFileType>>,
      required: true,
    },
    multipart: {
      type: [Boolean, Object] as PropType<false | HUploadMultipartSetting>,
      required: true,
    },
    controls: {
      type: [Array, Function] as PropType<UploadProps['controls']>,
      default: () => ['view', 'delete'],
    },
    controlsAlwaysVisible: {
      type: Boolean,
      default: false,
    },
    showFileThumbnail: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('upload--file-list');
    const fileListRef = ref<HTMLElement | null>(null);

    const sizeRef = inject(HUploadSizeInjectKey, undefined);
    const parentProps = inject(HUploadPropsInjectKey, undefined);
    const parentSlots = inject(HUploadSlotsInjectKey, undefined);

    const fileItemSize = computed(() => parentProps?.fileItemSize ?? sizeRef?.value ?? 'medium');

    return () => (
      <div ref={fileListRef} class={cls(classHelper.block, classHelper.m(fileItemSize.value))}>
        {Array.from(props.fileList).map(
          file =>
            parentSlots?.file?.(file) ?? (
              <UploadFileItem
                file={file}
                key={file.uuid}
                multipart={props.multipart}
                controls={props.controls}
                controlsAlwaysVisible={props.controlsAlwaysVisible}
                size={fileItemSize.value}
                showFileSize={parentProps?.showFileSize}
                showFileThumbnail={parentProps?.showFileThumbnail}
                beforePreview={parentProps?.beforePreview}
                crossorigin={parentProps?.crossorigin}
              />
            ),
        )}
      </div>
    );
  },
});
