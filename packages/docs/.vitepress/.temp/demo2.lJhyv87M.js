import { mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))} data-v-00478823><div class="rounded-0 white bg-primary text-center mr-3" data-v-00478823>rounded-0</div><div class="rounded-sm white bg-primary text-center mr-3" data-v-00478823>rounded-sm</div><div class="rounded white bg-primary text-center mr-3" data-v-00478823>rounded</div><div class="rounded-lg white bg-primary text-center mr-3" data-v-00478823>rounded-lg</div><div class="rounded-xl white bg-primary text-center mr-3" data-v-00478823>rounded-xl</div><div class="rounded-pill white bg-primary text-center mr-3" style="${ssrRenderStyle({ "width": "160px" })}" data-v-00478823>rounded-pill</div><div class="circle white bg-primary text-center mr-3" data-v-00478823>circle</div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/colors/demos/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-00478823"]]);
export {
  demo2 as default
};
