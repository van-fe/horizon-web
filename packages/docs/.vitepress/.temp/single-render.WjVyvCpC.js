import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    return {
      valueFormat(originValue) {
        return {
          value: originValue.value,
          label: originValue.label
        };
      },
      value1,
      value2
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
              _push3(`<div class="demo-title"${_scopeId2}> 自定义 tag `);
              _push3(ssrRenderComponent(_component_h_tooltip, null, {
                content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效 `);
                  } else {
                    return [
                      createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效 ")
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
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "to-body": false
              }, {
                tagRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div style="${ssrRenderStyle({ "height": "100px", "display": "flex", "align-items": "center" })}"${_scopeId3}>${ssrInterpolate(`${slotProps.label}(${slotProps.en_name})` ?? "")}</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "height": "100px", "display": "flex", "align-items": "center" } }, toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
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
                      createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效 ")
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_a_icon, { name: "help" })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value1,
                  "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                  "to-body": false
                }, {
                  tagRender: withCtx((slotProps) => [
                    createVNode("div", { style: { "height": "100px", "display": "flex", "align-items": "center" } }, toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
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
              _push3(`<div class="demo-title"${_scopeId2}>自定义 完整 select</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "value-format": _ctx.valueFormat,
                "to-body": false
              }, {
                selectRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b, _c, _d;
                  if (_push4) {
                    _push4(`<div style="${ssrRenderStyle({ "height": "100px", "border": "1px solid #f00" })}"${_scopeId3}>${ssrInterpolate(_ctx.value2 ? ((_a = _ctx.value2) == null ? void 0 : _a.label) + "" + ((_b = _ctx.value2) == null ? void 0 : _b.value) : "")}</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "height": "100px", "border": "1px solid #f00" } }, toDisplayString(_ctx.value2 ? ((_c = _ctx.value2) == null ? void 0 : _c.label) + "" + ((_d = _ctx.value2) == null ? void 0 : _d.value) : ""), 1)
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
                  modelValue: _ctx.value2,
                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                  "value-format": _ctx.valueFormat,
                  "to-body": false
                }, {
                  selectRender: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("div", { style: { "height": "100px", "border": "1px solid #f00" } }, toDisplayString(_ctx.value2 ? ((_a = _ctx.value2) == null ? void 0 : _a.label) + "" + ((_b = _ctx.value2) == null ? void 0 : _b.value) : ""), 1)
                    ];
                  }),
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
                }, 8, ["modelValue", "onUpdate:modelValue", "value-format"])
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
                    createTextVNode(" 你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效 ")
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_a_icon, { name: "help" })
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "to-body": false
              }, {
                tagRender: withCtx((slotProps) => [
                  createVNode("div", { style: { "height": "100px", "display": "flex", "align-items": "center" } }, toDisplayString(`${slotProps.label}(${slotProps.en_name})` ?? ""), 1)
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
              createVNode("div", { class: "demo-title" }, "自定义 完整 select"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "value-format": _ctx.valueFormat,
                "to-body": false
              }, {
                selectRender: withCtx(() => {
                  var _a, _b;
                  return [
                    createVNode("div", { style: { "height": "100px", "border": "1px solid #f00" } }, toDisplayString(_ctx.value2 ? ((_a = _ctx.value2) == null ? void 0 : _a.label) + "" + ((_b = _ctx.value2) == null ? void 0 : _b.value) : ""), 1)
                  ];
                }),
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
              }, 8, ["modelValue", "onUpdate:modelValue", "value-format"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/single-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const singleRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  singleRender as default
};
