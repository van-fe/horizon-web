import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { AvatarCommandMap, AvatarEventMap, AvatarRegionMap } from './contract';
import { avatarApiContract } from './contract';

export const avatarManifest = createComponentManifest({
  name: 'Avatar',
  category: 'basic',
  description: {
    zh: '展示个人、组织或对象的身份图像。',
    en: 'Represents a person, organization, or object.',
  },
  semantics: ['image', 'initials', 'icon', 'group images', 'fallback'],
  accessibility: ['alternative label', 'image error fallback'],
  testVectors: ['preset size', 'numeric size', 'image', 'initials', 'error fallback', 'group'],
  contract: {
    props: createPropManifestFields(avatarApiContract, {
      size: {
        type: 'AvatarSize',
        description: { zh: '头像尺寸', en: 'Avatar size' },
      },
      src: {
        type: 'string | readonly string[]',
        description: { zh: '图像或文字来源', en: 'Image or text source' },
      },
      fit: {
        type: 'AvatarFit',
        description: { zh: '图像适应方式', en: 'Image fit' },
      },
      type: {
        type: 'AvatarType',
        description: { zh: '头像类型', en: 'Avatar type' },
      },
      fallbackSrc: {
        type: 'string',
        description: { zh: '兜底图像', en: 'Fallback image' },
      },
    }),
    emits: createManifestFields<AvatarEventMap>({
      error: {
        type: 'NativeErrorEvent',
        description: { zh: '图像加载失败', en: 'Image loading failed' },
      },
    }),
    slots: createManifestFields<AvatarRegionMap>({
      content: {
        type: 'content',
        description: { zh: '自定义内容', en: 'Custom content' },
      },
      fallback: {
        type: 'content',
        description: { zh: '失败内容', en: 'Fallback content' },
      },
    }),
    exposes: createManifestFields<AvatarCommandMap>({}),
  },
});
