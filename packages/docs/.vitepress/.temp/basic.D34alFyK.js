import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_page_header = resolveComponent("h-page-header");
  const _component_h_tag = resolveComponent("h-tag");
  const _component_h_divider = resolveComponent("h-divider");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_page_header, mergeProps({ title: "页面标题" }, _attrs), {
    tags: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_tag, {
          size: "small",
          class: "ml-2",
          clickable: false
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`标签`);
            } else {
              return [
                createTextVNode("标签")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_tag, {
            size: "small",
            class: "ml-2",
            clickable: false
          }, {
            default: withCtx(() => [
              createTextVNode("标签")
            ]),
            _: 1
          })
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>ID: 0012138</div>`);
        _push2(ssrRenderComponent(_component_h_divider, { direction: "vertical" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>所有者: Unknown</div>`);
        _push2(ssrRenderComponent(_component_h_divider, { direction: "vertical" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>所属空间: DD</div>`);
      } else {
        return [
          createVNode("div", null, "ID: 0012138"),
          createVNode(_component_h_divider, { direction: "vertical" }),
          createVNode("div", null, "所有者: Unknown"),
          createVNode(_component_h_divider, { direction: "vertical" }),
          createVNode("div", null, "所属空间: DD")
        ];
      }
    }),
    extra: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          size: "large",
          plain: true
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`副按钮`);
            } else {
              return [
                createTextVNode("副按钮")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_button, { size: "large" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`主按钮`);
            } else {
              return [
                createTextVNode("主按钮")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            size: "large",
            plain: true
          }, {
            default: withCtx(() => [
              createTextVNode("副按钮")
            ]),
            _: 1
          }),
          createVNode(_component_h_button, { size: "large" }, {
            default: withCtx(() => [
              createTextVNode("主按钮")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/PageHeader/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  basic as default
};
