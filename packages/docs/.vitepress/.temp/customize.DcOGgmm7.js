import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createSlots, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customize",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const mode = ref(0);
    const onOk = () => {
      console.info("ok button clicked!");
      $message({ type: "success", message: "ok button clicked" });
    };
    const onCancel = () => {
      console.info("cancel button clicked!");
      $message({ type: "warning", message: "cancel button clicked!" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      const _component_h_tag = resolveComponent("h-tag");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_space, {
        direction: "vertical",
        block: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio_group, {
              modelValue: mode.value,
              "onUpdate:modelValue": ($event) => mode.value = $event,
              class: "example"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio, { label: 0 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default`);
                      } else {
                        return [
                          createTextVNode("Default")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 1 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customize Header`);
                      } else {
                        return [
                          createTextVNode("Customize Header")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 2 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customize Title`);
                      } else {
                        return [
                          createTextVNode("Customize Title")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 3 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customize Footer`);
                      } else {
                        return [
                          createTextVNode("Customize Footer")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 4 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`No Title`);
                      } else {
                        return [
                          createTextVNode("No Title")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 5 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`No Header and No Footer`);
                      } else {
                        return [
                          createTextVNode("No Header and No Footer")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, { label: 6 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Hide Mask`);
                      } else {
                        return [
                          createTextVNode("Hide Mask")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio, { label: 0 }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 1 }, {
                      default: withCtx(() => [
                        createTextVNode("Customize Header")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 2 }, {
                      default: withCtx(() => [
                        createTextVNode("Customize Title")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 3 }, {
                      default: withCtx(() => [
                        createTextVNode("Customize Footer")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 4 }, {
                      default: withCtx(() => [
                        createTextVNode("No Title")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 5 }, {
                      default: withCtx(() => [
                        createTextVNode("No Header and No Footer")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 6 }, {
                      default: withCtx(() => [
                        createTextVNode("Hide Mask")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              onClick: ($event) => visible.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Open Drawer`);
                } else {
                  return [
                    createTextVNode("Open Drawer")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio_group, {
                modelValue: mode.value,
                "onUpdate:modelValue": ($event) => mode.value = $event,
                class: "example"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: 0 }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 1 }, {
                    default: withCtx(() => [
                      createTextVNode("Customize Header")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 2 }, {
                    default: withCtx(() => [
                      createTextVNode("Customize Title")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 3 }, {
                    default: withCtx(() => [
                      createTextVNode("Customize Footer")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 4 }, {
                    default: withCtx(() => [
                      createTextVNode("No Title")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 5 }, {
                    default: withCtx(() => [
                      createTextVNode("No Header and No Footer")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 6 }, {
                    default: withCtx(() => [
                      createTextVNode("Hide Mask")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_h_button, {
                onClick: ($event) => visible.value = true
              }, {
                default: withCtx(() => [
                  createTextVNode("Open Drawer")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        v2: "",
        title: mode.value !== 4 ? "Default Title" : "",
        header: mode.value !== 5,
        footer: mode.value !== 5,
        mask: mode.value !== 6,
        position: "right"
      }, createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-4914c234${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 2
      }, [
        mode.value === 1 ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_h_space, {
                size: "4",
                block: "",
                direction: "vertical"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_h_space, { size: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-subtitle-1" data-v-4914c234${_scopeId3}>Great declaration</div>`);
                          _push4(ssrRenderComponent(_component_h_tag, { clickable: false }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Demo`);
                              } else {
                                return [
                                  createTextVNode("Demo")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "text-subtitle-1" }, "Great declaration"),
                            createVNode(_component_h_tag, { clickable: false }, {
                              default: withCtx(() => [
                                createTextVNode("Demo")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="text-caption-1" data-v-4914c234${_scopeId2}>Make Demo great again</div>`);
                  } else {
                    return [
                      createVNode(_component_h_space, { size: "4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-subtitle-1" }, "Great declaration"),
                          createVNode(_component_h_tag, { clickable: false }, {
                            default: withCtx(() => [
                              createTextVNode("Demo")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "text-caption-1" }, "Make Demo great again")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_h_space, {
                  size: "4",
                  block: "",
                  direction: "vertical"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, { size: "4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-subtitle-1" }, "Great declaration"),
                        createVNode(_component_h_tag, { clickable: false }, {
                          default: withCtx(() => [
                            createTextVNode("Demo")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "text-caption-1" }, "Make Demo great again")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "0"
        } : void 0,
        mode.value === 2 ? {
          name: "title",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Customize Title`);
            } else {
              return [
                createTextVNode("Customize Title")
              ];
            }
          }),
          key: "1"
        } : void 0,
        mode.value === 3 ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_h_button, {
                type: "danger",
                style: { "margin-right": "8px" },
                onClick: onOk
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Confirm Delete`);
                  } else {
                    return [
                      createTextVNode("Confirm Delete")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_button, {
                type: "secondary",
                onClick: onCancel
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Close`);
                  } else {
                    return [
                      createTextVNode("Close")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_h_button, {
                  type: "danger",
                  style: { "margin-right": "8px" },
                  onClick: onOk
                }, {
                  default: withCtx(() => [
                    createTextVNode("Confirm Delete")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "secondary",
                  onClick: onCancel
                }, {
                  default: withCtx(() => [
                    createTextVNode("Close")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "2"
        } : void 0
      ]), _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/customize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customize = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4914c234"]]);
export {
  customize as default
};
