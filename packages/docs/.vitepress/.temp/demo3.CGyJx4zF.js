import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo3",
  __ssrInlineRender: true,
  setup(__props) {
    const loadingOptions = ref({
      isShow: true,
      loadingType: "circle",
      textOrient: "column",
      text: "加载中...",
      size: "large",
      bgc: "#5fdde3",
      fullscreen: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input = resolveComponent("h-input");
      const _directive_loading = resolveDirective("loading");
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, loadingOptions.value)))}>${ssrInterpolate(loadingOptions.value)}</div>`);
      _push(ssrRenderComponent(_component_h_form, { inline: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否显示" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: loadingOptions.value.isShow,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.isShow = $event,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: true,
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`显示`);
                            } else {
                              return [
                                createTextVNode("显示")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: false,
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`隐藏`);
                            } else {
                              return [
                                createTextVNode("隐藏")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            label: true,
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("显示")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, {
                            label: false,
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("隐藏")
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
                    createVNode(_component_h_radio_group, {
                      modelValue: loadingOptions.value.isShow,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.isShow = $event,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          label: true,
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("显示")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, {
                          label: false,
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("隐藏")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "样式" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: loadingOptions.value.loadingType,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.loadingType = $event,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "circle",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "dots",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            label: "circle",
                            size: "small"
                          }),
                          createVNode(_component_h_radio, {
                            label: "dots",
                            size: "small"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: loadingOptions.value.loadingType,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.loadingType = $event,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          label: "circle",
                          size: "small"
                        }),
                        createVNode(_component_h_radio, {
                          label: "dots",
                          size: "small"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "排列风格" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: loadingOptions.value.textOrient,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.textOrient = $event,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "column",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "row",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            label: "column",
                            size: "small"
                          }),
                          createVNode(_component_h_radio, {
                            label: "row",
                            size: "small"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: loadingOptions.value.textOrient,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.textOrient = $event,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          label: "column",
                          size: "small"
                        }),
                        createVNode(_component_h_radio, {
                          label: "row",
                          size: "small"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "大小" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: loadingOptions.value.size,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.size = $event,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "large",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "medium",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: "small",
                          size: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            label: "large",
                            size: "small"
                          }),
                          createVNode(_component_h_radio, {
                            label: "medium",
                            size: "small"
                          }),
                          createVNode(_component_h_radio, {
                            label: "small",
                            size: "small"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: loadingOptions.value.size,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.size = $event,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          label: "large",
                          size: "small"
                        }),
                        createVNode(_component_h_radio, {
                          label: "medium",
                          size: "small"
                        }),
                        createVNode(_component_h_radio, {
                          label: "small",
                          size: "small"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否全屏" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: loadingOptions.value.fullscreen,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.fullscreen = $event,
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: true,
                          size: "small"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, {
                          label: false,
                          size: "small"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, {
                            label: true,
                            size: "small"
                          }),
                          createVNode(_component_h_radio, {
                            label: false,
                            size: "small"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: loadingOptions.value.fullscreen,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.fullscreen = $event,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, {
                          label: true,
                          size: "small"
                        }),
                        createVNode(_component_h_radio, {
                          label: false,
                          size: "small"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "loading文字" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: loadingOptions.value.text,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.text = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: loadingOptions.value.text,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.text = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "背景色" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: loadingOptions.value.bgc,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.bgc = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: loadingOptions.value.bgc,
                      "onUpdate:modelValue": ($event) => loadingOptions.value.bgc = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否显示" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: loadingOptions.value.isShow,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.isShow = $event,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        label: true,
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("显示")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, {
                        label: false,
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("隐藏")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "样式" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: loadingOptions.value.loadingType,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.loadingType = $event,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        label: "circle",
                        size: "small"
                      }),
                      createVNode(_component_h_radio, {
                        label: "dots",
                        size: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "排列风格" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: loadingOptions.value.textOrient,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.textOrient = $event,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        label: "column",
                        size: "small"
                      }),
                      createVNode(_component_h_radio, {
                        label: "row",
                        size: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "大小" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: loadingOptions.value.size,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.size = $event,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        label: "large",
                        size: "small"
                      }),
                      createVNode(_component_h_radio, {
                        label: "medium",
                        size: "small"
                      }),
                      createVNode(_component_h_radio, {
                        label: "small",
                        size: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否全屏" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: loadingOptions.value.fullscreen,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.fullscreen = $event,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, {
                        label: true,
                        size: "small"
                      }),
                      createVNode(_component_h_radio, {
                        label: false,
                        size: "small"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "loading文字" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: loadingOptions.value.text,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.text = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "背景色" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: loadingOptions.value.bgc,
                    "onUpdate:modelValue": ($event) => loadingOptions.value.bgc = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-loading/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
