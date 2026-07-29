import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      currentRef: ref("panel1")
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_space = resolveComponent("h-space");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_panels = resolveComponent("h-panels");
  const _component_h_panel = resolveComponent("h-panel");
  _push(ssrRenderComponent(_component_h_space, mergeProps({
    block: "",
    direction: "vertical"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_radio_group, {
          modelValue: _ctx.currentRef,
          "onUpdate:modelValue": ($event) => _ctx.currentRef = $event
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio, { label: "panel1" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Option1`);
                  } else {
                    return [
                      createTextVNode("Option1")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_radio, { label: "panel2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Option2`);
                  } else {
                    return [
                      createTextVNode("Option2")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_radio, { label: "panel3" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Option3`);
                  } else {
                    return [
                      createTextVNode("Option3")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio, { label: "panel1" }, {
                  default: withCtx(() => [
                    createTextVNode("Option1")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_radio, { label: "panel2" }, {
                  default: withCtx(() => [
                    createTextVNode("Option2")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_radio, { label: "panel3" }, {
                  default: withCtx(() => [
                    createTextVNode("Option3")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_panels, {
          modelValue: _ctx.currentRef,
          "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
          animated: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_panel, { name: "panel1" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Panel1 Content`);
                  } else {
                    return [
                      createTextVNode("Panel1 Content")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_panel, { name: "panel2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Panel2 Content`);
                  } else {
                    return [
                      createTextVNode("Panel2 Content")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_panel, { name: "panel3" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Panel3 Content`);
                  } else {
                    return [
                      createTextVNode("Panel3 Content")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_panel, { name: "panel1" }, {
                  default: withCtx(() => [
                    createTextVNode("Panel1 Content")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_panel, { name: "panel2" }, {
                  default: withCtx(() => [
                    createTextVNode("Panel2 Content")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_panel, { name: "panel3" }, {
                  default: withCtx(() => [
                    createTextVNode("Panel3 Content")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_radio_group, {
            modelValue: _ctx.currentRef,
            "onUpdate:modelValue": ($event) => _ctx.currentRef = $event
          }, {
            default: withCtx(() => [
              createVNode(_component_h_radio, { label: "panel1" }, {
                default: withCtx(() => [
                  createTextVNode("Option1")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "panel2" }, {
                default: withCtx(() => [
                  createTextVNode("Option2")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "panel3" }, {
                default: withCtx(() => [
                  createTextVNode("Option3")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(_component_h_panels, {
            modelValue: _ctx.currentRef,
            "onUpdate:modelValue": ($event) => _ctx.currentRef = $event,
            animated: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_h_panel, { name: "panel1" }, {
                default: withCtx(() => [
                  createTextVNode("Panel1 Content")
                ]),
                _: 1
              }),
              createVNode(_component_h_panel, { name: "panel2" }, {
                default: withCtx(() => [
                  createTextVNode("Panel2 Content")
                ]),
                _: 1
              }),
              createVNode(_component_h_panel, { name: "panel3" }, {
                default: withCtx(() => [
                  createTextVNode("Panel3 Content")
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Panels/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  basic as default
};
