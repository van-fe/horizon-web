import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_pagination = resolveComponent("h-pagination");
  _push(ssrRenderComponent(_component_h_pagination, mergeProps({ total: 50 }, _attrs), {
    prefix: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`我是前缀`);
      } else {
        return [
          createTextVNode("我是前缀")
        ];
      }
    }),
    suffix: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`我是后缀`);
      } else {
        return [
          createTextVNode("我是后缀")
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Pagination/slots.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slots = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  slots as default
};
