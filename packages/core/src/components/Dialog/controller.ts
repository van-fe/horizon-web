import type {
  DialogClose,
  DialogOpenChangeDetails,
  DialogOpenReason,
  DialogState,
} from './contract';
import { resolveDialogOpenState } from './contract';

export type DialogCloseRequestStatus = 'closed' | 'pending' | 'ignored';
export type DialogCloseGuardMode = 'callback' | 'result';
export type DialogCloseGuard = (close: DialogClose) => void | boolean | PromiseLike<boolean | void>;

export interface DialogControllerOptions {
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 关闭守卫。 @en Close guard. */
  beforeClose?: DialogCloseGuard;
  /** 守卫授权协议。 @en Guard authorization protocol. */
  closeGuardMode?: DialogCloseGuardMode;
  /** 打开状态变化回调。 @en Open-state change callback. */
  onOpenChange?: (open: boolean, details: DialogOpenChangeDetails) => void;
  /** 关闭守卫等待状态变化回调。 @en Close-guard pending change callback. */
  onClosePendingChange?: (pending: boolean) => void;
}

/**
 * 框架无关的 Dialog 打开状态与回调式关闭守卫控制器。
 * @en Framework-neutral controller for Dialog open state and callback-style close guards.
 */
export class DialogController {
  private state: DialogState;
  private controlled: boolean;
  private beforeClose?: DialogCloseGuard;
  private closeGuardMode: DialogCloseGuardMode;
  private onOpenChange?: DialogControllerOptions['onOpenChange'];
  private onClosePendingChange?: DialogControllerOptions['onClosePendingChange'];
  private closeOperation = 0;

  constructor(options: DialogControllerOptions = {}) {
    this.controlled = options.open !== undefined;
    this.state = {
      open: options.open ?? options.defaultOpen ?? false,
      closePending: false,
    };
    this.beforeClose = options.beforeClose;
    this.closeGuardMode = options.closeGuardMode ?? 'callback';
    this.onOpenChange = options.onOpenChange;
    this.onClosePendingChange = options.onClosePendingChange;
  }

  public get snapshot(): Readonly<DialogState> {
    return this.state;
  }

  /**
   * 更新动态选项，并在传入 open 时同步受控状态。
   * @en Updates dynamic options and synchronizes controlled state when open is supplied.
   * @param options 新选项。
   * @paramEn options New options.
   */
  public setOptions(options: DialogControllerOptions): void {
    if (Object.hasOwn(options, 'beforeClose')) this.beforeClose = options.beforeClose;
    if (options.closeGuardMode !== undefined) this.closeGuardMode = options.closeGuardMode;
    if (Object.hasOwn(options, 'onOpenChange')) this.onOpenChange = options.onOpenChange;
    if (Object.hasOwn(options, 'onClosePendingChange')) {
      this.onClosePendingChange = options.onClosePendingChange;
    }
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
    if (open === this.state.open) return;
    this.invalidateCloseRequest();
    this.state = { open, closePending: false };
  }

  /**
   * 请求打开对话框，并使尚未完成的关闭守卫失效。
   * @en Requests opening the dialog and invalidates an unfinished close guard.
   * @param reason 打开原因。
   * @paramEn reason Open reason.
   */
  public requestOpen(reason: DialogOpenReason = 'imperative'): boolean {
    this.invalidateCloseRequest();
    return this.commitOpenState(true, reason);
  }

  /**
   * 请求关闭浮层，并按配置的守卫协议等待授权。
   * @en Requests closing the overlay and waits for the configured guard protocol.
   * @param reason 关闭原因。
   * @paramEn reason Close reason.
   */
  public requestClose(reason: DialogOpenReason = 'imperative'): DialogCloseRequestStatus {
    if (!this.state.open || this.state.closePending) return 'ignored';
    if (!this.beforeClose) {
      this.commitOpenState(false, reason);
      return 'closed';
    }

    const operation = ++this.closeOperation;
    let authorized = false;
    this.setClosePending(true);
    const close = () => {
      if (operation !== this.closeOperation) return;
      this.closeOperation += 1;
      authorized = true;
      this.setClosePending(false);
      this.commitOpenState(false, reason);
    };

    try {
      const result = this.beforeClose(close);
      if (authorized || this.closeGuardMode === 'callback') {
        return authorized ? 'closed' : 'pending';
      }
      if (isPromiseLike(result)) {
        Promise.resolve(result).then(
          value => {
            if (operation !== this.closeOperation) return;
            if (value === false) this.preventCloseRequest(operation);
            else close();
          },
          () => this.preventCloseRequest(operation),
        );
        return 'pending';
      }
      if (result === false) {
        this.preventCloseRequest(operation);
        return 'ignored';
      }
      close();
      return 'closed';
    } catch (error) {
      if (operation === this.closeOperation) {
        this.preventCloseRequest(operation);
      }
      if (this.closeGuardMode === 'result') return 'ignored';
      throw error;
    }
  }

  /**
   * 取消尚未授权的关闭请求。
   * @en Cancels a close request that has not been authorized.
   */
  public cancelCloseRequest(): boolean {
    if (!this.state.closePending) return false;
    this.invalidateCloseRequest();
    return true;
  }

  private commitOpenState(open: boolean, reason: DialogOpenReason): boolean {
    const result = resolveDialogOpenState(this.state, { open, reason });
    if (!result.changed) return false;
    if (!this.controlled) this.state = result.state;
    else if (this.state.closePending) this.state = { ...this.state, closePending: false };
    this.onOpenChange?.(open, { reason });
    return true;
  }

  private invalidateCloseRequest(): void {
    this.closeOperation += 1;
    this.setClosePending(false);
  }

  private preventCloseRequest(operation: number): void {
    if (operation !== this.closeOperation) return;
    this.closeOperation += 1;
    this.setClosePending(false);
  }

  private setClosePending(closePending: boolean): void {
    if (closePending === this.state.closePending) return;
    this.state = { ...this.state, closePending };
    this.onClosePendingChange?.(closePending);
  }
}

function isPromiseLike(value: unknown): value is PromiseLike<boolean | void> {
  return (
    (typeof value === 'object' || typeof value === 'function') &&
    value !== null &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  );
}
