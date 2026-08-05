<script setup lang="ts">
import tokens from './theme.json';

type Data<T = unknown> = Record<string, T>;

interface TokenRealValueData {
  label: string;
  value: string;
  refToken: string;
  rawLabel: string;
  rawValue: string;
  path: string;
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`,
  );

function getElementTokenRealValue(elementTokens: (typeof tokens)['element']) {
  const list: Data<Data | TokenRealValueData> = {};

  const handler = (current: Data, subTree: Data, parentKey: string[]) => {
    Object.entries(current).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        subTree[key] = {};
        handler(value as Data, subTree[key] as Data, parentKey.concat(key));
      } else if (typeof value === 'string') {
        subTree[key] = {
          label: formatTokenName(key),
          value,
          refToken: `--h-${key.replace(/_/g, '-')}`,
          rawLabel: key,
          rawValue: value,
          path: `element.${parentKey.concat(key).join('.')}`,
        };
      }
    });
  };

  handler(elementTokens, list, []);

  return list;
}

const elementListTokens = getElementTokenRealValue(tokens.element);
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
  border: 1px solid var(--h-border-default);
  padding: 5px 10px;
  color: var(--h-text-primary);
  border-radius: var(--h-radius);
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

.h-panels__content {
  padding: 10px;
}
</style>
