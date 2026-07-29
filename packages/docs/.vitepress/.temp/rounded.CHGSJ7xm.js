import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      roundedList: [0, 2, 4, "8px", "50%"]
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.roundedList, (rounded2) => {
    _push(ssrRenderComponent(_component_h_image, {
      key: rounded2,
      class: "mr-3",
      src: "https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg",
      width: "150px",
      height: "150px",
      rounded: rounded2
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/rounded.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rounded = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  rounded as default
};
