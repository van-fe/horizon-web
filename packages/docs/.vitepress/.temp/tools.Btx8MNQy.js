import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { c as createDemoViewerSources } from "./demo-assets._-wFvpS1.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const imagesRef = ref([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
      visibleRef.value = true;
    };
    const tools2 = [
      "previous",
      "next",
      "split",
      "zoomOut",
      "ratio",
      "zoomIn",
      "1:1",
      "split",
      {
        iconName: "tips",
        iconSize: "24",
        iconColor: "white",
        title: "More info",
        handler(url) {
          console.info("Click info button", url);
        }
      }
    ];
    return {
      visibleRef,
      imagesRef,
      showViewer,
      tools: tools2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_viewer = resolveComponent("h-viewer");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.showViewer }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`查看自定义按钮的示例`);
      } else {
        return [
          createTextVNode("查看自定义按钮的示例")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_viewer, {
    modelValue: _ctx.visibleRef,
    "onUpdate:modelValue": ($event) => _ctx.visibleRef = $event,
    sources: _ctx.imagesRef,
    tools: _ctx.tools
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Viewer/tools.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tools = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  tools as default
};
