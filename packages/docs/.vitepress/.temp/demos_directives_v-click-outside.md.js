import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-click-outside.md","filePath":"zh/demos/directives/v-click-outside.md"}');
const _sfc_main = { name: "demos/directives/v-click-outside.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="基础示例" tabindex="-1">基础示例 <a class="header-anchor" href="#基础示例" aria-label="Permalink to &quot;基础示例&quot;">​</a></h2><p>给目标元素绑定 <code>v-click-outside</code>，当点击其它区域时，会自动触发传入的函数。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button @click="visible = true">Show Modal</h-button>
    <div
      v-if="visible"
      v-click-outside="
        () => {
          visible = false;
        }
      "
      class="absolute mt-4 p-10 bg-white shadow"
    >
      Modal
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible,
    };
  },
});
<\/script>

<style scoped>
.menus {
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}

.menus div {
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.menus div:last-child {
  border-bottom: 0;
}
</style>
`,
    path: "demos/directives/v-click-outside/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-click-outside.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vClickOutside = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vClickOutside as default
};
