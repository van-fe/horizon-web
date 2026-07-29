import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_switch = resolveComponent("h-switch");
  _push(`<!--[--><div>`);
  _push(ssrRenderComponent(_component_h_switch, {
    label: "disabled",
    "model-value": true,
    disabled: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_switch, {
    label: "disabled",
    "model-value": false,
    disabled: "",
    class: "ml-4"
  }, null, _parent));
  _push(`</div><div>`);
  _push(ssrRenderComponent(_component_h_switch, {
    label: "readonly",
    readonly: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_switch, {
    class: "ml-4",
    label: "readonly",
    readonly: "",
    "model-value": true
  }, null, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Switch/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  disabled as default
};
