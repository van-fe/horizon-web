import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-block" }, _attrs))} data-v-f38f8a87>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, {
          xs: 8,
          sm: 4,
          md: { span: 4, offset: 2 },
          lg: 2,
          xl: 2,
          xxl: 1
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, {
          xs: 4,
          sm: 8,
          md: 12,
          lg: { span: 6, offset: 2 },
          xl: 12,
          xxl: 8
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, {
          xs: 4,
          sm: 8,
          md: 3,
          lg: { span: 8, offset: 4 },
          xl: 8,
          xxl: 10
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, {
          xs: 8,
          sm: 4,
          md: { span: 1, offset: 2 },
          lg: 2,
          xl: 2,
          xxl: 5
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, {
            xs: 8,
            sm: 4,
            md: { span: 4, offset: 2 },
            lg: 2,
            xl: 2,
            xxl: 1
          }),
          createVNode(_component_h_col, {
            xs: 4,
            sm: 8,
            md: 12,
            lg: { span: 6, offset: 2 },
            xl: 12,
            xxl: 8
          }),
          createVNode(_component_h_col, {
            xs: 4,
            sm: 8,
            md: 3,
            lg: { span: 8, offset: 4 },
            xl: 8,
            xxl: 10
          }),
          createVNode(_component_h_col, {
            xs: 8,
            sm: 4,
            md: { span: 1, offset: 2 },
            lg: 2,
            xl: 2,
            xxl: 5
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Layout/responsive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const responsive = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f38f8a87"]]);
export {
  responsive as default
};
