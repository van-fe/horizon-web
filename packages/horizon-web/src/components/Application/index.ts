import { default as Application } from './src/Application';
import { withInstall } from '@aurora/utils';

export const HApplication = withInstall(Application);

export {
  HApplicationContextInjectedKey,
  useHApplicationContext,
} from './src/applicationContext';
export type { HApplicationContext } from './src/applicationContext';

export default HApplication;
