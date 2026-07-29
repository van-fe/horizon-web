import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "with-panel",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("tab1");
    const tabs = ref([
      {
        label: "Tab1",
        name: "tab1",
        content: "Tab Content 1"
      },
      {
        label: "Tab2",
        name: "tab2",
        content: "Tab Content 2"
      },
      {
        label: "Tab3",
        name: "tab3",
        content: "Tab Content 3"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_panels = resolveComponent("h-panels");
      const _component_h_panel = resolveComponent("h-panel");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (tab) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: tab.name,
                label: tab.label,
                name: tab.name
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (tab) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key: tab.name,
                  label: tab.label,
                  name: tab.name
                }, null, 8, ["label", "name"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_panels, {
        modelValue: activeKey.value,
        "onUpdate:modelValue": ($event) => activeKey.value = $event,
        class: "p-1 pt-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (panel) => {
              _push2(ssrRenderComponent(_component_h_panel, {
                key: panel.name,
                name: panel.name
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(panel.content)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(panel.content), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (panel) => {
                return openBlock(), createBlock(_component_h_panel, {
                  key: panel.name,
                  name: panel.name
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(panel.content), 1)
                  ]),
                  _: 2
                }, 1032, ["name"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/with-panel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
