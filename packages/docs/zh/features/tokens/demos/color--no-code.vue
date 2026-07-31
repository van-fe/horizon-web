<script setup lang="ts">
import { tinyColor } from '@aurora/colors';
import type { TinyColor } from '@aurora/colors';
import tokens from './theme.json';
import { ref } from 'vue';
import groupBy from 'lodash/groupBy';
import { ThemeType } from '@aurora/horizon-web';
import { snakeCase } from '@aurora/utils';

interface GroupedBasicOpacityItem {
  label: string;
  refToken: string;
  rawLabel: string;
  value: number;
  isDark: boolean;
}

interface GroupedBasicColorTokenItem {
  label: string;
  value: string;
  hexValue: string;
  group: string;
  rawLabel: string;
}

interface GroupedBasicColorToken {
  label: string;
  rawName: string;
  primaryColor: string;
  rawKey: string;
  children: GroupedBasicColorTokenItem[];
}

interface GroupedElementColorTokenItem {
  label: string;
  basicToken: string;
  basicJsToken: string;
  refToken: string;
  showValue: string;
  alphaToken: string;
  alphaJsKey: string;
  alphaValue: number;
  hex: string;
  hex8: string;
  rgba: string;
  isDark: boolean;
}



function unwrappedRGBToHex(unwrappedRGB: string) {
  return `#${tinyColor(`rgb(${unwrappedRGB})`).toHex(false)}`;
}

const isColor = (value: string) => /^rgb(a)*/.test(value);

const colorTokenReg = /^rgb(a)*\(var\(([\w-]+)\)(,\s*var\(([\w-]+)\))*\)$/;

const getBasicToken = (value: string) => value.replace(colorTokenReg, '$2');

const getAlphaValue = (value: string) => value.replace(colorTokenReg, '$4');

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`,
  );

const getHexValue = (rgb: string) => `#${tinyColor(`rgb(${rgb})`).toHex(false)}`;

const getInstanceValue = (basicToken: string, colors: ThemeType) => {
  const basicKey = snakeCase(basicToken.replace('--h-', '')) as keyof ThemeType;
  return getHexValue(colors[basicKey]!);
};

const getAlphaInstanceValue = (alphaToken: string, opacity: ThemeType) => {
  const basicKey = snakeCase(alphaToken.replace('--h-', '')) as keyof ThemeType;
  return Number(opacity[basicKey]);
};

const tinyColorToRgba = (tinyColor: TinyColor) => {
  return `rgba(${tinyColor.r}, ${tinyColor.g}, ${tinyColor.b}, ${tinyColor.a})`;
};

function getOpacityList(
  opacityTokens: typeof tokens['basic']['opacity'],
): GroupedBasicOpacityItem[] {
  return Object.entries(opacityTokens || {}).map(([key, value]) => {
    return {
      label: key,
      refToken: `--h-${key.replace(/_/g, '-')}`,
      rawLabel: key,
      value: parseFloat(value),
      isDark: parseFloat(value) >= 0.4,
    };
  });
}

function getGroupedBasicColorToken(
  basicToken: typeof tokens['basic']['color'],
): GroupedBasicColorToken[] {
  return Object.entries(
    groupBy(Object.entries(basicToken ?? {}), ([label]) => label.match(/^color_\d+/)![0]),
  ).map(([key, values]: [string, string[]]) => {
    const rawKey = `${key}_name`;
    const colorNameTarget = values.find(([currKey]) => currKey === rawKey);
    const primaryColor = values.find(([currKey]) => currKey === `${key}_6`)![1];

    return {
      label: colorNameTarget![1],
      rawName: key,
      primaryColor: unwrappedRGBToHex(primaryColor),
      rawKey,
      children: values
        .filter((val) => val !== colorNameTarget)
        .map(([colorKey, value]) => {

          return {
            label: colorKey.replace(key, colorNameTarget![1]),
            value,
            hexValue: unwrappedRGBToHex(value),
            group: key,
            rawLabel: colorKey,
          };
        }),
    };
  });
}

