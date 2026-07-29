import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(true);
    const type = ref("normal");
    const shape = ref("circle");
    const useCollapse = ref(true);
    const draggable = ref(true);
    const adsorbBottom = ref(false);
    const badgeContent = ref(9);
    const badgeContentMax = ref(10);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_float_button_group = resolveComponent("h-float-button-group");
      const _component_h_float_button = resolveComponent("h-float-button");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle",
        "label-width": "150px",
        "helper-placement": "after-label",
        "helper-theme": "dark",
        style: { "width": "400px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否显示" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: visible.value,
                    "onUpdate:modelValue": ($event) => visible.value = $event,
                    status: true,
                    "status-on-text": "显示",
                    "status-off-text": "隐藏"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: visible.value,
                      "onUpdate:modelValue": ($event) => visible.value = $event,
                      status: true,
                      "status-on-text": "显示",
                      "status-off-text": "隐藏"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "类型" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: type.value,
                    "onUpdate:modelValue": ($event) => type.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "normal" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "primary" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "normal" }),
                          createVNode(_component_h_radio, { label: "primary" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: type.value,
                      "onUpdate:modelValue": ($event) => type.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "normal" }),
                        createVNode(_component_h_radio, { label: "primary" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "形状" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: shape.value,
                    "onUpdate:modelValue": ($event) => shape.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "circle" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "square" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "circle" }),
                          createVNode(_component_h_radio, { label: "square" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: shape.value,
                      "onUpdate:modelValue": ($event) => shape.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "circle" }),
                        createVNode(_component_h_radio, { label: "square" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否开启折叠" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: useCollapse.value,
                    "onUpdate:modelValue": ($event) => useCollapse.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: useCollapse.value,
                      "onUpdate:modelValue": ($event) => useCollapse.value = $event,
                      status: true,
                      "status-on-text": "开启",
                      "status-off-text": "关闭"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否可拖拽" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: draggable.value,
                      "onUpdate:modelValue": ($event) => draggable.value = $event,
                      status: true,
                      "status-on-text": "开启",
                      "status-off-text": "关闭"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "是否允许吸附在底部",
              helper: "如果拖拽距离离底部较近的话，则将其吸附在底部"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: adsorbBottom.value,
                    "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                    status: true,
                    "status-on-text": "允许",
                    "status-off-text": "禁止"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: adsorbBottom.value,
                      "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                      status: true,
                      "status-on-text": "允许",
                      "status-off-text": "禁止"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "徽标值" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: badgeContent.value,
                    "onUpdate:modelValue": ($event) => badgeContent.value = $event,
                    min: 0
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: badgeContent.value,
                      "onUpdate:modelValue": ($event) => badgeContent.value = $event,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "徽标值上限" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input_number, {
                    modelValue: badgeContentMax.value,
                    "onUpdate:modelValue": ($event) => badgeContentMax.value = $event,
                    min: 1
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input_number, {
                      modelValue: badgeContentMax.value,
                      "onUpdate:modelValue": ($event) => badgeContentMax.value = $event,
                      min: 1
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否显示" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: visible.value,
                    "onUpdate:modelValue": ($event) => visible.value = $event,
                    status: true,
                    "status-on-text": "显示",
                    "status-off-text": "隐藏"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "类型" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: type.value,
                    "onUpdate:modelValue": ($event) => type.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "normal" }),
                      createVNode(_component_h_radio, { label: "primary" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "形状" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: shape.value,
                    "onUpdate:modelValue": ($event) => shape.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "circle" }),
                      createVNode(_component_h_radio, { label: "square" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否开启折叠" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: useCollapse.value,
                    "onUpdate:modelValue": ($event) => useCollapse.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否可拖拽" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "是否允许吸附在底部",
                helper: "如果拖拽距离离底部较近的话，则将其吸附在底部"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: adsorbBottom.value,
                    "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                    status: true,
                    "status-on-text": "允许",
                    "status-off-text": "禁止"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "徽标值" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: badgeContent.value,
                    "onUpdate:modelValue": ($event) => badgeContent.value = $event,
                    min: 0
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "徽标值上限" }, {
                default: withCtx(() => [
                  createVNode(_component_h_input_number, {
                    modelValue: badgeContentMax.value,
                    "onUpdate:modelValue": ($event) => badgeContentMax.value = $event,
                    min: 1
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_float_button_group, {
        visible: visible.value,
        type: type.value,
        shape: shape.value,
        "use-collapse": useCollapse.value,
        draggable: draggable.value,
        "adsorb-bottom": adsorbBottom.value,
        badge: { type: "num", content: badgeContent.value, numMax: badgeContentMax.value },
        "expand-tooltip": "点击展开",
        "fold-tooltip": "点击折叠"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_float_button, {
              icon: "like",
              tooltip: "点赞"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_float_button, {
              icon: "urgent_notice",
              tooltip: "加电"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_float_button, {
              icon: "star",
              tooltip: "收藏"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_float_button, {
                icon: "like",
                tooltip: "点赞"
              }),
              createVNode(_component_h_float_button, {
                icon: "urgent_notice",
                tooltip: "加电"
              }),
              createVNode(_component_h_float_button, {
                icon: "star",
                tooltip: "收藏"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/FloatButton/group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
