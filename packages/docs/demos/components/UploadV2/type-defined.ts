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
