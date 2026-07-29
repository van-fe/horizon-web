import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { M as __default__ } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon-style",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({
        gutter: 10
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>自定义 select icon</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "dropdown-icon": unref(__default__),
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
                        return [createVNode(_component_h_option, {
                          label: "中国",
                          value: 1
                        }), createVNode(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }), createVNode(_component_h_option, {
                          value: 3,
                          label: "日本"
                        })];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode("div", {
                    class: "demo-title"
                  }, "自定义 select icon"), createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "dropdown-icon": unref(__default__),
                    "to-body": false
                  }, {
                    default: withCtx(() => [createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }), createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }), createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
                    })]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "dropdown-icon"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, {
              span: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>select icon 为空</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "custom-select-icon": false,
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
                        return [createVNode(_component_h_option, {
                          label: "中国",
                          value: 1
                        }), createVNode(_component_h_option, {
                          value: 2,
                          label: "美国"
                        }), createVNode(_component_h_option, {
                          value: 3,
                          label: "日本"
                        })];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode("div", {
                    class: "demo-title"
                  }, "select icon 为空"), createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "custom-select-icon": false,
                    "to-body": false
                  }, {
                    default: withCtx(() => [createVNode(_component_h_option, {
                      label: "中国",
                      value: 1
                    }), createVNode(_component_h_option, {
                      value: 2,
                      label: "美国"
                    }), createVNode(_component_h_option, {
                      value: 3,
                      label: "日本"
                    })]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_h_col, {
              span: 6
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "demo-title"
              }, "自定义 select icon"), createVNode(_component_h_select, {
                modelValue: value1.value,
                "onUpdate:modelValue": ($event) => value1.value = $event,
                "dropdown-icon": unref(__default__),
                "to-body": false
              }, {
                default: withCtx(() => [createVNode(_component_h_option, {
                  label: "中国",
                  value: 1
                }), createVNode(_component_h_option, {
                  value: 2,
                  label: "美国"
                }), createVNode(_component_h_option, {
                  value: 3,
                  label: "日本"
                })]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "dropdown-icon"])]),
              _: 1
            }), createVNode(_component_h_col, {
              span: 6
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "demo-title"
              }, "select icon 为空"), createVNode(_component_h_select, {
                modelValue: value2.value,
                "onUpdate:modelValue": ($event) => value2.value = $event,
                "custom-select-icon": false,
                "to-body": false
              }, {
                default: withCtx(() => [createVNode(_component_h_option, {
                  label: "中国",
                  value: 1
                }), createVNode(_component_h_option, {
                  value: 2,
                  label: "美国"
                }), createVNode(_component_h_option, {
                  value: 3,
                  label: "日本"
                })]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])]),
              _: 1
            })];
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/icon-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
