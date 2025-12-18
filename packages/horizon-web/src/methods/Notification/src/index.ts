import type { AppContext, VNode } from 'vue';
import { computed, createVNode, isVNode, nextTick, render, watch } from 'vue';
import Notification from './components/Notification';
import type { Action, PlacementType, NotificationProps } from './composables/useProps';
import { useNotificationProps } from './composables/useProps';
import { defineMethod, useZIndex } from '@aurora/shared';

const instances: Record<PlacementType, VNode[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
};

let amount = 1;
const OFFSET = 32;
const GAP = 32;

export const NotifyFunctions = {
  /**
   * 关闭当前 `Notification`
   * @param id 给定的 `Notification.id`
   * @param placement
   */
  close: (id: string, placement: PlacementType): void => {
    const placementInstances = instances[placement];
    const index = placementInstances.findIndex(vNode => vNode.component?.props?.id === id);

    if (index < 0) return;

    const vNode = placementInstances[index];
    if (!vNode) return;
    vNode.component?.exposed?.clearTimer();

    placementInstances.splice(index, 1);
    const current: any = vNode.component?.refs.notification;
    const removedHeight = current!.offsetHeight + (vNode.component?.props.gap || GAP);
    const cssAttr = placement.split('-')[0];
    current?.remove();

    const len = placementInstances.length;

    if (len < 1) return;
    for (let i = index; i < len; i++) {
      const next: any = placementInstances[i].component;

      next!.props.offset = parseInt(next?.refs.notification!.style[cssAttr], 10) - removedHeight;
    }
  },
  /**
   * 关闭所有 `Notification`
   */
  closeAll() {
    for (const list of Object.values(instances)) {
      for (let i = list.length - 1; i >= 0; i--) {
        list[i]!.component!.exposed!.close();
      }
    }
  },
};

async function handleInstancesOffset(vNode: VNode) {
  const changePlacement = vNode.component!.props.placement;
  const placementList = instances[changePlacement as PlacementType];
  const len = placementList.length;
  if (len < 1) {
    return;
  }

  let nextOffset = placementList[0].component!.props.offset || OFFSET;

  for (let index = 0; index < len; index++) {
    const current = placementList[index];
    await nextTick();

    const nextGap = current.component?.props.gap || GAP;
    const notification: any = current.component?.refs?.notification;

    nextOffset += (notification?.offsetHeight || 0) + nextGap;
    if (index < len - 1) {
      placementList[index + 1].component!.props.offset = nextOffset;
    }
  }
}

const Notify = defineMethod({
  name: 'Notify',
  desc: '全局展示通知提醒，悬浮出现在页面角落，将信息及时有效的传达给用户。更偏向系统本身的通知，大多数与用户操作无关',
  options: useNotificationProps,
  methods: NotifyFunctions,
  async default(...args: Array<string | Partial<NotificationProps>>) {
    let options: Partial<NotificationProps>;

    if (args.length === 1) {
      // 1. 传content, 2. 传options
      if (typeof args[0] === 'string' || isVNode(args[0])) {
        options = {
          content: args[0],
        };
      } else {
        options = args[0];
      }
    } else if (args.length === 2) {
      // 1. 传content + options, 2. 传content + title
      if (typeof args[1] === 'string') {
        options = {
          title: args[1],
          content: args[0] as string,
        };
      } else {
        options = {
          content: args[0] as string,
          ...(args[1] as Omit<NotificationProps, 'content'>),
        };
      }
    } else if (args.length === 3) {
      options = {
        content: args[0] as string,
        title: args[1] as string,
        ...(args[2] as Omit<NotificationProps, 'content' | 'title'>),
      };
    } else {
      console.warn('Invalid params in $notify!');
      return Promise.reject('Invalid params in $notify!');
    }

    const notifyContent = computed(() => {
      return typeof options.content === 'function' ? options.content() : options.content;
    });
    const placement = options.placement || 'top-right';
    let nextOffset = options.offset || OFFSET;
    const nextGap = options.gap || GAP;

    for (const current of instances[placement]) {
      await nextTick();
      const notification: any = current.component?.refs?.notification;
      nextOffset += (notification.offsetHeight || 0) + (current.component?.props.gap || GAP);
    }

    const { next } = useZIndex(options.zIndex);
    const id = `n-notification_${amount++}`;

    const watchStop = watch(
      () => notifyContent.value,
      () => {
        handleInstancesOffset(vNode);
      },
    );

    let container: null | HTMLElement = document.createElement('div');

    function destroy() {
      if (container) {
        render(null, container);
        container?.remove();
        container = null;
        watchStop();
      }
    }

    const vNode: VNode = createVNode(
      Notification,
      {
        zIndex: next(),
        ...options,
        offset: nextOffset,
        gap: nextGap,
        id,
        onAction: (action: Action) => {
          options.callback?.(action, instance);
          NotifyFunctions.close(id, placement);
          void nextTick(() => {
            destroy();
          });
        },
      },
      isVNode(options.content) ? { default: () => options.content } : null,
    );

    render(vNode, container);
    instances[placement].push(vNode);

    const instance: typeof NotifyFunctions = {
      close: NotifyFunctions.close.bind(this, id, placement),
      closeAll: NotifyFunctions.closeAll,
    };

    return Promise.resolve(instance);
  },
});

export async function NotifyMethod(
  content: string,
  options: Partial<NotificationProps>,
): Promise<ReturnType<typeof Notify>>;
export async function NotifyMethod(
  content: string,
  title: string,
): Promise<ReturnType<typeof Notify>>;
export async function NotifyMethod(
  content: string,
  title: string,
  options: Partial<NotificationProps>,
): Promise<ReturnType<typeof Notify>>;
export async function NotifyMethod(
  options: Partial<NotificationProps>,
): Promise<ReturnType<typeof Notify>>;
export async function NotifyMethod(
  ...args: Array<string | Partial<NotificationProps>>
): Promise<ReturnType<typeof Notify>> {
  Notify._context = NotifyMethod._context;
  return Notify(...args);
}

NotifyMethod.close = NotifyFunctions.close;
NotifyMethod.closeAll = NotifyFunctions.closeAll;
NotifyMethod._context = undefined as AppContext | undefined;
