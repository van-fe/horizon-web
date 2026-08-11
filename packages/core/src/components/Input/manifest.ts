import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { InputCommandMap, InputEventMap, InputRegionMap } from './contract';
import { inputApiContract } from './contract';

export const inputManifest = createComponentManifest({
  name: 'Input',
  category: 'form',
  description: { zh: '输入或编辑单行、多行及密码文本。', en: 'Enters and edits text.' },
  semantics: ['controlled value', 'uncontrolled value', 'clear', 'password', 'textarea'],
  accessibility: ['native input', 'native textarea', 'focus command', 'disabled semantics'],
  testVectors: ['text', 'textarea', 'password', 'clear', 'composition', 'limits', 'commands'],
  contract: {
    props: createPropManifestFields(inputApiContract, {
      value: { type: 'string', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'string', description: { zh: '初始值', en: 'Initial value' } },
      type: { type: 'InputType', description: { zh: '输入类型', en: 'Input type' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      placeholder: { type: 'string', description: { zh: '占位文本', en: 'Placeholder' } },
      clearable: { type: 'boolean', description: { zh: '允许清空', en: 'Allows clearing' } },
      readOnly: { type: 'boolean', description: { zh: '只读', en: 'Read only' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      showPassword: {
        type: 'boolean',
        description: { zh: '显示密码切换', en: 'Shows password toggle' },
      },
      showLimit: { type: 'boolean', description: { zh: '显示字数', en: 'Shows character count' } },
      maxLength: { type: 'number', description: { zh: '最大长度', en: 'Maximum length' } },
      allowOverflow: { type: 'boolean', description: { zh: '允许超长', en: 'Allows overflow' } },
      minLength: { type: 'number', description: { zh: '最小长度', en: 'Minimum length' } },
      rows: { type: 'number', description: { zh: '文本域行数', en: 'Textarea rows' } },
      resize: { type: 'InputResizeMode', description: { zh: '缩放方式', en: 'Resize mode' } },
      variant: { type: 'InputVariant', description: { zh: '视觉样式', en: 'Visual variant' } },
      status: { type: 'InputStatus', description: { zh: '校验状态', en: 'Validation status' } },
      autoSize: { type: 'InputAutoSize', description: { zh: '自动高度', en: 'Automatic height' } },
    }),
    emits: createManifestFields<InputEventMap>({
      valueChange: { type: 'string', description: { zh: '值更新', en: 'Value updated' } },
      click: { type: 'unknown', description: { zh: '点击', en: 'Clicked' } },
      input: { type: '[string, unknown]', description: { zh: '输入', en: 'Input received' } },
      change: { type: 'string', description: { zh: '提交变化', en: 'Change committed' } },
      focus: { type: 'unknown', description: { zh: '聚焦', en: 'Focused' } },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
      clear: { type: 'void', description: { zh: '清空', en: 'Cleared' } },
      keyDown: { type: 'unknown', description: { zh: '按键按下', en: 'Key pressed down' } },
      keyPress: { type: 'unknown', description: { zh: '按键输入', en: 'Key pressed' } },
      keyUp: { type: 'unknown', description: { zh: '按键抬起', en: 'Key released' } },
      compositionStart: {
        type: 'unknown',
        description: { zh: '组合输入开始', en: 'Composition started' },
      },
      compositionUpdate: {
        type: 'unknown',
        description: { zh: '组合输入更新', en: 'Composition updated' },
      },
      compositionEnd: {
        type: 'unknown',
        description: { zh: '组合输入结束', en: 'Composition ended' },
      },
    }),
    slots: createManifestFields<InputRegionMap>({
      prefix: { type: 'void', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'void', description: { zh: '后缀', en: 'Suffix' } },
      prepend: { type: 'void', description: { zh: '前置内容', en: 'Prepended content' } },
      append: { type: 'void', description: { zh: '后置内容', en: 'Appended content' } },
    }),
    exposes: createManifestFields<InputCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focuses the input' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blurs the input' } },
      select: { type: '() => void', description: { zh: '全选', en: 'Selects the value' } },
    }),
  },
});
