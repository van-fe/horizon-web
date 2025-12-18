import { nanoid } from 'nanoid';
import type { ToRefs } from 'vue';
import { ref } from 'vue';
import type { UploadV2Props } from '../composables/useProps';
import type { Data, EmitValueCallbackToVoid } from '@nio-fe/shared';
import { EventEmitter, jsonParse, getVideoDuration } from '@nio-fe/shared';
import type { NUploadV2FileType, NUploadV2SetStatusOptionsMapping } from './fileDefines';
import { NUploadV2FileTypeEnum, NUploadV2FileStatusEnum } from './fileDefines';
import type { UploadV2Emits } from '../composables/useEmits';
import MultipartUploadHelper from './multipart';
import UploadHelperOptions from './UploadHelperOptions';
import { warn } from '~/utils/useLog';
import round from 'lodash/round';

export default class UploadHelper extends UploadHelperOptions {
  protected readonly uuid: string;

  public readonly eventEmitter = new EventEmitter<EmitValueCallbackToVoid<UploadV2Emits>>();
  protected _fileList = ref(new Set<NUploadV2FileType>());
  protected xhrFileMapping = new Map<string, XMLHttpRequest>();

  private readyUploadFilesQueue: NUploadV2FileType[] = [];
  private uploadingFilesQueue: {
    file: NUploadV2FileType;
    requestInstance: unknown;
  }[] = [];

  constructor(props?: ToRefs<Partial<UploadV2Props>>) {
    super(props);
    this.uuid = nanoid();
  }

  public async uploadFiles() {
    this.readyUploadFilesQueue = (
      Array.from(this._fileList.value).filter(curr =>
        [NUploadV2FileStatusEnum.New, NUploadV2FileStatusEnum.Pending].includes(curr.status),
      ) as NUploadV2FileType[]
    ).map(file => {
      file.status = NUploadV2FileStatusEnum.Pending;
      return file;
    });

    await this.uploadFileFromQueue();
  }

  private async uploadFileFromQueue() {
    if (this.uploadingFilesQueue.length < (this.maxUploadsAmountAtSameTime || Infinity)) {
      const file = this.readyUploadFilesQueue.shift();
      if (file) {
        void this.uploadFile(file);
      }
    }
  }

  protected removeFileFromReadyUploadFilesQueue(file: NUploadV2FileType) {
    const index = this.readyUploadFilesQueue.indexOf(file);

    if (index >= 0) {
      this.readyUploadFilesQueue.splice(index, 1);
    }
  }

  private addUploadingQueue(file: NUploadV2FileType, requestInstance: unknown) {
    const index = this.uploadingFilesQueue.findIndex(curr => curr.file === file);

    if (index >= 0) {
      this.uploadingFilesQueue[index].requestInstance = requestInstance;
    } else {
      this.uploadingFilesQueue.push({
        file,
        requestInstance,
      });
    }
  }

  protected removeFromUploadingQueue(file: NUploadV2FileType) {
    const index = this.uploadingFilesQueue.findIndex(curr => curr.file === file);

    if (index >= 0) {
      this.uploadingFilesQueue.splice(index, 1);
    }
  }

  private async onUploadSuccess(file: NUploadV2FileType, response: string) {
    let uploadUrl: string | undefined;

    if (this.handleSuccess) {
      uploadUrl = await this.handleSuccess(response, file);
    } else {
      const findHttpUrl = (data: Data | undefined): string | undefined => {
        if (!data) return undefined;

        for (const value of Object.values(data)) {
          if (typeof value === 'object' && value !== null) {
            return findHttpUrl(value as Data);
          } else {
            if (typeof value === 'string' && /^http(s)*:\/\//.test(value)) {
              return value;
            }
          }
        }

        return undefined;
      };

      uploadUrl = findHttpUrl(jsonParse<Data>(response));
    }

    this.setStatus(file, NUploadV2FileStatusEnum.Success, {
      response: jsonParse<Data>(response),
      uploadUrl,
    });

    await this.onUploadFinished(file);
  }

  private async onUploadFail(file: NUploadV2FileType, responseText: string, response: string) {
    this.setStatus(file, NUploadV2FileStatusEnum.Fail, {
      reason: responseText,
      response: jsonParse<Data>(response),
    });
    await this.onUploadFinished(file);
  }

  private async onUploadFinished(file: NUploadV2FileType) {
    const index = this.uploadingFilesQueue.findIndex(curr => curr.file === file);

    if (index >= 0) {
      this.uploadingFilesQueue.splice(index, 1);
    }

    await this.uploadFileFromQueue();
  }

