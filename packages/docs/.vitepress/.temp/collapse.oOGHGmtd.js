import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, withDirectives, createVNode, vShow, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "collapse",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_transition = resolveComponent("h-transition");
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "height": "200px" } }, _attrs))} data-v-3f3884fa>`);
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        class: "mb-2",
        onClick: ($event) => visible.value = !visible.value
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
      _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_transition, { name: "collapse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-3f3884fa${_scopeId3}><div class="animate-box" data-v-3f3884fa${_scopeId3}>collapse</div><div class="animate-box" style="${ssrRenderStyle({ "margin-top": "10px" })}" data-v-3f3884fa${_scopeId3}>collapse</div></div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", null, [
                            createVNode("div", { class: "animate-box" }, "collapse"),
                            createVNode("div", {
                              class: "animate-box",
                              style: { "margin-top": "10px" }
                            }, "collapse")
                          ], 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_transition, { name: "collapse" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", null, [
                          createVNode("div", { class: "animate-box" }, "collapse"),
                          createVNode("div", {
                            class: "animate-box",
                            style: { "margin-top": "10px" }
                          }, "collapse")
                        ], 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_transition, { name: "collapse-horizontal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle([
                          { "white-space": "nowrap" },
                          visible.value ? null : { display: "none" }
                        ])}" data-v-3f3884fa${_scopeId3}><div class="animate-box-horizontal" data-v-3f3884fa${_scopeId3}>collapse-horizontal</div><div class="animate-box-horizontal" style="${ssrRenderStyle({ "margin-left": "10px" })}" data-v-3f3884fa${_scopeId3}>collapse-horizontal</div></div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { style: { "white-space": "nowrap" } }, [
                            createVNode("div", { class: "animate-box-horizontal" }, "collapse-horizontal"),
                            createVNode("div", {
                              class: "animate-box-horizontal",
                              style: { "margin-left": "10px" }
                            }, "collapse-horizontal")
                          ], 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_transition, { name: "collapse-horizontal" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { style: { "white-space": "nowrap" } }, [
                          createVNode("div", { class: "animate-box-horizontal" }, "collapse-horizontal"),
                          createVNode("div", {
                            class: "animate-box-horizontal",
                            style: { "margin-left": "10px" }
                          }, "collapse-horizontal")
                        ], 512), [
                          [vShow, visible.value]
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
                  createVNode(_component_h_transition, { name: "collapse" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode("div", null, [
                        createVNode("div", { class: "animate-box" }, "collapse"),
                        createVNode("div", {
                          class: "animate-box",
                          style: { "margin-top": "10px" }
                        }, "collapse")
                      ], 512), [
                        [vShow, visible.value]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_h_transition, { name: "collapse-horizontal" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode("div", { style: { "white-space": "nowrap" } }, [
                        createVNode("div", { class: "animate-box-horizontal" }, "collapse-horizontal"),
                        createVNode("div", {
                          class: "animate-box-horizontal",
                          style: { "margin-left": "10px" }
                        }, "collapse-horizontal")
                      ], 512), [
                        [vShow, visible.value]
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transition/collapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f3884fa"]]);
export {
  collapse as default
};
