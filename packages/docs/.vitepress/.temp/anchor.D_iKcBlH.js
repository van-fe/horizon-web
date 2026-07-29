import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_link = resolveComponent("h-link");
  _push(`<!--[--><p>`);
  _push(ssrRenderComponent(_component_h_link, {
    anchor: "anchor",
    type: "text",
    underline: false,
    "scroll-target": ".VPDoc"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Anchor`);
      } else {
        return [
          createTextVNode("Anchor")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><p>`);
  _push(ssrRenderComponent(_component_h_link, {
    anchor: "anchor2",
    "anchor-offset": 200,
    type: "text",
    underline: false,
    "scroll-target": ".VPDoc"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Anchor2 Set Offset 200 `);
      } else {
        return [
          createTextVNode(" Anchor2 Set Offset 200 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/anchor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const anchor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  anchor as default
};
