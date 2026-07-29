import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: "确定要删除该项吗？",
        okText: "确定",
        cancelText: "取消"
      }),
      del: () => {
        $message("Action!");
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _directive_popconfirm = resolveDirective("popconfirm");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "placement-wrap" }, _attrs))} data-v-f8dd636f><div data-v-f8dd636f>`);
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "top-start" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` top-start `);
      } else {
        return [
          createTextVNode(" top-start ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "top" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` top `);
      } else {
        return [
          createTextVNode(" top ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "top-end" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` top-end `);
      } else {
        return [
          createTextVNode(" top-end ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-f8dd636f>`);
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "left-start" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` left-start `);
      } else {
        return [
          createTextVNode(" left-start ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "left" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` left `);
      } else {
        return [
          createTextVNode(" left ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "left-end" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` left-end `);
      } else {
        return [
          createTextVNode(" left-end ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-f8dd636f>`);
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "bottom-start" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` bottom-start `);
      } else {
        return [
          createTextVNode(" bottom-start ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "bottom" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` bottom `);
      } else {
        return [
          createTextVNode(" bottom ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "bottom-end" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` bottom-end `);
      } else {
        return [
          createTextVNode(" bottom-end ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-f8dd636f>`);
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "right-start" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` right-start `);
      } else {
        return [
          createTextVNode(" right-start ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "right" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` right `);
      } else {
        return [
          createTextVNode(" right ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "right-end" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` right-end `);
      } else {
        return [
          createTextVNode(" right-end ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div data-v-f8dd636f>`);
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "auto-start" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` auto-start `);
      } else {
        return [
          createTextVNode(" auto-start ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "auto" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` auto `);
      } else {
        return [
          createTextVNode(" auto ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, mergeProps({
    size: "medium",
    plain: true,
    class: "mr-2",
    onClick: _ctx.del
  }, ssrGetDirectiveProps(_ctx, _directive_popconfirm, { placement: "auto-end" })), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` auto-end `);
      } else {
        return [
          createTextVNode(" auto-end ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-popconfirm/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f8dd636f"]]);
export {
  demo2 as default
};
