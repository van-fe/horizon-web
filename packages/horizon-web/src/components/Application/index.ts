import { default as Application } from './src/Application';
import { withInstall } from '@aurora/utils';

export const HApplication = withInstall(Application);

export default HApplication;
