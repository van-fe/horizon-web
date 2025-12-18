import { themeConfig, themeConfigMapping } from './theme-config';
import type { ThemeType } from './theme-types';
import { isDefined } from '@aurora/utils';
import colorsMap from './colors';

type ThemesMethod = {
  set(themeType: ThemeType, targetElementSelector?: string): void;
  remove(targetElementSelector?: string): void;
};

const clsMap: Partial<Record<keyof ThemeType, string>> = themeConfigMapping;
let alreadySetVariables: Record<string, string> = {};

const styleId = 'horizon-web-custom-style';

const updateStyle = (config: Record<string, string>, targetElementSelector = '') => {
  const id = styleId + (targetElementSelector ? `-${targetElementSelector}` : '');
  let style = document.getElementById(id) as HTMLStyleElement | null;

  if (style) {
    document.head.removeChild(style);
  }

  style = document.createElement('style');
  style.id = id;
  style.type = 'text/css';

  let content = `${targetElementSelector ? targetElementSelector : ':root'} {
`;

  Object.entries(config).forEach(([key, value]) => {
    content += `  ${key}: ${value};\n`;
  });

  content += `}\n`;

  style.innerHTML = content;

  document.head.append(style);
};

const themes: ThemesMethod = {
  set(themeConfigs, targetElementSelector = '') {
    const res: Record<string, string> = {};

    for (const attr in themeConfigs) {
      if (Object.prototype.hasOwnProperty.call(themeConfigs, attr)) {
        const index = attr as keyof ThemeType;
        const key = clsMap[index];
        const value = themeConfigs[index];
        if (isDefined(value) && value !== '' && isDefined(key)) {
          res[key] = value;
        }
      }
    }

    alreadySetVariables = { ...alreadySetVariables, ...res };

    updateStyle(alreadySetVariables, targetElementSelector ?? '');
  },
  remove(targetElementSelector) {
    const id = styleId + (targetElementSelector ? `-${targetElementSelector}` : '');
    const element = document.getElementById(id);

    if (element) {
      document.head.removeChild(element);
    }
  },
};

export const colors = colorsMap;
export type colorType = keyof typeof colorsMap;

const originColors: { [x: string]: string } = {};

Object.keys(colorsMap).forEach(key => {
  if (Array.isArray(colorsMap[key as colorType])) {
    for (const index in colorsMap[key as colorType] as string[]) {
      originColors[`${key}[${index}]`] = colorsMap[key as colorType][index];
    }
  } else {
    originColors[key] = colorsMap[key as colorType] as string;
  }
});

export function useColors(key: string) {
  return originColors[key] || key;
}

export const builtinColorMapping: Record<string, string> = {
  brand: '#00B3BE',
  indigo: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  orange: '#FF772E',
};

export { themes as $themes, themeConfig, ThemeType, themeConfigMapping };
export { default as basicTokens } from './basicTokens';
export { default as elementTokens } from './elementTokens';
