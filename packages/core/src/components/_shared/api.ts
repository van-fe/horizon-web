export type ComponentPropValidator<Value> = (value: unknown) => value is Value;

export type ComponentPropRuntimeType =
  | 'array'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string';

export interface ComponentPropDefinition<Value> {
  /** 框架无关的运行时值类型。 @en Framework-neutral runtime value type. */
  runtimeType: ComponentPropRuntimeType | readonly ComponentPropRuntimeType[];
  /** 面向文档的公开类型。 @en Public type displayed in documentation. */
  type: string;
  /** 中英文语义说明。 @en Chinese and English semantic description. */
  description: { zh: string; en: string };
  /** 是否为必填输入。 @en Whether the input is required. */
  required?: boolean;
  /** 公共默认值。 @en Shared default value. */
  default?: Value;
  /** 公共校验器。 @en Shared validator. */
  validator?: ComponentPropValidator<NonNullable<Value>>;
}

export type ComponentPropDefinitions<Props extends object> = {
  [Name in keyof Props]-?: ComponentPropDefinition<Props[Name]>;
};

export function defineComponentPropDefinitions<Props extends object>() {
  return <const Definitions extends ComponentPropDefinitions<Props>>(definitions: Definitions) =>
    Object.freeze(definitions);
}

type ComponentPropDefinitionDefaults<Definitions extends object> = {
  readonly [Name in keyof Definitions as Definitions[Name] extends { default: unknown }
    ? Name
    : never]: Definitions[Name] extends { default: infer Default } ? Default : never;
};

export function createComponentPropDefaults<const Definitions extends object>(
  definitions: Definitions,
): ComponentPropDefinitionDefaults<Definitions> {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(definitions).flatMap(([name, definition]) =>
        Object.hasOwn(definition as object, 'default')
          ? [[name, (definition as { default: unknown }).default]]
          : [],
      ),
    ),
  ) as ComponentPropDefinitionDefaults<Definitions>;
}

export function createComponentPropValidators<Props extends object>(
  definitions: ComponentPropDefinitions<Props>,
): ComponentPropValidators<Props> {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(definitions).flatMap(([name, definition]) =>
        (definition as ComponentPropDefinition<unknown>).validator
          ? [[name, (definition as ComponentPropDefinition<unknown>).validator]]
          : [],
      ),
    ),
  ) as ComponentPropValidators<Props>;
}

export type ComponentPropValidators<Props extends object> = Readonly<
  Partial<{ [Key in keyof Props]-?: ComponentPropValidator<NonNullable<Props[Key]>> }>
>;

export type EmptyComponentApi = Readonly<Record<never, never>>;

export type ComponentApiKeyRename<Shape extends object> = Readonly<
  Partial<{ [Name in keyof Shape]: PropertyKey }>
>;

type AdaptedComponentApiKey<
  Name extends PropertyKey,
  Rename extends Readonly<Partial<Record<PropertyKey, PropertyKey>>>,
> = Name extends keyof Rename
  ? NonNullable<Rename[Name]> extends PropertyKey
    ? NonNullable<Rename[Name]>
    : never
  : Name;

/**
 * Adapts a semantic component API shape without introducing renderer types into Core.
 * Renderers use this for public-name changes, omissions and native extensions.
 */
export type AdaptComponentApiShape<
  Shape extends object,
  Rename extends ComponentApiKeyRename<Shape> = EmptyComponentApi,
  Omitted extends keyof Shape = never,
  Extended extends object = EmptyComponentApi,
> = {
  [Name in keyof Shape as Name extends Omitted
    ? never
    : AdaptedComponentApiKey<Name, Rename>]: Shape[Name];
} & Extended;

/** Forces renderer runtime declarations to cover every adapted prop exactly once. */
export type ComponentRendererPropDefinitions<Props extends object> = {
  [Name in keyof Props]-?: unknown;
};

export type ComponentEventValidators<Events extends object> = {
  [Name in keyof Events]-?: Events[Name] extends readonly unknown[]
    ? (...args: Events[Name]) => boolean
    : never;
};

export type ComponentEventHandlers<Events extends object> = {
  [Name in keyof Events]?: Events[Name] extends readonly unknown[]
    ? (...args: Events[Name]) => void
    : never;
};

export interface ComponentApiContractDefinition<Props extends object> {
  defaults: Readonly<Partial<Props>>;
  validators?: ComponentPropValidators<Props>;
  propDefinitions?: ComponentPropDefinitions<Props>;
}

export interface ComponentApiContract<
  Props extends object,
  Events extends object,
  Regions extends object,
  Commands extends object,
> extends ComponentApiContractDefinition<Props> {
  /** Type-only carrier used by renderer adapters. */
  readonly api?: {
    props: Props;
    events: Events;
    regions: Regions;
    commands: Commands;
  };
}

export function defineComponentApiContract<
  Props extends object,
  Events extends object = EmptyComponentApi,
  Regions extends object = EmptyComponentApi,
  Commands extends object = EmptyComponentApi,
>(
  definition: ComponentApiContractDefinition<Props>,
): Readonly<ComponentApiContract<Props, Events, Regions, Commands>> {
  return Object.freeze(definition);
}

export type ComponentEventArguments<
  Events extends object,
  Name extends keyof Events,
> = Events[Name] extends readonly unknown[] ? Events[Name] : never;

export type ComponentRegionContext<
  Regions extends object,
  Name extends keyof Regions,
> = Regions[Name];
