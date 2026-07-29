import { defineMethod } from '@aurora/utils';
import type { MsgBoxAlertProps } from './composables/useProps';
import { useMsgBoxAlertProps } from './composables/useProps';
import type { VNode, AppContext } from 'vue';
import { createVNode, isVNode, render } from 'vue';
import AlertComponent from './components/Alert';

const Alert = defineMethod({
  name: 'alert',
  descLocales: { en: 'Display an alert dialog for information or confirmation.' },
  desc: '用于信息提示或确认，会中断用户当前的任务流程。想避免对用户的干扰，可考虑 `Message` 等组件；如果想要更强的定制能力，请使用 `Dialog` 组件',
  options: useMsgBoxAlertProps,
  default(...args: Array<string | VNode | Partial<MsgBoxAlertProps>>) {
    let options: Partial<MsgBoxAlertProps>;
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
          content: args[0] as string,
          title: args[1],
        };
      } else {
        options = {
          content: args[0] as string,
          ...(args[1] as Omit<MsgBoxAlertProps, 'content'>),
        };
      }
    } else if (args.length === 3) {
      options = {
        content: args[0] as string,
        title: args[1] as string,
        ...(args[2] as Omit<MsgBoxAlertProps, 'content' | 'title'>),
      };
    } else {
      console.warn('Invalid params in $alert!');
      return Promise.reject('Invalid params in $alert!');
    }

    return new Promise((resolve: Function, reject: Function) => {
      let container: null | HTMLElement = document.createElement('div');

      function destroy() {
        if (container) {
          render(null, container);
          container?.remove();
          container = null;
        }
      }

      const vNode = createVNode(AlertComponent, {
        onConfirmClick: () => {
          resolve();
          destroy();
        },
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

export function AlertMethod(content: string | VNode): Promise<void>;
export function AlertMethod(
  content: string | VNode,
  options: Partial<MsgBoxAlertProps>,
): Promise<void>;
export function AlertMethod(content: string | VNode, title: string): Promise<void>;
export function AlertMethod(
  content: string | VNode,
  title: string,
  options: Partial<MsgBoxAlertProps>,
): Promise<void>;
export function AlertMethod(options: Partial<MsgBoxAlertProps>): Promise<void>;
export function AlertMethod(...args: Array<string | VNode | Partial<MsgBoxAlertProps>>) {
  Alert._context = AlertMethod._context;
  return Alert(...args);
}
AlertMethod._context = undefined as AppContext | undefined;
