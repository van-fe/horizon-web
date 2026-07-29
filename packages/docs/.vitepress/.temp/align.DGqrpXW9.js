import { ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><p class="text-left">text left</p><p class="text-center">text center</p><p class="text-right">text right</p><p class="text-justify" style="${ssrRenderStyle({ "width": "100px" })}">some text with align justify some text with align justify</p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/typography/demos/align.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const align = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  align as default
};
