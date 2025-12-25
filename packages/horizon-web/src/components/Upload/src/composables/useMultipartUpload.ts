import type { Awaitable, Data } from '@aurora/utils';
import type { HUploadFileType } from '../utils/fileDefines';

export interface HUploadChunk {
  /**
   * 分片下表
   */
  index: number;
  /**
   * 分片大小
   */
  size: number;
  /**
   * 分片文件内容
   */
  part: Blob;
  /**
   * 分片上传状态
   */
  status: 'pending' | 'uploading' | 'success' | 'fail';
}

export interface HUploadMultipartSetting {
  /**
   * 同时最多上传数量
   * @default 5
   */
  maxAmountUploadingAtSameTime?: number;
  /**
   * 初始化上传
   * 一般类似于'七牛'等服务上传前都会要求初始化请求，并获取唯一上传id
   * 返回的数据会追加到请求体中
   * @param file 待上传文件
   */
  initUpload?: (file: HUploadFileType) => Awaitable<Data>;
  /**
   * 分片文件名处理
   * @param fileRawName 文件原名
   * @param index 当前分片下标
   * @param part 当前正在上传的文件片段
   */
  filenameModify?: (fileRawName: string, index: number, part: Blob) => string;
  /**
   * 分片上传前请求处理，返回的数据会追加到当前上传的 `body` 中
   * @param file 正在上传的文件对象
   * @param index 分片下标
   * @param part 当前正在上传的文件片段
   */
  beforePartUpload?: (file: HUploadFileType, index: number, part: Blob) => Data;
  /**
   * 处理合并文件，在所有part都上传完后会回调
   * @param file 上传的文件
   * @param chunks 所有已上传的分片的文件
   */
  handleMerge: (file: HUploadFileType, chunks: HUploadChunk[]) => Promise<void>;
}
