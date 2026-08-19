import type { Awaitable, Data } from '@aurora/utils';
import type { HUploadFileType } from '../utils/fileDefines';

export interface HUploadChunk {
  /**
   * 分片下标
   * @en The zero-based chunk index.
   */
  index: number;
  /**
   * 分片大小
   * @en The chunk size in bytes.
   */
  size: number;
  /**
   * 分片文件内容
   * @en The chunk content.
   */
  part: Blob;
  /**
   * 分片上传状态
   * @en The chunk upload status.
   */
  status: 'pending' | 'uploading' | 'success' | 'fail';
  /**
   * 分片请求的服务端响应
   * @en The response returned by the chunk request.
   */
  response?: unknown;
}

export interface HUploadPartRequestOptions {
  /**
   * 分片上传地址
   * @en The chunk upload URL.
   */
  action: string;
  /**
   * 分片请求方式
   * @en The chunk request method.
   */
  method: string;
  /**
   * 分片请求头
   * @en The chunk request headers.
   */
  headers: Data;
  /**
   * 分片请求附加数据
   * @en The extra chunk request data.
   */
  data: Data;
  /**
   * 是否携带凭证
   * @en Whether credentials are included with the chunk request.
   */
  withCredentials: boolean;
  /**
   * 暂停上传时会触发的取消信号
   * @en The cancellation signal aborted when the upload is paused.
   */
  signal: AbortSignal;
  /**
   * 上报当前分片已上传的字节数
   * @param loaded 当前分片已上传的字节数
   * @paramEn loaded The uploaded bytes of the current chunk.
   * @en Reports the uploaded bytes of the current chunk.
   */
  onProgress: (loaded: number) => void;
}

export interface HUploadMultipartSetting {
  /**
   * 同时最多上传数量
   * @default 5
   * @en The maximum number of chunks uploaded concurrently. This overrides the Upload
   * `multipartMaxAmountUploadingAtSameTime` prop for the current multipart configuration.
   */
  maxAmountUploadingAtSameTime?: number;
  /**
   * 初始化上传
   * 一般类似于'七牛'等服务上传前都会要求初始化请求，并获取唯一上传id
   * 返回的数据会追加到每个分片请求体中
   * @param file 待上传文件
   * @paramEn file The file value.
   * @en Initializes a multipart upload. The returned data is appended to every chunk request.
   */
  initUpload?: (file: HUploadFileType) => Awaitable<Data>;
  /**
   * 获取服务端已经上传成功的分片下标，用于刷新页面或重新选择文件后的断点续传
   * 返回值中的无效下标会被忽略
   * @param file 待上传文件
   * @paramEn file The file being uploaded.
   * @param chunks 当前文件的全部分片
   * @paramEn chunks All chunks of the current file.
   * @param initData `initUpload` 返回的数据
   * @paramEn initData The data returned by `initUpload`.
   * @en Resolves the zero-based indexes of chunks already stored by the server.
   */
  getUploadedChunkIndexes?: (
    file: HUploadFileType,
    chunks: HUploadChunk[],
    initData: Data,
  ) => Awaitable<number[]>;
  /**
   * 分片文件名处理
   * @param fileRawName 文件原名
   * @paramEn fileRawName The file raw name value.
   * @param index 当前分片下标
   * @paramEn index The index value.
   * @param part 当前正在上传的文件片段
   * @paramEn part The part value.
   * @en Customizes the multipart form field name for a chunk.
   */
  filenameModify?: (fileRawName: string, index: number, part: Blob) => string;
  /**
   * 分片上传前请求处理，返回的数据会追加到当前上传的 `body` 中
   * @param file 正在上传的文件对象
   * @paramEn file The file value.
   * @param index 分片下标
   * @paramEn index The index value.
   * @param part 当前正在上传的文件片段
   * @paramEn part The part value.
   * @en Returns extra form data appended before a chunk is uploaded.
   */
  beforePartUpload?: (file: HUploadFileType, index: number, part: Blob) => Data;
  /**
   * 自定义单个分片的上传请求，适用于云存储 SDK 或其他非 XMLHttpRequest 上传方式
   * 未设置时组件使用 `action`、`method`、`header` 和 `data` 发起 XMLHttpRequest
   * @param file 正在上传的文件
   * @paramEn file The file being uploaded.
   * @param chunk 当前分片
   * @paramEn chunk The current chunk.
   * @param options 请求配置、取消信号和进度回调
   * @paramEn options The request options, cancellation signal, and progress reporter.
   * @en Uploads one chunk with a custom request adapter. XMLHttpRequest is used when omitted.
   */
  uploadPart?: (
    file: HUploadFileType,
    chunk: HUploadChunk,
    options: HUploadPartRequestOptions,
  ) => Awaitable<unknown>;
  /**
   * 处理合并文件，在所有分片都上传完后会回调；返回值会作为上传成功事件的响应
   * @param file 上传的文件
   * @paramEn file The file value.
   * @param chunks 所有已上传的分片的文件
   * @paramEn chunks The chunks value.
   * @en Merges all uploaded chunks. Its return value becomes the successful upload response.
   */
  handleMerge: (file: HUploadFileType, chunks: HUploadChunk[]) => Awaitable<unknown>;
}
