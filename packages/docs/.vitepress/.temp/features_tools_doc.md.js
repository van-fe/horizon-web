import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"其他的一些全局工具类","description":"","frontmatter":{},"headers":[],"relativePath":"features/tools/doc.md","filePath":"zh/features/tools/doc.md"}');
const _sfc_main = { name: "features/tools/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="其他的一些全局工具类" tabindex="-1">其他的一些全局工具类 <a class="header-anchor" href="#其他的一些全局工具类" aria-label="Permalink to &quot;其他的一些全局工具类&quot;">​</a></h1><h2 id="usezindex" tabindex="-1">useZIndex <a class="header-anchor" href="#usezindex" aria-label="Permalink to &quot;useZIndex&quot;">​</a></h2><p><code>horizon-web</code> 对外暴露了 <code>useZIndex</code> 方法，用来帮助开发者可以感知组件中的 <code>z-index</code> 数值，并且也可以控制其值</p><p><code>useZIndex</code> 有个特殊的点：如果在调用 <code>useZIndex</code> 时传入的值比当前 <code>z-index</code> 小，则不会被设置为传入的值</p><p>这是为了避免有些组件动态生成且 <code>z-index</code> 是固定值，导致每次生成该组件时，<code>z-index</code> 都会被重置的问题</p><p>如果你需要更改 <code>z-index</code>，可以调用 <code>set</code> 方法</p>`);
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
    path: "zh/features/tools/demos/useZIndex.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/features/tools/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
