import { defineComponent, ref, watch, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "extra",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("Tab 1");
    const tabs = ref(["Tab 1", "Tab 2", "Tab 3"]);
    const size = ref("medium");
    const cardType = ref("line");
    const all = ref(true);
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
    };
    const onClick = () => {
      $message({ type: "success", message: `Extra area clicked` });
    };
    const onAddTabs = () => {
      tabs.value = tabs.value.concat(
        Array.from({ length: 10 }, (_, i) => `Tab ${i + tabs.value.length + 4}`)
      );
    };
    const onTabAdd = () => {
      $message({ type: "success", message: "Add tab" });
      const newTab = `New Tab ${tabs.value.length + 1}`;
      tabs.value = tabs.value.concat(newTab);
      activeKey.value = newTab;
    };
    const onTabClose = (key) => {
      $message({ type: "success", message: `Close tab ${key}` });
      tabs.value = tabs.value.filter((t) => t !== key);
    };
    const showAllAction = () => {
      if (all.value) onAddTabs();
      else tabs.value = tabs.value.slice(0, 3);
    };
    watch(() => all.value, showAllAction, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[--><div class="mb-4 flex align-center"><span class="mr-4">类型</span>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: cardType.value,
        "onUpdate:modelValue": ($event) => cardType.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "line" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`line(Default)`);
                } else {
                  return [
                    createTextVNode("line(Default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "card" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`card`);
                } else {
                  return [
                    createTextVNode("card")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "page" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`page(不支持尺寸调整)`);
                } else {
                  return [
                    createTextVNode("page(不支持尺寸调整)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "line" }, {
                default: withCtx(() => [
                  createTextVNode("line(Default)")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "card" }, {
                default: withCtx(() => [
                  createTextVNode("card")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "page" }, {
                default: withCtx(() => [
                  createTextVNode("page(不支持尺寸调整)")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mb-4 flex align-center"><span class="mr-4">尺寸</span>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: size.value,
        "onUpdate:modelValue": ($event) => size.value = $event,
        disabled: cardType.value === "page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "mini" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mini`);
                } else {
                  return [
                    createTextVNode("mini")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "small" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`small`);
                } else {
                  return [
                    createTextVNode("small")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`medium(Default)`);
                } else {
                  return [
                    createTextVNode("medium(Default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "large" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`large`);
                } else {
                  return [
                    createTextVNode("large")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "mini" }, {
                default: withCtx(() => [
                  createTextVNode("mini")
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
      }, _parent));
      _push(`</div><div class="mb-8 flex align-center"><span class="mr-4">其他</span><div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}">`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: all.value,
        "onUpdate:modelValue": ($event) => all.value = $event,
        label: "全部所有操作"
      }, null, _parent));
      _push(`</div></div><div style="${ssrRenderStyle({ "width": "80%" })}">`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        editable: "",
        v2: "",
        size: size.value,
        type: cardType.value,
        onChange: onTabChanged,
        onAdd: onTabAdd,
        onClose: onTabClose
      }, {
        extra: withCtx(({ size: sm }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    size: sm,
                    onClick
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`刷新`);
                      } else {
                        return [
                          createTextVNode("刷新")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    size: sm,
                    type: "normal",
                    onClick
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`重置`);
                      } else {
                        return [
                          createTextVNode("重置")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      size: sm,
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("刷新")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_h_button, {
                      size: sm,
                      type: "normal",
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("重置")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_h_space, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_button, {
                      size: sm,
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("刷新")
                      ]),
                      _: 1
                    }, 8, ["size"]),
                    createVNode(_component_h_button, {
                      size: sm,
                      type: "normal",
                      onClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode("重置")
                      ]),
                      _: 1
                    }, 8, ["size"])
                  ]),
                  _: 2
                }, 1024)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (t) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: t,
                label: t,
                closable: ""
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (t) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key: t,
                  label: t,
                  closable: ""
                }, null, 8, ["label"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/extra.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
