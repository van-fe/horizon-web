import Cascader from './src/Cascader';
import { withInstall } from '@nio-fe/shared';

export const NCascader = withInstall(Cascader);
export default NCascader;

export type {
  NCascaderOption,
  NCascaderExtendOption,
  NCascaderSearchParams,
  NCascaderFilterFunction,
  NCascaderDynamicLoadNode,
  NCascaderModelValueType,
} from './src/utils/types';
