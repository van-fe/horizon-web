import {
  IconPictureFilledLight,
  IconWordFilledLight,
  IconExcelFilledLight,
  IconPptFilledLight,
  IconPdfFilledLight,
  IconMp3FilledLight,
  IconVideoFilledLight,
  IconZipFilledLight,
  IconLinkFilledLight,
  IconUnknownFilledLight,
} from '@aurora/icon';
import type { Data, DefinedComponent, PartialInclude } from '@aurora/utils';

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
  [HUploadFileTypeEnum.Video]: ['mp4', 'wam', 'webm', 'mov'],
  [HUploadFileTypeEnum.Zip]: ['zip', 'rar', '7z'],
  [HUploadFileTypeEnum.Link]: ['lnk', 'url', 'uri'],
  [HUploadFileTypeEnum.Unknown]: [],
};

export const fileTypeIconMapping: Record<HUploadFileTypeEnum, DefinedComponent> = {
  [HUploadFileTypeEnum.Image]: IconPictureFilledLight,
  [HUploadFileTypeEnum.Word]: IconWordFilledLight,
  [HUploadFileTypeEnum.Excel]: IconExcelFilledLight,
  [HUploadFileTypeEnum.Ppt]: IconPptFilledLight,
  [HUploadFileTypeEnum.Pdf]: IconPdfFilledLight,
  [HUploadFileTypeEnum.Audio]: IconMp3FilledLight,
  [HUploadFileTypeEnum.Video]: IconVideoFilledLight,
  [HUploadFileTypeEnum.Zip]: IconZipFilledLight,
  [HUploadFileTypeEnum.Link]: IconLinkFilledLight,
  [HUploadFileTypeEnum.Unknown]: IconUnknownFilledLight,
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

export type HUploadUserFile = PartialInclude<
  HUploadFileType,
  'status' | 'uuid' | 'type' | 'blobUrl'
>;

export interface HUploadSetStatusOptionsMapping {
  [HUploadFileStatusEnum.Success]: {
    response: Data | undefined;
    uploadUrl: string | undefined;
  };
  [HUploadFileStatusEnum.Fail]: {
    reason: string;
    response: Data | undefined;
  };
  [HUploadFileStatusEnum.New]: undefined;
  [HUploadFileStatusEnum.Pending]: undefined;
  [HUploadFileStatusEnum.Uploading]: {
    progress: number;
    response: Data | undefined;
  };
  [HUploadFileStatusEnum.Canceling]: undefined;
  [HUploadFileStatusEnum.Canceled]: undefined;
  [HUploadFileStatusEnum.Pause]: undefined;
  [HUploadFileStatusEnum.Retrying]: undefined;
}

export interface HUploadHttpRequestInstanceMethods {
  /**
   * 设置当前文件状态，可以通过这个方法设置文件的各种状态，包括上传进度
   * @param file 当前文件
   * @param status 状态
   * @param args 参数
   */
  setStatus: <T extends HUploadFileStatusEnum = HUploadFileStatusEnum>(
    file: HUploadFileType,
    status: T,
    args?: HUploadSetStatusOptionsMapping[T],
  ) => void;
  /**
   * 当文件上传成功后调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadSuccess: (file: HUploadFileType, response: string) => void;
  /**
   * 当文件上传失败时调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   * @param responseText
   * @param response
   */
  onUploadFail: (file: HUploadFileType, responseText: string, response: string) => void;
  /**
   * 上传结束后调用，不处理文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadFinished: (file: HUploadFileType) => void;
  /**
   * 在上传开始前调用，会将文件加到上传队列
   * @param file 当前文件
   * @param requestInstance 请求时的实例，可以是 xhr 也可以是 fetch 返回的对象
   */
  addUploadingQueue: (file: HUploadFileType, requestInstance: unknown) => void;
}
