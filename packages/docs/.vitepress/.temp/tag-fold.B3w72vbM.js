import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const values4 = ref([]);
    const values5 = ref([]);
    const values6 = ref([]);
    return {
      values4,
      values5,
      values6
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_tooltip = resolveComponent("h-tooltip");
  const _component_a_icon = resolveComponent("a-icon");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}> 选项超长 `);
              _push3(ssrRenderComponent(_component_h_tooltip, null, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` 由于折叠需要执行宽度计算，在选项较多时，会对性能造成影响 `);
                  } else {
                    return [
                      createTextVNode(" 由于折叠需要执行宽度计算，在选项较多时，会对性能造成影响 ")
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
                modelValue: _ctx.values4,
                "onUpdate:modelValue": ($event) => _ctx.values4 = $event,
                collapse: "",
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
                createVNode("div", { class: "demo-title" }, [
                  createTextVNode(" 选项超长 "),
                  createVNode(_component_h_tooltip, null, {
                    content: withCtx(() => [
                      createTextVNode(" 由于折叠需要执行宽度计算，在选项较多时，会对性能造成影响 ")
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_a_icon, { name: "help" })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values4,
                  "onUpdate:modelValue": ($event) => _ctx.values4 = $event,
                  collapse: "",
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
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>带过滤选项长度超长</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values5,
                "onUpdate:modelValue": ($event) => _ctx.values5 = $event,
                "filter-option": "",
                collapse: "",
                multiple: "",
                "max-tag-width": 200,
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
                createVNode("div", { class: "demo-title" }, "带过滤选项长度超长"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values5,
                  "onUpdate:modelValue": ($event) => _ctx.values5 = $event,
                  "filter-option": "",
                  collapse: "",
                  multiple: "",
                  "max-tag-width": 200,
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
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>允许创建</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values6,
                "onUpdate:modelValue": ($event) => _ctx.values6 = $event,
                "allow-create": "",
                collapse: "",
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
                createVNode("div", { class: "demo-title" }, "允许创建"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values6,
                  "onUpdate:modelValue": ($event) => _ctx.values6 = $event,
                  "allow-create": "",
                  collapse: "",
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
                createTextVNode(" 选项超长 "),
                createVNode(_component_h_tooltip, null, {
                  content: withCtx(() => [
                    createTextVNode(" 由于折叠需要执行宽度计算，在选项较多时，会对性能造成影响 ")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_a_icon, { name: "help" })
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_h_select, {
                modelValue: _ctx.values4,
                "onUpdate:modelValue": ($event) => _ctx.values4 = $event,
                collapse: "",
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
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "带过滤选项长度超长"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values5,
                "onUpdate:modelValue": ($event) => _ctx.values5 = $event,
                "filter-option": "",
                collapse: "",
                multiple: "",
                "max-tag-width": 200,
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
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "允许创建"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values6,
                "onUpdate:modelValue": ($event) => _ctx.values6 = $event,
                "allow-create": "",
                collapse: "",
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/tag-fold.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tagFold = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  tagFold as default
};
