import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_image = resolveComponent("h-image");
  _push(ssrRenderComponent(_component_h_image, mergeProps({
    src: "/demo-assets/scene-aurora.svg",
    width: "500px",
    height: "500px"
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/height.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const height = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  height as default
};
