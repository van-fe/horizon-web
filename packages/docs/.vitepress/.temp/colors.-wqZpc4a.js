import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "colors",
  __ssrInlineRender: true,
  setup(__props) {
    const percentage = ref(20);
    const customColor = ref("#409eff");
    const customColors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 }
    ];
    const customColorMethod = (percentage2) => {
      if (percentage2 < 30) {
        return "#909399";
      }
      if (percentage2 < 70) {
        return "#e6a23c";
      }
      return "#67c23a";
    };
    const increase = () => {
      percentage.value += 10;
      if (percentage.value > 100) {
        percentage.value = 100;
      }
    };
    const decrease = () => {
      percentage.value -= 10;
      if (percentage.value < 0) {
        percentage.value = 0;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_progress = resolveComponent("h-progress");
      const _component_h_button = resolveComponent("h-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-progress" }, _attrs))} data-v-d3ba59e8>`);
      _push(ssrRenderComponent(_component_h_progress, {
        percentage: percentage.value,
        color: customColor.value
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_progress, {
        percentage: percentage.value,
        color: customColorMethod
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_progress, {
        percentage: percentage.value,
        color: customColors
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_progress, {
        percentage: percentage.value,
        color: customColors
      }, null, _parent));
      _push(`<div data-v-d3ba59e8>`);
      _push(ssrRenderComponent(_component_h_button, {
        class: "mr-2",
        onClick: decrease
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`decrease`);
          } else {
            return [
              createTextVNode("decrease")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, { onClick: increase }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`add`);
          } else {
            return [
              createTextVNode("add")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Progress/colors.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colors = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d3ba59e8"]]);
export {
  colors as default
};
