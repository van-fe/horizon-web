import Loading from './src';
import { withDirectiveInstall } from '@aurora/utils';

export { LoadingService } from './src/service';

export const NVLoading = withDirectiveInstall(Loading);

export default NVLoading;
