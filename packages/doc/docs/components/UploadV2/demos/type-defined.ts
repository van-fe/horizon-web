import type { Data } from '@aurora/shared';

export type NUploadRawFileType = NUploadUserFile | File | NUploadFileType;

export enum NUploadFileTypeEnum {
  Unknown = 'unknown',
  Pdf = 'pdf',
  Word = 'word',
  Excel = 'excel',
  Ppt = 'ppt',
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Zip = 'zip',
  Link = 'link',
}

export const fileTypeMapping: Record<NUploadFileTypeEnum, string[]> = {
  [NUploadFileTypeEnum.Image]: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  [NUploadFileTypeEnum.Word]: ['doc', 'docx'],
  [NUploadFileTypeEnum.Excel]: ['xls', 'xlsx'],
  [NUploadFileTypeEnum.Ppt]: ['ppt', 'pptx'],
  [NUploadFileTypeEnum.Pdf]: ['pdf'],
  [NUploadFileTypeEnum.Audio]: ['mp3', 'wav', 'wma'],
  [NUploadFileTypeEnum.Video]: ['mp4', 'wam', 'webm'],
  [NUploadFileTypeEnum.Zip]: ['zip', 'rar', '7z'],
  [NUploadFileTypeEnum.Link]: ['lnk', 'url', 'uri'],
  [NUploadFileTypeEnum.Unknown]: [],
};

export enum NUploadFileStatusEnum {
  New = 'new',
  Pending = 'pending',
  Uploading = 'uploading',
  Success = 'success',
  Fail = 'fail',
  Canceling = 'canceling',
  Canceled = 'canceled',
  Pause = 'pause',
  Retrying = 'retrying',
}

export interface NUploadFileType {
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件上传进度
   */
  percentage?: number;
  /**
   * 文件状态
   */
  status: NUploadFileStatusEnum;
  /**
   * 文件类型
   */
  type: NUploadFileTypeEnum;
  /**
   * 文件大小
   */
  size?: number | null;
  /**
   * 服务器返回
   */
  response?: any;
  /**
   * 用来识别文件的唯一值
   */
  uuid: string;
  /**
   * 上传后的地址
   */
  url: string;
  /**
   * 本地预览地址
   */
  blobUrl?: string;
  /**
   * 视频封面地址
   */
  posterUrl?: string;
  /**
   * 视频时长
   */
  duration?: number;
  /**
   * 原始文件
   */
  raw?: File;
}

type PartialInclude<T, K extends keyof T = keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]?: T[Key];
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
}

export type NUploadUserFile = PartialInclude<
  NUploadFileType,
  'status' | 'uuid' | 'type' | 'blobUrl'
>;

export interface NUploadSetStatusOptionsMapping {
  [NUploadFileStatusEnum.Success]: {
    response: Data | undefined;
    uploadUrl: string | undefined;
  };
  [NUploadFileStatusEnum.Fail]: {
    reason: string;
    response: Data | undefined;
  };
  [NUploadFileStatusEnum.New]: undefined;
  [NUploadFileStatusEnum.Pending]: undefined;
  [NUploadFileStatusEnum.Uploading]: {
    progress: number;
    response: Data | undefined;
  };
  [NUploadFileStatusEnum.Canceling]: undefined;
  [NUploadFileStatusEnum.Canceled]: undefined;
  [NUploadFileStatusEnum.Pause]: undefined;
  [NUploadFileStatusEnum.Retrying]: undefined;
}

export interface NUploadHttpRequestInstanceMethods {
  /**
   * 设置当前文件状态，可以通过这个方法设置文件的各种状态，包括上传进度
   * @param file 当前文件
   * @param status 状态
   * @param args 参数
   */
  setStatus: <T extends NUploadFileStatusEnum = NUploadFileStatusEnum>(
    file: NUploadFileType,
    status: T,
    args?: NUploadSetStatusOptionsMapping[T],
  ) => void;
  /**
   * 当文件上传成功后调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadSuccess: (file: NUploadFileType, response: string) => void;
  /**
   * 当文件上传失败时调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   * @param responseText
   * @param response
   */
  onUploadFail: (file: NUploadFileType, responseText: string, response: string) => void;
  /**
   * 上传结束后调用，不处理文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadFinished: (file: NUploadFileType) => void;
  /**
   * 在上传开始前调用，会将文件加到上传队列
   * @param file 当前文件
   * @param requestInstance 请求时的实例，可以是 xhr 也可以是 fetch 返回的对象
   */
  addUploadingQueue: (file: NUploadFileType, requestInstance: unknown) => void;
}