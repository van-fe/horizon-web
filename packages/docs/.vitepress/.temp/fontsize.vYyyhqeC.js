import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><p class="text-sm">text-sm</p><p class="text-base">text-base</p><p class="text-lg">text-lg</p><p class="text-xl">text-xl</p><p class="text-2xl">text-2xl</p><p class="text-3xl">text-3xl</p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/typography/demos/fontsize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fontsize = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  fontsize as default
};
