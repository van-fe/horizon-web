import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Checkbox.md","filePath":"en/demos/components/Checkbox.md"}');
const _sfc_main = { name: "en/demos/components/Checkbox.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Checkbox</h1><p class="description">Use <code>modelValue</code> to set the bound value</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Use <code>modelValue</code> to set the bound value</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        @change="selectCheckbox"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxOptions = ref([
  {
    key: 1,
    label: 'checked',
    checked: true,
  },
  {
    key: 2,
    label: 'unchecked',
    checked: false,
  },
]);

const selectCheckbox = (val: boolean) => {
  console.info('selectCheckbox ==> ', val);
};
<\/script>

`,
    path: "demos/components/Checkbox/basic.vue"
  }, null, _parent));
  _push(`<h2 id="enable-border" tabindex="-1">Enable Border <a class="header-anchor" href="#enable-border" aria-label="Permalink to &quot;Enable Border&quot;">​</a></h2><p>Use <code>border = true</code> to enable border style, border mode supports <code>props.size</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">medium(default)</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        :border="true"
        class="checkbox"
        @change="selectCheckbox"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">large</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        :border="true"
        class="checkbox"
        size="large"
        @change="selectCheckbox"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxOptions = ref([
  {
    key: 1,
    label: 'checked',
    checked: true,
  },
  {
    key: 2,
    label: 'unchecked',
    checked: false,
  },
]);

const selectCheckbox = (val: boolean) => {
  console.info('selectCheckbox ==> ', val);
};
<\/script>

