export type HUploadRawFileType = HUploadUserFile | File | HUploadFileType;

export enum HUploadFileTypeEnum {
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

export const fileTypeMapping: Record<HUploadFileTypeEnum, string[]> = {
  [HUploadFileTypeEnum.Image]: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  [HUploadFileTypeEnum.Word]: ['doc', 'docx'],
  [HUploadFileTypeEnum.Excel]: ['xls', 'xlsx'],
  [HUploadFileTypeEnum.Ppt]: ['ppt', 'pptx'],
  [HUploadFileTypeEnum.Pdf]: ['pdf'],
  [HUploadFileTypeEnum.Audio]: ['mp3', 'wav', 'wma'],
  [HUploadFileTypeEnum.Video]: ['mp4', 'wam', 'webm'],
  [HUploadFileTypeEnum.Zip]: ['zip', 'rar', '7z'],
  [HUploadFileTypeEnum.Link]: ['lnk', 'url', 'uri'],
  [HUploadFileTypeEnum.Unknown]: [],
};

export enum HUploadFileStatusEnum {
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

export interface HUploadFileType {
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
  status: HUploadFileStatusEnum;
  /**
   * 文件类型
   */
  type: HUploadFileTypeEnum;
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

export type HUploadUserFile = PartialInclude<
  HUploadFileType,
  'status' | 'uuid' | 'type' | 'blobUrl'
>;
