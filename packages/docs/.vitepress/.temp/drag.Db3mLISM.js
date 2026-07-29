import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const data = ref([]);
    for (let i = 1; i <= 5; i++) {
      data.value.push({
        key: i,
        label: `选项名称 ${i}`
      });
    }
    const dataModel = ref([]);
    return {
      data,
      dataModel
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_transfer = resolveComponent("h-transfer");
  _push(ssrRenderComponent(_component_h_transfer, mergeProps({
    modelValue: _ctx.dataModel,
    "onUpdate:modelValue": ($event) => _ctx.dataModel = $event,
    data: _ctx.data,
    draggable: "",
    style: { "width": "500px" }
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/drag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const drag = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  drag as default
};
