import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as __default__ } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "breadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_page_header = resolveComponent("h-page-header");
      const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
      const _component_h_breadcrumb_item = resolveComponent("h-breadcrumb-item");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_page_header, mergeProps({
        icon: null,
        title: "页面标题"
      }, _attrs), {
        breadcrumb: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_breadcrumb, { separator: unref(__default__) }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`首页`);
                      } else {
                        return [
                          createTextVNode("首页")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`子页面1`);
                      } else {
                        return [
                          createTextVNode("子页面1")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`子页面2`);
                      } else {
                        return [
                          createTextVNode("子页面2")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`子页面3`);
                      } else {
                        return [
                          createTextVNode("子页面3")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_breadcrumb_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`当前页面`);
                      } else {
                        return [
                          createTextVNode("当前页面")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_breadcrumb_item, null, {
                      default: withCtx(() => [
                        createTextVNode("首页")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_breadcrumb_item, null, {
                      default: withCtx(() => [
                        createTextVNode("子页面1")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_breadcrumb_item, null, {
                      default: withCtx(() => [
                        createTextVNode("子页面2")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_breadcrumb_item, null, {
                      default: withCtx(() => [
                        createTextVNode("子页面3")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_breadcrumb_item, null, {
                      default: withCtx(() => [
                        createTextVNode("当前页面")
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
              createVNode(_component_h_breadcrumb, { separator: unref(__default__) }, {
                default: withCtx(() => [
                  createVNode(_component_h_breadcrumb_item, null, {
                    default: withCtx(() => [
                      createTextVNode("首页")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_breadcrumb_item, null, {
                    default: withCtx(() => [
                      createTextVNode("子页面1")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_breadcrumb_item, null, {
                    default: withCtx(() => [
                      createTextVNode("子页面2")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_breadcrumb_item, null, {
                    default: withCtx(() => [
                      createTextVNode("子页面3")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_breadcrumb_item, null, {
                    default: withCtx(() => [
                      createTextVNode("当前页面")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["separator"])
            ];
          }
        }),
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`副按钮`);
                } else {
                  return [
                    createTextVNode("副按钮")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`主按钮`);
                } else {
                  return [
                    createTextVNode("主按钮")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("副按钮")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("主按钮")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/PageHeader/breadcrumb.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
