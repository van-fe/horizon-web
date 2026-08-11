import type { FloatButtonGroupExpansionDetails, FloatButtonGroupExpansionReason } from './contract';

export interface FloatButtonGroupState {
  visible: boolean;
  expanded: boolean;
  useCollapse: boolean;
}

export interface FloatButtonGroupControllerOptions {
  visible?: boolean;
  defaultVisible?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  useCollapse?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onExpandedChange?: (expanded: boolean, details: FloatButtonGroupExpansionDetails) => void;
}

/**
 * 框架无关的悬浮按钮组可见与展开状态控制器。
 * @en Framework-neutral visibility and expansion controller for floating button groups.
 */
export class FloatButtonGroupController {
  private state: FloatButtonGroupState;
  private visibleControlled: boolean;
  private expandedControlled: boolean;
  private onVisibleChange?: FloatButtonGroupControllerOptions['onVisibleChange'];
  private onExpandedChange?: FloatButtonGroupControllerOptions['onExpandedChange'];

  constructor(options: FloatButtonGroupControllerOptions = {}) {
    this.visibleControlled = options.visible !== undefined;
    this.expandedControlled = options.expanded !== undefined;
    this.state = {
      visible: options.visible ?? options.defaultVisible ?? true,
      expanded: options.expanded ?? options.defaultExpanded ?? false,
      useCollapse: options.useCollapse ?? false,
    };
    this.onVisibleChange = options.onVisibleChange;
    this.onExpandedChange = options.onExpandedChange;
  }

  public get snapshot(): Readonly<FloatButtonGroupState> {
    return {
      ...this.state,
      expanded: this.state.useCollapse ? this.state.expanded : true,
    };
  }

  public setOptions(options: FloatButtonGroupControllerOptions): void {
    if (Object.hasOwn(options, 'onVisibleChange')) this.onVisibleChange = options.onVisibleChange;
    if (Object.hasOwn(options, 'onExpandedChange')) {
      this.onExpandedChange = options.onExpandedChange;
    }
    if (options.useCollapse !== undefined)
      this.state = { ...this.state, useCollapse: options.useCollapse };
    if (Object.hasOwn(options, 'visible')) {
      this.visibleControlled = options.visible !== undefined;
      if (options.visible !== undefined) this.syncVisible(options.visible);
    }
    if (Object.hasOwn(options, 'expanded')) {
      this.expandedControlled = options.expanded !== undefined;
      if (options.expanded !== undefined) this.syncExpanded(options.expanded);
    }
  }

  public syncVisible(visible: boolean): void {
    this.state = { ...this.state, visible };
  }

  public syncExpanded(expanded: boolean): void {
    this.state = { ...this.state, expanded };
  }

  public show(): boolean {
    return this.setVisible(true);
  }

  public hide(): boolean {
    return this.setVisible(false);
  }

  public expand(reason: FloatButtonGroupExpansionReason = 'imperative'): boolean {
    return this.setExpanded(true, reason);
  }

  public fold(reason: FloatButtonGroupExpansionReason = 'imperative'): boolean {
    return this.setExpanded(false, reason);
  }

  public toggle(reason: FloatButtonGroupExpansionReason = 'imperative'): boolean {
    return this.setExpanded(!this.snapshot.expanded, reason);
  }

  private setVisible(visible: boolean): boolean {
    if (visible === this.state.visible) return false;
    if (!this.visibleControlled) this.state = { ...this.state, visible };
    this.onVisibleChange?.(visible);
    return true;
  }

  private setExpanded(expanded: boolean, reason: FloatButtonGroupExpansionReason): boolean {
    if (!this.state.useCollapse || expanded === this.state.expanded) return false;
    if (!this.expandedControlled) this.state = { ...this.state, expanded };
    this.onExpandedChange?.(expanded, { reason });
    return true;
  }
}
