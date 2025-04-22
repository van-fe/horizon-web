import type { LoadingOptions } from '../src/composables/useOptions';
import type { DOMWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NVLoading from '../index';
import type { Ref, VNode } from 'vue';
import { isRef, nextTick } from 'vue';

type TransformPropsToRefValue<
  T,
  Key extends keyof T = T extends object ? keyof T : never,
> = T extends object ? { [K in Key]: T[K] | Ref<T[K]> } : T;

export async function createInstance(
  params: TransformPropsToRefValue<LoadingOptions>,
  defaultSlot: VNode | JSX.Element | string | Ref<string>,
) {
  const wrapper = mount(
    () => (
      <div v-loading={params} class="wrapper" style="width: 300px; height: 300px;">
        {isRef(defaultSlot) ? defaultSlot.value : defaultSlot}
      </div>
    ),
    {
      attachTo: document.body,
      global: {
        directives: {
          [NVLoading.name]: NVLoading,
        },
      },
    },
  );

  await nextTick();

  function getLoadingDom() {
    return wrapper.find('.n-loading') as DOMWrapper<HTMLElement>;
  }

  return {
    wrapper,
    getLoadingDom,
  };
}
