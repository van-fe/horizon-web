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
                type: "normal",
                link: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Normal Link Button`);
                  } else {
                    return [
                      createTextVNode("Normal Link Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "primary",
                link: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Primary Link Button`);
                  } else {
                    return [
                      createTextVNode("Primary Link Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "danger",
                link: true
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Danger Link Button`);
                  } else {
                    return [
                      createTextVNode("Danger Link Button")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "normal",
                link: true,
                href: "/"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`href 跳到首页`);
                  } else {
                    return [
                      createTextVNode("href 跳到首页")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_button, {
                type: "normal",
                link: true,
                to: "/"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`router 跳到首页`);
                  } else {
                    return [
                      createTextVNode("router 跳到首页")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, {
                  type: "normal",
                  link: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Normal Link Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "primary",
                  link: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Primary Link Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "danger",
                  link: true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Danger Link Button")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "normal",
                  link: true,
                  href: "/"
                }, {
                  default: withCtx(() => [
                    createTextVNode("href 跳到首页")
                  ]),
                  _: 1
                }),
                createVNode(_component_h_button, {
                  type: "normal",
                  link: true,
                  to: "/"
                }, {
                  default: withCtx(() => [
                    createTextVNode("router 跳到首页")
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
                type: "normal",
                link: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Normal Link Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "primary",
                link: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Primary Link Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "danger",
                link: true
              }, {
                default: withCtx(() => [
                  createTextVNode("Danger Link Button")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                link: true,
                href: "/"
              }, {
                default: withCtx(() => [
                  createTextVNode("href 跳到首页")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                link: true,
                to: "/"
              }, {
                default: withCtx(() => [
                  createTextVNode("router 跳到首页")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/link.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const link = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f972f7df"]]);
export {
  link as default
};
