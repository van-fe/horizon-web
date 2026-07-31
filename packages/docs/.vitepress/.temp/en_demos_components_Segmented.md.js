import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Segmented.md","filePath":"en/demos/components/Segmented.md"}');
const _sfc_main = { name: "en/demos/components/Segmented.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Segmented</h1><p class="description">Most basic usage</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Most basic usage</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-segmented default-active-key="Monthly">
    <h-segmented-item v-for="v in options" :key="v" :label="v" />
  </h-segmented>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/basic.vue"
  }, null, _parent));
  _push(`<h2 id="block-mode" tabindex="-1">Block Mode <a class="header-anchor" href="#block-mode" aria-label="Permalink to &quot;Block Mode&quot;">​</a></h2><p>Set <code>block</code> to adapt to parent width</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-segmented default-active-key="Daily" block>
    <h-segmented-item v-for="v in options" :key="v" :label="v" />
  </h-segmented>
</template>

<script setup lang="ts">
const options = [
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'LongTextLongTextLongTextLongTextLongText',
];
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/block.vue"
  }, null, _parent));
  _push(`<h2 id="unavailable" tabindex="-1">Unavailable <a class="header-anchor" href="#unavailable" aria-label="Permalink to &quot;Unavailable&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical">
    <h-segmented default-active-key="Q1">
      <h-segmented-item v-for="(v, i) in quarter" :key="v" :disabled="i % 2 === 0" :label="v" />
    </h-segmented>
    <h-space>
      <h-segmented default-active-key="Sun">
        <h-segmented-item v-for="v in week" :key="v" :disabled="disabled" :label="v" />
      </h-segmented>
      <h-checkbox v-model="disabled">全部禁用</h-checkbox>
    </h-space>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(true);
const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="scrolling-segmented" tabindex="-1">Scrolling Segmented <a class="header-anchor" href="#scrolling-segmented" aria-label="Permalink to &quot;Scrolling Segmented&quot;">​</a></h2><p>When there are super many options, the controller calculates based on width. You can close it through <code>scrollable</code>. <strong style="${ssrRenderStyle({ "color": "red" })}">(PS: Generally not recommended to use Segmented for too many option nodes)</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space direction="vertical" block>\n    <h-space>\n      <h-checkbox v-model="scrollable">开启自由滑动</h-checkbox>\n      <h-checkbox v-model="arrow">开启箭头</h-checkbox>\n      <h-checkbox v-model="focusable">选中自动聚焦</h-checkbox>\n    </h-space>\n    <h-space>\n      <div class="box">\n        <h-segmented default-active-key="Option 1" :scrollable="scrollable" :arrow="arrow" :focusable="focusable">\n          <h-segmented-item v-for="v in options" :key="v" :label="v" />\n        </h-segmented>\n      </div>\n    </h-space>\n  </h-space>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\n\nconst options = Array(100)\n  .fill(0)\n  .map((_, i) => `Option ${i + 1}`);\n\nconst scrollable = ref(true);\nconst focusable = ref(true);\nconst arrow = ref(true);\n<\/script>\n\n<style scoped>\n.box {\n  width: 500px;\n}\n</style>\n',
    path: "demos/components/Segmented/scroll.vue"
  }, null, _parent));
  _push(`<h2 id="controlled-mode" tabindex="-1">Controlled Mode <a class="header-anchor" href="#controlled-mode" aria-label="Permalink to &quot;Controlled Mode&quot;">​</a></h2><p>Activate the corresponding option through <code>activeKey</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical">
    <h-space>
      <div>激活</div>
      <h-select v-model="activeKey">
        <h-option v-for="v in week" :key="v" :label="v" :value="v" />
      </h-select>
    </h-space>
    <h-segmented v-model:active-key="activeKey">
      <h-segmented-item v-for="v in week" :key="v" :label="v" />
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('Monday');
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/controlled.vue"
  }, null, _parent));
  _push(`<h2 id="different-sizes-of-segmented" tabindex="-1">Different Sizes of Segmented <a class="header-anchor" href="#different-sizes-of-segmented" aria-label="Permalink to &quot;Different Sizes of Segmented&quot;">​</a></h2><p>Set size through <code>size</code>, default size: <code>medium</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical" block>
    <h-segmented
      v-for="s in ['mini', 'small', 'medium', 'large']"
      :key="s"
      :size="s"
      default-active-key="Daily"
    >
      <h-segmented-item v-for="v in options" :key="v" :label="v" />
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/size.vue"
  }, null, _parent));
  _push(`<h2 id="dynamic-load-data" tabindex="-1">Dynamic Load Data <a class="header-anchor" href="#dynamic-load-data" aria-label="Permalink to &quot;Dynamic Load Data&quot;">​</a></h2><p>Asynchronously load more options</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical" block>
    <h-segmented default-active-key="Default Option1">
      <h-segmented-item v-for="v in options" :key="v" :label="v" />
    </h-segmented>
    <h-button type="normal" :loading="loading" :disabled="loaded" @click="onLoad">Load</h-button>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref(['Default Option1', 'Default Option2']);
const week = ['Monday', 'Tuesday', 'Wednesday'];
const loading = ref(false);
const loaded = ref(false);

const onLoad = () => {
  loading.value = true;
  setTimeout(() => {
    options.value.push(...week);
    loading.value = false;
    loaded.value = true;
  }, 1500);
};
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/load-more.vue"
  }, null, _parent));
  _push(`<h2 id="custom-render" tabindex="-1">Custom Render <a class="header-anchor" href="#custom-render" aria-label="Permalink to &quot;Custom Render&quot;">​</a></h2><p>Use <code>slot</code> to customize node rendering</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space direction="vertical">\n    <h-segmented default-active-key="user">\n      <h-segmented-item key="user">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag type="info" :clickable="false">User</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="employee">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag :clickable="false">Emp</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="lv">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag type="success" :clickable="false">LV</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n    </h-segmented>\n\n    <h-segmented default-active-key="spring">\n      <h-segmented-item key="spring">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Spring</div>\n            <div>Jan-Mar</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="summer">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Summer</div>\n            <div>Apr-Jun</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="fall">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Fall</div>\n            <div>Jul-Sep</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="winter">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Winter</div>\n            <div>Oct-Dec</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n    </h-segmented>\n  </h-space>\n</template>\n\n<script setup lang="ts"><\/script>\n\n<style scoped></style>\n',
    path: "demos/components/Segmented/customize.vue"
  }, null, _parent));
  _push(`<h2 id="support-setting-icon-and-badge" tabindex="-1">Support Setting Icon and Badge <a class="header-anchor" href="#support-setting-icon-and-badge" aria-label="Permalink to &quot;Support Setting Icon and Badge&quot;">​</a></h2><p>Use <code>icon</code> to set option icon</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical">
    <h-space>
      <h-checkbox v-model="showText" :disabled="!showIcon">是否显示文字</h-checkbox>
      <h-checkbox v-model="showIcon" :disabled="!showText">是否显示图标</h-checkbox>
      <h-checkbox v-model="showBadge">是否显示角标</h-checkbox>
    </h-space>
    <h-segmented default-active-key="All">
      <h-segmented-item v-for="opt in options" :key="opt.label" v-bind="resolveProps(opt)">
        <template #default>
          <h-badge v-if="opt.badge && showBadge" type="num" :num-max="99" :content="opt.badge">
            <div>{{ opt.label }}</div>
          </h-badge>
          <div v-else>{{ opt.label }}</div>
        </template>
      </h-segmented-item>
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { label: 'All', icon: 'layout' },
  { label: 'List', icon: 'list', badge: 8 },
];

const showText = ref(true);
const showIcon = ref(true);
const showBadge = ref(true);

const resolveProps = (opt: any) => {
  if (showText.value && showIcon.value) return opt;
  if (showText.value) return { label: opt.label };
  if (showIcon.value) return { icon: opt.icon };
  return {};
};
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/icon.vue"
  }, null, _parent));
  _push(`<h2 id="use-with-form" tabindex="-1">Use with Form <a class="header-anchor" href="#use-with-form" aria-label="Permalink to &quot;Use with Form&quot;">​</a></h2><p>You can enable the <code>form</code> attribute to adapt to the <code>h-form</code> component</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="instance" :model="values">
    <h-form-item label="Name" prop="name" style="width: 300px" required>
      <h-input v-model="values.name" />
    </h-form-item>
    <h-form-item label="Category" prop="category" required>
      <h-segmented v-model:active-key="values.category" form>
        <h-segmented-item v-for="v in options" :key="v" :label="v" />
      </h-segmented>
    </h-form-item>
    <h-space>
      <h-button @click="onSubmit">Submit</h-button>
      <h-button type="danger" @click="instance?.validate()">Validate</h-button>
    </h-space>
  </h-form>
</template>

<script setup lang="ts">
import { HFormInstance, $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const values = ref({
  name: '',
  category: undefined,
});
const instance = ref<HFormInstance>();
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const onSubmit = async () => {
  await instance.value?.validate();
  $message.success('提交成功');
};
<\/script>

<style scoped></style>
`,
    path: "demos/components/Segmented/form.vue"
  }, null, _parent));
  _push(`<h2 id="segmented-api" class="no-underline h2"><a href="#segmented-api" class="!no-underline">Segmented Api</a></h2><h3 id="segmented-props" class="no-underline h3"><a href="#segmented-props" class="!no-underline">Segmented Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>Configuration for active key.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-active-key</td><td>Configuration for default active key.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollable</td><td>Configuration for scrollable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusable</td><td>Configuration for focusable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>Configuration for arrow.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">block</td><td>Configuration for block.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">form</td><td>Configuration for form.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="segmented-emits" class="no-underline h3"><a href="#segmented-emits" class="!no-underline">Segmented Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">Emitted when update:active key changes.</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr></tbody></table><h2 id="segmenteditem-api" class="no-underline h2"><a href="#segmenteditem-api" class="!no-underline">SegmentedItem Api</a></h2><h3 id="segmenteditem-props" class="no-underline h3"><a href="#segmenteditem-props" class="!no-underline">SegmentedItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>Configuration for label.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>Configuration for icon size.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="segmenteditem-emits" class="no-underline h3"><a href="#segmenteditem-emits" class="!no-underline">SegmentedItem Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Segmented.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Segmented = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Segmented as default
};
