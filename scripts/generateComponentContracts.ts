import fs from 'node:fs';
import path from 'node:path';
import {
  adaptManifestFields,
  alertManifest,
  avatarManifest,
  badgeManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  countManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  dividerManifest,
  emptyManifest,
  inputManifest,
  linkManifest,
  progressManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  switchManifest,
  tooltipManifest,
  typographyManifest,
} from '../packages/core/src';
import type { ManifestFieldAdaptation } from '../packages/core/src';

const manifests = [
  alertManifest,
  avatarManifest,
  badgeManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  countManifest,
  dividerManifest,
  emptyManifest,
  inputManifest,
  linkManifest,
  progressManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  switchManifest,
  tooltipManifest,
  typographyManifest,
] as const;

interface RendererApiAdaptation {
  props?: ManifestFieldAdaptation;
  events?: ManifestFieldAdaptation;
  regions?: ManifestFieldAdaptation;
  commands?: ManifestFieldAdaptation;
}

const vueApiAdaptations: Readonly<Record<string, RendererApiAdaptation>> = {
  Alert: { regions: { rename: { content: 'default' } } },
  Avatar: {
    props: { rename: { fallbackSrc: 'default' } },
    regions: { rename: { content: 'default', fallback: 'error' } },
  },
  Badge: {
    regions: { rename: { content: 'default' }, omit: ['icon'] },
  },
  Button: { props: { rename: { variant: 'type', asyncState: 'debounceType' } } },
  Card: { regions: { rename: { content: 'default' } } },
  Checkbox: {
    props: {
      rename: {
        value: 'modelValue',
        optionValue: 'label',
        trueValue: 'trueLabel',
        falseValue: 'falseLabel',
        readOnly: 'viewable',
        bordered: 'border',
      },
      omit: ['defaultValue', 'variant', 'fill'],
    },
    events: {
      omit: ['change'],
      extend: [
        {
          name: 'change',
          type: 'CheckboxValue',
          description: { zh: '值变化', en: 'Value changed' },
        },
        {
          name: 'update:modelValue',
          type: 'CheckboxValue',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { label: 'default' } },
  },
  Divider: {
    props: { rename: { variant: 'type' } },
    regions: { rename: { title: 'default' } },
  },
  Empty: { regions: { rename: { footer: 'default' } } },
  Input: {
    props: {
      rename: {
        value: 'modelValue',
        readOnly: 'readonly',
        maxLength: 'maxlength',
        allowOverflow: 'enableOutOfExceeded',
        minLength: 'minlength',
        variant: 'inputStyle',
      },
      omit: ['defaultValue'],
      extend: [
        {
          name: 'prefixIcon',
          type: 'IconMaybeFalsy',
          description: { zh: '前缀图标', en: 'Prefix icon' },
        },
        {
          name: 'suffixIcon',
          type: 'IconMaybeFalsy',
          description: { zh: '后缀图标', en: 'Suffix icon' },
        },
        {
          name: 'embedded',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '无外观嵌入模式', en: 'Unstyled embedded mode' },
        },
        {
          name: 'fitContent',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '按内容适配宽度', en: 'Fits content width' },
        },
      ],
    },
    events: {
      rename: {
        valueChange: 'update:modelValue',
        keyDown: 'keydown',
        keyPress: 'keypress',
        keyUp: 'keyup',
        compositionStart: 'compositionstart',
        compositionUpdate: 'compositionupdate',
        compositionEnd: 'compositionend',
      },
    },
  },
  Link: {
    props: {
      rename: { variant: 'type', route: 'to' },
      extend: [
        {
          name: 'icon',
          type: 'IconMaybeFalsy',
          description: { zh: '后缀图标', en: 'Trailing icon' },
        },
        {
          name: 'iconSize',
          type: 'string | number',
          description: { zh: '图标尺寸', en: 'Icon size' },
        },
        {
          name: 'scrollTarget',
          type: 'string | Element',
          defaultValue: "'body'",
          description: { zh: '锚点滚动容器', en: 'Anchor scroll container' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Progress: { regions: { rename: { label: 'default' } } },
  Rate: {
    props: {
      rename: { value: 'modelValue', readOnly: 'readonly' },
      omit: ['defaultValue'],
    },
    events: {
      extend: [
        {
          name: 'update:modelValue',
          type: 'number',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { icon: 'default' } },
  },
  Radio: {
    props: {
      rename: {
        value: 'modelValue',
        optionValue: 'value',
        readOnly: 'viewable',
        bordered: 'border',
      },
      omit: ['defaultValue', 'variant', 'fill'],
      override: { value: { defaultValue: "''" } },
    },
    events: {
      extend: [
        {
          name: 'update:modelValue',
          type: 'ChoiceValue',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { label: 'default' } },
  },
  Result: {},
  Segmented: {
    props: { rename: { value: 'activeKey', defaultValue: 'defaultActiveKey' } },
    events: {
      extend: [
        {
          name: 'update:activeKey',
          type: 'SegmentedValue',
          description: { zh: '更新激活值', en: 'Updates the active value' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Select: { props: { rename: { value: 'modelValue' }, omit: ['defaultValue', 'open'] } },
  Slider: {
    props: {
      rename: {
        value: 'modelValue',
        showSeparators: 'showSeparator',
        tone: 'type',
        showInput: 'inputEnable',
        keyboard: 'keyboardEnable',
        showTooltip: 'tooltipEnable',
        formatTooltip: 'tooltipFormatter',
      },
      omit: ['defaultValue'],
      extend: [
        {
          name: 'inputProps',
          type: 'Partial<InputNumberProps>',
          description: { zh: '传给 InputNumber 的属性', en: 'Props passed to InputNumber' },
        },
      ],
    },
    events: {
      rename: { change: 'update:modelValue' },
    },
  },
  Skeleton: { regions: { rename: { content: 'default', placeholder: 'loadingTemplate' } } },
  Statistic: { regions: { rename: { value: 'default' } } },
  Space: {
    props: {
      extend: [
        {
          name: 'fragment',
          type: 'boolean',
          defaultValue: 'true',
          description: { zh: '展开 Fragment 子节点', en: 'Flattens Fragment children' },
        },
        {
          name: 'separator',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '启用默认分隔符', en: 'Enables the default separator' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Switch: {
    props: { rename: { value: 'modelValue', readOnly: 'readonly' }, omit: ['defaultValue'] },
  },
  Tooltip: {
    props: {
      rename: { open: 'visible', showDelay: 'showAfter', hideDelay: 'hideAfter' },
      omit: ['defaultOpen'],
    },
    regions: { rename: { trigger: 'default' } },
  },
  Typography: {
    props: {
      rename: { value: 'modelValue', variant: 'type' },
      omit: ['defaultValue'],
    },
    events: { rename: { valueChange: 'update:modelValue' } },
    regions: { rename: { content: 'default' } },
  },
};

const reactApiAdaptations: Readonly<Record<string, RendererApiAdaptation>> = {
  Alert: {
    events: { rename: { close: 'onClose' } },
    regions: { rename: { content: 'children' } },
  },
  Avatar: {
    events: { rename: { error: 'onError' } },
    regions: { rename: { content: 'children' } },
  },
  Badge: { regions: { rename: { content: 'children' } } },
  Button: {
    events: {
      rename: {
        press: 'onClick',
        actionFinished: 'onActionFinished',
        actionError: 'onActionError',
      },
    },
    regions: { rename: { default: 'children' } },
  },
  Card: { regions: { rename: { content: 'children' } } },
  Checkbox: {
    events: { rename: { change: 'onChange', blur: 'onBlur', click: 'onClick' } },
    regions: { rename: { label: 'children' } },
  },
  Count: { events: { rename: { change: 'onChange' } } },
  Divider: { regions: { rename: { title: 'children' } } },
  Empty: { regions: { rename: { footer: 'children' } } },
  Input: {
    props: {
      extend: [
        {
          name: 'inputProps',
          type: 'InputHTMLAttributes<HTMLInputElement>',
          description: { zh: '原生 input 属性', en: 'Native input attributes' },
        },
        {
          name: 'textareaProps',
          type: 'TextareaHTMLAttributes<HTMLTextAreaElement>',
          description: { zh: '原生 textarea 属性', en: 'Native textarea attributes' },
        },
      ],
    },
    events: {
      rename: {
        valueChange: 'onValueChange',
        click: 'onClick',
        input: 'onInput',
        change: 'onChange',
        focus: 'onFocus',
        blur: 'onBlur',
        clear: 'onClear',
        keyDown: 'onKeyDown',
        keyPress: 'onKeyPress',
        keyUp: 'onKeyUp',
        compositionStart: 'onCompositionStart',
        compositionUpdate: 'onCompositionUpdate',
        compositionEnd: 'onCompositionEnd',
      },
    },
  },
  Link: {
    props: {
      rename: { route: 'to' },
      extend: [
        {
          name: 'icon',
          type: 'ReactNode',
          description: { zh: '后缀图标或内容', en: 'Trailing icon or content' },
        },
        {
          name: 'iconSize',
          type: 'string | number',
          description: { zh: '图标尺寸', en: 'Icon size' },
        },
        {
          name: 'scrollTarget',
          type: 'string | Element',
          defaultValue: "'body'",
          description: { zh: '锚点滚动容器', en: 'Anchor scroll container' },
        },
      ],
    },
    events: { rename: { click: 'onClick' } },
    regions: { rename: { content: 'children' } },
  },
  Progress: { regions: { rename: { label: 'children' } } },
  Rate: {
    events: { rename: { change: 'onChange', blur: 'onBlur' } },
    regions: { rename: { icon: 'renderIcon' } },
  },
  Radio: {
    events: { rename: { change: 'onChange', blur: 'onBlur' } },
    regions: { rename: { label: 'children' } },
  },
  Result: {
    events: {
      rename: { primaryClick: 'onPrimaryClick', secondaryClick: 'onSecondaryClick' },
    },
  },
  Segmented: {
    events: { rename: { change: 'onChange' } },
    regions: { rename: { content: 'children' } },
  },
  Select: {
    events: { rename: { change: 'onChange', openChange: 'onOpenChange' } },
    regions: {
      rename: {
        option: 'renderOption',
        empty: 'emptyContent',
        header: 'panelHeader',
        footer: 'panelFooter',
      },
    },
  },
  Slider: {
    props: {
      extend: [
        {
          name: 'inputProps',
          type: 'InputHTMLAttributes<HTMLInputElement>',
          description: { zh: '原生数字输入属性', en: 'Native number-input attributes' },
        },
      ],
    },
    events: { rename: { change: 'onChange', focus: 'onFocus', blur: 'onBlur' } },
  },
  Skeleton: { regions: { rename: { content: 'children' } } },
  Statistic: { regions: { rename: { value: 'children' } } },
  Space: {
    props: {
      extend: [
        {
          name: 'separator',
          type: 'boolean | ReactNode',
          defaultValue: 'false',
          description: {
            zh: '默认或自定义分隔内容',
            en: 'Default or custom separator content',
          },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['separator'] },
  },
  Switch: {
    events: { rename: { change: 'onChange' } },
    regions: { omit: ['status'] },
  },
  Tooltip: {
    props: { rename: { showDelay: 'showAfter', hideDelay: 'hideAfter' } },
    events: { rename: { openChange: 'onOpenChange' } },
    regions: { rename: { trigger: 'children' } },
  },
  Typography: {
    events: {
      rename: { valueChange: 'onValueChange', change: 'onChange', copy: 'onCopy' },
    },
    regions: { rename: { content: 'children' } },
  },
};

const vue = manifests.map(manifest => {
  const adaptation = vueApiAdaptations[manifest.name];
  return createVueComponentManifest(manifest, {
    props: adaptManifestFields(manifest.contract.props, adaptation?.props),
    emits: adaptManifestFields(manifest.contract.emits, adaptation?.events),
    slots: adaptManifestFields(manifest.contract.slots, adaptation?.regions),
    exposes: adaptManifestFields(manifest.contract.exposes, adaptation?.commands),
  });
});

const react = manifests.map(manifest => {
  const adaptation = reactApiAdaptations[manifest.name];
  return createReactComponentManifest(manifest, {
    props: adaptManifestFields(manifest.contract.props, adaptation?.props),
    callbacks: adaptManifestFields(manifest.contract.emits, adaptation?.events),
    renderers: adaptManifestFields(manifest.contract.slots, adaptation?.regions),
    ref: adaptManifestFields(manifest.contract.exposes, adaptation?.commands),
  });
});

const output = path.resolve(__dirname, '../packages/docs/.vitepress/generated');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'vue-components.json'), JSON.stringify(vue, null, 2));
fs.writeFileSync(path.join(output, 'react-components.json'), JSON.stringify(react, null, 2));
console.info(`Generated ${vue.length} Vue and ${react.length} React component contracts.`);
