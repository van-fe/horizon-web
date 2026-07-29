import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "collapse",
  __ssrInlineRender: true,
  setup(__props) {
    const width = ref(600);
    function onItemClick(prop, evt) {
      console.info("item-click: ", prop, evt);
    }
    function onClick(evt) {
      console.info("click:", evt);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_slider = resolveComponent("h-slider");
      const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
      const _component_h_breadcrumb_item = resolveComponent("h-breadcrumb-item");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-block" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_form, {
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    style: { "max-width": "500px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "width" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_slider, {
                                modelValue: width.value,
                                "onUpdate:modelValue": ($event) => width.value = $event,
                                min: 100,
                                max: 600,
                                step: 25,
                                "input-enable": true
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_slider, {
                                  modelValue: width.value,
                                  "onUpdate:modelValue": ($event) => width.value = $event,
                                  min: 100,
                                  max: 600,
                                  step: 25,
                                  "input-enable": true
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_form_item, { label: "width" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_slider, {
                                modelValue: width.value,
                                "onUpdate:modelValue": ($event) => width.value = $event,
                                min: 100,
                                max: 600,
                                step: 25,
                                "input-enable": true
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode(_component_h_form, {
                      "label-position": "left",
                      "label-vertical-align": "middle",
                      style: { "max-width": "500px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, { label: "width" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_slider, {
                              modelValue: width.value,
                              "onUpdate:modelValue": ($event) => width.value = $event,
                              min: 100,
                              max: 600,
                              step: 25,
                              "input-enable": true
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 整体折行 </div><div style="${ssrRenderStyle({ width: width.value + "px" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_breadcrumb, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Home`);
                            } else {
                              return [
                                createTextVNode("Home")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page1`);
                            } else {
                              return [
                                createTextVNode("Sub Page1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page2`);
                            } else {
                              return [
                                createTextVNode("Sub Page2")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page3`);
                            } else {
                              return [
                                createTextVNode("Sub Page3")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page4`);
                            } else {
                              return [
                                createTextVNode("Sub Page4")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page5`);
                            } else {
                              return [
                                createTextVNode("Sub Page5")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page6`);
                            } else {
                              return [
                                createTextVNode("Sub Page6")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Home")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page4")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page5")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page6")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 整体折行 "),
                    createVNode("div", {
                      style: { width: width.value + "px" }
                    }, [
                      createVNode(_component_h_breadcrumb, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Home")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page4")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page5")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, null, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page6")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ], 4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>超过最大尺寸后，自动收起展示</div><div style="${ssrRenderStyle({ width: width.value + "px" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_breadcrumb, {
                    "display-type": "ellipsis",
                    onItemClick
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Home`);
                            } else {
                              return [
                                createTextVNode("Home")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, {
                          key: "2",
                          clickable: true,
                          onClick
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page1`);
                            } else {
                              return [
                                createTextVNode("Sub Page1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page2`);
                            } else {
                              return [
                                createTextVNode("Sub Page2")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page3`);
                            } else {
                              return [
                                createTextVNode("Sub Page3")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "5" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page4`);
                            } else {
                              return [
                                createTextVNode("Sub Page4")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page5`);
                            } else {
                              return [
                                createTextVNode("Sub Page5")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_breadcrumb_item, { key: "7" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub Page6`);
                            } else {
                              return [
                                createTextVNode("Sub Page6")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_breadcrumb_item, { key: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Home")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, {
                            key: "2",
                            clickable: true,
                            onClick
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "4" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "5" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page4")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "6" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page5")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "7" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page6")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "超过最大尺寸后，自动收起展示"),
                    createVNode("div", {
                      style: { width: width.value + "px" }
                    }, [
                      createVNode(_component_h_breadcrumb, {
                        "display-type": "ellipsis",
                        onItemClick
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_breadcrumb_item, { key: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Home")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, {
                            key: "2",
                            clickable: true,
                            onClick
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "4" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "5" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page4")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "6" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page5")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_breadcrumb_item, { key: "7" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub Page6")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ], 4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_form, {
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    style: { "max-width": "500px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_form_item, { label: "width" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_slider, {
                            modelValue: width.value,
                            "onUpdate:modelValue": ($event) => width.value = $event,
                            min: 100,
                            max: 600,
                            step: 25,
                            "input-enable": true
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 整体折行 "),
                  createVNode("div", {
                    style: { width: width.value + "px" }
                  }, [
                    createVNode(_component_h_breadcrumb, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Home")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page2")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page3")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page4")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page5")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, null, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page6")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ], 4)
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "超过最大尺寸后，自动收起展示"),
                  createVNode("div", {
                    style: { width: width.value + "px" }
                  }, [
                    createVNode(_component_h_breadcrumb, {
                      "display-type": "ellipsis",
                      onItemClick
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_breadcrumb_item, { key: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Home")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, {
                          key: "2",
                          clickable: true,
                          onClick
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, { key: "3" }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page2")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, { key: "4" }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page3")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, { key: "5" }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page4")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, { key: "6" }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page5")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_breadcrumb_item, { key: "7" }, {
                          default: withCtx(() => [
                            createTextVNode("Sub Page6")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ], 4)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/collapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
