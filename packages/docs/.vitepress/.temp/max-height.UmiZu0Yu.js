import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "max-height",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([1, 2, 3]);
    function add() {
      items.value.push(items.value.length + 1);
    }
    function del() {
      items.value.pop();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_scrollbar = resolveComponent("h-scrollbar");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ad0bc247>`);
      _push(ssrRenderComponent(_component_h_button, { onClick: add }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`增加条目`);
          } else {
            return [
              createTextVNode("增加条目")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        disabled: items.value.length <= 3,
        onClick: del
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`减少条目`);
          } else {
            return [
              createTextVNode("减少条目")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_scrollbar, {
        "max-height": "400px",
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="wrap" data-v-ad0bc247${_scopeId}><!--[-->`);
            ssrRenderList(items.value, (item) => {
              _push2(`<div class="item" data-v-ad0bc247${_scopeId}>${ssrInterpolate(item)}</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "wrap" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                  return openBlock(), createBlock("div", {
                    key: item,
                    class: "item"
                  }, toDisplayString(item), 1);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Scrollbar/max-height.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const maxHeight = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad0bc247"]]);
export {
  maxHeight as default
};
