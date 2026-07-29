import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createSlots, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "before-change",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("tab1");
    const loading = ref(false);
    const delay = () => new Promise((r) => setTimeout(r, 2e3));
    const beforeChange = async (tabName) => {
      if (tabName === "tab2") {
        loading.value = true;
        await delay();
        loading.value = false;
        return true;
      }
      if (tabName === "tab3") {
        $message.warning("不可访问！");
        return false;
      }
      return true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_a_icon = resolveComponent("a-icon");
      _push(ssrRenderComponent(_component_h_tabs, mergeProps({
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        v2: "",
        type: "card",
        "before-change": beforeChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "tab1",
              label: "普通Tab"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "tab2",
              label: "2s延迟"
            }, createSlots({ _: 2 }, [
              loading.value ? {
                name: "icon",
                fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_icon, {
                      spin: "ccw",
                      name: "loading"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_icon, {
                        spin: "ccw",
                        name: "loading"
                      })
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ]), _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "tab3",
              label: "不可访问"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "tab4",
              label: "普通Tab 2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_tab, {
                key: "tab1",
                label: "普通Tab"
              }),
              createVNode(_component_h_tab, {
                key: "tab2",
                label: "2s延迟"
              }, createSlots({ _: 2 }, [
                loading.value ? {
                  name: "icon",
                  fn: withCtx(() => [
                    createVNode(_component_a_icon, {
                      spin: "ccw",
                      name: "loading"
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1024),
              createVNode(_component_h_tab, {
                key: "tab3",
                label: "不可访问"
              }),
              createVNode(_component_h_tab, {
                key: "tab4",
                label: "普通Tab 2"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/before-change.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
