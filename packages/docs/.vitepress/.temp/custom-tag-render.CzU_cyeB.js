import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-tag-render",
  __ssrInlineRender: true,
  setup(__props) {
    const optionList = [
      { label: "正常", color: "brand" },
      { label: "警示", type: "warning" },
      { label: "错误", type: "error" },
      { label: "进行中", type: "info" },
      { label: "已完成", type: "success" }
    ];
    const value = ref();
    const values = ref([]);
    const values2 = ref([]);
    const size = ref("medium");
    const filterable = ref(true);
    const pure = ref(false);
    function getOptionByValue(value2) {
      return optionList.find((curr) => curr.label === value2);
    }
    function onDeselect(collection, value2) {
      const index = collection.indexOf(value2);
      if (index >= 0) {
        collection.splice(index, 1);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_tag = resolveComponent("h-tag");
      const _component_h_tag_group = resolveComponent("h-tag-group");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
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
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "small" }),
                          createVNode(_component_h_radio, { label: "medium" }),
                          createVNode(_component_h_radio, { label: "large" })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否可过滤" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: filterable.value,
                    "onUpdate:modelValue": ($event) => filterable.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: filterable.value,
                      "onUpdate:modelValue": ($event) => filterable.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否是纯粹标签" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: pure.value,
                    "onUpdate:modelValue": ($event) => pure.value = $event,
                    status: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: pure.value,
                      "onUpdate:modelValue": ($event) => pure.value = $event,
                      status: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode(_component_h_radio, { label: "small" }),
                      createVNode(_component_h_radio, { label: "medium" }),
                      createVNode(_component_h_radio, { label: "large" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否可过滤" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: filterable.value,
                    "onUpdate:modelValue": ($event) => filterable.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否是纯粹标签" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: pure.value,
                    "onUpdate:modelValue": ($event) => pure.value = $event,
                    status: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f0250ff6${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "to-body": false,
                    filterable: filterable.value,
                    clearable: "",
                    size: size.value
                  }, {
                    tagRender: withCtx((props, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d, _e, _f;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_tag, {
                          key: props.value,
                          type: (_a = getOptionByValue(value.value)) == null ? void 0 : _a.type,
                          clickable: false,
                          color: (_b = getOptionByValue(value.value)) == null ? void 0 : _b.color,
                          "auto-color": !!((_c = getOptionByValue(value.value)) == null ? void 0 : _c.color),
                          size: size.value,
                          "is-pure": pure.value
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(value.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(value.value), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          (openBlock(), createBlock(_component_h_tag, {
                            key: props.value,
                            type: (_d = getOptionByValue(value.value)) == null ? void 0 : _d.type,
                            clickable: false,
                            color: (_e = getOptionByValue(value.value)) == null ? void 0 : _e.color,
                            "auto-color": !!((_f = getOptionByValue(value.value)) == null ? void 0 : _f.color),
                            size: size.value,
                            "is-pure": pure.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(value.value), 1)
                            ]),
                            _: 1
                          }, 8, ["type", "color", "auto-color", "size", "is-pure"]))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(optionList, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_tag, {
                                    type: item.type,
                                    clickable: false,
                                    color: item.color,
                                    "auto-color": !!item.color
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type", "color", "auto-color"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.label,
                              label: item.label,
                              value: item.label
                            }, {
                              label: withCtx(() => [
                                createVNode(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type", "color", "auto-color"])
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "to-body": false,
                      filterable: filterable.value,
                      clearable: "",
                      size: size.value
                    }, {
                      tagRender: withCtx((props) => {
                        var _a, _b, _c;
                        return [
                          (openBlock(), createBlock(_component_h_tag, {
                            key: props.value,
                            type: (_a = getOptionByValue(value.value)) == null ? void 0 : _a.type,
                            clickable: false,
                            color: (_b = getOptionByValue(value.value)) == null ? void 0 : _b.color,
                            "auto-color": !!((_c = getOptionByValue(value.value)) == null ? void 0 : _c.color),
                            size: size.value,
                            "is-pure": pure.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(value.value), 1)
                            ]),
                            _: 1
                          }, 8, ["type", "color", "auto-color", "size", "is-pure"]))
                        ];
                      }),
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx(() => [
                              createVNode(_component_h_tag, {
                                type: item.type,
                                clickable: false,
                                color: item.color,
                                "auto-color": !!item.color
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["type", "color", "auto-color"])
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f0250ff6${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    multiple: true,
                    collapse: true,
                    "collapse-tags-tooltip": true,
                    "to-body": false,
                    filterable: filterable.value,
                    clearable: "",
                    size: size.value
                  }, {
                    tagRender: withCtx((props, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_tag, {
                          key: props.value,
                          type: getOptionByValue(props.value).type,
                          clickable: false,
                          closable: true,
                          size: size.value,
                          color: getOptionByValue(props.value).color,
                          "auto-color": !!getOptionByValue(props.value).color,
                          "is-pure": pure.value,
                          onClose: ($event) => onDeselect(values.value, props.value)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(getOptionByValue(props.value).label)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(getOptionByValue(props.value).label), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          (openBlock(), createBlock(_component_h_tag, {
                            key: props.value,
                            type: getOptionByValue(props.value).type,
                            clickable: false,
                            closable: true,
                            size: size.value,
                            color: getOptionByValue(props.value).color,
                            "auto-color": !!getOptionByValue(props.value).color,
                            "is-pure": pure.value,
                            onClose: ($event) => onDeselect(values.value, props.value)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getOptionByValue(props.value).label), 1)
                            ]),
                            _: 2
                          }, 1032, ["type", "size", "color", "auto-color", "is-pure", "onClose"]))
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(optionList, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_tag, {
                                    type: item.type,
                                    clickable: false,
                                    color: item.color,
                                    "auto-color": !!item.color
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type", "color", "auto-color"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.label,
                              label: item.label,
                              value: item.label
                            }, {
                              label: withCtx(() => [
                                createVNode(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type", "color", "auto-color"])
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_select, {
                      modelValue: values.value,
                      "onUpdate:modelValue": ($event) => values.value = $event,
                      multiple: true,
                      collapse: true,
                      "collapse-tags-tooltip": true,
                      "to-body": false,
                      filterable: filterable.value,
                      clearable: "",
                      size: size.value
                    }, {
                      tagRender: withCtx((props) => [
                        (openBlock(), createBlock(_component_h_tag, {
                          key: props.value,
                          type: getOptionByValue(props.value).type,
                          clickable: false,
                          closable: true,
                          size: size.value,
                          color: getOptionByValue(props.value).color,
                          "auto-color": !!getOptionByValue(props.value).color,
                          "is-pure": pure.value,
                          onClose: ($event) => onDeselect(values.value, props.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getOptionByValue(props.value).label), 1)
                          ]),
                          _: 2
                        }, 1032, ["type", "size", "color", "auto-color", "is-pure", "onClose"]))
                      ]),
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx(() => [
                              createVNode(_component_h_tag, {
                                type: item.type,
                                clickable: false,
                                color: item.color,
                                "auto-color": !!item.color
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["type", "color", "auto-color"])
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f0250ff6${_scopeId2}>完全自定</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "to-body": false,
                    filterable: filterable.value,
                    size: size.value
                  }, {
                    selectRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_tag_group, {
                          collapse: "",
                          "collapse-use-tooltip": "",
                          "tooltip-render-type": "full"
                        }, {
                          prefix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "align-self": "center" })}" data-v-f0250ff6${_scopeId4}>你的选择是：</div>`);
                            } else {
                              return [
                                createVNode("div", { style: { "align-self": "center" } }, "你的选择是：")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(values2.value, (item) => {
                                _push5(ssrRenderComponent(_component_h_tag, {
                                  key: item,
                                  closable: true,
                                  size: size.value,
                                  onClose: ($event) => onDeselect(values2.value, item)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(values2.value, (item) => {
                                  return openBlock(), createBlock(_component_h_tag, {
                                    key: item,
                                    closable: true,
                                    size: size.value,
                                    onClose: ($event) => onDeselect(values2.value, item)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["size", "onClose"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_tag_group, {
                            collapse: "",
                            "collapse-use-tooltip": "",
                            "tooltip-render-type": "full"
                          }, {
                            prefix: withCtx(() => [
                              createVNode("div", { style: { "align-self": "center" } }, "你的选择是：")
                            ]),
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(values2.value, (item) => {
                                return openBlock(), createBlock(_component_h_tag, {
                                  key: item,
                                  closable: true,
                                  size: size.value,
                                  onClose: ($event) => onDeselect(values2.value, item)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["size", "onClose"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(optionList, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_tag, {
                                    type: item.type,
                                    clickable: false,
                                    color: item.color,
                                    "auto-color": !!item.color
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type", "color", "auto-color"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.label,
                              label: item.label,
                              value: item.label
                            }, {
                              label: withCtx(() => [
                                createVNode(_component_h_tag, {
                                  type: item.type,
                                  clickable: false,
                                  color: item.color,
                                  "auto-color": !!item.color
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type", "color", "auto-color"])
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "完全自定"),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      multiple: true,
                      "to-body": false,
                      filterable: filterable.value,
                      size: size.value
                    }, {
                      selectRender: withCtx(() => [
                        createVNode(_component_h_tag_group, {
                          collapse: "",
                          "collapse-use-tooltip": "",
                          "tooltip-render-type": "full"
                        }, {
                          prefix: withCtx(() => [
                            createVNode("div", { style: { "align-self": "center" } }, "你的选择是：")
                          ]),
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(values2.value, (item) => {
                              return openBlock(), createBlock(_component_h_tag, {
                                key: item,
                                closable: true,
                                size: size.value,
                                onClose: ($event) => onDeselect(values2.value, item)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item), 1)
                                ]),
                                _: 2
                              }, 1032, ["size", "onClose"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.label,
                            label: item.label,
                            value: item.label
                          }, {
                            label: withCtx(() => [
                              createVNode(_component_h_tag, {
                                type: item.type,
                                clickable: false,
                                color: item.color,
                                "auto-color": !!item.color
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["type", "color", "auto-color"])
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "to-body": false,
                    filterable: filterable.value,
                    clearable: "",
                    size: size.value
                  }, {
                    tagRender: withCtx((props) => {
                      var _a, _b, _c;
                      return [
                        (openBlock(), createBlock(_component_h_tag, {
                          key: props.value,
                          type: (_a = getOptionByValue(value.value)) == null ? void 0 : _a.type,
                          clickable: false,
                          color: (_b = getOptionByValue(value.value)) == null ? void 0 : _b.color,
                          "auto-color": !!((_c = getOptionByValue(value.value)) == null ? void 0 : _c.color),
                          size: size.value,
                          "is-pure": pure.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(value.value), 1)
                          ]),
                          _: 1
                        }, 8, ["type", "color", "auto-color", "size", "is-pure"]))
                      ];
                    }),
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.label,
                          label: item.label,
                          value: item.label
                        }, {
                          label: withCtx(() => [
                            createVNode(_component_h_tag, {
                              type: item.type,
                              clickable: false,
                              color: item.color,
                              "auto-color": !!item.color
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["type", "color", "auto-color"])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_select, {
                    modelValue: values.value,
                    "onUpdate:modelValue": ($event) => values.value = $event,
                    multiple: true,
                    collapse: true,
                    "collapse-tags-tooltip": true,
                    "to-body": false,
                    filterable: filterable.value,
                    clearable: "",
                    size: size.value
                  }, {
                    tagRender: withCtx((props) => [
                      (openBlock(), createBlock(_component_h_tag, {
                        key: props.value,
                        type: getOptionByValue(props.value).type,
                        clickable: false,
                        closable: true,
                        size: size.value,
                        color: getOptionByValue(props.value).color,
                        "auto-color": !!getOptionByValue(props.value).color,
                        "is-pure": pure.value,
                        onClose: ($event) => onDeselect(values.value, props.value)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getOptionByValue(props.value).label), 1)
                        ]),
                        _: 2
                      }, 1032, ["type", "size", "color", "auto-color", "is-pure", "onClose"]))
                    ]),
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.label,
                          label: item.label,
                          value: item.label
                        }, {
                          label: withCtx(() => [
                            createVNode(_component_h_tag, {
                              type: item.type,
                              clickable: false,
                              color: item.color,
                              "auto-color": !!item.color
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["type", "color", "auto-color"])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "完全自定"),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "to-body": false,
                    filterable: filterable.value,
                    size: size.value
                  }, {
                    selectRender: withCtx(() => [
                      createVNode(_component_h_tag_group, {
                        collapse: "",
                        "collapse-use-tooltip": "",
                        "tooltip-render-type": "full"
                      }, {
                        prefix: withCtx(() => [
                          createVNode("div", { style: { "align-self": "center" } }, "你的选择是：")
                        ]),
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(values2.value, (item) => {
                            return openBlock(), createBlock(_component_h_tag, {
                              key: item,
                              closable: true,
                              size: size.value,
                              onClose: ($event) => onDeselect(values2.value, item)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item), 1)
                              ]),
                              _: 2
                            }, 1032, ["size", "onClose"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(optionList, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.label,
                          label: item.label,
                          value: item.label
                        }, {
                          label: withCtx(() => [
                            createVNode(_component_h_tag, {
                              type: item.type,
                              clickable: false,
                              color: item.color,
                              "auto-color": !!item.color
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["type", "color", "auto-color"])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "filterable", "size"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/custom-tag-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customTagRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0250ff6"]]);
export {
  customTagRender as default
};
