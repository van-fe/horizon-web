import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_progress = resolveComponent("h-progress");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-progress" }, _attrs))} data-v-23f18132>`);
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 60,
    size: "xs"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 25,
    size: "s"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 60,
    size: "m"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 70,
    size: "l"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 85,
    size: "s",
    status: "success"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 70,
    size: "m",
    status: "exception"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 70,
    size: "l",
    status: "warning"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Progress/circle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const circle = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-23f18132"]]);
export {
  circle as default
};
