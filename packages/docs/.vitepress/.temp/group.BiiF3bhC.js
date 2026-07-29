import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const data = ref([
      {
        key: 0,
        label: "分类标题A",
        isGroup: true
      },
      {
        key: 1,
        label: "A-1"
      },
      {
        key: 2,
        label: "A-2"
      },
      {
        key: 3,
        label: "分类标题B",
        isGroup: true
      },
      {
        key: 4,
        label: "B-1"
      },
      {
        key: 5,
        label: "B-2"
      }
    ]);
    const dataModel = ref([1, 4]);
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
    style: { "width": "500px" }
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const group = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  group as default
};
