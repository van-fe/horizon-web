import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-infinite-scroll.md","filePath":"zh/demos/directives/v-infinite-scroll.md"}');
const _sfc_main = { name: "demos/directives/v-infinite-scroll.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="滚动到底部进行加载动作" tabindex="-1">滚动到底部进行加载动作 <a class="header-anchor" href="#滚动到底部进行加载动作" aria-label="Permalink to &quot;滚动到底部进行加载动作&quot;">​</a></h2>`);
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
  _push(`<h2 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h2><p>用户需要自行在模版中对元素的滚动样式（y轴）及高度进行设置。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-infinite-scroll.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vInfiniteScroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vInfiniteScroll as default
};
