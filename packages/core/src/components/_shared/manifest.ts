export type ComponentRenderer = 'vue' | 'react';

export interface ComponentManifestField {
  name: string;
  type: string;
  description: { zh: string; en: string };
  required?: boolean;
  defaultValue?: string;
}

export interface ComponentManifest {
  name: string;
  category: 'basic' | 'form' | 'feedback' | 'overlay';
  description: { zh: string; en: string };
  semantics: readonly string[];
  accessibility: readonly string[];
  testVectors: readonly string[];
  contract: {
    props: readonly ComponentManifestField[];
    emits: readonly ComponentManifestField[];
    slots: readonly ComponentManifestField[];
    exposes: readonly ComponentManifestField[];
  };
}

export interface VueComponentManifestExtension {
  props: readonly ComponentManifestField[];
  emits: readonly ComponentManifestField[];
  slots: readonly ComponentManifestField[];
  exposes: readonly ComponentManifestField[];
}

export interface ReactComponentManifestExtension {
  props: readonly ComponentManifestField[];
  callbacks: readonly ComponentManifestField[];
  renderers: readonly ComponentManifestField[];
  ref: readonly ComponentManifestField[];
}

export interface RendererComponentManifest<Extension> {
  renderer: ComponentRenderer;
  componentName: string;
  common: ComponentManifest;
  api: Extension;
}

export interface ManifestFieldAdaptation {
  rename?: Readonly<Record<string, string>>;
  omit?: readonly string[];
  extend?: readonly ComponentManifestField[];
}

export function adaptManifestFields(
  fields: readonly ComponentManifestField[],
  adaptation: ManifestFieldAdaptation = {},
): ComponentManifestField[] {
  const omitted = new Set(adaptation.omit);
  return [
    ...fields
      .filter(field => !omitted.has(field.name))
      .map(field => ({ ...field, name: adaptation.rename?.[field.name] ?? field.name })),
    ...(adaptation.extend ?? []),
  ];
}

export function createComponentManifest<const Manifest extends ComponentManifest>(
  manifest: Manifest,
): Readonly<Manifest> {
  return Object.freeze(manifest);
}

export function createVueComponentManifest(
  common: ComponentManifest,
  api: Partial<VueComponentManifestExtension> = {},
): RendererComponentManifest<VueComponentManifestExtension> {
  return {
    renderer: 'vue',
    componentName: `H${common.name}`,
    common,
    api: {
      props: api.props ?? common.contract.props,
      emits: api.emits ?? common.contract.emits,
      slots: api.slots ?? common.contract.slots,
      exposes: api.exposes ?? common.contract.exposes,
    },
  };
}

export function createReactComponentManifest(
  common: ComponentManifest,
  api: Partial<ReactComponentManifestExtension> = {},
): RendererComponentManifest<ReactComponentManifestExtension> {
  return {
    renderer: 'react',
    componentName: common.name,
    common,
    api: {
      props: api.props ?? common.contract.props,
      callbacks: api.callbacks ?? common.contract.emits,
      renderers: api.renderers ?? common.contract.slots,
      ref: api.ref ?? common.contract.exposes,
    },
  };
}
