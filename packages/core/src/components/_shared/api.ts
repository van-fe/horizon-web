export type ComponentPropValidator<Value> = (value: unknown) => value is Value;

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
  [Name in Exclude<keyof Shape, Omitted> as AdaptedComponentApiKey<Name, Rename>]: Shape[Name];
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
