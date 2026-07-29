import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const visible = ref(false);
    const onPrimary = () => {
      console.info("Primary button clicked!");
    };
    const onSecondary = () => {
      console.info("Secondary button clicked!");
      visible.value = false;
    };
    return {
      visible,
      onPrimary,
      onSecondary
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_dialog = resolveComponent("h-dialog");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    onClick: ($event) => _ctx.visible = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`点我`);
      } else {
        return [
          createTextVNode("点我")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible,
    "onUpdate:modelValue": ($event) => _ctx.visible = $event,
    title: "标题",
    "vertical-position": "top",
    top: 100,
    onPrimaryClick: _ctx.onPrimary,
    onSecondaryClick: _ctx.onSecondary
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>随便写点什么</div>`);
      } else {
        return [
          createVNode("div", null, "随便写点什么")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/verticalPosition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const verticalPosition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  verticalPosition as default
};
