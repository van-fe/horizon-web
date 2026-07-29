import { resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_application = resolveComponent("h-application");
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_application, mergeProps({
    "use-button-spacing": true,
    compatibility: "button.size"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_row, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="demo-title"${_scopeId3}>兼容尺寸</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "demo-title" }, "兼容尺寸")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "mini",
                      "auto-fit": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Mini -&gt; Small`);
                        } else {
                          return [
                            createTextVNode("Mini -> Small")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      "auto-fit": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Small -&gt; Medium`);
                        } else {
                          return [
                            createTextVNode("Small -> Medium")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "medium",
                      "auto-fit": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Medium -&gt; Large`);
                        } else {
                          return [
                            createTextVNode("Medium -> Large")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "large",
                      "auto-fit": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Large -&gt; Huge`);
                        } else {
                          return [
                            createTextVNode("Large -> Huge")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, {
                        size: "mini",
                        "auto-fit": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Mini -> Small")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "small",
                        "auto-fit": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Small -> Medium")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "medium",
                        "auto-fit": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Medium -> Large")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "large",
                        "auto-fit": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Large -> Huge")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "mini",
                      text: "",
                      icon: "eye"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      text: "",
                      icon: "eye"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "medium",
                      text: "",
                      icon: "eye"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "large",
                      text: "",
                      icon: "eye"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, {
                        size: "mini",
                        text: "",
                        icon: "eye"
                      }),
                      createVNode(_component_h_button, {
                        size: "small",
                        text: "",
                        icon: "eye"
                      }),
                      createVNode(_component_h_button, {
                        size: "medium",
                        text: "",
                        icon: "eye"
                      }),
                      createVNode(_component_h_button, {
                        size: "large",
                        text: "",
                        icon: "eye"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="demo-title"${_scopeId3}>强制使用新尺寸</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "demo-title" }, "强制使用新尺寸")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
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
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "medium",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
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
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "large",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Large`);
                        } else {
                          return [
                            createTextVNode("Large")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "huge",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Huge`);
                        } else {
                          return [
                            createTextVNode("Huge")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, {
                        size: "small",
                        "auto-fit": true,
                        "force-newest-size": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Small")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "medium",
                        "auto-fit": true,
                        "force-newest-size": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Medium")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "large",
                        "auto-fit": true,
                        "force-newest-size": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Large")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "huge",
                        "auto-fit": true,
                        "force-newest-size": true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Huge")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_col, { span: 24 }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      icon: "eye",
                      "force-newest-size": true
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "medium",
                      icon: "eye",
                      "force-newest-size": true
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "large",
                      icon: "eye",
                      "force-newest-size": true
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "huge",
                      icon: "eye",
                      "force-newest-size": true
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, {
                        size: "small",
                        icon: "eye",
                        "force-newest-size": true
                      }),
                      createVNode(_component_h_button, {
                        size: "medium",
                        icon: "eye",
                        "force-newest-size": true
                      }),
                      createVNode(_component_h_button, {
                        size: "large",
                        icon: "eye",
                        "force-newest-size": true
                      }),
                      createVNode(_component_h_button, {
                        size: "huge",
                        icon: "eye",
                        "force-newest-size": true
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-title" }, "兼容尺寸")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      size: "mini",
                      "auto-fit": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Mini -> Small")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "small",
                      "auto-fit": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Small -> Medium")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "medium",
                      "auto-fit": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Medium -> Large")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "large",
                      "auto-fit": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Large -> Huge")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      size: "mini",
                      text: "",
                      icon: "eye"
                    }),
                    createVNode(_component_h_button, {
                      size: "small",
                      text: "",
                      icon: "eye"
                    }),
                    createVNode(_component_h_button, {
                      size: "medium",
                      text: "",
                      icon: "eye"
                    }),
                    createVNode(_component_h_button, {
                      size: "large",
                      text: "",
                      icon: "eye"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-title" }, "强制使用新尺寸")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      size: "small",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Small")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "medium",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Medium")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "large",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Large")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      size: "huge",
                      "auto-fit": true,
                      "force-newest-size": true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Huge")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      size: "small",
                      icon: "eye",
                      "force-newest-size": true
                    }),
                    createVNode(_component_h_button, {
                      size: "medium",
                      icon: "eye",
                      "force-newest-size": true
                    }),
                    createVNode(_component_h_button, {
                      size: "large",
                      icon: "eye",
                      "force-newest-size": true
                    }),
                    createVNode(_component_h_button, {
                      size: "huge",
                      icon: "eye",
                      "force-newest-size": true
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "兼容尺寸")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    size: "mini",
                    "auto-fit": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Mini -> Small")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "small",
                    "auto-fit": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Small -> Medium")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "medium",
                    "auto-fit": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Medium -> Large")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "large",
                    "auto-fit": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Large -> Huge")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    size: "mini",
                    text: "",
                    icon: "eye"
                  }),
                  createVNode(_component_h_button, {
                    size: "small",
                    text: "",
                    icon: "eye"
                  }),
                  createVNode(_component_h_button, {
                    size: "medium",
                    text: "",
                    icon: "eye"
                  }),
                  createVNode(_component_h_button, {
                    size: "large",
                    text: "",
                    icon: "eye"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "强制使用新尺寸")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    size: "small",
                    "auto-fit": true,
                    "force-newest-size": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Small")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "medium",
                    "auto-fit": true,
                    "force-newest-size": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Medium")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "large",
                    "auto-fit": true,
                    "force-newest-size": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Large")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    size: "huge",
                    "auto-fit": true,
                    "force-newest-size": true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Huge")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    size: "small",
                    icon: "eye",
                    "force-newest-size": true
                  }),
                  createVNode(_component_h_button, {
                    size: "medium",
                    icon: "eye",
                    "force-newest-size": true
                  }),
                  createVNode(_component_h_button, {
                    size: "large",
                    icon: "eye",
                    "force-newest-size": true
                  }),
                  createVNode(_component_h_button, {
                    size: "huge",
                    icon: "eye",
                    "force-newest-size": true
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/size-compatibility.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sizeCompatibility = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  sizeCompatibility as default
};
