import fs from 'node:fs';
import path from 'node:path';
import {
  adaptManifestFields,
  buttonManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  selectManifest,
  switchManifest,
  tooltipManifest,
} from '../packages/core/src';

const manifests = [buttonManifest, switchManifest, tooltipManifest, selectManifest] as const;
const vuePropAdaptations = {
  Button: { rename: { variant: 'type', asyncState: 'debounceType' } },
  Switch: { rename: { value: 'modelValue', readOnly: 'readonly' }, omit: ['defaultValue'] },
  Tooltip: {
    rename: { open: 'visible', showDelay: 'showAfter', hideDelay: 'hideAfter' },
    omit: ['defaultOpen'],
  },
  Select: { rename: { value: 'modelValue' }, omit: ['defaultValue', 'open'] },
} as const;
const reactPropAdaptations = {
  Tooltip: { rename: { showDelay: 'showAfter', hideDelay: 'hideAfter' } },
} as const;

const vue = manifests.map(manifest =>
  createVueComponentManifest(manifest, {
    props: adaptManifestFields(
      manifest.contract.props,
      vuePropAdaptations[manifest.name as keyof typeof vuePropAdaptations],
    ),
  }),
);
const react = manifests.map(manifest =>
  createReactComponentManifest(manifest, {
    props: adaptManifestFields(
      manifest.contract.props,
      reactPropAdaptations[manifest.name as keyof typeof reactPropAdaptations],
    ),
  }),
);

const output = path.resolve(__dirname, '../packages/docs/.vitepress/generated');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'vue-components.json'), JSON.stringify(vue, null, 2));
fs.writeFileSync(path.join(output, 'react-components.json'), JSON.stringify(react, null, 2));
console.info(`Generated ${vue.length} Vue and ${react.length} React component contracts.`);
