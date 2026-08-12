import type {
  AutoCompleteOpenChangeDetails,
  AutoCompleteOpenReason,
  AutoCompleteOption,
  AutoCompleteSelectDetails,
} from './contract';
import {
  normalizeAutoCompleteOptions,
  normalizeAutoCompleteValue,
  orderAutoCompleteOptions,
  resolveAutoCompleteNavigation,
} from './logic';

export interface AutoCompleteState {
  value: string;
  open: boolean;
  composing: boolean;
  highlightedIndex: number;
  disabled: boolean;
}

export interface AutoCompleteControllerOptions<Description = unknown> {
  value?: string | null;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hidePanelWhenEmptyList?: boolean;
  selectedOptionOrderToTop?: boolean;
  options?: readonly AutoCompleteOption<Description>[];
  idPrefix?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean, details: AutoCompleteOpenChangeDetails) => void;
  onSearch?: (value: string) => void;
  onSelect?: (
    value: string,
    details: AutoCompleteSelectDetails<AutoCompleteOption<Description>>,
  ) => void;
  onReachEnd?: () => void;
  onHighlightChange?: (index: number) => void;
}

export class AutoCompleteController<Description = unknown> {
  private state: AutoCompleteState;
  private options: Required<
    Omit<AutoCompleteControllerOptions<Description>, 'value' | 'options' | 'idPrefix'>
  > & { idPrefix: string };
  private sourceOptions: readonly AutoCompleteOption<Description>[];
  private destroyed = false;

  constructor(options: AutoCompleteControllerOptions<Description> = {}) {
    this.state = {
      value: normalizeAutoCompleteValue(options.value),
      open: options.open ?? false,
      composing: false,
      highlightedIndex: -1,
      disabled: options.disabled ?? false,
    };
    this.sourceOptions = options.options ?? [];
    this.options = {
      open: options.open ?? false,
      disabled: options.disabled ?? false,
      loading: options.loading ?? false,
      hidePanelWhenEmptyList: options.hidePanelWhenEmptyList ?? true,
      selectedOptionOrderToTop: options.selectedOptionOrderToTop ?? false,
      idPrefix: options.idPrefix ?? 'auto-complete-option',
      onValueChange: options.onValueChange ?? (() => {}),
      onOpenChange: options.onOpenChange ?? (() => {}),
      onSearch: options.onSearch ?? (() => {}),
      onSelect: options.onSelect ?? (() => {}),
      onReachEnd: options.onReachEnd ?? (() => {}),
      onHighlightChange: options.onHighlightChange ?? (() => {}),
    };
  }

  public get snapshot(): Readonly<AutoCompleteState> {
    return this.state;
  }

  public get allOptions() {
    return normalizeAutoCompleteOptions(this.sourceOptions, this.options.idPrefix);
  }

  public get visibleOptions() {
    return orderAutoCompleteOptions(
      this.allOptions,
      this.state.value,
      this.state.open && this.options.selectedOptionOrderToTop,
    );
  }

  public setOptions(options: AutoCompleteControllerOptions<Description>): void {
    this.options = {
      ...this.options,
      ...options,
      options: undefined,
      value: undefined,
    } as typeof this.options;
    if (options.options) this.sourceOptions = options.options;
    if (options.disabled !== undefined) this.setDisabled(options.disabled);
    if (this.state.highlightedIndex >= this.visibleOptions.length) this.setHighlight(-1);
  }

  public syncState(state: Partial<Pick<AutoCompleteState, 'value' | 'open' | 'disabled'>>): void {
    this.state = { ...this.state, ...state };
    if (this.state.disabled) this.state = { ...this.state, open: false, highlightedIndex: -1 };
  }

  public setDisabled(disabled: boolean): void {
    this.state = {
      ...this.state,
      disabled,
      open: disabled ? false : this.state.open,
      highlightedIndex: disabled ? -1 : this.state.highlightedIndex,
    };
  }

  public startComposition(): void {
    this.state = { ...this.state, composing: true };
  }

  public endComposition(): void {
    this.state = { ...this.state, composing: false };
  }

  public input(value: string): void {
    if (this.destroyed || this.state.disabled) return;
    this.state = { ...this.state, value };
    this.options.onValueChange(value);
    if (!this.state.composing) this.options.onSearch(value);
  }

  public open(reason: AutoCompleteOpenReason = 'imperative'): boolean {
    if (
      this.destroyed ||
      this.state.disabled ||
      (this.options.hidePanelWhenEmptyList && this.sourceOptions.length === 0)
    ) {
      return false;
    }
    return this.commitOpen(true, reason);
  }

  public close(reason: AutoCompleteOpenReason = 'imperative'): boolean {
    return this.commitOpen(false, reason);
  }

  public navigate(direction: 1 | -1): number {
    if (this.destroyed || !this.state.open) return this.state.highlightedIndex;
    const result = resolveAutoCompleteNavigation(
      this.visibleOptions.length,
      this.state.highlightedIndex,
      direction,
    );
    this.setHighlight(result.index);
    if (result.reachedEnd && !this.options.loading) this.options.onReachEnd();
    return result.index;
  }

  public highlight(index: number): boolean {
    if (this.destroyed || index < 0 || index >= this.visibleOptions.length) return false;
    this.setHighlight(index);
    return true;
  }

  public select(index = this.state.highlightedIndex): string | undefined {
    if (this.destroyed || this.state.disabled || this.state.composing) return undefined;
    const option = this.visibleOptions[index];
    if (!option) return undefined;
    this.state = { ...this.state, value: option.value, highlightedIndex: index };
    const details = { option, index };
    this.options.onValueChange(option.value);
    this.options.onSelect(option.value, details);
    this.close('select');
    return option.value;
  }

  public clear(): boolean {
    if (this.destroyed || this.state.disabled) return false;
    this.state = { ...this.state, value: '', highlightedIndex: -1 };
    this.options.onValueChange('');
    this.options.onSearch('');
    this.close('clear');
    return true;
  }

  public destroy(): void {
    this.destroyed = true;
    this.sourceOptions = [];
  }

  private commitOpen(open: boolean, reason: AutoCompleteOpenReason): boolean {
    if (this.destroyed || open === this.state.open || (open && this.state.disabled)) return false;
    this.state = { ...this.state, open, highlightedIndex: open ? this.state.highlightedIndex : -1 };
    this.options.onOpenChange(open, { reason });
    if (!open) this.options.onHighlightChange(-1);
    return true;
  }

  private setHighlight(index: number): void {
    if (index === this.state.highlightedIndex) return;
    this.state = { ...this.state, highlightedIndex: index };
    this.options.onHighlightChange(index);
  }
}
