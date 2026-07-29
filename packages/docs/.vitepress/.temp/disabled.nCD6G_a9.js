import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const visible = ref(false);
    const disabled2 = ref(false);
    return {
      visible,
      disabled: disabled2,
      onHide() {
        visible.value = false;
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_form, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Visible" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.visible,
                "onUpdate:modelValue": ($event) => _ctx.visible = $event,
                disabled: _ctx.disabled
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
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
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
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
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
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
                  modelValue: _ctx.visible,
                  "onUpdate:modelValue": ($event) => _ctx.visible = $event,
                  disabled: _ctx.disabled
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("True")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
                      default: withCtx(() => [
                        createTextVNode("False")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Disabled" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.disabled,
                "onUpdate:modelValue": ($event) => _ctx.disabled = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
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
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
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
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
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
                  modelValue: _ctx.disabled,
                  "onUpdate:modelValue": ($event) => _ctx.disabled = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("True")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
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
          createVNode(_component_h_form_item, { label: "Visible" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.visible,
                "onUpdate:modelValue": ($event) => _ctx.visible = $event,
                disabled: _ctx.disabled
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("True")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
                    default: withCtx(() => [
                      createTextVNode("False")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Disabled" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.disabled,
                "onUpdate:modelValue": ($event) => _ctx.disabled = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("True")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
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
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "manual",
    "popper-class": "disabled_popper",
    placement: "bottom",
    visible: _ctx.visible,
    disabled: _ctx.disabled,
    class: "mr-4",
    onHide: _ctx.onHide
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`click is no use`);
            } else {
              return [
                createTextVNode("click is no use")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("click is no use")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Content`);
            } else {
              return [
                createTextVNode("Content")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode("Content")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/disabled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  disabled as default
};
