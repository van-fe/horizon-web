import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/TreeSelect.md","filePath":"en/demos/components/TreeSelect.md"}');
const _sfc_main = { name: "en/demos/components/TreeSelect.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>TreeSelect</h1><p class="description">Combines <code>Picker</code> and <code>Tree</code> components, so most configurations of the <code>Tree</code> component can be passed directly</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Combines <code>Picker</code> and <code>Tree</code> components, so most configurations of the <code>Tree</code> component can be passed directly</p><p><strong>Considering operational convenience, <code>TreeSelect</code> temporarily does not allow drag sorting</strong></p><p><strong>Note: <code>value</code> in <code>tree-data</code> must be unique throughout the entire tree</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-model="value"
        :tree-data="baseTreeData"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :to-body="false"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        v-model="values"
        :tree-data="baseTreeData"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :multiple="true"
        :to-body="false"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref('feedback');
const values = ref<string[]>([]);

const size = ref('medium');
const inputStyle = ref('normal');
const disabled = ref(false);
const baseTreeData = ref([]);

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });

  values.value.push('disciplines', 'feedback');
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/basic.vue"
  }, null, _parent));
  _push(`<h2 id="clearable" tabindex="-1">Clearable <a class="header-anchor" href="#clearable" aria-label="Permalink to &quot;Clearable&quot;">​</a></h2><p>Set <code>clearable = true</code> to clear selected items when there is a value</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :clearable="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :clearable="true" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref();

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/clearable.vue"
  }, null, _parent));
  _push(`<h2 id="single-selection" tabindex="-1">Single Selection <a class="header-anchor" href="#single-selection" aria-label="Permalink to &quot;Single Selection&quot;">​</a></h2><p>You can enable <code>show-radio</code> to make <code>Radio</code> components appear before leaf nodes</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">普通单选</div>
      <h-tree-select v-model="value1" :tree-data="baseTreeData" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">有 Radio 组件</div>
      <h-tree-select v-model="value2" :tree-data="baseTreeData" :show-radio="true" :collapse="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value1 = ref();
const value2 = ref();

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/single.vue"
  }, null, _parent));
  _push(`<h2 id="multiple-selection" tabindex="-1">Multiple Selection <a class="header-anchor" href="#multiple-selection" aria-label="Permalink to &quot;Multiple Selection&quot;">​</a></h2><p>Like <code>select</code>, the tags for multiple selection use <code>h-tag</code> and <code>h-tag-group</code> components combined</p><p>By default, selected items are not collapsed. You can configure <code>collapse-tags = true</code> to collapse selected items</p><p>In addition, you can configure <code>collapse-tags-tooltip = true</code> to display other selected items when hovering over <code>+N</code>, and you can quickly deselect selected items</p><p>In addition, if your <code>select</code> space is very small, it may be squeezed to only <code>+N</code>. You can configure <code>max-collapse-tags</code> to force how many selected items to display, and the rest will be collapsed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">普通多选</div>
      <h-tree-select v-model="values1" :tree-data="baseTreeData" :multiple="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">折叠多选</div>
      <h-tree-select v-model="values2" :tree-data="baseTreeData" :multiple="true" :collapse="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-tree-select v-model="values3" :tree-data="baseTreeData" :multiple="true" :collapse="true" :collapse-tags-tooltip="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-tree-select v-model="values4" :tree-data="baseTreeData" :multiple="true" :collapse="true" :collapse-tags-tooltip="true" :max-collapse-tags="3" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values1 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values2 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values3 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values4 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/multiple.vue"
  }, null, _parent));
  _push(`<h2 id="multiple-selection-limit" tabindex="-1">Multiple Selection Limit <a class="header-anchor" href="#multiple-selection-limit" aria-label="Permalink to &quot;Multiple Selection Limit&quot;">​</a></h2><p>If you want to limit the number of user selections in multiple selection, configure <code>multiple-limit</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">最多勾选3个</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :multiple="true"
        :multiple-limit="3"
        :check-strictly="checkStrictly"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const checkStrictly = ref<boolean>(false);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/multiple-limit.vue"
  }, null, _parent));
  _push(`<h2 id="parent-child-node-strict-mode" tabindex="-1">Parent-Child Node Strict Mode <a class="header-anchor" href="#parent-child-node-strict-mode" aria-label="Permalink to &quot;Parent-Child Node Strict Mode&quot;">​</a></h2><p>You can control whether parent-child nodes are strictly controlled by setting <code>check-strictly</code></p><p>If set to <code>true</code>, you can select any node that is not in <code>disabled</code> state</p><p>If set to <code>false</code>, you cannot expand <code>disabled</code> nodes, and you cannot select their subordinate nodes</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :check-strictly="checkStrictly" :show-radio="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :check-strictly="checkStrictly" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref();
const checkStrictly = ref(false);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/check-strictly.vue"
  }, null, _parent));
  _push(`<h2 id="expand-and-selection-control" tabindex="-1">Expand and Selection Control <a class="header-anchor" href="#expand-and-selection-control" aria-label="Permalink to &quot;Expand and Selection Control&quot;">​</a></h2><p>Through <code>expand-on-click-node</code> configuration, you can control whether to allow expanding child nodes when clicking the entire node row (default is <code>true</code>)</p><p><code>check-on-click-node</code> controls whether to allow selecting child nodes when clicking the entire node row (default is <code>false</code>)</p><p><strong><code>check-on-click-node</code> is only effective for multiple selection</strong></p><p><strong>But if single selection is configured with <code>check-strictly = true</code>, please also note the configuration of <code>expand-on-click-node</code> <code>check-on-click-node</code> to optimize click operations</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="点击整行折叠">
      <h-switch v-model="expandOnClickNode" :status="true" />
    </h-form-item>
    <h-form-item label="点击整行选中">
      <h-switch v-model="checkOnClickNode" :status="true" />
    </h-form-item>
    <h-form-item label="是否忽略父子级关系">
      <h-switch v-model="checkStrictly" :status="true" />
    </h-form-item>
    <h-form-item label="是否显示 Radio">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :show-radio="showRadio"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const expandOnClickNode = ref(true);
const checkOnClickNode = ref(false);
const checkStrictly = ref(false);
const showRadio = ref(false);
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/expand-and-check.vue"
  }, null, _parent));
  _push(`<h2 id="optimize-selection-operation" tabindex="-1">Optimize Selection Operation <a class="header-anchor" href="#optimize-selection-operation" aria-label="Permalink to &quot;Optimize Selection Operation&quot;">​</a></h2><p>Starting from <code>2.3.5</code>, by default, when clicking a leaf node, the node is automatically selected</p><p>If you still want to control that leaf nodes are only selected when clicking the <code>checkbox</code>, you can set <code>check-on-click-leaf = false</code></p><p>For single selection, <code>check-on-click-leaf</code> is only effective when <code>show-radio = true</code>, otherwise it will be selected on click regardless</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="显示单选框">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
    <h-form-item label="点击叶子节点勾选">
      <h-switch v-model="expandOnClickLeaf" :status="true" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :show-radio="showRadio"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const showRadio = ref(false);
const expandOnClickLeaf = ref(true);
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/check-on-leaf.vue"
  }, null, _parent));
  _push(`<h2 id="control-expand" tabindex="-1">Control Expand <a class="header-anchor" href="#control-expand" aria-label="Permalink to &quot;Control Expand&quot;">​</a></h2><p>Through <code>expand-values</code>, you can control the expanded fields, or use two-way binding to get the expanded values</p><p>If you don&#39;t want to automatically expand the parent, you need to set <code>is-default-expand-parent = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(0)">修改</h-button> {{ expandValues[0].value }}</div>
      <h-tree-select
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[0].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(1)">修改</h-button> {{ expandValues[1].value }}</div>
      <h-tree-select
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[1].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选 - 父级不默认展开</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(2)">修改</h-button> {{ expandValues[2].value }}</div>
      <h-tree-select
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[2].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选 - 父级不默认展开</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(3)">修改</h-button> {{ expandValues[3].value }}</div>
      <h-tree-select
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[3].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const expandValues = [
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
];

function change(index: number) {
  expandValues[index].value = ['basic', 'form'];
}


onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/expand-values.vue"
  }, null, _parent));
  _push(`<h2 id="default-expand-all" tabindex="-1">Default Expand All <a class="header-anchor" href="#default-expand-all" aria-label="Permalink to &quot;Default Expand All&quot;">​</a></h2><p>Set <code>is-default-expand-all = true</code> to expand all data</p><p>But note that if the data is obtained asynchronously, you need to render after getting the data</p><p>In the <code>demo</code>, <code>v-if</code> is used for processing</p><p>And it is only effective during initialization. Later changes to <code>tree-data</code> will not be processed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/default-expand-all.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>In the <code>tree-data</code> data, setting <code>disabled = true</code> for an item can disable that item</p><p>But if you want to disable the entire tree, you can directly give <code>disabled = true</code> to <code>h-tree</code></p><p>But regardless of the disable method, it will not affect the expand function</p><p>The disabled state of child levels will also be affected by the parent-child association configuration</p><p>If in multiple selection state, you want the parent node selection to be able to change the selected state of disabled child nodes, then <code>parent-effect-disabled-child</code> needs to be set to <code>true</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="整体是否禁用">
      <h-switch v-model="disabled" :status="true" />
    </h-form-item>
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
    <h-form-item label="父节点点选是否能更改禁用的子节点的状态">
      <h-switch v-model="parentEffectDisabledChild" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const disabled = ref(false);
const checkStrictly = ref(false);
const parentEffectDisabledChild = ref(false);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data-disabled.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="custom-expand-icon" tabindex="-1">Custom Expand Icon <a class="header-anchor" href="#custom-expand-icon" aria-label="Permalink to &quot;Custom Expand Icon&quot;">​</a></h2><p>You can configure <code>fold-icon</code> to customize the expand icon</p><p>If you need to use clockwise rotation <code>90°</code> during the expand state switching process, leave <code>expand-icon</code> empty</p><p>If the expand state cannot be displayed using animation, please also set both <code>expand-icon</code> and <code>fold-icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选-加减符号</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选-加减符号</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import { IconArrowRight, IconAdd, IconReduce } from '@aurora/icon';

const baseTreeData = ref([]);

const customIcon = h(IconArrowRight, {
  size: 12,
});

const customIconFold = h(IconAdd, {
  size: 12,
});

const customIconExpand = h(IconReduce, {
  size: 12,
});

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/expand-icon.vue"
  }, null, _parent));
  _push(`<h2 id="option-statistics" tabindex="-1">Option Statistics <a class="header-anchor" href="#option-statistics" aria-label="Permalink to &quot;Option Statistics&quot;">​</a></h2><p>Pass in <code>use-statistic = true</code> to count multiple selections</p><p>You can set <code>statistic-text</code> to specify the statistical text</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">默认国际化配置</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" :multiple="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">自定义为“组件”</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" statistic-text="组件" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref([]);

const size = ref('medium');
const inputStyle = ref('normal');
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/statistic.vue"
  }, null, _parent));
  _push(`<h2 id="filter" tabindex="-1">Filter <a class="header-anchor" href="#filter" aria-label="Permalink to &quot;Filter&quot;">​</a></h2><p>Set <code>filterable = true</code> to enable filtering</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/filter.vue"
  }, null, _parent));
  _push(`<h2 id="filter-reserve-keyword" tabindex="-1">Filter Reserve Keyword <a class="header-anchor" href="#filter-reserve-keyword" aria-label="Permalink to &quot;Filter Reserve Keyword&quot;">​</a></h2><p>In the case of filter + multiple selection, setting <code>reserve-keyword</code> can set three modes of reserving keywords</p><p><code>true</code>: Reserve keyword</p><p><code>false</code>: Do not reserve keyword</p><p><code>&#39;reserve-deselect&#39;</code>: Only reserve keyword when deselecting</p><p><code>&#39;reserve-special&#39;</code>: Do not reserve keyword, but still reserve the filtered content. Only after the user manually clears the input text or loses focus on the input box will the filtered content change</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        保留关键字（默认）
      </div>
      <h-tree-select v-model="values1" :tree-data="baseTreeData" :filterable="true" :multiple="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        不保留关键字
      </div>
      <h-tree-select v-model="values2" :tree-data="baseTreeData" :filterable="true" :multiple="true" :reserve-keyword="false" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        仅在反选时保留，正选不保留
        <h-tooltip>
          <template #content>
            考虑了过滤时反选的操作便捷性
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-tree-select v-model="values3" :tree-data="baseTreeData" :filterable="true" :multiple="true" reserve-keyword="reserve-deselect" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        不保留关键字，但过滤内容特殊处理
        <h-tooltip content="用户手动清空输入文字或失焦输入框后，才会改变过滤内容">
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-tree-select v-model="values4" :tree-data="baseTreeData" :filterable="true" :multiple="true" reserve-keyword="reserve-special" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AIcon } from '@aurora/icon';

