import { default as Result } from './src/Result';
import { withInstall } from '@aurora/utils';
import './src/utils/types.d';

export const HResult = withInstall(Result);
export default HResult;
