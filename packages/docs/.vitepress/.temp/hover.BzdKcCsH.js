import { resolveComponent, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_hover = resolveComponent("h-hover");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_hover, _attrs, {
    default: withCtx(({ hover: hover2 }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container" data-v-511ae23d${_scopeId}><span data-v-511ae23d${_scopeId}>容器</span>`);
        if (hover2) {
          _push2(ssrRenderComponent(_component_h_button, { size: "medium" }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`删除`);
              } else {
                return [
                  createTextVNode("删除")
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "container" }, [
            createVNode("span", null, "容器"),
            hover2 ? (openBlock(), createBlock(_component_h_button, {
              key: 0,
              size: "medium"
            }, {
              default: withCtx(() => [
                createTextVNode("删除")
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Hover/hover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-511ae23d"]]);
export {
  hover as default
};
