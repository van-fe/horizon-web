export type SelectPrimitiveValue = string | number | boolean | symbol;
export type SelectValue = SelectPrimitiveValue | Record<PropertyKey, unknown>;
export type SelectChangeReason = 'select' | 'clear' | 'keyboard' | 'imperative';
export type SelectOpenReason = 'trigger' | 'keyboard' | 'escape' | 'outside-pointer' | 'select' | 'imperative';

export interface SelectOption<Value = SelectValue> {
  id: string;
  value: Value;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  keywords?: readonly string[];
}

export interface SelectState<Value = SelectValue> {
  value: Value | undefined;
  open: boolean;
  inputValue: string;
  highlightedValue: Value | undefined;
  disabled: boolean;
}

export interface SelectChangeDetails<Value = SelectValue> {
  reason: SelectChangeReason;
  option?: SelectOption<Value>;
}

export interface SelectOpenChangeDetails {
  reason: SelectOpenReason;
}

export interface SelectControllerOptions<Value = SelectValue> {
  value?: Value;
  open?: boolean;
  inputValue?: string;
  disabled?: boolean;
  options?: readonly SelectOption<Value>[];
  filter?: (input: string, option: SelectOption<Value>) => boolean;
  isEqual?: (left: Value, right: Value) => boolean;
  onChange?: (value: Value | undefined, details: SelectChangeDetails<Value>) => void;
  onOpenChange?: (open: boolean, details: SelectOpenChangeDetails) => void;
  onInputValueChange?: (input: string) => void;
  onHighlightChange?: (value: Value | undefined) => void;
}

export const SELECT_VALUE_FORMAT_SYMBOL = Symbol.for('@aurora/core/select/value-format');

export type SelectFormattedValue<Value = SelectValue> = Record<PropertyKey, unknown> & {
  [SELECT_VALUE_FORMAT_SYMBOL]?: Value;
};

export function normalizeSelectValue<Value>(value: Value | null | undefined): Value | undefined {
  return value == null ? undefined : value;
}

export function normalizeSelectValues<Value>(
  value: Value | readonly Value[] | null | undefined,
  multiple = false,
): Set<Value> {
  if (value == null) return new Set();
  if (!multiple) return new Set([value as Value]);
  return new Set(Array.isArray(value) ? value : [value as Value]);
}

export function isSelectFormattedValue<Value = SelectValue>(
  value: unknown,
): value is SelectFormattedValue<Value> & Required<Pick<SelectFormattedValue<Value>, typeof SELECT_VALUE_FORMAT_SYMBOL>> {
  return typeof value === 'object' && value !== null && SELECT_VALUE_FORMAT_SYMBOL in value;
}

export function unwrapSelectValue<Value>(value: Value | SelectFormattedValue<Value>): Value {
  return isSelectFormattedValue<Value>(value) ? value[SELECT_VALUE_FORMAT_SYMBOL] : (value as Value);
}

export function wrapSelectFormattedValue<Value, Formatted extends Record<PropertyKey, unknown>>(
  formattedValue: Formatted,
  optionValue: Value,
): Formatted & Required<Pick<SelectFormattedValue<Value>, typeof SELECT_VALUE_FORMAT_SYMBOL>> {
  const wrapped = (Array.isArray(formattedValue) ? [...formattedValue] : { ...formattedValue }) as Formatted &
    Required<Pick<SelectFormattedValue<Value>, typeof SELECT_VALUE_FORMAT_SYMBOL>>;
  Object.defineProperty(wrapped, SELECT_VALUE_FORMAT_SYMBOL, {
    configurable: true,
    value: optionValue,
  });
  return wrapped;
}

export function removeSelectValueMetadata<Value>(value: Value): Value {
  if (!isSelectFormattedValue(value)) return value;
  const publicValue = (Array.isArray(value) ? [...value] : { ...value }) as Value & SelectFormattedValue;
  delete publicValue[SELECT_VALUE_FORMAT_SYMBOL];
  return publicValue as Value;
}

function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object' && value !== null;
}

function enumerableKeys(value: Record<PropertyKey, unknown>): PropertyKey[] {
  return Reflect.ownKeys(value).filter(key => Object.prototype.propertyIsEnumerable.call(value, key));
}

