import type { ExtractMethodOptions } from '@aurora/utils';
import { defineMethod, usePopupContainerGetter, useZIndex } from '@aurora/utils';
import type { ExtractPropTypes, VNode } from 'vue';
import { createVNode, isVNode, render } from 'vue';
import HMessageComponent from './components/Message';
import type { MessageOriginOption } from './composables/useProps';
import { useMessageOptions } from './composables/useProps';
import {} from './composables/useExposes';

let seed = 1;
const messageOptions = {
  maxCount: Number.MAX_SAFE_INTEGER,
  duration: 3000,
};
const stdSpace = 20;
let instances: VNode[] = [];
let waitMessages: {
  vm: VNode;
  // opts: ExtractPropTypes<typeof useMessageOptions>;
  running: boolean;
}[] = [];

const processNext = async () => {
  const current = waitMessages[0];
  if (!current || current.running) return;
  current.running = true;

  const { vm } = current;
  const vmProps = vm.props!;

  let container: HTMLElement | null = document.createElement('div');
  container.className = `container_${vm.key as string}`;

  vmProps.offset = instances.reduce((prev, vm) => {
    return prev + (vm.el?.offsetHeight || 0);
  }, 0);

  if (instances.length >= 1) vmProps.offset += 32 + (instances.length - 1) * stdSpace;

  vmProps.offset += instances.length ? stdSpace : 32;

  vmProps.onOpen = () => {
    waitMessages = waitMessages.filter(item => item !== current);
    if (waitMessages.length > 0) processNext();
  };

  const _messageClose = vm.props?.onClose;
  vmProps.onClose = () => {
    close(vm.key as string);
    waitMessages = waitMessages.filter(item => item !== current);
    _messageClose?.();
  };

  vmProps.onDestroy = () => {
    if (container) {
      // render null remove the element directly
      render(null, container);
      container.remove();
      container = null;
    }
  };
  vm.props = vmProps;

  instances.push(vm);
  render(vm, container);
  let root = document.body;
  const popupContainerGetter = usePopupContainerGetter();
  if (popupContainerGetter.value) root = popupContainerGetter.value();
  root.appendChild(container);
};

const queueMessage = (vm: VNode) => {
  waitMessages = waitMessages.concat({ vm, running: false });
  processNext();
};

const createMessage = (
  options: string | Partial<ExtractMethodOptions<typeof useMessageOptions>>,
) => {
  if (messageOptions.maxCount > 0 && instances.length >= messageOptions.maxCount) {
    const vm = instances[0];
    vm.component!.exposed!.close();
  }

  let nextIndex: ReturnType<typeof useZIndex>['next'];
  let message: string | VNode;
  let onClose: ((vm: VNode) => void) | undefined;
  let verticalOffset = 0;
  let useHTMLString = false;
  let duration = messageOptions.duration;
  let showClose = false;
  let type: ExtractMethodOptions<typeof useMessageOptions>['type'] = 'info';

  if (typeof options == 'string') {
    message = options;
    nextIndex = useZIndex().next;
  } else {
    message = options.message ?? '';
    nextIndex = useZIndex(options.zIndex).next;
    onClose = options.onClose;
    verticalOffset = options.offset || 0;
    useHTMLString = options.useHTMLString ?? false;
    duration = options.duration ?? 3000;
    showClose = options.showClose ?? false;
    type = options.type ?? 'info';
  }

  const key = `message_${seed++}`;

  const opts: Partial<ExtractPropTypes<typeof useMessageOptions>> = {
    message,
    zIndex: nextIndex(),
    offset: verticalOffset,
    useHTMLString,
    duration,
    showClose,
    type,
  };

  const vm = createVNode(HMessageComponent, {
    ...opts,
    key,
    onClose: () => {
      onClose?.(vm);
    },
  });

  queueMessage(vm);

  return {
    close: () => {
      const exist = waitMessages.find(item => item.vm === vm);
      if (exist) {
        waitMessages = waitMessages.filter(item => item.vm !== vm);
      }
      vm.component!.exposed!.close();
    },
    vm,
  };
};

export function close(key: string, onClose?: (vm: VNode) => void): void {
  const idx = instances.findIndex(vm => key === vm.key);
  if (idx === -1) return;
  const curr = instances[idx];
  if (!curr) return;
  onClose?.(curr);
  const removedHeight = curr.el!.offsetHeight;
  instances = instances.filter(inst => inst !== curr);
  // adjust other instances vertical offset
  const len = instances.length;
  // if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const updatedVm = instances[i];
    updatedVm.component!.exposed!.update({
      offset: updatedVm.component!.exposed!.getOffset() - removedHeight - stdSpace,
    });
    // instances[i].component!.props.offset =
    //   parseInt(instances[i].el!.style['top'], 10) - removedHeight - stdSpace;
  }
}

