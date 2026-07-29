import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Radio.md","filePath":"en/demos/components/Radio.md"}');
const _sfc_main = { name: "en/demos/components/Radio.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Radio</h1><p class="description">Use <code>modelValue</code> to set the bound value</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Use <code>modelValue</code> to set the bound value</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-radio
        v-model="radio"
        :value="1"
        class="radio"
        @change="selectRadio"
      >
        Option 1
      </h-radio>
      <h-radio
        v-model="radio"
        :value="2"
        class="radio"
        @change="selectRadio"
      >
        Option 2
      </h-radio>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(1);

const selectRadio = (val: boolean) => {
  console.info('selectRadio ==> ', val);
};
<\/script>

<style scoped>
.radio + .radio {
  margin-left: 15px;
}
</style>
`,
    path: "demos/components/Radio/basic.vue"
  }, null, _parent));
  _push(`<h2 id="enable-border" tabindex="-1">Enable Border <a class="header-anchor" href="#enable-border" aria-label="Permalink to &quot;Enable Border&quot;">​</a></h2><p>Use <code>border = true</code> to enable border style, border mode supports <code>props.size</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">medium(default)</div>
      <h-radio
        v-model="radio"
        :value="1"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio>
      <h-radio
        v-model="radio"
        :value="2"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio>
    </h-col>
    <h-col :span="16">
      <div class="demo-title">large</div>
      <h-radio
        v-model="radio"
        :value="1"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio>
      <h-radio
        v-model="radio"
        :value="2"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);

const selectRadio = (val: boolean) => {
  console.info('selectRadio ==> ', val);
};
<\/script>

<style scoped>
.radio + .radio {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Radio/border.vue"
  }, null, _parent));
  _push(`<h2 id="button-style" tabindex="-1">Button Style <a class="header-anchor" href="#button-style" aria-label="Permalink to &quot;Button Style&quot;">​</a></h2><p>Just replace the <code>n-radio</code> element with the <code>n-radio-button</code> element, and provide the <code>size</code> attribute to control the size</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">medium(default)</div>
      <h-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio-button>
      <h-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio-button>
    </h-col>
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio-button>
      <h-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio-button>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const radio = ref(1);

const selectRadio = (val: boolean) => {
  console.info('selectRadio ==> ', val);
};
<\/script>

<style scoped>
.radio + .radio {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Radio/button.vue"
  }, null, _parent));
  _push(`<h2 id="radio-group" tabindex="-1">Radio Group <a class="header-anchor" href="#radio-group" aria-label="Permalink to &quot;Radio Group&quot;">​</a></h2><p>Combine <code>n-radio-group</code> with <code>n-radio</code> or <code>n-radio-button</code> to implement radio groups for multiple mutually exclusive options</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <div class="demo-title">medium(default)</div>
      <h-radio-group v-model="modelValue" size="medium">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-col>

    <h-col :span="24">
      <div class="demo-title">large</div>
      <h-radio-group v-model="modelValue" size="large" :disabled="true">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue = ref<string>('Shanghai');

const radioGroupOptions = ref([
  {
    label: 'Shanghai',
  },
  {
    label: 'Beijing',
  },
  {
    label: 'Guangzhou',
  },
  {
    label: 'Shenzhen',
  },
]);
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Radio/group.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2><p>Set <code>disabled = true</code> to enable disabled state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="grid">
    <div>
      <h-radio :disabled="true" :value="1">禁用</h-radio>
    </div>
    <div>
      <h-radio v-model="modelValue1" :disabled="true" :value="2">已选禁用</h-radio>
    </div>
    <div>
      <h-radio v-model="modelValue2" :value="3">非禁用</h-radio>
    </div>
    <div>
      <h-radio :disabled="true" :value="1" :border="true">禁用</h-radio>
    </div>
    <div>
      <h-radio v-model="modelValue1" :disabled="true" :value="2" :border="true">已选禁用</h-radio>
    </div>
    <div>
      <h-radio v-model="modelValue2" :value="3" :border="true">非禁用</h-radio>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue1 = ref(2);
const modelValue2 = ref(true);
<\/script>

<style scoped>
.grid {
  max-width: 500px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-area: 40;
}

.grid > div {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
`,
    path: "demos/components/Radio/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="_2-0-0-version-changes" tabindex="-1">2.0.0 Version Changes <a class="header-anchor" href="#_2-0-0-version-changes" aria-label="Permalink to &quot;2.0.0 Version Changes&quot;">​</a></h2><p>Since <code>2.0.0</code>, <code>small</code> is no longer part of the specification:</p><p>① The original <code>size=&#39;small&#39;</code> will automatically be treated as <code>size=&#39;medium&#39;</code></p><p>② The original <code>small</code> size is consistent with the current <code>medium</code> size</p><p>③ The original <code>medium</code> size is consistent with the current <code>large</code> size</p><p>④ The original <code>large</code> size has been removed</p><h2>Radio Api</h2><h3>Radio Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "value" }, null, _parent));
  _push(`</td><td>单选框对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否显示边框</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框对应尺寸，仅在开启border有效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Radio Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table><h2>RadioButton Api</h2><h3>RadioButton Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "value" }, null, _parent));
  _push(`</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框按钮对应尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fill</td><td>填充色<br>支持全部主题色</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>RadioButton Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table><h2>RadioGroup Api</h2><h3>RadioGroup Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框(按钮)组</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框组尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code>，会设置给子元素</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>RadioGroup Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Radio.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Radio as default
};
