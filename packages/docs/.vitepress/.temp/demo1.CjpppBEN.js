import { defineComponent, ref, reactive, resolveDirective, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const list = ref([/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]);
    const loadMore = () => {
      param.block = true;
      list.value.push("触底" + /* @__PURE__ */ new Date());
      setTimeout(() => {
        param.block = false;
      }, 1e3);
    };
    const loadMoreTop = () => {
      param.block = true;
      list.value.unshift("触顶" + /* @__PURE__ */ new Date());
      setTimeout(() => {
        param.block = false;
      }, 1e3);
    };
    const param = reactive({
      onReachBottom: loadMore,
      onReachTop: loadMoreTop,
      block: false,
      distance: 10,
      interval: 1e3
    });
    return {
      param,
      list
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _directive_infinite_scroll = resolveDirective("infinite-scroll");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "iScroll" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_infinite_scroll, _ctx.param)))}><!--[-->`);
  ssrRenderList(_ctx.list, (item, idx) => {
    _push(`<p>${ssrInterpolate(item)}</p>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-infinite-scroll/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo1 as default
};
