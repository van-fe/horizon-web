import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { DrawerCommandMap, DrawerEventMap, DrawerRegionMap } from './contract';
import { drawerApiContract } from './contract';

export const drawerManifest = createComponentManifest({
  name: 'Drawer',
  category: 'overlay',
  description: {
    zh: '从界面边缘滑出承载补充信息或操作的面板。',
    en: 'Slides a panel from an interface edge for supplemental information or actions.',
  },
  semantics: [
    'controlled open',
    'result close guard',
    'four placements',
    'resizable extent',
    'action footer',
  ],
  accessibility: [
    'dialog ownership',
    'modal state',
    'escape dismissal',
    'focus trap',
    'focus return',
  ],
  testVectors: ['placement', 'custom size', 'guard veto', 'async guard', 'resize direction'],
  contract: {
    props: createPropManifestFields(drawerApiContract, {
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      placement: { type: 'DrawerPlacement', description: { zh: '展开方向', en: 'Placement' } },
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      size: { type: 'DrawerSize', description: { zh: '尺寸', en: 'Extent' } },
      mask: { type: 'boolean', description: { zh: '展示遮罩', en: 'Shows mask' } },
      maskClosable: { type: 'boolean', description: { zh: '遮罩关闭', en: 'Mask dismissal' } },
      escClosable: { type: 'boolean', description: { zh: 'Escape 关闭', en: 'Escape dismissal' } },
      closable: { type: 'boolean', description: { zh: '关闭按钮', en: 'Close button' } },
      footer: { type: 'boolean', description: { zh: '展示底部', en: 'Shows footer' } },
      header: { type: 'boolean', description: { zh: '展示头部', en: 'Shows header' } },
      okButton: {
        type: 'DialogButtonOptions',
        description: { zh: '确认按钮', en: 'Confirm button' },
      },
      okButtonText: { type: 'string', description: { zh: '确认文字', en: 'Confirm label' } },
      cancelButton: {
        type: 'DialogButtonOptions',
        description: { zh: '取消按钮', en: 'Cancel button' },
      },
      cancelButtonText: { type: 'string', description: { zh: '取消文字', en: 'Cancel label' } },
      beforeClose: {
        type: 'DrawerBeforeClose',
        description: { zh: '关闭守卫', en: 'Close guard' },
      },
      lockScroll: {
        type: 'boolean',
        description: { zh: '锁定背景滚动', en: 'Locks background scroll' },
      },
      sizeDraggable: {
        type: 'boolean',
        description: { zh: '拖拽调整尺寸', en: 'Resizable extent' },
      },
      loading: {
        type: 'boolean',
        description: { zh: '确认加载状态', en: 'Confirm loading state' },
      },
      destroyOnClose: {
        type: 'boolean',
        description: { zh: '关闭后销毁', en: 'Unmounts after close' },
      },
    }),
    emits: createManifestFields<DrawerEventMap>({
      openChange: {
        type: '[boolean, DrawerOpenChangeDetails]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      ok: { type: 'void', description: { zh: '确认操作', en: 'Confirm action' } },
      cancel: { type: 'void', description: { zh: '取消操作', en: 'Cancel action' } },
      open: { type: 'void', description: { zh: '开始打开', en: 'Opening started' } },
      opened: { type: 'void', description: { zh: '完全打开', en: 'Opening completed' } },
      close: { type: 'void', description: { zh: '开始关闭', en: 'Closing started' } },
      closed: { type: 'void', description: { zh: '完全关闭', en: 'Closing completed' } },
      maskClick: {
        type: 'void',
        description: { zh: '点击背景遮罩', en: 'Background mask clicked' },
      },
      iconClick: { type: 'void', description: { zh: '点击关闭按钮', en: 'Close button clicked' } },
    }),
    slots: createManifestFields<DrawerRegionMap>({
      content: { type: 'void', description: { zh: '正文', en: 'Body content' } },
      title: { type: 'void', description: { zh: '默认头部标题', en: 'Default header title' } },
      header: { type: 'void', description: { zh: '完整头部', en: 'Complete header' } },
      footer: { type: 'void', description: { zh: '底部操作区', en: 'Footer actions' } },
    }),
    exposes: createManifestFields<DrawerCommandMap>({
      open: { type: '() => void', description: { zh: '打开抽屉', en: 'Opens the drawer' } },
      close: { type: '() => void', description: { zh: '关闭抽屉', en: 'Closes the drawer' } },
    }),
  },
});
