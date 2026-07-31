import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Pagination.md","filePath":"zh/demos/components/Pagination.md"}');
const _sfc_main = { name: "demos/components/Pagination.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Pagination</h1><p class="description">采用分页的形式分隔长列表，每次只加载一个页面</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
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
  _push(`<h2 id="配置最大页面按钮数" tabindex="-1">配置最大页面按钮数 <a class="header-anchor" href="#配置最大页面按钮数" aria-label="Permalink to &quot;配置最大页面按钮数&quot;">​</a></h2><p>通过 <code>pager-count</code>，控制最大页面按钮数量</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-pagination :total="1000" :pager-count="10" />\n</template>\n',
    path: "demos/components/Pagination/max-buttons-amount.vue"
  }, null, _parent));
  _push(`<h2 id="是否显示范围值" tabindex="-1">是否显示范围值 <a class="header-anchor" href="#是否显示范围值" aria-label="Permalink to &quot;是否显示范围值&quot;">​</a></h2><p>设置 <code>show-total</code>，控制是否显示范围值</p>`);
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
  _push(`<h2 id="仅一页时隐藏分页" tabindex="-1">仅一页时隐藏分页 <a class="header-anchor" href="#仅一页时隐藏分页" aria-label="Permalink to &quot;仅一页时隐藏分页&quot;">​</a></h2><p>可以设置 <code>hide-on-single-page</code>，在只有一页时隐藏分页</p>`);
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
  _push(`<h2 id="控制分页子元素" tabindex="-1">控制分页子元素 <a class="header-anchor" href="#控制分页子元素" aria-label="Permalink to &quot;控制分页子元素&quot;">​</a></h2><p>设置 <code>layout</code>，可以配置展示的元素</p><p>自 <code>2.0.0-beta.4</code> 开始，<code>layout</code> 不仅可以接收字符串数组，也可接收由逗号分割的字符串</p>`);
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
  _push(`<h2 id="前后缀插槽" tabindex="-1">前后缀插槽 <a class="header-anchor" href="#前后缀插槽" aria-label="Permalink to &quot;前后缀插槽&quot;">​</a></h2><p>可以配置 <code>prefix</code> 和 <code>suffix</code> 插槽</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-pagination :total="50" >\n    <template #prefix>我是前缀</template>\n    <template #suffix>我是后缀</template>\n  </h-pagination>\n</template>\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Pagination/slots.vue"
  }, null, _parent));
  _push(`<h2 id="自定义前后翻页按钮内容" tabindex="-1">自定义前后翻页按钮内容 <a class="header-anchor" href="#自定义前后翻页按钮内容" aria-label="Permalink to &quot;自定义前后翻页按钮内容&quot;">​</a></h2><p>可以配置 <code>prev</code> 和 <code>next</code> 插槽，自定义前后翻页的按钮内容</p>`);
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
  _push(`<h2 id="精简模式" tabindex="-1">精简模式 <a class="header-anchor" href="#精简模式" aria-label="Permalink to &quot;精简模式&quot;">​</a></h2><p>配置 <code>type</code> 为 <code>simple</code> 或 <code>simplest</code>，开启精简或极简模式</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10" align="middle">\n    <h-col :span="6">\n      <div class="demo-title">Simple</div>\n    </h-col>\n    <h-col :span="18">\n      <h-pagination :total="100" type="simple" />\n    </h-col>\n  </h-row>\n  <h-row :gutter="10" align="middle">\n    <h-col :span="6">\n      <div class="demo-title">Simplest</div>\n    </h-col>\n    <h-col :span="18">\n      <h-pagination :total="100" type="simplest" />\n    </h-col>\n  </h-row>\n</template>\n',
    path: "demos/components/Pagination/type.vue"
  }, null, _parent));
  _push(`<h2 id="禁用" tabindex="-1">禁用 <a class="header-anchor" href="#禁用" aria-label="Permalink to &quot;禁用&quot;">​</a></h2><p>设置 <code>disabled = true</code> 用来整体禁用，防止在数据请求时用户点击，造成页码抖动跳转的错误</p>`);
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
  _push(`<h2 id="pagination-api" class="no-underline h2"><a href="#pagination-api" class="!no-underline">Pagination Api</a></h2><h3 id="pagination-props" class="no-underline h3"><a href="#pagination-props" class="!no-underline">Pagination Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-page</td><td>当前页数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">total</td><td>数据总数</td><td><code>number</code></td><td class="text-center">是</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-sizes</td><td>指定每页可显示多少条</td><td><code>number[]</code></td><td class="text-center">否</td><td>() =&gt; [10, 20, 30, 40, 50]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-size</td><td>每页条数</td><td><code>number</code></td><td class="text-center">否</td><td>10</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pager-count</td><td>最大页面按钮数，超出此数量的按钮会被折叠</td><td><code>number</code></td><td class="text-center">否</td><td>7</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">layout</td><td>所需子组件的布局<br>2.0.0-beta.4 支持字符串形式，每个子组件需要用逗号分隔开</td><td><code>string | Array&lt;&#39;pager&#39; | &#39;sizes&#39; | &#39;jumper&#39; | &#39;total&#39;&gt;</code></td><td class="text-center">否</td><td>&#39;pager, sizes, jumper, total&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>模式选择，可以选择简要或极简</td><td><code>&#39;default&#39; | &#39;simple&#39; | &#39;simplest&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>替换文字<br>2.0.0-beta.4 开始使用国际化，所以可以不用设置此项</td><td><code>PaginationLabelType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-on-single-page</td><td>在仅有一页时，是否不显示 <code>pagination</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-range</td><td>是否展示显示范围</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>布局方向</td><td><code>&#39;left&#39; | &#39;center&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用<br>在分页获取数据时，可以设置禁用，防止此时用户点击而错误地请求</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-sizes-to-body</td><td>是否将选择每页多少的弹窗传送到 <code>body</code> 节点</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="pagination-emits" class="no-underline h3"><a href="#pagination-emits" class="!no-underline">Pagination Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:page-size</td><td rowspan="1">每页显示个数更新事件，可以使用 <code>v-model:pageSize</code> 做双向绑定</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:current-page</td><td rowspan="1">当前页数更新事件，可以使用 <code>v-model:currentPage</code> 做双向绑定</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change-size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "sizeChange" }, null, _parent));
  _push(`</td><td rowspan="1">改变每页显示个数</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">size-change</td><td rowspan="1">改变每页显示个数</td><td rowspan="1">( pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-prev-page</td><td rowspan="1">上一页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-current-page</td><td rowspan="1">点击当前页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-next-page</td><td rowspan="1">下一页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">jump</td><td rowspan="1">跳转页</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "currentChange" }, null, _parent));
  _push(`</td><td rowspan="1">当前页码改变时触发</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-change</td><td rowspan="1">当前页码改变时触发</td><td rowspan="1">( currentPage: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">modify</td><td rowspan="2">当 <code>current-page</code> 或 <code>page-size</code> 改变时触发</td><td rowspan="2">( currentPage: <code>number</code>, pageSize: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentPage</td><td><code>number</code></td><td>当前页数</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pageSize</td><td><code>number</code></td><td>分页大小</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Pagination.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Pagination as default
};
