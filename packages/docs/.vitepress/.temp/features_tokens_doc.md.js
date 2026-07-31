import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Tokens","description":"","frontmatter":{},"headers":[],"relativePath":"features/tokens/doc.md","filePath":"zh/features/tokens/doc.md"}');
const _sfc_main = { name: "features/tokens/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="tokens" tabindex="-1">Tokens <a class="header-anchor" href="#tokens" aria-label="Permalink to &quot;Tokens&quot;">​</a></h1><p>在 <code>horizon-web</code> 中，我们提供了很多 <code>Tokens</code> 用来对组件的各种形态做约束，其中包括6大方面：颜色、字体字号、圆角、间距、投影、动效参数。</p><p>你可以在自己的业务系统中，也使用这些 <code>Tokens</code> 来开发。在确保使用 <code>Tokens</code> 的语义相同下，在主题替换后才会有与 <code>horizon-web</code> 有一致的样式形式。</p><h2 id="颜色" tabindex="-1">颜色 <a class="header-anchor" href="#颜色" aria-label="Permalink to &quot;颜色&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
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
  return \`#\${tinyColor(\`rgb(\${unwrappedRGB})\`).toHex(false)}\`;
}

const isColor = (value: string) => /^rgb(a)*/.test(value);

const colorTokenReg = /^rgb(a)*\\(var\\(([\\w-]+)\\)(,\\s*var\\(([\\w-]+)\\))*\\)$/;

const getBasicToken = (value: string) => value.replace(colorTokenReg, '$2');

const getAlphaValue = (value: string) => value.replace(colorTokenReg, '$4');

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
  );

const getHexValue = (rgb: string) => \`#\${tinyColor(\`rgb(\${rgb})\`).toHex(false)}\`;

const getInstanceValue = (basicToken: string, colors: ThemeType) => {
  const basicKey = snakeCase(basicToken.replace('--h-', '')) as keyof ThemeType;
  return getHexValue(colors[basicKey]!);
};

const getAlphaInstanceValue = (alphaToken: string, opacity: ThemeType) => {
  const basicKey = snakeCase(alphaToken.replace('--h-', '')) as keyof ThemeType;
  return Number(opacity[basicKey]);
};

const tinyColorToRgba = (tinyColor: TinyColor) => {
  return \`rgba(\${tinyColor.r}, \${tinyColor.g}, \${tinyColor.b}, \${tinyColor.a})\`;
};

function getOpacityList(
  opacityTokens: typeof tokens['basic']['opacity'],
): GroupedBasicOpacityItem[] {
  return Object.entries(opacityTokens || {}).map(([key, value]) => {
    return {
      label: key,
      refToken: \`--h-\${key.replace(/_/g, '-')}\`,
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
    groupBy(Object.entries(basicToken ?? {}), ([label]) => label.match(/^color_\\d+/)![0]),
  ).map(([key, values]: [string, string[]]) => {
    const rawKey = \`\${key}_name\`;
    const colorNameTarget = values.find(([currKey]) => currKey === rawKey);
    const primaryColor = values.find(([currKey]) => currKey === \`\${key}_6\`)![1];

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
        const basicTokenShowRawName = basicTokenFormatted.match(/^(color-\\d+)-/)?.[1] ?? '';
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
          refToken: \`--h-\${key.replace(/_/g, '-')}\`,
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
<\/script>

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
              <div class="color" :style="{backgroundColor: \`rgba(255, 255, 255, \${opacity.value})\`}"></div>
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
`,
    path: "zh/features/tokens/demos/color--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="字体字号" tabindex="-1">字体字号 <a class="header-anchor" href="#字体字号" aria-label="Permalink to &quot;字体字号&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/utils';
import { ref } from 'vue';

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
  return snakeCase(cssVariableName.replace(/^--h-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
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
        const reg = /^var\\((.*?)\\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
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

const currentTabs = ref('lineHeight');
<\/script>

<template>
  <div class="colors">
    <h-tabs v-model="currentTabs" type="page">
      <h-tab v-for="(group, key) of elementListTokens.font" :key="key" :name="key">
        {{ key }}
      </h-tab>
    </h-tabs>
    <h-panels v-model="currentTabs" type="page">
      <h-panel v-for="(group, key) of elementListTokens.font" :key="key" :name="key">
        <div v-for="token of group" :key="token.label" class="color">
          <div class="label">
            <div class="key">{{ token.refToken }} <copy-btn :text="token.refToken" /></div>
          </div>
          <div class="value">{{ token.value }}</div>
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
  }

  & + & {
    margin-top: 10px;
  }
}

.h-panels__content {
  padding: 10px;
}
</style>
`,
    path: "zh/features/tokens/demos/font-size--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="圆角" tabindex="-1">圆角 <a class="header-anchor" href="#圆角" aria-label="Permalink to &quot;圆角&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/utils';

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
  return snakeCase(cssVariableName.replace(/^--h-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
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
        const reg = /^var\\((.*?)\\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
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
<\/script>

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
`,
    path: "zh/features/tokens/demos/radius--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="间距" tabindex="-1">间距 <a class="header-anchor" href="#间距" aria-label="Permalink to &quot;间距&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/utils';
import { ref } from 'vue';

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
  return snakeCase(cssVariableName.replace(/^--h-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
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
        const reg = /^var\\((.*?)\\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
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
<\/script>

<template>
  <div class="colors">
    <div v-for="token of elementListTokens.spacing" :key="token.label" class="color">
      <div class="label">
        <div class="key">{{ token.refToken }} <copy-btn :text="token.refToken" /></div>
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
`,
    path: "zh/features/tokens/demos/spacing--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="投影" tabindex="-1">投影 <a class="header-anchor" href="#投影" aria-label="Permalink to &quot;投影&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/utils';
import { ref } from 'vue';

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
  return snakeCase(cssVariableName.replace(/^--h-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
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
        const reg = /^var\\((.*?)\\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
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
<\/script>

<template>
  <div class="colors">
    <div v-for="token of elementListTokens.shadow" :key="token.label" class="color">
      <div class="label">
        <div class="key">{{ token.refToken }} <copy-btn :text="token.refToken" /></div>
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
`,
    path: "zh/features/tokens/demos/shadow--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="动效参数" tabindex="-1">动效参数 <a class="header-anchor" href="#动效参数" aria-label="Permalink to &quot;动效参数&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import tokens from './theme.json';
import { snakeCase } from '@aurora/utils';
import { ref } from 'vue';

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
  return snakeCase(cssVariableName.replace(/^--h-/, ''));
}

const formatTokenName = (token: string) =>
  token.replace(/([A-Z][a-z]*|\\d+)/gu, (curr, index) =>
    index === 0 ? curr.toLowerCase() : \`-\${curr.toLowerCase()}\`,
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
        const reg = /^var\\((.*?)\\)$/;
        if (reg.test(value)) {
          const cssVariable = value.match(reg)?.[1] || '';

          const target = groupedBasicTokens.find(
            curr => curr.rawLabel === cssVariableNameToJsName(cssVariable),
          );

          const currentValue = target?.value ?? value;

          subTree[key] = {
            label: formatTokenName(key),
            value: currentValue,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
          };
        } else {
          subTree[key] = {
            label: formatTokenName(key),
            value,
            refToken: \`--h-\${key.replace(/_/g, '-')}\`,
            rawLabel: key,
            rawValue: value,
            path: \`element.\${parentKey.concat(key).join('.')}\`,
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
<\/script>

<template>
  <div class="colors">
    <div v-for="token of elementListTokens.transition" :key="token.label" class="color">
      <div class="label">
        <div class="key">{{ token.refToken }} <copy-btn :text="token.refToken" /></div>
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
`,
    path: "zh/features/tokens/demos/transition--no-code.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/features/tokens/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
