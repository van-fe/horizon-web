import { defineComponent, ref, onUnmounted, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/demo-assets/scene-aurora.svg";
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-bdd519a5>`);
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
            _push2(ssrRenderComponent(_component_h_avatar, { src: "/demo-assets/avatar-coral.svg" }, null, _parent2, _scopeId));
            _push2(`<div data-v-bdd519a5${_scopeId}> 骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试 </div>`);
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
            _push2(`<div data-v-bdd519a5${_scopeId}><img class="container" style="${ssrRenderStyle({ "width": "200px", "height": "200px" })}"${ssrRenderAttr("src", _imports_0)} data-v-bdd519a5${_scopeId}></div><div class="container" data-v-bdd519a5${_scopeId}><img class="container"${ssrRenderAttr("src", _imports_0)} data-v-bdd519a5${_scopeId}></div>`);
          } else {
            return [
              createVNode(_component_h_avatar, { src: "/demo-assets/avatar-coral.svg" }),
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
                  src: _imports_0
                })
              ]),
              createVNode("div", { class: "container" }, [
                createVNode("img", {
                  class: "container",
                  src: _imports_0
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
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdd519a5"]]);
export {
  demo3 as default
};
