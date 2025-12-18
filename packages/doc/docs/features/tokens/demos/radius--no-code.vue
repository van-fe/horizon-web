<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/shared';

type Data<T = unknown> = Record<string, T>;

interface FontListType {
  label: string;
  rawLabel: string;
  value: string;
}

interface TokenRealValueData {
  label: string;
  value: string;
  refToken: string;
  rawLabel: string;
  rawValue: string;
  path: string;
}

function cssVariableNameToJsName(cssVariableName: string) {
  return snakeCase(cssVariableName.replace(/^--n-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`,
  );

function getFontList(currTokens: (typeof tokens)['basic']['font']) {
  const list: Array<FontListType> = [];

  const handler = (currTokens: Data) => {
    Object.entries(currTokens || {}).map(([key, value]) => {
      if (typeof value === 'object') {
        return handler(value as Data);
      } else if (typeof value === 'string') {
        list.push({
          label: key,
          rawLabel: key,
          value,
        });
      }
    });
  };

  handler(currTokens);

  return list;
}

function getElementTokenRealValue(
  elementTokens: (typeof tokens)['element'],
  groupedBasicTokens: FontListType[],
) {
  const list: Data<Data | TokenRealValueData> = {};

  const handler = (current: Data, subTree: Data, parentKey: string[]) => {
    Object.entries(current).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        subTree[key] = {};
        handler(value as Data, subTree[key] as Data, parentKey.concat(key));
      } else if (typeof value === 'string') {
        const reg = /^var\((.*?)\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: `--n-${key.replace(/_/g, '-')}`,
            rawLabel: key,
            rawValue: value,
            path: `element.${parentKey.concat(key).join('.')}`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: `--n-${key.replace(/_/g, '-')}`,
            rawLabel: key,
            rawValue: value,
            path: `element.${parentKey.concat(key).join('.')}`,
          };
        }
      }
    });
  };

  handler(elementTokens, list, []);

  return list;
}

const basicFontListTokens = getFontList(tokens.basic.font);
const elementListTokens = getElementTokenRealValue(tokens.element, basicFontListTokens);
</script>

<template>
  <div class="colors">
    <div v-for="token of elementListTokens.radius" :key="token.label" class="color">
      <div class="label">
        <div class="key">{{ token.refToken }}<copy-btn :text="token.refToken" /></div>
      </div>
      <div class="value">{{ token.value }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color {
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid var(--n-border-default);
  padding: 5px 10px;
  color: var(--n-text-primary);
  border-radius: var(--n-radius);
  justify-content: space-between;

  .label {
    display: flex;
    align-items: center;
    margin-right: 20px;
    white-space: nowrap;
  }

  & + & {
    margin-top: 10px;
  }
}

.n-panels__content {
  padding: 10px;
}
</style>
