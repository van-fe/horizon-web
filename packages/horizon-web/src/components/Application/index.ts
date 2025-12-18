import { default as Application } from './src/Application';
import { withInstall } from '@aurora/shared';

export const NApplication = withInstall(Application);

export default NApplication;