/** Deep comparison for renderer-free option values. Vue's private `_ctx` field is ignored for compatibility. */
export function isSelectValueEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (!isObject(left) || !isObject(right)) return false;
  if (left instanceof Date || right instanceof Date) {
    return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    return (
      Array.isArray(left) &&
      Array.isArray(right) &&
      left.length === right.length &&
      left.every((item, index) => isSelectValueEqual(item, right[index]))
    );
  }
  const leftKeys = enumerableKeys(left).filter(key => key !== '_ctx');
  const rightKeys = enumerableKeys(right).filter(key => key !== '_ctx');
  return (
    leftKeys.length === rightKeys.length &&
    leftKeys.every(
      key => rightKeys.includes(key) && isSelectValueEqual(left[key], right[key]),
    )
  );
}

export function defaultSelectFilter<Value>(input: string, option: SelectOption<Value>): boolean {
  const keyword = input.trim().toLocaleLowerCase();
  if (!keyword) return true;
  return [option.label, option.description, ...(option.keywords ?? [])].some(value =>
    value?.toLocaleLowerCase().includes(keyword),
  );
}

export function filterSelectOptions<Value>(
  options: readonly SelectOption<Value>[],
  input: string,
  filter: (input: string, option: SelectOption<Value>) => boolean = defaultSelectFilter,
): SelectOption<Value>[] {
  return options.filter(option => filter(input, option));
}

export class SelectOptionCollection<Value = SelectValue> {
  private entries: SelectOption<Value>[] = [];
  private readonly isEqual: (left: Value, right: Value) => boolean;

  constructor(
    options: readonly SelectOption<Value>[] = [],
    isEqual: (left: Value, right: Value) => boolean = isSelectValueEqual,
  ) {
    this.isEqual = isEqual;
    options.forEach(option => this.register(option));
  }

  public get values(): readonly SelectOption<Value>[] {
    return this.entries;
  }

  /** Duplicate values are replaced in place so DOM order stays deterministic. */
  public register(option: SelectOption<Value>): () => void {
    const index = this.entries.findIndex(entry => this.isEqual(entry.value, option.value));
    if (index >= 0) this.entries[index] = option;
    else this.entries.push(option);
    return () => this.unregister(option.value);
  }

  public unregister(value: Value): boolean {
    const index = this.entries.findIndex(entry => this.isEqual(entry.value, value));
    if (index < 0) return false;
    this.entries.splice(index, 1);
    return true;
  }

  public get(value: Value | undefined): SelectOption<Value> | undefined {
    return value === undefined
      ? undefined
      : this.entries.find(entry => this.isEqual(entry.value, value));
  }

  public clear(): void {
    this.entries = [];
  }
}

export function findNextEnabledOption<Value>(
  options: readonly SelectOption<Value>[],
  currentValue: Value | undefined,
  direction: 1 | -1,
  isEqual: (left: Value, right: Value) => boolean = isSelectValueEqual,
): SelectOption<Value> | undefined {
  const enabled = options.filter(option => !option.disabled);
  if (enabled.length === 0) return undefined;
  const currentIndex =
    currentValue === undefined
      ? -1
      : enabled.findIndex(option => isEqual(option.value, currentValue));
  if (currentIndex < 0) return direction === 1 ? enabled[0] : enabled.at(-1);
  return enabled[(currentIndex + direction + enabled.length) % enabled.length];
}

export class SelectController<Value = SelectValue> {
  private state: SelectState<Value>;
  private readonly collection: SelectOptionCollection<Value>;
  private options: Omit<Required<SelectControllerOptions<Value>>, 'value' | 'options'>;
  private destroyed = false;

  constructor(options: SelectControllerOptions<Value> = {}) {
    const isEqual = options.isEqual ?? isSelectValueEqual;
    this.collection = new SelectOptionCollection(options.options, isEqual);
    this.state = {
      value: normalizeSelectValue(options.value),
      open: options.open ?? false,
      inputValue: options.inputValue ?? '',
      highlightedValue: undefined,
      disabled: options.disabled ?? false,
    };
    this.options = {
      open: options.open ?? false,
      inputValue: options.inputValue ?? '',
      disabled: options.disabled ?? false,
      filter: options.filter ?? defaultSelectFilter,
      isEqual,
      onChange: options.onChange ?? (() => {}),
      onOpenChange: options.onOpenChange ?? (() => {}),
      onInputValueChange: options.onInputValueChange ?? (() => {}),
      onHighlightChange: options.onHighlightChange ?? (() => {}),
    };
  }

