import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "width": "280px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        onChange: onTabChanged
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "1",
              label: "1.t ratione aut ea. Voluptates praesentium u ratione aut ea. Voluptates praesentium "
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "2",
              label: "2.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "3",
              label: "3.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tab, {
              key: "4",
              label: "4.ut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui par"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_tab, {
                key: "1",
                label: "1.t ratione aut ea. Voluptates praesentium u ratione aut ea. Voluptates praesentium "
              }),
              createVNode(_component_h_tab, {
                key: "2",
                label: "2.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur."
              }),
              createVNode(_component_h_tab, {
                key: "3",
                label: "3.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur."
              }),
              createVNode(_component_h_tab, {
                key: "4",
                label: "4.ut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui par"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
