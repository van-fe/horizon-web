import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-click-outside.md","filePath":"en/demos/directives/v-click-outside.md"}');
const _sfc_main = { name: "en/demos/directives/v-click-outside.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h2><p>Bind <code>v-click-outside</code> to the target element. When clicking other areas, the passed function will be automatically triggered.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-click-outside.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vClickOutside = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vClickOutside as default
};
