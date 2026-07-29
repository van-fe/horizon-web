import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid" }, _attrs))} data-v-bec64658><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, { active: true }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Primary Button`);
      } else {
        return [
          createTextVNode("Primary Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    active: true,
    type: "danger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Danger Button`);
      } else {
        return [
          createTextVNode("Danger Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658></div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    plain: true,
    active: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Primary Plain Button`);
      } else {
        return [
          createTextVNode("Primary Plain Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    plain: true,
    active: true,
    type: "danger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Danger Plain Button`);
      } else {
        return [
          createTextVNode("Danger Plain Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    plain: true,
    active: true,
    type: "normal"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Normal Plain Button`);
      } else {
        return [
          createTextVNode("Normal Plain Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    text: true,
    active: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Primary Text Button`);
      } else {
        return [
          createTextVNode("Primary Text Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    text: true,
    active: true,
    type: "danger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Danger Text Button`);
      } else {
        return [
          createTextVNode("Danger Text Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    text: true,
    active: true,
    type: "normal"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Normal Text Button`);
      } else {
        return [
          createTextVNode("Normal Text Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    link: true,
    active: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Primary Link Button`);
      } else {
        return [
          createTextVNode("Primary Link Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    link: true,
    active: true,
    type: "danger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Danger Link Button`);
      } else {
        return [
          createTextVNode("Danger Link Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-bec64658>`);
  _push(ssrRenderComponent(_component_h_button, {
    link: true,
    active: true,
    type: "normal"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Normal Link Button`);
      } else {
        return [
          createTextVNode("Normal Link Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/active.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const active = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bec64658"]]);
export {
  active as default
};
