import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, withDirectives, createVNode, vShow, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "slide",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_transition = resolveComponent("h-transition");
      _push(`<!--[-->`);
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
                  _push3(`<div class="animate-box__wrapper" data-v-5e05a10c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_transition, { name: "slide-up" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="animate-box" style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-5e05a10c${_scopeId3}>slide-up</div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-up", 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "animate-box__wrapper" }, [
                      createVNode(_component_h_transition, { name: "slide-up" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-up", 512), [
                            [vShow, visible.value]
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="animate-box__wrapper" data-v-5e05a10c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_transition, { name: "slide-down" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="animate-box" style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-5e05a10c${_scopeId3}>slide-down</div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-down", 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "animate-box__wrapper" }, [
                      createVNode(_component_h_transition, { name: "slide-down" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-down", 512), [
                            [vShow, visible.value]
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="animate-box__wrapper" data-v-5e05a10c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_transition, { name: "slide-left" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="animate-box" style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-5e05a10c${_scopeId3}>slide-left</div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-left", 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "animate-box__wrapper" }, [
                      createVNode(_component_h_transition, { name: "slide-left" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-left", 512), [
                            [vShow, visible.value]
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="animate-box__wrapper" data-v-5e05a10c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_transition, { name: "slide-right" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="animate-box" style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-5e05a10c${_scopeId3}>slide-right</div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-right", 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "animate-box__wrapper" }, [
                      createVNode(_component_h_transition, { name: "slide-right" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode("div", { class: "animate-box" }, "slide-right", 512), [
                            [vShow, visible.value]
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "animate-box__wrapper" }, [
                    createVNode(_component_h_transition, { name: "slide-up" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { class: "animate-box" }, "slide-up", 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "animate-box__wrapper" }, [
                    createVNode(_component_h_transition, { name: "slide-down" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { class: "animate-box" }, "slide-down", 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "animate-box__wrapper" }, [
                    createVNode(_component_h_transition, { name: "slide-left" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { class: "animate-box" }, "slide-left", 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "animate-box__wrapper" }, [
                    createVNode(_component_h_transition, { name: "slide-right" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { class: "animate-box" }, "slide-right", 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transition/slide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e05a10c"]]);
export {
  slide as default
};
