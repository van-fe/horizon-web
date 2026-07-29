import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: { AIcon: __default__ },
  setup() {
    const handleSearch = (e) => {
      console.info("[handleSearch]", e.target.value);
    };
    const val = ref("");
    return {
      val,
      handleSearch
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_input = resolveComponent("h-input");
  const _component_a_icon = resolveComponent("a-icon");
  _push(ssrRenderComponent(_component_h_input, mergeProps({
    modelValue: _ctx.val,
    "onUpdate:modelValue": ($event) => _ctx.val = $event,
    clearable: "",
    placeholder: "Please input search keywords",
    onKeyup: _ctx.handleSearch
  }, _attrs), {
    prefix: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_icon, {
          name: "search",
          style: { "color": "var(--h-text-disabled)" }
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_icon, {
            name: "search",
            style: { "color": "var(--h-text-disabled)" }
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  search as default
};
