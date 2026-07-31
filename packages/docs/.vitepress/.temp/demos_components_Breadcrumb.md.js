import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Breadcrumb.md","filePath":"zh/demos/components/Breadcrumb.md"}');
const _sfc_main = { name: "demos/components/Breadcrumb.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Breadcrumb</h1><p class="description">面包屑导航主要用来呈现系统页面的架构层级，帮助用户快速定位和了解网站内容和组织方式，从而形成很好的位置感，知晓当前所处位置，以及页面的往返路径。同时提供快速的跳转操作，快速返回各个层级的页面</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" />
</template>

`,
    path: "demos/components/Breadcrumb/basic.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸设置" tabindex="-1">尺寸设置 <a class="header-anchor" href="#尺寸设置" aria-label="Permalink to &quot;尺寸设置&quot;">​</a></h2><p>可以配置 <code>medium(default)</code> 和 <code>small</code> 控制尺寸，也可以专门对 <code>BreadcrumbItem</code> 设置大小</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="text-subtitle-2 mb-2">medium(default)</div>
    <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" />
    <div class="text-subtitle-2 mt-4 mb-2">small</div>
    <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" size="small" />
  </div>
</template>

`,
    path: "demos/components/Breadcrumb/size.vue"
  }, null, _parent));
  _push(`<h2 id="跳转链接" tabindex="-1">跳转链接 <a class="header-anchor" href="#跳转链接" aria-label="Permalink to &quot;跳转链接&quot;">​</a></h2><p>可以通过配置 <code>to</code> 或 <code>replace</code> 允许跳转</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-breadcrumb
    :texts="[
      { text: 'Home' },
      { text: 'Components', to: '../Components' },
      { text: 'Checkbox', to: 'Checkbox' },
    ]"
  />
</template>
`,
    path: "demos/components/Breadcrumb/link-mode.vue"
  }, null, _parent));
  _push(`<h2 id="折叠方式" tabindex="-1">折叠方式 <a class="header-anchor" href="#折叠方式" aria-label="Permalink to &quot;折叠方式&quot;">​</a></h2><p>配置 <code>display-type</code> 来控制折叠方式</p><p><code>full</code>: 全部展示，如果超出父级宽度，则会换行展示</p><p><code>ellipsis</code>: 省略展示，超出父级宽度，则将从第二个开始的元素开始收起，直到不超出父级宽度</p><p><strong>要注意的是，使用 <code>ellipsis</code> 显示模式，且使用 <code>h-breadcrumb-item</code> 渲染时，一定要给每一个 <code>h-breadcrumb-item</code> 设置一个唯一的 <code>key</code>，否则渲染内容可能会出现错误</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-block">
    <h-row>
      <h-col :span="24">
        <h-form label-position="left" label-vertical-align="middle" style="max-width: 500px">
          <h-form-item label="width">
            <h-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
          </h-form-item>
        </h-form>
      </h-col>
      <h-col :span="24">
        <div class="demo-title">
          整体折行
        </div>
        <div :style="{width: width + 'px'}">
          <h-breadcrumb>
            <h-breadcrumb-item>Home</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page1</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page2</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page3</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page4</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page5</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page6</h-breadcrumb-item>
          </h-breadcrumb>
        </div>
      </h-col>
      <h-col :span="24">
        <div class="demo-title">超过最大尺寸后，自动收起展示</div>
        <div :style="{width: width + 'px'}">
          <h-breadcrumb display-type="ellipsis" @itemClick="onItemClick">
            <h-breadcrumb-item key="1">Home</h-breadcrumb-item>
            <h-breadcrumb-item key="2" :clickable="true" @click="onClick">Sub Page1</h-breadcrumb-item>
            <h-breadcrumb-item key="3">Sub Page2</h-breadcrumb-item>
            <h-breadcrumb-item key="4">Sub Page3</h-breadcrumb-item>
            <h-breadcrumb-item key="5">Sub Page4</h-breadcrumb-item>
            <h-breadcrumb-item key="6">Sub Page5</h-breadcrumb-item>
            <h-breadcrumb-item key="7">Sub Page6</h-breadcrumb-item>
          </h-breadcrumb>
        </div>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useBreadcrumbItemProps } from '@aurora/horizon-web';

const width = ref(600);

function onItemClick(prop: ExtractPropTypes<typeof useBreadcrumbItemProps>, evt: MouseEvent) {
  console.info('item-click: ', prop, evt);
}

function onClick(evt: MouseEvent) {
  console.info('click:', evt);
}
<\/script>
`,
    path: "demos/components/Breadcrumb/collapse.vue"
  }, null, _parent));
  _push(`<h2 id="特殊样式" tabindex="-1">特殊样式 <a class="header-anchor" href="#特殊样式" aria-label="Permalink to &quot;特殊样式&quot;">​</a></h2><p><code>Horizon-web</code> 设计规范定义了以下的样式规则</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-block">
    <h-row>
      <h-col :span="24">
        <div class="demo-title">
          单个文本超出一定长度后
        </div>
        <h-breadcrumb
          :separator="IconArrowRight"
          :texts="[
        { text: 'Home' },
        { text: 'long text long text long text long text long text long text long text long text' },
        { text: 'Sub Page2' },
      ]"
        />
      </h-col>
      <h-col :span="24">
        <div class="demo-title">当前所在位置增加字重</div>
        <h-breadcrumb
          :title="true"
          :texts="[
      { text: 'Home' },
      { text: 'Sub Page1' },
      { text: 'Sub Page2' },
      { text: 'Sub Page3' },
      { text: 'Sub Page4' },
    ]"
        />
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
<\/script>
`,
    path: "demos/components/Breadcrumb/special-style.vue"
  }, null, _parent));
  _push(`<h2 id="自定义分隔符" tabindex="-1">自定义分隔符 <a class="header-anchor" href="#自定义分隔符" aria-label="Permalink to &quot;自定义分隔符&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-breadcrumb
    class="mb-2"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    separator="*"
  />
  <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]">
    <template #separator><a-icon name="gift" size="12" /></template>
  </h-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
<\/script>
`,
    path: "demos/components/Breadcrumb/custom-divider.vue"
  }, null, _parent));
  _push(`<h2 id="自定义-item-内容" tabindex="-1">自定义 Item 内容 <a class="header-anchor" href="#自定义-item-内容" aria-label="Permalink to &quot;自定义 Item 内容&quot;">​</a></h2><p>可以直接使用 <code>BreadcrumbItem</code> 组件来定义内容</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-breadcrumb>
    <h-breadcrumb-item>Home</h-breadcrumb-item>
    <h-breadcrumb-item>
      <h-dropdown>
        <h-button :text="true" type="normal">Sub Page1 <IconArrowDown size="12" class="ml-2" /></h-button>
        <h-dropdown-menu>
          <h-dropdown-item>Sub Page1-1</h-dropdown-item>
          <h-dropdown-item>Sub Page1-2</h-dropdown-item>
          <h-dropdown-item>Sub Page1-3</h-dropdown-item>
          <h-dropdown-item>Sub Page1-4</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-breadcrumb-item>
    <h-breadcrumb-item>Sub Page2</h-breadcrumb-item>
  </h-breadcrumb>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
  align-items: center;
}

.h-button {
  padding: 0 6px;
}

:deep(.h-button__content) {
  display: inline-flex;
  align-items: center;
}
</style>
`,
    path: "demos/components/Breadcrumb/custom-item.vue"
  }, null, _parent));
  _push(`<h2 id="breadcrumb-api" class="no-underline h2"><a href="#breadcrumb-api" class="!no-underline">Breadcrumb Api</a></h2><h3 id="breadcrumb-props" class="no-underline h3"><a href="#breadcrumb-props" class="!no-underline">Breadcrumb Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>分隔符</td><td><code>string | Component</code></td><td class="text-center">否</td><td>&#39;/&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>用作标题展示，最后一项激活的 item 会加粗展示</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">texts</td><td>需要渲染的内容数组</td><td><code>BreadcrumbItem[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">display-type</td><td>展示方式<br>full: 不折叠，全部展示<br>ellipsis: 在超过最大宽度后，会自动从第二个 item 开始折叠起来，并用 dropdown 显示</td><td><code>&#39;full&#39; | &#39;ellipsis&#39;</code></td><td class="text-center">否</td><td>&#39;full&#39;</td></tr></tbody></table><h3 id="breadcrumb-emits" class="no-underline h3"><a href="#breadcrumb-emits" class="!no-underline">Breadcrumb Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-click</td><td rowspan="2">点击子元素后触发</td><td rowspan="2">( itemProp: <code>BreadcrumbItem</code>, e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">itemProp</td><td><code>BreadcrumbItem</code></td><td>子元素的 <code>prop</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>点击事件或键盘事件</td></tr></tbody></table><h2 id="breadcrumbitem-api" class="no-underline h2"><a href="#breadcrumbitem-api" class="!no-underline">BreadcrumbItem Api</a></h2><h3 id="breadcrumbitem-props" class="no-underline h3"><a href="#breadcrumbitem-props" class="!no-underline">BreadcrumbItem Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>分隔符</td><td><code>string | Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>用作标题展示，最后一项激活的 item 会加粗展示</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>路由跳转对象，同 vue-router 的 to</td><td><code>RouteLocationRaw</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td>在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickable</td><td>是否可点击，点击后会对外抛出 <code>click</code> 事件<br>如果设置了 <code>prop.to</code>，无需额外设置此值</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="breadcrumbitem-emits" class="no-underline h3"><a href="#breadcrumbitem-emits" class="!no-underline">BreadcrumbItem Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击后触发</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>点击事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Breadcrumb.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Breadcrumb as default
};