  private appendHeader(xhr: XMLHttpRequest) {
    Object.entries(this.header).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value.toString());
    });
  }

  private appendData(formData: FormData) {
    Object.entries(this.data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  public getVideoDuration(file: NUploadV2FileType) {
    const url = file.url || file.blobUrl;
    if (file.type === NUploadV2FileTypeEnum.Video && url) {
      getVideoDuration(url, duration => {
        file.duration = duration;
      });
    }
  }

  public setStatus<T extends NUploadV2FileStatusEnum = NUploadV2FileStatusEnum>(
    file: NUploadV2FileType,
    status: T,
    args?: NUploadV2SetStatusOptionsMapping[T],
  ) {
    file.status = status;

    const { response } = args || { response: undefined };

    this.eventEmitter.emit('change', this, response);

    switch (status) {
      case NUploadV2FileStatusEnum.Success:
        const { uploadUrl } =
          args as NUploadV2SetStatusOptionsMapping[NUploadV2FileStatusEnum.Success];

        this.eventEmitter.emit('uploaded', file, response);

        if (uploadUrl) {
          file.url = uploadUrl;
          this.getVideoDuration(file);
        }
        break;
      case NUploadV2FileStatusEnum.Uploading:
        {
          const { progress } =
            args as NUploadV2SetStatusOptionsMapping[NUploadV2FileStatusEnum.Uploading];

          this.eventEmitter.emit('uploading', file, round(progress, 2), response);
          file.percentage = round(progress, 2);
        }
        break;
      case NUploadV2FileStatusEnum.Pause:
        this.eventEmitter.emit('pause', file);
        break;
      case NUploadV2FileStatusEnum.Retrying:
        this.eventEmitter.emit('retry', file);
        break;
      case NUploadV2FileStatusEnum.Fail:
        {
          const { reason } = args as NUploadV2SetStatusOptionsMapping[NUploadV2FileStatusEnum.Fail];
          file.response = reason;
          this.eventEmitter.emit('fail', file, reason, response);
        }
        break;
    }

    this.eventEmitter.emit('change', file, response);

    this.fitStatus(file);
  }

  public async beforeUploadFile(file: NUploadV2FileType) {
    const handler = this.beforeUpload;

    if (handler) {
      try {
        if (!(await handler(file))) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  public async uploadFile(file: NUploadV2FileType) {
    this.removeFileFromReadyUploadFilesQueue(file);

    if (this.multipart) {
      new MultipartUploadHelper(
        file,
        {
          setStatus: this.setStatus.bind(this),
          onUploadFinished: this.onUploadFinished.bind(this),
          onUploadSuccess: this.onUploadSuccess.bind(this),
          onUploadFail: this.onUploadFail.bind(this),
          addUploadingQueue: this.addUploadingQueue.bind(this),
        },
        this.props,
      );
    } else {
      if (this.httpRequest) {
        this.httpRequest(file, {
          setStatus: this.setStatus.bind(this),
          onUploadFinished: this.onUploadFinished.bind(this),
          onUploadSuccess: this.onUploadSuccess.bind(this),
          onUploadFail: this.onUploadFail.bind(this),
          addUploadingQueue: this.addUploadingQueue.bind(this),
        });
      } else {
        this.uploadFileDirectly(file);
      }
    }
  }

  public pauseUpload(file: NUploadV2FileType) {
    this.xhrFileMapping.get(file.uuid)?.abort();

    this.setStatus(file, NUploadV2FileStatusEnum.Pause);
  }

  public continueUpload(file: NUploadV2FileType) {
    if (this.multipart) {
      // todo:: not finished
    } else {
      this.uploadFileDirectly(file);
    }
  }

  private uploadFileDirectly(file: NUploadV2FileType) {
    if (!this.action) {
      warn('upload-v2', `You haven't set action.`);
      return;
    }

    if (!file.raw) {
      warn('upload-v2', `${file.name} is not picked manually.`);
      return;
    }

    const xhr = new XMLHttpRequest();
    this.xhrFileMapping.set(file.uuid, xhr);

    xhr.upload.addEventListener('progress', evt => {
      const progress = Math.min(evt.loaded / evt.total, 1) * 100;

      this.setStatus(file, NUploadV2FileStatusEnum.Uploading, {
        progress,
        response: undefined,
      });
    });

    xhr.open(this.method, this.action, true);
    xhr.withCredentials = this.withCredentials || false;
    this.appendHeader(xhr);

    this.setStatus(file, NUploadV2FileStatusEnum.Uploading, {
      progress: 0,
      response: undefined,
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          void this.onUploadSuccess(file, xhr.response);
        } else if (xhr.status > 0) {
          void this.onUploadFail(file, xhr.responseText, xhr.response);
        }

        file.response = xhr.response;
      }
    };

    xhr.onerror = () => {
      void this.onUploadFail(file, xhr.responseText, xhr.response);
    };

    this.addUploadingQueue(file, xhr);

    const formData = new FormData();

    formData.append(this.name, file.raw);

    this.appendData(formData);

    xhr.send(formData);
  }

  private fitStatus(file: NUploadV2FileType) {
    switch (file.status) {
      case NUploadV2FileStatusEnum.Success:
        file.percentage = 100;
        break;
      case NUploadV2FileStatusEnum.Pending:
        file.percentage = 0;
        break;
    }
  }
}
