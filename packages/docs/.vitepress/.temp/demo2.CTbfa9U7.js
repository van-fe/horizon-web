import { defineComponent, ref, resolveComponent, resolveDirective, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const enabled = ref(true);
    return {
      enabled
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_switch = resolveComponent("h-switch");
  const _directive_draggable = resolveDirective("draggable");
  let _temp0;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.enabled,
    "onUpdate:modelValue": ($event) => _ctx.enabled = $event,
    label: "允许移动",
    "label-position": "right"
  }, null, _parent));
  _push(`<div class="drag-container" data-v-740138ef><div${ssrRenderAttrs(_temp0 = ssrGetDirectiveProps(_ctx, _directive_draggable, { enabled: _ctx.enabled }))} data-v-740138ef>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-draggable/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-740138ef"]]);
export {
  demo2 as default
};
