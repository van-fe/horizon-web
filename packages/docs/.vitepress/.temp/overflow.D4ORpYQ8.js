import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "overflow",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选：选项长度超长</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "齐齐哈尔",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "那然色布斯台音布拉格"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选：选项长度超长"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
                  _push3(`<div class="demo-title"${_scopeId2}>单选：过滤+选项长度超长</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "齐齐哈尔",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "那然色布斯台音布拉格"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选：过滤+选项长度超长"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "filter-option": "",
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
                  _push3(`<div class="demo-title"${_scopeId2}>多选：选项长度超长</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    "to-body": false,
                    collapse: true,
                    "collapse-tags-fill-up": true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "上海",
                          value: 3
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 4,
                          label: "北京"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 5,
                          label: "合肥",
                          name: "hefei"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 6,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "齐齐哈尔",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "那然色布斯台音布拉格"
                          }),
                          createVNode(_component_h_option, {
                            label: "上海",
                            value: 3
                          }),
                          createVNode(_component_h_option, {
                            value: 4,
                            label: "北京"
                          }),
                          createVNode(_component_h_option, {
                            value: 5,
                            label: "合肥",
                            name: "hefei"
                          }),
                          createVNode(_component_h_option, {
                            value: 6,
                            label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选：选项长度超长"),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      multiple: "",
                      "to-body": false,
                      collapse: true,
                      "collapse-tags-fill-up": true
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }),
                        createVNode(_component_h_option, {
                          label: "上海",
                          value: 3
                        }),
                        createVNode(_component_h_option, {
                          value: 4,
                          label: "北京"
                        }),
                        createVNode(_component_h_option, {
                          value: 5,
                          label: "合肥",
                          name: "hefei"
                        }),
                        createVNode(_component_h_option, {
                          value: 6,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
                  _push3(`<div class="demo-title"${_scopeId2}>多选：过滤+选项长度超长</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "filter-option": true,
                    collapse: true,
                    "collapse-tags-fill-up": "",
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "齐齐哈尔",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "那然色布斯台音布拉格"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选：过滤+选项长度超长"),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      multiple: true,
                      "filter-option": true,
                      collapse: true,
                      "collapse-tags-fill-up": "",
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
                  _push3(`<div class="demo-title"${_scopeId2}>选项行数设定为2</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    multiple: true,
                    "filter-option": true,
                    collapse: true,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          "max-lines": 2,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "齐齐哈尔",
                            value: 1
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "那然色布斯台音布拉格"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            "max-lines": 2,
                            label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "选项行数设定为2"),
                    createVNode(_component_h_select, {
                      modelValue: values3.value,
                      "onUpdate:modelValue": ($event) => values3.value = $event,
                      multiple: true,
                      "filter-option": true,
                      collapse: true,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "齐齐哈尔",
                          value: 1
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "那然色布斯台音布拉格"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          "max-lines": 2,
                          label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
                  createVNode("div", { class: "demo-title" }, "单选：选项长度超长"),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选：过滤+选项长度超长"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选：选项长度超长"),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    "to-body": false,
                    collapse: true,
                    "collapse-tags-fill-up": true
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        label: "上海",
                        value: 3
                      }),
                      createVNode(_component_h_option, {
                        value: 4,
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: 5,
                        label: "合肥",
                        name: "hefei"
                      }),
                      createVNode(_component_h_option, {
                        value: 6,
                        label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选：过滤+选项长度超长"),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "filter-option": true,
                    collapse: true,
                    "collapse-tags-fill-up": "",
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "选项行数设定为2"),
                  createVNode(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    multiple: true,
                    "filter-option": true,
                    collapse: true,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        "max-lines": 2,
                        label: "这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/overflow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
