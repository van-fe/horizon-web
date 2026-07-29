import { defineComponent, ref, resolveComponent, resolveDirective, withCtx, createTextVNode, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_click_outside = resolveDirective("click-outside");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-aa0d162a>`);
  _push(ssrRenderComponent(_component_h_button, {
    onClick: ($event) => _ctx.visible = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Show Modal`);
      } else {
        return [
          createTextVNode("Show Modal")
        ];
      }
    }),
    _: 1
  }, _parent));
  if (_ctx.visible) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute mt-4 p-10 bg-white shadow" }, ssrGetDirectiveProps(
      _ctx,
      _directive_click_outside,
      () => {
        _ctx.visible = false;
      }
    )))} data-v-aa0d162a> Modal </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-click-outside/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-aa0d162a"]]);
export {
  demo1 as default
};
