export type NUploadV2RawFileType = NUploadV2UserFile | File | NUploadV2FileType;

export enum NUploadV2FileTypeEnum {
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

export const fileTypeMapping: Record<NUploadV2FileTypeEnum, string[]> = {
  [NUploadV2FileTypeEnum.Image]: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  [NUploadV2FileTypeEnum.Word]: ['doc', 'docx'],
  [NUploadV2FileTypeEnum.Excel]: ['xls', 'xlsx'],
  [NUploadV2FileTypeEnum.Ppt]: ['ppt', 'pptx'],
  [NUploadV2FileTypeEnum.Pdf]: ['pdf'],
  [NUploadV2FileTypeEnum.Audio]: ['mp3', 'wav', 'wma'],
  [NUploadV2FileTypeEnum.Video]: ['mp4', 'wam', 'webm'],
  [NUploadV2FileTypeEnum.Zip]: ['zip', 'rar', '7z'],
  [NUploadV2FileTypeEnum.Link]: ['lnk', 'url', 'uri'],
  [NUploadV2FileTypeEnum.Unknown]: [],
};

export enum NUploadV2FileStatusEnum {
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

export interface NUploadV2FileType {
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
  status: NUploadV2FileStatusEnum;
  /**
   * 文件类型
   */
  type: NUploadV2FileTypeEnum;
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

export type NUploadV2UserFile = PartialInclude<
  NUploadV2FileType,
  'status' | 'uuid' | 'type' | 'blobUrl'
>;
