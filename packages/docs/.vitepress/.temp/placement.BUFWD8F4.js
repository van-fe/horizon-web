import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "placement",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref("medium");
    const theme = ref("dark");
    const hideAfter = ref(200);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, { class: "block-tooltip-props" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "尺寸" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Medium`);
                            } else {
                              return [
                                createTextVNode("Medium")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Small`);
                            } else {
                              return [
                                createTextVNode("Small")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Medium")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("Small")
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
                      modelValue: size.value,
                      "onUpdate:modelValue": ($event) => size.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Medium")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "small" }, {
                          default: withCtx(() => [
                            createTextVNode("Small")
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "主题" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: theme.value,
                    "onUpdate:modelValue": ($event) => theme.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "dark" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Dark`);
                            } else {
                              return [
                                createTextVNode("Dark")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "light" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Light`);
                            } else {
                              return [
                                createTextVNode("Light")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "dark" }, {
                            default: withCtx(() => [
                              createTextVNode("Dark")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "light" }, {
                            default: withCtx(() => [
                              createTextVNode("Light")
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
                      modelValue: theme.value,
                      "onUpdate:modelValue": ($event) => theme.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "dark" }, {
                          default: withCtx(() => [
                            createTextVNode("Dark")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "light" }, {
                          default: withCtx(() => [
                            createTextVNode("Light")
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "延迟关闭" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: hideAfter.value,
                    "onUpdate:modelValue": ($event) => hideAfter.value = $event
                  }, {
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`ms`);
                      } else {
                        return [
                          createTextVNode("ms")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: hideAfter.value,
                      "onUpdate:modelValue": ($event) => hideAfter.value = $event
                    }, {
                      suffix: withCtx(() => [
                        createTextVNode("ms")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "尺寸" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "medium" }, {
                        default: withCtx(() => [
                          createTextVNode("Medium")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("Small")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "主题" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: theme.value,
                    "onUpdate:modelValue": ($event) => theme.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "dark" }, {
                        default: withCtx(() => [
                          createTextVNode("Dark")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "light" }, {
                        default: withCtx(() => [
                          createTextVNode("Light")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "延迟关闭" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: hideAfter.value,
                    "onUpdate:modelValue": ($event) => hideAfter.value = $event
                  }, {
                    suffix: withCtx(() => [
                      createTextVNode("ms")
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
      }, _parent));
      _push(`<div class="block-tooltip"><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "top-start",
        content: "top-start",
        singleton: "",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上左`);
                } else {
                  return [
                    createTextVNode("上左")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("上左")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "top",
        content: "top",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上`);
                } else {
                  return [
                    createTextVNode("上")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("上")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "top-end",
        content: "top-end",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上右`);
                } else {
                  return [
                    createTextVNode("上右")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("上右")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "left-start",
        content: "left-start",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`左上`);
                } else {
                  return [
                    createTextVNode("左上")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("左上")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "right-start",
        content: "right-start",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`右上`);
                } else {
                  return [
                    createTextVNode("右上")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("右上")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "left",
        content: "left",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`左`);
                } else {
                  return [
                    createTextVNode("左")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("左")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "right",
        content: "right",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`右`);
                } else {
                  return [
                    createTextVNode("右")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("右")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "left-end",
        content: "left-end",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`左下`);
                } else {
                  return [
                    createTextVNode("左下")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("左下")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "right-end",
        content: "right-end",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`右下`);
                } else {
                  return [
                    createTextVNode("右下")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("右下")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "bottom-start",
        content: "bottom-start",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`下左`);
                } else {
                  return [
                    createTextVNode("下左")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("下左")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "bottom",
        content: "bottom",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`下`);
                } else {
                  return [
                    createTextVNode("下")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("下")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item">`);
      _push(ssrRenderComponent(_component_h_tooltip, {
        placement: "bottom-end",
        content: "bottom-end",
        size: size.value,
        theme: theme.value,
        "hide-after": hideAfter.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`下右`);
                } else {
                  return [
                    createTextVNode("下右")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("下右")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="item"></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tooltip/placement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
