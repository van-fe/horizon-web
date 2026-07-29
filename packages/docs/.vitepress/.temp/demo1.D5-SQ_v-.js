import { mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-column justify-space-around demo" }, _attrs))} data-v-b6df7ee4><div class="flex justify-space-between" data-v-b6df7ee4><div class="white bg-primary text-center" data-v-b6df7ee4>1</div><div class="white bg-primary text-center" data-v-b6df7ee4>2</div><div class="white bg-primary text-center" data-v-b6df7ee4>3</div></div><div class="flex justify-space-between" data-v-b6df7ee4><div class="white bg-primary text-center" data-v-b6df7ee4>1</div><div class="white bg-primary text-center" data-v-b6df7ee4>2</div></div><div class="flex justify-space-between" data-v-b6df7ee4><div class="order-3 white bg-primary text-center" data-v-b6df7ee4>1</div><div class="order-2 white bg-primary text-center" data-v-b6df7ee4>2</div><div class="order-1 white bg-primary text-center" data-v-b6df7ee4>3</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/flex/demos/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b6df7ee4"]]);
export {
  demo1 as default
};
