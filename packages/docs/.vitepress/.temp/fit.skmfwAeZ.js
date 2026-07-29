import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"]
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap" }, _attrs))} data-v-b975223d><!--[-->`);
  ssrRenderList(_ctx.fits, (item) => {
    _push(`<div data-v-b975223d><p class="text-center" data-v-b975223d>${ssrInterpolate(item)} `);
    if (item === "cover") {
      _push(`<span data-v-b975223d>(default)</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</p>`);
    _push(ssrRenderComponent(_component_h_image, {
      src: "https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg",
      "object-fit": item,
      class: "mr-2 img",
      width: 150,
      height: 150
    }, null, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/fit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b975223d"]]);
export {
  fit as default
};
