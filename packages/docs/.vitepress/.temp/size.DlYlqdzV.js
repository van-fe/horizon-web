import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const val1 = ref("");
    const val2 = ref("");
    const val3 = ref("");
    const inputStyle = ref("normal");
    return {
      val1,
      val2,
      val3,
      inputStyle
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_row = resolveComponent("h-row");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_form, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_row, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_form_item, { label: "style" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio_group, {
                      modelValue: _ctx.inputStyle,
                      "onUpdate:modelValue": ($event) => _ctx.inputStyle = $event
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<!--[-->`);
                          ssrRenderList(["normal", "no-border", "emphasize"], (label, index) => {
                            _push5(ssrRenderComponent(_component_h_radio, {
                              key: index,
                              label,
                              size: "small"
                            }, null, _parent5, _scopeId4));
                          });
                          _push5(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(), createBlock(Fragment, null, renderList(["normal", "no-border", "emphasize"], (label, index) => {
                              return createVNode(_component_h_radio, {
                                key: index,
                                label,
                                size: "small"
                              }, null, 8, ["label"]);
                            }), 64))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio_group, {
                        modelValue: _ctx.inputStyle,
                        "onUpdate:modelValue": ($event) => _ctx.inputStyle = $event
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(["normal", "no-border", "emphasize"], (label, index) => {
                            return createVNode(_component_h_radio, {
                              key: index,
                              label,
                              size: "small"
                            }, null, 8, ["label"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_form_item, { label: "style" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio_group, {
                      modelValue: _ctx.inputStyle,
                      "onUpdate:modelValue": ($event) => _ctx.inputStyle = $event
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(["normal", "no-border", "emphasize"], (label, index) => {
                          return createVNode(_component_h_radio, {
                            key: index,
                            label,
                            size: "small"
                          }, null, 8, ["label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_row, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_col, { span: 8 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_form_item, { label: "Large" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input, {
                            modelValue: _ctx.val1,
                            "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                            size: "large",
                            "input-style": _ctx.inputStyle
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.val1,
                              "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                              size: "large",
                              "input-style": _ctx.inputStyle
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_form_item, { label: "Large" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input, {
                            modelValue: _ctx.val1,
                            "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                            size: "large",
                            "input-style": _ctx.inputStyle
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 8 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_form_item, { label: "Medium" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input, {
                            modelValue: _ctx.val2,
                            "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
                            size: "medium",
                            "input-style": _ctx.inputStyle
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.val2,
                              "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
                              size: "medium",
                              "input-style": _ctx.inputStyle
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_form_item, { label: "Medium" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input, {
                            modelValue: _ctx.val2,
                            "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
                            size: "medium",
                            "input-style": _ctx.inputStyle
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 8 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_form_item, { label: "Small" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input, {
                            modelValue: _ctx.val3,
                            "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
                            size: "small",
                            "input-style": _ctx.inputStyle
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input, {
                              modelValue: _ctx.val3,
                              "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
                              size: "small",
                              "input-style": _ctx.inputStyle
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_form_item, { label: "Small" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input, {
                            modelValue: _ctx.val3,
                            "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
                            size: "small",
                            "input-style": _ctx.inputStyle
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_col, { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form_item, { label: "Large" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input, {
                          modelValue: _ctx.val1,
                          "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                          size: "large",
                          "input-style": _ctx.inputStyle
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form_item, { label: "Medium" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input, {
                          modelValue: _ctx.val2,
                          "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
                          size: "medium",
                          "input-style": _ctx.inputStyle
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_form_item, { label: "Small" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input, {
                          modelValue: _ctx.val3,
                          "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
                          size: "small",
                          "input-style": _ctx.inputStyle
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_row, null, {
            default: withCtx(() => [
              createVNode(_component_h_form_item, { label: "style" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: _ctx.inputStyle,
                    "onUpdate:modelValue": ($event) => _ctx.inputStyle = $event
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(["normal", "no-border", "emphasize"], (label, index) => {
                        return createVNode(_component_h_radio, {
                          key: index,
                          label,
                          size: "small"
                        }, null, 8, ["label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_row, null, {
            default: withCtx(() => [
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_h_form_item, { label: "Large" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input, {
                        modelValue: _ctx.val1,
                        "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                        size: "large",
                        "input-style": _ctx.inputStyle
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_h_form_item, { label: "Medium" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input, {
                        modelValue: _ctx.val2,
                        "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
                        size: "medium",
                        "input-style": _ctx.inputStyle
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_h_form_item, { label: "Small" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input, {
                        modelValue: _ctx.val3,
                        "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
                        size: "small",
                        "input-style": _ctx.inputStyle
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "input-style"])
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  size as default
};
