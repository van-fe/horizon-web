import { defineComponent, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    function onClick() {
      console.info("----点击事件触发----");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_backtop = resolveComponent("h-backtop");
      _push(`<div${ssrRenderAttrs(_attrs)}> 滚动页面可见 `);
      _push(ssrRenderComponent(_component_h_backtop, {
        "visibility-height": 200,
        onClick
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Backtop/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
