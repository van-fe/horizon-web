import { defineComponent, ref, onUnmounted, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo2",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    const timer2 = setInterval(function() {
      isLoading.value = !isLoading.value;
    }, 3e3);
    onUnmounted(() => {
      clearInterval(timer2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_skeleton = resolveComponent("h-skeleton");
      const _component_h_skeleton_item = resolveComponent("h-skeleton-item");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_h_skeleton, { loading: isLoading.value }, {
        loadingTemplate: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_skeleton_item, {
              shape: "text",
              style: { "width": "30%" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, {
              shape: "text",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_skeleton_item, {
              shape: "text",
              style: { "width": "60%" }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_skeleton_item, {
                shape: "text",
                style: { "width": "30%" }
              }),
              createVNode(_component_h_skeleton_item, {
                shape: "text",
                style: { "width": "20%" }
              }),
              createVNode(_component_h_skeleton_item, {
                shape: "text",
                style: { "width": "60%" }
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>骨架屏测试</div><div${_scopeId}>骨架屏</div><div${_scopeId}>骨架屏测试骨架屏测试骨架屏测试</div>`);
          } else {
            return [
              createVNode("div", null, "骨架屏测试"),
              createVNode("div", null, "骨架屏"),
              createVNode("div", null, "骨架屏测试骨架屏测试骨架屏测试")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Skeleton/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
