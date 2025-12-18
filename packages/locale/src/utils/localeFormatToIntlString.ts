import { LocaleSupportLang } from '../config';

export default {
  [LocaleSupportLang.En]: 'en',
  [LocaleSupportLang.EnGB]: 'en-GB',
  [LocaleSupportLang.EnUS]: 'en-US',
  [LocaleSupportLang.SvSE]: 'nb-NO',
  [LocaleSupportLang.ZhCN]: 'zh-Hans-CN',
  [LocaleSupportLang.ZhTW]: 'zh-Hant-TW',
  [LocaleSupportLang.AE]: 'ar-AE',
  [LocaleSupportLang.SG]: 'en-SG',
  [LocaleSupportLang.DE]: 'de-DE',
} satisfies Record<LocaleSupportLang, string>;
