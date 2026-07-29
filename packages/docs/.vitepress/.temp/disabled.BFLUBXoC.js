import { defineComponent, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {};
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_upload = resolveComponent("h-upload");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_upload, {
    action: "https://horizon-web-inspector.demoint.com/upload-mock",
    disabled: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_upload, {
    action: "https://horizon-web-inspector.demoint.com/upload-mock",
    type: "gallery",
    disabled: true
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_upload, {
    action: "https://horizon-web-inspector.demoint.com/upload-mock",
    type: "drop",
    disabled: true,
    accept: "image/*"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Upload/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1d277623"]]);
export {
  disabled as default
};
