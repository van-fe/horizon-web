import { defineComponent, ref, onUnmounted, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo3",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    const timer3 = setInterval(function() {
      isLoading.value = !isLoading.value;
    }, 3e3);
    onUnmounted(() => {
      clearInterval(timer3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_skeleton = resolveComponent("h-skeleton");
      const _component_h_skeleton_item = resolveComponent("h-skeleton-item");
      const _component_h_avatar = resolveComponent("h-avatar");
      const _component_h_button = resolveComponent("h-button");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-1163c2fa>`);
      _push(ssrRenderComponent(_component_h_skeleton, { loading: isLoading.value }, {
        loadingTemplate: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "avatar" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "text" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "operate" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "button" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "image" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, { shape: "picture" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_skeleton_item, { shape: "avatar" }),
              createVNode(_component_h_skeleton_item, { shape: "text" }),
              createVNode(_component_h_skeleton_item, { shape: "operate" }),
              createVNode(_component_h_skeleton_item, { shape: "button" }),
              createVNode(_component_h_skeleton_item, { shape: "image" }),
              createVNode(_component_h_skeleton_item, { shape: "picture" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_avatar, { src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" }, null, _parent2, _scopeId));
            _push2(`<div data-v-1163c2fa${_scopeId}> 骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试 </div>`);
            _push2(ssrRenderComponent(_component_h_button, {
              size: "medium",
              type: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`operate`);
                } else {
                  return [
                    createTextVNode("operate")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div data-v-1163c2fa${_scopeId}><img class="container" style="${ssrRenderStyle({ "width": "200px", "height": "200px" })}" src="https://www.example.com/cdn-static/mydemo/images/demo-day-2021/demo-day-2021-playback-desktop.jpg" data-v-1163c2fa${_scopeId}></div><div class="container" data-v-1163c2fa${_scopeId}><img class="container" src="https://www.example.com/cdn-static/mydemo/images/demo-day-2021/demo-day-2021-playback-desktop.jpg" data-v-1163c2fa${_scopeId}></div>`);
          } else {
            return [
              createVNode(_component_h_avatar, { src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" }),
              createVNode("div", null, " 骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试 "),
              createVNode(_component_h_button, {
                size: "medium",
                type: "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode("operate")
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "container",
                  style: { "width": "200px", "height": "200px" },
                  src: "https://www.example.com/cdn-static/mydemo/images/demo-day-2021/demo-day-2021-playback-desktop.jpg"
                })
              ]),
              createVNode("div", { class: "container" }, [
                createVNode("img", {
                  class: "container",
                  src: "https://www.example.com/cdn-static/mydemo/images/demo-day-2021/demo-day-2021-playback-desktop.jpg"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Skeleton/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1163c2fa"]]);
export {
  demo3 as default
};
