import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shape",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const type = ref("normal");
    const shape = ref("circle");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_float_button = resolveComponent("h-float-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle",
        "label-width": "80px",
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        type: type.value,
        shape: shape.value,
        icon: "filter"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        type: type.value,
        shape: shape.value,
        description: "消息"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        type: type.value,
        shape: shape.value,
        icon: "message",
        description: "消息"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/FloatButton/shape.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
