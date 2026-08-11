import { computed, getCurrentScope, onScopeDispose, ref } from 'vue';
import type { Router } from 'vue-router';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ButtonAsyncActionGuard, getButtonState, resolveButtonAction } from '@aurora/core';
import type { ButtonEmits } from './useEmits';
import type { ButtonProps } from './useProps';

export function useButtonAction(
  props: ButtonProps,
  router: Router | undefined,
  emit: HorizonWebSetupContext<ButtonEmits>['emit'],
) {
  const guard = new ButtonAsyncActionGuard();
  let active = true;
  const pending = ref(false);
  const state = computed(() =>
    getButtonState({
      disabled: props.disabled,
      loading: props.loading,
      pending: pending.value,
      asyncState: props.debounceType,
    }),
  );

  async function runAsyncAction(): Promise<void> {
    pending.value = true;
    const result = await guard.run(props.debounceFn!);
    if (!active) return;
    pending.value = false;
    if (result.status === 'completed') emit('debounceFinished');
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      active = false;
    });
  }

  function onClick(event: MouseEvent): void {
    const action = resolveButtonAction({
      disabled: props.disabled,
      loading: props.loading,
      pending: pending.value,
      href: props.href,
      route: props.to,
      canNavigateRoute: Boolean(router),
      hasAsyncAction: Boolean(props.debounceFn),
    });

    if (action === 'blocked') return;
    if (props.to && !router) {
      console.warn(
        `You haven't import "vue-router". The props of 'to' and 'replace' will be ignored.`,
      );
    }
    if (action === 'href') {
      event.preventDefault();
      switch (props.target) {
        case '_blank':
          window.open(props.href);
          return;
        case '_self':
          location.href = props.href!;
          return;
        case '_parent':
          window.parent.open(props.href);
          return;
        case '_top':
          window.top?.open(props.href);
          return;
      }
    }
    if (action === 'route') {
      event.preventDefault();
      props.replace ? router!.replace(props.to!) : router!.push(props.to!);
      return;
    }
    if (action === 'async') {
      event.preventDefault();
      void runAsyncAction();
      return;
    }

    emit('click', event);
  }

  return { onClick, pending, state };
}
