import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const show = ref(true);
    return {
      show
    };
  }
});
const _imports_0 = "/assets/1.DQreHJXs.png";
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_mask = resolveComponent("h-mask");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "box" }, _attrs))} data-v-38aac079><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-38aac079>`);
  _push(ssrRenderComponent(_component_h_mask, {
    absolute: "",
    "is-fuzzification": true
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Mask/demo5.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-38aac079"]]);
export {
  demo5 as default
};
