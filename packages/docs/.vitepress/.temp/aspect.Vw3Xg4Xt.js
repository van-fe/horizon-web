import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      ratios: ["1/1", "16/9"]
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.ratios, (ratio) => {
    _push(`<div class="mr-3" style="${ssrRenderStyle({ "width": "20%" })}"><p class="text-center">${ssrInterpolate(ratio.replace("/", ":"))}</p>`);
    _push(ssrRenderComponent(_component_h_image, {
      src: "/demo-assets/scene-aurora.svg",
      width: "100%",
      "aspect-ratio": ratio
    }, null, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/aspect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aspect = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  aspect as default
};
