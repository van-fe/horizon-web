import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  FormCommandMap,
  FormEventMap,
  FormItemCommandMap,
  FormItemRegionMap,
  FormRegionMap,
} from './contract';
import { formApiContract, formItemApiContract } from './contract';

export const formManifest = createComponentManifest({
  name: 'Form',
  category: 'form',
  description: {
    zh: '组织、校验并提交结构化字段。',
    en: 'Organizes, validates and submits structured fields.',
  },
  semantics: [
    'field registry',
    'async validation',
    'reset',
    'validation triggers',
    'layout inheritance',
  ],
  accessibility: ['native form', 'label association', 'invalid state', 'error description'],
  testVectors: ['valid', 'invalid', 'nested path', 'reset', 'trigger', 'disabled', 'grid layout'],
  contract: {
    props: createPropManifestFields(formApiContract, {
      model: { type: 'FormModel', description: { zh: '数据模型', en: 'Data model' } },
      inline: { type: 'boolean', description: { zh: '行内布局', en: 'Inline layout' } },
      cols: { type: 'GridValue', description: { zh: '网格列数', en: 'Grid columns' } },
      gap: { type: 'GridValue', description: { zh: '网格间距', en: 'Grid gap' } },
      columnGap: { type: 'GridValue', description: { zh: '列间距', en: 'Column gap' } },
      rowGap: { type: 'GridValue', description: { zh: '行间距', en: 'Row gap' } },
      align: { type: 'GridAlignment', description: { zh: '垂直对齐', en: 'Vertical alignment' } },
      justify: {
        type: 'GridAlignment',
        description: { zh: '水平对齐', en: 'Horizontal alignment' },
      },
      size: { type: 'FormSize', description: { zh: '尺寸', en: 'Size' } },
      labelPosition: {
        type: 'FormLabelPosition',
        description: { zh: '标签位置', en: 'Label position' },
      },
      labelJustifyAlign: {
        type: 'FormLabelJustifyAlignment',
        description: { zh: '标签水平对齐', en: 'Label horizontal alignment' },
      },
      labelVerticalAlign: {
        type: 'FormLabelVerticalAlignment',
        description: { zh: '标签垂直对齐', en: 'Label vertical alignment' },
      },
      labelWidth: { type: 'string | number', description: { zh: '标签宽度', en: 'Label width' } },
      showRequireMark: {
        type: 'boolean',
        description: { zh: '显示必填标记', en: 'Shows required marks' },
      },
      rules: { type: 'FormRules', description: { zh: '校验规则', en: 'Validation rules' } },
      requireMarkPosition: {
        type: 'FormRequiredMarkPosition',
        description: { zh: '必填标记位置', en: 'Required-mark position' },
      },
      scrollToError: {
        type: 'boolean',
        description: { zh: '滚动到错误项', en: 'Scrolls to invalid field' },
      },
      preventSubmitDefault: {
        type: 'boolean',
        description: { zh: '阻止默认提交', en: 'Prevents native submit' },
      },
      validateOnRuleChange: {
        type: 'boolean',
        description: { zh: '规则变化时校验', en: 'Validates on rule change' },
      },
      validateTrigger: {
        type: 'FormValidateTrigger',
        description: { zh: '校验触发时机', en: 'Validation trigger' },
      },
      onlyRender: { type: 'boolean', description: { zh: '仅渲染错误', en: 'Only renders errors' } },
      helperPlacement: {
        type: 'FormHelperPlacement',
        description: { zh: '帮助内容位置', en: 'Helper placement' },
      },
      helperTheme: {
        type: 'FormHelperTheme',
        description: { zh: '帮助内容主题', en: 'Helper theme' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用字段', en: 'Disables fields' } },
      spacing: { type: 'FormSpacing', description: { zh: '间距策略', en: 'Spacing strategy' } },
      requiredUseLabel: {
        type: 'boolean',
        description: { zh: '必填消息使用标签', en: 'Uses label in required message' },
      },
    }),
    emits: createManifestFields<FormEventMap>({
      submit: { type: 'SubmitEvent', description: { zh: '提交', en: 'Submitted' } },
      validate: {
        type: '[string, boolean, string?]',
        description: { zh: '字段校验结果', en: 'Field validation result' },
      },
    }),
    slots: createManifestFields<FormRegionMap>({
      content: { type: 'void', description: { zh: '表单内容', en: 'Form content' } },
    }),
    exposes: createManifestFields<FormCommandMap>({
      validate: {
        type: '() => Promise<void>',
        description: { zh: '校验全部字段', en: 'Validates all fields' },
      },
      validateField: {
        type: '(fields) => Promise<string[]>',
        description: { zh: '校验指定字段', en: 'Validates selected fields' },
      },
      resetFields: {
        type: '(fields?) => void',
        description: { zh: '重置字段', en: 'Resets fields' },
      },
      scrollToField: {
        type: '(field) => void',
        description: { zh: '滚动到字段', en: 'Scrolls to a field' },
      },
      clearValidate: {
        type: '(fields?) => void',
        description: { zh: '清除校验', en: 'Clears validation' },
      },
    }),
  },
});

export const formItemManifest = createComponentManifest({
  name: 'FormItem',
  category: 'form',
  description: {
    zh: '承载字段标签、控件与校验反馈。',
    en: 'Hosts a field label, control and validation feedback.',
  },
  semantics: ['field path', 'field rules', 'required mark', 'helper', 'validation feedback'],
  accessibility: ['label association', 'invalid state', 'described error'],
  testVectors: ['rule override', 'required fallback', 'external error', 'helper', 'regions'],
  contract: {
    props: createPropManifestFields(formItemApiContract, {
      label: { type: 'string', description: { zh: '标签', en: 'Label' } },
      labelPosition: {
        type: 'FormLabelPosition',
        description: { zh: '标签位置', en: 'Label position' },
      },
      span: { type: 'GridValue', description: { zh: '网格跨度', en: 'Grid span' } },
      offset: { type: 'GridValue', description: { zh: '网格偏移', en: 'Grid offset' } },
      field: { type: 'string', description: { zh: '字段路径', en: 'Field path' } },
      rules: {
        type: 'FormRule | FormRule[]',
        description: { zh: '校验规则', en: 'Validation rules' },
      },
      tip: { type: 'string', description: { zh: '提示', en: 'Tip' } },
      helper: { type: 'unknown', description: { zh: '帮助内容', en: 'Helper content' } },
      helperPlacement: {
        type: 'FormHelperPlacement',
        description: { zh: '帮助内容位置', en: 'Helper placement' },
      },
      helperTheme: {
        type: 'FormHelperTheme',
        description: { zh: '帮助内容主题', en: 'Helper theme' },
      },
      labelJustifyAlign: {
        type: 'FormLabelJustifyAlignment',
        description: { zh: '标签水平对齐', en: 'Label horizontal alignment' },
      },
      labelVerticalAlign: {
        type: 'FormLabelVerticalAlignment',
        description: { zh: '标签垂直对齐', en: 'Label vertical alignment' },
      },
      labelWidth: { type: 'string | number', description: { zh: '标签宽度', en: 'Label width' } },
      required: { type: 'boolean', description: { zh: '必填', en: 'Required' } },
      requiredUseLabel: {
        type: 'boolean',
        description: { zh: '必填消息使用标签', en: 'Uses label in required message' },
      },
      showRequireMark: {
        type: 'boolean',
        description: { zh: '显示必填标记', en: 'Shows required mark' },
      },
      error: { type: 'string', description: { zh: '外部错误', en: 'External error' } },
      validateTrigger: {
        type: 'FormValidateTrigger',
        description: { zh: '校验触发时机', en: 'Validation trigger' },
      },
    }),
    emits: [],
    slots: createManifestFields<FormItemRegionMap>({
      content: { type: 'void', description: { zh: '字段控件', en: 'Field control' } },
      label: { type: 'void', description: { zh: '标签', en: 'Label' } },
      labelAppend: { type: 'void', description: { zh: '标签尾部', en: 'Label trailing content' } },
      helper: { type: 'void', description: { zh: '帮助内容', en: 'Helper content' } },
      helperTitle: { type: 'void', description: { zh: '帮助标题', en: 'Helper title' } },
      helperContent: { type: 'void', description: { zh: '帮助正文', en: 'Helper body' } },
      tip: { type: 'void', description: { zh: '提示', en: 'Tip' } },
      error: { type: 'void', description: { zh: '错误', en: 'Error' } },
    }),
    exposes: createManifestFields<FormItemCommandMap>({
      validate: {
        type: '() => Promise<void>',
        description: { zh: '校验字段', en: 'Validates field' },
      },
      resetFields: { type: '() => void', description: { zh: '重置字段', en: 'Resets field' } },
      clearValidate: {
        type: '() => void',
        description: { zh: '清除校验', en: 'Clears validation' },
      },
    }),
  },
});
