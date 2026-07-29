import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, {
                plain: true,
                "border-style": "solid"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Solid`);
                  } else {
                    return [
                      createTextVNode("Solid")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                plain: true,
                "border-style": "dotted"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Dotted`);
                  } else {
                    return [
                      createTextVNode("Dotted")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                plain: true,
                "border-style": "dashed"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Dashed`);
                  } else {
                    return [
                      createTextVNode("Dashed")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, {
                  plain: true,
                  "border-style": "solid"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Solid")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  plain: true,
                  "border-style": "dotted"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Dotted")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  plain: true,
                  "border-style": "dashed"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Dashed")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_h_button, {
                plain: true,
                "border-style": "solid"
              }, {
                default: withCtx(() => [
                  createTextVNode("Solid")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                plain: true,
                "border-style": "dotted"
              }, {
                default: withCtx(() => [
                  createTextVNode("Dotted")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                plain: true,
                "border-style": "dashed"
              }, {
                default: withCtx(() => [
                  createTextVNode("Dashed")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/border-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const borderStyle = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ea3e19ef"]]);
export {
  borderStyle as default
};
