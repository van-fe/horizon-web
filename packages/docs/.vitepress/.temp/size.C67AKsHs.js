import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-subtitle-2 mb-2">medium(default)</div>`);
  _push(ssrRenderComponent(_component_h_breadcrumb, { texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }] }, null, _parent));
  _push(`<div class="text-subtitle-2 mt-4 mb-2">small</div>`);
  _push(ssrRenderComponent(_component_h_breadcrumb, {
    texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }],
    size: "small"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
