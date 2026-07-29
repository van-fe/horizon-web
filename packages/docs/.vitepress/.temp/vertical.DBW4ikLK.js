import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_descriptions = resolveComponent("h-descriptions");
  const _component_h_description_item = resolveComponent("h-description-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-551a15ee><div data-v-551a15ee>`);
  _push(ssrRenderComponent(_component_h_descriptions, {
    title: "User Info",
    type: "vertical",
    "label-position": "top",
    column: 3
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_description_item, {
          label: "Name",
          value: "bingkun Zhou"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_description_item, {
          label: "Telephone",
          value: "0924-250492"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_description_item, {
          label: "Residence",
          value: "Norway"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_description_item, {
          label: "City",
          value: "Oslo"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_description_item, {
          label: "Address",
          value: "Leg.Kiropraktor Iréne Johnson"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_description_item, {
            label: "Name",
            value: "bingkun Zhou"
          }),
          createVNode(_component_h_description_item, {
            label: "Telephone",
            value: "0924-250492"
          }),
          createVNode(_component_h_description_item, {
            label: "Residence",
            value: "Norway"
          }),
          createVNode(_component_h_description_item, {
            label: "City",
            value: "Oslo"
          }),
          createVNode(_component_h_description_item, {
            label: "Address",
            value: "Leg.Kiropraktor Iréne Johnson"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Descriptions/vertical.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vertical = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-551a15ee"]]);
export {
  vertical as default
};
