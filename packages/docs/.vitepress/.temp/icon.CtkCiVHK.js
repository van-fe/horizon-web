import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  },
  setup() {
    const val1 = ref("");
    const val2 = ref("");
    const val3 = ref("");
    return {
      val1,
      val2,
      val3
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_tooltip = resolveComponent("h-tooltip");
  const _component_a_icon = resolveComponent("a-icon");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.val1,
                "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                "suffix-icon": "check"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.val1,
                  "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                  "suffix-icon": "check"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.val2,
                "onUpdate:modelValue": ($event) => _ctx.val2 = $event
              }, {
                prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`¥`);
                  } else {
                    return [
                      createTextVNode("¥")
                    ];
                  }
                }),
                suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`RMB`);
                  } else {
                    return [
                      createTextVNode("RMB")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.val2,
                  "onUpdate:modelValue": ($event) => _ctx.val2 = $event
                }, {
                  prefix: withCtx(() => [
                    createTextVNode("¥")
                  ]),
                  suffix: withCtx(() => [
                    createTextVNode("RMB")
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
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.val1,
                "onUpdate:modelValue": ($event) => _ctx.val1 = $event,
                "suffix-icon": "check"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.val2,
                "onUpdate:modelValue": ($event) => _ctx.val2 = $event
              }, {
                prefix: withCtx(() => [
                  createTextVNode("¥")
                ]),
                suffix: withCtx(() => [
                  createTextVNode("RMB")
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
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.val3,
                "onUpdate:modelValue": ($event) => _ctx.val3 = $event
              }, {
                suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_tooltip, {
                      placement: "top",
                      content: "show location detail"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_a_icon, { name: "location" }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_a_icon, { name: "location" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_tooltip, {
                        placement: "top",
                        content: "show location detail"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "location" })
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
                createVNode(_component_h_input, {
                  modelValue: _ctx.val3,
                  "onUpdate:modelValue": ($event) => _ctx.val3 = $event
                }, {
                  suffix: withCtx(() => [
                    createVNode(_component_h_tooltip, {
                      placement: "top",
                      content: "show location detail"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "location" })
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
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.val3,
                "onUpdate:modelValue": ($event) => _ctx.val3 = $event
              }, {
                suffix: withCtx(() => [
                  createVNode(_component_h_tooltip, {
                    placement: "top",
                    content: "show location detail"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_icon, { name: "location" })
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  icon as default
};
