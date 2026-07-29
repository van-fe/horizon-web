import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scroll",
  __ssrInlineRender: true,
  setup(__props) {
    const options = Array(100).fill(0).map((_, i) => `Option ${i + 1}`);
    const scrollable = ref(true);
    const focusable = ref(true);
    const arrow = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        direction: "vertical",
        block: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: scrollable.value,
                    "onUpdate:modelValue": ($event) => scrollable.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`开启自由滑动`);
                      } else {
                        return [
                          createTextVNode("开启自由滑动")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: arrow.value,
                    "onUpdate:modelValue": ($event) => arrow.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`开启箭头`);
                      } else {
                        return [
                          createTextVNode("开启箭头")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_checkbox, {
                    modelValue: focusable.value,
                    "onUpdate:modelValue": ($event) => focusable.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`选中自动聚焦`);
                      } else {
                        return [
                          createTextVNode("选中自动聚焦")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_checkbox, {
                      modelValue: scrollable.value,
                      "onUpdate:modelValue": ($event) => scrollable.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("开启自由滑动")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_checkbox, {
                      modelValue: arrow.value,
                      "onUpdate:modelValue": ($event) => arrow.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("开启箭头")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_checkbox, {
                      modelValue: focusable.value,
                      "onUpdate:modelValue": ($event) => focusable.value = $event
                    }, {
                      default: withCtx(() => [
                        createTextVNode("选中自动聚焦")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="box" data-v-cb8a2c7f${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_segmented, {
                    "default-active-key": "Option 1",
                    scrollable: scrollable.value,
                    arrow: arrow.value,
                    focusable: focusable.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(options), (v) => {
                          _push4(ssrRenderComponent(_component_h_segmented_item, {
                            key: v,
                            label: v
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(options), (v) => {
                            return openBlock(), createBlock(_component_h_segmented_item, {
                              key: v,
                              label: v
                            }, null, 8, ["label"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "box" }, [
                      createVNode(_component_h_segmented, {
                        "default-active-key": "Option 1",
                        scrollable: scrollable.value,
                        arrow: arrow.value,
                        focusable: focusable.value
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(options), (v) => {
                            return openBlock(), createBlock(_component_h_segmented_item, {
                              key: v,
                              label: v
                            }, null, 8, ["label"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["scrollable", "arrow", "focusable"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_checkbox, {
                    modelValue: scrollable.value,
                    "onUpdate:modelValue": ($event) => scrollable.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("开启自由滑动")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_checkbox, {
                    modelValue: arrow.value,
                    "onUpdate:modelValue": ($event) => arrow.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("开启箭头")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_checkbox, {
                    modelValue: focusable.value,
                    "onUpdate:modelValue": ($event) => focusable.value = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("选中自动聚焦")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "box" }, [
                    createVNode(_component_h_segmented, {
                      "default-active-key": "Option 1",
                      scrollable: scrollable.value,
                      arrow: arrow.value,
                      focusable: focusable.value
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(options), (v) => {
                          return openBlock(), createBlock(_component_h_segmented_item, {
                            key: v,
                            label: v
                          }, null, 8, ["label"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["scrollable", "arrow", "focusable"])
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/scroll.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb8a2c7f"]]);
export {
  scroll as default
};
