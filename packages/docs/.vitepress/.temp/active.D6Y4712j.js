import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "active",
  __ssrInlineRender: true,
  setup(__props) {
    function onClick() {
      console.info("click");
    }
    const active1 = ref(false);
    const active2 = ref(false);
    const active3 = ref(false);
    const active4 = ref(false);
    const active5 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default`);
                      } else {
                        return [
                          createTextVNode("Default")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    type: "success"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Success`);
                      } else {
                        return [
                          createTextVNode("Success")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Info`);
                      } else {
                        return [
                          createTextVNode("Info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    type: "warning"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warning`);
                      } else {
                        return [
                          createTextVNode("Warning")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    type: "error"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Error`);
                      } else {
                        return [
                          createTextVNode("Error")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      modelValue: active1.value,
                      "onUpdate:modelValue": ($event) => active1.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active2.value,
                      "onUpdate:modelValue": ($event) => active2.value = $event,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active3.value,
                      "onUpdate:modelValue": ($event) => active3.value = $event,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active4.value,
                      "onUpdate:modelValue": ($event) => active4.value = $event,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active5.value,
                      "onUpdate:modelValue": ($event) => active5.value = $event,
                      type: "error"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Error")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    round: true,
                    onClick
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default`);
                      } else {
                        return [
                          createTextVNode("Default")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    round: true,
                    type: "success"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Success`);
                      } else {
                        return [
                          createTextVNode("Success")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    round: true,
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Info`);
                      } else {
                        return [
                          createTextVNode("Info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    round: true,
                    type: "warning"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warning`);
                      } else {
                        return [
                          createTextVNode("Warning")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    round: true,
                    type: "error"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Error`);
                      } else {
                        return [
                          createTextVNode("Error")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      modelValue: active1.value,
                      "onUpdate:modelValue": ($event) => active1.value = $event,
                      round: true,
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active2.value,
                      "onUpdate:modelValue": ($event) => active2.value = $event,
                      round: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active3.value,
                      "onUpdate:modelValue": ($event) => active3.value = $event,
                      round: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active4.value,
                      "onUpdate:modelValue": ($event) => active4.value = $event,
                      round: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active5.value,
                      "onUpdate:modelValue": ($event) => active5.value = $event,
                      round: true,
                      type: "error"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Error")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    plain: true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default`);
                      } else {
                        return [
                          createTextVNode("Default")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    plain: true,
                    type: "success"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Success`);
                      } else {
                        return [
                          createTextVNode("Success")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    plain: true,
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Info`);
                      } else {
                        return [
                          createTextVNode("Info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    plain: true,
                    type: "warning"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warning`);
                      } else {
                        return [
                          createTextVNode("Warning")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    plain: true,
                    type: "error"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Error`);
                      } else {
                        return [
                          createTextVNode("Error")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      modelValue: active1.value,
                      "onUpdate:modelValue": ($event) => active1.value = $event,
                      plain: true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active2.value,
                      "onUpdate:modelValue": ($event) => active2.value = $event,
                      plain: true,
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Success")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active3.value,
                      "onUpdate:modelValue": ($event) => active3.value = $event,
                      plain: true,
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Info")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active4.value,
                      "onUpdate:modelValue": ($event) => active4.value = $event,
                      plain: true,
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Warning")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active5.value,
                      "onUpdate:modelValue": ($event) => active5.value = $event,
                      plain: true,
                      type: "error"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Error")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    plain: true,
                    equally: "",
                    onClick
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`普`);
                      } else {
                        return [
                          createTextVNode("普")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    plain: true,
                    equally: "",
                    type: "success"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`成`);
                      } else {
                        return [
                          createTextVNode("成")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    plain: true,
                    equally: "",
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`进`);
                      } else {
                        return [
                          createTextVNode("进")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    plain: true,
                    equally: "",
                    type: "warning"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`警`);
                      } else {
                        return [
                          createTextVNode("警")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    plain: true,
                    equally: "",
                    type: "error"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`错`);
                      } else {
                        return [
                          createTextVNode("错")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      modelValue: active1.value,
                      "onUpdate:modelValue": ($event) => active1.value = $event,
                      plain: true,
                      equally: "",
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("普")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active2.value,
                      "onUpdate:modelValue": ($event) => active2.value = $event,
                      plain: true,
                      equally: "",
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("成")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active3.value,
                      "onUpdate:modelValue": ($event) => active3.value = $event,
                      plain: true,
                      equally: "",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("进")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active4.value,
                      "onUpdate:modelValue": ($event) => active4.value = $event,
                      plain: true,
                      equally: "",
                      type: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("警")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_tag, {
                      modelValue: active5.value,
                      "onUpdate:modelValue": ($event) => active5.value = $event,
                      plain: true,
                      equally: "",
                      type: "error"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("错")
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    type: "error"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Error")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    round: true,
                    onClick
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    round: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    round: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    round: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    round: true,
                    type: "error"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Error")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    plain: true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Default")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    plain: true,
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Success")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    plain: true,
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Info")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    plain: true,
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Warning")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    plain: true,
                    type: "error"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Error")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_tag, {
                    modelValue: active1.value,
                    "onUpdate:modelValue": ($event) => active1.value = $event,
                    plain: true,
                    equally: "",
                    onClick
                  }, {
                    default: withCtx(() => [
                      createTextVNode("普")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active2.value,
                    "onUpdate:modelValue": ($event) => active2.value = $event,
                    plain: true,
                    equally: "",
                    type: "success"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("成")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active3.value,
                    "onUpdate:modelValue": ($event) => active3.value = $event,
                    plain: true,
                    equally: "",
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("进")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active4.value,
                    "onUpdate:modelValue": ($event) => active4.value = $event,
                    plain: true,
                    equally: "",
                    type: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("警")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_tag, {
                    modelValue: active5.value,
                    "onUpdate:modelValue": ($event) => active5.value = $event,
                    plain: true,
                    equally: "",
                    type: "error"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("错")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/active.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
