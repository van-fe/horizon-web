import { defineComponent, resolveComponent, resolveDirective, withCtx, createVNode, createTextVNode, mergeProps, withDirectives, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input_number = resolveComponent("h-input-number");
  const _component_a_icon = resolveComponent("a-icon");
  const _directive_tooltip = resolveDirective("tooltip");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>前缀-默认状态</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                min: 0,
                "prefix-icon": "points"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前缀-默认状态"),
                createVNode(_component_h_input_number, {
                  min: 0,
                  "prefix-icon": "points"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>前缀-控制器位于两侧</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                "prefix-icon": "points"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前缀-控制器位于两侧"),
                createVNode(_component_h_input_number, {
                  "controls-position": "between",
                  min: 0,
                  "prefix-icon": "points"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>前缀-控制器隐藏</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                controls: false,
                min: 0,
                "prefix-icon": "points"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前缀-控制器隐藏"),
                createVNode(_component_h_input_number, {
                  controls: false,
                  min: 0,
                  "prefix-icon": "points"
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
              createVNode("div", { class: "demo-title" }, "前缀-默认状态"),
              createVNode(_component_h_input_number, {
                min: 0,
                "prefix-icon": "points"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "前缀-控制器位于两侧"),
              createVNode(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                "prefix-icon": "points"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "前缀-控制器隐藏"),
              createVNode(_component_h_input_number, {
                controls: false,
                min: 0,
                "prefix-icon": "points"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>后缀-默认状态</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                min: 0,
                "suffix-icon": "points",
                clearable: true
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "后缀-默认状态"),
                createVNode(_component_h_input_number, {
                  min: 0,
                  "suffix-icon": "points",
                  clearable: true
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>后缀-控制器位于两侧</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                clearable: true
              }, {
                suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`RMB`);
                  } else {
                    return [
                      createTextVNode("RMB")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "后缀-控制器位于两侧"),
                createVNode(_component_h_input_number, {
                  "controls-position": "between",
                  min: 0,
                  clearable: true
                }, {
                  suffix: withCtx(() => [
                    createTextVNode("RMB")
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
              _push3(`<div class="demo-title"${_scopeId2}>后缀-控制器隐藏</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                controls: false,
                min: 0,
                "suffix-icon": "points",
                clearable: true
              }, {
                suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`RMB`);
                  } else {
                    return [
                      createTextVNode("RMB")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "后缀-控制器隐藏"),
                createVNode(_component_h_input_number, {
                  controls: false,
                  min: 0,
                  "suffix-icon": "points",
                  clearable: true
                }, {
                  suffix: withCtx(() => [
                    createTextVNode("RMB")
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
              createVNode("div", { class: "demo-title" }, "后缀-默认状态"),
              createVNode(_component_h_input_number, {
                min: 0,
                "suffix-icon": "points",
                clearable: true
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "后缀-控制器位于两侧"),
              createVNode(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                clearable: true
              }, {
                suffix: withCtx(() => [
                  createTextVNode("RMB")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "后缀-控制器隐藏"),
              createVNode(_component_h_input_number, {
                controls: false,
                min: 0,
                "suffix-icon": "points",
                clearable: true
              }, {
                suffix: withCtx(() => [
                  createTextVNode("RMB")
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
  _push(ssrRenderComponent(_component_h_row, { gutter: 12 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>前后缀-默认状态</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_a_icon, mergeProps({
                      name: "remind",
                      size: "12"
                    }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `请注意，这里是积分`)), null, _parent4, _scopeId3));
                  } else {
                    return [
                      withDirectives(createVNode(_component_a_icon, {
                        name: "remind",
                        size: "12"
                      }, null, 512), [
                        [_directive_tooltip, `请注意，这里是积分`]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前后缀-默认状态"),
                createVNode(_component_h_input_number, {
                  min: 0,
                  "suffix-icon": "points"
                }, {
                  prefix: withCtx(() => [
                    withDirectives(createVNode(_component_a_icon, {
                      name: "remind",
                      size: "12"
                    }, null, 512), [
                      [_directive_tooltip, `请注意，这里是积分`]
                    ])
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
              _push3(`<div class="demo-title"${_scopeId2}>前后缀-控制器位于两侧</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_a_icon, mergeProps({
                      name: "remind",
                      size: "12"
                    }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `请注意，这里是积分`)), null, _parent4, _scopeId3));
                  } else {
                    return [
                      withDirectives(createVNode(_component_a_icon, {
                        name: "remind",
                        size: "12"
                      }, null, 512), [
                        [_directive_tooltip, `请注意，这里是积分`]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前后缀-控制器位于两侧"),
                createVNode(_component_h_input_number, {
                  "controls-position": "between",
                  min: 0,
                  "suffix-icon": "points"
                }, {
                  prefix: withCtx(() => [
                    withDirectives(createVNode(_component_a_icon, {
                      name: "remind",
                      size: "12"
                    }, null, 512), [
                      [_directive_tooltip, `请注意，这里是积分`]
                    ])
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
              _push3(`<div class="demo-title"${_scopeId2}>前后缀-控制器隐藏</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                controls: false,
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_a_icon, mergeProps({
                      name: "remind",
                      size: "12"
                    }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `请注意，这里是积分`)), null, _parent4, _scopeId3));
                  } else {
                    return [
                      withDirectives(createVNode(_component_a_icon, {
                        name: "remind",
                        size: "12"
                      }, null, 512), [
                        [_directive_tooltip, `请注意，这里是积分`]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "前后缀-控制器隐藏"),
                createVNode(_component_h_input_number, {
                  controls: false,
                  min: 0,
                  "suffix-icon": "points"
                }, {
                  prefix: withCtx(() => [
                    withDirectives(createVNode(_component_a_icon, {
                      name: "remind",
                      size: "12"
                    }, null, 512), [
                      [_directive_tooltip, `请注意，这里是积分`]
                    ])
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
              createVNode("div", { class: "demo-title" }, "前后缀-默认状态"),
              createVNode(_component_h_input_number, {
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx(() => [
                  withDirectives(createVNode(_component_a_icon, {
                    name: "remind",
                    size: "12"
                  }, null, 512), [
                    [_directive_tooltip, `请注意，这里是积分`]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "前后缀-控制器位于两侧"),
              createVNode(_component_h_input_number, {
                "controls-position": "between",
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx(() => [
                  withDirectives(createVNode(_component_a_icon, {
                    name: "remind",
                    size: "12"
                  }, null, 512), [
                    [_directive_tooltip, `请注意，这里是积分`]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "前后缀-控制器隐藏"),
              createVNode(_component_h_input_number, {
                controls: false,
                min: 0,
                "suffix-icon": "points"
              }, {
                prefix: withCtx(() => [
                  withDirectives(createVNode(_component_a_icon, {
                    name: "remind",
                    size: "12"
                  }, null, 512), [
                    [_directive_tooltip, `请注意，这里是积分`]
                  ])
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/prefix-suffix.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prefixSuffix = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  prefixSuffix as default
};
