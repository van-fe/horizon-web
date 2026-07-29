import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "compatible",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("1");
    const v2 = ref(false);
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    const beforeChange = (tabKey, update) => {
      if (tabKey === "2") {
        $message.warning({ message: "等待一下", duration: 2e3 });
        setTimeout(() => {
          update();
        }, 2e3);
        return;
      }
      update();
    };
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const beforeChangeUsed = async (tabKey) => {
      if (tabKey === "2") {
        $message.warning({ message: "等待一下", duration: 2e3 });
        await delay(2e3);
      }
    };
    const onTabClose = (tabKey) => {
      console.debug("close tab key =", tabKey);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<!--[--><div class="mb-8 flex align-center"><span class="mr-4">其他</span><div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}">`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: v2.value,
        "onUpdate:modelValue": ($event) => v2.value = $event,
        label: "v2"
      }, null, _parent));
      _push(`</div></div>`);
      if (v2.value) {
        _push(ssrRenderComponent(_component_h_tabs, {
          "active-key": activeKey.value,
          "onUpdate:activeKey": ($event) => activeKey.value = $event,
          editable: "",
          v2: "",
          underline: false,
          "before-change": beforeChangeUsed,
          onChange: onTabChanged,
          onClose: onTabClose
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "1",
                label: "Tab 1"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "2",
                label: "延迟访问Tab 2"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "3",
                label: "Tab 3",
                "show-close": ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                key: "4",
                label: "Tab long title"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_h_tab, {
                  name: "1",
                  label: "Tab 1"
                }),
                createVNode(_component_h_tab, {
                  name: "2",
                  label: "延迟访问Tab 2"
                }),
                createVNode(_component_h_tab, {
                  name: "3",
                  label: "Tab 3",
                  "show-close": ""
                }),
                createVNode(_component_h_tab, {
                  key: "4",
                  label: "Tab long title"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_h_tabs, {
          modelValue: activeKey.value,
          "onUpdate:modelValue": ($event) => activeKey.value = $event,
          "show-add": "",
          "show-underline": false,
          "before-change": beforeChange,
          onChange: onTabChanged,
          onClose: onTabClose
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "1",
                label: "Tab 1"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "2",
                label: "延迟访问Tab 2"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                name: "3",
                label: "Tab 3",
                "show-close": ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_h_tab, {
                key: "4",
                label: "Tab long title"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_h_tab, {
                  name: "1",
                  label: "Tab 1"
                }),
                createVNode(_component_h_tab, {
                  name: "2",
                  label: "延迟访问Tab 2"
                }),
                createVNode(_component_h_tab, {
                  name: "3",
                  label: "Tab 3",
                  "show-close": ""
                }),
                createVNode(_component_h_tab, {
                  key: "4",
                  label: "Tab long title"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/compatible.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
