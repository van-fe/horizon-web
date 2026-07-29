import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo" }, _attrs))} data-v-dab82376>`);
  _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>gutter 10px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "gutter 10px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>gutter 10px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "gutter 10px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>gutter 10px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "gutter 10px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "gutter 10px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "gutter 10px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "gutter 10px")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    hspace: 0,
    vspace: 4
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 0px, vspace 4px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 0px, vspace 4px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 0px, vspace 4px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 0px, vspace 4px")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, { hspace: 8 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="grid-content" data-v-dab82376${_scopeId2}>hspace 8px</div>`);
            } else {
              return [
                createVNode("div", { class: "grid-content" }, "hspace 8px")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, null, {
            default: withCtx(() => [
              createVNode("div", { class: "grid-content" }, "hspace 8px")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Layout/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dab82376"]]);
export {
  demo2 as default
};
