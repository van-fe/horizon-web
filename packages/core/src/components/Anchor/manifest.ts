import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { AnchorCommandMap, AnchorEventMap, AnchorRegionMap } from './contract';
import { anchorApiContract } from './contract';

export const anchorManifest = createComponentManifest({
  name: 'Anchor',
  category: 'navigation',
  description: {
    zh: '展示页面章节并跟随滚动更新活动位置。',
    en: 'Lists page sections and tracks the active position while scrolling.',
  },
  semantics: [
    'section navigation',
    'active section',
    'nested hierarchy',
    'collapsible table of contents',
  ],
  accessibility: ['navigation landmark', 'native links', 'keyboard collapse action'],
  testVectors: [
    'viewport',
    'element target',
    'offsets',
    'nested links',
    'automatic headings',
    'collapse',
  ],
  contract: {
    props: createPropManifestFields(anchorApiContract, {
      size: { type: 'AnchorSize', description: { zh: '尺寸', en: 'Size' } },
      maxHeight: { type: 'number', description: { zh: '最大高度', en: 'Maximum height' } },
      changeHash: { type: 'boolean', description: { zh: '更新 hash', en: 'Updates the hash' } },
      scrollContainer: { type: 'unknown', description: { zh: '滚动容器', en: 'Scroll container' } },
      scrollBehavior: {
        type: 'AnchorScrollBehavior',
        description: { zh: '滚动行为', en: 'Scroll behavior' },
      },
      scrollOffset: {
        type: 'AnchorOffset',
        description: { zh: '滚动落点', en: 'Scroll alignment' },
      },
      boundsOffset: {
        type: 'AnchorOffset',
        description: { zh: '激活边界', en: 'Activation boundary' },
      },
      useCollapse: { type: 'boolean', description: { zh: '启用折叠', en: 'Enables collapse' } },
      collapsed: {
        type: 'boolean',
        description: { zh: '受控折叠状态', en: 'Controlled collapsed state' },
      },
      defaultCollapsed: {
        type: 'boolean',
        description: { zh: '初始折叠状态', en: 'Initial collapsed state' },
      },
      collapseText: { type: 'unknown', description: { zh: '折叠文案', en: 'Collapse label' } },
      showLine: { type: 'boolean', description: { zh: '显示侧边线', en: 'Shows the side line' } },
      showHighlightLine: {
        type: 'boolean',
        description: { zh: '显示高亮线', en: 'Shows the highlight line' },
      },
      showTitleSuffix: {
        type: 'boolean',
        description: { zh: '显示子项数量', en: 'Shows child counts' },
      },
      placement: {
        type: 'AnchorTooltipPlacement',
        description: { zh: '提示位置', en: 'Tooltip placement' },
      },
      autoRender: {
        type: 'boolean',
        description: { zh: '自动生成目录', en: 'Automatically renders headings' },
      },
      autoRenderRules: {
        type: 'readonly (string | readonly string[])[]',
        description: { zh: '标题扫描规则', en: 'Heading scan rules' },
      },
      linkTarget: { type: 'AnchorLinkTarget', description: { zh: '链接目标', en: 'Link target' } },
    }),
    emits: createManifestFields<AnchorEventMap>({
      click: {
        type: '[AnchorLinkInfo, unknown]',
        description: { zh: '点击链接', en: 'Link clicked' },
      },
      change: {
        type: '[string, string]',
        description: { zh: '活动链接变化', en: 'Active link changed' },
      },
      collapseChange: {
        type: 'boolean',
        description: { zh: '折叠状态变化', en: 'Collapsed state changed' },
      },
    }),
    slots: createManifestFields<AnchorRegionMap>({
      content: { type: 'void', description: { zh: '导航链接', en: 'Navigation links' } },
      collapseLabel: { type: 'void', description: { zh: '折叠内容', en: 'Collapse content' } },
    }),
    exposes: createManifestFields<AnchorCommandMap>({
      updateActiveLink: {
        type: '(link: string, scroll?: boolean) => void',
        description: { zh: '更新活动链接', en: 'Updates the active link' },
      },
      refreshAnchorList: {
        type: '() => void',
        description: { zh: '重新扫描目录', en: 'Rescans headings' },
      },
      updateScrollContainer: {
        type: '() => void',
        description: { zh: '重新解析滚动容器', en: 'Resolves the scroll container again' },
      },
      getAnchorList: {
        type: '() => AnchorListItem[]',
        description: { zh: '获取目录', en: 'Returns the table of contents' },
      },
    }),
  },
});
