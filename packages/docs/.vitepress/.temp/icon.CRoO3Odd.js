import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { g as __default__, h as __default__$1, f as __default__$2 } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))} data-v-0793e930><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        icon: unref(__default__)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Edit`);
          } else {
            return [
              createTextVNode("Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "danger",
        icon: unref(__default__$1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Delete`);
          } else {
            return [
              createTextVNode("Delete")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "normal",
        icon: unref(__default__$2)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Preview`);
          } else {
            return [
              createTextVNode("Preview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        plain: true,
        icon: unref(__default__)
      }, null, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "danger",
        plain: true,
        icon: unref(__default__$1)
      }, null, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "normal",
        plain: true,
        icon: unref(__default__$2)
      }, null, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        loading: true,
        icon: unref(__default__)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Edit`);
          } else {
            return [
              createTextVNode("Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "danger",
        loading: true,
        icon: unref(__default__$1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Delete`);
          } else {
            return [
              createTextVNode("Delete")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "normal",
        loading: true,
        icon: unref(__default__$2)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Preview`);
          } else {
            return [
              createTextVNode("Preview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        plain: true,
        loading: true
      }, null, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "danger",
        plain: true,
        loading: true
      }, null, _parent));
      _push(`</div><div data-v-0793e930>`);
      _push(ssrRenderComponent(_component_h_button, {
        "auto-fit": true,
        type: "normal",
        plain: true,
        loading: true
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0793e930"]]);
export {
  icon as default
};
