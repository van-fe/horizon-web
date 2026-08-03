import type { App, ComponentPublicInstance, ObjectEmitsOptions } from 'vue';
import { createApp } from 'vue';
import UploadBackground from '../components/UploadBackground';
import type { UploadProps } from '../composables/useProps';
import { isObject } from '@aurora/utils';
import { error } from '~/utils/useLog';
import type { UploadBackgroundExposes } from '../composables/useExposes';
import type { UploadBackgroundEmits } from '../composables/useEmits';

const containers: HTMLDivElement[] = [];
const apps: App[] = [];
const instances: ComponentPublicInstance<{}, {}, {}, {}, UploadBackgroundExposes>[] = [];

declare global {
  interface WindowEventMap {
    backgroundUploadDestroy: CustomEvent<string | undefined>;
    backgroundUploadVisibleChanged: CustomEvent<{ visible: boolean; id: string | undefined }>;
    switchBackgroundUploadVisible: CustomEvent<{ visible: boolean; id: string | undefined }>;
  }
}

export function destroyBackgroundUploadInstance(id: string | undefined, index: number | null) {
  if (instances.length && containers.length) {
    const removedContainer = containers.splice(index ?? -1, 1);
    const removedApp = apps.splice(index ?? -1, 1);

    removedApp[0]?.unmount();
    removedContainer[0].parentElement?.removeChild(removedContainer[0]);

    window.dispatchEvent(
      new CustomEvent('backgroundUploadDestroy', {
        detail: id,
      }),
    );
  }
}

type EmitToPropsSimple<T extends ObjectEmitsOptions> = {
  [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
    ? T[Uncapitalize<C>] extends null
      ? (...args: any[]) => any
      : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any
    : never;
};

export function createBackgroundUploadInstance(
  props: Partial<UploadProps>,
  eventListener?: EmitToPropsSimple<UploadBackgroundEmits>,
) {
  if (!instances.length || props.backgroundStandalone) {
    apps.push(
      createApp(UploadBackground, {
        id: props.id,
        style: props.backgroundStyle,
        class: props.backgroundClass,
        uploadProps: props,
        ...eventListener,
        onDestroy: () => destroyBackgroundUploadInstance(props.id, instances.length - 1),
        onVisibleSwitched: (visible: boolean) => {
          window.dispatchEvent(
            new CustomEvent('backgroundUploadVisibleSwitched', {
              detail: {
                visible,
                id: props.id,
              },
            }),
          );
        },
      }),
    );

    const container = document.createElement('div');
    container.setAttribute('data-id', props.id ?? '');

    containers.push(container);

    instances.push(
      apps.at(-1)!.mount(containers.at(-1)!) as ComponentPublicInstance<
        {},
        {},
        {},
        {},
        UploadBackgroundExposes
      >,
    );

    let target: HTMLElement | null;

    if (isObject(props.backgroundTeleportTo)) {
      target = props.backgroundTeleportTo;
    } else {
      target = document.querySelector(props.backgroundTeleportTo || 'body');
    }

    if (!target) {
      error(
        'upload',
        `The backgroundTeleportTo: (${props.backgroundTeleportTo || 'body'}) cannot be found.`,
      );
      target = document.body;
    }

    target.appendChild(containers.at(-1)!.lastElementChild!);

    window.addEventListener('switchBackgroundUploadVisible', evt => {
      let target;

      if (evt.detail.id) {
        const index = containers.findIndex(con => con.getAttribute('data-id') === evt.detail.id);

        if (index >= 0) {
          target = instances.at(index);
        }
      }

      if (!target) {
        target = instances.at(-1);
      }

      target?.switchVisible(evt.detail.visible);
    });
  }

  return {
    instance: instances.at(-1)!,
    index: containers.length - 1,
  };
}
