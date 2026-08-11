import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { DialogCommandMap, DialogEventMap, DialogRegionMap } from './contract';
import { dialogApiContract } from './contract';

export const dialogManifest = createComponentManifest({
  name: 'Dialog',
  category: 'overlay',
  description: {
    zh: '以模态浮层承载需要用户关注的信息或操作。',
    en: 'Presents information or actions that require attention in a modal overlay.',
  },
  semantics: [
    'controlled open',
    'close guard',
    'mask dismissal',
    'action footer',
    'destroy on close',
  ],
  accessibility: [
    'dialog ownership',
    'modal state',
    'escape dismissal',
    'focus trap',
    'focus return',
  ],
  testVectors: [
    'controlled state',
    'guard authorization',
    'mask close',
    'escape close',
    'action events',
  ],
  contract: {
    props: createPropManifestFields(dialogApiContract, {
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      top: { type: 'DialogOffset', description: { zh: '顶部偏移', en: 'Top offset' } },
      iconName: { type: 'string', description: { zh: '图标名称', en: 'Icon name' } },
      iconColor: { type: 'DialogIconColor', description: { zh: '图标颜色', en: 'Icon color' } },
      size: { type: 'DialogSize', description: { zh: '尺寸', en: 'Size' } },
      mask: { type: 'boolean', description: { zh: '展示遮罩', en: 'Shows mask' } },
      maskClose: { type: 'boolean', description: { zh: '遮罩关闭', en: 'Mask dismissal' } },
      escClose: { type: 'boolean', description: { zh: 'Escape 关闭', en: 'Escape dismissal' } },
      closeButton: { type: 'boolean', description: { zh: '关闭按钮', en: 'Close button' } },
      okButtonProps: {
        type: 'DialogButtonOptions',
        description: { zh: '确认按钮参数', en: 'Confirm button options' },
      },
      okText: { type: 'string', description: { zh: '确认文字', en: 'Confirm label' } },
      cancelButtonProps: {
        type: 'DialogButtonOptions',
        description: { zh: '取消按钮参数', en: 'Cancel button options' },
      },
      cancelText: { type: 'string', description: { zh: '取消文字', en: 'Cancel label' } },
      beforeClose: {
        type: 'DialogBeforeClose',
        description: { zh: '关闭守卫', en: 'Close guard' },
      },
      destroyOnClose: {
        type: 'boolean',
        description: { zh: '关闭后销毁', en: 'Unmounts after close' },
      },
      zIndex: { type: 'number', description: { zh: '浮层层级', en: 'Z-index' } },
      lockScroll: {
        type: 'boolean',
        description: { zh: '锁定背景滚动', en: 'Locks background scroll' },
      },
      draggable: { type: 'boolean', description: { zh: '允许拖拽', en: 'Draggable' } },
    }),
    emits: createManifestFields<DialogEventMap>({
      openChange: {
        type: '[boolean, DialogOpenChangeDetails]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      ok: { type: 'void', description: { zh: '确认操作', en: 'Confirm action' } },
      cancel: { type: 'void', description: { zh: '取消操作', en: 'Cancel action' } },
      open: { type: 'void', description: { zh: '开始打开', en: 'Opening started' } },
      opened: { type: 'void', description: { zh: '完全打开', en: 'Opening completed' } },
      close: { type: 'void', description: { zh: '开始关闭', en: 'Closing started' } },
      closed: { type: 'void', description: { zh: '完全关闭', en: 'Closing completed' } },
      closeIconClick: {
        type: 'void',
        description: { zh: '点击关闭按钮', en: 'Close button clicked' },
      },
      maskClick: {
        type: 'void',
        description: { zh: '点击背景遮罩', en: 'Background mask clicked' },
      },
      confirmDebounceFinished: {
        type: 'void',
        description: { zh: '确认按钮防抖结束', en: 'Confirm debounce completed' },
      },
      cancelDebounceFinished: {
        type: 'void',
        description: { zh: '取消按钮防抖结束', en: 'Cancel debounce completed' },
      },
    }),
    slots: createManifestFields<DialogRegionMap>({
      content: { type: 'void', description: { zh: '正文', en: 'Body content' } },
      title: { type: 'void', description: { zh: '标题', en: 'Title content' } },
      footer: { type: 'void', description: { zh: '底部操作区', en: 'Footer actions' } },
    }),
    exposes: createManifestFields<DialogCommandMap>({
      open: { type: '() => void', description: { zh: '打开对话框', en: 'Opens the dialog' } },
      close: { type: '() => void', description: { zh: '关闭对话框', en: 'Closes the dialog' } },
    }),
  },
});
