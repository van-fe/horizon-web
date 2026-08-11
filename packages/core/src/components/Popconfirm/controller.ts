import type {
  PopconfirmBeforeConfirm,
  PopconfirmChangeDetails,
  PopconfirmOpenReason,
  PopconfirmState,
} from './contract';
import { resolvePopconfirmOpenState } from './contract';

export type PopconfirmConfirmResult =
  | { status: 'confirmed' }
  | { status: 'prevented' }
  | { status: 'ignored' }
  | { status: 'rejected'; error: unknown };

export interface PopconfirmControllerOptions<Event = unknown> {
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 禁用确认浮层。 @en Disables the confirmation popover. */
  disabled?: boolean;
  /** 确认前守卫。 @en Guard run before confirmation. */
  beforeConfirm?: PopconfirmBeforeConfirm;
  /** 打开状态变化回调。 @en Open-state change callback. */
  onOpenChange?: (open: boolean, details: PopconfirmChangeDetails) => void;
  /** 异步确认状态变化回调。 @en Pending confirmation change callback. */
  onPendingChange?: (pending: boolean) => void;
  /** 确认回调。 @en Confirmation callback. */
  onConfirm?: (event: Event) => void;
  /** 取消回调。 @en Cancellation callback. */
  onCancel?: (event: Event) => void;
}

/**
 * 框架无关的确认浮层状态控制器。
 * @en Framework-neutral confirmation popover state controller.
 */
export class PopconfirmController<Event = unknown> {
  private state: PopconfirmState;
  private controlled: boolean;
  private options: Omit<PopconfirmControllerOptions<Event>, 'open' | 'defaultOpen' | 'disabled'>;
  private operation = 0;

  constructor(options: PopconfirmControllerOptions<Event> = {}) {
    this.controlled = options.open !== undefined;
    this.state = {
      open: options.disabled ? false : (options.open ?? options.defaultOpen ?? false),
      disabled: options.disabled ?? false,
      pending: false,
    };
    this.options = this.pickOptions(options);
  }

  public get snapshot(): Readonly<PopconfirmState> {
    return this.state;
  }

  /**
   * 更新动态选项，并在传入 open 时同步受控状态。
   * @en Updates dynamic options and synchronizes controlled state when open is supplied.
   * @param options 新选项。
   * @paramEn options New options.
   */
  public setOptions(options: PopconfirmControllerOptions<Event>): void {
    this.mergeOptions(options);
    if (options.disabled !== undefined) this.setDisabled(options.disabled);
    if (Object.hasOwn(options, 'open')) {
      this.controlled = options.open !== undefined;
      if (options.open !== undefined) this.syncOpen(options.open);
    }
  }

  /**
   * 同步渲染器控制的打开状态且不触发回调。
   * @en Synchronizes a renderer-controlled open state without notifying callbacks.
   * @param open 受控打开状态。
   * @paramEn open Controlled open state.
   */
  public syncOpen(open: boolean): void {
    this.state = { ...this.state, open: this.state.disabled ? false : open };
    if (!this.state.open) this.invalidateConfirmation();
  }

  /**
   * 更新禁用状态；禁用时立即关闭并取消待处理确认。
   * @en Updates disabled state; disabling closes immediately and cancels pending confirmation.
   * @param disabled 是否禁用。
   * @paramEn disabled Whether disabled.
   */
  public setDisabled(disabled: boolean): void {
    if (disabled === this.state.disabled) return;
    const wasOpen = this.state.open;
    this.state = { ...this.state, disabled, open: disabled ? false : this.state.open };
    if (!disabled) return;
    this.invalidateConfirmation();
    if (wasOpen) this.options.onOpenChange?.(false, { reason: 'disabled' });
  }

  /**
   * 请求打开确认浮层。
   * @en Requests opening the confirmation popover.
   * @param reason 打开原因。
   * @paramEn reason Open reason.
   */
  public requestOpen(reason: PopconfirmOpenReason = 'trigger'): boolean {
    return this.requestState(true, reason);
  }

  /**
   * 请求关闭确认浮层。
   * @en Requests closing the confirmation popover.
   * @param reason 关闭原因。
   * @paramEn reason Close reason.
   */
  public requestClose(reason: PopconfirmOpenReason = 'imperative'): boolean {
    this.invalidateConfirmation();
    return this.requestState(false, reason);
  }

  /**
   * 切换确认浮层。
   * @en Toggles the confirmation popover.
   * @param reason 状态变化原因。
   * @paramEn reason State-change reason.
   */
  public toggle(reason: PopconfirmOpenReason = 'trigger'): boolean {
    return this.state.open ? this.requestClose(reason) : this.requestOpen(reason);
  }

  /**
   * 执行确认守卫并提交确认。
   * @en Runs the confirmation guard and commits confirmation.
   * @param event 触发确认的事件。
   * @paramEn event Event that triggered confirmation.
   */
  public async confirm(event: Event): Promise<PopconfirmConfirmResult> {
    if (!this.state.open || this.state.disabled || this.state.pending) return { status: 'ignored' };

    const operation = ++this.operation;
    this.setPending(true);
    try {
      if ((await this.options.beforeConfirm?.()) === false) return { status: 'prevented' };
      if (operation !== this.operation || !this.state.open || this.state.disabled) {
        return { status: 'ignored' };
      }
      this.options.onConfirm?.(event);
      this.commitConfirmedClose();
      return { status: 'confirmed' };
    } catch (error) {
      return { status: 'rejected', error };
    } finally {
      if (operation === this.operation) this.setPending(false);
    }
  }

  /**
   * 取消确认并关闭浮层。
   * @en Cancels confirmation and closes the popover.
   * @param event 触发取消的事件。
   * @paramEn event Event that triggered cancellation.
   */
  public cancel(event: Event): boolean {
    if (!this.state.open || this.state.disabled) return false;
    this.invalidateConfirmation();
    this.options.onCancel?.(event);
    return this.requestState(false, 'cancel');
  }

  private requestState(open: boolean, reason: PopconfirmOpenReason): boolean {
    const result = resolvePopconfirmOpenState(this.state, { open, reason });
    if (open && this.state.disabled) return false;
    if (!result.changed) return false;
    if (!this.controlled) this.state = result.state;
    this.options.onOpenChange?.(result.state.open, { reason: result.reason });
    return true;
  }

  private commitConfirmedClose(): void {
    const result = resolvePopconfirmOpenState(this.state, { open: false, reason: 'confirm' });
    if (!result.changed) return;
    if (!this.controlled) this.state = result.state;
    this.options.onOpenChange?.(false, { reason: 'confirm' });
  }

  private invalidateConfirmation(): void {
    this.operation += 1;
    this.setPending(false);
  }

  private setPending(pending: boolean): void {
    if (pending === this.state.pending) return;
    this.state = { ...this.state, pending };
    this.options.onPendingChange?.(pending);
  }

  private pickOptions(
    options: PopconfirmControllerOptions<Event>,
  ): Omit<PopconfirmControllerOptions<Event>, 'open' | 'defaultOpen' | 'disabled'> {
    return {
      beforeConfirm: options.beforeConfirm,
      onOpenChange: options.onOpenChange,
      onPendingChange: options.onPendingChange,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
    };
  }

  private mergeOptions(options: PopconfirmControllerOptions<Event>): void {
    const names = [
      'beforeConfirm',
      'onOpenChange',
      'onPendingChange',
      'onConfirm',
      'onCancel',
    ] as const;
    for (const name of names) {
      if (Object.hasOwn(options, name)) this.options[name] = options[name] as never;
    }
  }
}
