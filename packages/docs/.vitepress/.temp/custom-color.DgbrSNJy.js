import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-color",
  __ssrInlineRender: true,
  setup(__props) {
    const disabled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-width": "fit-content"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "disabled" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { value: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`True`);
                            } else {
                              return [
                                createTextVNode("True")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { value: false }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`False`);
                            } else {
                              return [
                                createTextVNode("False")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { value: true }, {
                            default: withCtx(() => [
                              createTextVNode("True")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { value: false }, {
                            default: withCtx(() => [
                              createTextVNode("False")
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
                      modelValue: disabled.value,
                      "onUpdate:modelValue": ($event) => disabled.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { value: true }, {
                          default: withCtx(() => [
                            createTextVNode("True")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { value: false }, {
                          default: withCtx(() => [
                            createTextVNode("False")
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
              createVNode(_component_h_form_item, { label: "disabled" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: disabled.value,
                    "onUpdate:modelValue": ($event) => disabled.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { value: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { value: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
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
      _push(`<div class="grid-buttons" data-v-96a717fc><div data-v-96a717fc>Default</div><div data-v-96a717fc>Plain</div><div data-v-96a717fc>Text</div><div data-v-96a717fc>Link</div><div data-v-96a717fc>Ghost</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "brand",
        disabled: disabled.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`brand`);
          } else {
            return [
              createTextVNode("brand")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "indigo",
        disabled: disabled.value,
        plain: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`indigo`);
          } else {
            return [
              createTextVNode("indigo")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "purple",
        disabled: disabled.value,
        text: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`purple`);
          } else {
            return [
              createTextVNode("purple")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "magenta",
        disabled: disabled.value,
        link: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`magenta`);
          } else {
            return [
              createTextVNode("magenta")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "orange",
        disabled: disabled.value,
        plain: true,
        ghost: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`orange`);
          } else {
            return [
              createTextVNode("orange")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "#595E72",
        disabled: disabled.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`#595E72`);
          } else {
            return [
              createTextVNode("#595E72")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "#00B3BE",
        disabled: disabled.value,
        plain: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`#00B3BE`);
          } else {
            return [
              createTextVNode("#00B3BE")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "#1880F2",
        disabled: disabled.value,
        text: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`#1880F2`);
          } else {
            return [
              createTextVNode("#1880F2")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "#FD8C08",
        disabled: disabled.value,
        link: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`#FD8C08`);
          } else {
            return [
              createTextVNode("#FD8C08")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-96a717fc>`);
      _push(ssrRenderComponent(_component_h_button, {
        color: "#26BD4B",
        disabled: disabled.value,
        plain: true,
        ghost: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`#26BD4B`);
          } else {
            return [
              createTextVNode("#26BD4B")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/custom-color.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customColor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96a717fc"]]);
export {
  customColor as default
};
