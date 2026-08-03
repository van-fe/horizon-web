import { isEmpty } from '~/components/Select/src/utils/utils';
import type { ModelValueType } from './types';
import isEqualWith from 'lodash/isEqualWith';

/**
 * whether the two values are equal in loose mode
 * if the two values are in undefined / null / [], then judge them are equal
 */
export function isEqualLoose(value1: ModelValueType, value2: ModelValueType): boolean {
  if (isEmpty(value1) && isEmpty(value2)) return true;

  return isEqualWith(value1, value2, (a: any, b: any) => {
    // 如果两个值都是基本类型，尝试进行数字转换比较
    if (typeof a !== 'object' && typeof b !== 'object') {
      // 使用 == 来处理数字和字符串的比较
      // eslint-disable-next-line eqeqeq
      return a == b;
    }
    // 返回 undefined 让 isEqualWith 继续使用默认比较逻辑
    return undefined;
  });
}
