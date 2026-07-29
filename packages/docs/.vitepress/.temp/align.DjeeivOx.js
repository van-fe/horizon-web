import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "align",
  __ssrInlineRender: true,
  setup(__props) {
    const align = ref("center");
    const direction = ref("horizontal");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        block: "",
        direction: "vertical"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Direction `);
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: direction.value,
                    "onUpdate:modelValue": ($event) => direction.value = $event,
                    label: "horizontal"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`horizontal`);
                      } else {
                        return [
                          createTextVNode("horizontal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: direction.value,
                    "onUpdate:modelValue": ($event) => direction.value = $event,
                    label: "vertical"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`vertical`);
                      } else {
                        return [
                          createTextVNode("vertical")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Direction "),
                    createVNode(_component_h_radio, {
                      modelValue: direction.value,
                      "onUpdate:modelValue": ($event) => direction.value = $event,
                      label: "horizontal"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("horizontal")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: direction.value,
                      "onUpdate:modelValue": ($event) => direction.value = $event,
                      label: "vertical"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("vertical")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Align `);
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`start`);
                      } else {
                        return [
                          createTextVNode("start")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`center`);
                      } else {
                        return [
                          createTextVNode("center")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "end"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`end`);
                      } else {
                        return [
                          createTextVNode("end")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "baseline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`baseline`);
                      } else {
                        return [
                          createTextVNode("baseline")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Align "),
                    createVNode(_component_h_radio, {
                      modelValue: align.value,
                      "onUpdate:modelValue": ($event) => align.value = $event,
                      label: "start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("start")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: align.value,
                      "onUpdate:modelValue": ($event) => align.value = $event,
                      label: "center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("center")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: align.value,
                      "onUpdate:modelValue": ($event) => align.value = $event,
                      label: "end"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("end")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: align.value,
                      "onUpdate:modelValue": ($event) => align.value = $event,
                      label: "baseline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("baseline")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, {
              direction: direction.value,
              align: align.value,
              style: { "border": "1px solid var(--h-bg-brand-default)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Space `);
                  _push3(ssrRenderComponent(_component_h_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Button`);
                      } else {
                        return [
                          createTextVNode("Button")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "height": "100px", "background": "#f1f2f3", "padding": "10px" })}"${_scopeId2}>block</div>`);
                } else {
                  return [
                    createTextVNode(" Space "),
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("Button")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { style: { "height": "100px", "background": "#f1f2f3", "padding": "10px" } }, "block")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createTextVNode(" Direction "),
                  createVNode(_component_h_radio, {
                    modelValue: direction.value,
                    "onUpdate:modelValue": ($event) => direction.value = $event,
                    label: "horizontal"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("horizontal")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: direction.value,
                    "onUpdate:modelValue": ($event) => direction.value = $event,
                    label: "vertical"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("vertical")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createTextVNode(" Align "),
                  createVNode(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "start"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("start")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("center")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "end"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("end")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event,
                    label: "baseline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("baseline")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, {
                direction: direction.value,
                align: align.value,
                style: { "border": "1px solid var(--h-bg-brand-default)" }
              }, {
                default: withCtx(() => [
                  createTextVNode(" Space "),
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("Button")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { style: { "height": "100px", "background": "#f1f2f3", "padding": "10px" } }, "block")
                ]),
                _: 1
              }, 8, ["direction", "align"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Space/align.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