const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
const values4 = ref([]);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});

<\/script>
`,
    path: "demos/components/TreeSelect/reserve-keyword.vue"
  }, null, _parent));
  _push(`<h2 id="filter-in-panel" tabindex="-1">Filter in Panel <a class="header-anchor" href="#filter-in-panel" aria-label="Permalink to &quot;Filter in Panel&quot;">​</a></h2><p>If you don&#39;t want to filter input directly in the trigger, <code>TreeSelect</code> provides two methods (both require enabling <code>panel-filterable</code> first):</p><ol><li>Built-in input panel: Enable <code>use-build-in-panel-filter</code></li><li>Use custom slot: Place your input box through the <code>slots.panelPrefix</code> slot, then pass in the filtered content through <code>panel-filter-input-value</code></li></ol>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">内置面板</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :panel-filterable="true"
        :use-build-in-panel-filter="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">自定义插槽</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :panel-filterable="true"
        :panel-filter-input-value="filterValue"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      >
        <template #panelHeaderRender>
          <h-input v-model="filterValue" class="filter-input" />
        </template>
      </h-tree-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const filterValue = ref();

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
.filter-input {
  padding: 10px;
}
</style>
`,
    path: "demos/components/TreeSelect/filter-in-panel.vue"
  }, null, _parent));
  _push(`<h2 id="filter-and-highlight" tabindex="-1">Filter and Highlight <a class="header-anchor" href="#filter-and-highlight" aria-label="Permalink to &quot;Filter and Highlight&quot;">​</a></h2><p>The default highlight color is brand color. If you want to process search results, you can process them through <code>highlightMethod</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import type { HTreeHighlightMethod, HExtendTreeNodeData } from '@aurora/horizon-web';