<style scoped>
.checkbox + .checkbox {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Checkbox/border.vue"
  }, null, _parent));
  _push(`<h2 id="button-style" tabindex="-1">Button Style <a class="header-anchor" href="#button-style" aria-label="Permalink to &quot;Button Style&quot;">​</a></h2><p>Just replace the <code>n-checkbox</code> element with the <code>n-checkbox-button</code> element, and provide the <code>size</code> attribute to control the size</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">medium(default)</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        class="checkbox"
        :label="item.label"
      />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">large</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        size="large"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkBoxOptions = ref([
  {
    key: 1,
    label: 'checked',
    checked: true,
  },
  {
    key: 2,
    label: 'unchecked',
    checked: false,
  },
]);
<\/script>
`,
    path: "demos/components/Checkbox/button.vue"
  }, null, _parent));
  _push(`<h2 id="indeterminate-mode" tabindex="-1">Indeterminate Mode <a class="header-anchor" href="#indeterminate-mode" aria-label="Permalink to &quot;Indeterminate Mode&quot;">​</a></h2><p>Set <code>props.indeterminate</code> to enable indeterminate mode</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="onCheckAllChanged">Check All</h-checkbox>
    </h-col>

    <h-col :span="24">
      <h-checkbox-group v-model="checked" @change="selectCheckbox">
        <h-checkbox label="1" class="checkbox">
          option 1
        </h-checkbox>
        <h-checkbox label="2" class="checkbox">
          option 2
        </h-checkbox>
      </h-checkbox-group>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const checkAll = ref(false);

const checked = ref<string[]>(['1']);

const indeterminate = computed(() => checked.value.length > 0 && checked.value.length < 2);

const selectCheckbox = (val: string[]) => {
  console.info('selectCheckbox ==> ', val);
  checkAll.value = val.length === 2;
};

function onCheckAllChanged(val: boolean) {
  if (val) {
    checked.value = ['1', '2'];
  } else {
    checked.value = [];
  }
}
<\/script>

<style scoped>
.checkbox + .checkbox {
  margin-left: 15px;
}
</style>
`,
    path: "demos/components/Checkbox/indeterminate.vue"
  }, null, _parent));
  _push(`<h2 id="checkbox-group" tabindex="-1">Checkbox Group <a class="header-anchor" href="#checkbox-group" aria-label="Permalink to &quot;Checkbox Group&quot;">​</a></h2><p>Combine <code>n-checkbox-group</code> with <code>n-checkbox</code> or <code>n-checkbox-button</code> to implement checkbox groups</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <div class="demo-title">medium(default)</div>
      <h-checkbox-group disabled>
        <h-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </h-checkbox-group>
    </h-col>

    <h-col :span="24">
      <div class="demo-title">large</div>
      <h-checkbox-group size="large">
        <h-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </h-checkbox-group>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxGroupOptions = ref([
  {
    label: 'Shanghai',
    checked: true,
  },
  {
    label: 'Beijing',
    checked: false,
  },
  {
    label: 'Guangzhou',
    checked: false,
  },
  {
    label: 'Shenzheng',
    checked: false,
  },
]);
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Checkbox/group.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2><p>Set <code>disabled = true</code> to enable disabled state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="grid">
    <div>
      <h-checkbox :model-value="false" :disabled="true">禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" indeterminate :disabled="true">半选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue1" :disabled="true">已选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue2">非禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" :disabled="true" :border="true">禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" indeterminate :disabled="true" :border="true">半选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue1" :disabled="true" :border="true">已选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue2" :border="true">非禁用</h-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue1 = ref(true);
const modelValue2 = ref(true);
<\/script>

<style scoped>
.grid {
  display: grid;
  max-width: 600px;
  grid-template-columns: repeat(4, 1fr);
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
    path: "demos/components/Checkbox/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="one-click-inverse-selection" tabindex="-1">One-Click Inverse Selection <a class="header-anchor" href="#one-click-inverse-selection" aria-label="Permalink to &quot;One-Click Inverse Selection&quot;">​</a></h2><p>Use the exposed <code>toggle()</code> method to implement one-click inverse selection</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
    <h-row>
      <h-col :span="24">
        <h-button @click="inverse">toggle</h-button>
      </h-col>
      <h-col :span="24">
        <h-checkbox
          v-for="(item, index) in checkboxOptions"
          :ref="el => (myRefs[index] = el)"
          :key="item.key"
          v-model="item.checked"
          :label="item.label"
          class="checkbox"
          @change="selectCheckbox"
        />
      </h-col>
    </h-row>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  const checkboxOptions = ref([
    {
      key: 1,
      label: 'checkbox1',
      checked: true,
    },
    {
      key: 2,
      label: 'checkbox2',
      checked: false,
    },
    {
      key: 3,
      label: 'checkbox3',
      checked: false,
    },
    {
      key: 4,
      label: 'checkbox4',
      checked: true,
    },
    {
      key: 5,
      label: 'checkbox5',
      checked: true,
    },
    {
      key: 6,
      label: 'checkbox6',
      checked: false,
    },
  ]);

  const myRefs = ref([]);

  const selectCheckbox = (val: boolean) => {
    console.info('selectCheckbox ==> ', val);
  };

  const inverse = () => {
    myRefs.value.forEach((item: any) => {
      item.toggle();
    });
  };
  <\/script>
  
  <style scoped>
  .checkbox + .checkbox {
    margin-left: 15px;
  }
  </style>`,
    path: "demos/components/Checkbox/inverse.vue"
  }, null, _parent));
  _push(`<h2 id="v2-version-changes" tabindex="-1">v2 Version Changes <a class="header-anchor" href="#v2-version-changes" aria-label="Permalink to &quot;v2 Version Changes&quot;">​</a></h2><p>Since <code>2.0.0</code>, <code>small</code> is no longer part of the specification:</p><p>① The original <code>size=&#39;small&#39;</code> will automatically be treated as <code>size=&#39;medium&#39;</code></p><p>② The original <code>small</code> size is consistent with the current <code>medium</code> size</p><p>③ The original <code>medium</code> size is consistent with the current <code>large</code> size</p><p>④ The original <code>large</code> size has been removed</p><h2>Checkbox Api</h2><h3>Checkbox Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>Array&lt;CheckboxUnionType&gt; | CheckboxUnionType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>多选框对应的值（只有在checkbox-group或者modelValueType为array时有效）</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">true-label</td><td>选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">false-label</td><td>未选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否显示边框</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indeterminate</td><td>中间状态，用以表示 checkbox 的不确定,仅控制样式<br>一般用以显示全选效果</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框对应尺寸，仅在开启border有效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Checkbox Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h3>Checkbox Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toggle</td><td rowspan="1">切换checkbox的选中状态</td><td rowspan="1">( ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr></tbody></table><h2>CheckboxButton Api</h2><h3>CheckboxButton Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>Array&lt;CheckboxUnionType&gt; | CheckboxUnionType</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>多选框按钮对应的值（只有在checkbox-group或者modelValueType为array时有效）</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">true-label</td><td>选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">false-label</td><td>未选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框按钮对应尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fill</td><td>填充色</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr></tbody></table><h3>CheckboxButton Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h2>CheckboxGroup Api</h2><h3>CheckboxGroup Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值数组</td><td><code>Array&lt;string | boolean | number&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框(按钮)组</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框按钮组对应尺寸<br>对Checkbox无作用</td><td><code>&#39;large&#39; | &#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>CheckboxGroup Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Checkbox.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Checkbox as default
};
