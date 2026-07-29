import { defineComponent, ref, reactive, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "editable",
  __ssrInlineRender: true,
  setup(__props) {
    const randomUid = () => Math.random().toString(36).slice(2);
    const activeKey = ref(randomUid());
    const size = ref("medium");
    const cardType = ref("line");
    const items = ref([
      { label: "Default Tab 1", uid: activeKey.value },
      { label: "Default Tab 2", uid: randomUid() },
      { label: "Default Tab 3", uid: randomUid() }
    ]);
    const firstTab = reactive({ label: "FirstTab", uid: randomUid(), show: true });
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
    };
    const onTabAdd = () => {
      $message({ type: "success", message: "Add tab" });
      const newTab = { label: `New Tab ${items.value.length + 1}`, uid: randomUid() };
      items.value = items.value.concat(newTab);
      activeKey.value = newTab.uid;
    };
    const onTabClose = (key) => {
      $message({ type: "success", message: `Close tab ${key}` });
      items.value = items.value.filter((t) => t.uid !== key);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
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
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        v2: "",
        editable: "",
        type: cardType.value,
        size: size.value,
        onChange: onTabChanged,
        onAdd: onTabAdd,
        onClose: onTabClose
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (firstTab.show) {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: firstTab.uid,
                label: firstTab.label
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(items.value, (item) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: item.uid,
                label: item.label,
                closable: ""
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              firstTab.show ? (openBlock(), createBlock(_component_h_tab, {
                key: firstTab.uid,
                label: firstTab.label
              }, null, 8, ["label"])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key: item.uid,
                  label: item.label,
                  closable: ""
                }, null, 8, ["label"]);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/editable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
