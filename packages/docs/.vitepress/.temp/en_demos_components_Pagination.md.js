import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Pagination.md","filePath":"en/demos/components/Pagination.md"}');
const _sfc_main = { name: "en/demos/components/Pagination.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Pagination</h1><p class="description">Control the maximum number of page buttons through <code>pager-count</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="align">
      <h-radio-group v-model="align">
        <h-radio label="left">left</h-radio>
        <h-radio label="center">center</h-radio>
        <h-radio label="right">right</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">当你页数不超过7页时</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="50" :align="align" @modify="onModify" @currentChange="onCurrentChange" @sizeChange="onSizeChange" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">当你页数超过7页时</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" :align="align" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const align = ref('right');

function onCurrentChange(currentPage: number) {
  console.info('current-page: ', currentPage);
}

function onSizeChange(size: number) {
  console.info('size: ', size);
}

function onModify(currentPage: number, pageSize: number) {
  console.info({currentPage, pageSize});
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Pagination/basic.vue"
  }, null, _parent));
  _push(`<h2 id="configure-maximum-page-button-count" tabindex="-1">Configure Maximum Page Button Count <a class="header-anchor" href="#configure-maximum-page-button-count" aria-label="Permalink to &quot;Configure Maximum Page Button Count&quot;">​</a></h2><p>Control the maximum number of page buttons through <code>pager-count</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-pagination :total="1000" :pager-count="10" />\n</template>\n',
    path: "demos/components/Pagination/max-buttons-amount.vue"
  }, null, _parent));
  _push(`<h2 id="whether-to-display-range-value" tabindex="-1">Whether to Display Range Value <a class="header-anchor" href="#whether-to-display-range-value" aria-label="Permalink to &quot;Whether to Display Range Value&quot;">​</a></h2><p>Set <code>show-total</code> to control whether to display range value</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="show total">
      <h-radio-group v-model="showTotal">
        <h-radio :label="true">true</h-radio>
        <h-radio :label="false">false</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-pagination :total="100" :show-range="showTotal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showTotal = ref(true);
<\/script>
`,
    path: "demos/components/Pagination/show-range.vue"
  }, null, _parent));
  _push(`<h2 id="hide-pagination-when-only-one-page" tabindex="-1">Hide Pagination When Only One Page <a class="header-anchor" href="#hide-pagination-when-only-one-page" aria-label="Permalink to &quot;Hide Pagination When Only One Page&quot;">​</a></h2><p>You can set <code>hide-on-single-page</code> to hide pagination when there is only one page</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="hide on single page">
      <h-radio-group v-model="hideOnSinglePage">
        <h-radio :label="true">true</h-radio>
        <h-radio :label="false">false</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="total">
      <h-input-number v-model="total" :min="0" :step="10" :enable-lang-press="true" style="max-width: 150px" />
    </h-form-item>
  </h-form>
  <h-pagination :total="total" :hide-on-single-page="hideOnSinglePage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideOnSinglePage = ref(false);
const total = ref(10);
<\/script>
`,
    path: "demos/components/Pagination/hide-on-single-page.vue"
  }, null, _parent));
  _push(`<h2 id="control-pagination-sub-elements" tabindex="-1">Control Pagination Sub-elements <a class="header-anchor" href="#control-pagination-sub-elements" aria-label="Permalink to &quot;Control Pagination Sub-elements&quot;">​</a></h2><p>Set <code>layout</code> to configure displayed elements</p><p>Starting from <code>2.0.0-beta.4</code>, <code>layout</code> can not only receive string arrays, but also strings separated by commas</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">基础用法</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="50" layout="pager" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, sizes" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+页面跳转</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+总页数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, total" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量+页面跳转</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, sizes, jumper" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量+展示总数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" :layout="['pager', 'sizes', 'total']" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+页面跳转+展示总数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper, total" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">全部展示</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper, total, sizes" :show-range="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Pagination/layout.vue"
  }, null, _parent));
  _push(`<h2 id="prefix-suffix-slots" tabindex="-1">Prefix/Suffix Slots <a class="header-anchor" href="#prefix-suffix-slots" aria-label="Permalink to &quot;Prefix/Suffix Slots&quot;">​</a></h2><p>You can configure <code>prefix</code> and <code>suffix</code> slots</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-pagination :total="50" >\n    <template #prefix>我是前缀</template>\n    <template #suffix>我是后缀</template>\n  </h-pagination>\n</template>\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Pagination/slots.vue"
  }, null, _parent));
  _push(`<h2 id="custom-previous-next-page-button-content" tabindex="-1">Custom Previous/Next Page Button Content <a class="header-anchor" href="#custom-previous-next-page-button-content" aria-label="Permalink to &quot;Custom Previous/Next Page Button Content&quot;">​</a></h2><p>You can configure <code>prev</code> and <code>next</code> slots to customize the button content for previous/next page</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-pagination :total="50" >
    <template #prev>
      <IconTriangleLeftFilled />
    </template>
    <template #next>
      <IconTriangleRightFilled />
    </template>
  </h-pagination>
</template>
<script setup lang="ts">
import {IconTriangleLeftFilled, IconTriangleRightFilled} from '@aurora/icon';
<\/script>
`,
    path: "demos/components/Pagination/prev-next.vue"
  }, null, _parent));
  _push(`<h2 id="simplified-mode" tabindex="-1">Simplified Mode <a class="header-anchor" href="#simplified-mode" aria-label="Permalink to &quot;Simplified Mode&quot;">​</a></h2><p>Configure <code>type</code> as <code>simple</code> or <code>simplest</code> to enable simplified or minimal mode</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10" align="middle">\n    <h-col :span="6">\n      <div class="demo-title">Simple</div>\n    </h-col>\n    <h-col :span="18">\n      <h-pagination :total="100" type="simple" />\n    </h-col>\n  </h-row>\n  <h-row :gutter="10" align="middle">\n    <h-col :span="6">\n      <div class="demo-title">Simplest</div>\n    </h-col>\n    <h-col :span="18">\n      <h-pagination :total="100" type="simplest" />\n    </h-col>\n  </h-row>\n</template>\n',
    path: "demos/components/Pagination/type.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Set <code>disabled = true</code> to disable globally, preventing users from clicking during data requests, which would cause page number jitter and jump errors</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-disabled="middle">
    <h-form-item label="disabled">
      <h-switch v-model="disabled" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10" disabled="middle">
    <h-col :span="24">
      <h-pagination :total="50" :disabled="disabled" align="right" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Pagination/disabled.vue"
  }, null, _parent));
  _push(`<h2>Pagination Api</h2><h3>Pagination Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-page</td><td>当前页数</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">total</td><td>数据总数</td><td><code>number</code></td><td class="text-center">Yes</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-sizes</td><td>指定每页可显示多少条</td><td><code>number[]</code></td><td class="text-center">No</td><td>() =&gt; [10, 20, 30, 40, 50]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-size</td><td>每页条数</td><td><code>number</code></td><td class="text-center">No</td><td>10</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pager-count</td><td>最大页面按钮数，超出此数量的按钮会被折叠</td><td><code>number</code></td><td class="text-center">No</td><td>7</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">layout</td><td>所需子组件的布局<br>2.0.0-beta.4 支持字符串形式，每个子组件需要用逗号分隔开</td><td><code>string | Array&lt;&#39;pager&#39; | &#39;sizes&#39; | &#39;jumper&#39; | &#39;total&#39;&gt;</code></td><td class="text-center">No</td><td>&#39;pager, sizes, jumper, total&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>模式选择，可以选择简要或极简</td><td><code>&#39;default&#39; | &#39;simple&#39; | &#39;simplest&#39;</code></td><td class="text-center">No</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>替换文字<br>2.0.0-beta.4 开始使用国际化，所以可以不用设置此项</td><td><code>PaginationLabelType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-on-single-page</td><td>在仅有一页时，是否不显示 <code>pagination</code></td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-range</td><td>是否展示显示范围</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>布局方向</td><td><code>&#39;left&#39; | &#39;center&#39; | &#39;right&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用<br>在分页获取数据时，可以设置禁用，防止此时用户点击而错误地请求</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-sizes-to-body</td><td>是否将选择每页多少的弹窗传送到 <code>body</code> 节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Pagination Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:page-size</td><td rowspan="1">每页显示个数更新事件，可以使用 <code>v-model:pageSize</code> 做双向绑定</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:current-page</td><td rowspan="1">当前页数更新事件，可以使用 <code>v-model:currentPage</code> 做双向绑定</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change-size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "sizeChange" }, null, _parent));
  _push(`</td><td rowspan="1">改变每页显示个数</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">size-change</td><td rowspan="1">改变每页显示个数</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-prev-page</td><td rowspan="1">上一页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-current-page</td><td rowspan="1">点击当前页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-next-page</td><td rowspan="1">下一页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">jump</td><td rowspan="1">跳转页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "currentChange" }, null, _parent));
  _push(`</td><td rowspan="1">当前页码改变时触发</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-change</td><td rowspan="1">当前页码改变时触发</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">modify</td><td rowspan="2">当 <code>current-page</code> 或 <code>page-size</code> 改变时触发</td><td rowspan="2">( currentPage: <code>number</code>, pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Pagination.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Pagination as default
};
