import * as DefaultDictionaries from './dictionaries';
import { BaseService } from '../BaseService';
import DefaultSpecialConfig from './specialConfig';
import type {
  DateLocaleAvailableFormattingType,
  DateLocaleAvailableShownType,
  LocaleDateFormatOptions,
  LocaleDateLocaleMethod,
  LocalOptionType,
  PartialLocaleDateFormatDictionaries,
  PartialLocaleDateFormatSettings,
  PartialLocaleDateSpecialSettings,
} from '../../config';
import * as DefaultFormatSetting from './formatSetting';
import dayjs from '../../utils/dayjs';
import localeFormatToDayjsString from '../../utils/localeFormatToDayjsString';

export default class DateService extends BaseService {
  public dictionaries: PartialLocaleDateFormatDictionaries;

  public formatSetting: PartialLocaleDateFormatSettings;

  public specialSetting: PartialLocaleDateSpecialSettings;

  public d: LocaleDateLocaleMethod;

  constructor(options: LocalOptionType) {
    super(options);
    const { d, dictionaries, dateFormattingSetting, dateSpecialConfig } = options?.dateLocale || {};

    this.dictionaries =
      dictionaries || (DefaultDictionaries as PartialLocaleDateFormatDictionaries);
    this.formatSetting = dateFormattingSetting || DefaultFormatSetting;
    this.specialSetting = dateSpecialConfig || DefaultSpecialConfig;

    this.d = d || this.defaultFormatter.bind(this);
  }

  public defaultFormatter(
    date: Date | string | number,
    dateType: DateLocaleAvailableShownType,
    current = this.current,
  ): string {
    const currDictionary: LocaleDateFormatOptions = this.dictionaries[current]![dateType];
    const formatSetting = this.formatSetting[current]!;
    const specialSetting = this.specialSetting[current]!;
    const dateTimeTemplateGroup = [
      specialSetting.date.split('|'),
      specialSetting.dateSuffix.split('|'),
      specialSetting.time.split('|'),
      specialSetting.timeSuffix.split('|'),
    ];
    const dateTimeFinalGroupTarget = dateTimeTemplateGroup.map(group =>
      new Array(group.length).fill(''),
    );

    const splitSymbols = [
      specialSetting.dateSplit,
      specialSetting.dateSuffixSplit,
      specialSetting.timeSplit,
      specialSetting.timeSuffixSplit,
    ];

    Object.entries(currDictionary).forEach(([type, value]) => {
      dateTimeTemplateGroup.forEach((group, groupIndex) => {
        const itemIndex = group.indexOf(type);
        if (itemIndex >= 0) {
          dateTimeFinalGroupTarget[groupIndex][itemIndex] =
            formatSetting[type as keyof LocaleDateFormatOptions][
              value as DateLocaleAvailableFormattingType
            ];
        }
      });
    });

    const currFormat = dateTimeFinalGroupTarget
      .map((group, index) => group.filter(value => value).join(splitSymbols[index]))
      .join(' ');

    dayjs.locale(localeFormatToDayjsString[current]);

    return dayjs(date).format(currFormat);
  }
}
