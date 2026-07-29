import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { aq as useZIndex$1 } from "./app.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  name: "UseZIndex",
  setup() {
    const zIndexHandler = useZIndex$1();
    const zIndex = ref(zIndexHandler.current);
    const increase = () => {
      zIndex.value = zIndexHandler.next();
    };
    const reset = () => {
      zIndex.value = zIndexHandler.set(2e3);
    };
    return {
      zIndex,
      zIndexHandler,
      increase,
      reset
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(_attrs)}><p>${ssrInterpolate(_ctx.zIndex)}</p><p>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.increase }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Increase`);
      } else {
        return [
          createTextVNode("Increase")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    style: { "margin-left": "10px" },
    onClick: _ctx.reset
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Reset`);
      } else {
        return [
          createTextVNode("Reset")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/features/tools/demos/useZIndex.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useZIndex = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  useZIndex as default
};
