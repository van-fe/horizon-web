import { withInstall } from '@aurora/utils';
import LicensePlateInput from './src/LicensePlateInput';

export const HLicensePlateInput = withInstall(LicensePlateInput);
export {
  CHINA_LICENSE_PLATE_PROVINCES,
  getLicensePlateType,
  isValidLicensePlate,
  normalizeLicensePlate,
} from './src/utils';
export type { LicensePlateType } from './src/utils';
export type { LicensePlateValidationResult } from './src/composables/useExposes';
export default HLicensePlateInput;
