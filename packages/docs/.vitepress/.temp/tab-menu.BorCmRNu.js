import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tab-menu",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref();
    const tabs = ref(["Operators"]);
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    const onCommand = (key, cmd) => {
      if (cmd === "add") {
        tabs.value = [...tabs.value, `Random${Math.random().toString(36).slice(2)}`];
      } else {
        tabs.value = tabs.value.filter((tab) => tab !== key);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_tabs, mergeProps({
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        v2: "",
        onChange: onTabChanged
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (tab) => {
              _push2(ssrRenderComponent(_component_h_tab, { key: tab }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_h_dropdown, {
                      trigger: "context-menu",
                      onCommand: ($event) => onCommand(tab, $event)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div${_scopeId3}>${ssrInterpolate(tab)}</div>`);
                          _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_h_dropdown_item, { command: "add" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`添加`);
                                    } else {
                                      return [
                                        createTextVNode("添加")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_h_dropdown_item, {
                                  command: "rm",
                                  disabled: tabs.value.length <= 1
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`删除`);
                                    } else {
                                      return [
                                        createTextVNode("删除")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_h_dropdown_item, { command: "add" }, {
                                    default: withCtx(() => [
                                      createTextVNode("添加")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_dropdown_item, {
                                    command: "rm",
                                    disabled: tabs.value.length <= 1
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("删除")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", null, toDisplayString(tab), 1),
                            createVNode(_component_h_dropdown_menu, null, {
                              default: withCtx(() => [
                                createVNode(_component_h_dropdown_item, { command: "add" }, {
                                  default: withCtx(() => [
                                    createTextVNode("添加")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, {
                                  command: "rm",
                                  disabled: tabs.value.length <= 1
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("删除")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_h_dropdown, {
                        trigger: "context-menu",
                        onCommand: ($event) => onCommand(tab, $event)
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, toDisplayString(tab), 1),
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_h_dropdown_item, { command: "add" }, {
                                default: withCtx(() => [
                                  createTextVNode("添加")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_h_dropdown_item, {
                                command: "rm",
                                disabled: tabs.value.length <= 1
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("删除")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["onCommand"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (tab) => {
                return openBlock(), createBlock(_component_h_tab, { key: tab }, {
                  default: withCtx(() => [
                    createVNode(_component_h_dropdown, {
                      trigger: "context-menu",
                      onCommand: ($event) => onCommand(tab, $event)
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, toDisplayString(tab), 1),
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_h_dropdown_item, { command: "add" }, {
                              default: withCtx(() => [
                                createTextVNode("添加")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_h_dropdown_item, {
                              command: "rm",
                              disabled: tabs.value.length <= 1
                            }, {
                              default: withCtx(() => [
                                createTextVNode("删除")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onCommand"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/tab-menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
