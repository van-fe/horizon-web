import { bodyScrollLock } from '@aurora/horizon-web-core';

export function useLockScroll(isModalVisible = true) {
  bodyScrollLock.update(isModalVisible);
}
