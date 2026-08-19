import { bodyScrollLock } from '@aurora/horizon-core';

export function useLockScroll(isModalVisible = true) {
  bodyScrollLock.update(isModalVisible);
}
