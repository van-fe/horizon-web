import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { QRCodeCommandMap, QRCodeEventMap, QRCodeRegionMap } from './contract';
import { qrCodeApiContract } from './contract';

export const qrCodeManifest = createComponentManifest({
  name: 'QRCode',
  category: 'feedback',
  description: {
    zh: '生成可配置且可刷新的二维码。',
    en: 'Generates a configurable, refreshable QR code.',
  },
  semantics: ['SVG generation', 'error correction', 'quiet zone', 'center icon', 'expired state'],
  accessibility: ['accessible image name', 'busy state', 'semantic refresh action'],
  testVectors: [
    'empty content',
    'all levels',
    'custom colors',
    'stale generation',
    'expired content',
  ],
  contract: {
    props: createPropManifestFields(qrCodeApiContract, {
      value: {
        type: 'string',
        required: true,
        description: { zh: '二维码内容', en: 'QR code content' },
      },
      size: { type: 'number', description: { zh: '边长', en: 'Side length' } },
      level: { type: 'QRCodeLevel', description: { zh: '纠错等级', en: 'Error correction level' } },
      color: { type: 'string', description: { zh: '前景色', en: 'Foreground color' } },
      background: { type: 'string', description: { zh: '背景色', en: 'Background color' } },
      margin: { type: 'number', description: { zh: '静区模块数量', en: 'Quiet-zone modules' } },
      icon: { type: 'string', description: { zh: '中央图标地址', en: 'Center icon URL' } },
      iconSize: { type: 'number', description: { zh: '中央图标尺寸', en: 'Center icon size' } },
      expired: { type: 'boolean', description: { zh: '是否失效', en: 'Whether expired' } },
      expiredText: { type: 'string', description: { zh: '失效提示', en: 'Expired message' } },
      ariaLabel: { type: 'string', description: { zh: '可访问名称', en: 'Accessible name' } },
    }),
    emits: createManifestFields<QRCodeEventMap>({
      refresh: {
        type: '[event: unknown]',
        description: { zh: '请求刷新', en: 'Refresh requested' },
      },
      error: { type: '[error: unknown]', description: { zh: '生成失败', en: 'Generation failed' } },
    }),
    slots: createManifestFields<QRCodeRegionMap>({
      expired: { type: 'content', description: { zh: '失效遮罩', en: 'Expired overlay' } },
    }),
    exposes: createManifestFields<QRCodeCommandMap>({}),
  },
});
