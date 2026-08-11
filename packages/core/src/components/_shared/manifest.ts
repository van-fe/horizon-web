import type { ComponentApiContract } from './api';

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
  override?: Readonly<Record<string, Partial<Omit<ComponentManifestField, 'name'>>>>;
  extend?: readonly ComponentManifestField[];
}

export type ComponentManifestFieldDefinition = Omit<
  ComponentManifestField,
  'defaultValue' | 'name'
>;

export type ComponentManifestFieldDefinitions<Shape extends object> = {
  [Name in keyof Shape]-?: ComponentManifestFieldDefinition;
};

export function formatManifestDefault(value: unknown): string {
  if (value === null) return 'null';
  if (value === Number.POSITIVE_INFINITY) return 'Infinity';
  if (typeof value === 'string') return value === '' ? "''" : value;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function createManifestFields<Shape extends object>(
  definitions: ComponentManifestFieldDefinitions<Shape>,
): ComponentManifestField[] {
  return Object.entries(definitions).map(([name, definition]) => ({
    name,
    ...(definition as ComponentManifestFieldDefinition),
  }));
}

export function createPropManifestFields<
  Props extends object,
  Events extends object,
  Regions extends object,
  Commands extends object,
>(
  contract: ComponentApiContract<Props, Events, Regions, Commands>,
  definitions: ComponentManifestFieldDefinitions<Props>,
): ComponentManifestField[] {
  const defaults = contract.defaults as Readonly<Record<string, unknown>>;
  return createManifestFields(definitions).map(field =>
    Object.hasOwn(defaults, field.name)
      ? { ...field, defaultValue: formatManifestDefault(defaults[field.name]) }
      : field,
  );
}

export function adaptManifestFields(
  fields: readonly ComponentManifestField[],
  adaptation: ManifestFieldAdaptation = {},
): ComponentManifestField[] {
  const omitted = new Set(adaptation.omit);
  return [
    ...fields
      .filter(field => !omitted.has(field.name))
      .map(field => ({
        ...field,
        ...adaptation.override?.[field.name],
        name: adaptation.rename?.[field.name] ?? field.name,
      })),
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