function getGroupedElementColorToken(
  elementColorToken: typeof tokens['element']['colors'],
  groupedBasicTokens: GroupedBasicColorToken[],
  colors: ThemeType,
  opacity: ThemeType,
): {label: string; children: GroupedElementColorTokenItem[]}[] {
  return Object.entries(elementColorToken)
    .map(([groupKey, data]) => ({
      label: groupKey,
      children: Object.entries(data).map(([key, value]) => {
        const currentIsColor = isColor(value);
        const basicToken = getBasicToken(value);
        const basicTokenFormatted = basicToken.replace(/^--h-/, '');
        const basicTokenShowRawName = basicTokenFormatted.match(/^(color-\d+)-/)?.[1] ?? '';
        const basicTokenShowGroupName =
          groupedBasicTokens.find(
            (curr) => curr.rawName.replace(/_/g, '-') === basicTokenShowRawName,
          )?.label ?? '';
        const basicTokenShowName = basicTokenFormatted.replace(
          basicTokenShowRawName,
          basicTokenShowGroupName,
        );
        const alphaToken = getAlphaValue(value) || '--h-opacity-10';
        const alphaValue = getAlphaInstanceValue(alphaToken, opacity);

        const color = tinyColor(getInstanceValue(basicToken, colors)).setAlpha(alphaValue);

        return {
          label: formatTokenName(key),
          basicToken,
          basicJsToken: snakeCase(basicToken.replace('--h-', '')),
          refToken: `--h-${key.replace(/_/g, '-')}`,
          showValue: basicTokenShowName,
          alphaToken,
          alphaJsKey: snakeCase(alphaToken.replace('--h-', '')),
          alphaValue,
          hex: currentIsColor ? color.toHexString() : '',
          hex8: color.toHex8String(),
          rgba: tinyColorToRgba(color),
          isDark: color.isDark(),
        };
      }),
    }))
    .sort((a, b) => a.label.localeCompare(b.label) * -1);
}

const alphaTokens = getOpacityList(tokens.basic.opacity);
const basicColorTokens = getGroupedBasicColorToken(tokens.basic.color);
const elementTokens = getGroupedElementColorToken(tokens.element.colors, basicColorTokens, tokens.basic.color, tokens.basic.opacity);

const currentTabs = ref('text');
</script>

<template>
  <div class="colors">
    <h-tabs v-model="currentTabs" type="page">
      <h-tab v-for="group of elementTokens" :key="group.label" :name="group.label">{{ group.label }}</h-tab>
      <h-tab name="alpha">alpha</h-tab>
    </h-tabs>
    <h-panels :model-value="currentTabs">
      <h-panel v-for="group of elementTokens" :key="group.label" :name="group.label">
        <div
          v-for="color of group.children"
          :key="color.label"
          :class="{'color': true, 'inverse': color.refToken.includes('inverse')}"
        >
          <div class="label">
            <div class="preview">
              <div class="color" :style="{backgroundColor: color.hex8}"></div>
            </div>
            <div class="key">{{ color.refToken }} <copy-btn :text="color.refToken" /></div>
          </div>
          <h-tooltip :enterable="true" :click-to-copy="true">
            <template #content>
              {{ color.hex8.toUpperCase() }}, {{ color.rgba }}
            </template>
            <div class="value">#{{ color.showValue.replace(/-/g, '_') }} @ {{ color.alphaJsKey }}</div>
          </h-tooltip>
        </div>
      </h-panel>
      <h-panel name="alpha">
        <div v-for="opacity of alphaTokens" :key="opacity.label" class="color">
          <div class="label">
            <div class="preview">
              <div class="color" :style="{backgroundColor: `rgba(255, 255, 255, ${opacity.value})`}"></div>
            </div>
            <div class="key">{{ opacity.refToken }} <copy-btn :text="opacity.refToken" /></div>
          </div>
          <div class="value">{{ opacity.value }}</div>
        </div>
      </h-panel>
    </h-panels>
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

    .preview {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid var(--h-border-default);
      margin-right: 10px;
      overflow: hidden;
      position: relative;

      .color {
        width: 120%;
        height: 120%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        background-image:
          linear-gradient(
              45deg,
              var(--h-text-disabled) 25%,
              var(--h-bg-transparent) 25%
          ),
          linear-gradient(
              135deg,
              var(--h-text-disabled) 25%,
              var(--h-bg-transparent) 25%
          ),
          linear-gradient(
              45deg,
              var(--h-bg-transparent) 75%,
              var(--h-text-disabled) 75%
          ),
          linear-gradient(
              135deg,
              var(--h-bg-transparent) 75%,
              var(--h-text-disabled) 75%
          );
        background-repeat: repeat;
        background-position: 0 0, 3px 0, 3px -3px, 0 3px;
        background-size: 6px 6px;
      }
    }
  }

  &.inverse {
    color: var(--h-text-inverse);
    background: rgba(69, 69, 69, 1);

    .label {
      .preview {
        background: rgba(69, 69, 69, 1);
      }
    }
  }

  & + & {
    margin-top: 10px;
  }
}

.h-panels__content {
  padding: 10px;
}
</style>
