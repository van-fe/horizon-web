import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const isShow = ref(true);
    const show = () => {
      isShow.value = true;
    };
    const hide = () => {
      isShow.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _directive_loading = resolveDirective("loading");
      _push(`<!--[--><section class="containers"><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "row",
        text: "加载中...",
        size: "medium"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "row",
        text: "加载中...",
        size: "medium"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "row",
        text: "加载中...",
        size: "large"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "row",
        text: "加载中...",
        size: "small",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "row",
        text: "加载中...",
        size: "medium",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "row",
        text: "加载中...",
        size: "large",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "column",
        text: "加载中...",
        size: "small"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "column",
        text: "加载中...",
        size: "medium"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "dots",
        textOrient: "column",
        text: "加载中...",
        size: "large"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "column",
        text: "加载中...",
        size: "small",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "column",
        text: "加载中...",
        size: "medium",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, {
        isShow: isShow.value,
        loadingType: "circle",
        textOrient: "column",
        text: "加载中...",
        size: "large",
        bgc: "#5FDDE330"
      })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, { isShow: isShow.value, loadingType: "dots", textOrient: "column", size: "large" })))}> 测试 </div><div${ssrRenderAttrs(mergeProps({ class: "loadingContainer" }, ssrGetDirectiveProps(_ctx, _directive_loading, { isShow: isShow.value, loadingType: "circle", textOrient: "column", size: "medium" })))}> 测试 </div></section>`);
      _push(ssrRenderComponent(_component_h_button, {
        size: "large",
        type: "primary",
        onClick: show
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`显示`);
          } else {
            return [
              createTextVNode("显示")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        size: "large",
        type: "primary",
        onClick: hide
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`隐藏`);
          } else {
            return [
              createTextVNode("隐藏")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-loading/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
