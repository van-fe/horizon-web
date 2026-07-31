import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Affix.md","filePath":"en/demos/components/Affix.md"}');
const _sfc_main = { name: "en/demos/components/Affix.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Affix</h1><p class="description">Affix is fixed at the top of the page by default</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Affix is fixed at the top of the page by default</p><p>Affix uses <code>div</code> to wrap elements, so if you need to modify styles, you can directly set <code>style.display</code> to <code>inline-block</code> or other values</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-affix style="display: inline-block">\n    <h-button>Affix top</h-button>\n  </h-affix>\n</template>',
    path: "demos/components/Affix/basic.vue"
  }, null, _parent));
  _push(`<h2 id="set-offset" tabindex="-1">Set offset <a class="header-anchor" href="#set-offset" aria-label="Permalink to &quot;Set offset&quot;">​</a></h2><p>If you want the affix to have a distance from the scroll container, you can specify <code>offset</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-affix :offset="64">\n    <h-button>Affix top with 64px offset</h-button>\n  </h-affix>\n</template>',
    path: "demos/components/Affix/offset.vue"
  }, null, _parent));
  _push(`<h2 id="specify-container" tabindex="-1">Specify Container <a class="header-anchor" href="#specify-container" aria-label="Permalink to &quot;Specify Container&quot;">​</a></h2><p>Affix listens to the scroll event of <code>document.body</code> by default. If you need to specify another one, you can set <code>target</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div id="scroll" class="target-wrapper">\n    <div class="target-container">\n      <h-affix target=".target-wrapper">\n        <h-button>Affix in container</h-button>\n      </h-affix>\n    </div>\n  </div>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.target-wrapper {\n  height: 200px;\n  border: 1px solid var(--h-border-default);\n  overflow: auto;\n}\n\n.target-container {\n  height: 1000px;\n  background: var(--h-bg-weak-activated);\n  padding-top: 50px;\n}\n</style>\n',
    path: "demos/components/Affix/target.vue"
  }, null, _parent));
  _push(`<h2 id="nested-scroll-container" tabindex="-1">Nested Scroll Container <a class="header-anchor" href="#nested-scroll-container" aria-label="Permalink to &quot;Nested Scroll Container&quot;">​</a></h2><p>If the parent of the container where the affix is located can also scroll, without special settings, it cannot accurately ensure that the element is within the container</p><p>At this time, it is necessary to listen to the parent scroll event</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div id="scroll-2" class="target-wrapper">
    <div class="target-container">
      <h-affix ref="affixDomRef" position="top" target="#scroll-2" :offset="20">
        <h-button>Affix in container and won't placed out of container</h-button>
      </h-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const affixDomRef = ref();

function onScroll() {
  affixDomRef.value?.updatePosition();
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
<\/script>

<style scoped>
.target-wrapper {
  height: 200px;
  border: 1px solid var(--h-border-default);
  overflow: auto;
}

.target-container {
  height: 1000px;
  background: var(--h-bg-weak-activated);
  padding-top: 20px;
}
</style>
`,
    path: "demos/components/Affix/multiple-scroll-container.vue"
  }, null, _parent));
  _push(`<h2 id="fixed-bottom" tabindex="-1">Fixed Bottom <a class="header-anchor" href="#fixed-bottom" aria-label="Permalink to &quot;Fixed Bottom&quot;">​</a></h2><p>You can set <code>position = &#39;bottom&#39;</code> to fix the affix at the bottom</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space>\n    <h-affix position="bottom" style="display: inline-block">\n      <h-button>Affix bottom</h-button>\n    </h-affix>\n    <h-affix position="bottom" :offset="100" style="display: inline-block">\n      <h-button>Affix bottom with 100px offset</h-button>\n    </h-affix>\n  </h-space>\n</template>\n',
    path: "demos/components/Affix/bottom.vue"
  }, null, _parent));
  _push(`<h2 id="affix-api" class="no-underline h2"><a href="#affix-api" class="!no-underline">Affix Api</a></h2><h3 id="affix-props" class="no-underline h3"><a href="#affix-props" class="!no-underline">Affix Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td>Configuration for offset.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">position</td><td>Configuration for position.</td><td><code>&#39;top&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>Configuration for target.</td><td><code>string | HTMLElement</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>Configuration for z index.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="affix-exposes" class="no-underline h3"><a href="#affix-exposes" class="!no-underline">Affix Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updatePosition</td><td rowspan="1">Controls update position.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Affix.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Affix = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Affix as default
};
