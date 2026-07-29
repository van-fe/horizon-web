import { defineComponent, resolveComponent, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { f as __default__, V as __default__$1, K as __default__$2, W as __default__$3, X as __default__$4 } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tag = resolveComponent("h-tag");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_tag, {
        clickable: false,
        icon: unref(__default__),
        plain: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View`);
          } else {
            return [
              createTextVNode("View")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_tag, {
        clickable: false,
        icon: unref(__default__$1),
        plain: true,
        type: "success"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Success`);
          } else {
            return [
              createTextVNode("Success")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_tag, {
        clickable: false,
        icon: unref(__default__$2),
        plain: true,
        type: "info"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Info`);
          } else {
            return [
              createTextVNode("Info")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_tag, {
        clickable: false,
        icon: unref(__default__$3),
        plain: true,
        type: "warning"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Warning`);
          } else {
            return [
              createTextVNode("Warning")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_tag, {
        clickable: false,
        plain: true,
        type: "error"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(__default__$4), { size: 12 }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(__default__$4), { size: 12 })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Error `);
          } else {
            return [
              createTextVNode(" Error ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
