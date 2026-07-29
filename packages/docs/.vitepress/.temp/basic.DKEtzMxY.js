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
    const video1 = {
      type: "video",
      cover: "https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg",
      thumbnail: "https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg",
      videoSources: [
        {
          src: "https://www.example.com/cdn-static/mydemo/nextjs/images/et5/et5-hero-video.mp4",
          type: "video/mp4"
        }
      ],
      title: "vimejs video"
    };
    const video2 = {
      type: "video",
      cover: "https://vjs.zencdn.net/v/oceans.png",
      thumbnail: "https://vjs.zencdn.net/v/oceans.png",
      videoSources: [
        {
          src: "https://vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4"
        }
      ],
      title: "oceans video"
    };
    const showViewer = () => {
      imagesRef.value = generateImages(1);
      visibleRef.value = true;
    };
    const showViewer2 = () => {
      imagesRef.value = [video1];
      visibleRef.value = true;
    };
    const showViewer3 = () => {
      imagesRef.value = [video1, video2, ...generateImages(10)];
      visibleRef.value = true;
    };
    return {
      imagesRef,
      showViewer,
      showViewer2,
      showViewer3,
      visibleRef
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_viewer = resolveComponent("h-viewer");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: _ctx.showViewer
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`单张图片`);
      } else {
        return [
          createTextVNode("单张图片")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: _ctx.showViewer2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`单个视频`);
      } else {
        return [
          createTextVNode("单个视频")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: _ctx.showViewer3
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`图片和视频集合`);
      } else {
        return [
          createTextVNode("图片和视频集合")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_viewer, {
    modelValue: _ctx.visibleRef,
    "onUpdate:modelValue": ($event) => _ctx.visibleRef = $event,
    sources: _ctx.imagesRef
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Viewer/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  basic as default
};
