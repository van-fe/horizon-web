import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    return {
      value1,
      value2,
      values1,
      values2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_option_group = resolveComponent("h-option-group");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 20 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>普通单选</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                clearable: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "上海",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "北京"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "合肥",
                      name: "hefei"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "上海",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "合肥",
                        name: "hefei"
                      }),
                      createVNode(_component_h_option, {
                        label: "杭州",
                        value: 4
                      }),
                      createVNode(_component_h_option, {
                        value: 5,
                        label: "成都"
                      }),
                      createVNode(_component_h_option, {
                        value: 6,
                        label: "重庆",
                        name: "hefei"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "普通单选"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value1,
                  "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                  clearable: "",
                  "selected-option-order-to-top": true,
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "上海",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "北京"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "合肥",
                      name: "hefei"
                    }),
                    createVNode(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }),
                    createVNode(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }),
                    createVNode(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>普通多选</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values1,
                "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                multiple: true,
                clearable: "",
                "to-body": false,
                "selected-option-order-to-top": true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "上海",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "北京"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "合肥",
                      name: "hefei"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "上海",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "合肥",
                        name: "hefei"
                      }),
                      createVNode(_component_h_option, {
                        label: "杭州",
                        value: 4
                      }),
                      createVNode(_component_h_option, {
                        value: 5,
                        label: "成都"
                      }),
                      createVNode(_component_h_option, {
                        value: 6,
                        label: "重庆",
                        name: "hefei"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "普通多选"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values1,
                  "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                  multiple: true,
                  clearable: "",
                  "to-body": false,
                  "selected-option-order-to-top": true
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "上海",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "北京"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "合肥",
                      name: "hefei"
                    }),
                    createVNode(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }),
                    createVNode(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }),
                    createVNode(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选 - 不具名分组</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                clearable: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option_group, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_option, {
                            label: "上海",
                            value: 1
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 2,
                            label: "北京"
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 3,
                            label: "合肥",
                            name: "hefei"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_option, {
                              label: "上海",
                              value: 1
                            }),
                            createVNode(_component_h_option, {
                              value: 2,
                              label: "北京"
                            }),
                            createVNode(_component_h_option, {
                              value: 3,
                              label: "合肥",
                              name: "hefei"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option_group, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_option, {
                            label: "上海",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "北京"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "合肥",
                            name: "hefei"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_option, {
                        label: "杭州",
                        value: 4
                      }),
                      createVNode(_component_h_option, {
                        value: 5,
                        label: "成都"
                      }),
                      createVNode(_component_h_option, {
                        value: 6,
                        label: "重庆",
                        name: "hefei"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选 - 不具名分组"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value2,
                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                  clearable: "",
                  "selected-option-order-to-top": true,
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option_group, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "上海",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "北京"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "合肥",
                          name: "hefei"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_option, {
                      label: "杭州",
                      value: 4
                    }),
                    createVNode(_component_h_option, {
                      value: 5,
                      label: "成都"
                    }),
                    createVNode(_component_h_option, {
                      value: 6,
                      label: "重庆",
                      name: "hefei"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选 - 具名分组</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                clearable: "",
                multiple: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option_group, { label: "一线" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_option, {
                            label: "上海",
                            value: 1
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 2,
                            label: "北京"
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 3,
                            label: "广州",
                            name: "hefei"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_option, {
                              label: "上海",
                              value: 1
                            }),
                            createVNode(_component_h_option, {
                              value: 2,
                              label: "北京"
                            }),
                            createVNode(_component_h_option, {
                              value: 3,
                              label: "广州",
                              name: "hefei"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option_group, { label: "二线" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_option, {
                            label: "杭州",
                            value: 4
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 5,
                            label: "成都"
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_option, {
                            value: 6,
                            label: "重庆",
                            name: "hefei"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_option, {
                              label: "杭州",
                              value: 4
                            }),
                            createVNode(_component_h_option, {
                              value: 5,
                              label: "成都"
                            }),
                            createVNode(_component_h_option, {
                              value: 6,
                              label: "重庆",
                              name: "hefei"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option_group, { label: "一线" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_option, {
                            label: "上海",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "北京"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "广州",
                            name: "hefei"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_option_group, { label: "二线" }, {
                        default: withCtx(() => [
                          createVNode(_component_h_option, {
                            label: "杭州",
                            value: 4
                          }),
                          createVNode(_component_h_option, {
                            value: 5,
                            label: "成都"
                          }),
                          createVNode(_component_h_option, {
                            value: 6,
                            label: "重庆",
                            name: "hefei"
                          })
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
                createVNode("div", { class: "demo-title" }, "多选 - 具名分组"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values2,
                  "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                  clearable: "",
                  multiple: "",
                  "selected-option-order-to-top": true,
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option_group, { label: "一线" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "上海",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "北京"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "广州",
                          name: "hefei"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_option_group, { label: "二线" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "杭州",
                          value: 4
                        }),
                        createVNode(_component_h_option, {
                          value: 5,
                          label: "成都"
                        }),
                        createVNode(_component_h_option, {
                          value: 6,
                          label: "重庆",
                          name: "hefei"
                        })
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
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "普通单选"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                clearable: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "上海",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "北京"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "合肥",
                    name: "hefei"
                  }),
                  createVNode(_component_h_option, {
                    label: "杭州",
                    value: 4
                  }),
                  createVNode(_component_h_option, {
                    value: 5,
                    label: "成都"
                  }),
                  createVNode(_component_h_option, {
                    value: 6,
                    label: "重庆",
                    name: "hefei"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "普通多选"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values1,
                "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                multiple: true,
                clearable: "",
                "to-body": false,
                "selected-option-order-to-top": true
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "上海",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "北京"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "合肥",
                    name: "hefei"
                  }),
                  createVNode(_component_h_option, {
                    label: "杭州",
                    value: 4
                  }),
                  createVNode(_component_h_option, {
                    value: 5,
                    label: "成都"
                  }),
                  createVNode(_component_h_option, {
                    value: 6,
                    label: "重庆",
                    name: "hefei"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选 - 不具名分组"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                clearable: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option_group, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "上海",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "合肥",
                        name: "hefei"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_option, {
                    label: "杭州",
                    value: 4
                  }),
                  createVNode(_component_h_option, {
                    value: 5,
                    label: "成都"
                  }),
                  createVNode(_component_h_option, {
                    value: 6,
                    label: "重庆",
                    name: "hefei"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选 - 具名分组"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                clearable: "",
                multiple: "",
                "selected-option-order-to-top": true,
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option_group, { label: "一线" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "上海",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "广州",
                        name: "hefei"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_option_group, { label: "二线" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "杭州",
                        value: 4
                      }),
                      createVNode(_component_h_option, {
                        value: 5,
                        label: "成都"
                      }),
                      createVNode(_component_h_option, {
                        value: 6,
                        label: "重庆",
                        name: "hefei"
                      })
                    ]),
                    _: 1
                  })
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/selected-option-order-to-top.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const selectedOptionOrderToTop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  selectedOptionOrderToTop as default
};
