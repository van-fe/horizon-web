import { defineComponent, ref, computed, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const type = ref("square");
    const value1 = ref("#178CA6");
    const value4 = ref();
    const squareText = computed(() => type.value === "square-text");
    function onChange(color) {
      console.info("change:", color);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_color_picker = resolveComponent("h-color-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "触发器类型" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: type.value,
                    "onUpdate:modelValue": ($event) => type.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "square" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`正方形`);
                            } else {
                              return [
                                createTextVNode("正方形")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "square-text" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`带色号`);
                            } else {
                              return [
                                createTextVNode("带色号")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "square" }, {
                            default: withCtx(() => [
                              createTextVNode("正方形")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "square-text" }, {
                            default: withCtx(() => [
                              createTextVNode("带色号")
                            ]),
                            _: 1
                          })
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
                        createVNode(_component_h_radio, { label: "square" }, {
                          default: withCtx(() => [
                            createTextVNode("正方形")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "square-text" }, {
                          default: withCtx(() => [
                            createTextVNode("带色号")
                          ]),
                          _: 1
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
              createVNode(_component_h_form_item, { label: "触发器类型" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: type.value,
                    "onUpdate:modelValue": ($event) => type.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "square" }, {
                        default: withCtx(() => [
                          createTextVNode("正方形")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "square-text" }, {
                        default: withCtx(() => [
                          createTextVNode("带色号")
                        ]),
                        _: 1
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
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": squareText.value,
        "need-confirm": false,
        clearable: false,
        onChange
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value1.value,
        "onUpdate:modelValue": ($event) => value1.value = $event,
        "trigger-type": "square",
        "square-text": squareText.value,
        "need-confirm": false,
        clearable: false,
        disabled: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_color_picker, {
        modelValue: value4.value,
        "onUpdate:modelValue": ($event) => value4.value = $event,
        "trigger-type": "square",
        "square-text": squareText.value,
        "need-confirm": false,
        onChange
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/ColorPicker/trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const trigger = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd06d800"]]);
export {
  trigger as default
};
