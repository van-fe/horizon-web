import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo" }, _attrs))} data-v-0890e7b3>`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span 4</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span 4")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 4 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span 4")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 4 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span 4</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span 4")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span 8</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span 8")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span 12</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span 12")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 4 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span 4")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span 8")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span 12")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { offset: 3 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset, offset 3</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset, offset 3")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { offset: 3 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-0890e7b3${_scopeId2}>span unset, offset 3</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "span unset, offset 3")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { offset: 3 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset, offset 3")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { offset: 3 }, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "span unset, offset 3")
            ]),
            _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Layout/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0890e7b3"]]);
export {
  demo1 as default
};
