import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  const _component_h_link = resolveComponent("h-link");
  _push(ssrRenderComponent(_component_h_popover, _attrs, {
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Something need to popper...`);
            } else {
              return [
                createTextVNode("Something need to popper...")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode("Something need to popper...")
            ]),
            _: 1
          })
        ];
      }
    }),
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_link, {
          attribute: "",
          type: "text"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Has Attribute`);
            } else {
              return [
                createTextVNode("Has Attribute")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_link, {
            attribute: "",
            type: "text"
          }, {
            default: withCtx(() => [
              createTextVNode("Has Attribute")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/attribute.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const attribute = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  attribute as default
};
