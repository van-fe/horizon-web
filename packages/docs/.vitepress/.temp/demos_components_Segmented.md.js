import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Segmented.md","filePath":"zh/demos/components/Segmented.md"}');
const _sfc_main = { name: "demos/components/Segmented.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Segmented</h1><p class="description">分段控制器</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>最基本用法</p>`);
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
  _push(`<h2 id="block-模式" tabindex="-1">Block 模式 <a class="header-anchor" href="#block-模式" aria-label="Permalink to &quot;Block 模式&quot;">​</a></h2><p>设置 <code>block</code> 让其适应父级宽度</p>`);
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
  _push(`<h2 id="不可用" tabindex="-1">不可用 <a class="header-anchor" href="#不可用" aria-label="Permalink to &quot;不可用&quot;">​</a></h2>`);
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
  _push(`<h2 id="滚动的分段器" tabindex="-1">滚动的分段器 <a class="header-anchor" href="#滚动的分段器" aria-label="Permalink to &quot;滚动的分段器&quot;">​</a></h2><p>当选项超级多时候，控制器根据宽度计算，可以通过 <code>scrollable</code> 关闭。<strong style="${ssrRenderStyle({ "color": "red" })}">(PS:一般不推荐 Segmented 做太多选项节点)</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space direction="vertical" block>\n    <h-space>\n      <h-checkbox v-model="scrollable">开启自由滑动</h-checkbox>\n      <h-checkbox v-model="arrow">开启箭头</h-checkbox>\n      <h-checkbox v-model="focusable">选中自动聚焦</h-checkbox>\n    </h-space>\n    <h-space>\n      <div class="box">\n        <h-segmented default-active-key="Option 1" :scrollable="scrollable" :arrow="arrow" :focusable="focusable">\n          <h-segmented-item v-for="v in options" :key="v" :label="v" />\n        </h-segmented>\n      </div>\n    </h-space>\n  </h-space>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\n\nconst options = Array(100)\n  .fill(0)\n  .map((_, i) => `Option ${i + 1}`);\n\nconst scrollable = ref(true);\nconst focusable = ref(true);\nconst arrow = ref(true);\n<\/script>\n\n<style scoped>\n.box {\n  width: 500px;\n}\n</style>\n',
    path: "demos/components/Segmented/scroll.vue"
  }, null, _parent));
  _push(`<h2 id="受控模式" tabindex="-1">受控模式 <a class="header-anchor" href="#受控模式" aria-label="Permalink to &quot;受控模式&quot;">​</a></h2><p>通过 <code>activeKey</code> 来激活对应的选项</p>`);
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
  _push(`<h2 id="不同大小的分段器" tabindex="-1">不同大小的分段器 <a class="header-anchor" href="#不同大小的分段器" aria-label="Permalink to &quot;不同大小的分段器&quot;">​</a></h2><p>通过 <code>size</code> 设置大小, 默认大小：<code>medium</code></p>`);
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
  _push(`<h2 id="动态加载数据" tabindex="-1">动态加载数据 <a class="header-anchor" href="#动态加载数据" aria-label="Permalink to &quot;动态加载数据&quot;">​</a></h2><p>异步加载更多的选项</p>`);
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
  _push(`<h2 id="自定义渲染" tabindex="-1">自定义渲染 <a class="header-anchor" href="#自定义渲染" aria-label="Permalink to &quot;自定义渲染&quot;">​</a></h2><p>使用 <code>slot</code> 自定义节点渲染</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space direction="vertical">\n    <h-segmented default-active-key="user">\n      <h-segmented-item key="user">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag type="info" :clickable="false">User</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="employee">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag :clickable="false">Emp</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="lv">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <h-avatar size="small" />\n            <h-tag type="success" :clickable="false">LV</h-tag>\n          </h-space>\n        </template>\n      </h-segmented-item>\n    </h-segmented>\n\n    <h-segmented default-active-key="spring">\n      <h-segmented-item key="spring">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Spring</div>\n            <div>Jan-Mar</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="summer">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Summer</div>\n            <div>Apr-Jun</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="fall">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Fall</div>\n            <div>Jul-Sep</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n      <h-segmented-item key="winter">\n        <template #default>\n          <h-space size="small" direction="vertical" align="center">\n            <div>Winter</div>\n            <div>Oct-Dec</div>\n          </h-space>\n        </template>\n      </h-segmented-item>\n    </h-segmented>\n  </h-space>\n</template>\n\n<script setup lang="ts"><\/script>\n\n<style scoped></style>\n',
    path: "demos/components/Segmented/customize.vue"
  }, null, _parent));
  _push(`<h2 id="支持设置图标、角标" tabindex="-1">支持设置图标、角标 <a class="header-anchor" href="#支持设置图标、角标" aria-label="Permalink to &quot;支持设置图标、角标&quot;">​</a></h2><p>使用 <code>icon</code> 设置选项图标</p>`);
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
  _push(`<h2 id="和表单一起使用" tabindex="-1">和表单一起使用 <a class="header-anchor" href="#和表单一起使用" aria-label="Permalink to &quot;和表单一起使用&quot;">​</a></h2><p>可以通过启用 <code>form</code> 属性，以适配 <code>n-form</code> 组件</p>`);
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
  _push(`<h2>Segmented Api</h2><h3>Segmented Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>当前激活的选项，可使用 <code>v-model:active-key</code> 绑定<br>特别说明：undefined、null 值均会当成空值处理</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-active-key</td><td>默认激活的选项，优先级低于 <code>activeKey</code>，当 <code>defaultActiveKey</code> 和 <code>activeKey</code> 均不存在时候，第一个选项激活<br>特别说明：undefined、null 值均会当成空值处理</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Segmented 尺寸大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollable</td><td>当元素过多时候，可滑动</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusable</td><td>当元素选中时候，否滑动到目标元素</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>当超长的时候，是否使用箭头</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">block</td><td>使其适应父级宽度</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">form</td><td>是否启用表单模式，以适配 <code>n-form</code> 组件</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3>Segmented Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">更新 activeKey</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">选项卡变化回调</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr></tbody></table><h2>SegmentedItem Api</h2><h3>SegmentedItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>名称，值使用 <code>key</code></td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>图标名字，为空表示没有图标</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>图标大小</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>SegmentedItem Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击触发点击事件</td><td rowspan="1">( key: <code>HSegmentedValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HSegmentedValue</code></td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Segmented.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Segmented = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Segmented as default
};
