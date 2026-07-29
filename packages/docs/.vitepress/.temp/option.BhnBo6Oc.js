import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const value4 = ref();
    const value5 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const confirmRef = ref(null);
    const changeHandle = () => {
      console.info(value3.value);
    };
    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      values1,
      values2,
      confirmRef,
      changeHandle,
      confirmHandle() {
        console.info("confirm");
        confirmRef.value.confirmHandle();
      },
      cancleHandle() {
        console.info("cancle");
        confirmRef.value.cancelHandle();
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
              _push3(`<div class="demo-title" data-v-a466cf6a${_scopeId2}>自定义 option</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "to-body": false
              }, {
                optionRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass([slotProps.active ? "active" : "", "select-custom-item"])}" data-v-a466cf6a${_scopeId3}>${ssrInterpolate(slotProps.label)}</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["select-custom-item", slotProps.active ? "active" : ""]
                      }, toDisplayString(slotProps.label), 3)
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "中国",
                      value: 1
                    }, {
                      default: withCtx((slotProps, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="${ssrRenderClass([slotProps.active ? "active" : "", "select-custom-item china"])}" data-v-a466cf6a${_scopeId4}>${ssrInterpolate(slotProps.label)}</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: ["select-custom-item china", slotProps.active ? "active" : ""]
                            }, toDisplayString(slotProps.label), 3)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "日本"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1
                      }, {
                        default: withCtx((slotProps) => [
                          createVNode("div", {
                            class: ["select-custom-item china", slotProps.active ? "active" : ""]
                          }, toDisplayString(slotProps.label), 3)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "自定义 option"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value1,
                  "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                  "to-body": false
                }, {
                  optionRender: withCtx((slotProps) => [
                    createVNode("div", {
                      class: ["select-custom-item", slotProps.active ? "active" : ""]
                    }, toDisplayString(slotProps.label), 3)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }, {
                      default: withCtx((slotProps) => [
                        createVNode("div", {
                          class: ["select-custom-item china", slotProps.active ? "active" : ""]
                        }, toDisplayString(slotProps.label), 3)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
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
              _push3(`<div class="demo-title" data-v-a466cf6a${_scopeId2}>自定义 Option 面板样式</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "external-panel-style": { width: "100px", border: "1px solid #f00" },
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "中国",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "日本"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "中国",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "美国"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "日本"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "自定义 Option 面板样式"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value2,
                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                  "external-panel-style": { width: "100px", border: "1px solid #f00" },
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
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
              createVNode("div", { class: "demo-title" }, "自定义 option"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "to-body": false
              }, {
                optionRender: withCtx((slotProps) => [
                  createVNode("div", {
                    class: ["select-custom-item", slotProps.active ? "active" : ""]
                  }, toDisplayString(slotProps.label), 3)
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "中国",
                    value: 1
                  }, {
                    default: withCtx((slotProps) => [
                      createVNode("div", {
                        class: ["select-custom-item china", slotProps.active ? "active" : ""]
                      }, toDisplayString(slotProps.label), 3)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "美国"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "日本"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "自定义 Option 面板样式"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "external-panel-style": { width: "100px", border: "1px solid #f00" },
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "中国",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "美国"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "日本"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/option.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const option = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a466cf6a"]]);
export {
  option as default
};
