import { createButtonAction } from '@aurora/core';
import type { ButtonAsyncResult } from '@aurora/core';
import { useEffect, useState, useSyncExternalStore } from 'react';

export interface ReactButtonActionBinding {
  pending: boolean;
  run(action: () => unknown | PromiseLike<unknown>): Promise<ButtonAsyncResult>;
}

export function useButtonAction(): ReactButtonActionBinding {
  const [controller] = useState(createButtonAction);
  const pending = useSyncExternalStore(
    controller.subscribe,
    () => controller.getState().pending,
    () => false,
  );

  useEffect(() => {
    controller.activate();
    return () => controller.destroy();
  }, [controller]);

  return {
    pending,
    run: controller.run,
  };
}