export interface IMessageInstance {
  close: () => void;
  update: (
    options: Partial<
      ExtractMethodOptions<Pick<MessageOriginOption, 'message' | 'type' | 'duration'>>
    >,
  ) => void;
}

/**
 * success/warning/error/info 方法虽然可以提成一个公共方法
 * 但因为 api-generator 分析没有必要做到这么细致，所以需要铺开写出来
 * @en Success, warning, error, and info methods could share one implementation, but they are expanded for API documentation clarity
 */
const methods = {
  /**
   * 关闭所有消息
   * @en Closeallmessage
   */
  closeAll(): void {
    const len = instances.length;
    for (let i = len - 1; i >= 0; i--) {
      // instances[i].props!.onDestroy();
      const curr = instances[i];
      close(curr.key as string);
      curr.component!.exposed!.close();
    }
  },

  /**
   * 成功消息
   * @en Successmessage
   * @param options 提示的消息文字，或者 `MessageOriginOption` 选项
   * @paramEn options Message text or a MessageOriginOption object
   * @paramEn options Message的消息文字, 或者 MessageOriginOption 选项
   */
  success: (
    options: Partial<ExtractMethodOptions<string | MessageOriginOption>>,
  ): Pick<IMessageInstance, 'close'> => {
    if (typeof options == 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }

    return createMessage({
      ...options,
      type: 'success',
    });
  },

  /**
   * 警告消息
   * @en Warningmessage
   * @param options 提示的消息文字，或者 `MessageOriginOption` 选项
   * @paramEn options Message text or a MessageOriginOption object
   */
  warning: (
    options: Partial<ExtractMethodOptions<string | MessageOriginOption>>,
  ): Pick<IMessageInstance, 'close'> => {
    if (typeof options == 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }

    return createMessage({
      ...options,
      type: 'warning',
    });
  },

  /**
   * 错误消息
   * @en Errormessage
   * @param options 提示的消息文字，或者 `MessageOriginOption` 选项
   * @paramEn options Message text or a MessageOriginOption object
   */
  error: (
    options: Partial<ExtractMethodOptions<string | MessageOriginOption>>,
  ): Pick<IMessageInstance, 'close'> => {
    if (typeof options == 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }

    return createMessage({
      ...options,
      type: 'error',
    });
  },

  /**
   * 提示消息
   * @en Messagemessage
   * @param options 提示的消息文字，或者 `MessageOriginOption` 选项
   * @paramEn options Message text or a MessageOriginOption object
   */
  info: (
    options: Partial<ExtractMethodOptions<string | MessageOriginOption>>,
  ): Pick<IMessageInstance, 'close'> => {
    if (typeof options == 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }

    return createMessage({
      ...options,
      type: 'info',
    });
  },

  /**
   * 等待消息，可异步关闭
   * @en Show a pending message that can be closed asynchronously
   * @param options 提示的消息文字，或者 `MessageOriginOption` 选项
   */
  loading: (
    options: Partial<ExtractMethodOptions<string | MessageOriginOption>>,
  ): IMessageInstance => {
    if (typeof options == 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }
    const inst = createMessage({
      ...options,
      type: 'loading',
      duration: 0,
    });

    return {
      close: inst.close,
      update: (
        options: Partial<
          ExtractMethodOptions<Pick<MessageOriginOption, 'message' | 'type' | 'duration'>>
        >,
      ) => {
        inst.vm.component?.exposed?.update({
          message: options.message,
          type: options.type,
          duration: options.duration || messageOptions.duration,
        });
      },
    };
  },

  /**
   * 全局配置，可设置最大显示数
   * @en Configure global settings, including the maximum number of displayed messages
   * @param options Global message configuration
   * @paramEn options Global message configuration
   */
  config: (options: Partial<ExtractMethodOptions<{ maxCount: number; duration: number }>>) => {
    messageOptions.maxCount = options.maxCount ?? Number.MAX_SAFE_INTEGER;
    messageOptions.duration = options.duration ?? 3000;
  },
};

export default defineMethod({
  name: 'message',
  desc: '由用户的操作触发的轻量级全局反馈，具有即时、简短的特点',
  options: useMessageOptions,
  methods,
  default: createMessage,
});
