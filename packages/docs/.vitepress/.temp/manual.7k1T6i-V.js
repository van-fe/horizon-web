import { defineComponent, ref, watch, onMounted, resolveComponent, unref, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { J as HScrollbar } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "manual",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollbar = ref(null);
    const scrollHeight = ref(0);
    const value = ref(0);
    watch(value, (val) => {
      var _a;
      (_a = scrollbar.value) == null ? void 0 : _a.setScrollTop(val);
    });
    function onScroll({ scrollTop }) {
      value.value = scrollTop;
    }
    onMounted(() => {
      var _a, _b;
      scrollHeight.value = ((_a = scrollbar.value) == null ? void 0 : _a.wrapRef.scrollHeight) - ((_b = scrollbar.value) == null ? void 0 : _b.wrapRef.offsetHeight);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_slider = resolveComponent("h-slider");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-2a34b867>`);
      _push(ssrRenderComponent(unref(HScrollbar), {
        ref_key: "scrollbar",
        ref: scrollbar,
        height: "400px",
        onScroll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(20, (item) => {
              _push2(`<div class="item" data-v-2a34b867${_scopeId}>${ssrInterpolate(item)}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                return createVNode("div", {
                  key: item,
                  class: "item"
                }, toDisplayString(item), 1);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="slider mt-2" data-v-2a34b867>`);
      _push(ssrRenderComponent(_component_h_slider, {
        modelValue: value.value,
        "onUpdate:modelValue": ($event) => value.value = $event,
        min: 0,
        max: scrollHeight.value,
        "tooltip-enable": false
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Scrollbar/manual.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const manual = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2a34b867"]]);
export {
  manual as default
};
