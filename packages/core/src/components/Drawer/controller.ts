import { DialogController, type DialogControllerOptions } from '../Dialog';
import type { DrawerBeforeClose } from './contract';

export type DrawerControllerOptions = Omit<
  DialogControllerOptions,
  'beforeClose' | 'closeGuardMode'
> & {
  /** 返回值式关闭守卫。 @en Result-style close guard. */
  beforeClose?: DrawerBeforeClose;
};

/**
 * 使用返回值式关闭守卫的 Drawer 开关控制器。
 * @en Drawer open-state controller configured for result-style close guards.
 */
export class DrawerController extends DialogController {
  constructor(options: DrawerControllerOptions = {}) {
    super({ ...options, closeGuardMode: 'result' });
  }
}
