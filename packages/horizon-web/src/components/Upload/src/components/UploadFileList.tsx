import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/shared';
import {
  NUploadPropsInjectKey,
  NUploadSizeInjectKey,
  NUploadSlotsInjectKey,
} from '../utils/injectKeys';
import UploadFileItem from './UploadFileItem';
import type { UploadProps } from '../composables/useProps';
import type { NUploadMultipartSetting } from '../composables/useMultipartUpload';
import type { NUploadFileType } from '../utils/fileDefines';

export default defineComponent({
  name: 'UploadFileList',
  components: {
    UploadFileItem,
  },
  props: {
    fileList: {
      type: Object as PropType<Set<NUploadFileType>>,
      required: true,
    },
    multipart: {
      type: [Boolean, Object] as PropType<false | NUploadMultipartSetting>,
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

    const sizeRef = inject(NUploadSizeInjectKey, undefined);
    const parentProps = inject(NUploadPropsInjectKey, undefined);
    const parentSlots = inject(NUploadSlotsInjectKey, undefined);

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
