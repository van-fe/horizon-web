import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_pagination = resolveComponent("h-pagination");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>Simple</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "Simple")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                type: "simple"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  type: "simple"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "Simple")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                type: "simple"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>Simplest</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "Simplest")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                type: "simplest"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  type: "simplest"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "Simplest")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                type: "simplest"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Pagination/type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const type = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  type as default
};
