import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const format = (percentage) => percentage === 100 ? "Full" : `${percentage}%`;
    return {
      format
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_progress = resolveComponent("h-progress");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-progress" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 100,
    size: "xs"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 100,
    format: _ctx.format,
    size: "s"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, { percentage: 50 }, null, _parent));
  _push(ssrRenderComponent(_component_h_progress, {
    percentage: 100,
    size: "l"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Progress/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
