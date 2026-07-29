import { resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_scrollbar = resolveComponent("h-scrollbar");
  _push(ssrRenderComponent(_component_h_scrollbar, mergeProps({ height: "400px" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(1e3, (item) => {
          _push2(`<div class="item" data-v-b1329206${_scopeId}>${ssrInterpolate(item)}</div>`);
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(), createBlock(Fragment, null, renderList(1e3, (item) => {
            return createVNode("div", {
              key: item,
              class: "item"
            }, toDisplayString(item), 1);
          }), 64))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Scrollbar/min-size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const minSize = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b1329206"]]);
export {
  minSize as default
};
