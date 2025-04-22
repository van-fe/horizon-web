import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import {
  NUploadV2PropsInjectKey,
  NUploadV2SizeInjectKey,
  NUploadV2SlotsInjectKey,
} from '../utils/injectKeys';
import UploadFileItem from './UploadFileItem';
import type { UploadV2Props } from '../composables/useProps';
import type { NUploadV2MultipartSetting } from '../composables/useMultipartUpload';
import type { NUploadV2FileType } from '../utils/fileDefines';

export default defineComponent({
  name: 'UploadFileList',
  components: {
    UploadFileItem,
  },
  props: {
    fileList: {
      type: Object as PropType<Set<NUploadV2FileType>>,
      required: true,
    },
    multipart: {
      type: [Boolean, Object] as PropType<false | NUploadV2MultipartSetting>,
      required: true,
    },
    controls: {
      type: [Array, Function] as PropType<UploadV2Props['controls']>,
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
    const classHelper = new ComponentClassBlock('upload-v2--file-list');
    const fileListRef = ref<HTMLElement | null>(null);

    const sizeRef = inject(NUploadV2SizeInjectKey, undefined);
    const parentProps = inject(NUploadV2PropsInjectKey, undefined);
    const parentSlots = inject(NUploadV2SlotsInjectKey, undefined);

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
