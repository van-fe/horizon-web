import Cascader from './src/Cascader';
import { withInstall } from '@aurora/utils';

export const HCascader = withInstall(Cascader);
export default HCascader;

export type {
  HCascaderOption,
  HCascaderExtendOption,
  HCascaderSearchParams,
  HCascaderFilterFunction,
  HCascaderDynamicLoadNode,
  HCascaderModelValueType,
} from './src/utils/types';
