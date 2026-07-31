import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Radio.md","filePath":"zh/demos/components/Radio.md"}');
const _sfc_main = { name: "demos/components/Radio.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Radio</h1><p class="description">Radio 用来在一组备选项中进行单选</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>用 <code>modelValue</code> 设置绑定值</p>`);
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
  _push(`<h2 id="开启边框" tabindex="-1">开启边框 <a class="header-anchor" href="#开启边框" aria-label="Permalink to &quot;开启边框&quot;">​</a></h2><p>使用 <code>border = true</code> 可开启边框样式，边框模式支持 <code>props.size</code></p>`);
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
  _push(`<h2 id="按钮样式" tabindex="-1">按钮样式 <a class="header-anchor" href="#按钮样式" aria-label="Permalink to &quot;按钮样式&quot;">​</a></h2><p>只需要把<code>h-radio</code>元素换成<code>h-radio-button</code>元素即可，同时提供<code>size</code>属性控制大小</p>`);
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
  _push(`<h2 id="多选框组" tabindex="-1">多选框组 <a class="header-anchor" href="#多选框组" aria-label="Permalink to &quot;多选框组&quot;">​</a></h2><p>结合<code>h-radio-group</code>和<code>h-radio</code>或者<code>h-radio-button</code>可以实现单选框组，用于多个互斥选项</p>`);
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
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2><p>设置 <code>disabled = true</code> 即可开启禁用</p>`);
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
  _push(`<h2 id="radio-api" class="no-underline h2"><a href="#radio-api" class="!no-underline">Radio Api</a></h2><h3 id="radio-props" class="no-underline h3"><a href="#radio-props" class="!no-underline">Radio Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "value" }, null, _parent));
  _push(`</td><td>单选框对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否显示边框</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框对应尺寸，仅在开启border有效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="radio-emits" class="no-underline h3"><a href="#radio-emits" class="!no-underline">Radio Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table><h2 id="radiobutton-api" class="no-underline h2"><a href="#radiobutton-api" class="!no-underline">RadioButton Api</a></h2><h3 id="radiobutton-props" class="no-underline h3"><a href="#radiobutton-props" class="!no-underline">RadioButton Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "value" }, null, _parent));
  _push(`</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>单选框按钮对应的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框按钮对应尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fill</td><td>填充色<br>支持全部主题色</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="radiobutton-emits" class="no-underline h3"><a href="#radiobutton-emits" class="!no-underline">RadioButton Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table><h2 id="radiogroup-api" class="no-underline h2"><a href="#radiogroup-api" class="!no-underline">RadioGroup Api</a></h2><h3 id="radiogroup-props" class="no-underline h3"><a href="#radiogroup-props" class="!no-underline">RadioGroup Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>string | number | boolean</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用单选框(按钮)组</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>单选框组尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>同原生 <code>name</code>，会设置给子元素</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="radiogroup-emits" class="no-underline h3"><a href="#radiogroup-emits" class="!no-underline">RadioGroup Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>string | number | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number | boolean</code></td><td>选中的 value 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Radio.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Radio as default
};
