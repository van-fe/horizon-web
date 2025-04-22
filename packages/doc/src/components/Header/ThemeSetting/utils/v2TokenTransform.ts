import type { ThemeType } from '@nio-fe/lego';
import { basicTokens, elementTokens, themeConfigMapping, $alert } from '@nio-fe/lego';
import type { CurrentConfigType } from '~/components/Header/ThemeSetting/utils/oldTokenTransform';

export type TreeType<T = string> = {
  [index: string]: T | TreeType<T>;
};

const cssVariableKeyJsKeyMapping = Object.fromEntries(
  Object.entries(themeConfigMapping).map(([jsKey, cssKey]) => [cssKey, jsKey]),
);

function getTokenKeysTree(tree: TreeType) {
  const res: TreeType = {};

  Object.entries(tree).forEach(([key, value]) => {
    if (typeof value === 'string') {
      res[cssVariableKeyJsKeyMapping[key]] = key;
    } else {
      res[key] = getTokenKeysTree(value);
    }
  });

  return res;
}

const elementTokensKeysTree = getTokenKeysTree(elementTokens);

const colorTokenReg = /^rgb(a)*\(var\(([\w-]+)\)(,\s*([.\d]+)\))*$/;
let basicOpacityTokens = Object.values(basicTokens.opacity).map(Number);
const collectedOpacities: Record<string, string> = {};

function collectOpacityValues(elementTokens: ThemeType) {
  const opacityNums = new Set<number>();

  Object.values(elementTokens).forEach(value => {
    const matched = value.match(colorTokenReg);
    if (matched && matched[4]) {
      opacityNums.add(Number(matched[4]));
    }
  });

  const sortedNums = [...opacityNums].sort((a, b) => a - b);

  if (sortedNums.length < 10) {
    if (sortedNums.at(-1) !== 1) {
      sortedNums.push(1);
    }

    basicOpacityTokens.splice(10 - sortedNums.length, 10 - sortedNums.length, ...sortedNums);
  } else if (sortedNums.length === 10) {
    const last = sortedNums.at(-1);
    if (last !== 1) {
      $alert(
        `在转换透明度的时候，发现你的透明度设置有超过10种，所以透明度(${last})被修改，请验证确认`,
      );

      sortedNums[sortedNums.length - 1] = 1;
    }

    basicOpacityTokens = sortedNums;
  } else {
    $alert(
      `在转换透明度的时候，发现你的透明度设置有超过10种，所以透明度(${sortedNums
        .slice(9)
        .join(', ')})被删除，请验证确认`,
    );
    basicOpacityTokens = [...sortedNums.slice(0, 9), 1];
  }

  basicOpacityTokens.forEach((opacity, index) => {
    collectedOpacities[`--n-opacity-${index + 1}`] = opacity.toString();
  });
}

export function transformBasicTokens(oldBasicTokens: ThemeType) {
  const newBasicTokens: Record<'colors' | 'opacity', Record<string, string>> = {
    colors: {
      ...oldBasicTokens,
    },
    opacity: {
      ...Object.fromEntries(
        Object.entries(basicTokens.opacity).map(([key, value]) => {
          const mappedTarget = cssVariableKeyJsKeyMapping[key];

          if (mappedTarget) {
            return [mappedTarget, value];
          } else {
            return [key, value];
          }
        }),
      ),
    },
  };

  return newBasicTokens;
}

function getOpacityCssVariable(opacity: string) {
  if (/^[\d.]+$/.test(opacity)) {
    const opacityKey = Object.entries(collectedOpacities).find(
      ([, value]) => Number(value) === Number(opacity),
    )?.[0];

    if (opacityKey) {
      return opacityKey;
    }
  }

  return opacity;
}

function replaceOpacityValue(rawValue: string) {
  if (/^rgba\(/.test(rawValue)) {
    const matched = rawValue.match(/^rgba\(var\(([\w-]+)\),\s*([\d.]+)\)$/);
    if (matched) {
      const rgbCssVariable = matched[1];
      const opacity = matched[2];

      if (opacity) {
        return `rgba(var(${rgbCssVariable}), var(${getOpacityCssVariable(opacity)}))`;
      }
    }
  }

  return rawValue;
}

export function transformElementToken(elementTokens: ThemeType) {
  function recursionFormat(keyMappingTree: TreeType) {
    const res: TreeType = {};

    Object.entries(keyMappingTree).forEach(([jsKey, cssKeyOrTree]) => {
      if (typeof cssKeyOrTree === 'string') {
        res[jsKey] = replaceOpacityValue(elementTokens[jsKey as keyof ThemeType]!);
      } else {
        res[jsKey] = recursionFormat(cssKeyOrTree);
      }
    });

    return res;
  }

  return recursionFormat(elementTokensKeysTree);
}

export default function (
  tokens: Record<'basic' | 'element' | string, ThemeType>,
): CurrentConfigType {
  collectOpacityValues(tokens.element);
  const basic = transformBasicTokens(tokens.basic) as CurrentConfigType['basic'];
  const element = transformElementToken(tokens.element) as CurrentConfigType['element'];

  return {
    basic,
    element,
  };
}
