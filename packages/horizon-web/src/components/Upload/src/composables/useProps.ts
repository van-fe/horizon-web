import type { ExtractPropTypes, PropType, StyleValue, UnwrapRef } from 'vue';
import type { Arrayable, Promisable } from '@aurora/utils';
import { declarePropType, isNumber, isObject } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import type { HUploadMultipartSetting } from './useMultipartUpload';
import type {
  HUploadFileType,
  HUploadRawFileType,
  HUploadHttpRequestInstanceMethods,
} from '../utils/fileDefines';

export const useUploadProps = declarePropType({
  /**
   * 唯一标识符
   * 会标注在 `input` 上
   * 在后台上传时，也可以标注其具体归属
   */
  id: {
    type: String,
  },
  /**
   * 请求 URL
   */
  action: {
    type: String,
  },
  /**
   * 上传请求头部
   */
  header: {
    type: Object as PropType<Record<string, any>>,
  },
  /**
   * 请求方式
   */
  method: {
    type: String as PropType<'POST' | 'GET' | string>,
    default: 'POST',
  },
  /**
   * 是否允许多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 上传限制个数
   */
  limit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 上传时额外参数
   */
  data: {
    type: Object as PropType<Record<string, any>>,
  },
  /**
   * 上传文件字段名
   */
  name: {
    type: String,
    default: 'file',
  },
  /**
   * 是否发送 `cookie` 凭证信息
   */
  withCredentials: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生属性 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)
   */
  crossorigin: {
    type: String as PropType<'' | 'anonymous' | 'use-credentials'>,
  },
  /**
   * 文件信息
   */
  modelValue: {
    type: [Object, Array] as PropType<Arrayable<HUploadRawFileType> | null>,
  },
  /**
   * 上传类型
   * @version 2.12.14 支持 gallery-mixed
   */
  type: {
    type: String as PropType<'button' | 'drop' | 'gallery' | 'gallery-mixed'>,
    default: 'button',
  },
  /**
   * 在 `type = 'button'` 时按钮显示的文字
   */
  buttonText: {
    type: String,
    default: undefined,
  },
  /**
   * 在 `type = 'button'` 时透传给 `button` 组件
   */
  buttonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 接收上传的 [文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
   */
  accept: {
    type: String,
  },
  /**
   * 上传严格模式
   * `false`: 与原生一致，如果用户不接受 `accept` 限制，则需要使用 `beforeUpload` 拦截
   * `true`: 严格处理用户选择的文件，非 `accept` 允许的文件不会显示在上传列表里
   */
  acceptStrict: {
    type: Boolean,
    default: true,
  },
  /**
   * 使用内部的文件类型检查
   * 如果 `accept` 是后缀名格式，支持各种类型检查
   * 但如果 `accept` 使用的是文件类型，支持的类型需要查看组件相关 DEMO 说明
   */
  useBuildInAcceptCheck: {
    type: Boolean,
    default: true,
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 文件元素尺寸
   */
  fileItemSize: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 图片列表展示形式
   */
  galleryShape: {
    type: String as PropType<'square' | 'rectangle'>,
    default: 'rectangle',
  },
  /**
   * 是否选择文件后自动上传
   */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /**
   * 文件大小限制，单位 `MB`
   * 如果超出则会抛出 `file-size-exceed` 事件并直接过滤掉
   */
  fileSizeLimit: {
    type: Number,
  },
  /**
   * 是否显示文件列表
   */
  showFileList: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示文件的缩略图
   * 仅对 `type = 'button' | 'drop'` 有效
   * @version 2.12.14
   */
  showFileThumbnail: {
    type: Boolean,
    default: false,
  },
  /**
   * 文件元素的操作
   * 如果传入的是方法，注意不能是异步方法
   * `upload`: 上传功能，包括开始上传和终止上传
   * `view`: 是否允许查看文件
   * `delete`: 是否允许显示删除按钮
   */
  controls: {
    type: [Array, Function] as PropType<
      | ('upload' | 'delete' | 'view')[]
      | ((file: UnwrapRef<HUploadFileType>) => ('upload' | 'delete' | 'view')[])
    >,
    default: () => ['upload', 'view', 'delete'] as const,
    validator(val) {
      if (val === undefined || val === null) return true;

      if (Array.isArray(val)) {
        return !val.some(curr => !['upload', 'view', 'delete'].includes(curr));
      }

      return typeof val === 'function';
    },
  },
  /**
   * 控制器是否始终显示
   * @version 2.12.14
   */
  controlsAlwaysVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否让当前上传框使用后台上传
   * 开启后在当前页面销毁后也不会停止上传
   */
  useBackground: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否让后台上传使用单独的实例
   */
  backgroundStandalone: {
    type: Boolean,
    default: false,
  },
  /**
   * 指定 `uploadBackground` 组件传送的位置
   * 不支持动态修改
   * 如需修改还需要切换 `useBackground` 值来做到重载
   * 另外如果已经有 `uploadBackground` 实例存在，则此处设置的值无效
   * 类型请参考 [Teleport.to](https://cn.vuejs.org/api/built-in-components.html#teleport)
   */
  backgroundTeleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  /**
   * 后台上传的附加样式
   */
  backgroundStyle: {
    type: [String, Object] as PropType<StyleValue>,
  },
  /**
   * 后台上传的附加类名
   */
  backgroundClass: {
    type: [String, Object] as PropType<string | object | null>,
  },
  /**
   * 是否禁用上传
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 上传/选择前的钩子，可以用来判断文件是否允许上传
   * 但只会拦截用户手动选择的文件，对于由 api 传入的文件不做拦截
   * 如果返回 `false` 或 `Promise.reject`，则停止上传
   * @param files 待上传的文件
   */
  beforeUpload: {
    type: Function as PropType<(file: HUploadFileType) => Promisable<boolean>>,
  },
  /**
   * 点击删除前的钩子，可以用来判断文件是否允许删除
   * 如果返回 `false` 或 `Promise.reject`，则不允许删除
   * @param file 待删除的文件
   */
  beforeRemove: {
    type: Function as PropType<(file: HUploadFileType) => Promisable<boolean>>,
  },
  /**
   * 点击暂停上传前的钩子，可以用来判断文件是否允许暂停上传
   * 如果返回 `false` 或 `Promise.reject`，则不允许暂停上传
   * @param file 待暂停上传的文件
   */
  beforeAbort: {
    type: Function as PropType<(file: HUploadFileType) => Promisable<boolean>>,
  },
  /**
   * 在点击预览按钮执行预览前的钩子，如果回调为 `false`，则不允许进行预览
   * @param file 待预览文件
   */
  beforePreview: {
    type: Function as PropType<(file: HUploadFileType) => Promisable<boolean | void>>,
  },
  /**
   * 传入 `Viewer` 组件的文件列表过滤函数，不可传入异步函数
   * 此钩子会在文件列表发生改动时调用，用于过滤哪些文件可以被传入 `Viewer` 中查看，但此时会先过滤出图片和视频资源文件后再调用
   * @param file 待预览文件
   * @version 2.11.6
   */
  beforeViewerPreview: {
    type: Function as PropType<(file: HUploadFileType) => boolean>,
  },
  /**
   * 在 `http` 返回 `200` 时的处理回调，需要返回的是文件实际上传后的地址
   * 如果没有传入此方法，则会递归去寻找以 `http(s)://` 开始的第一个链接作为上传后的地址
   */
  handleSuccess: {
    type: Function as PropType<(responseData: any, file: HUploadFileType) => Promisable<string>>,
  },
  /**
   * 最大同时上传数量
   */
  maxUploadsAmountAtSameTime: {
    type: Number,
    default: 5,
  },
  /**
   * 自动裁剪掉超出 `limit` 的文件
   * 对于单选时，如果超出 1 个文件，也可以通过这个属性拦截自动截取
   * `true`: 裁剪掉超出 `limit` 的文件，然后塞入文件队列，并抛出 `exceed` 事件
   * `false`: 只抛出 `exceed` 事件，不进行裁剪，也不塞入文件队列
   */
  autoSliceExceedFiles: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否隐藏上传功能
   * 设置为 `true` 时，将隐藏所有的上传按钮和区块
   * @version 2.9.4
   */
  noUploader: {
    type: Boolean,
    default: false,
  },
  /**
   * 覆盖默认的上传函数
   * 需参考 [uploadFileDirectly](https://git.nevint.com/horizon-web/horizon-web/-/blob/master/packages/horizon-web/src/components/Upload/src/utils/UploadHelper.ts) 的行为
   * @version 2.9.4
   */
  httpRequest: {
    type: Function as PropType<
      (file: HUploadFileType, instanceMethods: HUploadHttpRequestInstanceMethods) => void
    >,
  },
  /**
   * 是否显示文件大小
   * @version 2.9.4
   */
  showFileSize: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否监听剪切板粘贴事件
   * 只有在用户粘贴且剪切板中是文件时才会触发
   * @version 2.10.1
   */
  useClipboard: {
    type: Boolean,
    default: false,
  },
  /**
   * 粘贴文件前的钩子
   * 如果需要对用户粘贴的事件进行拦截，请使用此钩子判断
   * @version 2.10.1
   */
  beforePaste: {
    type: Function as PropType<(files: File[]) => Promisable<File[]>>,
  },
  /**
   * 是否在 `gallery-mixed` 模式下媒体文件显示为普通文件样式
   * @version 2.12.16
   */
  showMediaWithNormalModeInGalleryMixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用分片断点上传
   * 如需使用，需要传入相关配置
   * @invisible
   */
  multipart: {
    type: [Boolean, Object] as PropType<false | HUploadMultipartSetting>,
    default: false,
    validator(val) {
      if (typeof val === 'boolean' && !val) {
        return true;
      } else if (isObject(val)) {
        return true;
      }

      return false;
    },
  },
  /**
   * 分包大小，单位为 `MB`
   * 大小范围为 `1~1024 MB`
   * @invisible
   */
  multipartChunkSize: {
    type: Number,
    default: 2,
    validator(val) {
      return isNumber(val) && val >= 1 && val <= 1024;
    },
  },
  /**
   * 分包时，最大同时上传分片的大小
   * @invisible
   */
  multipartMaxAmountUploadingAtSameTime: {
    type: Number,
    default: 5,
  },
});

export const useUploadBackgroundProps = declarePropType({
  /**
   * 唯一标识
   */
  id: {
    type: String,
  },
  /**
   * 后台上传默认是否收起
   * 可以通过监听 `update:backgroundCollapsed` 获取变更通知
   */
  collapsed: {
    type: Boolean,
    default: true,
  },
  /**
   * 后台上传是否可由用户关闭
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * `upload` 组件的入参
   */
  uploadProps: {
    type: Object as PropType<UploadProps>,
  },
});

export type UploadProps = ExtractPropTypes<typeof useUploadProps>;
export type UploadBackgroundProps = ExtractPropTypes<typeof useUploadBackgroundProps>;
