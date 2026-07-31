import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tab-text",
  __ssrInlineRender: true,
  setup(__props) {
    const size = ref("small");
    const tabs = Array(5).fill(0).map((_, index) => `TAG ${index + 1}`);
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        class: "box",
        block: "",
        direction: "vertical"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mr-4" data-v-896173a8${_scopeId2}>尺寸</span>`);
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "mini" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mini(tag 不支持 mini)`);
                            } else {
                              return [
                                createTextVNode("mini(tag 不支持 mini)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "small" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`small`);
                            } else {
                              return [
                                createTextVNode("small")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`medium(Default)`);
                            } else {
                              return [
                                createTextVNode("medium(Default)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "large" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`large`);
                            } else {
                              return [
                                createTextVNode("large")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "mini" }, {
                            default: withCtx(() => [
                              createTextVNode("mini(tag 不支持 mini)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("small")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "medium" }, {
                            default: withCtx(() => [
                              createTextVNode("medium(Default)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "large" }, {
                            default: withCtx(() => [
                              createTextVNode("large")
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
                    createVNode("span", { class: "mr-4" }, "尺寸"),
                    createVNode(_component_h_radio_group, {
                      modelValue: size.value,
                      "onUpdate:modelValue": ($event) => size.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "mini" }, {
                          default: withCtx(() => [
                            createTextVNode("mini(tag 不支持 mini)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "small" }, {
                          default: withCtx(() => [
                            createTextVNode("small")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "medium" }, {
                          default: withCtx(() => [
                            createTextVNode("medium(Default)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "large" }, {
                          default: withCtx(() => [
                            createTextVNode("large")
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
            _push2(ssrRenderComponent(_component_h_tabs, {
              size: size.value,
              underline: false,
              indicator: false,
              onChange: onTabChanged
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(tabs), (tab) => {
                    _push3(ssrRenderComponent(_component_h_tab, { key: tab }, {
                      default: withCtx(({ state }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_h_tag, {
                            size: size.value === "mini" ? "small" : size.value,
                            "model-value": state,
                            clickable: false
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(tab)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(tab), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_h_tag, {
                              size: size.value === "mini" ? "small" : size.value,
                              "model-value": state,
                              clickable: false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tab), 1)
                              ]),
                              _: 2
                            }, 1032, ["size", "model-value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(tabs), (tab) => {
                      return openBlock(), createBlock(_component_h_tab, { key: tab }, {
                        default: withCtx(({ state }) => [
                          createVNode(_component_h_tag, {
                            size: size.value === "mini" ? "small" : size.value,
                            "model-value": state,
                            clickable: false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tab), 1)
                            ]),
                            _: 2
                          }, 1032, ["size", "model-value"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode("span", { class: "mr-4" }, "尺寸"),
                  createVNode(_component_h_radio_group, {
                    modelValue: size.value,
                    "onUpdate:modelValue": ($event) => size.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "mini" }, {
                        default: withCtx(() => [
                          createTextVNode("mini(tag 不支持 mini)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("small")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "medium" }, {
                        default: withCtx(() => [
                          createTextVNode("medium(Default)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "large" }, {
                        default: withCtx(() => [
                          createTextVNode("large")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_tabs, {
                size: size.value,
                underline: false,
                indicator: false,
                onChange: onTabChanged
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(tabs), (tab) => {
                    return openBlock(), createBlock(_component_h_tab, { key: tab }, {
                      default: withCtx(({ state }) => [
                        createVNode(_component_h_tag, {
                          size: size.value === "mini" ? "small" : size.value,
                          "model-value": state,
                          clickable: false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tab), 1)
                          ]),
                          _: 2
                        }, 1032, ["size", "model-value"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/tab-text.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tabText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-896173a8"]]);
export {
  tabText as default
};
