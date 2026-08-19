export const CHINA_LICENSE_PLATE_PROVINCES = [
  '京',
  '津',
  '沪',
  '渝',
  '冀',
  '豫',
  '云',
  '辽',
  '黑',
  '湘',
  '皖',
  '鲁',
  '新',
  '苏',
  '浙',
  '赣',
  '鄂',
  '桂',
  '甘',
  '晋',
  '蒙',
  '陕',
  '吉',
  '闽',
  '贵',
  '粤',
  '青',
  '藏',
  '川',
  '宁',
  '琼',
] as const;

export type LicensePlateType = 'empty' | 'incomplete' | 'standard' | 'new-energy' | 'invalid';

const PROVINCE_PATTERN = CHINA_LICENSE_PLATE_PROVINCES.join('');
const CITY_CODE_PATTERN = '[A-HJ-NP-Z]';
const SERIAL_PATTERN = '[A-HJ-NP-Z0-9]';
const STANDARD_PATTERN = new RegExp(
  `^[${PROVINCE_PATTERN}]${CITY_CODE_PATTERN}${SERIAL_PATTERN}{4}[A-HJ-NP-Z0-9挂学警港澳]$`,
);
const NEW_ENERGY_PATTERN = new RegExp(
  `^[${PROVINCE_PATTERN}]${CITY_CODE_PATTERN}(?:[DF]${SERIAL_PATTERN}[0-9]{4}|[0-9]{5}[DF])$`,
);

/**
 * 规范化车牌号：移除空白和常见分隔符，并将拉丁字母转为大写
 * @param value 待规范化的车牌号
 * @paramEn value License plate value to normalize.
 * @en Normalize a license plate by removing common separators and uppercasing Latin letters.
 */
export function normalizeLicensePlate(value: string) {
  return value.replace(/[\s\-_·•.]/g, '').toUpperCase();
}

/**
 * 识别中国大陆普通或新能源车牌号的当前状态
 * @param value 车牌号
 * @paramEn value License plate value to inspect.
 * @en Identify the current state of a mainland China standard or new-energy license plate.
 */
export function getLicensePlateType(value: string): LicensePlateType {
  const normalized = normalizeLicensePlate(value);
  if (!normalized) return 'empty';
  if (STANDARD_PATTERN.test(normalized)) return 'standard';
  if (NEW_ENERGY_PATTERN.test(normalized)) return 'new-energy';
  if (normalized.length < 7) return 'incomplete';
  return 'invalid';
}

/**
 * 校验中国大陆普通或新能源车牌号
 * @param value 车牌号
 * @paramEn value License plate value to validate.
 * @en Validate a mainland China standard or new-energy license plate.
 */
export function isValidLicensePlate(value: string) {
  const type = getLicensePlateType(value);
  return type === 'standard' || type === 'new-energy';
}
