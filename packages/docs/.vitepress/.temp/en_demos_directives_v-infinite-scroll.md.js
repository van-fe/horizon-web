import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-infinite-scroll.md","filePath":"en/demos/directives/v-infinite-scroll.md"}');
const _sfc_main = { name: "en/demos/directives/v-infinite-scroll.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="load-action-when-scrolling-to-bottom" tabindex="-1">Load Action When Scrolling to Bottom <a class="header-anchor" href="#load-action-when-scrolling-to-bottom" aria-label="Permalink to &quot;Load Action When Scrolling to Bottom&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div v-infinite-scroll="param" class="iScroll">
    <p v-for="(item, idx) in list" :key="idx">
      {{ item }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const list = ref<any[]>([new Date(), new Date(), new Date()]);

    const loadMore = () => {
      param.block = true;
      list.value.push('触底' + new Date());
      setTimeout(() => {
        param.block = false;
      }, 1000);
    };
    const loadMoreTop = () => {
      param.block = true;
      list.value.unshift('触顶' + new Date());
      setTimeout(() => {
        param.block = false;
      }, 1000);
    };
    // 参数需要包裹在reactive内
    const param = reactive({
      onReachBottom: loadMore,
      onReachTop: loadMoreTop,
      block: false,
      distance: 10,
      interval: 1000,
    });

    return {
      param,
      list,
    };
  },
});
<\/script>

<style>
.iScroll {
  max-height: 90px;
  overflow-y: scroll;
}
</style>
`,
    path: "demos/directives/v-infinite-scroll/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="instructions" tabindex="-1">Instructions <a class="header-anchor" href="#instructions" aria-label="Permalink to &quot;Instructions&quot;">​</a></h2><p>Users need to set the scroll style (y-axis) and height of the element in the template themselves.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-infinite-scroll.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vInfiniteScroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vInfiniteScroll as default
};
