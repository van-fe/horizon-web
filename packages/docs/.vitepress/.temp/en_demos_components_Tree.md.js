import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Tree.md","filePath":"en/demos/components/Tree.md"}');
const _sfc_main = { name: "en/demos/components/Tree.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Tree</h1><p class="description">Pass to <code>tree-data</code> according to the structure of <code>HTreeData</code> to generate a tree structure</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Pass to <code>tree-data</code> according to the structure of <code>HTreeData</code> to generate a tree structure</p><p><strong>Note: <code>value</code> in <code>tree-data</code> must be unique throughout the entire tree</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :size="size"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :selected-values="['guide', 'disciplines', 'feedback', 'navigation']"
        :tree-data="baseTreeData"
        :size="size"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, onMounted, ref } from 'vue';
import { useTreeProps } from '@aurora/horizon-web';

const size = ref<Exclude<ExtractPropTypes<typeof useTreeProps>['size'], undefined>>('medium');
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
    path: "demos/components/Tree/basic.vue"
  }, null, _parent));
  _push(`<h2 id="emphasis-color" tabindex="-1">Emphasis Color <a class="header-anchor" href="#emphasis-color" aria-label="Permalink to &quot;Emphasis Color&quot;">​</a></h2><p>You can set <code>stress = true</code> to set the font color and background of selected items to brand color, making them more prominent</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :stress="true"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :stress="true"
        :multiple="true"
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
    path: "demos/components/Tree/stress.vue"
  }, null, _parent));
  _push(`<h2 id="radio-and-checkbox" tabindex="-1">Radio and Checkbox <a class="header-anchor" href="#radio-and-checkbox" aria-label="Permalink to &quot;Radio and Checkbox&quot;">​</a></h2><p>Configure <code>show-checkbox</code> (enabled by default) and <code>shwo-radio</code> (disabled by default) to control the selection component displayed before options</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="单选显示单选框">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
    <h-form-item label="多选显示多选框">
      <h-switch v-model="showCheckbox" :status="true" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选 </div>
      <h-tree
        :tree-data="baseTreeData"
        :show-radio="showRadio"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :show-checkbox="showCheckbox"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const showRadio = ref(false);
const showCheckbox = ref(true);

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
    path: "demos/components/Tree/checkbox-and-radio.vue"
  }, null, _parent));
  _push(`<h2 id="prefix-icon" tabindex="-1">Prefix Icon <a class="header-anchor" href="#prefix-icon" aria-label="Permalink to &quot;Prefix Icon&quot;">​</a></h2><p>Set <code>prefix-icon</code> to set the prefix icon</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconCar"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconCar"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconCar } from '@aurora/icon';

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
    path: "demos/components/Tree/prefix-icon.vue"
  }, null, _parent));
  _push(`<h2 id="parent-child-association" tabindex="-1">Parent-Child Association <a class="header-anchor" href="#parent-child-association" aria-label="Permalink to &quot;Parent-Child Association&quot;">​</a></h2><p>Set <code>check-strictly</code> to control whether selection is associated at the hierarchy level</p><p>For single selection, if <code>check-strictly = true</code> is set, non-leaf nodes can also be selected</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :check-strictly="checkStrictly"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :check-strictly="checkStrictly"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
    path: "demos/components/Tree/check-strictly.vue"
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
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :show-radio="showRadio"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :multiple="true"
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
    path: "demos/components/Tree/expand-and-check.vue"
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
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :show-radio="showRadio"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :multiple="true"
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
    path: "demos/components/Tree/check-on-leaf.vue"
  }, null, _parent));
  _push(`<h2 id="control-expand" tabindex="-1">Control Expand <a class="header-anchor" href="#control-expand" aria-label="Permalink to &quot;Control Expand&quot;">​</a></h2><p>Through <code>expand-values</code>, you can control the expanded fields, or use two-way binding to get the expanded values</p><p>If you don&#39;t want to automatically expand the parent, you need to set <code>is-default-expand-parent = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(0)">修改</h-button> {{ expandValues[0].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[0].value"
        :tree-data="baseTreeData"
        :max-height="300"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(1)">修改</h-button> {{ expandValues[1].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[1].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">单选 - 父级不默认展开</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(2)">修改</h-button> {{ expandValues[2].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[2].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选 - 父级不默认展开</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(3)">修改</h-button> {{ expandValues[3].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[3].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

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
    path: "demos/components/Tree/expand-values.vue"
  }, null, _parent));
  _push(`<h2 id="default-expand-all" tabindex="-1">Default Expand All <a class="header-anchor" href="#default-expand-all" aria-label="Permalink to &quot;Default Expand All&quot;">​</a></h2><p>Set <code>is-default-expand-all = true</code> to expand all data</p><p>But note that if the data is obtained asynchronously, you need to render after getting the data</p><p>In the <code>demo</code>, <code>v-if</code> is used for processing</p><p>And it is only effective during initialization. Later changes to <code>tree-data</code> will not be processed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :multiple="true"
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
    path: "demos/components/Tree/default-expand-all.vue"
  }, null, _parent));
  _push(`<h2 id="control-selection" tabindex="-1">Control Selection <a class="header-anchor" href="#control-selection" aria-label="Permalink to &quot;Control Selection&quot;">​</a></h2><p>Through <code>selected-values</code>, you can control the selected items, or use two-way binding to get the selected values</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(0)">修改</h-button> {{ selectedValues[0].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:selected-values="selectedValues[0].value"
        :tree-data="baseTreeData"
        :max-height="300"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(1)">修改</h-button> {{ selectedValues[1].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:selected-values="selectedValues[1].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const selectedValues = [
  ref(['feedback']),
  ref<string[]>([]),
];

function change(index: number) {
  selectedValues[index].value = index % 2 === 0 ? ['radio'] : ['radio', 'tag'];
}


onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });

  selectedValues[1].value.push('feedback', 'efficiency');
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Tree/selected-values.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>In the <code>tree-data</code> data, setting <code>disabled = true</code> for an item can disable that item</p><p>But if you want to disable the entire tree, you can directly give <code>disabled = true</code> to <code>n-tree</code></p><p>But regardless of the disable method, it will not affect the expand function</p><p>The disabled state of child levels will also be affected by the parent-child association configuration</p><p>If in multiple selection state, you want the parent node selection to be able to change the selected state of disabled child nodes, then <code>parent-effect-disabled-child</code> needs to be set to <code>true</code></p>`);
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
    <h-form-item label="是否强调">
      <h-switch v-model="stress" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :stress="stress"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :multiple="true"
        :stress="stress"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const disabled = ref(false);
