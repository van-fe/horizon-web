import En from './en';
import SvSE from './sv-SE';
import ZhCN from './zh-CN';
import ZhTW from './zh-TW';
import DE from './DE';
import AE from './AE';
import type { LocaleDateSpecialSetting } from '../../../config';
import { LocaleSupportLangV2 } from '../../../config';

const dateSpecialConfig: Record<LocaleSupportLangV2, LocaleDateSpecialSetting> = {
  [LocaleSupportLangV2.En]: En,
  [LocaleSupportLangV2.EnGB]: En,
  [LocaleSupportLangV2.EnUS]: En,
  [LocaleSupportLangV2.SvSE]: SvSE,
  [LocaleSupportLangV2.ZhCN]: ZhCN,
  [LocaleSupportLangV2.ZhTW]: ZhTW,
  [LocaleSupportLangV2.AE]: AE,
  [LocaleSupportLangV2.SG]: En,
  [LocaleSupportLangV2.DE]: DE,
};

export default dateSpecialConfig;
