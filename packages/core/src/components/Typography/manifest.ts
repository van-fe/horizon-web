import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TypographyCommandMap, TypographyEventMap, TypographyRegionMap } from './contract';
import { typographyApiContract } from './contract';

export const typographyManifest = createComponentManifest({
  name: 'Typography',
  category: 'basic',
  description: { zh: '展示和编辑语义化文本。', en: 'Displays and edits semantic text.' },
  semantics: ['controlled text', 'heading level', 'ellipsis', 'copy', 'edit'],
  accessibility: ['semantic heading', 'named actions', 'keyboard edit commit and cancel'],
  testVectors: ['heading', 'style variants', 'ellipsis', 'controlled editing', 'copy result'],
  contract: {
    props: createPropManifestFields(typographyApiContract, {
      value: { type: 'string', description: { zh: '受控文本', en: 'Controlled text' } },
      defaultValue: { type: 'string', description: { zh: '初始文本', en: 'Initial text' } },
      tag: { type: 'string', description: { zh: '渲染标签', en: 'Rendered tag' } },
      level: { type: 'TypographyLevel', description: { zh: '标题级别', en: 'Heading level' } },
      variant: {
        type: 'TypographyVariant',
        description: { zh: '语义类型', en: 'Semantic variant' },
      },
      size: { type: 'TypographySize', description: { zh: '尺寸', en: 'Size' } },
      weight: { type: 'TypographyWeight', description: { zh: '字重', en: 'Weight' } },
      block: { type: 'boolean', description: { zh: '块级显示', en: 'Block layout' } },
      italic: { type: 'boolean', description: { zh: '斜体', en: 'Italic' } },
      underline: { type: 'boolean', description: { zh: '下划线', en: 'Underline' } },
      deleted: { type: 'boolean', description: { zh: '删除线', en: 'Strikethrough' } },
      code: { type: 'boolean', description: { zh: '代码样式', en: 'Code style' } },
      ellipsis: { type: 'boolean | number', description: { zh: '文本省略', en: 'Text ellipsis' } },
      copyable: { type: 'boolean', description: { zh: '允许复制', en: 'Copyable' } },
      editable: { type: 'boolean', description: { zh: '允许编辑', en: 'Editable' } },
      disabled: { type: 'boolean', description: { zh: '禁用操作', en: 'Disabled' } },
    }),
    emits: createManifestFields<TypographyEventMap>({
      valueChange: { type: 'string', description: { zh: '文本值变化', en: 'Text value changed' } },
      change: { type: 'string', description: { zh: '编辑提交', en: 'Editing committed' } },
      copy: { type: '[string, boolean]', description: { zh: '复制结果', en: 'Copy result' } },
    }),
    slots: createManifestFields<TypographyRegionMap>({
      content: { type: 'content', description: { zh: '文本内容', en: 'Text content' } },
      prefix: { type: 'content', description: { zh: '前置内容', en: 'Leading content' } },
      suffix: { type: 'content', description: { zh: '后置内容', en: 'Trailing content' } },
    }),
    exposes: createManifestFields<TypographyCommandMap>({
      edit: { type: '() => void', description: { zh: '进入编辑', en: 'Enters edit mode' } },
      cancelEdit: { type: '() => void', description: { zh: '取消编辑', en: 'Cancels editing' } },
      copy: { type: '() => Promise<boolean>', description: { zh: '复制文本', en: 'Copies text' } },
    }),
  },
});
