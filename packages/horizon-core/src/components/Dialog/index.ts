import type { FocusScope, FocusScopeOptions } from '../Tooltip';
import { createDismissableLayer, createFocusScope } from '../Tooltip';
import { bodyScrollLock } from '../../utils';

export type DialogDismissReason = 'escape' | 'outside-pointer';

export interface DialogInteractionLayerOptions extends FocusScopeOptions {
  /** 激活时锁定文档滚动。 @en Locks document scrolling while active. */
  lockScroll?: boolean;
  /** Escape 是否请求关闭。 @en Whether Escape requests dismissal. */
  dismissOnEscape?: boolean;
  /** 外部指针是否请求关闭。 @en Whether outside pointer interaction requests dismissal. */
  dismissOnOutsidePointer?: boolean;
  /** 关闭请求。 @en Dismissal request callback. */
  onDismiss?: (reason: DialogDismissReason) => void;
}

export interface DialogInteractionLayer {
  /** 激活焦点约束与滚动锁。 @en Activates focus containment and scroll locking. */
  activate(): void;
  /** 释放焦点约束与滚动锁。 @en Releases focus containment and scroll locking. */
  deactivate(): void;
}

interface DialogFocusLayer {
  scope: FocusScope;
}

const dialogFocusStacks = new WeakMap<Document, DialogFocusLayer[]>();

function getDialogFocusStack(ownerDocument: Document): DialogFocusLayer[] {
  const current = dialogFocusStacks.get(ownerDocument);
  if (current) return current;
  const stack: DialogFocusLayer[] = [];
  dialogFocusStacks.set(ownerDocument, stack);
  return stack;
}

/**
 * 创建 Dialog 的浏览器交互层，统一焦点陷阱、焦点回归和多实例滚动锁。
 * @en Creates the browser interaction layer shared by Dialog renderers.
 */
export function createDialogInteractionLayer(
  dialog: HTMLElement,
  options: DialogInteractionLayerOptions = {},
): DialogInteractionLayer {
  const focusScope: FocusScope = createFocusScope(dialog, {
    initialFocus: options.initialFocus,
    restoreFocus: options.restoreFocus,
    trap: options.trap,
  });
  const focusLayer: DialogFocusLayer = { scope: focusScope };
  const focusStack = getDialogFocusStack(dialog.ownerDocument);
  let active = false;
  let cleanupDismissable: (() => void) | undefined;

  return {
    activate() {
      if (active) return;
      active = true;
      if (options.lockScroll !== false) bodyScrollLock.update(true, dialog.ownerDocument);
      focusStack.at(-1)?.scope.pause();
      focusStack.push(focusLayer);
      focusScope.activate();
      if (options.onDismiss) {
        const dismissableLayer = createDismissableLayer({
          node: dialog,
          dismissOnEscape: options.dismissOnEscape,
          dismissOnOutsidePointer: options.dismissOnOutsidePointer,
          onDismiss: options.onDismiss,
        });
        cleanupDismissable = () => dismissableLayer.destroy();
      }
    },
    deactivate() {
      if (!active) return;
      active = false;
      cleanupDismissable?.();
      cleanupDismissable = undefined;
      const focusIndex = focusStack.indexOf(focusLayer);
      const wasTopFocusLayer = focusIndex === focusStack.length - 1;
      if (focusIndex >= 0) focusStack.splice(focusIndex, 1);
      focusScope.deactivate();
      if (wasTopFocusLayer) focusStack.at(-1)?.scope.resume();
      if (options.lockScroll !== false) bodyScrollLock.update(false, dialog.ownerDocument);
    },
  };
}
