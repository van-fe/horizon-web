import Loading from './src';
import { withDirectiveInstall } from '@aurora/shared';

export { LoadingService } from './src/service';

export const NVLoading = withDirectiveInstall(Loading);

export default NVLoading;
