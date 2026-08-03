import En from './en';
import SvSE from './sv-SE';
import ZhCN from './zh-CN';
import ZhTW from './zh-TW';
import DE from './DE';
import AE from './AE';
import type { LocaleDateSpecialSetting } from '../../../config';
import { LocaleSupportLang } from '../../../config';

const dateSpecialConfig: Record<LocaleSupportLang, LocaleDateSpecialSetting> = {
  [LocaleSupportLang.En]: En,
  [LocaleSupportLang.EnGB]: En,
  [LocaleSupportLang.EnUS]: En,
  [LocaleSupportLang.SvSE]: SvSE,
  [LocaleSupportLang.ZhCN]: ZhCN,
  [LocaleSupportLang.ZhTW]: ZhTW,
  [LocaleSupportLang.AE]: AE,
  [LocaleSupportLang.SG]: En,
  [LocaleSupportLang.DE]: DE,
};

export default dateSpecialConfig;
