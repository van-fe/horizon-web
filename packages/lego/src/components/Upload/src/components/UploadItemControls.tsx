import type { PropType } from 'vue';
import { inject, computed, defineComponent, toRef, Fragment } from 'vue';
import type { NUploadFileType } from '../utils/fileDefines';
import { NUploadFileStatusEnum, NUploadFileTypeEnum } from '../utils/fileDefines';
import NControls from '~/components/Controls/src/Controls';
import NControl from '~/components/Controls/src/Control';
import { IconEnd, IconPause, IconPlay, IconRefresh, IconRubbish, IconScaleBig } from '@nio-fe/icon';
import { ComponentClassBlock } from '@nio-fe/shared';
import useLocaleLang from '~/utils/useLocaleLang';
import type { UploadProps } from '../composables/useProps';
import type { NUploadMultipartSetting } from '../composables/useMultipartUpload';
import type UploadFileHelper from '../utils/UploadFileHelper';
import { NUploadOpenViewerInjectKey } from '../utils/injectKeys';

export default defineComponent({
  name: 'UploadItemControls',
  props: {
    file: {
      type: Object as PropType<NUploadFileType>,
      required: true,
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      required: true,
    },
    multipart: {
      type: [Boolean, Object] as PropType<false | NUploadMultipartSetting>,
      required: true,
    },
    controls: {
      type: [Array, Function] as PropType<UploadProps['controls']>,
      default: () => ['view', 'delete'] as const,
    },
    uploadFileHelper: {
      type: Object as PropType<UploadFileHelper>,
      required: true,
    },
    beforePreview: {
      type: Function as PropType<UploadProps['beforePreview']>,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('upload');
    const file = toRef(props, 'file');

    const openViewer = inject(NUploadOpenViewerInjectKey)!;

    const canUseViewerComponent = computed(() =>
      [NUploadFileTypeEnum.Image, NUploadFileTypeEnum.Video].includes(file.value.type),
    );

    const accessList = computed(() => {
      const mappingStatus = (controls: ('upload' | 'delete' | 'view')[]) => {
        const res: string[] = controls.concat();

        if (controls.includes('upload')) {
          switch (file.value.status) {
            case NUploadFileStatusEnum.Fail:
            case NUploadFileStatusEnum.Canceling:
            case NUploadFileStatusEnum.Canceled:
              res.push('retry');
              break;
            case NUploadFileStatusEnum.New:
            case NUploadFileStatusEnum.Pending:
              res.push('start');
              break;
            case NUploadFileStatusEnum.Pause:
              res.push('continue');
              break;
            case NUploadFileStatusEnum.Retrying:
            case NUploadFileStatusEnum.Uploading:
              if (!props.multipart) {
                res.push('stop');
              } else {
                res.push('pause');
              }
              break;
            case NUploadFileStatusEnum.Success:
            // do nothing
          }
        }

        return res;
      };

      if (typeof props?.controls === 'function') {
        return mappingStatus(props?.controls(file.value));
      } else {
        return mappingStatus(props?.controls);
      }
    });

    function onCommand(command: string) {
      switch (command) {
        case 'delete':
          void props.uploadFileHelper.removeFile([file.value]);
          break;
        case 'view':
          Promise.resolve(props.beforePreview?.(file.value) ?? true).then(res => {
            if (res !== false) {
              props.uploadFileHelper.eventEmitter.emit('preview', file.value);

              if (canUseViewerComponent.value) {
                openViewer(file.value);
              } else {
                window.open(file.value.url || file.value.blobUrl);
              }
            }
          });
          break;
        case 'start':
          void props.uploadFileHelper.uploadFile(file.value);
          break;
        case 'retry':
          void props.uploadFileHelper.uploadFile(file.value);
          break;
        case 'pause':
        case 'stop':
          void props.uploadFileHelper.pauseUpload(file.value);
          break;
        case 'continue':
          void props.uploadFileHelper.continueUpload(file.value);
          break;
      }
    }

    return () => (
      <Fragment>
        <NControls
          accessList={accessList.value}
          class={classHelper.e('controls')}
          theme={props.theme}
          onCommand={onCommand}
        >
          <NControl
            label="view"
            icon={IconScaleBig}
            text={useLocaleLang('upload.preview').value as string}
          />
          <NControl
            label="start"
            icon={IconPlay}
            text={useLocaleLang('upload.start').value as string}
          />
          <NControl
            label="continue"
            icon={IconPlay}
            text={useLocaleLang('upload.continue').value as string}
          />
          <NControl
            label="stop"
            icon={IconEnd}
            text={useLocaleLang('upload.stop').value as string}
          />
          <NControl
            label="pause"
            icon={IconPause}
            text={useLocaleLang('upload.pause').value as string}
          />
          <NControl
            label="retry"
            icon={IconRefresh}
            text={useLocaleLang('upload.retry').value as string}
          />
          <NControl
            label="delete"
            icon={IconRubbish}
            text={useLocaleLang('upload.delete').value as string}
          />
        </NControls>
      </Fragment>
    );
  },
});
