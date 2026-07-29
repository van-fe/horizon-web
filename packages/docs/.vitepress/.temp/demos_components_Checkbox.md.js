import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Checkbox.md","filePath":"zh/demos/components/Checkbox.md"}');
const _sfc_main = { name: "demos/components/Checkbox.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Checkbox</h1><p class="description">一组备选项中进行多选</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>用 <code>modelValue</code> 设置绑定值</p>`);
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
  _push(`<h2 id="开启边框" tabindex="-1">开启边框 <a class="header-anchor" href="#开启边框" aria-label="Permalink to &quot;开启边框&quot;">​</a></h2><p>使用 <code>border = true</code> 可开启边框样式，边框模式支持 <code>props.size</code></p>`);
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
  _push(`<h2 id="按钮样式" tabindex="-1">按钮样式 <a class="header-anchor" href="#按钮样式" aria-label="Permalink to &quot;按钮样式&quot;">​</a></h2><p>只需要把<code>n-checkbox</code>元素换成<code>n-checkbox-button</code>元素即可，同时提供<code>size</code>属性控制大小</p>`);
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
  _push(`<h2 id="半选模式" tabindex="-1">半选模式 <a class="header-anchor" href="#半选模式" aria-label="Permalink to &quot;半选模式&quot;">​</a></h2><p>设置 <code>props.indeterminate</code> 开启半选模式</p>`);
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
  _push(`<h2 id="多选框组" tabindex="-1">多选框组 <a class="header-anchor" href="#多选框组" aria-label="Permalink to &quot;多选框组&quot;">​</a></h2><p>结合<code>n-checkbox-group</code>和<code>n-checkbox</code>或者<code>n-checkbox-button</code>可以实现复选框组</p>`);
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
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2><p>设置 <code>disabled = true</code> 即可开启禁用</p>`);
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
  _push(`<h2 id="一键反选" tabindex="-1">一键反选 <a class="header-anchor" href="#一键反选" aria-label="Permalink to &quot;一键反选&quot;">​</a></h2><p>使用暴露出的 <code>toggle()</code> 方法实现一键反选</p>`);
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
  _push(`<h2>Checkbox Api</h2><h3>Checkbox Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>Array&lt;CheckboxUnionType&gt; | CheckboxUnionType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>多选框对应的值（只有在checkbox-group或者modelValue类型为array时有效）</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">true-label</td><td>选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">false-label</td><td>未选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否显示边框</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indeterminate</td><td>中间状态，用以表示 checkbox 的不确定,仅控制样式<br>一般用以显示全选效果</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框对应尺寸，仅在开启border有效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Checkbox Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h3>Checkbox Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toggle</td><td rowspan="1">切换checkbox的选中状态</td><td rowspan="1">( ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr></tbody></table><h2>CheckboxButton Api</h2><h3>CheckboxButton Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>Array&lt;CheckboxUnionType&gt; | CheckboxUnionType</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>多选框按钮对应的值（只有在checkbox-group或者modelValue类型为array时有效）</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">true-label</td><td>选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">false-label</td><td>未选中时的值</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框按钮对应尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fill</td><td>填充色</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr></tbody></table><h3>CheckboxButton Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h2>CheckboxGroup Api</h2><h3>CheckboxGroup Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值数组</td><td><code>Array&lt;string | boolean | number&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用多选框(按钮)组</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>多选框按钮组对应尺寸<br>对Checkbox无作用</td><td><code>&#39;large&#39; | &#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewable</td><td>开启只读模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>CheckboxGroup Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">绑定值变化时触发的事件</td><td rowspan="1">( value: <code>CheckboxUnionType | CheckboxUnionType[] | boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType | CheckboxUnionType[] | boolean</code></td><td>复选框的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">当失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Checkbox.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Checkbox as default
};
