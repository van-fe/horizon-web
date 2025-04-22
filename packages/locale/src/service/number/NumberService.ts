import { BaseService } from '../BaseService';
import type {
  LocaleNumberFormatterOptions,
  LocaleNumberLocaleDictionaries,
  LocaleNumberLocaleDictionary,
  LocaleNumberLocaleMethod,
  LocalOptionType,
} from '../../config';
import * as numberFormatDictionaries from './dictionaries';
import chunk from 'lodash/chunk';

export default class NumberService extends BaseService {
  public dictionaries: LocaleNumberLocaleDictionaries;

  public n: LocaleNumberLocaleMethod;

  constructor(options: LocalOptionType) {
    super(options);
    const { n, dictionaries } = options?.numberLocale || {};

    this.dictionaries =
      dictionaries || (numberFormatDictionaries as LocaleNumberLocaleDictionaries);

    this.n = n || this.defaultFormatter.bind(this);
  }

  public defaultFormatter(number: number, options?: LocaleNumberFormatterOptions): string {
    const currDictionary: LocaleNumberLocaleDictionary = this.dictionaries[this.current]!;
    // eslint-disable-next-line prefer-const
    let [integer, decimal] = NumberService.splitNumberToTwoParts(number);

    if (options?.minimumSignificantDigits && options.minimumSignificantDigits > 0) {
      if (decimal) {
        decimal.padEnd(options.minimumSignificantDigits - integer.length, '0');
      } else {
        decimal = '0'.repeat(options.minimumSignificantDigits - integer.length);
      }
    }

    if (options?.maximumSignificantDigits && options.maximumSignificantDigits > 0) {
      integer.padStart(options.maximumSignificantDigits - (decimal?.length || 0), '0');
    }

    let finalInteger = NumberService.chunkInteger(
      integer,
      currDictionary.segmentsDigits,
      currDictionary.segmentsBy,
    );
    let finalDecimal = decimal || '';

    if (options?.minimumIntegerDigits && options.minimumIntegerDigits > 0) {
      finalInteger.padStart(options.minimumIntegerDigits, '0');
    }

    if (options?.minimumFractionDigits && options.minimumFractionDigits > 0) {
      finalDecimal.padEnd(options.minimumFractionDigits, '0');
    }

    if (options?.maximumFractionDigits && options.maximumFractionDigits >= 0) {
      finalDecimal = Number(finalDecimal).toFixed(options.maximumFractionDigits);
    }

    if (options?.currency) {
      if (currDictionary.currency.isPrefix) {
        finalInteger =
          currDictionary.currency.unit +
          (currDictionary.currency.hasSpace ? ' ' : '') +
          finalInteger;
      }

      if (currDictionary.currency.isSuffix) {
        finalDecimal +=
          (currDictionary.currency.hasSpace ? ' ' : '') + currDictionary.currency.unit;
      }
    }

    return finalInteger + (finalDecimal && currDictionary.decimalSegmentsBy + finalDecimal);
  }

  private static splitNumberToTwoParts(number: number): [string, string | undefined] {
    return number.toString().split('.') as [string, string | undefined];
  }

  private static chunkInteger(integer: string, chunkIn: number, splitStr: string): string {
    const arr = integer.split('');
    return chunk(arr.reverse(), chunkIn)
      .reverse()
      .map(chunk => chunk.reverse().join(''))
      .join(splitStr);
  }
}
