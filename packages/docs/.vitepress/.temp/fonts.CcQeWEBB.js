import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><p class="text-headline-1">headline-1</p><p class="text-headline-2">headline-2</p><p class="text-subtitle-1">subtitle-1</p><p class="text-subtitle-2">subtitle-2</p><p class="text-subtitle-3">subtitle-3</p><p class="text-body-1">body-1</p><p class="text-body-2">body-2</p><p class="text-body-3">body-3</p><p class="text-caption-1">caption-1</p><p class="text-caption-2">caption-2</p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/typography/demos/fonts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fonts = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  fonts as default
};
