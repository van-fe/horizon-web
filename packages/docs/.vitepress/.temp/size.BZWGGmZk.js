import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_alert = resolveComponent("h-alert");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_alert, {
    "show-icon": "",
    closable: true,
    size: "small",
    title: "small",
    description: "Info Text",
    type: "info"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_alert, {
    "show-icon": "",
    closable: true,
    "primary-button-text": "确定",
    "default-button-text": "取消",
    size: "medium",
    title: "medium",
    description: "Info Text",
    type: "info"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Alert/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-66d3d7c5"]]);
export {
  size as default
};
