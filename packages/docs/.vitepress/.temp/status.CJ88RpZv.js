import { defineComponent, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return "?" + Math.round(Math.random() * 1e6);
    }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_link = resolveComponent("h-link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_link, { href: _ctx.randomHref }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Will Visit`);
      } else {
        return [
          createTextVNode("Will Visit")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_link, { href: _ctx.currentHref }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Already Visited`);
      } else {
        return [
          createTextVNode("Already Visited")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_link, { disabled: "" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Disabled`);
      } else {
        return [
          createTextVNode("Disabled")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const status = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  status as default
};
