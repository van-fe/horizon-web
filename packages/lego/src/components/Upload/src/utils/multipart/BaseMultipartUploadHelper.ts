import type {
  NUploadFileType,
  NUploadHttpRequestInstanceMethods,
} from '../../utils/fileDefines';
import { NUploadFileStatusEnum } from '../../utils/fileDefines';
import type { NUploadChunk } from '../../composables/useMultipartUpload';
import type { Data } from '@nio-fe/shared';
import UploadHelperOptions from '../UploadHelperOptions';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';

export default abstract class BaseMultipartUploadHelper extends UploadHelperOptions {
  protected readonly file: NUploadFileType;
  protected readonly instanceMethods: NUploadHttpRequestInstanceMethods;

  private uploadStoredChunksRecorder: NUploadChunk[] = [];

  protected get chunkSize() {
    return (this.multipartChunkSize || 2) * 1024 * 1024;
  }

  protected get uploadMethod() {
    return this.method;
  }

  protected constructor(
    file: NUploadFileType,
    instanceMethods: NUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    super(props);
    this.file = file;
    this.instanceMethods = instanceMethods;

    this.initUpload(this.file).then(() => {
      this.fileSlicing();
      void this.upload();
    });
  }

  abstract initUpload(file: NUploadFileType): Promise<void>;

  abstract mergeFiles(file: NUploadFileType, chunks: NUploadChunk[]): Promise<void>;

  abstract filenameModify(fileRawName: string, index: number, part: Blob): string;

  abstract beforeFilePartUpload(file: NUploadFileType, index: number, part: Blob): Data;

  abstract uploadActionModify(chunk: NUploadChunk): string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected appendHeader(xhr: XMLHttpRequest, header: Data, chunk?: NUploadChunk) {
    Object.entries({ ...this.header, ...header }).forEach(([key, value]) => {
      xhr.setRequestHeader(key, (value as string).toString());
    });
  }

  protected appendData(formData: FormData, data?: Data) {
    Object.entries({
      ...this.data,
      ...data,
    }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  }

  private fileSlicing() {
    const totalChunks = Math.ceil((this.file.size || 0) / this.chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size || 0);

      this.uploadStoredChunksRecorder.push({
        index: i,
        size: end - start,
        part: this.file.raw!.slice(start, end),
        status: 'pending',
      });
    }
  }

  private uploadChunk(chunk: NUploadChunk) {
    const xhr = new XMLHttpRequest();
    xhr.open(this.uploadMethod, this.uploadActionModify(chunk), true);
    xhr.withCredentials = this.withCredentials;
    this.appendHeader(xhr, {}, chunk);

    xhr.onreadystatechange = async () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          chunk.status = 'success';
        } else {
          chunk.status = 'fail';
        }

        void this.upload();
      }
    };

    xhr.onprogress = evt => {
      const progress =
        Math.min(
          ((chunk.index + 1 + evt.loaded / evt.total) * this.chunkSize) / (this.file.size || 1),
          1,
        ) * 100;

      this.file.status = NUploadFileStatusEnum.Uploading;
      this.file.percentage = progress;
      this.file.response = xhr.response;
    };

    this.instanceMethods.addUploadingQueue(this.file, xhr);

    const formData = new FormData();

    formData.append(this.filenameModify(this.name, chunk.index, chunk.part), chunk.part);

    this.appendData(formData, this.beforeFilePartUpload(this.file, chunk.index, chunk.part));

    chunk.status = 'uploading';

    xhr.send(formData);
  }

  public async upload() {
    const readyToUploadChunks = this.uploadStoredChunksRecorder.filter(
      curr => curr.status === 'pending',
    );
    const uploadingChunks = this.uploadStoredChunksRecorder.filter(
      curr => curr.status === 'uploading',
    );
    const uploadFailChunks = this.uploadStoredChunksRecorder.filter(curr => curr.status === 'fail');

    if (
      readyToUploadChunks.length > 0 &&
      uploadingChunks.length < this.multipartMaxAmountUploadingAtSameTime
    ) {
      this.uploadChunk(readyToUploadChunks[0]);
    } else if (readyToUploadChunks.length === 0 && uploadFailChunks.length === 0) {
      await this.mergeFiles(this.file, this.uploadStoredChunksRecorder);
    } else {
      // waiting for upload success or manual retry fail part.
    }
  }
}
