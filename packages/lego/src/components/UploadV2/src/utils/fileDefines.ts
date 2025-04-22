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
} from '@nio-fe/icon';
import type { Data, DefinedComponent, PartialInclude } from '@nio-fe/shared';

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
  [NUploadV2FileTypeEnum.Video]: ['mp4', 'wam', 'webm', 'mov'],
  [NUploadV2FileTypeEnum.Zip]: ['zip', 'rar', '7z'],
  [NUploadV2FileTypeEnum.Link]: ['lnk', 'url', 'uri'],
  [NUploadV2FileTypeEnum.Unknown]: [],
};

export const fileTypeIconMapping: Record<NUploadV2FileTypeEnum, DefinedComponent> = {
  [NUploadV2FileTypeEnum.Image]: IconPictureFilledLight,
  [NUploadV2FileTypeEnum.Word]: IconWordFilledLight,
  [NUploadV2FileTypeEnum.Excel]: IconExcelFilledLight,
  [NUploadV2FileTypeEnum.Ppt]: IconPptFilledLight,
  [NUploadV2FileTypeEnum.Pdf]: IconPdfFilledLight,
  [NUploadV2FileTypeEnum.Audio]: IconMp3FilledLight,
  [NUploadV2FileTypeEnum.Video]: IconVideoFilledLight,
  [NUploadV2FileTypeEnum.Zip]: IconZipFilledLight,
  [NUploadV2FileTypeEnum.Link]: IconLinkFilledLight,
  [NUploadV2FileTypeEnum.Unknown]: IconUnknownFilledLight,
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

export type NUploadV2UserFile = PartialInclude<
  NUploadV2FileType,
  'status' | 'uuid' | 'type' | 'blobUrl'
>;

export interface NUploadV2SetStatusOptionsMapping {
  [NUploadV2FileStatusEnum.Success]: {
    response: Data | undefined;
    uploadUrl: string | undefined;
  };
  [NUploadV2FileStatusEnum.Fail]: {
    reason: string;
    response: Data | undefined;
  };
  [NUploadV2FileStatusEnum.New]: undefined;
  [NUploadV2FileStatusEnum.Pending]: undefined;
  [NUploadV2FileStatusEnum.Uploading]: {
    progress: number;
    response: Data | undefined;
  };
  [NUploadV2FileStatusEnum.Canceling]: undefined;
  [NUploadV2FileStatusEnum.Canceled]: undefined;
  [NUploadV2FileStatusEnum.Pause]: undefined;
  [NUploadV2FileStatusEnum.Retrying]: undefined;
}

export interface NUploadV2HttpRequestInstanceMethods {
  /**
   * 设置当前文件状态，可以通过这个方法设置文件的各种状态，包括上传进度
   * @param file 当前文件
   * @param status 状态
   * @param args 参数
   */
  setStatus: <T extends NUploadV2FileStatusEnum = NUploadV2FileStatusEnum>(
    file: NUploadV2FileType,
    status: T,
    args?: NUploadV2SetStatusOptionsMapping[T],
  ) => void;
  /**
   * 当文件上传成功后调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadSuccess: (file: NUploadV2FileType, response: string) => void;
  /**
   * 当文件上传失败时调用，会自动修改文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   * @param responseText
   * @param response
   */
  onUploadFail: (file: NUploadV2FileType, responseText: string, response: string) => void;
  /**
   * 上传结束后调用，不处理文件状态，调用后会自动从队列中拿取下一个上传的文件
   * @param file 当前文件
   */
  onUploadFinished: (file: NUploadV2FileType) => void;
  /**
   * 在上传开始前调用，会将文件加到上传队列
   * @param file 当前文件
   * @param requestInstance 请求时的实例，可以是 xhr 也可以是 fetch 返回的对象
   */
  addUploadingQueue: (file: NUploadV2FileType, requestInstance: unknown) => void;
}
