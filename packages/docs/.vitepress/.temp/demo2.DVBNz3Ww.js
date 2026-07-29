import { defineComponent, ref, resolveComponent, resolveDirective, withCtx, createTextVNode, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo2",
  __ssrInlineRender: true,
  setup(__props) {
    const checkbox = ref(["checked border"]);
    const isShow = ref(true);
    const isFullscreen = ref(true);
    const isFullscreenShow = ref(false);
    const show = () => {
      isShow.value = true;
    };
    const hide = () => {
      isShow.value = false;
    };
    const fullscreen = () => {
      isFullscreenShow.value = true;
      setTimeout(() => {
        isFullscreenShow.value = false;
      }, 2e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _directive_loading = resolveDirective("loading");
      _push(`<!--[--><div class="loading-container" data-v-d71967c6>`);
      _push(ssrRenderComponent(_component_h_button, {
        size: "large",
        type: "primary",
        onClick: show
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`显示`);
          } else {
            return [
              createTextVNode("显示")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        size: "large",
        type: "primary",
        onClick: hide
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`隐藏`);
          } else {
            return [
              createTextVNode("隐藏")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, mergeProps({
        size: "large",
        type: "primary",
        value: "checked border",
        label: "checked border",
        onClick: fullscreen
      }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isFullscreenShow.value,
        loadingType: "circle",
        textOrient: "row",
        text: "加载中...",
        size: "medium",
        bgc: "#FFF",
        fullscreen: isFullscreen.value
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 全屏 `);
          } else {
            return [
              createTextVNode(" 全屏 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_checkbox, mergeProps({
        modelValue: checkbox.value,
        "onUpdate:modelValue": ($event) => checkbox.value = $event,
        value: "checked border",
        label: "checked border",
        border: ""
      }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "row",
        text: "加载中...",
        size: "medium",
        bgc: "#FFF"
      })), null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-loading/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d71967c6"]]);
export {
  demo2 as default
};
