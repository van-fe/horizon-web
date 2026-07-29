import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, {
                type: "normal",
                plain: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Normal Plain Button`);
                  } else {
                    return [
                      createTextVNode("Normal Plain Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, { plain: "" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Primary Plain Button`);
                  } else {
                    return [
                      createTextVNode("Primary Plain Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "danger",
                plain: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Danger Plain Button`);
                  } else {
                    return [
                      createTextVNode("Danger Plain Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, {
                  type: "normal",
                  plain: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Normal Plain Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, { plain: "" }, {
                  default: withCtx(() => [
                    createTextVNode("Primary Plain Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "danger",
                  plain: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Danger Plain Button")
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
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_button, {
                type: "normal",
                plain: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Normal Plain Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, { plain: "" }, {
                default: withCtx(() => [
                  createTextVNode("Primary Plain Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "danger",
                plain: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Plain Button")
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
  _push(ssrRenderComponent(_component_h_row, { class: "dark-wrapper" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, {
                type: "normal",
                ghost: "",
                plain: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Normal Ghost Button`);
                  } else {
                    return [
                      createTextVNode("Normal Ghost Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                ghost: "",
                plain: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Primary Ghost Button`);
                  } else {
                    return [
                      createTextVNode("Primary Ghost Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "danger",
                ghost: "",
                plain: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Danger Ghost Button`);
                  } else {
                    return [
                      createTextVNode("Danger Ghost Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, {
                  type: "normal",
                  ghost: "",
                  plain: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Normal Ghost Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  ghost: "",
                  plain: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Primary Ghost Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "danger",
                  ghost: "",
                  plain: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Danger Ghost Button")
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
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_button, {
                type: "normal",
                ghost: "",
                plain: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Normal Ghost Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                ghost: "",
                plain: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Primary Ghost Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "danger",
                ghost: "",
                plain: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Ghost Button")
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/plain.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const plain = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-83df9498"]]);
export {
  plain as default
};
