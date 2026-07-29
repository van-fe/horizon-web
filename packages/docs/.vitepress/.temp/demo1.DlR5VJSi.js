import { mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))} data-v-915773ab><div class="shadow-sm rounded-xl text-center mr-6" data-v-915773ab>shadow-sm</div><div class="shadow rounded-xl text-center mr-6" data-v-915773ab>shadow</div><div class="shadow-lg rounded-xl text-center mr-6" data-v-915773ab>shadow-lg</div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/shadow/demos/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-915773ab"]]);
export {
  demo1 as default
};
