import type { PropType, SlotsType } from 'vue';
import type {
  ComponentApiContract,
  ComponentManifestField,
  ComponentPropRuntimeType,
} from '@aurora/core';

export interface VuePropOption<Value> {
  type?: PropType<Value> | true | null;
  default?: unknown;
  required?: boolean;
  validator?: (value: unknown) => boolean;
}

export type VuePropDefinitions<Props extends object> = {
  [Name in keyof Props]-?: VuePropOption<NonNullable<Props[Name]>>;
};

export interface VueManifestFieldAdaptation {
  rename?: Readonly<Record<string, string>>;
  omit?: readonly string[];
}

export interface VueManifestPropAdaptation extends VueManifestFieldAdaptation {
  omitDefaults?: readonly string[];
}

function getAdaptedFields(
  fields: readonly ComponentManifestField[],
  adaptation: VueManifestFieldAdaptation = {},
): Array<{ sourceName: string; name: string; field: ComponentManifestField }> {
  const omitted = new Set(adaptation.omit);
  const adapted = fields
    .filter(field => !omitted.has(field.name))
    .map(field => ({
      sourceName: field.name,
      name: adaptation.rename?.[field.name] ?? field.name,
      field,
    }));
  const names = adapted.map(field => field.name);
  if (new Set(names).size !== names.length) {
    throw new Error('A renderer manifest adaptation produced duplicate field names.');
  }
  return adapted;
}

function runtimeTypeConstructor(runtimeType: ComponentPropRuntimeType): PropType<unknown> {
  const constructors = {
    array: Array,
    boolean: Boolean,
    function: Function,
    number: Number,
    object: Object,
    string: String,
  } as const;
  return constructors[runtimeType] as PropType<unknown>;
}

function runtimeTypeConstructors(
  runtimeType: ComponentManifestField['runtimeType'],
): PropType<unknown> {
  if (!runtimeType) {
    throw new Error('A Vue runtime prop requires runtimeType in its Core manifest field.');
  }
  return typeof runtimeType === 'string'
    ? runtimeTypeConstructor(runtimeType)
    : (runtimeType.map(runtimeTypeConstructor) as PropType<unknown>);
}

/**
 * 将 Core manifest/contract 转换为 Vue runtime props。
 * @en Converts a Core manifest and contract into Vue runtime props.
 */
export function createVuePropsFromManifest<Props extends object>(
  fields: readonly ComponentManifestField[],
  contract: ComponentApiContract<Props, object, object, object>,
  adaptation: VueManifestPropAdaptation = {},
): Record<string, VuePropOption<unknown>> {
  const defaults = contract.defaults as Readonly<Record<string, unknown>>;
  const validators = contract.validators as
    | Readonly<Record<string, ((value: unknown) => boolean) | undefined>>
    | undefined;
  const omittedDefaults = new Set(adaptation.omitDefaults);

  return Object.fromEntries(
    getAdaptedFields(fields, adaptation).map(({ sourceName, name, field }) => {
      const option: VuePropOption<unknown> = {
        type: runtimeTypeConstructors(field.runtimeType),
      };
      if (Object.hasOwn(defaults, sourceName) && !omittedDefaults.has(sourceName)) {
        option.default = defaults[sourceName];
      }
      const validator = validators?.[sourceName];
      if (validator) option.validator = validator;
      return [name, option];
    }),
  );
}

/**
 * 从 Core manifest 生成 Vue emits，并只在 renderer 注入事件对象校验。
 * @en Creates Vue emits from a Core manifest while renderer event validation stays local.
 */
export function createVueEmitsFromManifest(
  fields: readonly ComponentManifestField[],
  options: VueManifestFieldAdaptation & {
    validators?: Readonly<Record<string, (...args: never[]) => boolean>>;
    extend?: Readonly<Record<string, (...args: never[]) => boolean>>;
  } = {},
): Record<string, (...args: never[]) => boolean> {
  const validators = options.validators ?? {};
  return {
    ...Object.fromEntries(
      getAdaptedFields(fields, options).map(({ name }) => [name, validators[name] ?? (() => true)]),
    ),
    ...(options.extend ?? {}),
  };
}

/** 由 Core region manifest 建立 Vue slots 类型入口。 @en Creates a Vue slots entry from Core regions. */
export function createVueSlotsFromManifest<Slots extends object>(
  fields: readonly ComponentManifestField[],
  adaptation: VueManifestFieldAdaptation = {},
): SlotsType<Slots> {
  getAdaptedFields(fields, adaptation);
  return Object as SlotsType<Slots>;
}

/** 由 Core command manifest 建立 Vue exposes 元数据。 @en Creates Vue expose metadata from Core commands. */
export function createVueExposesFromManifest(
  fields: readonly ComponentManifestField[],
  adaptation: VueManifestFieldAdaptation = {},
): Record<string, PropType<unknown>> {
  return Object.fromEntries(
    getAdaptedFields(fields, adaptation).map(({ name, field }) => [
      name,
      runtimeTypeConstructors(field.runtimeType),
    ]),
  );
}
