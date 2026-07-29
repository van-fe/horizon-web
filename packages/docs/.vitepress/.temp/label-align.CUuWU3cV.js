import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "label-align",
  __ssrInlineRender: true,
  setup(__props) {
    const labelAlign = ref("left");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_steps = resolveComponent("h-steps");
      const _component_h_step = resolveComponent("h-step");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "标签布局",
              style: { "width": "fit-content" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: labelAlign.value,
                    "onUpdate:modelValue": ($event) => labelAlign.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "center",
                          label: "center"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_option, {
                          value: "left",
                          label: "left"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_option, {
                            value: "center",
                            label: "center"
                          }),
                          createVNode(_component_h_option, {
                            value: "left",
                            label: "left"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_select, {
                      modelValue: labelAlign.value,
                      "onUpdate:modelValue": ($event) => labelAlign.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_option, {
                          value: "center",
                          label: "center"
                        }),
                        createVNode(_component_h_option, {
                          value: "left",
                          label: "left"
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
              createVNode(_component_h_form_item, {
                label: "标签布局",
                style: { "width": "fit-content" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: labelAlign.value,
                    "onUpdate:modelValue": ($event) => labelAlign.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_option, {
                        value: "center",
                        label: "center"
                      }),
                      createVNode(_component_h_option, {
                        value: "left",
                        label: "left"
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
      _push(ssrRenderComponent(_component_h_steps, {
        current: 1,
        "label-align": labelAlign.value,
        "label-placement": "vertical",
        class: "my-8"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Succeeded",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Processing",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Future step",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_step, {
                title: "Succeeded",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Processing",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Future step",
                description: "Here is a paragraph"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_steps, {
        "progress-dot": true,
        "label-align": labelAlign.value,
        current: 3
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Succeeded",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Succeeded",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Processing",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Future step",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Future step",
              description: "Here is a paragraph"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_step, {
                title: "Succeeded",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Succeeded",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Processing",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Future step",
                description: "Here is a paragraph"
              }),
              createVNode(_component_h_step, {
                title: "Future step",
                description: "Here is a paragraph"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/label-align.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
