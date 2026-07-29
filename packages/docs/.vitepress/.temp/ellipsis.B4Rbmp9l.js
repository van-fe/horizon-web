import { ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><p class="text-ellipsis" style="${ssrRenderStyle({ "width": "300px" })}">some long text some long text some long text some long text </p><p class="text-ellipsis-1" style="${ssrRenderStyle({ "width": "300px" })}">one line text one line text one line text one line text one line text </p><p class="text-ellipsis-2" style="${ssrRenderStyle({ "width": "300px" })}">two line text two line text two line text two line text two line text two line text two line text two line text two line text </p><p class="text-ellipsis-3" style="${ssrRenderStyle({ "width": "300px" })}">three line text three line text three line text three line text three line text three line text three line text three line text three line text three line text three line text </p><p class="text-ellipsis-4" style="${ssrRenderStyle({ "width": "300px" })}">four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text four line text </p><p class="text-ellipsis-5" style="${ssrRenderStyle({ "width": "300px" })}">five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text five line text </p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/typography/demos/ellipsis.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ellipsis = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ellipsis as default
};