const checkStrictly = ref(false);
const parentEffectDisabledChild = ref(false);
const stress = ref(false);

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
    path: "demos/components/Tree/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="custom-expand-icon" tabindex="-1">Custom Expand Icon <a class="header-anchor" href="#custom-expand-icon" aria-label="Permalink to &quot;Custom Expand Icon&quot;">​</a></h2><p>You can configure <code>fold-icon</code> to customize the expand icon</p><p>If you need to use clockwise rotation <code>90°</code> during the expand state switching process, leave <code>expand-icon</code> empty</p><p>If the expand state cannot be displayed using animation, please also set both <code>expand-icon</code> and <code>fold-icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
        :multiple="true"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">单选-加减符号</div>
      <h-tree
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选-加减符号</div>
      <h-tree
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
        :multiple="true"
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
    path: "demos/components/Tree/expand-icon.vue"
  }, null, _parent));
  _push(`<h2 id="filter" tabindex="-1">Filter <a class="header-anchor" href="#filter" aria-label="Permalink to &quot;Filter&quot;">​</a></h2><p>The <code>Tree</code> component has built-in filtering capability. Set <code>filterable = true</code> to enable filtering</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
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
    path: "demos/components/Tree/filter.vue"
  }, null, _parent));
  _push(`<h2 id="filter-and-highlight" tabindex="-1">Filter and Highlight <a class="header-anchor" href="#filter-and-highlight" aria-label="Permalink to &quot;Filter and Highlight&quot;">​</a></h2><p>The default highlight color is brand color. If you want to process search results, you can process them through <code>highlightMethod</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :multiple="true"
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
    path: "demos/components/Tree/highlight-filter.vue"
  }, null, _parent));
  _push(`<h2 id="dynamic-load" tabindex="-1">Dynamic Load <a class="header-anchor" href="#dynamic-load" aria-label="Permalink to &quot;Dynamic Load&quot;">​</a></h2><p>If a node&#39;s child nodes need to use dynamic loading, you need to set the node&#39;s <code>isLeaf</code> attribute to <code>false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      {{ dynamicTreeData }}
    </h-col>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" :multiple="true" />
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
    path: "demos/components/Tree/dynamic-load.vue"
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
    <h-col :span="24">
      <div class="demo-title">最多勾选3个</div>
      <h-tree
        :tree-data="baseTreeData"
        :multiple="true"
        :multiple-limit="3"
        :check-strictly="checkStrictly"
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
    path: "demos/components/Tree/multiple-limit.vue"
  }, null, _parent));
  _push(`<h2 id="custom-node" tabindex="-1">Custom Node <a class="header-anchor" href="#custom-node" aria-label="Permalink to &quot;Custom Node&quot;">​</a></h2><p>You can customize node rendering through the <code>treeNodeRender</code> slot</p><p>You can also set <code>label</code> to <code>((option: HTreeData) =&gt; VNode)</code> type when passing in <code>tree-data</code> to customize a fixed node. At this time, the priority is higher than the <code>treeNodeRender</code> slot</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">自定义渲染全部节点</div>

      <h-tree :tree-data="baseTreeData" :multiple="true">
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
      </h-tree>
    </h-col>
    <h-col :span="12">
      <div class="demo-title">自定义渲染指定节点</div>

      <h-tree :tree-data="renderTreeData" :multiple="true">
        <template #treeNodeRender="{ data }">
          <div>{{ data.label }} ({{ data.value }})</div>
        </template>
      </h-tree>
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
    path: "demos/components/Tree/custom-render.vue"
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
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
      >
        <template #treeNodeRender="{data}">
          {{ data.label }}
        </template>
      </h-tree>
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
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
    path: "demos/components/Tree/field-map.vue"
  }, null, _parent));
  _push(`<h2 id="controlled-mode" tabindex="-1">Controlled Mode <a class="header-anchor" href="#controlled-mode" aria-label="Permalink to &quot;Controlled Mode&quot;">​</a></h2><p>The component provides very rich methods that can be used to operate the tree component</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-width="fit-content" label-position="left" label-vertical-align="middle">
    <h-form-item label="展开收起">
      <h-space>
        <h-button @click="getExpand">获取已展开</h-button>
        <h-button @click="setExpand">设置展开</h-button>
        <h-button @click="setFold">设置收起</h-button>
        <h-button @click="setExpandAll">全部展开</h-button>
        <h-button @click="setFoldAll">全部收起</h-button>
      </h-space>
    </h-form-item>
    <h-form-item label="选中处理">
      <h-space>
        <h-button @click="getAllCheckedValues">获取所有已选（不含半选）</h-button>
        <h-button @click="getHalfCheckedValues">获取所有半选</h-button>
        <h-button @click="getUnCheckedValues">获取所有未选</h-button>
        <h-button @click="setSelectedValues">增加选中</h-button>
        <h-button @click="deleteSelectedValues">取消选中</h-button>
      </h-space>
    </h-form-item>
    <h-form-item label="节点数据">
      <h-space>
        <h-button @click="getNodes">获取节点</h-button>
        <h-button @click="setNode">设置节点</h-button>
        <h-button @click="delNode">删除节点</h-button>
        <h-button @click="addNodeChildren">添加节点</h-button>
      </h-space>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col>
      <h-tree
        ref="treeDomRef"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HTree, useTreeExposes } from '@aurora/horizon-web';
import { ExtractExposeTypes } from '@aurora/utils';

const baseTreeData = ref([]);
const treeDomRef = ref<InstanceType<typeof HTree> & ExtractExposeTypes<typeof useTreeExposes>>();

function getExpand() {
  console.info(treeDomRef.value?.getExpandNodes());
}

function setExpand() {
  treeDomRef.value?.setCollapseStatusByValue(['feedback'], true);
}

function setFold() {
  treeDomRef.value?.setCollapseStatusByValue(['guide', 'disciplines'], false);
}

function setExpandAll() {
  treeDomRef.value?.setAllCollapseStatus(true);
}

function setFoldAll() {
  treeDomRef.value?.setAllCollapseStatus(false);
}

function getAllCheckedValues() {
  console.info(treeDomRef.value?.getSelectedNodes());
}

function getHalfCheckedValues() {
  console.info(treeDomRef.value?.getPartSelectedNodes());
}

function getUnCheckedValues() {
  console.info(treeDomRef.value?.getUnSelectedNodes());
}

function setSelectedValues() {
  treeDomRef.value?.setSelectedStatus(['feedback', 'color'], true);
}

function deleteSelectedValues() {
  treeDomRef.value?.setSelectedStatus(['feedback', 'color'], false);
}

function getNodes() {
  console.info(treeDomRef.value?.getNodeByValues(['feedback']));
}

function setNode() {
  treeDomRef.value?.setNodeByValue({
    label: 'Feedback - modified',
  }, 'feedback');
}

function delNode() {
  treeDomRef.value?.delNodeByValue('feedback');
}

let index = 0;
function addNodeChildren() {
  treeDomRef.value?.addNodeChildrenByValue([
    {
      label: \`New Item Child \${index}\`,
      value: \`new child \${index}\`,
    },
  ], 'efficiency');
  index++;
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
    path: "demos/components/Tree/controls.vue"
  }, null, _parent));
  _push(`<h2 id="virtual-scroll" tabindex="-1">Virtual Scroll <a class="header-anchor" href="#virtual-scroll" aria-label="Permalink to &quot;Virtual Scroll&quot;">​</a></h2><p>In the case of large data volumes, too many nodes will cause performance degradation, so you can use virtual scrolling capability</p><p>You need to configure <code>use-virtual-scroll = true</code>, and either <code>height</code> or <code>max-height</code> can enable virtual scrolling</p><p>This shows 50k pieces of data (because parent-child level relationships need to be processed, the more levels, the greater the performance impact. This will be optimized in subsequent iterations to improve computing capabilities)</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="12">\n      <div class="demo-title">单选</div>\n      <h-tree\n        :tree-data="baseData"\n        :use-virtual-scroll="true"\n        :max-height="300"\n      />\n    </h-col>\n    <h-col :span="12">\n      <div class="demo-title">多选</div>\n      <h-tree\n        :tree-data="baseData"\n        :use-virtual-scroll="true"\n        :max-height="300"\n        :multiple="true"\n      />\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\nimport { shallowRef } from \'vue\';\nimport type { BaseTreeData } from \'@aurora/horizon-web/es/utils/useTree\';\n\nconst baseData = shallowRef<BaseTreeData[]>(new Array(100).fill(0).map((_, i) => ({\n  label: `${i + 1}`,\n  value: i + 1,\n  children: new Array(50).fill(0).map((_, j) => ({\n    label: `${i + 1}-${j + 1}`,\n    value: (i + 1) * 100 + j + 1,\n    children: new Array(10).fill(0).map((_, k) => ({\n      label: `${i + 1}-${j + 1}-${k + 1}`,\n      value: (i + 1) * 10000 + (j + 1) * 100 + k + 1,\n    })),\n  })),\n})));\n<\/script>\n',
    path: "demos/components/Tree/virtual-scroll.vue"
  }, null, _parent));
  _push(`<h2 id="drag-sort" tabindex="-1">Drag Sort <a class="header-anchor" href="#drag-sort" aria-label="Permalink to &quot;Drag Sort&quot;">​</a></h2><p>Set <code>draggable = true</code> to enable drag sort</p><p>By default, you can only drag when the mouse is pressed on the drag icon. You can configure <code>drag-on-handler = false</code> to make the entire row draggable</p><p>If you want to prevent dragging the current node under a leaf node and generating a child node during dragging, you need to set <code>dragToLeaf = false</code></p><p>You can set <code>before-drop</code> to intercept the drag result</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="开启拖拽">
      <h-switch v-model="draggable" :status="true" />
    </h-form-item>
    <h-form-item label="仅能操作拖拽图标进行拖拽">
      <h-switch v-model="dragOnHandler" :status="true" />
    </h-form-item>
    <h-form-item label="可以拖拽到叶子节点下">
      <h-switch v-model="dragToLeaf" :status="true" />
    </h-form-item>
    <h-form-item label="拦截确认拖拽">
      <h-switch v-model="useBeforeDrop" :status="true" />
    </h-form-item>
  </h-form>
  <h-row class="flex">
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData1.length"
          :tree-data="baseTreeData1"
          :draggable="draggable"
          :drag-on-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
        />
      </div>
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData2.length"
          :tree-data="baseTreeData2"
          :draggable="draggable"
          :drag-on-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
          :multiple="true"
        />
      </div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $confirm, $message, HTreeNodeDataWithLevel } from '@aurora/horizon-web';

const draggable = ref(true);
const dragOnHandler = ref(true);
const dragToLeaf = ref(true);
const useBeforeDrop = ref(false);
const baseTreeData1 = ref([]);
const baseTreeData2 = ref([]);

function beforeDrop(from: HTreeNodeDataWithLevel, to: HTreeNodeDataWithLevel | null, prev: HTreeNodeDataWithLevel | null) {
  return new Promise((resolve) => {
    $confirm(\`是否确定将 \${from.label} 移动到 \${to?.label ?? '根节点'} 下，且\${prev?.label ? \`在 \${prev.label} 之后\` : '放在其第一位'}\`, '提示').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      $message.error('取消了操作');
      resolve(false);
      // or reject();
    });
  });
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData1.value = res;
      baseTreeData2.value = res;
    });
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Tree/draggable.vue"
  }, null, _parent));
  _push(`<h2 id="optimize-selected-values-data-processing" tabindex="-1">Optimize selected-values Data Processing <a class="header-anchor" href="#optimize-selected-values-data-processing" aria-label="Permalink to &quot;Optimize selected-values Data Processing&quot;">​</a></h2><p>Before version <code>2.3.4 (inclusive)</code>, in multiple selection, if both [non-leaf nodes] and their child [leaf nodes] are passed to <code>selected-values</code>, only [leaf nodes] will be selected. But the refactored version of <code>2.3.5</code> did not adapt to this <code>BUG</code> logic</p><p>Starting from <code>2.4.6</code>, logic adaptation will be made for this previous <code>BUG</code>:</p><ol><li>If [non-leaf nodes] are selected, it will check whether their [child level] (excluding child level and beyond) are selected. If selected, the selection state of [that non-leaf node] will be ignored (i.e., the half-selected state of <code>Component</code>, <code>Basic</code>)</li><li>But if the [child level] of [non-leaf nodes] are not selected, all child nodes under it will be selected (i.e., the selected state of <code>Data</code> and its child levels)</li></ol>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <div class="demo-title">选中了 Component、Basic、Color、Data 四个节点</div>
      <h-tree
        v-model:expand-values="expandValues"
        v-model:selected-values="selectedValues"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const selectedValues = ref(['component', 'basic', 'color', 'data']);
const expandValues = ref(['component', 'basic', 'color', 'data']);
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
    path: "demos/components/Tree/optimize-selected-values.vue"
  }, null, _parent));
  _push(`<h2 id="unselectable" tabindex="-1">Unselectable <a class="header-anchor" href="#unselectable" aria-label="Permalink to &quot;Unselectable&quot;">​</a></h2><p>When passing in <code>options</code>, you can set <code>selectable = false</code> to disallow selection of this item (but expansion is not limited)</p><p><strong>The following is a comparison table with disabled (cascading selection and tree selector are the same):</strong></p><table class="md-table text-center"><thead><tr><th rowspan="2"></th><th rowspan="2">Setting Object</th><th rowspan="2" width="120">Mouse Selection Object</th><th>disabled = true</th><th>selectable = false</th></tr></thead><tbody><tr><th rowspan="9" width="120">Parent-Child Node Association</th><th rowspan="3" width="80">Root Node</th><th width="80">Current Root Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th width="80">Child Node</th><td>Cannot select, interact</td><td>Can freely select and interact, and can associate the state of its descendant nodes</td></tr><tr><th width="80">Leaf Node</th><td>Cannot select, interact</td><td colspan="2">Can select and interact</td></tr><tr><th rowspan="3" width="80">Child Node</th><th width="80">Root Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Current Child Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th width="80">Leaf Node</th><td>Cannot select, interact</td><td>Can select and interact</td></tr><tr><th rowspan="3" width="80">Leaf Node</th><th width="80">Root Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Child Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Current Leaf Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th rowspan="3" width="120">Parent-Child Node Not Associated</th><th>Root Node</th><td rowspan="3" colspan="3">Cannot select, interact itself, other nodes are not interfered</td></tr><tr><th>Child Node</th></tr><tr><th>Leaf Node</th></tr></tbody></table><p>If single selection is enabled, it is best to use it with <code>show-radio = true</code>, otherwise the display form cannot see the difference</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :show-radio="true"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/unselectable-options.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
<\/script>
`,
    path: "demos/components/Tree/selectable.vue"
  }, null, _parent));
  _push(`<h2>Tree Api</h2><h3>Tree Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tree-data</td><td>树结构数据，具备响应式，在使用中如果你改变了整个变量的引用，将会导致组件的重新渲染</td><td><code>HTreeData[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "size" }, null, _parent));
  _push(`</td><td>尺寸大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否将整棵树禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "filterable / filterMethod / highlightMethod / expandFilteredTree" }, null, _parent));
  _push(`</td><td>是否开启过滤，并进行设置</td><td><code>boolean | HTreeFilterType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>是否开启过滤</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-to-hide-children</td><td>过滤时是否隐藏子节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>过滤方法</td><td><code>HTreeFilterMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-value</td><td>内置输入框过滤的值，可以双向绑定</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">highlight-method</td><td>高亮处理方法<br>需要注意的是，高亮处理方法仅对 treeData 中数据的 <code>label</code> 为字符串时处理；如果是一个渲染函数，则直接渲染此函数而不做任何处理</td><td><code>HTreeHighlightMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-input-props</td><td>过滤的输入框的传参</td><td><code>Partial&lt;InputProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-input-value</td><td>过滤输入的文字，用于自定义搜索框时使用</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-filter-input</td><td>是否在启用过滤时，隐藏过滤的输入框</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-filtered-tree</td><td>是否自动展开搜索子树</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>字段映射<br>不支持动态修改</td><td><code>Partial&lt;Record&lt;keyof BaseTreeData, keyof BaseTreeData | string&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>树组件的高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>树组件的最大高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>是否启用虚拟滚动，需同时配置 <code>height</code> 或 <code>maxHeight</code></td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">virtual-scroll-buffer</td><td>同 <code>n-virtual-scroller</code> 的 <code>buffer</code><br>如果 <code>maxHeight</code> 设置了 <code>calc</code> 或 <code>var</code> 或带百分比的字符串，需要特别指定这个值</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-values</td><td>展开的节点</td><td><code>Array&lt;string | number&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold-icon</td><td>折叠时 <code>icon</code></td><td><code>iconPropType</code></td><td class="text-center">No</td><td>IconTriangleRightFilled</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>展开时 <code>icon</code><br>如果希望在切换展开折叠时，使用动画顺时针旋转 <code>90°</code>，则此处留空即可</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-on-click-node</td><td>是否在点击节点的时候展开或者收缩节点，为 false 时，则只有点箭头图标的时候才会展开或者收缩节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>前缀 <code>icon</code></td><td><code>iconNullablePropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-strictly</td><td>是否严格的遵循父子不互相关联的做法</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>是否是多选</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>多选上限</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-values</td><td>选中的树节点</td><td><code>Array&lt;string | number&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-on-click-node</td><td>是否在点击节点时选中节点<br>此配置仅影响多选——只有在点击复选框时才会选中节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-on-click-leaf</td><td>对于多选：是否在点击叶子节点时进行选择，任意有子级的节点点击仍受 <code>checkOnClickNode</code> 控制<br>对于单选：只有在 <code>showRadio = true</code> 时，此配置才有效，否则无论如何都会点击选中</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">stress</td><td>选中强调样式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>在过滤结果为空时，展示的文字<br>默认使用国际化</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load-data`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dynamicLoad" }, null, _parent));
  _push(`</td><td>动态加载数据方法</td><td><code>HTreeDynamicLoadMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load</td><td>动态加载数据方法</td><td><code>HTreeDynamicLoadMethod</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-all</td><td>是否默认展开全部</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-parent</td><td>展开子节点的时候是否默认展开父节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">root-class-name</td><td>根节点 <code>class</code> 类名</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">root-style</td><td>根节点 <code>style</code> 对象</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-input-placeholder</td><td>过滤输入框 <code>placeholder</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indent</td><td>相邻级节点间的水平缩进，单位为像素</td><td><code>number</code></td><td class="text-center">No</td><td>24</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>是否显示 tooltip</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parent-effect-disabled-child</td><td>禁用状态下是否可以通过父节点的选中改变禁用节点，默认状态下不受父节点影响</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">checkable`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "showCheckbox/showRadio" }, null, _parent));
  _push(`</td><td>节点前是否添加 <code>Checkbox</code> 复选框，单选场景下默认没有，多选场景下默认添加</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-checkbox</td><td>多选时是否使用 <code>checkbox</code> 组件</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-radio</td><td>单选时是否使用 <code>radio</code> 组件</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否允许拖拽排序</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable-icon</td><td>拖拽的 <code>icon</code><br>如果不需要则设置 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>IconDragForm</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">undraggable-icon</td><td>不允许拖拽的 <code>icon</code><br>在树数据里设置了 <code>draggable: false</code> 时会显示此图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable-icon-always-visible</td><td>拖拽图标是否始终显示<br>默认只有在鼠标悬浮在节点上时显示</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-on-handler</td><td>是否只能在拖拽图标上拖拽</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-to-leaf</td><td>是否允许拖拽到叶子节点上并创建子级</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-drop</td><td>在放置节点前的回调<br>可以在此时机拦截节点的移动<br><code>current</code>: 代表当前移动的节点<br><code>target</code>: 代表移动目标，确认后会移动到目标子级下。如果为 <code>null</code> ，则代表根节点<br><code>prev</code>: 在确认后，会移动到该节点之后。如果为 <code>null</code>，则代表会移动到 <code>target</code> 下的第一个节点</td><td><code>(<br>        current: HTreeNodeDataWithLevel,<br>        target: HTreeNodeDataWithLevel | null,<br>        prev: HTreeNodeDataWithLevel | null,<br>      ) =&gt; Awaited&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-line</td><td>是否显示连线</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-wrapper-by-children</td><td>是否在开启虚拟滚动时，允许子元素撑开容器</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Tree Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:tree-data</td><td rowspan="1">动态加载改变时会通知</td><td rowspan="1">( data: <code>HTreeNodeData[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td><code>HTreeNodeData[]</code></td><td><code>tree-data</code> 数据</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:expand-values</td><td rowspan="1">同步展开节点 <code>values</code></td><td rowspan="1">( values: <code>(string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>(string | number)[]</code></td><td>节点 <code>value</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:selected-values</td><td rowspan="1">同步选中节点 <code>values</code></td><td rowspan="1">( values: <code>(string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>(string | number)[]</code></td><td>节点 <code>value</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:filter-value</td><td rowspan="1">filterValue 触发时调用</td><td rowspan="1">( value: <code>string | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | undefined</code></td><td>过滤的值</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td rowspan="3">expand 触发时调用</td><td rowspan="3">( expandValues: <code>(string | number)[]</code>, value: <code>string | number</code>, e: <code>{<br>      expanded: boolean;<br>      node: HTreeNodeDataWithLevel;<br>      nodeComputed: HTreeExtendsData;<br>      nativeEvent?: Event;<br>      vnode?: VNode;<br>    }</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandValues</td><td><code>(string | number)[]</code></td><td>已经展开的 value 列表</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>当前操作的 Tree Item 对应的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>{<br>      expanded: boolean;<br>      node: HTreeNodeDataWithLevel;<br>      nodeComputed: HTreeExtendsData;<br>      nativeEvent?: Event;<br>      vnode?: VNode;<br>    }</code></td><td>expanded: 展开还是收起<br> nativeEvent: 事件对象<br> vnode: 当前 Tree Item VNode 节点信息<br> node: 当前 Tree Item 对应的原始数据信息 <br> nodeComputed: 经计算后的 node 数据，包括父子级关系等</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="3">选中时触发</td><td rowspan="3">( checkedValues: <code>(string | number)[]</code>, value: <code>string | number</code>, e: <code>{<br>      checked: boolean;<br>      node: HTreeNodeData;<br>      nodeComputed: HTreeExtendsData;<br>      allCheckedValues: (string | number)[];<br>      halfCheckedValues: (string | number)[];<br>      vnode?: VNode;<br>      nativeEvent?: Event;<br>    }</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">checkedValues</td><td><code>(string | number)[]</code></td><td>选中状态 value 列表</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>当前操作的 Tree Item 对应的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>{<br>      checked: boolean;<br>      node: HTreeNodeData;<br>      nodeComputed: HTreeExtendsData;<br>      allCheckedValues: (string | number)[];<br>      halfCheckedValues: (string | number)[];<br>      vnode?: VNode;<br>      nativeEvent?: Event;<br>    }</code></td><td>checked: 选中或取消选中<br> node: 当前 Tree Item 对应的原始数据信息<br> vnode: 当前 Tree Item VNode 节点信息<br> allCheckedValues: 全选状态节点 value 列表<br> halfCheckedValues: 半选状态节点 value 列表<br> nativeEvent: 事件对象</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="4">节点被点击时触发</td><td rowspan="4">( evt: <code>MouseEvent</code>, value: <code>string | number</code>, node: <code>HTreeNodeData</code>, vnode: <code>VNode</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>事件对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>当前操作的 Tree Item 对应的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">node</td><td><code>HTreeNodeData</code></td><td>当前操作的 Tree Item 对应的数据信息</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vnode</td><td><code>VNode</code></td><td>当前操作的 Tree Item 对应的 VNode 节点信息</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">contextmenu</td><td rowspan="4">节点上右键点击时触发</td><td rowspan="4">( evt: <code>MouseEvent</code>, value: <code>string | number</code>, node: <code>HTreeNodeData</code>, vnode: <code>VNode</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>事件对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>当前操作的 Tree Item 对应的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">node</td><td><code>HTreeNodeData</code></td><td>当前操作的 Tree Item 对应的数据信息</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vnode</td><td><code>VNode</code></td><td>当前操作的 Tree Item 对应的 VNode 节点信息</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-top</td><td rowspan="1">滚动后触顶时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-bottom</td><td rowspan="1">滚动后触底时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>Tree Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getSelectedNodes</td><td rowspan="2">获取选中状态所有节点</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>选中的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getPartSelectedNodes</td><td rowspan="2">获取半选状态所有节点</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>选中的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getUnSelectedNodes</td><td rowspan="2">获取未被选中所有节点</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>未选中的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>未选中的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setSelectedStatus</td><td rowspan="2">通过 value 设置节点选中状态</td><td rowspan="2">( values: <code>Array&lt;string | number&gt;</code>, selected: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>需要选中/未选中的节点的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td><code>boolean</code></td><td>是否选中</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearSelectedValues</td><td rowspan="1">清空所有已选择的选项</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getExpandNodes</td><td rowspan="2">获取展开状态的所有节点</td><td rowspan="2">( ) =&gt; <code>{ values: Array&lt;string | number&gt;; nodes: HTreeBaseNodeData[] }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>展开的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nodes</td><td><code>HTreeBaseNodeData[]</code></td><td>展开的节点</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setCollapseStatusByValue</td><td rowspan="2">通过 value 设置节点展开收起状态</td><td rowspan="2">( values: <code>Array&lt;string | number&gt;</code>, isExpand: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>Array&lt;string | number&gt;</code></td><td>需要展开/收起的节点的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isExpand</td><td><code>boolean</code></td><td>是否需要展开</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setAllCollapseStatus</td><td rowspan="1">设置全部节点展开状态</td><td rowspan="1">( isExpand: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isExpand</td><td><code>boolean</code></td><td>是否需要展开</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getNodeByValues</td><td rowspan="2">通过 value 获取节点信息，没有展开的节点不被渲染，无法获取到 vNode Name</td><td rowspan="2">( value: <code>Array&lt;string | number&gt;</code> ) =&gt; <code>Record&lt;string | number, HTreeBaseNodeData&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>Array&lt;string | number&gt;</code></td><td>需要获取节点的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Record&lt;string | number, HTreeBaseNodeData&gt;</code></td><td>以 value 为 key，node 为值的集合</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setNodeByValue</td><td rowspan="2">通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点</td><td rowspan="2">( treeData: <code>TopBaseTreeData &amp; Partial&lt;HTreeData&gt;</code>, value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">treeData</td><td><code>TopBaseTreeData &amp; Partial&lt;HTreeData&gt;</code></td><td>设置的数据</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>需要设置节点数据的value值</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">addNodeChildrenByValue</td><td rowspan="2">通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点</td><td rowspan="2">( treeDataArray: <code>Array&lt;TopBaseTreeData &amp; Partial&lt;HTreeData&gt;&gt;</code>, value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">treeDataArray</td><td><code>Array&lt;TopBaseTreeData &amp; Partial&lt;HTreeData&gt;&gt;</code></td><td>添加的子数据</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>需要设置节点数据的value值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">delNodeByValue</td><td rowspan="1">通过 value 删除指定节点的数据，如果不传入 value，则表示删除整棵树</td><td rowspan="1">( value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>需要删除节点数据的value值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getVisibleItems</td><td rowspan="1">获取当前显示的子元素</td><td rowspan="1">( ) =&gt; <code>HTreeNodeDataWithLevel[]</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>HTreeNodeDataWithLevel</code></td><td>子节点带层级信息</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">treeTemplateRef</td><td rowspan="1">tree 的 el 对象</td><td rowspan="1"><code>Ref&lt;HTMLDivElement | null&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollTo</td><td rowspan="1">滚动到传入的 value 节点所在位置<br>如果不传入 value，则滚动到 <code>selected-values</code> 中第一个所在位置</td><td rowspan="1">( value: <code>string | number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | number</code></td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Tree.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tree = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Tree as default
};
