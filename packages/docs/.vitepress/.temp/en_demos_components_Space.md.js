import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Space.md","filePath":"en/demos/components/Space.md"}');
const _sfc_main = { name: "en/demos/components/Space.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Space</h1><p class="description">Set the spacing between components directly.</p><p>Set the spacing between components directly.</p><h2 id="configuration-information" tabindex="-1">Configuration Information <a class="header-anchor" href="#configuration-information" aria-label="Permalink to &quot;Configuration Information&quot;">​</a></h2><table class="md-table"><thead><tr><th>Size</th><th>Dimension</th></tr></thead><tbody><tr><td>small</td><td>8px</td></tr><tr><td>medium</td><td>16px</td></tr><tr><td>large</td><td>24px</td></tr></tbody></table><h2 id="difference-from-flex-component" tabindex="-1">Difference from Flex Component <a class="header-anchor" href="#difference-from-flex-component" aria-label="Permalink to &quot;Difference from Flex Component&quot;">​</a></h2><p>Space provides spacing for inline elements, and it will add a wrapper element for each child element for inline alignment. Suitable for equal spacing arrangement of multiple child elements in rows and columns.</p><p>Flex provides spacing for block-level elements, and it does not add wrapper elements. Suitable for child element layout in vertical or horizontal directions, and provides more flexibility and control capabilities.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Default component horizontal spacing.</p>`);
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
  _push(`<h2 id="vertical-spacing" tabindex="-1">Vertical Spacing <a class="header-anchor" href="#vertical-spacing" aria-label="Permalink to &quot;Vertical Spacing&quot;">​</a></h2><p>Use <code>direction</code> to set vertical spacing</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-space block direction="vertical">\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n    <h-card title="Card Title">Content</h-card>\n  </h-space>\n</template>\n\n<style scoped></style>\n',
    path: "demos/components/Space/vertical.vue"
  }, null, _parent));
  _push(`<h2 id="spacing-size" tabindex="-1">Spacing Size <a class="header-anchor" href="#spacing-size" aria-label="Permalink to &quot;Spacing Size&quot;">​</a></h2><p>Use size to set the spacing between elements. Three sizes are preset: small, middle, large. You can also customize the spacing. If size is not set, it defaults to small.</p>`);
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
  _push(`<h2 id="alignment" tabindex="-1">Alignment <a class="header-anchor" href="#alignment" aria-label="Permalink to &quot;Alignment&quot;">​</a></h2><p>Define the alignment of components by setting the <code>align</code> attribute</p>`);
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
  _push(`<h2 id="auto-wrap" tabindex="-1">Auto Wrap <a class="header-anchor" href="#auto-wrap" aria-label="Permalink to &quot;Auto Wrap&quot;">​</a></h2><p>Set <code>wrap</code>, only effective in <code>horizontal</code></p>`);
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
  _push(`<h2 id="design-token" tabindex="-1">Design Token <a class="header-anchor" href="#design-token" aria-label="Permalink to &quot;Design Token&quot;">​</a></h2><table class="md-table"><thead><tr><th>Variable</th><th>Default Value</th><th>Description</th></tr></thead><tbody><tr><td>--h-space--small</td><td>var(--h-spacing-3)</td><td>small size spacing</td></tr><tr><td>--h-space--medium</td><td>var(--h-spacing-5)</td><td>medium size spacing</td></tr><tr><td>--h-space--large</td><td>var(--h-spacing-7)</td><td>large size spacing</td></tr><tr><td>--h-space--horizontal--small</td><td>var(--h-space--small)</td><td>horizontal small spacing</td></tr><tr><td>--h-space--horizontal--medium</td><td>var(--h-space--medium)</td><td>horizontal medium spacing</td></tr><tr><td>--h-space--horizontal--large</td><td>var(--h-space--large)</td><td>horizontal large spacing</td></tr><tr><td>--h-space--vertical--small</td><td>var(--h-space--small)</td><td>vertical small spacing</td></tr><tr><td>--h-space--vertical--medium</td><td>var(--h-space--medium)</td><td>vertical medium spacing</td></tr><tr><td>--h-space--vertical--large</td><td>var(--h-space--large)</td><td>vertical large spacing</td></tr><tr><td>--h-space--wrap--small</td><td>var(--h-space--vertical--small) var(--h-space--vertical--small)</td><td>wrap small spacing up down left right</td></tr><tr><td>--h-space--wrap--medium</td><td>var(--h-space--vertical--medium) var(--h-space--vertical--medium)</td><td>wrap medium spacing up down left right</td></tr><tr><td>--h-space--wrap--large</td><td>var(--h-space--vertical--large) var(--h-space--vertical--large)</td><td>wrap large spacing up down left right</td></tr></tbody></table><h2 id="space-api" class="no-underline h2"><a href="#space-api" class="!no-underline">Space Api</a></h2><h3 id="space-props" class="no-underline h3"><a href="#space-props" class="!no-underline">Space Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">block</td><td>Configuration for block.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>Configuration for align.</td><td><code>&#39;start&#39; | &#39;end&#39; | &#39;center&#39; | &#39;baseline&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>| HApplicationSizeType<br>  | number<br>  | string<br>  | [number, number]<br>  | [string, string]</code></td><td class="text-center">No</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td>Configuration for direction.</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;horizontal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap</td><td>Configuration for wrap.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fragment</td><td>Configuration for fragment.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>Configuration for separator.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h2 id="spaceitem-api" class="no-underline h2"><a href="#spaceitem-api" class="!no-underline">SpaceItem Api</a></h2><h3 id="spaceitem-props" class="no-underline h3"><a href="#spaceitem-props" class="!no-underline">SpaceItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">class</td><td></td><td><code>string | array</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td></td><td><code>StyleValue</code></td><td class="text-center">No</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Space.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Space = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Space as default
};
