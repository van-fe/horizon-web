import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-draggable.md","filePath":"zh/demos/directives/v-draggable.md"}');
const _sfc_main = { name: "demos/directives/v-draggable.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="基本示例" tabindex="-1">基本示例 <a class="header-anchor" href="#基本示例" aria-label="Permalink to &quot;基本示例&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="drag-container">\n    <div v-draggable>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.drag-container {\n  height: 200px;\n}\n\n.drag-container div {\n  height: 80px;\n  width: 80px;\n  background: #14798F;\n}\n\n</style>\n',
    path: "demos/directives/v-draggable/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="切换允许移动" tabindex="-1">切换允许移动 <a class="header-anchor" href="#切换允许移动" aria-label="Permalink to &quot;切换允许移动&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="enabled" label="允许移动" label-position="right" />
  <div class="drag-container">
    <div v-draggable="{ enabled }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const enabled = ref(true);
    return {
      enabled,
    };
  },
});
<\/script>

<style scoped>
.drag-container {
  height: 200px;
}

.drag-container div {
  height: 80px;
  width: 80px;
  background: #14798f;
}
</style>
`,
    path: "demos/directives/v-draggable/demo2.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-draggable.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vDraggable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vDraggable as default
};
