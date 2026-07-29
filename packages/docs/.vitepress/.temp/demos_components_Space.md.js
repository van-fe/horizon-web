import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Space.md","filePath":"zh/demos/components/Space.md"}');
const _sfc_main = { name: "demos/components/Space.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Space</h1><p class="description">设置元素之间的间距</p><p>设置组件直接的间距。</p><h2 id="配置信息" tabindex="-1">配置信息 <a class="header-anchor" href="#配置信息" aria-label="Permalink to &quot;配置信息&quot;">​</a></h2><table class="md-table"><thead><tr><th>大小</th><th>尺寸</th></tr></thead><tbody><tr><td>small</td><td>8px</td></tr><tr><td>medium</td><td>16px</td></tr><tr><td>large</td><td>24px</td></tr></tbody></table><h2 id="与-flex-组件的区别" tabindex="-1">与 Flex 组件的区别 <a class="header-anchor" href="#与-flex-组件的区别" aria-label="Permalink to &quot;与 Flex 组件的区别&quot;">​</a></h2><p>Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。</p><p>Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>默认组件水平间距。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
<\/script>

<template>
  <h-space>
    <h-checkbox v-model="disabled">禁用按钮</h-checkbox>
    <div>Space</div>
    <h-button :disabled="disabled">Created</h-button>
    <h-button :disabled="disabled" type="normal">Refresh</h-button>
    <h-button :disabled="disabled" type="normal" icon="full_screen" />
  </h-space>
</template>

<style scoped></style>
`,
    path: "demos/components/Space/basic.vue"
  }, null, _parent));
  _push(`<h2 id="垂直间距" tabindex="-1">垂直间距 <a class="header-anchor" href="#垂直间距" aria-label="Permalink to &quot;垂直间距&quot;">​</a></h2><p>使用 <code>direction</code> 设置使用垂直间距</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-space block direction="vertical">\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n  </h-space>\n</template>\n\n<style scoped></style>\n',
    path: "demos/components/Space/vertical.vue"
  }, null, _parent));
  _push(`<h2 id="间距大小" tabindex="-1">间距大小 <a class="header-anchor" href="#间距大小" aria-label="Permalink to &quot;间距大小&quot;">​</a></h2><p>使用 size 设置元素之间的间距，预设了 small、middle、large 三种尺寸，也可以自定义间距，若不设置 size，则默认为 small。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const size = ref<string | number>('medium');
const customized = ref(false);

const onChecked = (checked: boolean) => {
  if (checked) size.value = 50;
  else size.value = 'medium';
};
<\/script>

<template>
  <h-space direction="vertical" size="large">
    <h-space block size="medium">
      <h-space align="start" size="small">
        Size
        <h-radio v-model="size" :disabled="customized" label="small">small</h-radio>
        <h-radio v-model="size" :disabled="customized" label="medium">medium</h-radio>
        <h-radio v-model="size" :disabled="customized" label="large">large</h-radio>
      </h-space>
      <h-space>
        Other Setting:
        <h-checkbox v-model="customized" @change="onChecked">Customize</h-checkbox>
        {{ customized ? \`size: \${size}px\` : '' }}
      </h-space>
    </h-space>

    <h-slider v-if="customized" v-model="size" :min="8" :max="100" :step="1" />

    <h-space :size="size">
      <h-button>Created</h-button>
      <h-button type="normal">Refresh</h-button>
      <h-button type="normal" icon="full_screen" />
    </h-space>
  </h-space>
</template>

<style scoped></style>
`,
    path: "demos/components/Space/size.vue"
  }, null, _parent));
  _push(`<h2 id="对齐" tabindex="-1">对齐 <a class="header-anchor" href="#对齐" aria-label="Permalink to &quot;对齐&quot;">​</a></h2><p>通过设置 <code>align</code> 属性定义组件的对齐方式</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const align = ref('center');
const direction = ref('horizontal');
<\/script>

<template>
  <h-space block direction="vertical">
    <h-space>
      Direction
      <h-radio v-model="direction" label="horizontal">horizontal</h-radio>
      <h-radio v-model="direction" label="vertical">vertical</h-radio>
    </h-space>
    <h-space>
      Align
      <h-radio v-model="align" label="start">start</h-radio>
      <h-radio v-model="align" label="center">center</h-radio>
      <h-radio v-model="align" label="end">end</h-radio>
      <h-radio v-model="align" label="baseline">baseline</h-radio>
    </h-space>
    <h-space
      :direction="direction"
      :align="align"
      style="border: 1px solid var(--h-bg-brand-default)"
    >
      Space
      <h-button>Button</h-button>
      <div style="height: 100px; background: #f1f2f3; padding: 10px">block</div>
    </h-space>
  </h-space>
</template>

<style scoped></style>
`,
    path: "demos/components/Space/align.vue"
  }, null, _parent));
  _push(`<h2 id="自动换行" tabindex="-1">自动换行 <a class="header-anchor" href="#自动换行" aria-label="Permalink to &quot;自动换行&quot;">​</a></h2><p>设置 <code>wrap</code>，仅在 <code>horizontal</code>有效</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { reactive } from 'vue';

const size = reactive([10, 8]);
<\/script>

<template>
  <h-space block direction="vertical">
    <h-space block size="small" direction="vertical">
      <h-space block direction="vertical">
        Horizontal
        <h-slider v-model="size[0]" :step="1" :min="0" :max="100" />
      </h-space>
      <h-space block direction="vertical">
        Vertical
        <h-slider v-model="size[1]" :step="1" :min="0" :max="100" />
      </h-space>
    </h-space>
    <h-space wrap :size="size">
      <h-button v-for="i in 20" :key="i">Button</h-button>
    </h-space>
  </h-space>
</template>

<style scoped></style>
`,
    path: "demos/components/Space/wrap.vue"
  }, null, _parent));
  _push(`<h2 id="design-token" tabindex="-1">Design Token <a class="header-anchor" href="#design-token" aria-label="Permalink to &quot;Design Token&quot;">​</a></h2><table class="md-table"><thead><tr><th>变量</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>--n-space--small</td><td>var(--n-spacing-3)</td><td>small尺寸间距</td></tr><tr><td>--n-space--medium</td><td>var(--n-spacing-5)</td><td>medium尺寸间距</td></tr><tr><td>--n-space--large</td><td>var(--n-spacing-7)</td><td>large尺寸间距</td></tr><tr><td>--n-space--horizontal--small</td><td>var(--n-space--small)</td><td>横向small间距</td></tr><tr><td>--n-space--horizontal--medium</td><td>var(--n-space--medium)</td><td>横向medium间距</td></tr><tr><td>--n-space--horizontal--large</td><td>var(--n-space--large)</td><td>横向large间距</td></tr><tr><td>--n-space--vertical--small</td><td>var(--n-space--small)</td><td>纵向small间距</td></tr><tr><td>--n-space--vertical--medium</td><td>var(--n-space--medium)</td><td>纵向medium间距</td></tr><tr><td>--n-space--vertical--large</td><td>var(--n-space--large)</td><td>纵向large间距</td></tr><tr><td>--n-space--wrap--small</td><td>var(--n-space--vertical--small) var(--n-space--vertical--small)</td><td>换行时候上下左右small间距</td></tr><tr><td>--n-space--wrap--medium</td><td>var(--n-space--vertical--medium) var(--n-space--vertical--medium)</td><td>换行时候上下左右medium间距</td></tr><tr><td>--n-space--wrap--large</td><td>var(--n-space--vertical--large) var(--n-space--vertical--large)</td><td>换行时候上下左右large间距</td></tr></tbody></table><h2>Space Api</h2><h3>Space Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">block</td><td>将宽度调整为父元素宽度</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>对齐方式</td><td><code>&#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;baseline&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>间距大小</td><td><code>| HApplicationSizeType<br>  | number<br>  | string<br>  | [number, number]<br>  | [string, string]</code></td><td class="text-center">否</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td>间距方向</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">否</td><td>&#39;horizontal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap</td><td>是否换行，仅在 <code>type=horizontal</code> 时有效</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fragment</td><td>是否转化 Fragment 节点列表</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>启用分隔符</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h2>SpaceItem Api</h2><h3>SpaceItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">class</td><td></td><td><code>string | array</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td></td><td><code>StyleValue</code></td><td class="text-center">否</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Space.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Space = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Space as default
};
