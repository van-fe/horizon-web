import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "delay",
  __ssrInlineRender: true,
  setup(__props) {
    const isShow = ref(false);
    function delayShow() {
      isShow.value = true;
      setTimeout(() => {
        isShow.value = false;
      }, 800);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _directive_loading = resolveDirective("loading");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "delay-demo" }, _attrs))} data-v-64fb4728><div${ssrRenderAttrs(mergeProps({ class: "loading-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "row",
        text: "加载中...",
        size: "medium",
        delay: 1e3
      })))} data-v-64fb4728> 延迟1000ms显示 </div><div${ssrRenderAttrs(mergeProps({ class: "loading-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "row",
        text: "加载中...",
        size: "medium"
      })))} data-v-64fb4728> 没有延迟 </div>`);
      if (!isShow.value) {
        _push(ssrRenderComponent(_component_h_button, {
          onClick: ($event) => isShow.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`开始加载`);
            } else {
              return [
                createTextVNode("开始加载")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!isShow.value) {
        _push(ssrRenderComponent(_component_h_button, { onClick: delayShow }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`开始加载并在1000ms内结束`);
            } else {
              return [
                createTextVNode("开始加载并在1000ms内结束")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isShow.value) {
        _push(ssrRenderComponent(_component_h_button, {
          onClick: ($event) => isShow.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`结束加载`);
            } else {
              return [
                createTextVNode("结束加载")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-loading/delay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const delay = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-64fb4728"]]);
export {
  delay as default
};
