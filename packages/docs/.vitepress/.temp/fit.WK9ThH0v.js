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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap" }, _attrs))} data-v-abdfb6e0><!--[-->`);
  ssrRenderList(_ctx.fits, (item) => {
    _push(`<div data-v-abdfb6e0><p class="text-center" data-v-abdfb6e0>${ssrInterpolate(item)} `);
    if (item === "cover") {
      _push(`<span data-v-abdfb6e0>(default)</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</p>`);
    _push(ssrRenderComponent(_component_h_image, {
      src: "/demo-assets/scene-aurora.svg",
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
const fit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-abdfb6e0"]]);
export {
  fit as default
};
