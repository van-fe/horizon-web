import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const imagesRef = ref([]);
    const generateImages = (count) => {
      const list = [];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: "image",
          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,
          cover: `https://picsum.photos/id/${base + i}/1366/768`,
          title: `Image: ${base + i}`
        });
      }
      return list;
    };
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = generateImages(10);
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      showViewer
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
        _push2(`点我浏览精彩图集`);
      } else {
        return [
          createTextVNode("点我浏览精彩图集")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_viewer, {
    modelValue: _ctx.visibleRef,
    "onUpdate:modelValue": ($event) => _ctx.visibleRef = $event,
    sources: _ctx.imagesRef,
    loop: ""
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Viewer/loop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const loop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  loop as default
};
