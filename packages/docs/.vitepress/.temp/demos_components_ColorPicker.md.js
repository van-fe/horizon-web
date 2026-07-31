import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/ColorPicker.md","filePath":"zh/demos/components/ColorPicker.md"}');
const _sfc_main = { name: "demos/components/ColorPicker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>ColorPicker</h1><p class="description">用于选择颜色，支持HEX、RGB、HSL、HSB四种格式</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>基础样式进包含单色的调节，设置 <code>alpha = true</code>，开启设置透明度</p>`);
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
  _push(`<h2 id="触发器类型" tabindex="-1">触发器类型 <a class="header-anchor" href="#触发器类型" aria-label="Permalink to &quot;触发器类型&quot;">​</a></h2><p>可以通过配置 <code>square-text = true</code> 开启带色号的样式</p>`);
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
  _push(`<h2 id="自定义-trigger" tabindex="-1">自定义 trigger <a class="header-anchor" href="#自定义-trigger" aria-label="Permalink to &quot;自定义 trigger&quot;">​</a></h2><p>某些情况下可能需要自己设定触发 <code>trigger</code>，使用 <code>slots.trigger</code> 可以配置</p><p>返回参数中可以使用 <code>resultsValue.value</code> 得到设置的值</p>`);
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
  _push(`<h2 id="触发器尺寸" tabindex="-1">触发器尺寸 <a class="header-anchor" href="#触发器尺寸" aria-label="Permalink to &quot;触发器尺寸&quot;">​</a></h2><p>触发器尺寸分为S、M、L三种，通过 <code>size</code> 控制大小</p>`);
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
  _push(`<h2 id="拓展样式" tabindex="-1">拓展样式 <a class="header-anchor" href="#拓展样式" aria-label="Permalink to &quot;拓展样式&quot;">​</a></h2><p>拓展的功能分别有：带渐变设置、带系统预设颜色、带最近使用颜色、带自定义颜色、带网页取色、只有一种渐变、带取消/确认按钮、带清空按钮、带取消/确认+清空按钮；</p><p>注：网页取色使用了 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper" target="_blank" rel="noreferrer">EyeDropper API</a>，但具体的浏览器支持情况需要查看：<a href="https://caniuse.com/?search=EyeDropper" target="_blank" rel="noreferrer">Can I Use</a>，在实际生产场景时，请谨慎使用此能力，此 <code>API</code> 并不精准，可能会有细微差距</p>`);
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
  _push(`<h2 id="colorpicker-api" class="no-underline h2"><a href="#colorpicker-api" class="!no-underline">ColorPicker Api</a></h2><h3 id="colorpicker-props" class="no-underline h3"><a href="#colorpicker-props" class="!no-underline">ColorPicker Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>颜色色值，可以是 <code>rgb(a)</code>、<code>hsl(a)</code>、<code>hex(a)</code>、<code>hsv(a)</code> 色值形式</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>选择器大小，不会影响颜色选择器弹出框的面板及内容大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">alpha</td><td>允许使用透明度</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger-type</td><td>触发器类型</td><td><code>&#39;square&#39; | &#39;input&#39;</code></td><td class="text-center">否</td><td>&#39;input&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">square-text</td><td>方块形状后是否有颜色文字</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否允许清空色值</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable</td><td>是否允许使用编辑框</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">edit-mode</td><td>编辑色值类型</td><td><code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code></td><td class="text-center">否</td><td>&#39;hex&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable-modes</td><td>使用编辑框时，允许使用的色值格式</td><td><code>Array&lt;&#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;&gt;</code></td><td class="text-center">否</td><td>() =&gt; [&#39;rgb&#39;, &#39;hsl&#39;, &#39;hsv&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-swatch</td><td>是否显示色板</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">swatches</td><td>色板数据</td><td><code>Array&lt;{ name: string; value: string } | string&gt;</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">recently-colors</td><td>是否启用最近使用的颜色<br>这个数据只会存储在本地</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">custom-colors</td><td>是否允许用户保存自定义颜色<br>这个数据只会存储在本地</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>色值最终转换格式</td><td><code>&#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39; | &#39;hex&#39;</code></td><td class="text-center">否</td><td>&#39;hex&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>是否需要确认，如果为否，则在画板上的实时操作会及时通知更新</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-props</td><td>弹出的 <code>popover</code> 的 <code>props</code></td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">否</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-eye-dropper</td><td>是否允许使用 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`EyeDropper`);
      } else {
        return [
          createTextVNode("EyeDropper")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`，启用前请检查浏览器支持性</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-gradient</td><td>是否开启设置渐变色</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gradient-list</td><td>渐变色允许范围</td><td><code>Array&lt;&#39;linear&#39; | &#39;radial&#39; | &#39;conic&#39;&gt;</code></td><td class="text-center">否</td><td>() =&gt; [&#39;linear&#39;, &#39;radial&#39;, &#39;conic&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-on-input</td><td>是否在开启了 <code>editable</code> 后，输入框内输入的时候会直接更新颜色</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否传送到 <code>body</code> 节点</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="colorpicker-emits" class="no-underline h3"><a href="#colorpicker-emits" class="!no-underline">ColorPicker Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当 model-value 变化时触发</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>颜色值，格式由 format 指定</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-change</td><td rowspan="1">当面板中颜色时刻变化时触发</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>颜色值，格式由 format 指定</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:edit-mode</td><td rowspan="1">当 currentEditMode 改变时触发</td><td rowspan="1">( value: <code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>&#39;hex&#39; | &#39;rgb&#39; | &#39;hsl&#39; | &#39;hsv&#39;</code></td><td>编辑色值类型</td></tr></tbody></table><h3 id="colorpicker-exposes" class="no-underline h3"><a href="#colorpicker-exposes" class="!no-underline">ColorPicker Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">colorPicker</td><td rowspan="1">当 <code>triggerType</code> 为 <code>input</code> 时，可以获取到 <code>input</code> 对象</td><td rowspan="1"><code>Ref&lt;HTMLInputElement&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/ColorPicker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ColorPicker as default
};
