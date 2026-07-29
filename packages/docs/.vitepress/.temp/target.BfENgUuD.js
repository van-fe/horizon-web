import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_affix = resolveComponent("h-affix");
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "scroll",
    class: "target-wrapper"
  }, _attrs))} data-v-821fbab1><div class="target-container" data-v-821fbab1>`);
  _push(ssrRenderComponent(_component_h_affix, { target: ".target-wrapper" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Affix in container`);
            } else {
              return [
                createTextVNode("Affix in container")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("Affix in container")
            ]),
            _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Affix/target.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const target = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-821fbab1"]]);
export {
  target as default
};
