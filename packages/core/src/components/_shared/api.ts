export type ComponentPropValidator<Value> = (value: unknown) => value is Value;

export type ComponentPropValidators<Props extends object> = Readonly<
  Partial<{ [Key in keyof Props]-?: ComponentPropValidator<NonNullable<Props[Key]>> }>
>;

export type EmptyComponentApi = Readonly<Record<never, never>>;

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
