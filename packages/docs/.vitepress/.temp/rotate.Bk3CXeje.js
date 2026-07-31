import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const degree = ref(0);
    const doRotate = () => {
      switch (degree.value) {
        case 0:
          degree.value = 90;
          return;
        case 90:
          degree.value = 180;
          return;
        case 180:
          degree.value = 270;
          return;
        case 270:
          degree.value = 0;
          return;
      }
    };
    return {
      degree,
      doRotate
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_video_player = resolveComponent("h-video-player");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mb-3",
    onClick: _ctx.doRotate
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Rotate`);
      } else {
        return [
          createTextVNode("Rotate")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_video_player, {
    sources: [
      {
        src: "/aurora-background.mp4",
        type: "video/mp4"
      }
    ],
    poster: "/demo-assets/video-poster.svg",
    rotate: _ctx.degree
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VideoPlayer/rotate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rotate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  rotate as default
};
