import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_tag = resolveComponent("h-tag");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>默认状态</div>`);
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Small`);
                  } else {
                    return [
                      createTextVNode("Small")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, { clickable: false }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Medium`);
                  } else {
                    return [
                      createTextVNode("Medium")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                size: "large"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Large`);
                  } else {
                    return [
                      createTextVNode("Large")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "默认状态"),
                createVNode(_component_h_tag, {
                  clickable: false,
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Small")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, { clickable: false }, {
                  default: withCtx(() => [
                    createTextVNode("Medium")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Large")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>强调状态</div>`);
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                bold: true,
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Small`);
                  } else {
                    return [
                      createTextVNode("Small")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                bold: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Medium`);
                  } else {
                    return [
                      createTextVNode("Medium")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_tag, {
                clickable: false,
                bold: true,
                size: "large"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Large`);
                  } else {
                    return [
                      createTextVNode("Large")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "强调状态"),
                createVNode(_component_h_tag, {
                  clickable: false,
                  bold: true,
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Small")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  bold: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Medium")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_tag, {
                  clickable: false,
                  bold: true,
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Large")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "默认状态"),
              createVNode(_component_h_tag, {
                clickable: false,
                size: "small"
              }, {
                default: withCtx(() => [
                  createTextVNode("Small")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, { clickable: false }, {
                default: withCtx(() => [
                  createTextVNode("Medium")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                size: "large"
              }, {
                default: withCtx(() => [
                  createTextVNode("Large")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "强调状态"),
              createVNode(_component_h_tag, {
                clickable: false,
                bold: true,
                size: "small"
              }, {
                default: withCtx(() => [
                  createTextVNode("Small")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                bold: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Medium")
                ]),
                _: 1
              }),
              createVNode(_component_h_tag, {
                clickable: false,
                bold: true,
                size: "large"
              }, {
                default: withCtx(() => [
                  createTextVNode("Large")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  basic as default
};
