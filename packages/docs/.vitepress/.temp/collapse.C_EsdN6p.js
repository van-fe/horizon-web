import { defineComponent, ref, watchEffect, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, vShow, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "collapse",
  __ssrInlineRender: true,
  setup(__props) {
    const tagGroup = ref(null);
    const renderedAmount = ref(20);
    const minDisplayed = ref(1);
    const width = ref(600);
    const editable = ref(false);
    const closable = ref(false);
    const fillUp = ref(false);
    const minDisplayedEnable = ref(false);
    const renderType = ref("innerText");
    const size = ref("medium");
    const renderedItems = ref([]);
    watchEffect(() => {
      renderedItems.value = Array.from(Array(renderedAmount.value).keys()).map((val) => `Tag ${val + 1}`);
    });
    watch(() => renderedItems.value.length, (val) => {
      renderedAmount.value = val;
    });
    function toggle() {
      var _a;
      (_a = tagGroup.value) == null ? void 0 : _a.toggle();
    }
    function onBeforeEdit(newVal, oldVal, id) {
      renderedItems.value[id] = newVal;
    }
    function onBeforeClose(id) {
      if (renderedItems.value.length <= 5) {
        $message.warning("Cannot reduce the item's length less than 5");
        return;
      }
      renderedItems.value.splice(id, 1);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_slider = resolveComponent("h-slider");
      const _component_h_tag_group = resolveComponent("h-tag-group");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_form, {
                    "label-width": "150px",
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    "helper-placement": "after-label"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          label: "Toggle",
                          helper: "展开/收起"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_button, {
                                size: "small",
                                onClick: toggle
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Toggle`);
                                  } else {
                                    return [
                                      createTextVNode("Toggle")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_button, {
                                  size: "small",
                                  onClick: toggle
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Toggle")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "size" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: size.value,
                                "onUpdate:modelValue": ($event) => size.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: "small" }),
                                      createVNode(_component_h_radio, { label: "medium" }),
                                      createVNode(_component_h_radio, { label: "large" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: size.value,
                                  "onUpdate:modelValue": ($event) => size.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: "small" }),
                                    createVNode(_component_h_radio, { label: "medium" }),
                                    createVNode(_component_h_radio, { label: "large" })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "tooltip render type" }, {
                          helperTitle: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 折叠 \`tooltip\` 展示的内容 `);
                            } else {
                              return [
                                createTextVNode(" 折叠 `tooltip` 展示的内容 ")
                              ];
                            }
                          }),
                          helperContent: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<li${_scopeId4}>innerText: 展示每个元素的文字内容</li><li${_scopeId4}>full: 完整渲染元素</li>`);
                            } else {
                              return [
                                createVNode("li", null, "innerText: 展示每个元素的文字内容"),
                                createVNode("li", null, "full: 完整渲染元素")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: renderType.value,
                                "onUpdate:modelValue": ($event) => renderType.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "innerText" }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: "full" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: "innerText" }),
                                      createVNode(_component_h_radio, { label: "full" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: renderType.value,
                                  "onUpdate:modelValue": ($event) => renderType.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: "innerText" }),
                                    createVNode(_component_h_radio, { label: "full" })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "editable" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: editable.value,
                                "onUpdate:modelValue": ($event) => editable.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: true }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`True`);
                                        } else {
                                          return [
                                            createTextVNode("True")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: false }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`False`);
                                        } else {
                                          return [
                                            createTextVNode("False")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: true }, {
                                        default: withCtx(() => [
                                          createTextVNode("True")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: false }, {
                                        default: withCtx(() => [
                                          createTextVNode("False")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: editable.value,
                                  "onUpdate:modelValue": ($event) => editable.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: true }, {
                                      default: withCtx(() => [
                                        createTextVNode("True")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: false }, {
                                      default: withCtx(() => [
                                        createTextVNode("False")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, { label: "closable" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: closable.value,
                                "onUpdate:modelValue": ($event) => closable.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: true }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`True`);
                                        } else {
                                          return [
                                            createTextVNode("True")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: false }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`False`);
                                        } else {
                                          return [
                                            createTextVNode("False")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: true }, {
                                        default: withCtx(() => [
                                          createTextVNode("True")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: false }, {
                                        default: withCtx(() => [
                                          createTextVNode("False")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: closable.value,
                                  "onUpdate:modelValue": ($event) => closable.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: true }, {
                                      default: withCtx(() => [
                                        createTextVNode("True")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: false }, {
                                      default: withCtx(() => [
                                        createTextVNode("False")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          label: "fill up",
                          helper: "是否尽量占满容器。启用 minDisplayed 无效"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: fillUp.value,
                                "onUpdate:modelValue": ($event) => fillUp.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: true }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`True`);
                                        } else {
                                          return [
                                            createTextVNode("True")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: false }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`False`);
                                        } else {
                                          return [
                                            createTextVNode("False")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: true }, {
                                        default: withCtx(() => [
                                          createTextVNode("True")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: false }, {
                                        default: withCtx(() => [
                                          createTextVNode("False")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: fillUp.value,
                                  "onUpdate:modelValue": ($event) => fillUp.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: true }, {
                                      default: withCtx(() => [
                                        createTextVNode("True")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: false }, {
                                      default: withCtx(() => [
                                        createTextVNode("False")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          label: "width",
                          style: { "max-width": "500px" }
                        }, {
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
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          label: "amount",
                          style: { "max-width": "500px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_slider, {
                                modelValue: renderedAmount.value,
                                "onUpdate:modelValue": ($event) => renderedAmount.value = $event,
                                min: 5,
                                max: 50,
                                "input-enable": true
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_slider, {
                                  modelValue: renderedAmount.value,
                                  "onUpdate:modelValue": ($event) => renderedAmount.value = $event,
                                  min: 5,
                                  max: 50,
                                  "input-enable": true
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          label: "use min displayed",
                          style: { "max-width": "500px" },
                          helper: "是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_radio_group, {
                                modelValue: minDisplayedEnable.value,
                                "onUpdate:modelValue": ($event) => minDisplayedEnable.value = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_radio, { label: true }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`True`);
                                        } else {
                                          return [
                                            createTextVNode("True")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_radio, { label: false }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`False`);
                                        } else {
                                          return [
                                            createTextVNode("False")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_radio, { label: true }, {
                                        default: withCtx(() => [
                                          createTextVNode("True")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_radio, { label: false }, {
                                        default: withCtx(() => [
                                          createTextVNode("False")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_radio_group, {
                                  modelValue: minDisplayedEnable.value,
                                  "onUpdate:modelValue": ($event) => minDisplayedEnable.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_radio, { label: true }, {
                                      default: withCtx(() => [
                                        createTextVNode("True")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_radio, { label: false }, {
                                      default: withCtx(() => [
                                        createTextVNode("False")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_form_item, {
                          style: [
                            minDisplayedEnable.value ? null : { display: "none" },
                            { "max-width": "500px" }
                          ],
                          label: "min displayed",
                          helper: "至少显示的tag数量"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_slider, {
                                modelValue: minDisplayed.value,
                                "onUpdate:modelValue": ($event) => minDisplayed.value = $event,
                                min: 1,
                                max: renderedAmount.value,
                                "input-enable": true
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_slider, {
                                  modelValue: minDisplayed.value,
                                  "onUpdate:modelValue": ($event) => minDisplayed.value = $event,
                                  min: 1,
                                  max: renderedAmount.value,
                                  "input-enable": true
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_form_item, {
                            label: "Toggle",
                            helper: "展开/收起"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_button, {
                                size: "small",
                                onClick: toggle
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Toggle")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "size" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: size.value,
                                "onUpdate:modelValue": ($event) => size.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: "small" }),
                                  createVNode(_component_h_radio, { label: "medium" }),
                                  createVNode(_component_h_radio, { label: "large" })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "tooltip render type" }, {
                            helperTitle: withCtx(() => [
                              createTextVNode(" 折叠 `tooltip` 展示的内容 ")
                            ]),
                            helperContent: withCtx(() => [
                              createVNode("li", null, "innerText: 展示每个元素的文字内容"),
                              createVNode("li", null, "full: 完整渲染元素")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: renderType.value,
                                "onUpdate:modelValue": ($event) => renderType.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: "innerText" }),
                                  createVNode(_component_h_radio, { label: "full" })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "editable" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: editable.value,
                                "onUpdate:modelValue": ($event) => editable.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: true }, {
                                    default: withCtx(() => [
                                      createTextVNode("True")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: false }, {
                                    default: withCtx(() => [
                                      createTextVNode("False")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, { label: "closable" }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: closable.value,
                                "onUpdate:modelValue": ($event) => closable.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: true }, {
                                    default: withCtx(() => [
                                      createTextVNode("True")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: false }, {
                                    default: withCtx(() => [
                                      createTextVNode("False")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, {
                            label: "fill up",
                            helper: "是否尽量占满容器。启用 minDisplayed 无效"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: fillUp.value,
                                "onUpdate:modelValue": ($event) => fillUp.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: true }, {
                                    default: withCtx(() => [
                                      createTextVNode("True")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: false }, {
                                    default: withCtx(() => [
                                      createTextVNode("False")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, {
                            label: "width",
                            style: { "max-width": "500px" }
                          }, {
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
                          }),
                          createVNode(_component_h_form_item, {
                            label: "amount",
                            style: { "max-width": "500px" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_slider, {
                                modelValue: renderedAmount.value,
                                "onUpdate:modelValue": ($event) => renderedAmount.value = $event,
                                min: 5,
                                max: 50,
                                "input-enable": true
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_form_item, {
                            label: "use min displayed",
                            style: { "max-width": "500px" },
                            helper: "是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio_group, {
                                modelValue: minDisplayedEnable.value,
                                "onUpdate:modelValue": ($event) => minDisplayedEnable.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_h_radio, { label: true }, {
                                    default: withCtx(() => [
                                      createTextVNode("True")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_radio, { label: false }, {
                                    default: withCtx(() => [
                                      createTextVNode("False")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode(_component_h_form_item, {
                            label: "min displayed",
                            style: { "max-width": "500px" },
                            helper: "至少显示的tag数量"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_slider, {
                                modelValue: minDisplayed.value,
                                "onUpdate:modelValue": ($event) => minDisplayed.value = $event,
                                min: 1,
                                max: renderedAmount.value,
                                "input-enable": true
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ]),
                            _: 1
                          }, 512), [
                            [vShow, minDisplayedEnable.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_form, {
                      "label-width": "150px",
                      "label-position": "left",
                      "label-vertical-align": "middle",
                      "helper-placement": "after-label"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_form_item, {
                          label: "Toggle",
                          helper: "展开/收起"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_button, {
                              size: "small",
                              onClick: toggle
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Toggle")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "size" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: size.value,
                              "onUpdate:modelValue": ($event) => size.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: "small" }),
                                createVNode(_component_h_radio, { label: "medium" }),
                                createVNode(_component_h_radio, { label: "large" })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "tooltip render type" }, {
                          helperTitle: withCtx(() => [
                            createTextVNode(" 折叠 `tooltip` 展示的内容 ")
                          ]),
                          helperContent: withCtx(() => [
                            createVNode("li", null, "innerText: 展示每个元素的文字内容"),
                            createVNode("li", null, "full: 完整渲染元素")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: renderType.value,
                              "onUpdate:modelValue": ($event) => renderType.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: "innerText" }),
                                createVNode(_component_h_radio, { label: "full" })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "editable" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: editable.value,
                              "onUpdate:modelValue": ($event) => editable.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: true }, {
                                  default: withCtx(() => [
                                    createTextVNode("True")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: false }, {
                                  default: withCtx(() => [
                                    createTextVNode("False")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, { label: "closable" }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: closable.value,
                              "onUpdate:modelValue": ($event) => closable.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: true }, {
                                  default: withCtx(() => [
                                    createTextVNode("True")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: false }, {
                                  default: withCtx(() => [
                                    createTextVNode("False")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "fill up",
                          helper: "是否尽量占满容器。启用 minDisplayed 无效"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: fillUp.value,
                              "onUpdate:modelValue": ($event) => fillUp.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: true }, {
                                  default: withCtx(() => [
                                    createTextVNode("True")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: false }, {
                                  default: withCtx(() => [
                                    createTextVNode("False")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "width",
                          style: { "max-width": "500px" }
                        }, {
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
                        }),
                        createVNode(_component_h_form_item, {
                          label: "amount",
                          style: { "max-width": "500px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_slider, {
                              modelValue: renderedAmount.value,
                              "onUpdate:modelValue": ($event) => renderedAmount.value = $event,
                              min: 5,
                              max: 50,
                              "input-enable": true
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_form_item, {
                          label: "use min displayed",
                          style: { "max-width": "500px" },
                          helper: "是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_radio_group, {
                              modelValue: minDisplayedEnable.value,
                              "onUpdate:modelValue": ($event) => minDisplayedEnable.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_h_radio, { label: true }, {
                                  default: withCtx(() => [
                                    createTextVNode("True")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_radio, { label: false }, {
                                  default: withCtx(() => [
                                    createTextVNode("False")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        withDirectives(createVNode(_component_h_form_item, {
                          label: "min displayed",
                          style: { "max-width": "500px" },
                          helper: "至少显示的tag数量"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_h_slider, {
                              modelValue: minDisplayed.value,
                              "onUpdate:modelValue": ($event) => minDisplayed.value = $event,
                              min: 1,
                              max: renderedAmount.value,
                              "input-enable": true
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ]),
                          _: 1
                        }, 512), [
                          [vShow, minDisplayedEnable.value]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag_group, {
                    ref_key: "tagGroup",
                    ref: tagGroup,
                    collapse: true,
                    expand: true,
                    editable: editable.value,
                    "fill-up": fillUp.value,
                    size: size.value,
                    "tooltip-render-type": renderType.value,
                    "min-displayed": minDisplayedEnable.value ? minDisplayed.value : void 0,
                    "before-edit": onBeforeEdit,
                    "before-close": onBeforeClose,
                    style: { width: width.value + "px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(renderedItems.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_tag, {
                            id: index,
                            key: index,
                            clickable: false,
                            closable: closable.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(renderedItems.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_tag, {
                              id: index,
                              key: index,
                              clickable: false,
                              closable: closable.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item), 1)
                              ]),
                              _: 2
                            }, 1032, ["id", "closable"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag_group, {
                      ref_key: "tagGroup",
                      ref: tagGroup,
                      collapse: true,
                      expand: true,
                      editable: editable.value,
                      "fill-up": fillUp.value,
                      size: size.value,
                      "tooltip-render-type": renderType.value,
                      "min-displayed": minDisplayedEnable.value ? minDisplayed.value : void 0,
                      "before-edit": onBeforeEdit,
                      "before-close": onBeforeClose,
                      style: { width: width.value + "px" }
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(renderedItems.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_tag, {
                            id: index,
                            key: index,
                            clickable: false,
                            closable: closable.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item), 1)
                            ]),
                            _: 2
                          }, 1032, ["id", "closable"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["editable", "fill-up", "size", "tooltip-render-type", "min-displayed", "style"])
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
                    "label-width": "150px",
                    "label-position": "left",
                    "label-vertical-align": "middle",
                    "helper-placement": "after-label"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_form_item, {
                        label: "Toggle",
                        helper: "展开/收起"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_button, {
                            size: "small",
                            onClick: toggle
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Toggle")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "size" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: size.value,
                            "onUpdate:modelValue": ($event) => size.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: "small" }),
                              createVNode(_component_h_radio, { label: "medium" }),
                              createVNode(_component_h_radio, { label: "large" })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "tooltip render type" }, {
                        helperTitle: withCtx(() => [
                          createTextVNode(" 折叠 `tooltip` 展示的内容 ")
                        ]),
                        helperContent: withCtx(() => [
                          createVNode("li", null, "innerText: 展示每个元素的文字内容"),
                          createVNode("li", null, "full: 完整渲染元素")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: renderType.value,
                            "onUpdate:modelValue": ($event) => renderType.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: "innerText" }),
                              createVNode(_component_h_radio, { label: "full" })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "editable" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: editable.value,
                            "onUpdate:modelValue": ($event) => editable.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: true }, {
                                default: withCtx(() => [
                                  createTextVNode("True")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: false }, {
                                default: withCtx(() => [
                                  createTextVNode("False")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, { label: "closable" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: closable.value,
                            "onUpdate:modelValue": ($event) => closable.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: true }, {
                                default: withCtx(() => [
                                  createTextVNode("True")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: false }, {
                                default: withCtx(() => [
                                  createTextVNode("False")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, {
                        label: "fill up",
                        helper: "是否尽量占满容器。启用 minDisplayed 无效"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: fillUp.value,
                            "onUpdate:modelValue": ($event) => fillUp.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: true }, {
                                default: withCtx(() => [
                                  createTextVNode("True")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: false }, {
                                default: withCtx(() => [
                                  createTextVNode("False")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, {
                        label: "width",
                        style: { "max-width": "500px" }
                      }, {
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
                      }),
                      createVNode(_component_h_form_item, {
                        label: "amount",
                        style: { "max-width": "500px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_slider, {
                            modelValue: renderedAmount.value,
                            "onUpdate:modelValue": ($event) => renderedAmount.value = $event,
                            min: 5,
                            max: 50,
                            "input-enable": true
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_form_item, {
                        label: "use min displayed",
                        style: { "max-width": "500px" },
                        helper: "是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_radio_group, {
                            modelValue: minDisplayedEnable.value,
                            "onUpdate:modelValue": ($event) => minDisplayedEnable.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_h_radio, { label: true }, {
                                default: withCtx(() => [
                                  createTextVNode("True")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_radio, { label: false }, {
                                default: withCtx(() => [
                                  createTextVNode("False")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode(_component_h_form_item, {
                        label: "min displayed",
                        style: { "max-width": "500px" },
                        helper: "至少显示的tag数量"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_slider, {
                            modelValue: minDisplayed.value,
                            "onUpdate:modelValue": ($event) => minDisplayed.value = $event,
                            min: 1,
                            max: renderedAmount.value,
                            "input-enable": true
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        _: 1
                      }, 512), [
                        [vShow, minDisplayedEnable.value]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, null, {
                default: withCtx(() => [
                  createVNode(_component_h_tag_group, {
                    ref_key: "tagGroup",
                    ref: tagGroup,
                    collapse: true,
                    expand: true,
                    editable: editable.value,
                    "fill-up": fillUp.value,
                    size: size.value,
                    "tooltip-render-type": renderType.value,
                    "min-displayed": minDisplayedEnable.value ? minDisplayed.value : void 0,
                    "before-edit": onBeforeEdit,
                    "before-close": onBeforeClose,
                    style: { width: width.value + "px" }
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(renderedItems.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_tag, {
                          id: index,
                          key: index,
                          clickable: false,
                          closable: closable.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item), 1)
                          ]),
                          _: 2
                        }, 1032, ["id", "closable"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["editable", "fill-up", "size", "tooltip-render-type", "min-displayed", "style"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/collapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
