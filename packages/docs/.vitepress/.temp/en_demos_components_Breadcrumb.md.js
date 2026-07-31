import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Breadcrumb.md","filePath":"en/demos/components/Breadcrumb.md"}');
const _sfc_main = { name: "en/demos/components/Breadcrumb.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Breadcrumb</h1><p class="description">You can configure <code>medium(default)</code> and <code>small</code> to control the size, or specifically set the size for <code>BreadcrumbItem</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]" />
</template>

`,
    path: "demos/components/Breadcrumb/basic.vue"
  }, null, _parent));
  _push(`<h2 id="size-settings" tabindex="-1">Size Settings <a class="header-anchor" href="#size-settings" aria-label="Permalink to &quot;Size Settings&quot;">​</a></h2><p>You can configure <code>medium(default)</code> and <code>small</code> to control the size, or specifically set the size for <code>BreadcrumbItem</code></p>`);
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
  _push(`<h2 id="jump-link" tabindex="-1">Jump Link <a class="header-anchor" href="#jump-link" aria-label="Permalink to &quot;Jump Link&quot;">​</a></h2><p>You can allow jumping by configuring <code>to</code> or <code>replace</code></p>`);
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
  _push(`<h2 id="collapse-mode" tabindex="-1">Collapse Mode <a class="header-anchor" href="#collapse-mode" aria-label="Permalink to &quot;Collapse Mode&quot;">​</a></h2><p>Configure <code>display-type</code> to control the collapse mode</p><p><code>full</code>: Display all, if it exceeds the parent width, it will wrap</p><p><code>ellipsis</code>: Ellipsis display, if it exceeds the parent width, elements starting from the second one will be collapsed until it does not exceed the parent width</p><p><strong>Note that when using the <code>ellipsis</code> display mode and rendering with <code>h-breadcrumb-item</code>, you must set a unique <code>key</code> for each <code>h-breadcrumb-item</code>, otherwise the rendered content may be incorrect</strong></p>`);
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
  _push(`<h2 id="special-style" tabindex="-1">Special Style <a class="header-anchor" href="#special-style" aria-label="Permalink to &quot;Special Style&quot;">​</a></h2><p><code>Horizon-web</code> design specification defines the following style rules</p>`);
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
  _push(`<h2 id="custom-divider" tabindex="-1">Custom Divider <a class="header-anchor" href="#custom-divider" aria-label="Permalink to &quot;Custom Divider&quot;">​</a></h2>`);
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
  _push(`<h2 id="custom-item-content" tabindex="-1">Custom Item Content <a class="header-anchor" href="#custom-item-content" aria-label="Permalink to &quot;Custom Item Content&quot;">​</a></h2><p>You can directly use the <code>BreadcrumbItem</code> component to define content</p>`);
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
  _push(`<h2 id="breadcrumb-api" class="no-underline h2"><a href="#breadcrumb-api" class="!no-underline">Breadcrumb Api</a></h2><h3 id="breadcrumb-props" class="no-underline h3"><a href="#breadcrumb-props" class="!no-underline">Breadcrumb Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>Configuration for separator.</td><td><code>string | Component</code></td><td class="text-center">No</td><td>&#39;/&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">texts</td><td>Configuration for texts.</td><td><code>BreadcrumbItem[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">display-type</td><td>Configuration for display type.</td><td><code>&#39;full&#39; | &#39;ellipsis&#39;</code></td><td class="text-center">No</td><td>&#39;full&#39;</td></tr></tbody></table><h3 id="breadcrumb-emits" class="no-underline h3"><a href="#breadcrumb-emits" class="!no-underline">Breadcrumb Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-click</td><td rowspan="2">Emitted when item click changes.</td><td rowspan="2">( itemProp: <code>BreadcrumbItem</code>, e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">itemProp</td><td><code>BreadcrumbItem</code></td><td>The item prop value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr></tbody></table><h2 id="breadcrumbitem-api" class="no-underline h2"><a href="#breadcrumbitem-api" class="!no-underline">BreadcrumbItem Api</a></h2><h3 id="breadcrumbitem-props" class="no-underline h3"><a href="#breadcrumbitem-props" class="!no-underline">BreadcrumbItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>Configuration for separator.</td><td><code>string | Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>Configuration for to.</td><td><code>RouteLocationRaw</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td>Configuration for replace.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickable</td><td>Configuration for clickable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="breadcrumbitem-emits" class="no-underline h3"><a href="#breadcrumbitem-emits" class="!no-underline">BreadcrumbItem Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>The e value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Breadcrumb.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Breadcrumb as default
};
