import { defineComponent, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wrap",
  __ssrInlineRender: true,
  setup(__props) {
    const size = reactive([10, 8]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_slider = resolveComponent("h-slider");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        block: "",
        direction: "vertical"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, {
              block: "",
              size: "small",
              direction: "vertical"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_space, {
                    block: "",
                    direction: "vertical"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Horizontal `);
                        _push4(ssrRenderComponent(_component_h_slider, {
                          modelValue: size[0],
                          "onUpdate:modelValue": ($event) => size[0] = $event,
                          step: 1,
                          min: 0,
                          max: 100
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Horizontal "),
                          createVNode(_component_h_slider, {
                            modelValue: size[0],
                            "onUpdate:modelValue": ($event) => size[0] = $event,
                            step: 1,
                            min: 0,
                            max: 100
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_space, {
                    block: "",
                    direction: "vertical"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Vertical `);
                        _push4(ssrRenderComponent(_component_h_slider, {
                          modelValue: size[1],
                          "onUpdate:modelValue": ($event) => size[1] = $event,
                          step: 1,
                          min: 0,
                          max: 100
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Vertical "),
                          createVNode(_component_h_slider, {
                            modelValue: size[1],
                            "onUpdate:modelValue": ($event) => size[1] = $event,
                            step: 1,
                            min: 0,
                            max: 100
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_space, {
                      block: "",
                      direction: "vertical"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Horizontal "),
                        createVNode(_component_h_slider, {
                          modelValue: size[0],
                          "onUpdate:modelValue": ($event) => size[0] = $event,
                          step: 1,
                          min: 0,
                          max: 100
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_space, {
                      block: "",
                      direction: "vertical"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Vertical "),
                        createVNode(_component_h_slider, {
                          modelValue: size[1],
                          "onUpdate:modelValue": ($event) => size[1] = $event,
                          step: 1,
                          min: 0,
                          max: 100
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, {
              wrap: "",
              size
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(20, (i) => {
                    _push3(ssrRenderComponent(_component_h_button, { key: i }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Button`);
                        } else {
                          return [
                            createTextVNode("Button")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(20, (i) => {
                      return createVNode(_component_h_button, { key: i }, {
                        default: withCtx(() => [
                          createTextVNode("Button")
                        ]),
                        _: 1
                      });
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, {
                block: "",
                size: "small",
                direction: "vertical"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    block: "",
                    direction: "vertical"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Horizontal "),
                      createVNode(_component_h_slider, {
                        modelValue: size[0],
                        "onUpdate:modelValue": ($event) => size[0] = $event,
                        step: 1,
                        min: 0,
                        max: 100
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_space, {
                    block: "",
                    direction: "vertical"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Vertical "),
                      createVNode(_component_h_slider, {
                        modelValue: size[1],
                        "onUpdate:modelValue": ($event) => size[1] = $event,
                        step: 1,
                        min: 0,
                        max: 100
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_space, {
                wrap: "",
                size
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(20, (i) => {
                    return createVNode(_component_h_button, { key: i }, {
                      default: withCtx(() => [
                        createTextVNode("Button")
                      ]),
                      _: 1
                    });
                  }), 64))
                ]),
                _: 1
              }, 8, ["size"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Space/wrap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
