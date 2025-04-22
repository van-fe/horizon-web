import { snakeCase, isObject } from '@nio-fe/shared';

export function objectTransformSnakeCaseKey(object: Object): Object {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      snakeCase(key),
      isObject(value) ? objectTransformSnakeCaseKey(value) : value,
    ]),
  );
}
