import fs from 'node:fs';
import path from 'node:path';
import {
  adaptManifestFields,
  alertManifest,
  avatarManifest,
  badgeManifest,
  buttonManifest,
  cardManifest,
  countManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  dividerManifest,
  emptyManifest,
  progressManifest,
  rateManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
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
  countManifest,
  dividerManifest,
  emptyManifest,
  progressManifest,
  rateManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
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
  Divider: {
    props: { rename: { variant: 'type' } },
    regions: { rename: { title: 'default' } },
  },
  Empty: { regions: { rename: { footer: 'default' } } },
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
  Count: { events: { rename: { change: 'onChange' } } },
  Divider: { regions: { rename: { title: 'children' } } },
  Empty: { regions: { rename: { footer: 'children' } } },
  Progress: { regions: { rename: { label: 'children' } } },
  Rate: {
    events: { rename: { change: 'onChange', blur: 'onBlur' } },
    regions: { rename: { icon: 'renderIcon' } },
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
