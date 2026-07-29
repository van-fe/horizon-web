import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { D as __default__, E as __default__$1 } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "prev-next",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_pagination = resolveComponent("h-pagination");
      _push(ssrRenderComponent(_component_h_pagination, mergeProps({ total: 50 }, _attrs), {
        prev: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(__default__$1), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(__default__$1))
            ];
          }
        }),
        next: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(__default__), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(__default__))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Pagination/prev-next.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
