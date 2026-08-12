import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { ApplicationCommandMap, ApplicationEventMap, ApplicationRegionMap } from './contract';
import { applicationApiContract } from './contract';

export const applicationManifest = createComponentManifest({
  name: 'Application',
  category: 'basic',
  description: {
    zh: '为后代组件提供应用级配置。',
    en: 'Provides application-level configuration to descendant components.',
  },
  semantics: ['locale', 'default size', 'namespace', 'time-zone display scope'],
  accessibility: ['does not add DOM wrappers', 'configuration remains scoped'],
  testVectors: ['nested providers', 'reactive size', 'locale', 'namespace', 'time zone'],
  contract: {
    props: createPropManifestFields(applicationApiContract, {
      locale: { type: 'Locale', description: { zh: '语言', en: 'Locale' } },
      size: { type: 'ApplicationSize', description: { zh: '默认尺寸', en: 'Default size' } },
      namespace: { type: 'string', description: { zh: '命名空间', en: 'Namespace' } },
      showTimeZone: {
        type: 'ApplicationShowTimeZone',
        description: { zh: '时区显示范围', en: 'Time-zone display scope' },
      },
    }),
    emits: createManifestFields<ApplicationEventMap>({}),
    slots: createManifestFields<ApplicationRegionMap>({
      content: { type: 'content', description: { zh: '作用域内容', en: 'Scoped content' } },
    }),
    exposes: createManifestFields<ApplicationCommandMap>({}),
  },
});
