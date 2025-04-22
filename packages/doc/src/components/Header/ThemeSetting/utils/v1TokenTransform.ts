import type { ThemeType } from '@nio-fe/lego';

const oldBasicKeyMapping = {
  gray: 'color_1',
  brand: 'color_2',
  gold: 'color_3',
  yellow: 'color_4',
  orange: 'color_5',
  red: 'color_6',
  rose_red: 'color_7',
  purple: 'color_8',
  yellowgreen: 'color_9',
  green: 'color_10',
  lake_blue: 'color_11',
  blue: 'color_12',
  indigo: 'color_13',
};

function snakeWordAndNumber(str: string) {
  return str.replace(/[A-Z\d]/g, (curr, index) =>
    index === 0 || (index > 0 && /\d/.test(str[index - 1]))
      ? curr.toLowerCase()
      : `_${curr.toLowerCase()}`,
  );
}

export function transformBasicTokens(basicTokens: ThemeType) {
  const basicNameSet: Record<string, boolean> = {};
  const basicName: Record<string, string> = {};

  return {
    ...Object.fromEntries(
      Object.entries(basicTokens).map(([key, value]) => {
        let snakeCaseKey = snakeWordAndNumber(key);
        const colorName = snakeCaseKey.replace(/_\d+$/, '') as
          | keyof typeof oldBasicKeyMapping
          | undefined;

        if (colorName && !basicNameSet[colorName]) {
          basicName[oldBasicKeyMapping[colorName] + '_name'] = colorName;
          basicNameSet[colorName] = true;
        }

        const target = Object.keys(oldBasicKeyMapping).find(
          curr => !!snakeCaseKey.match(new RegExp(`^${curr}_`)),
        );

        if (target) {
          snakeCaseKey = snakeCaseKey.replace(
            target,
            oldBasicKeyMapping[target as keyof typeof oldBasicKeyMapping],
          );
        }

        return [snakeCaseKey, value];
      }),
    ),
    ...basicName,
  };
}

export function transformElementToken(elementTokens: ThemeType) {
  return Object.fromEntries(
    Object.entries(elementTokens).map(([key, value]) => {
      const matched = value.match(/--n-([a-z-]+\d+)/);
      const rawName = matched?.[1];

      if (rawName) {
        const rawNameSplit = rawName.split('-');
        const colorName = rawNameSplit.slice(0, -1).join('_');

        value = value.replace(
          rawName,
          oldBasicKeyMapping[colorName as keyof typeof oldBasicKeyMapping].replace(/_/g, '-') +
            `-${rawNameSplit.at(-1)!}`,
        );
      }

      return [snakeWordAndNumber(key), value];
    }),
  );
}

export default function (tokens: Record<'basic' | 'element' | string, ThemeType>) {
  const basic = transformBasicTokens(tokens.basic);
  const element = transformElementToken(tokens.element);

  return {
    basic,
    element,
  };
}
