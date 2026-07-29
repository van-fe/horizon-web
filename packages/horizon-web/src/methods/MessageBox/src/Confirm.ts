import type { VNode, AppContext } from 'vue';
import { createVNode, isVNode, render } from 'vue';
import type { MsgBoxAlertProps, MsgBoxConfirmProps } from './composables/useProps';
import ConfirmComponent from './components/Confirm';
import { defineMethod } from '@aurora/utils';
import { useMsgBoxConfirmProps } from './composables/useProps';

const Confirm = defineMethod({
  name: 'confirm',
  descLocales: { en: 'Display a confirmation dialog that interrupts the current task flow.' },
  desc: '用于信息提示或确认，会中断用户当前的任务流程。想避免对用户的干扰，可考虑 `Message` 等组件；如果想要更强的定制能力，请使用 `Dialog` 组件',
  options: useMsgBoxConfirmProps,
  default: (...args: Array<string | VNode | Partial<MsgBoxConfirmProps>>): Promise<() => void> => {
    let options: Partial<MsgBoxConfirmProps>;
    if (args.length === 1) {
      // 1. 传的 content, 2. 传的 options
      if (typeof args[0] === 'string' || isVNode(args[0])) {
        options = {
          content: args[0] as string | VNode,
        };
      } else {
        options = args[0];
      }
    } else if (args.length === 2) {
      // 1. 传的 content + options, 2. 传的 content + title
      if (typeof args[1] === 'string') {
        options = {
          content: args[0] as string | VNode,
          title: args[1],
        };
      } else {
        options = {
          content: args[0] as string | VNode,
          ...(args[1] as Omit<MsgBoxAlertProps, 'content'>),
        };
      }
    } else if (args.length === 3) {
      options = {
        content: args[0] as string | VNode,
        title: args[1] as string,
        ...(args[2] as Omit<MsgBoxAlertProps, 'content' | 'title'>),
      };
    } else {
      console.warn('Invalid params in $confirm!');
      return Promise.reject('Invalid params in $confirm!');
    }

    return new Promise((resolve, reject) => {
      let container: null | HTMLElement = document.createElement('div');

      function destroy() {
        if (container) {
          render(null, container);
          container?.remove();
          container = null;
        }
      }

      const vNode = createVNode(ConfirmComponent, {
        onConfirmClick: (close: () => void) =>
          resolve(() => {
            close();
            destroy();
          }),
        onClose: () => {
          reject();
          destroy();
        },
        ...options,
      });

      render(vNode, container);
      vNode.component?.exposed?.open();
    });
  },
});

export function ConfirmMethod(content: string | VNode): Promise<() => void>;
export function ConfirmMethod(
  content: string | VNode,
  options: Partial<MsgBoxConfirmProps>,
): Promise<() => void>;
export function ConfirmMethod(content: string | VNode, title: string): Promise<() => void>;
export function ConfirmMethod(
  content: string | VNode,
  title: string,
  options: Partial<MsgBoxConfirmProps>,
): Promise<() => void>;
export function ConfirmMethod(options: Partial<MsgBoxConfirmProps>): Promise<() => void>;
export function ConfirmMethod(...args: Array<string | VNode | Partial<MsgBoxConfirmProps>>) {
  Confirm._context = ConfirmMethod._context;
  return Confirm(...args);
}
ConfirmMethod._context = undefined as AppContext | undefined;
