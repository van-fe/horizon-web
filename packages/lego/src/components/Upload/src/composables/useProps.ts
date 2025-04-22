import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';
import type { UploadHelperFile, XhrUploadOnChange } from '@nio-fe/upload-helper';

export type NUploadRequestOptions = {
  fileKey?: string;
  url: string;
  method?: string;
  withCredentials?: boolean;
  headers?: any;
  data?: any;
  xhrSuccess?: (xhr: XMLHttpRequest) => boolean;
};

export type NUploadCustomRequest = UploadHelperFile & {
  file: File | Blob;
  onChange: XhrUploadOnChange;
};

export type NUploadOptions = {
  concurrent?: number;
  sliceSize?: number;
  sliceMethod?: (file: File | Blob, start: number, end: number) => void;
  customRequest?: NUploadCustomRequest;
  requestOptions?: NUploadRequestOptions;
};

export type NUploadListenClipBorad = {
  enable?: boolean;
  filter?: (file: File[]) => File[];
};

export type NMIMEIconType = {
  [key: string]: (
    fileType: string,
    fileName: string,
  ) => {
    name: string;
    color: string;
  };
};

const triggerItemProps = declarePropType({
  /**
   * 文件类型限制
   */
  accept: { type: String, default: '*' },

  /**
   * 单选多选
   */
  multiple: { type: Boolean, default: false },

  /**
   * 监听剪贴板
   * @version 2.0.0-beta.4
   */
  listenClipBorad: {
    type: Object as PropType<NUploadListenClipBorad>,
    required: false,
  },

  /**
   * 选择目录
   */
  directory: { type: Boolean, default: false },

  /**
   * 禁用
   */
  disabled: { type: Boolean, default: undefined },
});

const combineItemProps = declarePropType({
  /**
   * 自定义不同 MIME 类型对应的展示图标
   */
  mimeIcons: {
    type: Object as PropType<NMIMEIconType>,
  },
  /**
   * 最大上传数量
   */
  limit: {
    type: Number,
    default: undefined,
  },

  /**
   * 是否展示进度数字内容
   */
  progressNumberVisible: {
    type: Boolean,
    default: true,
  },

  /**
   * 组件大小风格
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },

  /**
   * 操作按钮，有默认实现的有delete（删除）和status，status为上传时操作为暂停，status为暂停时操作为恢复上传，status为出错时操作为重试，status为成功时操作为查看文件
   */
  operators: {
    type: Array as PropType<('delete' | 'download' | 'status')[]>,
    default() {
      return [];
    },
  },

  /**
   * 是否只展示列表
   */
  readonly: {
    type: Boolean,
    default: false,
  },
});

const previewItemProps = declarePropType({
  /**
   * 单个文件信息
   */
  file: {
    type: Object as PropType<UploadHelperFile>,
    default() {
      return {};
    },
  },

  readonly: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 控件尺寸
   */
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    required: false,
  },

  /**
   * 自定义不同 MIME 类型对应的展示图标
   */
  mimeIcons: {
    type: Object as PropType<NMIMEIconType>,
  },

  /**
   * 操作按钮，有默认实现的有delete（删除）和status，status为上传时操作为暂停，status为暂停时操作为恢复上传，status为出错时操作为重试，status为成功时操作为查看文件
   */
  operators: {
    type: Array as PropType<('delete' | 'download' | 'status')[]>,
    default() {
      return [];
    },
  },

  /**
   * 扩展 classname
   */
  externalClassName: {
    type: String,
  },
});

export const useUploadButtonProps = declarePropType({
  ...triggerItemProps,
  ...combineItemProps,
  /**
   * 上传文件列表
   */
  uploadFileList: {
    type: Array as PropType<UploadHelperFile[]>,
  },

  /**
   * button icon
   */
  icon: { type: String, default: 'upload' },

  /**
   * button 展示文案
   */
  text: { type: String, default: '上传' },
});
export type UploadButtonProps = ExtractPropTypes<typeof useUploadButtonProps>;

export const useUploadImgProps = declarePropType({
  ...triggerItemProps,
  ...combineItemProps,
  /**
   * 上传文件列表
   */
  uploadFileList: {
    type: Array as PropType<UploadHelperFile[]>,
  },

  /**
   * 控件展示宽高比例
   */
  proportion: {
    type: String as PropType<'rectangle' | 'square'>,
    default: 'rectangle',
  },
});
export type UploadImgProps = ExtractPropTypes<typeof useUploadImgProps>;

export const useUploadAreaProps = declarePropType({
  ...triggerItemProps,

  /**
   * 标题
   */
  title: {
    type: String,
    default: '点击上传或将文件拖拽至此区域',
  },

  /**
   * 说明文案
   */
  text: {
    type: String,
    default: '',
  },
});
export type UploadAreaProps = ExtractPropTypes<typeof useUploadAreaProps>;

export const useUploadPreviewImgItemProps = declarePropType({
  ...previewItemProps,

  /**
   * 控件展示宽高比例
   */
  proportion: {
    type: String as PropType<'rectangle' | 'square'>,
    default: 'rectangle',
  },
});
export type UploadPreviewImgItemProps = ExtractPropTypes<typeof useUploadPreviewImgItemProps>;

export const useUploadPreviewFileItemProps = declarePropType({
  ...previewItemProps,

  /**
   * 是否展示进度数字内容
   */
  progressNumberVisible: {
    type: Boolean,
    default: true,
  },
});
export type UploadPreviewFileItemProps = ExtractPropTypes<typeof useUploadPreviewFileItemProps>;

export const useUploadProps = declarePropType({
  ...triggerItemProps,
  ...combineItemProps,

  /**
   * 上传组件类型
   */
  type: {
    type: String as PropType<'list' | 'img'>,
    default: 'list',
  },

  /**
   * 上传配置，可以设置并行上传的文件数、自定义上传行为等，可以是一个对象或者是一个返回Promise的函数，细节可以参考UploadHelper文档
   */
  uploadOptions: {
    type: [Object, Function] as PropType<NUploadOptions | (() => Promise<NUploadOptions>)>,
  },

  /**
   * 默认上传的文件列表
   */
  modelValue: {
    type: Array as PropType<UploadHelperFile[]>,
  },

  /**
   * button icon，type 为 list 时生效
   */
  icon: { type: String, default: 'upload' },

  /**
   * button 展示文案，type 为 list 时生效
   */
  text: { type: String, default: '上传' },

  /**
   * 控件展示宽高比例，type 为 img 时生效
   */
  proportion: {
    type: String as PropType<'rectangle' | 'square'>,
    default: 'rectangle',
  },

  /**
   * 上传前 hook，可用于过滤掉不上传的文件
   */
  beforeUpload: {
    type: Function as PropType<(files: FileList | null) => FileList | File[]>,
  },

  /**
   * 上传后 hook，所有文件上传完成（成功、失败、取消、删除都算完成，上传中、上传暂停和等待上传不算）后触发
   */
  afterUpload: {
    type: Function as PropType<
      (uploadFileList: UploadHelperFile[], fileArr: UploadHelperFile[]) => void
    >,
  },
});

export type UploadProps = ExtractPropTypes<typeof useUploadProps>;
