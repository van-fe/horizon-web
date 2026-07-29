import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderList, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      listRef: ref([0, 8, 15, 1e4])
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_badge = resolveComponent("h-badge");
  _push(`<!--[--><p class="my-4">center-point，按中心点对齐</p><!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "num",
      content: item,
      "num-max": 99,
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--><p class="my-4">inner，内部对齐</p><!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "num",
      align: "inner",
      content: item,
      "num-max": 99,
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--><p class="my-4">outer，外部对齐</p><!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "num",
      align: "outer",
      content: item,
      "num-max": 99,
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--><p class="my-4">fix-left，固定左边边距，长度向右延伸</p><!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "num",
      align: "fix-left",
      content: item,
      "num-max": 99,
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--><p class="my-4">自定义偏移量</p><!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "num",
      align: "fix-left",
      offset: { top: "-2px", right: "-2px" },
      content: item,
      "num-max": 99,
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle({ "background": "gray", "width": "50px", "height": "50px" })}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", { style: { "background": "gray", "width": "50px", "height": "50px" } })
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Badge/align.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const align = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  align as default
};
