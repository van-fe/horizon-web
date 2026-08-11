import Loading from './src';
import { withDirectiveInstall } from '@aurora/utils';

export { LoadingService } from './src/service';

export const HVLoading = withDirectiveInstall(Loading);

export default HVLoading;
