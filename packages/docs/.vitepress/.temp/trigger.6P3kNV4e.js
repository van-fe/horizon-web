import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    let hoverMsg = ref("hover top");
    let clickMsg = ref("click left");
    let focusMsg = ref("focus right");
    let contextmenuMsg = ref("contextmenu top");
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_tooltip = resolveDirective("tooltip");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "block" }, _attrs))} data-v-3a82c98d>`);
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.hoverMsg), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`hover top`);
      } else {
        return [
          createTextVNode("hover top")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.clickMsg, void 0, {
    click: true,
    left: true
  }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`click left`);
      } else {
        return [
          createTextVNode("click left")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.focusMsg, void 0, {
    right: true,
    focus: true
  }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`focus right`);
      } else {
        return [
          createTextVNode("focus right")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.contextmenuMsg, void 0, { manual: true }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`manual top`);
      } else {
        return [
          createTextVNode("manual top")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, void 0, void 0, { disabled: true }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`disabled`);
      } else {
        return [
          createTextVNode("disabled")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, ssrGetDirectiveProps(_ctx, _directive_tooltip, "visible", void 0, { visible: true }), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`visible`);
      } else {
        return [
          createTextVNode("visible")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-tooltip/trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const trigger = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3a82c98d"]]);
export {
  trigger as default
};
