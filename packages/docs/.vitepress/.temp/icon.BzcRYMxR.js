import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderList, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      listRef: ref([
        {
          containerWidth: 32,
          name: "owner_os",
          size: 12
        },
        {
          containerWidth: 56,
          name: "owner_os",
          size: 16
        },
        {
          containerWidth: 80,
          name: "owner_os",
          size: 20
        }
      ])
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_badge = resolveComponent("h-badge");
  _push(`<!--[-->`);
  ssrRenderList(_ctx.listRef, (item, index) => {
    _push(ssrRenderComponent(_component_h_badge, {
      key: index,
      type: "icon",
      content: item.name,
      "icon-size": item.size,
      "icon-color": "#24A7B2",
      align: "inner",
      bottom: "",
      style: { "margin-right": "20px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div style="${ssrRenderStyle([{ width: item.containerWidth + "px", height: item.containerWidth + "px" }, { "background": "gray", "border-radius": "50%" }])}"${_scopeId}></div>`);
        } else {
          return [
            createVNode("div", {
              style: [{ width: item.containerWidth + "px", height: item.containerWidth + "px" }, { "background": "gray", "border-radius": "50%" }]
            }, null, 4)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Badge/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  icon as default
};