const baseTreeData = ref([]);

const highlightMethod: HTreeHighlightMethod = (inputValue, node) => {
  if (!node) return '';

  if (inputValue) {
    return h('span', {
      innerHTML: (node.label as string).replace(new RegExp(inputValue, 'ig'),
        substring => \`<span class='kw'>\${substring}</span>\`),
    });
  } else {
    return node.stringLabel ?? '';
  }
};

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style>
.kw {
  color: var(--h-text-error-default);
}
</style>
`,
    path: "demos/components/TreeSelect/highlight-filter.vue"
  }, null, _parent));
  _push(`<h2 id="dynamic-load" tabindex="-1">Dynamic Load <a class="header-anchor" href="#dynamic-load" aria-label="Permalink to &quot;Dynamic Load&quot;">​</a></h2><p>If a node&#39;s child nodes need to use dynamic loading, you need to set the node&#39;s <code>isLeaf</code> attribute to <code>false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      {{ dynamicTreeData }}
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeDynamicLoadNode, HTreeNodeData } from '@aurora/horizon-web';

const dynamicTreeData = ref<HTreeNodeData[]>([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        isLeaf: false,
        children: [],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        isLeaf: false,
        children: [],
      },
    ],
  },
]);

const dynLoad = (data: HTreeDynamicLoadNode) => {
  console.info(data, data.node);

  return new Promise<HTreeNodeData[]>((resolve, reject) => {
    if (!data.node) return reject();

    setTimeout(
      () =>
        resolve(
          data.node!.value === 'disciplines'
            ? [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ]
            : [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
        ),
      2000,
    );
  });
};
<\/script>

<style scoped>
.tree-box {
  max-height: 300px;
  overflow: auto;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  flex-shrink: 0;
  flex-basis: 340px;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.1), 0px 6px 16px rgba(0, 0, 0, 0.06),
    0px 9px 28px 8px rgba(0, 0, 0, 0.03);
}
</style>
`,
    path: "demos/components/TreeSelect/dynamic-load.vue"
  }, null, _parent));
  _push(`<h2 id="custom-node" tabindex="-1">Custom Node <a class="header-anchor" href="#custom-node" aria-label="Permalink to &quot;Custom Node&quot;">​</a></h2><p>You can customize node rendering through the <code>treeNodeRender</code> slot</p><p>You can also set <code>label</code> to <code>((option: HTreeData) =&gt; VNode)</code> type when passing in <code>tree-data</code> to customize a fixed node. At this time, the priority is higher than the <code>treeNodeRender</code> slot</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">自定义渲染全部节点</div>

      <h-tree-select :tree-data="baseTreeData" :multiple="true" :to-body="false">
        <template #treeNodeRender="{ data }">
          <div class="tree-item">
            {{ data.label }} ({{ data.value }})
            <h-dropdown @command="action">
              <h-button icon="ellipsis" type="normal" size="small" :text="true" @click.stop />
              <h-dropdown-menu>
                <h-dropdown-item command="view" icon="eye">查看</h-dropdown-item>
                <h-dropdown-item command="edit" icon="edit">修改</h-dropdown-item>
              </h-dropdown-menu>
            </h-dropdown>
          </div>
        </template>
      </h-tree-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">自定义渲染指定节点</div>

      <h-tree-select :tree-data="renderTreeData" :multiple="true" :to-body="false">
        <template #treeNodeRender="{ data }">
          <div>{{ data.label }} ({{ data.value }})</div>
        </template>
      </h-tree-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const renderTreeData = ref<HTreeNodeData[]>([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
      },
      {
        value: 'navigation',
        label: (data: any) =>
          h(
            'div',
            {
              style: 'color: var(--h-text-warning-default)',
            },
            ['😂 ', data.value],
          ),
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
]);

function action(command: unknown) {
  $message.success(command as 'view' | 'edit');
}
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
.tree-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
}
</style>
`,
    path: "demos/components/TreeSelect/custom-render.vue"
  }, null, _parent));
  _push(`<h2 id="field-mapping" tabindex="-1">Field Mapping <a class="header-anchor" href="#field-mapping" aria-label="Permalink to &quot;Field Mapping&quot;">​</a></h2><p>Use <code>field-map</code> to customize mapped fields</p><p>In this example, <code>label</code> uses <code>text</code>, <code>value</code> uses <code>key</code>, <code>children</code> uses <code>items</code></p><p><strong>Note: It is forbidden to override fields with original meanings in the new mapping definition. For example, you cannot use <code>value</code> as the field mapping of <code>label</code>, otherwise it will cause errors</strong></p><p>For <code>ts</code> type error issues, you can solve it by declaring the <code>HTreeExtendsData</code> type globally (using the fields in the following <code>demo</code> as an example):</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { HTreeExtendsData } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">declare</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> module</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">  interface</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HTreeExtendsData</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    key</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    text</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    items</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HTreeExtendsData</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[];</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
      >
        <template #treeNodeRender="{data}">
          {{ data.label }}
        </template>
      </h-tree-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/field-map-options.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/field-map.vue"
  }, null, _parent));
  _push(`<h2 id="virtual-scroll" tabindex="-1">Virtual Scroll <a class="header-anchor" href="#virtual-scroll" aria-label="Permalink to &quot;Virtual Scroll&quot;">​</a></h2><p>In the case of large data volumes, too many nodes will cause performance degradation, so you can use virtual scrolling capability</p><p>You need to configure <code>use-virtual-scroll = true</code>, and either <code>height</code> or <code>max-height</code> can enable virtual scrolling</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :is-default-expand-all="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :is-default-expand-all="true"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/TreeSelect/virtual-scroll.vue"
  }, null, _parent));
  _push(`<h2 id="unselectable" tabindex="-1">Unselectable <a class="header-anchor" href="#unselectable" aria-label="Permalink to &quot;Unselectable&quot;">​</a></h2><p>When passing in <code>options</code>, you can set <code>selectable = false</code> to disallow selection of this item (but expansion is not limited)</p><p>Unlike <code>disabled</code>, this configuration only affects the interaction between itself and the user, and will be affected by the selection state of parent and child levels to display different states</p><p>If single selection is enabled, it is best to use it with <code>show-radio = true</code>, otherwise the display form cannot see the difference</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-model="value"
        :tree-data="baseTreeData"
        :show-radio="true"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        v-model="values"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const value = ref();
const values = ref();

onMounted(() => {
  fetch(new URL('/unselectable-options.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>
`,
    path: "demos/components/TreeSelect/selectable.vue"
  }, null, _parent));
  _push(`<h2 id="treeselect-api" class="no-underline h2"><a href="#treeselect-api" class="!no-underline">TreeSelect Api</a></h2><h3 id="treeselect-props" class="no-underline h3"><a href="#treeselect-props" class="!no-underline">TreeSelect Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>HTreeSelectModelValueType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>Configuration for trigger.</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapseTags" }, null, _parent));
  _push(`</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags</td><td>Configuration for collapse tags.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-tooltip</td><td>Configuration for collapse tags tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-collapse-tags</td><td>Configuration for max collapse tags.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-fill-up</td><td>Configuration for collapse tags fill up.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapsed-tags-props</td><td>Configuration for collapsed tags props.</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>Configuration for placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-style`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "inputStyle" }, null, _parent));
  _push(`</td><td>Configuration for select style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;noborder&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>Configuration for input style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class-name</td><td>Configuration for popper class name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>Configuration for input status.</td><td><code>PickerInputStatusType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>Configuration for popover options.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>Configuration for initial value.</td><td><code>Array&lt;string | number&gt; | null | undefined | symbol</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>Configuration for hover show delay.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>Configuration for hover hide delay.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-statistic</td><td>Configuration for use statistic.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-text</td><td>Configuration for statistic text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>Configuration for height.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>Configuration for max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>256</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>Configuration for use virtual scroll.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>Configuration for multiple.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>Configuration for multiple limit.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>Configuration for dropdown icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-content`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "emptyText" }, null, _parent));
  _push(`</td><td>Configuration for empty content.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>Configuration for empty text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-panel-width</td><td>Configuration for search panel width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>Configuration for need confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmButtonText" }, null, _parent));
  _push(`</td><td>Configuration for confirm btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>Configuration for confirm button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancelButtonText" }, null, _parent));
  _push(`</td><td>Configuration for cancel btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>Configuration for cancel button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>Configuration for flip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>Configuration for input emit frequency.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>Configuration for search icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>() =&gt; IconCheck</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>Configuration for fit input width.</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-keyword</td><td>Configuration for reserve keyword.</td><td><code>boolean | &#39;reserve-deselect&#39; | &#39;reserve-special&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tree-size</td><td>Configuration for tree size.</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tree-width</td><td>Configuration for tree width.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tree-data</td><td>Configuration for tree data.</td><td><code>HTreeData[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "size" }, null, _parent));
  _push(`</td><td>Configuration for item size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "filterable" }, null, _parent));
  _push(`</td><td>Configuration for filter.</td><td><code>boolean | HTreeFilterType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>Configuration for filterable.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>Configuration for filter method.</td><td><code>HTreeFilterMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-to-hide-children</td><td>Configuration for filter to hide children.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filterable</td><td>Configuration for panel filterable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-input-value</td><td>Configuration for panel filter input value.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-panel-filter</td><td>Configuration for use build in panel filter.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-input-placeholder</td><td>Configuration for panel input placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">highlight-method</td><td>Configuration for highlight method.</td><td><code>HTreeHighlightMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-filtered-tree</td><td>Configuration for expand filtered tree.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>Configuration for field map.</td><td><code>Partial&lt;Record&lt;keyof BaseTreeData, keyof BaseTreeData | string&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-values</td><td>Configuration for expand values.</td><td><code>HTreeUuidType[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold-icon</td><td>Configuration for fold icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td>IconTriangleRightFilled</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>Configuration for expand icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-on-click-node</td><td>Configuration for expand on click node.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>Configuration for prefix icon.</td><td><code>iconNullablePropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-strictly</td><td>Configuration for check strictly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-values</td><td>Configuration for selected values.</td><td><code>HTreeUuidType[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-on-click-node</td><td>Configuration for check on click node.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-on-click-leaf</td><td>Configuration for check on click leaf.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">stress</td><td>Configuration for stress.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load-data`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dynamicLoad" }, null, _parent));
  _push(`</td><td>Configuration for dynamic load data.</td><td><code>HTreeDynamicLoadMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load</td><td>Configuration for dynamic load.</td><td><code>HTreeDynamicLoadMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-all</td><td>Configuration for is default expand all.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-parent</td><td>Configuration for is default expand parent.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">root-class-name</td><td>Configuration for root class name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">root-style</td><td>Configuration for root style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-input-placeholder</td><td>Configuration for search input placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indent</td><td>Configuration for indent.</td><td><code>number</code></td><td class="text-center">No</td><td>24</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>Configuration for tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parent-effect-disabled-child</td><td>Configuration for parent effect disabled child.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">checkable`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "showCheckbox/showRadio" }, null, _parent));
  _push(`</td><td>Configuration for checkable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-checkbox</td><td>Configuration for show checkbox.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-radio</td><td>Configuration for show radio.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-content-input-min-width</td><td>Configuration for fit content input min width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-line</td><td>Configuration for show line.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-wrapper-by-children`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "expandPanelByChildren" }, null, _parent));
  _push(`</td><td>Configuration for expand wrapper by children.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-panel-by-children</td><td>Configuration for expand panel by children.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>Configuration for draggable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable-icon</td><td>Configuration for draggable icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>IconDragForm</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">undraggable-icon</td><td>Configuration for undraggable icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable-icon-always-visible</td><td>Configuration for draggable icon always visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-on-handler</td><td>Configuration for drag on handler.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-to-leaf</td><td>Configuration for drag to leaf.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-drop</td><td>Configuration for before drop.</td><td><code>(<br>        current: HTreeNodeDataWithLevel,<br>        target: HTreeNodeDataWithLevel | null,<br>        prev: HTreeNodeDataWithLevel | null,<br>      ) =&gt; Awaited&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="treeselect-emits" class="no-underline h3"><a href="#treeselect-emits" class="!no-underline">TreeSelect Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:expand-values</td><td rowspan="1">Emitted when update:expand values changes.</td><td rowspan="1">( values: <code>(string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>(string | number)[]</code></td><td>The values value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:tree-data</td><td rowspan="1">Emitted when update:tree data changes.</td><td rowspan="1">( data: <code>HTreeNodeData[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td><code>HTreeNodeData[]</code></td><td>The data value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( value: <code>HTreeSelectModelValueType | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>HTreeSelectModelValueType | undefined</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible-change</td><td rowspan="1">Emitted when visible change changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>The visible value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when clear changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">Emitted when input changes.</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>The value value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="3">Emitted when select changes.</td><td rowspan="3">( checkedValues: <code>Array&lt;string | number&gt;</code>, value: <code>string | number</code>, e: <code>{<br>      checked: boolean;<br>      node: HTreeNodeData;<br>      allCheckedValues: (string | number)[];<br>      halfCheckedValues: (string | number)[];<br>      vnode?: VNode;<br>      nativeEvent?: Event;<br>    }</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">checkedValues</td><td><code>Array&lt;string | number&gt;</code></td><td>The checked values value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>{<br>      checked: boolean;<br>      node: HTreeNodeData;<br>      allCheckedValues: (string | number)[];<br>      halfCheckedValues: (string | number)[];<br>      vnode?: VNode;<br>      nativeEvent?: Event;<br>    }</code></td><td>The e value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td rowspan="3">Emitted when expand changes.</td><td rowspan="3">( expandValues: <code>(string | number)[]</code>, value: <code>string | number</code>, e: <code>{<br>      expanded: boolean;<br>      node: HTreeNodeDataWithLevel;<br>      nativeEvent?: Event;<br>      vnode?: VNode;<br>    }</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandValues</td><td><code>(string | number)[]</code></td><td>The expand values value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>{<br>      expanded: boolean;<br>      node: HTreeNodeDataWithLevel;<br>      nativeEvent?: Event;<br>      vnode?: VNode;<br>    }</code></td><td>The e value.</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="4">Emitted when click changes.</td><td rowspan="4">( evt: <code>MouseEvent</code>, value: <code>string | number</code>, node: <code>HTreeNodeData</code>, vnode: <code>VNode</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">node</td><td><code>HTreeNodeData</code></td><td>The node value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vnode</td><td><code>VNode</code></td><td>The vnode value.</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">contextmenu</td><td rowspan="4">Emitted when contextmenu changes.</td><td rowspan="4">( evt: <code>MouseEvent</code>, value: <code>string | number</code>, node: <code>HTreeNodeData</code>, vnode: <code>VNode</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">node</td><td><code>HTreeNodeData</code></td><td>The node value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vnode</td><td><code>VNode</code></td><td>The vnode value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">Emitted when confirm changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when cancel changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="treeselect-exposes" class="no-underline h3"><a href="#treeselect-exposes" class="!no-underline">TreeSelect Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">Controls confirm handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">Controls cancel handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">Controls change panel visible.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getSelectedNodes</td><td rowspan="2">Controls get selected nodes.</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>nodes 选中的节点</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>nodes 选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getPartSelectedNodes</td><td rowspan="2">Controls get part selected nodes.</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>nodes 选中的节点</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>nodes 选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getUnSelectedNodes</td><td rowspan="2">Controls get un selected nodes.</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>nodes 未选中的节点</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>nodes 未选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setSelectedStatus</td><td rowspan="2">Controls set selected status.</td><td rowspan="2">( values: <code>Array&lt;string | number&gt;</code>, selected: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>The values value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td><code>boolean</code></td><td>The selected value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearSelectedValues</td><td rowspan="1">Controls clear selected values.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getExpandNodes</td><td rowspan="2">Controls get expand nodes.</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>nodes 展开的节点</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>nodes 展开的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setCollapseStatusByValue</td><td rowspan="2">Controls set collapse status by value.</td><td rowspan="2">( values: <code>Array&lt;string | number&gt;</code>, isExpand: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>The values value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isExpand</td><td><code>boolean</code></td><td>The is expand value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setAllCollapseStatus</td><td rowspan="1">Controls set all collapse status.</td><td rowspan="1">( isExpand: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isExpand</td><td><code>boolean</code></td><td>The is expand value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getNodeByValues</td><td rowspan="2">Controls get node by values.</td><td rowspan="2">( value: <code>Array&lt;string | number&gt;</code> ) =&gt; <code>Record&lt;string | number, HTreeBaseNodeData&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>Array&lt;string | number&gt;</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Record&lt;string | number, HTreeBaseNodeData&gt;</code></td><td>以 value 为 key，node 为值的集合</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setNodeByValue</td><td rowspan="2">Controls set node by value.</td><td rowspan="2">( treeData: <code>TopBaseTreeData &amp; Partial&lt;HTreeData&gt;</code>, value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">treeData</td><td><code>TopBaseTreeData &amp; Partial&lt;HTreeData&gt;</code></td><td>The tree data value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">addNodeChildrenByValue</td><td rowspan="2">Controls add node children by value.</td><td rowspan="2">( treeDataArray: <code>Array&lt;TopBaseTreeData &amp; Partial&lt;HTreeData&gt;&gt;</code>, value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">treeDataArray</td><td><code>Array&lt;TopBaseTreeData &amp; Partial&lt;HTreeData&gt;&gt;</code></td><td>The tree data array value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">delNodeByValue</td><td rowspan="1">Controls del node by value.</td><td rowspan="1">( value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getVisibleItems</td><td rowspan="1">Controls get visible items.</td><td rowspan="1">( ) =&gt; <code>HTreeNodeDataWithLevel[]</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>HTreeNodeDataWithLevel</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollTo</td><td rowspan="1">Controls scroll to.</td><td rowspan="1">( value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/TreeSelect.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TreeSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  TreeSelect as default
};
