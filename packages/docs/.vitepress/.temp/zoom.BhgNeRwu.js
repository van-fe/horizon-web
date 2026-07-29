import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, withDirectives, createVNode, vShow, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      visible: ref(true)
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_transition = resolveComponent("h-transition");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-ef126839>`);
  _push(ssrRenderComponent(_component_h_button, {
    type: "normal",
    class: "mb-2",
    onClick: ($event) => _ctx.visible = !_ctx.visible
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Change`);
      } else {
        return [
          createTextVNode("Change")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    style: { "height": "80px" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_transition, { name: "zoom-in-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="animate-box" style="${ssrRenderStyle(_ctx.visible ? null : { display: "none" })}" data-v-ef126839${_scopeId3}>zoom-in-center</div>`);
                  } else {
                    return [
                      withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-center", 512), [
                        [vShow, _ctx.visible]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_transition, { name: "zoom-in-center" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-center", 512), [
                      [vShow, _ctx.visible]
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_transition, { name: "zoom-in-top" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="animate-box" style="${ssrRenderStyle(_ctx.visible ? null : { display: "none" })}" data-v-ef126839${_scopeId3}>zoom-in-top</div>`);
                  } else {
                    return [
                      withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-top", 512), [
                        [vShow, _ctx.visible]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_transition, { name: "zoom-in-top" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-top", 512), [
                      [vShow, _ctx.visible]
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_transition, { name: "zoom-in-bottom" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="animate-box" style="${ssrRenderStyle(_ctx.visible ? null : { display: "none" })}" data-v-ef126839${_scopeId3}>zoom-in-bottom</div>`);
                  } else {
                    return [
                      withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-bottom", 512), [
                        [vShow, _ctx.visible]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_transition, { name: "zoom-in-bottom" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-bottom", 512), [
                      [vShow, _ctx.visible]
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_transition, { name: "zoom-in-left" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="animate-box" style="${ssrRenderStyle(_ctx.visible ? null : { display: "none" })}" data-v-ef126839${_scopeId3}>zoom-in-left</div>`);
                  } else {
                    return [
                      withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-left", 512), [
                        [vShow, _ctx.visible]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_transition, { name: "zoom-in-left" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-left", 512), [
                      [vShow, _ctx.visible]
                    ])
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
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode(_component_h_transition, { name: "zoom-in-center" }, {
                default: withCtx(() => [
                  withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-center", 512), [
                    [vShow, _ctx.visible]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode(_component_h_transition, { name: "zoom-in-top" }, {
                default: withCtx(() => [
                  withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-top", 512), [
                    [vShow, _ctx.visible]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode(_component_h_transition, { name: "zoom-in-bottom" }, {
                default: withCtx(() => [
                  withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-bottom", 512), [
                    [vShow, _ctx.visible]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode(_component_h_transition, { name: "zoom-in-left" }, {
                default: withCtx(() => [
                  withDirectives(createVNode("div", { class: "animate-box" }, "zoom-in-left", 512), [
                    [vShow, _ctx.visible]
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transition/zoom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const zoom = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ef126839"]]);
export {
  zoom as default
};
