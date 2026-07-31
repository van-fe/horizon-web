import { defineComponent, ref, resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { c as createDemoViewerSources } from "./demo-assets._-wFvpS1.js";
import { ssrRenderList, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const imagesRef = ref([]);
    imagesRef.value = createDemoViewerSources(10);
    const visibleRef = ref(false);
    const initIndexRef = ref(0);
    const showViewer = (url) => {
      const index = imagesRef.value.findIndex((img) => img.cover === url);
      initIndexRef.value = index >= 0 ? index : 0;
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      initIndexRef,
      showViewer
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_viewer = resolveComponent("h-viewer");
  _push(`<!--[--><!--[-->`);
  ssrRenderList(_ctx.imagesRef, (item) => {
    _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("data-source", item.cover)}${ssrRenderAttr("alt", item.title)} class="mr-3" data-v-c77059af>`);
  });
  _push(`<!--]-->`);
  _push(ssrRenderComponent(_component_h_viewer, {
    modelValue: _ctx.visibleRef,
    "onUpdate:modelValue": ($event) => _ctx.visibleRef = $event,
    sources: _ctx.imagesRef,
    "init-index": _ctx.initIndexRef
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Viewer/imgclick.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const imgclick = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c77059af"]]);
export {
  imgclick as default
};
