import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Other Global Utility Classes","description":"","frontmatter":{},"headers":[],"relativePath":"en/features/tools/doc.md","filePath":"en/features/tools/doc.md"}');
const _sfc_main = { name: "en/features/tools/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="other-global-utility-classes" tabindex="-1">Other Global Utility Classes <a class="header-anchor" href="#other-global-utility-classes" aria-label="Permalink to &quot;Other Global Utility Classes&quot;">​</a></h1><h2 id="usezindex" tabindex="-1">useZIndex <a class="header-anchor" href="#usezindex" aria-label="Permalink to &quot;useZIndex&quot;">​</a></h2><p><code>horizon-web</code> exposes the <code>useZIndex</code> method to help developers perceive the <code>z-index</code> value in components and also control its value</p><p><code>useZIndex</code> has a special point: if the value passed when calling <code>useZIndex</code> is smaller than the current <code>z-index</code>, it will not be set to the passed value</p><p>This is to avoid the problem that some components are dynamically generated and <code>z-index</code> is a fixed value, causing <code>z-index</code> to be reset every time the component is generated</p><p>If you need to change <code>z-index</code>, you can call the <code>set</code> method</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <p>{{ zIndex }}</p>
    <p>
      <h-button @click="increase">Increase</h-button>
      <h-button style="margin-left: 10px" @click="reset">Reset</h-button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useZIndex } from '@aurora/horizon-web';

export default defineComponent({
  name: 'UseZIndex',
  setup() {
    const zIndexHandler = useZIndex();
    const zIndex = ref(zIndexHandler.current);
    const increase = () => {
      zIndex.value = zIndexHandler.next();
    };

    const reset = () => {
      zIndex.value = zIndexHandler.set(2000);
    };

    return {
      zIndex,
      zIndexHandler,
      increase,
      reset,
    };
  },
});
<\/script>
`,
    path: "en/features/tools/demos/useZIndex.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/features/tools/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
