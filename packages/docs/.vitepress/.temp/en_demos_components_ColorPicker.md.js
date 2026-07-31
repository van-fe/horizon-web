import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/ColorPicker.md","filePath":"en/demos/components/ColorPicker.md"}');
const _sfc_main = { name: "en/demos/components/ColorPicker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>ColorPicker</h1><p class="description">The basic style only includes single color adjustment. Set <code>alpha = true</code> to enable transparency setting</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>The basic style only includes single color adjustment. Set <code>alpha = true</code> to enable transparency setting</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="alpha" label="透明度调节" label-position="right" />

  <p>
    <h-color-picker v-model="value1" trigger-type="square" :alpha="alpha" :need-confirm="false" :clearable="false" />
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#0BA1D6');
const alpha = ref(false);
<\/script>

<style scoped>
p {
  margin-top: 10px;
}
</style>
`,
    path: "demos/components/ColorPicker/alpha.vue"
  }, null, _parent));
  _push(`<h2 id="trigger-type" tabindex="-1">Trigger Type <a class="header-anchor" href="#trigger-type" aria-label="Permalink to &quot;Trigger Type&quot;">​</a></h2><p>You can enable the style with color code by configuring <code>square-text = true</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="触发器类型">
      <h-radio-group v-model="type">
        <h-radio label="square">正方形</h-radio>
        <h-radio label="square-text">带色号</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" @change="onChange" />
  <h-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" disabled />
  <h-color-picker v-model="value4" trigger-type="square" :square-text="squareText" :need-confirm="false" @change="onChange" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const type = ref('square');

const value1 = ref('#178CA6');
const value4 = ref();

const squareText = computed(() => type.value === 'square-text');

function onChange(color: string) {
  console.info('change:', color);
}
<\/script>

<style scoped>
p {
  margin-top: 10px;
}

.h-color-picker--square + .h-color-picker--square {
  margin-left: 16px;
}

.h-color-picker--input + .h-color-picker--input {
  margin-top: 12px;
}
</style>
`,
    path: "demos/components/ColorPicker/trigger.vue"
  }, null, _parent));
  _push(`<h2 id="custom-trigger" tabindex="-1">Custom trigger <a class="header-anchor" href="#custom-trigger" aria-label="Permalink to &quot;Custom trigger&quot;">​</a></h2><p>In some cases, you may need to set your own trigger <code>trigger</code>. You can configure it using <code>slots.trigger</code></p><p>You can use <code>resultsValue.value</code> in the return parameters to get the set value</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-color-picker v-model="modelValue">
    <template #trigger="color">
      <h-button icon="edit" :link="true" :style="{ color: color.resultsValue.value }" />
    </template>
  </h-color-picker>

  <h-color-picker v-model="modelValue2">
    <template #trigger="color">
      <h-button :plain="true">Pick Color {{ color.resultsValue.value ? \`: \${color.resultsValue.value}\` : '' }}</h-button>
    </template>
  </h-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref();
const modelValue2 = ref();
<\/script>

<style>
.h-color-picker--square + .h-color-picker--square {
  margin-left: 16px;
}
</style>
`,
    path: "demos/components/ColorPicker/custom-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="trigger-size" tabindex="-1">Trigger Size <a class="header-anchor" href="#trigger-size" aria-label="Permalink to &quot;Trigger Size&quot;">​</a></h2><p>The trigger size is divided into S, M, and L, controlled by <code>size</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <ul class="color-picker-demo__size">
    <li>
      <h-color-picker v-model="value1" trigger-type="square" size="small" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="small" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="small" alpha>
        <template #squareText>
          自定义文本
        </template>
      </h-color-picker>
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" size="medium" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="medium" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="medium" alpha>
        <template #squareText>
          自定义文本
        </template>
      </h-color-picker>
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" size="large" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="large" alpha />
    </li>
    <li>
      <h-color-picker v-model="value1" trigger-type="square" square-text size="large" alpha>
        <template #squareText>
          自定义文本
        </template>
      </h-color-picker>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#E83030');
<\/script>

<style scoped>
.color-picker-demo__size {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, min-content);
  grid-row-gap: 12px;
  grid-column-gap: 12px;
}

.color-picker-demo__size li {
  align-self: center;
}
</style>
`,
    path: "demos/components/ColorPicker/size.vue"
  }, null, _parent));
  _push(`<h2 id="extended-styles" tabindex="-1">Extended Styles <a class="header-anchor" href="#extended-styles" aria-label="Permalink to &quot;Extended Styles&quot;">​</a></h2><p>Extended functions include: with gradient setting, with system preset colors, with recently used colors, with custom colors, with web color picker, only one gradient, with cancel/confirm buttons, with clear button, with cancel/confirm + clear buttons;</p><p>Note: The web color picker uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper" target="_blank" rel="noreferrer">EyeDropper API</a>, but the specific browser support needs to be checked: <a href="https://caniuse.com/?search=EyeDropper" target="_blank" rel="noreferrer">Can I Use</a>. In actual production scenarios, please use this capability with caution. This <code>API</code> is not precise and may have slight differences</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-width="160px" label-vertical-align="middle" class="grid-form">
    <h-form-item label="带渐变设置">
      <h-color-picker
        v-model="value1"
        trigger-type="square"
        :enable-gradient="true"
        :editable="true"
        :alpha="true"
      />
    </h-form-item>
    <h-form-item label="只有一种渐变">
      <h-color-picker
        v-model="value2"
        trigger-type="square"
        :enable-gradient="true"
        :gradient-list="['linear']"
        :editable="true"
        :alpha="true"
      />
    </h-form-item>
    <h-form-item label="带系统预设颜色">
      <h-color-picker v-model="value3" trigger-type="square" editable alpha show-swatch :swatches="swatches" :need-confirm="false" :clearable="false" />
    </h-form-item>
    <h-form-item label="带取消/确认按钮">
      <h-color-picker v-model="value4" trigger-type="square" editable alpha :clearable="false" />
    </h-form-item>
    <h-form-item label="带最近使用颜色">
      <h-color-picker v-model="value5" trigger-type="square" editable alpha recently-colors :need-confirm="false" :clearable="false" />
    </h-form-item>
    <h-form-item label="带清空按钮">
      <h-color-picker v-model="value6" trigger-type="square" editable alpha :need-confirm="false" />
    </h-form-item>
    <h-form-item label="带自定义预设颜色">
      <h-color-picker v-model="value7" trigger-type="square" editable alpha :need-confirm="false" :clearable="false" :custom-colors="true" />
    </h-form-item>
    <h-form-item label="带取消/确认+清空按钮">
      <h-color-picker v-model="value8" trigger-type="square" editable alpha  />
    </h-form-item>
    <h-form-item label="带网页取色">
      <h-color-picker v-model="value9" trigger-type="square" :enable-eye-dropper="true" editable alpha />
    </h-form-item>
    <h-form-item label="联合使用">
      <h-color-picker
        v-model="value10"
        trigger-type="square"
        :enable-gradient="true"
        :editable="true"
        :alpha="true"
        :show-swatch="true"
        :swatches="swatches"
        :recently-colors="true"
        :custom-colors="true"
      />
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#178CA6');
const value2 = ref('linear-gradient(90deg, #45D0E2FF 0%, #FE0000FF 60.60606060606061%, #000000FF 100%)');
const value3 = ref('#178CA6');
const value4 = ref('#178CA6');
const value5 = ref('#178CA6');
const value6 = ref('#178CA6');
const value7 = ref('#178CA6');
const value8 = ref('#178CA6');
const value9 = ref('#178CA6');
const value10 = ref('#178CA6');

const swatches = [
  '#178CA6',
  '#0BA1D6',
  '#26BD4B',
  '#FDA71C',
  '#E83030',
  '#178CA6',
  '#0BA1D6',
  '#26BD4B',
  '#FDA71C',
  '#E83030',
];
<\/script>

<style scoped>
.grid-form {
  display: grid;
  grid-template-columns: repeat(2, min-content);
  grid-column-gap: 80px;
}
</style>
`,
    path: "demos/components/ColorPicker/examples.vue"
  }, null, _parent));
  _push(`<h2 id="colorpicker-api" class="no-underline h2"><a href="#colorpicker-api" class="!no-underline">ColorPicker Api</a></h2><h3 id="colorpicker-props" class="no-underline h3"><a href="#colorpicker-props" class="!no-underline">ColorPicker Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">alpha</td><td>Configuration for alpha.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger-type</td><td>Configuration for trigger type.</td><td><code>&#39;square&#39; | &#39;input&#39;</code></td><td class="text-center">No</td><td>&#39;input&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">square-text</td><td>Configuration for square text.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable</td><td>Configuration for editable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">edit-mode</td><td>Configuration for edit mode.</td><td><code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code></td><td class="text-center">No</td><td>&#39;hex&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable-modes</td><td>Configuration for editable modes.</td><td><code>Array&lt;&#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;&gt;</code></td><td class="text-center">No</td><td>() =&gt; [&#39;rgb&#39;, &#39;hsl&#39;, &#39;hsv&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-swatch</td><td>Configuration for show swatch.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">swatches</td><td>Configuration for swatches.</td><td><code>Array&lt;{ name: string; value: string } | string&gt;</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">recently-colors</td><td>Configuration for recently colors.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">custom-colors</td><td>Configuration for custom colors.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>Configuration for format.</td><td><code>&#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39; | &#39;hex&#39;</code></td><td class="text-center">No</td><td>&#39;hex&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>Configuration for need confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-props</td><td>Configuration for popover props.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-eye-dropper</td><td>Configuration for enable eye dropper.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-gradient</td><td>Configuration for enable gradient.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gradient-list</td><td>Configuration for gradient list.</td><td><code>Array&lt;&#39;linear&#39; | &#39;radial&#39; | &#39;conic&#39;&gt;</code></td><td class="text-center">No</td><td>() =&gt; [&#39;linear&#39;, &#39;radial&#39;, &#39;conic&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-on-input</td><td>Configuration for update on input.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="colorpicker-emits" class="no-underline h3"><a href="#colorpicker-emits" class="!no-underline">ColorPicker Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-change</td><td rowspan="1">Emitted when active change changes.</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:edit-mode</td><td rowspan="1">Emitted when update:edit mode changes.</td><td rowspan="1">( value: <code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code></td><td>The value value.</td></tr></tbody></table><h3 id="colorpicker-exposes" class="no-underline h3"><a href="#colorpicker-exposes" class="!no-underline">ColorPicker Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">colorPicker</td><td rowspan="1">Controls color picker.</td><td rowspan="1"><code>Ref&lt;HTMLInputElement&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/ColorPicker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ColorPicker as default
};
