import { nanoid } from 'nanoid';
import type { ToRefs } from 'vue';
import { ref } from 'vue';
import type { UploadProps } from '../composables/useProps';
import type { Data, EmitValueCallbackToVoid } from '@nio-fe/shared';
import { EventEmitter, jsonParse, getVideoDuration } from '@nio-fe/shared';
import type { NUploadFileType, NUploadSetStatusOptionsMapping } from './fileDefines';
import { NUploadFileTypeEnum, NUploadFileStatusEnum } from './fileDefines';
import type { UploadEmits } from '../composables/useEmits';
import MultipartUploadHelper from './multipart';
import UploadHelperOptions from './UploadHelperOptions';
import { warn } from '~/utils/useLog';
import round from 'lodash/round';

export default class UploadHelper extends UploadHelperOptions {
  protected readonly uuid: string;

  public readonly eventEmitter = new EventEmitter<EmitValueCallbackToVoid<UploadEmits>>();
  protected _fileList = ref(new Set<NUploadFileType>());
  protected xhrFileMapping = new Map<string, XMLHttpRequest>();

  private readyUploadFilesQueue: NUploadFileType[] = [];
  private uploadingFilesQueue: {
    file: NUploadFileType;
    requestInstance: unknown;
  }[] = [];

  constructor(props?: ToRefs<Partial<UploadProps>>) {
    super(props);
    this.uuid = nanoid();
  }

  public async uploadFiles() {
    this.readyUploadFilesQueue = (
      Array.from(this._fileList.value).filter(curr =>
        [NUploadFileStatusEnum.New, NUploadFileStatusEnum.Pending].includes(curr.status),
      ) as NUploadFileType[]
    ).map(file => {
      file.status = NUploadFileStatusEnum.Pending;
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

  protected removeFileFromReadyUploadFilesQueue(file: NUploadFileType) {
    const index = this.readyUploadFilesQueue.indexOf(file);

    if (index >= 0) {
      this.readyUploadFilesQueue.splice(index, 1);
    }
  }

  private addUploadingQueue(file: NUploadFileType, requestInstance: unknown) {
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

  protected removeFromUploadingQueue(file: NUploadFileType) {
    const index = this.uploadingFilesQueue.findIndex(curr => curr.file === file);

    if (index >= 0) {
      this.uploadingFilesQueue.splice(index, 1);
    }
  }

  private async onUploadSuccess(file: NUploadFileType, response: string) {
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

    this.setStatus(file, NUploadFileStatusEnum.Success, {
      response: jsonParse<Data>(response),
      uploadUrl,
    });

    await this.onUploadFinished(file);
  }

  private async onUploadFail(file: NUploadFileType, responseText: string, response: string) {
    this.setStatus(file, NUploadFileStatusEnum.Fail, {
      reason: responseText,
      response: jsonParse<Data>(response),
    });
    await this.onUploadFinished(file);
  }

  private async onUploadFinished(file: NUploadFileType) {
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

  public getVideoDuration(file: NUploadFileType) {
    const url = file.url || file.blobUrl;
    if (file.type === NUploadFileTypeEnum.Video && url) {
      getVideoDuration(url, duration => {
        file.duration = duration;
      });
    }
  }

  public setStatus<T extends NUploadFileStatusEnum = NUploadFileStatusEnum>(
    file: NUploadFileType,
    status: T,
    args?: NUploadSetStatusOptionsMapping[T],
  ) {
    file.status = status;

    const { response } = args || { response: undefined };

    this.eventEmitter.emit('change', this, response);

    switch (status) {
      case NUploadFileStatusEnum.Success:
        const { uploadUrl } =
          args as NUploadSetStatusOptionsMapping[NUploadFileStatusEnum.Success];

        this.eventEmitter.emit('uploaded', file, response);

        if (uploadUrl) {
          file.url = uploadUrl;
          this.getVideoDuration(file);
        }
        break;
      case NUploadFileStatusEnum.Uploading:
        {
          const { progress } =
            args as NUploadSetStatusOptionsMapping[NUploadFileStatusEnum.Uploading];

          this.eventEmitter.emit('uploading', file, round(progress, 2), response);
          file.percentage = round(progress, 2);
        }
        break;
      case NUploadFileStatusEnum.Pause:
        this.eventEmitter.emit('pause', file);
        break;
      case NUploadFileStatusEnum.Retrying:
        this.eventEmitter.emit('retry', file);
        break;
      case NUploadFileStatusEnum.Fail:
        {
          const { reason } = args as NUploadSetStatusOptionsMapping[NUploadFileStatusEnum.Fail];
          file.response = reason;
          this.eventEmitter.emit('fail', file, reason, response);
        }
        break;
    }

    this.eventEmitter.emit('change', file, response);

    this.fitStatus(file);
  }

  public async beforeUploadFile(file: NUploadFileType) {
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

  public async uploadFile(file: NUploadFileType) {
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

  public pauseUpload(file: NUploadFileType) {
    this.xhrFileMapping.get(file.uuid)?.abort();

    this.setStatus(file, NUploadFileStatusEnum.Pause);
  }

  public continueUpload(file: NUploadFileType) {
    if (this.multipart) {
      // todo:: not finished
    } else {
      this.uploadFileDirectly(file);
    }
  }

  private uploadFileDirectly(file: NUploadFileType) {
    if (!this.action) {
      warn('upload', `You haven't set action.`);
      return;
    }

    if (!file.raw) {
      warn('upload', `${file.name} is not picked manually.`);
      return;
    }

    const xhr = new XMLHttpRequest();
    this.xhrFileMapping.set(file.uuid, xhr);

    xhr.upload.addEventListener('progress', evt => {
      const progress = Math.min(evt.loaded / evt.total, 1) * 100;

      this.setStatus(file, NUploadFileStatusEnum.Uploading, {
        progress,
        response: undefined,
      });
    });

    xhr.open(this.method, this.action, true);
    xhr.withCredentials = this.withCredentials || false;
    this.appendHeader(xhr);

    this.setStatus(file, NUploadFileStatusEnum.Uploading, {
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

  private fitStatus(file: NUploadFileType) {
    switch (file.status) {
      case NUploadFileStatusEnum.Success:
        file.percentage = 100;
        break;
      case NUploadFileStatusEnum.Pending:
        file.percentage = 0;
        break;
    }
  }
}
