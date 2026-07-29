import { defineComponent, ref, onMounted, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    const isAnimating = ref(false);
    const timer1 = setInterval(function() {
      isLoading.value = !isLoading.value;
    }, 3e3);
    onMounted(() => {
      clearInterval(timer1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_skeleton = resolveComponent("h-skeleton");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-ecbb0fd8>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: isAnimating.value,
        "onUpdate:modelValue": ($event) => isAnimating.value = $event,
        label: "是否动画",
        status: "",
        class: "skeleton-switch"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_skeleton, {
        loading: isLoading.value,
        animated: isAnimating.value
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Skeleton/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ecbb0fd8"]]);
export {
  demo1 as default
};