  public get snapshot(): Readonly<SelectState<Value>> {
    return this.state;
  }

  public get allOptions(): readonly SelectOption<Value>[] {
    return this.collection.values;
  }

  public get visibleOptions(): readonly SelectOption<Value>[] {
    return filterSelectOptions(this.collection.values, this.state.inputValue, this.options.filter);
  }

  public setOptions(options: SelectControllerOptions<Value>): void {
    this.destroyed = false;
    this.options = { ...this.options, ...options, options: undefined, value: undefined } as typeof this.options;
    if (options.options) {
      this.collection.clear();
      options.options.forEach(option => this.collection.register(option));
    }
    if (options.disabled !== undefined) this.setDisabled(options.disabled);
  }

  public syncState(state: Partial<Pick<SelectState<Value>, 'value' | 'open' | 'inputValue' | 'disabled'>>): void {
    this.state = { ...this.state, ...state };
    if (this.state.disabled) this.state = { ...this.state, open: false };
  }

  public registerOption(option: SelectOption<Value>): () => void {
    return this.collection.register(option);
  }

  public setDisabled(disabled: boolean): void {
    this.state = { ...this.state, disabled, open: disabled ? false : this.state.open };
  }

  public setInputValue(inputValue: string): void {
    if (this.destroyed || inputValue === this.state.inputValue) return;
    this.state = { ...this.state, inputValue };
    this.options.onInputValueChange(inputValue);
    const highlighted = this.collection.get(this.state.highlightedValue);
    if (!highlighted || highlighted.disabled) this.highlight(1);
  }

  public open(reason: SelectOpenReason = 'imperative'): void {
    this.commitOpen(true, reason);
  }

  public close(reason: SelectOpenReason = 'imperative'): void {
    this.commitOpen(false, reason);
  }

  public toggle(reason: SelectOpenReason = 'trigger'): void {
    this.commitOpen(!this.state.open, reason);
  }

  public highlight(direction: 1 | -1): Value | undefined {
    if (this.destroyed) return undefined;
    const option = findNextEnabledOption(
      this.visibleOptions,
      this.state.highlightedValue,
      direction,
      this.options.isEqual,
    );
    const value = option?.value;
    this.state = { ...this.state, highlightedValue: value };
    this.options.onHighlightChange(value);
    return value;
  }

  public highlightBoundary(boundary: 'first' | 'last'): Value | undefined {
    if (this.destroyed) return undefined;
    const enabled = this.visibleOptions.filter(option => !option.disabled);
    const value = (boundary === 'first' ? enabled[0] : enabled.at(-1))?.value;
    this.state = { ...this.state, highlightedValue: value };
    this.options.onHighlightChange(value);
    return value;
  }

  public highlightValue(value: Value): boolean {
    if (this.destroyed) return false;
    const option = this.collection.get(value);
    if (!option || option.disabled || !this.visibleOptions.includes(option)) return false;
    this.state = { ...this.state, highlightedValue: option.value };
    this.options.onHighlightChange(option.value);
    return true;
  }

  public select(value: Value, reason: SelectChangeReason = 'select'): boolean {
    if (this.destroyed || this.state.disabled) return false;
    const option = this.collection.get(value);
    if (!option || option.disabled) return false;
    const changed =
      this.state.value === undefined || !this.options.isEqual(this.state.value, option.value);
    this.state = { ...this.state, value: option.value, highlightedValue: option.value };
    if (changed) this.options.onChange(option.value, { reason, option });
    return changed;
  }

  public selectHighlighted(): boolean {
    return this.state.highlightedValue === undefined
      ? false
      : this.select(this.state.highlightedValue, 'keyboard');
  }

  public clear(reason: SelectChangeReason = 'clear'): boolean {
    if (this.destroyed || this.state.disabled || this.state.value === undefined) return false;
    this.state = { ...this.state, value: undefined };
    this.options.onChange(undefined, { reason });
    return true;
  }

  public destroy(): void {
    this.destroyed = true;
    this.collection.clear();
  }

  private commitOpen(open: boolean, reason: SelectOpenReason): void {
    if (this.destroyed || (open && this.state.disabled) || open === this.state.open) return;
    this.state = { ...this.state, open };
    this.options.onOpenChange(open, { reason });
  }
}
export { selectManifest } from './manifest';
