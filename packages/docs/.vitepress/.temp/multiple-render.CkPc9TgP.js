import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multiple-render",
  __ssrInlineRender: true,
  setup(__props) {
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    function valueFormat(originValue) {
      return {
        value: originValue.value,
        label: originValue.label
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_a_icon = resolveComponent("a-icon");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-fd3e2e00${_scopeId2}> 自定义 tag `);
                  _push3(ssrRenderComponent(_component_h_tooltip, null, {
                    content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 `);
                      } else {
                        return [
                          createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    collapse: "",
                    "to-body": false
                  }, {
                    tagRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_tag, {
                          type: "info",
                          clickable: false
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(`${slotProps.label}(${slotProps.en_name})` ?? "")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_tag, {
                            type: "info",
                            clickable: false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "中国",
                          value: 1,
                          en_name: "China"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "美国",
                          en_name: "America"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "日本",
                          en_name: "Japan"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "中国",
                            value: 1,
                            en_name: "China"
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "美国",
                            en_name: "America"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "日本",
                            en_name: "Japan"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 自定义 tag "),
                      createVNode(_component_h_tooltip, null, {
                        content: withCtx(() => [
                          createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      multiple: "",
                      collapse: "",
                      "to-body": false
                    }, {
                      tagRender: withCtx((slotProps) => [
                        createVNode(_component_h_tag, {
                          type: "info",
                          clickable: false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "中国",
                          value: 1,
                          en_name: "China"
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "美国",
                          en_name: "America"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "日本",
                          en_name: "Japan"
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
                  _push3(`<div class="demo-title" data-v-fd3e2e00${_scopeId2}> 允许创建选项 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, null, {
                    content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 `);
                      } else {
                        return [
                          createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: "",
                    "allow-create": "",
                    collapse: "",
                    "to-body": false
                  }, {
                    tagRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_tag, {
                          type: "success",
                          clickable: false
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(`${slotProps.label}(${slotProps.en_name})` ?? "")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_tag, {
                            type: "success",
                            clickable: false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          label: "中国",
                          value: 1,
                          en_name: "Chinaaaaa"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 3,
                          label: "日本",
                          en_name: "Japanaaaa"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: 2,
                          label: "美国",
                          en_name: "Afsdffdsa"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            label: "中国",
                            value: 1,
                            en_name: "Chinaaaaa"
                          }),
                          createVNode(_component_h_option, {
                            value: 3,
                            label: "日本",
                            en_name: "Japanaaaa"
                          }),
                          createVNode(_component_h_option, {
                            value: 2,
                            label: "美国",
                            en_name: "Afsdffdsa"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 允许创建选项 "),
                      createVNode(_component_h_tooltip, null, {
                        content: withCtx(() => [
                          createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      multiple: "",
                      "allow-create": "",
                      collapse: "",
                      "to-body": false
                    }, {
                      tagRender: withCtx((slotProps) => [
                        createVNode(_component_h_tag, {
                          type: "success",
                          clickable: false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          label: "中国",
                          value: 1,
                          en_name: "Chinaaaaa"
                        }),
                        createVNode(_component_h_option, {
                          value: 3,
                          label: "日本",
                          en_name: "Japanaaaa"
                        }),
                        createVNode(_component_h_option, {
                          value: 2,
                          label: "美国",
                          en_name: "Afsdffdsa"
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
                  _push3(`<div class="demo-title" data-v-fd3e2e00${_scopeId2}>自定义 完整 select</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    multiple: true,
                    "value-format": valueFormat,
                    "to-body": false
                  }, {
                    selectRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 你的选择是：${ssrInterpolate(values3.value.map((v) => v.label).join("+"))}`);
                      } else {
                        return [
                          createTextVNode(" 你的选择是：" + toDisplayString(values3.value.map((v) => v.label).join("+")), 1)
                        ];
                      }
                    }),
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义 完整 select"),
                    createVNode(_component_h_select, {
                      modelValue: values3.value,
                      "onUpdate:modelValue": ($event) => values3.value = $event,
                      multiple: true,
                      "value-format": valueFormat,
                      "to-body": false
                    }, {
                      selectRender: withCtx(() => [
                        createTextVNode(" 你的选择是：" + toDisplayString(values3.value.map((v) => v.label).join("+")), 1)
                      ]),
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
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 自定义 tag "),
                    createVNode(_component_h_tooltip, null, {
                      content: withCtx(() => [
                        createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: "",
                    collapse: "",
                    "to-body": false
                  }, {
                    tagRender: withCtx((slotProps) => [
                      createVNode(_component_h_tag, {
                        type: "info",
                        clickable: false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1,
                        en_name: "China"
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国",
                        en_name: "America"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本",
                        en_name: "Japan"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 允许创建选项 "),
                    createVNode(_component_h_tooltip, null, {
                      content: withCtx(() => [
                        createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数 ")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: "",
                    "allow-create": "",
                    collapse: "",
                    "to-body": false
                  }, {
                    tagRender: withCtx((slotProps) => [
                      createVNode(_component_h_tag, {
                        type: "success",
                        clickable: false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1,
                        en_name: "Chinaaaaa"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本",
                        en_name: "Japanaaaa"
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国",
                        en_name: "Afsdffdsa"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义 完整 select"),
                  createVNode(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    multiple: true,
                    "value-format": valueFormat,
                    "to-body": false
                  }, {
                    selectRender: withCtx(() => [
                      createTextVNode(" 你的选择是：" + toDisplayString(values3.value.map((v) => v.label).join("+")), 1)
                    ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/multiple-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const multipleRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd3e2e00"]]);
export {
  multipleRender as default
};
