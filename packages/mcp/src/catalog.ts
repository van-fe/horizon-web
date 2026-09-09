import * as auroraCore from '@aurora/core';
import type { ComponentCategory, ComponentManifest, ComponentManifestField } from '@aurora/core';

export type AuroraLocale = 'en' | 'zh';
export type AuroraApiKind = 'props' | 'emits' | 'slots' | 'exposes';

export interface ComponentSummary {
  name: string;
  category: ComponentCategory;
  description: string;
}

export interface LocalizedManifestField extends Omit<ComponentManifestField, 'description'> {
  description: string;
}

export interface LocalizedComponentManifest {
  name: string;
  category: ComponentCategory;
  description: string;
  semantics: readonly string[];
  accessibility: readonly string[];
  testVectors: readonly string[];
  api: Record<AuroraApiKind, LocalizedManifestField[]>;
}

export interface ApiSearchResult extends LocalizedManifestField {
  component: string;
  kind: AuroraApiKind;
}

export interface ListComponentsOptions {
  category?: ComponentCategory;
  locale?: AuroraLocale;
  limit?: number;
  query?: string;
}

export interface SearchComponentApiOptions {
  component?: string;
  kind?: AuroraApiKind;
  locale?: AuroraLocale;
  limit?: number;
  query: string;
}

const API_KINDS: readonly AuroraApiKind[] = ['props', 'emits', 'slots', 'exposes'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isComponentManifest(value: unknown): value is ComponentManifest {
  if (!isRecord(value) || !isRecord(value.description) || !isRecord(value.contract)) {
    return false;
  }
  const contract = value.contract;

  return (
    typeof value.name === 'string' &&
    typeof value.category === 'string' &&
    typeof value.description.en === 'string' &&
    typeof value.description.zh === 'string' &&
    API_KINDS.every(kind => Array.isArray(contract[kind]))
  );
}

function collectComponentManifests(): ComponentManifest[] {
  const manifests: ComponentManifest[] = [];
  for (const [exportName, value] of Object.entries(auroraCore) as Array<[string, unknown]>) {
    if (exportName.endsWith('Manifest') && isComponentManifest(value)) manifests.push(value);
  }
  const uniqueByName = new Map(manifests.map(manifest => [manifest.name, manifest]));
  return [...uniqueByName.values()].sort((left, right) => left.name.localeCompare(right.name));
}

export const componentManifests = Object.freeze(collectComponentManifests());

function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function localizeField(
  field: ComponentManifestField,
  locale: AuroraLocale,
): LocalizedManifestField {
  return {
    ...field,
    description: field.description[locale],
  };
}

export function listComponents(options: ListComponentsOptions = {}): ComponentSummary[] {
  const locale = options.locale ?? 'en';
  const query = normalizeSearchText(options.query ?? '');
  const limit = options.limit ?? 50;

  return componentManifests
    .filter(manifest => options.category === undefined || manifest.category === options.category)
    .filter(manifest => {
      if (query === '') return true;
      const haystack = normalizeSearchText(
        [
          manifest.name,
          manifest.description.en,
          manifest.description.zh,
          ...manifest.semantics,
        ].join(' '),
      );
      return query.split(' ').every(term => haystack.includes(term));
    })
    .slice(0, limit)
    .map(manifest => ({
      name: manifest.name,
      category: manifest.category,
      description: manifest.description[locale],
    }));
}

export function findComponentManifest(name: string): ComponentManifest | undefined {
  const normalizedName = normalizeSearchText(name).replaceAll(' ', '');
  return componentManifests.find(
    manifest => normalizeSearchText(manifest.name).replaceAll(' ', '') === normalizedName,
  );
}

export function getComponentApi(
  name: string,
  locale: AuroraLocale = 'en',
): LocalizedComponentManifest | undefined {
  const manifest = findComponentManifest(name);
  if (!manifest) return undefined;

  return {
    name: manifest.name,
    category: manifest.category,
    description: manifest.description[locale],
    semantics: manifest.semantics,
    accessibility: manifest.accessibility,
    testVectors: manifest.testVectors,
    api: {
      props: manifest.contract.props.map(field => localizeField(field, locale)),
      emits: manifest.contract.emits.map(field => localizeField(field, locale)),
      slots: manifest.contract.slots.map(field => localizeField(field, locale)),
      exposes: manifest.contract.exposes.map(field => localizeField(field, locale)),
    },
  };
}

export function searchComponentApi(options: SearchComponentApiOptions): ApiSearchResult[] {
  const locale = options.locale ?? 'en';
  const query = normalizeSearchText(options.query);
  const limit = options.limit ?? 50;
  const componentName = options.component
    ? findComponentManifest(options.component)?.name
    : undefined;

  if (options.component && !componentName) return [];

  return componentManifests
    .filter(manifest => componentName === undefined || manifest.name === componentName)
    .flatMap(manifest =>
      API_KINDS.filter(kind => options.kind === undefined || options.kind === kind).flatMap(kind =>
        manifest.contract[kind].map(field => ({
          component: manifest.name,
          kind,
          ...localizeField(field, locale),
        })),
      ),
    )
    .filter(result => {
      if (query === '') return true;
      const haystack = normalizeSearchText(
        [result.component, result.kind, result.name, result.type, result.description].join(' '),
      );
      return query.split(' ').every(term => haystack.includes(term));
    })
    .slice(0, limit);
}
