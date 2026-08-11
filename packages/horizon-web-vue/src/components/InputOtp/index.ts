import InputOtp from './src/InputOtp';
import { withInstall } from '@aurora/utils';

export type { InputOtpProps, InputOtpSize, InputOtpType } from './src/composables/useProps';

export const HInputOtp = withInstall(InputOtp);
export default HInputOtp;
