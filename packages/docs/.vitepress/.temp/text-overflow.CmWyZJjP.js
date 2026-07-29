import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "text-overflow",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("1");
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      _push(ssrRenderComponent(_component_h_tabs, mergeProps({
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        onChange: onTabChanged
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "1",
              label: "Tab 1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "2",
              label: "Tab 2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "3",
              label: "Tab 3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, { key: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tooltip, {
                    placement: "bottom",
                    trigger: "hover",
                    size: "medium",
                    content: "Tab long titleTab long title"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>Tab long title...</div>`);
                      } else {
                        return [
                          createVNode("div", null, "Tab long title...")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tooltip, {
                      placement: "bottom",
                      trigger: "hover",
                      size: "medium",
                      content: "Tab long titleTab long title"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "Tab long title...")
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
              createVNode(_component_h_tab, {
                key: "1",
                label: "Tab 1"
              }),
              createVNode(_component_h_tab, {
                key: "2",
                label: "Tab 2"
              }),
              createVNode(_component_h_tab, {
                key: "3",
                label: "Tab 3"
              }),
              createVNode(_component_h_tab, { key: "4" }, {
                default: withCtx(() => [
                  createVNode(_component_h_tooltip, {
                    placement: "bottom",
                    trigger: "hover",
                    size: "medium",
                    content: "Tab long titleTab long title"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, "Tab long title...")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/text-overflow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
