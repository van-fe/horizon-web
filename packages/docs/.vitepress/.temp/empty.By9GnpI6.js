import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "empty",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_empty = resolveComponent("h-empty");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f695412f${_scopeId2}> 自定义空样式 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="empty-city" data-v-f695412f${_scopeId3}>没有找到对应的城市信息</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
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
                    createVNode("div", { class: "demo-title" }, " 自定义空样式 "),
                    createVNode(_component_h_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "filter-option": "",
                      "to-body": false
                    }, {
                      empty: withCtx(() => [
                        createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
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
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-f695412f${_scopeId2}> 使用 n-empty 组件 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_empty, { description: "没有找到对应的城市信息" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_empty, { description: "没有找到对应的城市信息" })
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
                    createVNode("div", { class: "demo-title" }, " 使用 n-empty 组件 "),
                    createVNode(_component_h_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "filter-option": "",
                      "to-body": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_h_empty, { description: "没有找到对应的城市信息" })
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
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 自定义空样式 "),
                  createVNode(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    empty: withCtx(() => [
                      createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
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
              }),
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 使用 n-empty 组件 "),
                  createVNode(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "filter-option": "",
                    "to-body": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_h_empty, { description: "没有找到对应的城市信息" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/empty.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const empty = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f695412f"]]);
export {
  empty as default
};
