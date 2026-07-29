import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_progress = resolveComponent("h-progress");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-progress" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_progress, {
    type: "circle",
    percentage: 30,
    content: "内容"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 100,
    content: "content"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 100,
    content: "content",
    placement: "right-top"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 80,
    content: "content",
    placement: "right-bottom"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 30,
    placement: "follow"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 0,
    content: "content",
    placement: "follow"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Progress/contentText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contentText = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  contentText as default
};
