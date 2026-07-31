import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const player = ref();
    return {
      ready: (playerInstance) => {
        player.value = playerInstance;
      },
      play: () => {
        player.value.play();
      },
      pause: () => {
        player.value.pause();
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_video_player = resolveComponent("h-video-player");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_video_player, {
    sources: [
      {
        src: "/aurora-background.mp4",
        type: "video/mp4"
      }
    ],
    poster: "/demo-assets/video-poster.svg",
    onReady: _ctx.ready
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mt-3 mr-2",
    onClick: _ctx.play
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`播放`);
      } else {
        return [
          createTextVNode("播放")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.pause }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`暂停`);
      } else {
        return [
          createTextVNode("暂停")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VideoPlayer/action.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const action = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  action as default
};
