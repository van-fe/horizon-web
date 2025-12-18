import type {
  NUploadV2FileType,
  NUploadV2HttpRequestInstanceMethods,
} from '../../utils/fileDefines';
import { NUploadV2FileStatusEnum } from '../../utils/fileDefines';
import type { NUploadV2Chunk } from '../../composables/useMultipartUpload';
import type { Data } from '@nio-fe/shared';
import UploadHelperOptions from '../UploadHelperOptions';
import type { ToRefs } from 'vue';
import type { UploadV2Props } from '../../composables/useProps';

export default abstract class BaseMultipartUploadHelper extends UploadHelperOptions {
  protected readonly file: NUploadV2FileType;
  protected readonly instanceMethods: NUploadV2HttpRequestInstanceMethods;

  private uploadStoredChunksRecorder: NUploadV2Chunk[] = [];

  protected get chunkSize() {
    return (this.multipartChunkSize || 2) * 1024 * 1024;
  }

  protected get uploadMethod() {
    return this.method;
  }

  protected constructor(
    file: NUploadV2FileType,
    instanceMethods: NUploadV2HttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadV2Props>>,
  ) {
    super(props);
    this.file = file;
    this.instanceMethods = instanceMethods;

    this.initUpload(this.file).then(() => {
      this.fileSlicing();
      void this.upload();
    });
  }

  abstract initUpload(file: NUploadV2FileType): Promise<void>;

  abstract mergeFiles(file: NUploadV2FileType, chunks: NUploadV2Chunk[]): Promise<void>;

  abstract filenameModify(fileRawName: string, index: number, part: Blob): string;

  abstract beforeFilePartUpload(file: NUploadV2FileType, index: number, part: Blob): Data;

  abstract uploadActionModify(chunk: NUploadV2Chunk): string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected appendHeader(xhr: XMLHttpRequest, header: Data, chunk?: NUploadV2Chunk) {
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

  private uploadChunk(chunk: NUploadV2Chunk) {
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

      this.file.status = NUploadV2FileStatusEnum.Uploading;
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
