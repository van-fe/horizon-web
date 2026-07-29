import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const pickable2 = ref(true);
    const dateType = ref("full");
    function onDateClick(date, type) {
      console.info(date, type);
    }
    function disableDate(date) {
      return [0, 6].includes(date.day());
    }
    return {
      pickable: pickable2,
      dateType,
      onDateClick,
      disableDate
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_calendar = resolveComponent("h-calendar");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_form, {
    "label-position": "left",
    "label-vertical-align": "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Pickable" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.pickable,
                "onUpdate:modelValue": ($event) => _ctx.pickable = $event
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
                  modelValue: _ctx.pickable,
                  "onUpdate:modelValue": ($event) => _ctx.pickable = $event
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
        _push2(ssrRenderComponent(_component_h_form_item, { label: "DateType" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.dateType,
                "onUpdate:modelValue": ($event) => _ctx.dateType = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: "full" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Full`);
                        } else {
                          return [
                            createTextVNode("Full")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: "only-current" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Only Current`);
                        } else {
                          return [
                            createTextVNode("Only Current")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: "full" }, {
                        default: withCtx(() => [
                          createTextVNode("Full")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "only-current" }, {
                        default: withCtx(() => [
                          createTextVNode("Only Current")
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
                  modelValue: _ctx.dateType,
                  "onUpdate:modelValue": ($event) => _ctx.dateType = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: "full" }, {
                      default: withCtx(() => [
                        createTextVNode("Full")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: "only-current" }, {
                      default: withCtx(() => [
                        createTextVNode("Only Current")
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
          createVNode(_component_h_form_item, { label: "Pickable" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.pickable,
                "onUpdate:modelValue": ($event) => _ctx.pickable = $event
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
          }),
          createVNode(_component_h_form_item, { label: "DateType" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.dateType,
                "onUpdate:modelValue": ($event) => _ctx.dateType = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: "full" }, {
                    default: withCtx(() => [
                      createTextVNode("Full")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: "only-current" }, {
                    default: withCtx(() => [
                      createTextVNode("Only Current")
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
  _push(ssrRenderComponent(_component_h_calendar, {
    pickable: _ctx.pickable,
    "date-type": _ctx.dateType,
    "disable-date": _ctx.disableDate,
    "mode-switchable": true,
    onDateClick: _ctx.onDateClick
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/pickable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pickable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  pickable as default
};
