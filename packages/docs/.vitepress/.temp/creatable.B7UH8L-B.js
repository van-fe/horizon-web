import { defineComponent, ref, resolveComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { K as __default__ } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "creatable",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const beforeCreate = (value, optionMap) => {
      console.info(value);
      console.info(optionMap);
      if (optionMap.get(value) || value === "南京") return false;
    };
    function onInput(val) {
      console.info("input:", val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选-允许创建 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, { content: "拦截创建【南京】" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(__default__), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(__default__))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "allow-create": "",
                    "before-create": beforeCreate,
                    "to-body": false,
                    onInput
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "1",
                          label: "上海"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "2",
                          label: "北京"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "3",
                          label: "合肥",
                          name: "hefei"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: "1",
                            label: "上海"
                          }),
                          createVNode(_component_h_option, {
                            value: "2",
                            label: "北京"
                          }),
                          createVNode(_component_h_option, {
                            value: "3",
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
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode("单选-允许创建 "),
                      createVNode(_component_h_tooltip, { content: "拦截创建【南京】" }, {
                        default: withCtx(() => [
                          createVNode(unref(__default__))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "allow-create": "",
                      "before-create": beforeCreate,
                      "to-body": false,
                      onInput
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: "1",
                          label: "上海"
                        }),
                        createVNode(_component_h_option, {
                          value: "2",
                          label: "北京"
                        }),
                        createVNode(_component_h_option, {
                          value: "3",
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
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选-允许创建</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "allow-create": "",
                    multiple: "",
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
                    createVNode("div", { class: "demo-title" }, "多选-允许创建"),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      "allow-create": "",
                      multiple: "",
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
                  _push3(`<div class="demo-title"${_scopeId2}>多选-带创建选项长度超长</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "allow-create": "",
                    multiple: "",
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
                          label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
                            label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选-带创建选项长度超长"),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      "allow-create": "",
                      multiple: "",
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
                          label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
                    createTextVNode("单选-允许创建 "),
                    createVNode(_component_h_tooltip, { content: "拦截创建【南京】" }, {
                      default: withCtx(() => [
                        createVNode(unref(__default__))
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "allow-create": "",
                    "before-create": beforeCreate,
                    "to-body": false,
                    onInput
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: "1",
                        label: "上海"
                      }),
                      createVNode(_component_h_option, {
                        value: "2",
                        label: "北京"
                      }),
                      createVNode(_component_h_option, {
                        value: "3",
                        label: "合肥",
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
                  createVNode("div", { class: "demo-title" }, "多选-允许创建"),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "allow-create": "",
                    multiple: "",
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
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选-带创建选项长度超长"),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "allow-create": "",
                    multiple: "",
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
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/creatable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
