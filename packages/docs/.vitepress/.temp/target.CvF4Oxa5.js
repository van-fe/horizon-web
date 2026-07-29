import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "target",
  __ssrInlineRender: true,
  setup(__props) {
    function onClick() {
      console.info("----点击事件触发----");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_backtop = resolveComponent("h-backtop");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "backtop-demo" }, _attrs))} data-v-e395e7a3> 滚动以下盒子可见 <div class="scroll-box" data-v-e395e7a3> 指定的触发元素 <div class="inner" data-v-e395e7a3></div></div>`);
      _push(ssrRenderComponent(_component_h_backtop, {
        target: ".scroll-box",
        bottom: 300,
        "visibility-height": 10,
        onClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 👆 `);
          } else {
            return [
              createTextVNode(" 👆 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Backtop/target.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const target = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e395e7a3"]]);
export {
  target as default
};
